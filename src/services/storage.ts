import { AppSettings, Exam, ExamResult, Question, UserStats } from '../types';
import { DEFAULT_EXAMS } from '../data/defaultExams';

const STORAGE_KEYS = {
  CUSTOM_EXAMS: 'thea_custom_exams_v1',
  USER_STATS: 'thea_user_stats_v1',
  SETTINGS: 'thea_app_settings_v1',
};

export const storage = {
  // --- EXAMS ---
  getExams(): Exam[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.CUSTOM_EXAMS);
      const customExams: Exam[] = stored ? JSON.parse(stored) : [];
      // Only keep user-created custom exams, ensuring the 4 ASIR modules are always primary
      const validCustom = customExams.filter(e => e.id.startsWith('custom-') || e.id.startsWith('shared-'));
      return [...DEFAULT_EXAMS, ...validCustom];
    } catch (e) {
      console.error('Error loading exams', e);
      return DEFAULT_EXAMS;
    }
  },

  getExamById(id: string): Exam | undefined {
    const all = this.getExams();
    return all.find(e => e.id === id);
  },

  saveExam(exam: Exam): void {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.CUSTOM_EXAMS);
      const customExams: Exam[] = stored ? JSON.parse(stored) : [];
      const index = customExams.findIndex(e => e.id === exam.id);
      if (index >= 0) {
        customExams[index] = exam;
      } else {
        customExams.unshift(exam);
      }
      localStorage.setItem(STORAGE_KEYS.CUSTOM_EXAMS, JSON.stringify(customExams));
    } catch (e) {
      console.error('Error saving exam', e);
    }
  },

  deleteExam(id: string): void {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.CUSTOM_EXAMS);
      if (!stored) return;
      const customExams: Exam[] = JSON.parse(stored);
      const filtered = customExams.filter(e => e.id !== id);
      localStorage.setItem(STORAGE_KEYS.CUSTOM_EXAMS, JSON.stringify(filtered));
    } catch (e) {
      console.error('Error deleting exam', e);
    }
  },

  // --- STATS & HISTORY ---
  getUserStats(): UserStats {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.USER_STATS);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Error loading stats', e);
    }
    return {
      totalTestsTaken: 0,
      totalQuestionsAnswered: 0,
      correctAnswersCount: 0,
      averageScorePercentage: 0,
      history: [],
      savedWrongQuestions: {},
    };
  },

  saveExamResult(result: ExamResult, exam: Exam): void {
    try {
      const stats = this.getUserStats();
      stats.history.unshift(result);
      if (stats.history.length > 50) {
        stats.history = stats.history.slice(0, 50); // keep last 50
      }

      stats.totalTestsTaken += 1;
      stats.totalQuestionsAnswered += (result.correctCount + result.incorrectCount);
      stats.correctAnswersCount += result.correctCount;

      const totalScores = stats.history.reduce((sum, h) => sum + h.scorePercentage, 0);
      stats.averageScorePercentage = Math.round(totalScores / stats.history.length);

      // Save wrong questions for reinforcement mode
      exam.questions.forEach(q => {
        const userChoice = result.userAnswers[q.id];
        if (userChoice !== undefined && userChoice !== -1 && userChoice !== q.correctIndex) {
          stats.savedWrongQuestions[q.id] = q;
        } else if (userChoice === q.correctIndex && stats.savedWrongQuestions[q.id]) {
          // If answered correctly now, remove from wrong pool
          delete stats.savedWrongQuestions[q.id];
        }
      });

      localStorage.setItem(STORAGE_KEYS.USER_STATS, JSON.stringify(stats));
    } catch (e) {
      console.error('Error saving exam result', e);
    }
  },

  clearWrongQuestions(): void {
    const stats = this.getUserStats();
    stats.savedWrongQuestions = {};
    localStorage.setItem(STORAGE_KEYS.USER_STATS, JSON.stringify(stats));
  },

  // --- SETTINGS ---
  getSettings(): AppSettings {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error('Error loading settings', e);
    }
    return {
      soundEnabled: true,
      theme: 'dark',
      geminiApiKey: '',
    };
  },

  saveSettings(settings: AppSettings): void {
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    } catch (e) {
      console.error('Error saving settings', e);
    }
  },

  // --- SHARING & EXPORT / IMPORT ---
  encodeExamToUrl(exam: Exam): string {
    try {
      const minimalExam = {
        t: exam.title,
        d: exam.description,
        c: exam.category,
        m: exam.timeLimitMinutes,
        p: exam.penaltyRatio,
        q: exam.questions.map(q => ({
          t: q.text,
          o: q.options,
          c: q.correctIndex,
          e: q.explanation || '',
        }))
      };
      const json = JSON.stringify(minimalExam);
      const encoded = btoa(unescape(encodeURIComponent(json)));
      const base = window.location.origin + window.location.pathname;
      return `${base}?shared=${encoded}`;
    } catch (e) {
      console.error('Error encoding exam to URL', e);
      return '';
    }
  },

  decodeExamFromUrl(): Exam | null {
    try {
      const params = new URLSearchParams(window.location.search);
      const shared = params.get('shared');
      if (!shared) return null;

      const json = decodeURIComponent(escape(atob(shared)));
      const data = JSON.parse(json);

      const exam: Exam = {
        id: 'shared-' + Date.now(),
        title: data.t || 'Examen Compartido',
        description: data.d || 'Examen importado mediante enlace público.',
        category: data.c || 'Compartidos',
        timeLimitMinutes: typeof data.m === 'number' ? data.m : 15,
        penaltyRatio: typeof data.p === 'number' ? data.p : 0.33,
        createdAt: new Date().toISOString(),
        isCustom: true,
        questions: (data.q || []).map((q: any, idx: number) => ({
          id: `q-${idx + 1}`,
          text: q.t,
          options: q.o,
          correctIndex: q.c,
          explanation: q.e || '',
        }))
      };

      if (exam.questions.length > 0) {
        return exam;
      }
    } catch (e) {
      console.error('Error decoding exam from URL', e);
    }
    return null;
  },

  exportExamAsJson(exam: Exam): void {
    const jsonStr = JSON.stringify(exam, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${exam.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-kernel-study.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  },

  parseExamFromJson(jsonStr: string): Exam {
    const parsed = JSON.parse(jsonStr);
    if (!parsed.title || !Array.isArray(parsed.questions)) {
      throw new Error('Formato de examen inválido. Debe contener "title" y lista de "questions".');
    }
    return {
      id: 'custom-' + Date.now(),
      title: parsed.title,
      description: parsed.description || 'Examen importado desde archivo JSON.',
      category: parsed.category || 'Importados',
      timeLimitMinutes: parsed.timeLimitMinutes || 15,
      penaltyRatio: typeof parsed.penaltyRatio === 'number' ? parsed.penaltyRatio : 0.33,
      createdAt: new Date().toISOString(),
      isCustom: true,
      questions: parsed.questions.map((q: any, i: number) => ({
        id: `q-${Date.now()}-${i}`,
        text: q.text || `Pregunta ${i + 1}`,
        options: Array.isArray(q.options) && q.options.length >= 2 ? q.options : ['Opción A', 'Opción B'],
        correctIndex: typeof q.correctIndex === 'number' ? q.correctIndex : 0,
        explanation: q.explanation || '',
      }))
    };
  }
};
