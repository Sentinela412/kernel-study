import { Question } from '../types';

export interface GenerateWithAiParams {
  apiKey?: string;
  sourceText?: string;
  topic?: string;
  questionCount: number;
  difficulty?: 'fácil' | 'medio' | 'difícil' | 'oposición';
}

export const aiGenerator = {
  // Generate questions using Google Gemini API
  async generateQuestionsWithGemini(params: GenerateWithAiParams): Promise<Question[]> {
    const { apiKey, sourceText, topic, questionCount, difficulty = 'medio' } = params;

    if (!apiKey) {
      throw new Error('Debes ingresar tu API Key de Google Gemini para la generación directa por IA.');
    }

    const prompt = `Actúa como un profesor universitario y examinador experto de oposiciones.
Genera un examen tipo test riguroso y didáctico de ${questionCount} preguntas con nivel ${difficulty}.
${topic ? `Tema del examen: "${topic}".` : ''}
${sourceText ? `Basado estrictamente en este texto o apuntes:\n"""${sourceText.slice(0, 15000)}"""` : ''}

Requisitos obligatorios:
1. Cada pregunta debe tener exactamente 4 opciones de respuesta coherentes y plausibles.
2. Solo 1 respuesta debe ser la correcta.
3. Proporciona una explicación detallada de por qué esa es la respuesta correcta (y por qué las otras no lo son si aplica).
4. Devuelve ÚNICAMENTE un array JSON válido sin texto adicional, sin formato markdown con comillas triples si es posible, o en bloque json:
[
  {
    "text": "¿Pregunta redactada con claridad?",
    "options": ["Opción A", "Opción B", "Opción C", "Opción D"],
    "correctIndex": 0,
    "explanation": "Explicación clara y pedagógica..."
  }
]`;

    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.4,
          responseMimeType: 'application/json'
        }
      })
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(`Error en la API de Gemini: ${err.error?.message || response.statusText}`);
    }

    const data = await response.json();
    const candidateText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!candidateText) {
      throw new Error('La IA no devolvió ninguna respuesta válida.');
    }

    // Clean JSON response
    const cleanJson = candidateText.replace(/```json/g, '').replace(/```/g, '').trim();
    const parsed = JSON.parse(cleanJson);

    if (!Array.isArray(parsed)) {
      throw new Error('La respuesta de la IA no tiene el formato de lista esperado.');
    }

    return parsed.map((item: any, idx: number) => ({
      id: `ai-q-${Date.now()}-${idx + 1}`,
      text: item.text,
      options: item.options,
      correctIndex: typeof item.correctIndex === 'number' ? item.correctIndex : 0,
      explanation: item.explanation || 'Respuesta generada por Kernel Study IA.',
    }));
  },

  // Smart Parser for pasted raw text (supports formats with A), B), C), D), "Respuesta: X", etc.)
  parseRawTextToQuestions(text: string): Question[] {
    const questions: Question[] = [];
    // Split by question markers like "1.", "1 -", "Pregunta 1", "P1." or double newlines
    const chunks = text.split(/(?:^|\n)(?:\d+[\.\-\)]|\bPregunta\s*\d+[\:\.\-]?|\bP\d+[\:\.\-]?)/gi).map(c => c.trim()).filter(Boolean);

    if (chunks.length === 0) {
      // Fallback: split by double newlines
      const fallbackChunks = text.split(/\n\s*\n/).map(c => c.trim()).filter(c => c.length > 20);
      chunks.push(...fallbackChunks);
    }

    chunks.forEach((chunk, index) => {
      const lines = chunk.split('\n').map(l => l.trim()).filter(Boolean);
      if (lines.length < 2) return;

      const questionText = lines[0];
      const options: string[] = [];
      let correctIndex = 0;
      let explanation = '';

      for (let i = 1; i < lines.length; i++) {
        const line = lines[i];

        // Check for answer indication like "Respuesta: A" or "Solución: B" or "Correcta: C"
        const answerMatch = line.match(/(?:Respuesta|Soluci[oó]n|Correcta|Rta)\s*[:=\-]?\s*([A-Da-d1-4])/i);
        if (answerMatch) {
          const letter = answerMatch[1].toUpperCase();
          if (letter === 'A' || letter === '1') correctIndex = 0;
          else if (letter === 'B' || letter === '2') correctIndex = 1;
          else if (letter === 'C' || letter === '3') correctIndex = 2;
          else if (letter === 'D' || letter === '4') correctIndex = 3;
          continue;
        }

        // Check for explanation
        const explMatch = line.match(/(?:Explicaci[oó]n|Feedback|Nota)\s*[:=\-]?\s*(.*)/i);
        if (explMatch) {
          explanation = explMatch[1] || '';
          continue;
        }

        // Check for options like "A) ...", "a. ...", "[A] ...", "- ..."
        const optionMatch = line.match(/^[a-dA-D1-4][\.\)\-\]]\s*(.*)/);
        if (optionMatch) {
          // Check if marked with asterisk like "B)* Esta es la buena"
          const isMarked = line.includes('*') || line.toLowerCase().includes('(correcta)');
          const cleanOption = optionMatch[1].replace(/\*|\(correcta\)/gi, '').trim();
          options.push(cleanOption);
          if (isMarked) {
            correctIndex = options.length - 1;
          }
        } else if (line.startsWith('- ') || line.startsWith('• ')) {
          options.push(line.substring(2).trim());
        }
      }

      // If at least 2 options detected, we have a valid question
      if (options.length >= 2) {
        questions.push({
          id: `parsed-${Date.now()}-${index + 1}`,
          text: questionText,
          options,
          correctIndex: Math.min(correctIndex, options.length - 1),
          explanation: explanation || 'Pregunta importada desde texto.',
        });
      }
    });

    return questions;
  }
};
