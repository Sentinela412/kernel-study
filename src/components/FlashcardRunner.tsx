import React, { useState } from 'react';
import { Exam } from '../types';
import { 
  ArrowLeft, 
  RotateCw, 
  Check, 
  X, 
  Lightbulb, 
  Layers, 
  Sparkles, 
  CheckCircle2 
} from 'lucide-react';
import { sound } from '../utils/audio';
import confetti from 'canvas-confetti';

interface FlashcardRunnerProps {
  exam: Exam;
  onExit: () => void;
}

export const FlashcardRunner: React.FC<FlashcardRunnerProps> = ({
  exam,
  onExit,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [masteredCount, setMasteredCount] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentQ = exam.questions[currentIndex];
  const total = exam.questions.length;

  const handleFlip = () => {
    sound.playClick();
    setIsFlipped(!isFlipped);
  };

  const handleNext = (mastered: boolean) => {
    if (mastered) {
      sound.playCorrect();
      setMasteredCount((c) => c + 1);
    } else {
      sound.playWrong();
      setReviewCount((c) => c + 1);
    }

    setIsFlipped(false);

    if (currentIndex < total - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      setIsFinished(true);
      sound.playFanfare();
      confetti({ particleCount: 80, spread: 60 });
    }
  };

  const restartDeck = () => {
    sound.playClick();
    setCurrentIndex(0);
    setIsFlipped(false);
    setMasteredCount(0);
    setReviewCount(0);
    setIsFinished(false);
  };

  const correctAnswerText = currentQ ? currentQ.options[currentQ.correctIndex] : '';

  return (
    <div className="min-h-screen bg-[#090814] text-slate-100 flex flex-col justify-between p-4 sm:p-6">
      {/* Top Header */}
      <header className="max-w-3xl mx-auto w-full flex items-center justify-between pb-4 border-b border-purple-900/30">
        <button
          onClick={() => { sound.playClick(); onExit(); }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs sm:text-sm font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver</span>
        </button>

        <div className="text-center">
          <span className="text-xs uppercase tracking-wider font-semibold text-indigo-400 flex items-center gap-1.5 justify-center">
            <Layers className="w-3.5 h-3.5" />
            Tarjetas de Memoria Activa
          </span>
          <h2 className="text-sm sm:text-base font-bold text-white truncate max-w-xs">{exam.title}</h2>
        </div>

        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white/10 text-purple-300">
          {currentIndex + 1} / {total}
        </span>
      </header>

      {/* Main Flashcard Container */}
      <main className="max-w-2xl mx-auto w-full my-auto py-8">
        {!isFinished ? (
          <div>
            {/* Flashcard with 3D Flip style */}
            <div
              onClick={handleFlip}
              className="relative w-full min-h-[340px] sm:min-h-[380px] cursor-pointer select-none rounded-3xl p-8 sm:p-10 border transition-all duration-500 shadow-2xl flex flex-col justify-between group"
              style={{
                background: isFlipped
                  ? 'linear-gradient(135deg, rgba(30, 27, 75, 0.85), rgba(15, 23, 42, 0.95))'
                  : 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02))',
                borderColor: isFlipped ? 'rgba(124, 58, 237, 0.5)' : 'rgba(255, 255, 255, 0.1)',
              }}
            >
              {/* Badge & Flip hint */}
              <div className="flex items-center justify-between">
                <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
                  isFlipped ? 'bg-purple-600 text-white' : 'bg-white/10 text-slate-300'
                }`}>
                  {isFlipped ? 'Respuesta & Explicación' : 'Pregunta / Concepto'}
                </span>

                <div className="flex items-center gap-1.5 text-xs text-slate-400 group-hover:text-purple-300 transition-colors">
                  <RotateCw className="w-3.5 h-3.5" />
                  <span>Haz clic para voltear</span>
                </div>
              </div>

              {/* Front side: Question */}
              {!isFlipped ? (
                <div className="my-auto py-6">
                  <p className="text-lg sm:text-2xl font-bold text-white leading-relaxed text-center">
                    {currentQ.text}
                  </p>
                </div>
              ) : (
                /* Back side: Answer & Explanation */
                <div className="my-auto py-4 space-y-4 animate-fadeIn">
                  <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-200">
                    <span className="text-xs font-semibold block text-emerald-300 mb-1">
                      Respuesta Correcta:
                    </span>
                    <p className="text-base sm:text-lg font-bold text-white">
                      {correctAnswerText}
                    </p>
                  </div>

                  {currentQ.explanation && (
                    <div className="p-4 rounded-2xl bg-purple-950/40 border border-purple-500/30 text-xs sm:text-sm text-slate-200">
                      <span className="font-semibold text-purple-300 flex items-center gap-1.5 mb-1">
                        <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                        ¿Por qué es así?
                      </span>
                      <p className="leading-relaxed">{currentQ.explanation}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Progress dots footer */}
              <div className="flex items-center justify-between text-xs text-slate-400 pt-4 border-t border-white/5">
                <span>Dominadas: <strong className="text-emerald-400">{masteredCount}</strong></span>
                <span>Por repasar: <strong className="text-amber-400">{reviewCount}</strong></span>
              </div>
            </div>

            {/* Answer Feedback buttons */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              <button
                onClick={() => handleNext(false)}
                className="py-3.5 px-4 rounded-2xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 hover:text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all"
              >
                <X className="w-4 h-4" />
                <span>Aún no me lo sé</span>
              </button>

              <button
                onClick={() => handleNext(true)}
                className="py-3.5 px-4 rounded-2xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 hover:text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <Check className="w-4 h-4" />
                <span>¡Me lo sé perfecto!</span>
              </button>
            </div>
          </div>
        ) : (
          /* Finished summary */
          <div className="p-8 sm:p-10 rounded-3xl bg-white/[0.04] border border-white/10 text-center shadow-2xl">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center mx-auto mb-4 text-white shadow-glow-purple">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-bold text-white mb-2">¡Mazo de tarjetas completado!</h3>
            <p className="text-sm text-slate-300 mb-6">
              Has revisado las {total} tarjetas de memoria activa con éxito.
            </p>

            <div className="grid grid-cols-2 gap-3 max-w-xs mx-auto mb-8">
              <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center">
                <span className="text-xs text-emerald-400 font-semibold block">Dominadas</span>
                <span className="text-2xl font-bold text-white">{masteredCount}</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-center">
                <span className="text-xs text-amber-400 font-semibold block">Por repasar</span>
                <span className="text-2xl font-bold text-white">{reviewCount}</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3">
              <button
                onClick={restartDeck}
                className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-sm flex items-center gap-2 shadow-glow-purple transition-all"
              >
                <RotateCw className="w-4 h-4" />
                <span>Repasar de nuevo</span>
              </button>

              <button
                onClick={() => { sound.playClick(); onExit(); }}
                className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 text-sm font-medium transition-colors"
              >
                Volver a exámenes
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer spacer */}
      <div />
    </div>
  );
};
