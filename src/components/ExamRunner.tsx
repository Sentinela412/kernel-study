import React, { useState, useEffect, useCallback } from 'react';
import { Exam, ExamResult, Question, StudyMode } from '../types';
import { 
  ArrowLeft, 
  ArrowRight, 
  Clock, 
  Flag, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  LayoutGrid, 
  Send, 
  Lightbulb,
  X
} from 'lucide-react';
import { sound } from '../utils/audio';

interface ExamRunnerProps {
  exam: Exam;
  mode: StudyMode;
  onFinishExam: (result: ExamResult) => void;
  onExit: () => void;
}

export const ExamRunner: React.FC<ExamRunnerProps> = ({
  exam,
  mode,
  onFinishExam,
  onExit,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [flaggedIds, setFlaggedIds] = useState<Set<string>>(new Set());
  const [revealedInSmartStudy, setRevealedInSmartStudy] = useState<Record<string, boolean>>({});
  const [showDrawer, setShowDrawer] = useState<boolean>(false);
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);

  // Timer state
  const totalSeconds = exam.timeLimitMinutes > 0 ? exam.timeLimitMinutes * 60 : 0;
  const [secondsRemaining, setSecondsRemaining] = useState<number>(totalSeconds);
  const [timeSpent, setTimeSpent] = useState<number>(0);

  const currentQuestion: Question = exam.questions[currentIndex] || exam.questions[0];
  const totalQuestions = exam.questions.length;

  // Complete exam calculation
  const calculateAndFinish = useCallback(() => {
    sound.playClick();
    let correctCount = 0;
    let incorrectCount = 0;
    let unansweredCount = 0;

    exam.questions.forEach((q) => {
      const choice = userAnswers[q.id];
      if (choice === undefined || choice === -1) {
        unansweredCount += 1;
      } else if (choice === q.correctIndex) {
        correctCount += 1;
      } else {
        incorrectCount += 1;
      }
    });

    // Score with official penalty ratio (e.g. 0.33: 3 wrong answers deduct 1 correct answer)
    const penaltyDeduction = incorrectCount * (exam.penaltyRatio || 0);
    const netCorrect = Math.max(0, correctCount - penaltyDeduction);
    const officialGrade = Number(((netCorrect / totalQuestions) * 10).toFixed(2));
    const scorePercentage = Math.round((netCorrect / totalQuestions) * 100);

    const result: ExamResult = {
      id: `result-${Date.now()}`,
      examId: exam.id,
      examTitle: exam.title,
      date: new Date().toISOString(),
      mode,
      scorePercentage,
      officialGrade,
      correctCount,
      incorrectCount,
      unansweredCount,
      totalQuestions,
      timeSpentSeconds: timeSpent,
      userAnswers,
      flaggedQuestionIds: Array.from(flaggedIds),
    };

    onFinishExam(result);
  }, [exam, userAnswers, flaggedIds, mode, timeSpent, totalQuestions, onFinishExam]);

  // Timer effect
  useEffect(() => {
    if (exam.timeLimitMinutes <= 0) {
      const interval = setInterval(() => {
        setTimeSpent((prev) => prev + 1);
      }, 1000);
      return () => clearInterval(interval);
    }

    const timer = setInterval(() => {
      setTimeSpent((prev) => prev + 1);
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          calculateAndFinish();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [exam.timeLimitMinutes, calculateAndFinish]);

  // Handle Option Selection
  const handleSelectOption = (optIndex: number) => {
    sound.playClick();
    const qId = currentQuestion.id;
    const isCurrent = userAnswers[qId] === optIndex;

    // In exam mode, clicking again unselects (vital for penalized exams)
    const newChoice = isCurrent ? -1 : optIndex;

    setUserAnswers((prev) => ({
      ...prev,
      [qId]: newChoice,
    }));

    if (mode === 'smart_study' && newChoice !== -1) {
      setRevealedInSmartStudy((prev) => ({
        ...prev,
        [qId]: true,
      }));
      if (newChoice === currentQuestion.correctIndex) {
        sound.playCorrect();
      } else {
        sound.playWrong();
      }
    }
  };

  // Toggle Flag
  const handleToggleFlag = () => {
    sound.playClick();
    const qId = currentQuestion.id;
    setFlaggedIds((prev) => {
      const next = new Set(prev);
      if (next.has(qId)) {
        next.delete(qId);
      } else {
        next.add(qId);
      }
      return next;
    });
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Avoid if user is in an input or modal
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.key === 'ArrowRight' && currentIndex < totalQuestions - 1) {
        sound.playClick();
        setCurrentIndex((i) => i + 1);
      } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
        sound.playClick();
        setCurrentIndex((i) => i - 1);
      } else if (['1', '2', '3', '4'].includes(e.key)) {
        const idx = parseInt(e.key, 10) - 1;
        if (currentQuestion.options[idx] !== undefined) {
          handleSelectOption(idx);
        }
      } else if (['a', 'b', 'c', 'd'].includes(e.key.toLowerCase())) {
        const map: Record<string, number> = { a: 0, b: 1, c: 2, d: 3 };
        const idx = map[e.key.toLowerCase()];
        if (currentQuestion.options[idx] !== undefined) {
          handleSelectOption(idx);
        }
      } else if (e.key.toLowerCase() === 'f' || e.key.toLowerCase() === 'm') {
        handleToggleFlag();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, totalQuestions, currentQuestion, handleSelectOption, handleToggleFlag]);

  // Format time (MM:SS)
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const answeredCount = Object.values(userAnswers).filter((v) => v !== -1).length;
  const progressPercent = Math.round(((currentIndex + 1) / totalQuestions) * 100);
  const selectedOption = userAnswers[currentQuestion.id];
  const isFlagged = flaggedIds.has(currentQuestion.id);
  const isRevealed = mode === 'smart_study' && revealedInSmartStudy[currentQuestion.id];

  return (
    <div className="min-h-screen bg-[#090814] text-slate-100 flex flex-col justify-between">
      {/* Top Header Bar */}
      <header className="sticky top-0 z-30 bg-[#0c0a1a]/90 backdrop-blur-md border-b border-purple-900/30">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          {/* Exit / Back button */}
          <button
            onClick={() => {
              sound.playClick();
              if (answeredCount > 0 && mode === 'exam') {
                if (confirm('¿Deseas salir del examen en curso? Tu progreso actual se perderá.')) {
                  onExit();
                }
              } else {
                onExit();
              }
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 transition-colors text-xs sm:text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Salir</span>
          </button>

          {/* Test Title & Question Indicator */}
          <div className="text-center flex-1 max-w-md mx-2 truncate">
            <span className="text-xs uppercase tracking-wider font-semibold text-purple-400">
              {mode === 'exam' ? 'Simulacro Oficial' : 'Estudio Inteligente'}
            </span>
            <h2 className="text-sm sm:text-base font-bold text-white truncate">{exam.title}</h2>
          </div>

          {/* Right items: Timer & Drawer Trigger */}
          <div className="flex items-center gap-2">
            {/* Timer */}
            <div
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border font-mono text-xs sm:text-sm font-semibold ${
                exam.timeLimitMinutes > 0 && secondsRemaining < 120
                  ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 animate-pulse'
                  : 'bg-white/5 text-purple-300 border-white/10'
              }`}
            >
              <Clock className="w-4 h-4" />
              <span>{exam.timeLimitMinutes > 0 ? formatTime(secondsRemaining) : formatTime(timeSpent)}</span>
            </div>

            {/* Questions Drawer button */}
            <button
              onClick={() => { sound.playClick(); setShowDrawer(!showDrawer); }}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-colors"
              title="Abrir hoja de preguntas"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Global Progress Line */}
        <div className="w-full bg-slate-900 h-1">
          <div
            className="bg-gradient-to-r from-purple-500 to-cyan-400 h-1 transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </header>

      {/* Main Examination Workspace */}
      <main className="max-w-4xl mx-auto px-4 py-6 w-full flex-1 flex flex-col justify-center">
        {/* Question Metadata & Flag Button */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-600/30 text-purple-300 border border-purple-500/40">
              Pregunta {currentIndex + 1} de {totalQuestions}
            </span>
            {currentQuestion.category && (
              <span className="hidden sm:inline text-xs text-slate-400">
                • {currentQuestion.category}
              </span>
            )}
          </div>

          {/* Flag question */}
          <button
            onClick={handleToggleFlag}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
              isFlagged
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-md'
                : 'bg-white/5 text-slate-400 hover:text-white border-white/10'
            }`}
          >
            <Flag className={`w-3.5 h-3.5 ${isFlagged ? 'fill-amber-400' : ''}`} />
            <span>{isFlagged ? 'Marcada con duda' : 'Marcar duda'}</span>
          </button>
        </div>

        {/* Question Text Card */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md mb-6 shadow-xl">
          <h3 className="text-base sm:text-xl font-semibold text-white leading-relaxed">
            {currentQuestion.text}
          </h3>
        </div>

        {/* Options List */}
        <div className="space-y-3 mb-6">
          {currentQuestion.options.map((option, optIdx) => {
            const letter = String.fromCharCode(65 + optIdx); // A, B, C, D
            const isSelected = selectedOption === optIdx;
            const isCorrectAnswer = optIdx === currentQuestion.correctIndex;

            // Compute styling based on mode and reveal status
            let cardStyle = 'bg-white/[0.03] hover:bg-white/[0.07] border-white/10 text-slate-200';
            let badgeStyle = 'bg-white/10 text-slate-300 border-white/10';

            if (mode === 'exam') {
              if (isSelected) {
                cardStyle = 'bg-purple-600/20 border-purple-500 text-white shadow-glow-purple/20';
                badgeStyle = 'bg-purple-600 text-white border-purple-400';
              }
            } else if (mode === 'smart_study' && isRevealed) {
              if (isCorrectAnswer) {
                cardStyle = 'bg-emerald-500/20 border-emerald-500 text-white shadow-md';
                badgeStyle = 'bg-emerald-600 text-white border-emerald-400';
              } else if (isSelected && !isCorrectAnswer) {
                cardStyle = 'bg-rose-500/20 border-rose-500 text-rose-200 shadow-md';
                badgeStyle = 'bg-rose-600 text-white border-rose-400';
              } else {
                cardStyle = 'opacity-50 bg-white/[0.02] border-white/5 text-slate-400';
              }
            } else if (isSelected) {
              cardStyle = 'bg-purple-600/20 border-purple-500 text-white';
              badgeStyle = 'bg-purple-600 text-white';
            }

            return (
              <button
                key={optIdx}
                onClick={() => handleSelectOption(optIdx)}
                className={`w-full p-4 rounded-xl border text-left flex items-start gap-3.5 transition-all duration-200 group ${cardStyle}`}
              >
                {/* Option Letter Badge */}
                <span className={`w-7 h-7 shrink-0 rounded-lg flex items-center justify-center text-xs font-bold border transition-colors ${badgeStyle}`}>
                  {letter}
                </span>

                {/* Option Text */}
                <span className="flex-1 text-sm sm:text-base font-normal pt-0.5 leading-snug">
                  {option}
                </span>

                {/* Feedback Icons in Smart Study */}
                {mode === 'smart_study' && isRevealed && (
                  <span className="shrink-0 mt-0.5">
                    {isCorrectAnswer ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    ) : isSelected ? (
                      <XCircle className="w-5 h-5 text-rose-400" />
                    ) : null}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Smart Study Explanation Box */}
        {mode === 'smart_study' && isRevealed && (
          <div className="p-5 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 text-indigo-100 mb-6 animate-fadeIn">
            <div className="flex items-center gap-2 mb-2 font-semibold text-sm text-cyan-300">
              <Lightbulb className="w-4 h-4 text-amber-400" />
              <span>Explicación pedagógica Thea:</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              {currentQuestion.explanation || 'Respuesta correcta verificada.'}
            </p>
          </div>
        )}
      </main>

      {/* Bottom Sticky Footer Navigation */}
      <footer className="sticky bottom-0 z-30 bg-[#0c0a1a]/95 backdrop-blur-md border-t border-purple-900/30 py-3.5">
        <div className="max-w-4xl mx-auto px-4 flex items-center justify-between gap-3">
          {/* Previous Question Button */}
          <button
            onClick={() => {
              if (currentIndex > 0) {
                sound.playClick();
                setCurrentIndex((i) => i - 1);
              }
            }}
            disabled={currentIndex === 0}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-white/5 border border-white/10 text-xs sm:text-sm font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Anterior</span>
          </button>

          {/* Quick Clear Answer in Exam mode */}
          {selectedOption !== undefined && selectedOption !== -1 && (
            <button
              onClick={() => {
                sound.playClick();
                setUserAnswers((prev) => ({
                  ...prev,
                  [currentQuestion.id]: -1,
                }));
              }}
              className="text-xs text-slate-400 hover:text-slate-200 underline hidden sm:inline"
              title="Dejar en blanco para evitar penalización"
            >
              Dejar en blanco
            </button>
          )}

          <div className="flex items-center gap-2">
            {/* Next Question or Finish Button */}
            {currentIndex < totalQuestions - 1 ? (
              <button
                onClick={() => {
                  sound.playClick();
                  setCurrentIndex((i) => i + 1);
                }}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs sm:text-sm font-semibold shadow-glow-purple transition-all"
              >
                <span>Siguiente</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => {
                  sound.playClick();
                  setShowConfirmModal(true);
                }}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-semibold shadow-md transition-all hover:scale-105"
              >
                <Send className="w-4 h-4" />
                <span>Entregar Test</span>
              </button>
            )}
          </div>
        </div>
      </footer>

      {/* Questions Navigation Drawer Modal / Sheet */}
      {showDrawer && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-md bg-[#0f0e21] border-l border-white/10 p-6 flex flex-col justify-between h-full animate-slideInRight">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  <LayoutGrid className="w-4 h-4 text-purple-400" />
                  Hoja de Preguntas
                </h4>
                <button
                  onClick={() => setShowDrawer(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Legend */}
              <div className="grid grid-cols-3 gap-2 text-[11px] text-slate-300 mb-5 p-2.5 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-purple-600 inline-block" />
                  <span>Respondida ({answeredCount})</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
                  <span>Duda ({flaggedIds.size})</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-slate-800 border border-slate-600 inline-block" />
                  <span>Sin contestar ({totalQuestions - answeredCount})</span>
                </div>
              </div>

              {/* Grid of numbers */}
              <div className="grid grid-cols-5 gap-2 max-h-[60vh] overflow-y-auto pr-1">
                {exam.questions.map((q, idx) => {
                  const isAnswered = userAnswers[q.id] !== undefined && userAnswers[q.id] !== -1;
                  const isQFlagged = flaggedIds.has(q.id);
                  const isCurrent = idx === currentIndex;

                  let btnColor = 'bg-white/5 text-slate-300 border-white/10 hover:border-white/30';
                  if (isCurrent) {
                    btnColor = 'ring-2 ring-cyan-400 bg-white/10 text-white font-bold';
                  } else if (isAnswered) {
                    btnColor = 'bg-purple-600/50 text-white border-purple-500';
                  }

                  return (
                    <button
                      key={q.id}
                      onClick={() => {
                        sound.playClick();
                        setCurrentIndex(idx);
                        setShowDrawer(false);
                      }}
                      className={`relative p-2.5 rounded-xl border text-center text-xs font-medium transition-all ${btnColor}`}
                    >
                      {idx + 1}
                      {isQFlagged && (
                        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-400 ring-2 ring-[#0f0e21]" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Finish CTA in drawer */}
            <div className="pt-4 border-t border-white/10">
              <button
                onClick={() => {
                  sound.playClick();
                  setShowDrawer(false);
                  setShowConfirmModal(true);
                }}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold text-sm shadow-glow-purple"
              >
                Entregar y Ver Resultados
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Finish Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#111024] border border-white/10 rounded-3xl p-6 shadow-2xl text-center">
            <h3 className="text-xl font-bold text-white mb-2">¿Entregar y finalizar examen?</h3>
            <p className="text-sm text-slate-300 mb-6">
              Has respondido <strong className="text-purple-400">{answeredCount}</strong> de <strong className="text-white">{totalQuestions}</strong> preguntas.
              {totalQuestions - answeredCount > 0 && (
                <span className="block mt-1 text-xs text-amber-400">
                  Quedan {totalQuestions - answeredCount} preguntas sin contestar.
                </span>
              )}
            </p>

            <div className="flex items-center gap-3 justify-center">
              <button
                onClick={() => { sound.playClick(); setShowConfirmModal(false); }}
                className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-sm font-medium border border-white/10"
              >
                Seguir revisando
              </button>
              <button
                onClick={() => {
                  setShowConfirmModal(false);
                  calculateAndFinish();
                }}
                className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-sm font-semibold shadow-glow-purple"
              >
                Confirmar y Entregar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
