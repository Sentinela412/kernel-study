import React, { useState } from 'react';
import { Exam, Question } from '../types';
import { 
  Sparkles, 
  FileText, 
  Plus, 
  Upload, 
  Trash2, 
  Key, 
  Check, 
  AlertCircle, 
  Loader2,
  Clock,
  HelpCircle,
  X
} from 'lucide-react';
import { sound } from '../utils/audio';
import { aiGenerator } from '../services/aiGenerator';
import { storage } from '../services/storage';

interface ExamCreatorModalProps {
  onSaveExam: (exam: Exam) => void;
  onClose: () => void;
}

export const ExamCreatorModal: React.FC<ExamCreatorModalProps> = ({
  onSaveExam,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'ai' | 'paste' | 'manual' | 'file'>('ai');
  const settings = storage.getSettings();

  // Basic Exam Info
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Personalizados');
  const [timeLimitMinutes, setTimeLimitMinutes] = useState(15);
  const [penaltyRatio, setPenaltyRatio] = useState(0.33);

  // AI Tab State
  const [apiKey, setApiKey] = useState(settings.geminiApiKey || '');
  const [aiTopic, setAiTopic] = useState('');
  const [aiSourceText, setAiSourceText] = useState('');
  const [aiCount, setAiCount] = useState(5);
  const [aiDifficulty, setAiDifficulty] = useState<'fácil' | 'medio' | 'difícil' | 'oposición'>('medio');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiError, setAiError] = useState('');

  // Paste Tab State
  const [pastedText, setPastedText] = useState('');
  const [pasteError, setPasteError] = useState('');

  // Manual Tab State
  const [manualQuestions, setManualQuestions] = useState<Question[]>([
    {
      id: `q-man-1`,
      text: '',
      options: ['', '', '', ''],
      correctIndex: 0,
      explanation: '',
    }
  ]);

  // Handle AI generation
  const handleGenerateAI = async () => {
    sound.playClick();
    if (!aiTopic && !aiSourceText) {
      setAiError('Por favor introduce un tema o pega apuntes de texto para generar el examen.');
      return;
    }

    if (!apiKey) {
      setAiError('Introduce tu clave API gratuita de Google Gemini para la generación directa con IA.');
      return;
    }

    setIsAiLoading(true);
    setAiError('');

    try {
      const generated = await aiGenerator.generateQuestionsWithGemini({
        apiKey,
        topic: aiTopic,
        sourceText: aiSourceText,
        questionCount: aiCount,
        difficulty: aiDifficulty,
      });

      // Save API key in settings for convenience
      storage.saveSettings({ ...settings, geminiApiKey: apiKey });

      const newExam: Exam = {
        id: `custom-ai-${Date.now()}`,
        title: title || (aiTopic ? `Test IA: ${aiTopic}` : 'Examen Generado con Thea IA'),
        description: description || `Examen de ${generated.length} preguntas generado automáticamente con Inteligencia Artificial.`,
        category: category || 'Generados con IA',
        timeLimitMinutes,
        penaltyRatio,
        questions: generated,
        createdAt: new Date().toISOString(),
        isCustom: true,
      };

      onSaveExam(newExam);
    } catch (err: any) {
      setAiError(err.message || 'Error al comunicarse con la IA');
    } finally {
      setIsAiLoading(false);
    }
  };

  // Handle Smart Text Paste
  const handleParseText = () => {
    sound.playClick();
    if (!pastedText.trim()) {
      setPasteError('Por favor pega el contenido de las preguntas.');
      return;
    }

    const parsed = aiGenerator.parseRawTextToQuestions(pastedText);
    if (parsed.length === 0) {
      setPasteError('No se detectaron preguntas con al menos 2 opciones. Revisa el formato de ejemplo.');
      return;
    }

    const newExam: Exam = {
      id: `custom-paste-${Date.now()}`,
      title: title || 'Examen Importado de Texto',
      description: description || `Examen con ${parsed.length} preguntas importadas de texto.`,
      category: category || 'Apuntes y Documentos',
      timeLimitMinutes,
      penaltyRatio,
      questions: parsed,
      createdAt: new Date().toISOString(),
      isCustom: true,
    };

    onSaveExam(newExam);
  };

  // Handle Manual Save
  const handleSaveManual = () => {
    sound.playClick();
    if (!title.trim()) {
      alert('Por favor introduce un título para el examen.');
      return;
    }

    const validQuestions = manualQuestions.filter(q => q.text.trim() && q.options.filter(o => o.trim()).length >= 2);
    if (validQuestions.length === 0) {
      alert('Debes añadir al menos una pregunta completa con opciones de respuesta.');
      return;
    }

    const newExam: Exam = {
      id: `custom-man-${Date.now()}`,
      title,
      description: description || 'Examen creado manualmente.',
      category: category || 'Mis Tests',
      timeLimitMinutes,
      penaltyRatio,
      questions: validQuestions,
      createdAt: new Date().toISOString(),
      isCustom: true,
    };

    onSaveExam(newExam);
  };

  // Add Question to Manual form
  const addManualQuestion = () => {
    sound.playClick();
    setManualQuestions([
      ...manualQuestions,
      {
        id: `q-man-${Date.now()}-${manualQuestions.length + 1}`,
        text: '',
        options: ['', '', '', ''],
        correctIndex: 0,
        explanation: '',
      }
    ]);
  };

  // File import
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        const exam = storage.parseExamFromJson(content);
        onSaveExam(exam);
      } catch (err: any) {
        alert(`Error al leer archivo JSON: ${err.message}`);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="w-full max-w-3xl bg-[#0f0e24] border border-purple-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl my-8">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-purple-600/30 text-purple-300 border border-purple-500/40">
              <Sparkles className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Creador Inteligente de Exámenes</h3>
              <p className="text-xs text-slate-400">Diseña tests con IA, pega tus apuntes o importa desde archivo</p>
            </div>
          </div>
          <button
            onClick={() => { sound.playClick(); onClose(); }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Global Settings (Title, Category, Time, Penalty) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 p-4 rounded-2xl bg-white/[0.03] border border-white/10">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Título del Examen</label>
            <input
              type="text"
              placeholder="Ej: Oposiciones Auxiliar: Tema 1"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Categoría</label>
            <input
              type="text"
              placeholder="Ej: Oposiciones, Universidad, Idiomas..."
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Tiempo Límite (minutos)
            </label>
            <input
              type="number"
              min="0"
              max="240"
              value={timeLimitMinutes}
              onChange={(e) => setTimeLimitMinutes(parseInt(e.target.value, 10) || 0)}
              className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500"
            />
            <span className="text-[11px] text-slate-500">0 para tiempo libre</span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Penalización por fallo
            </label>
            <select
              value={penaltyRatio}
              onChange={(e) => setPenaltyRatio(parseFloat(e.target.value))}
              className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500"
            >
              <option value="0" className="bg-[#0f0e24]">Sin penalización (0)</option>
              <option value="0.25" className="bg-[#0f0e24]">4 fallos restan 1 (-0.25)</option>
              <option value="0.33" className="bg-[#0f0e24]">3 fallos restan 1 (-0.33) [Oficial España]</option>
              <option value="0.5" className="bg-[#0f0e24]">2 fallos restan 1 (-0.50)</option>
            </select>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center gap-2 border-b border-white/10 pb-3 mb-6">
          <button
            onClick={() => { sound.playClick(); setActiveTab('ai'); }}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'ai'
                ? 'bg-purple-600 text-white shadow-glow-purple'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Sparkles className="w-4 h-4 text-cyan-300" />
            Generador IA
          </button>

          <button
            onClick={() => { sound.playClick(); setActiveTab('paste'); }}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'paste'
                ? 'bg-purple-600 text-white shadow-glow-purple'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <FileText className="w-4 h-4" />
            Pegar Texto / Apuntes
          </button>

          <button
            onClick={() => { sound.playClick(); setActiveTab('manual'); }}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'manual'
                ? 'bg-purple-600 text-white shadow-glow-purple'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Plus className="w-4 h-4" />
            Editor Manual
          </button>

          <button
            onClick={() => { sound.playClick(); setActiveTab('file'); }}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'file'
                ? 'bg-purple-600 text-white shadow-glow-purple'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Upload className="w-4 h-4" />
            Subir JSON
          </button>
        </div>

        {/* TAB 1: AI GENERATOR */}
        {activeTab === 'ai' && (
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <Key className="w-3.5 h-3.5 text-amber-400" />
                  Google Gemini API Key (100% Gratuita)
                </label>
                <a
                  href="https://aistudio.google.com/app/apikey"
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-purple-400 hover:underline"
                >
                  Conseguir clave gratis →
                </a>
              </div>
              <input
                type="password"
                placeholder="AIzaSy..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500 font-mono"
              />
              <span className="text-[11px] text-slate-400 block mt-1">
                Tu clave no se envía a ningún servidor central; se almacena de forma segura en tu propio navegador.
              </span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Tema o Materia
              </label>
              <input
                type="text"
                placeholder="Ej: Ley 39/2015 del Procedimiento Administrativo Común, Fisiología renal..."
                value={aiTopic}
                onChange={(e) => setAiTopic(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Apuntes o Texto fuente (Opcional pero recomendado)
              </label>
              <textarea
                rows={4}
                placeholder="Pega aquí párrafos de un PDF, temario o apuntes sobre los que quieres que Thea genere las preguntas..."
                value={aiSourceText}
                onChange={(e) => setAiSourceText(e.target.value)}
                className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500 font-sans"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Cantidad de preguntas
                </label>
                <select
                  value={aiCount}
                  onChange={(e) => setAiCount(parseInt(e.target.value, 10))}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm"
                >
                  <option value={5} className="bg-[#0f0e24]">5 preguntas</option>
                  <option value={10} className="bg-[#0f0e24]">10 preguntas</option>
                  <option value={15} className="bg-[#0f0e24]">15 preguntas</option>
                  <option value={20} className="bg-[#0f0e24]">20 preguntas</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Nivel de Dificultad
                </label>
                <select
                  value={aiDifficulty}
                  onChange={(e) => setAiDifficulty(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm"
                >
                  <option value="fácil" className="bg-[#0f0e24]">Fácil</option>
                  <option value="medio" className="bg-[#0f0e24]">Medio</option>
                  <option value="difícil" className="bg-[#0f0e24]">Difícil</option>
                  <option value="oposición" className="bg-[#0f0e24]">Nivel Oposición Oficial</option>
                </select>
              </div>
            </div>

            {aiError && (
              <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{aiError}</span>
              </div>
            )}

            <button
              onClick={handleGenerateAI}
              disabled={isAiLoading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-bold text-sm shadow-glow-purple flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              {isAiLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Thea AI está redactando las preguntas y explicaciones...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Generar Test con Thea AI</span>
                </>
              )}
            </button>
          </div>
        )}

        {/* TAB 2: SMART TEXT PASTE */}
        {activeTab === 'paste' && (
          <div className="space-y-4">
            <p className="text-xs text-slate-300 leading-relaxed">
              Pega cualquier texto con preguntas tipo test. El analizador inteligente de Thea detectará automáticamente el enunciado, las opciones (A, B, C, D) y la respuesta correcta.
            </p>

            <textarea
              rows={8}
              placeholder={`1. ¿Cuál es el valor superior de la Constitución?
A) Libertad
B) Solidaridad
C) Monarquía
D) Ninguna de las anteriores
Respuesta: A
Explicación: El Art. 1.1 propugna la libertad, justicia, igualdad y pluralismo.`}
              value={pastedText}
              onChange={(e) => setPastedText(e.target.value)}
              className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white text-xs sm:text-sm font-mono focus:outline-none focus:border-purple-500"
            />

            {pasteError && (
              <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{pasteError}</span>
              </div>
            )}

            <button
              onClick={handleParseText}
              className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-sm shadow-glow-purple flex items-center justify-center gap-2"
            >
              <FileText className="w-4 h-4" />
              <span>Procesar y Crear Test</span>
            </button>
          </div>
        )}

        {/* TAB 3: MANUAL QUESTION BUILDER */}
        {activeTab === 'manual' && (
          <div className="space-y-6 max-h-[50vh] overflow-y-auto pr-2">
            {manualQuestions.map((q, qIndex) => (
              <div key={q.id} className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-purple-600/30 text-purple-300">
                    Pregunta #{qIndex + 1}
                  </span>
                  {manualQuestions.length > 1 && (
                    <button
                      onClick={() => {
                        sound.playClick();
                        setManualQuestions(manualQuestions.filter((_, i) => i !== qIndex));
                      }}
                      className="text-xs text-rose-400 hover:text-rose-300 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <input
                  type="text"
                  placeholder="Enunciado de la pregunta..."
                  value={q.text}
                  onChange={(e) => {
                    const updated = [...manualQuestions];
                    updated[qIndex].text = e.target.value;
                    setManualQuestions(updated);
                  }}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500"
                />

                <div className="space-y-2">
                  <span className="text-[11px] text-slate-400 block">
                    Marca el círculo de la opción que es correcta:
                  </span>
                  {q.options.map((opt, optIndex) => {
                    const letter = String.fromCharCode(65 + optIndex);
                    return (
                      <div key={optIndex} className="flex items-center gap-2">
                        <input
                          type="radio"
                          name={`correct-${q.id}`}
                          checked={q.correctIndex === optIndex}
                          onChange={() => {
                            const updated = [...manualQuestions];
                            updated[qIndex].correctIndex = optIndex;
                            setManualQuestions(updated);
                          }}
                          className="accent-purple-500 w-4 h-4 cursor-pointer"
                        />
                        <span className="text-xs font-bold text-slate-400 w-4">{letter}</span>
                        <input
                          type="text"
                          placeholder={`Opción ${letter}...`}
                          value={opt}
                          onChange={(e) => {
                            const updated = [...manualQuestions];
                            updated[qIndex].options[optIndex] = e.target.value;
                            setManualQuestions(updated);
                          }}
                          className="flex-1 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-purple-500"
                        />
                      </div>
                    );
                  })}
                </div>

                <input
                  type="text"
                  placeholder="Explicación pedagógica (¿Por qué es correcta?)..."
                  value={q.explanation || ''}
                  onChange={(e) => {
                    const updated = [...manualQuestions];
                    updated[qIndex].explanation = e.target.value;
                    setManualQuestions(updated);
                  }}
                  className="w-full px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-purple-500"
                />
              </div>
            ))}

            <div className="flex items-center gap-3">
              <button
                onClick={addManualQuestion}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-purple-300 flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Añadir otra pregunta</span>
              </button>

              <button
                onClick={handleSaveManual}
                className="ml-auto px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs sm:text-sm font-semibold shadow-glow-purple"
              >
                Guardar Examen Manual
              </button>
            </div>
          </div>
        )}

        {/* TAB 4: JSON FILE UPLOAD */}
        {activeTab === 'file' && (
          <div className="text-center py-10 border-2 border-dashed border-white/10 rounded-2xl p-6">
            <Upload className="w-10 h-10 text-purple-400 mx-auto mb-3" />
            <p className="text-sm font-semibold text-white mb-1">
              Arrastra o selecciona un archivo de examen .json
            </p>
            <p className="text-xs text-slate-400 mb-4 max-w-sm mx-auto">
              Compatible con los archivos descargados desde Thea y cualquier JSON estándar con preguntas y opciones.
            </p>
            <input
              type="file"
              accept=".json"
              onChange={handleFileUpload}
              className="block mx-auto text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-500 cursor-pointer"
            />
          </div>
        )}
      </div>
    </div>
  );
};
