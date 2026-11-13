export type StudyMode = 'exam' | 'smart_study' | 'flashcards';

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctIndex: number; // 0-based
  explanation?: string;
  category?: string;
}

export interface Exam {
  id: string;
  title: string;
  description: string;
  category: string;
  timeLimitMinutes: number; // 0 for untimed
  penaltyRatio: number; // 0 for no penalty, 0.33 for -1/3, 0.25 for -1/4
  questions: Question[];
  createdAt: string;
  author?: string;
  isCustom?: boolean;
}

export interface ExamResult {
  id: string;
  examId: string;
  examTitle: string;
  date: string;
  mode: StudyMode;
  scorePercentage: number;
  officialGrade: number; // 0 to 10
  correctCount: number;
  incorrectCount: number;
  unansweredCount: number;
  totalQuestions: number;
  timeSpentSeconds: number;
  userAnswers: Record<string, number>; // questionId -> selectedOptionIndex (-1 for unanswered)
  flaggedQuestionIds: string[];
}

export interface UserStats {
  totalTestsTaken: number;
  totalQuestionsAnswered: number;
  correctAnswersCount: number;
  averageScorePercentage: number;
  history: ExamResult[];
  savedWrongQuestions: Record<string, Question>; // questionId -> Question for quick review
}

export interface AppSettings {
  soundEnabled: boolean;
  theme: 'dark' | 'light';
  geminiApiKey?: string;
}
