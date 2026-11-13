import React, { useState } from 'react';
import { Exam, StudyMode } from '../types';
import { 
  Clock, 
  HelpCircle, 
  Share2, 
  Download, 
  Trash2, 
  Play, 
  Brain, 
  Layers, 
  Check, 
  AlertCircle 
} from 'lucide-react';
import { sound } from '../utils/audio';
import { storage } from '../services/storage';

interface ExamCardProps {
  exam: Exam;
  onStartExam: (exam: Exam, mode: StudyMode) => void;
  onDeleteExam?: (id: string) => void;
}

export const ExamCard: React.FC<ExamCardProps> = ({
  exam,
  onStartExam,
  onDeleteExam,
}) => {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    sound.playClick();
    const url = storage.encodeExamToUrl(exam);
    if (url) {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleExport = () => {
    sound.playClick();
    storage.exportExamAsJson(exam);
  };

  return (
    <div className="relative group flex flex-col justify-between p-5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-purple-500/40 transition-all duration-300 shadow-lg hover:shadow-glow-purple/20">
      <div>
        {/* Top Header: Category & Share/Export tools */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30">
              {exam.category || 'General'}
            </span>
            {exam.isCustom && (
              <span className="px-2 py-0.5 rounded-lg text-[11px] font-medium bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Personalizado
              </span>
            )}
          </div>

          <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
            <button
              onClick={handleShare}
              title="Copiar enlace directo para compartir este examen"
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
            </button>

            <button
              onClick={handleExport}
              title="Descargar examen en archivo JSON"
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <Download className="w-4 h-4" />
            </button>

            {exam.isCustom && onDeleteExam && (
              <button
                onClick={() => {
                  if (confirm(`¿Eliminar el test "${exam.title}"?`)) {
                    sound.playClick();
                    onDeleteExam(exam.id);
                  }
                }}
                title="Eliminar examen"
                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-300 transition-colors line-clamp-2">
          {exam.title}
        </h3>

        {/* Description */}
        <p className="text-xs sm:text-sm text-slate-400 mb-4 line-clamp-3 leading-relaxed">
          {exam.description}
        </p>
      </div>

      <div>
        {/* Exam Metadata bar */}
        <div className="flex items-center gap-3 text-xs text-slate-400 py-3 mb-4 border-y border-white/5">
          <div className="flex items-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5 text-purple-400" />
            <span>{exam.questions.length} preguntas</span>
          </div>

          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-sky-400" />
            <span>{exam.timeLimitMinutes > 0 ? `${exam.timeLimitMinutes} min` : 'Sin límite'}</span>
          </div>

          {exam.penaltyRatio > 0 && (
            <div className="flex items-center gap-1.5 text-amber-400/90" title={`Cada fallo descuenta ${(exam.penaltyRatio).toFixed(2)} aciertos`}>
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Penaliza</span>
            </div>
          )}
        </div>

        {/* Action Modes Grid (Simulacro / Estudio / Flashcards) */}
        <div className="grid grid-cols-3 gap-2">
          {/* Mode 1: Simulacro */}
          <button
            onClick={() => { sound.playClick(); onStartExam(exam, 'exam'); }}
            className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-purple-600/30 hover:bg-purple-600 text-purple-200 hover:text-white border border-purple-500/30 transition-all duration-200 group/btn"
          >
            <Play className="w-4 h-4 mb-1 text-purple-300 group-hover/btn:text-white" />
            <span className="text-xs font-semibold">Simulacro</span>
          </button>

          {/* Mode 2: Smart Study */}
          <button
            onClick={() => { sound.playClick(); onStartExam(exam, 'smart_study'); }}
            className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-cyan-600/20 hover:bg-cyan-600 text-cyan-200 hover:text-white border border-cyan-500/30 transition-all duration-200 group/btn"
          >
            <Brain className="w-4 h-4 mb-1 text-cyan-300 group-hover/btn:text-white" />
            <span className="text-xs font-semibold">Estudio</span>
          </button>

          {/* Mode 3: Flashcards */}
          <button
            onClick={() => { sound.playClick(); onStartExam(exam, 'flashcards'); }}
            className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-indigo-600/20 hover:bg-indigo-600 text-indigo-200 hover:text-white border border-indigo-500/30 transition-all duration-200 group/btn"
          >
            <Layers className="w-4 h-4 mb-1 text-indigo-300 group-hover/btn:text-white" />
            <span className="text-xs font-semibold">Tarjetas</span>
          </button>
        </div>

        {copied && (
          <div className="mt-2 text-center text-xs text-emerald-400 font-medium">
            ¡Enlace copiado al portapapeles! Listo para compartir.
          </div>
        )}
      </div>
    </div>
  );
};
