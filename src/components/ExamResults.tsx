import React, { useEffect, useState } from 'react';
import { Exam, ExamResult } from '../types';
import { 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  RotateCcw, 
  Home, 
  Printer, 
  Clock, 
  AlertTriangle, 
  Award, 
  Flag,
  Share2,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/audio';
import { storage } from '../services/storage';

interface ExamResultsProps {
  exam: Exam;
  result: ExamResult;
  onRetryFull: () => void;
  onRetryWrongOnly: (wrongExam: Exam) => void;
  onGoHome: () => void;
}

export const ExamResults: React.FC<ExamResultsProps> = ({
  exam,
  result,
  onRetryFull,
  onRetryWrongOnly,
  onGoHome,
}) => {
  const [filter, setFilter] = useState<'all' | 'wrong' | 'flagged'>('all');
  const [copied, setCopied] = useState(false);

  // Trigger celebration on mount if grade >= 5.0
  useEffect(() => {
    if (result.officialGrade >= 5) {
      sound.playFanfare();
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // Safe fallback
      }
    }
  }, [result.officialGrade]);

  const isPass = result.officialGrade >= 5.0;

  // Grade label
  const getGradeLabel = (grade: number) => {
    if (grade >= 9.0) return { text: '¡Sobresaliente!', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' };
    if (grade >= 7.0) return { text: '¡Notable!', color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30' };
    if (grade >= 5.0) return { text: 'Aprobado', color: 'text-purple-400 bg-purple-500/10 border-purple-500/30' };
    return { text: 'Necesita repasar', color: 'text-rose-400 bg-rose-500/10 border-rose-500/30' };
  };

  const gradeInfo = getGradeLabel(result.officialGrade);

  // Filter questions
  const filteredQuestions = exam.questions.filter((q) => {
    const userChoice = result.userAnswers[q.id];
    const isWrong = userChoice !== undefined && userChoice !== -1 && userChoice !== q.correctIndex;
    const isFlagged = result.flaggedQuestionIds.includes(q.id);

    if (filter === 'wrong') return isWrong;
    if (filter === 'flagged') return isFlagged;
    return true;
  });

  // Create sub-exam for wrong answers only
  const wrongQuestions = exam.questions.filter((q) => {
    const userChoice = result.userAnswers[q.id];
    return userChoice !== undefined && userChoice !== -1 && userChoice !== q.correctIndex;
  });

  const handleStartWrongOnly = () => {
    sound.playClick();
    if (wrongQuestions.length === 0) return;
    const wrongExam: Exam = {
      ...exam,
      id: `${exam.id}-wrong-${Date.now()}`,
      title: `Refuerzo: Fallos en "${exam.title}"`,
      description: `Test enfocado exclusivamente en las ${wrongQuestions.length} preguntas que fallaste en la sesión anterior.`,
      questions: wrongQuestions,
      isCustom: true,
    };
    onRetryWrongOnly(wrongExam);
  };

  const formatSeconds = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}m ${s}s`;
  };

  const handleShareResult = () => {
    sound.playClick();
    const shareText = `¡He obtenido un ${result.officialGrade}/10 (${result.scorePercentage}%) en el examen "${exam.title}" en Thea Study! 🚀`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="min-h-screen bg-[#090814] text-slate-100 py-10 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Main Score Hero Card */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/10 text-center relative overflow-hidden shadow-2xl mb-8">
          {/* Ambient Glow */}
          <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full blur-3xl pointer-events-none ${isPass ? 'bg-purple-600/20' : 'bg-rose-600/15'}`} />

          <div className="relative z-10">
            <span className={`inline-block px-4 py-1 rounded-full text-xs sm:text-sm font-semibold border mb-4 ${gradeInfo.color}`}>
              {gradeInfo.text}
            </span>

            {/* Huge Official Grade */}
            <div className="mb-2">
              <span className="text-6xl sm:text-7xl font-extrabold tracking-tight text-white">
                {result.officialGrade.toFixed(2)}
              </span>
              <span className="text-2xl text-slate-400 font-medium"> / 10</span>
            </div>

            <p className="text-sm sm:text-base text-slate-300 max-w-md mx-auto mb-6">
              Examen completado: <strong className="text-white">{exam.title}</strong> ({result.scorePercentage}% de efectividad neta)
            </p>

            {/* Metrics Breakdown Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto mb-8">
              {/* Correct */}
              <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center">
                <div className="flex items-center justify-center gap-1.5 text-emerald-400 mb-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span className="text-xs font-semibold">Aciertos</span>
                </div>
                <span className="text-2xl font-bold text-white">{result.correctCount}</span>
              </div>

              {/* Wrong */}
              <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-center">
                <div className="flex items-center justify-center gap-1.5 text-rose-400 mb-1">
                  <XCircle className="w-4 h-4" />
                  <span className="text-xs font-semibold">Fallos</span>
                </div>
                <span className="text-2xl font-bold text-white">{result.incorrectCount}</span>
              </div>

              {/* Unanswered */}
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-center">
                <div className="flex items-center justify-center gap-1.5 text-slate-400 mb-1">
                  <HelpCircle className="w-4 h-4" />
                  <span className="text-xs font-semibold">En blanco</span>
                </div>
                <span className="text-2xl font-bold text-white">{result.unansweredCount}</span>
              </div>

              {/* Time Spent */}
              <div className="p-3.5 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-center">
                <div className="flex items-center justify-center gap-1.5 text-purple-300 mb-1">
                  <Clock className="w-4 h-4" />
                  <span className="text-xs font-semibold">Tiempo</span>
                </div>
                <span className="text-2xl font-bold text-white">{formatSeconds(result.timeSpentSeconds)}</span>
              </div>
            </div>

            {/* Penalty Note if applied */}
            {exam.penaltyRatio > 0 && result.incorrectCount > 0 && (
              <p className="text-xs text-amber-300/80 mb-6 flex items-center justify-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                Se aplicó penalización oficial: -{(result.incorrectCount * exam.penaltyRatio).toFixed(2)} puntos por respuestas erróneas.
              </p>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              {/* Retry Wrong Only Button */}
              {wrongQuestions.length > 0 && (
                <button
                  onClick={handleStartWrongOnly}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all hover:scale-105"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Repetir solo los {wrongQuestions.length} fallos</span>
                </button>
              )}

              {/* Retry Full Test */}
              <button
                onClick={() => { sound.playClick(); onRetryFull(); }}
                className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-glow-purple transition-all"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reintentar Examen Completo</span>
              </button>

              {/* Share Result */}
              <button
                onClick={handleShareResult}
                className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium text-xs sm:text-sm flex items-center gap-2 transition-colors"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
                <span>{copied ? '¡Copiado!' : 'Compartir Nota'}</span>
              </button>

              {/* Print / Save PDF */}
              <button
                onClick={() => window.print()}
                className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium text-xs sm:text-sm flex items-center gap-2 transition-colors"
              >
                <Printer className="w-4 h-4" />
                <span className="hidden sm:inline">Imprimir / PDF</span>
              </button>

              {/* Go Home */}
              <button
                onClick={() => { sound.playClick(); onGoHome(); }}
                className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white font-medium text-xs sm:text-sm flex items-center gap-2 transition-colors"
              >
                <Home className="w-4 h-4" />
                <span>Inicio</span>
              </button>
            </div>
          </div>
        </div>

        {/* Detailed Question Review Section */}
        <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-xl font-bold text-white">Revisión Pregunta a Pregunta</h3>
            <p className="text-xs text-slate-400">Comprueba las respuestas correctas y sus explicaciones didácticas.</p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/5 border border-white/10 text-xs">
            <button
              onClick={() => { sound.playClick(); setFilter('all'); }}
              className={`px-3 py-1 rounded-lg transition-all ${filter === 'all' ? 'bg-purple-600 text-white font-semibold' : 'text-slate-400 hover:text-white'}`}
            >
              Todas ({exam.questions.length})
            </button>
            <button
              onClick={() => { sound.playClick(); setFilter('wrong'); }}
              className={`px-3 py-1 rounded-lg transition-all ${filter === 'wrong' ? 'bg-rose-600 text-white font-semibold' : 'text-slate-400 hover:text-white'}`}
            >
              Fallos ({result.incorrectCount})
            </button>
            <button
              onClick={() => { sound.playClick(); setFilter('flagged'); }}
              className={`px-3 py-1 rounded-lg transition-all ${filter === 'flagged' ? 'bg-amber-600 text-white font-semibold' : 'text-slate-400 hover:text-white'}`}
            >
              Dudas ({result.flaggedQuestionIds.length})
            </button>
          </div>
        </div>

        {/* Questions Cards */}
        <div className="space-y-4">
          {filteredQuestions.map((q, idx) => {
            const userChoice = result.userAnswers[q.id];
            const isAnswered = userChoice !== undefined && userChoice !== -1;
            const isCorrect = userChoice === q.correctIndex;
            const isFlagged = result.flaggedQuestionIds.includes(q.id);

            return (
              <div
                key={q.id}
                className={`p-6 rounded-2xl border transition-all ${
                  !isAnswered
                    ? 'bg-white/[0.02] border-white/10'
                    : isCorrect
                    ? 'bg-emerald-950/15 border-emerald-500/30'
                    : 'bg-rose-950/15 border-rose-500/30'
                }`}
              >
                {/* Header */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-lg bg-white/10 text-white">
                      #{idx + 1}
                    </span>
                    {!isAnswered ? (
                      <span className="text-xs font-semibold text-slate-400">Sin contestar</span>
                    ) : isCorrect ? (
                      <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Acertada
                      </span>
                    ) : (
                      <span className="text-xs font-semibold text-rose-400 flex items-center gap-1">
                        <XCircle className="w-3.5 h-3.5" /> Incorrecta
                      </span>
                    )}
                  </div>

                  {isFlagged && (
                    <span className="flex items-center gap-1 text-xs text-amber-400 font-medium">
                      <Flag className="w-3 h-3 fill-amber-400" /> Dudosa
                    </span>
                  )}
                </div>

                {/* Question Text */}
                <h4 className="text-sm sm:text-base font-semibold text-white mb-4">
                  {q.text}
                </h4>

                {/* Options list */}
                <div className="space-y-2 mb-4">
                  {q.options.map((opt, optIdx) => {
                    const letter = String.fromCharCode(65 + optIdx);
                    const wasChosenByUser = userChoice === optIdx;
                    const isRightAnswer = optIdx === q.correctIndex;

                    let optStyle = 'bg-white/[0.02] border-white/5 text-slate-300';
                    if (isRightAnswer) {
                      optStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-200 font-medium';
                    } else if (wasChosenByUser && !isRightAnswer) {
                      optStyle = 'bg-rose-500/20 border-rose-500 text-rose-200';
                    }

                    return (
                      <div
                        key={optIdx}
                        className={`p-3 rounded-xl border flex items-center justify-between gap-2 text-xs sm:text-sm ${optStyle}`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="font-bold">{letter})</span>
                          <span>{opt}</span>
                        </div>
                        <div>
                          {isRightAnswer && (
                            <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-500/30 text-emerald-300">
                              Correcta
                            </span>
                          )}
                          {wasChosenByUser && !isRightAnswer && (
                            <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-rose-500/30 text-rose-300">
                              Tu respuesta
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Explanation */}
                {q.explanation && (
                  <div className="p-3.5 rounded-xl bg-purple-950/25 border border-purple-500/20 text-xs sm:text-sm text-purple-200/90">
                    <strong className="text-purple-300 font-semibold block mb-0.5">Explicación Thea:</strong>
                    {q.explanation}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
