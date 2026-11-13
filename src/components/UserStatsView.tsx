import React from 'react';
import { UserStats, Exam, StudyMode } from '../types';
import { 
  BarChart3, 
  Award, 
  CheckCircle2, 
  HelpCircle, 
  RotateCcw, 
  Clock, 
  Trash2, 
  TrendingUp,
  BrainCircuit,
  ArrowRight
} from 'lucide-react';
import { sound } from '../utils/audio';
import { storage } from '../services/storage';

interface UserStatsViewProps {
  stats: UserStats;
  onStartWrongSession: (wrongExam: Exam) => void;
  onRefreshStats: () => void;
  onGoHome: () => void;
}

export const UserStatsView: React.FC<UserStatsViewProps> = ({
  stats,
  onStartWrongSession,
  onRefreshStats,
  onGoHome,
}) => {
  const wrongQuestionsList = Object.values(stats.savedWrongQuestions);

  const handleLaunchWrongPractice = () => {
    sound.playClick();
    if (wrongQuestionsList.length === 0) return;

    const wrongExam: Exam = {
      id: `reinforcement-${Date.now()}`,
      title: `Sesión de Repaso de Fallos (${wrongQuestionsList.length} preguntas)`,
      description: 'Test adaptativo enfocado en todas las preguntas que has fallado previamente.',
      category: 'Repaso Personalizado',
      timeLimitMinutes: Math.max(5, Math.ceil(wrongQuestionsList.length * 1.5)),
      penaltyRatio: 0.33,
      questions: wrongQuestionsList,
      createdAt: new Date().toISOString(),
      isCustom: true,
    };

    onStartWrongSession(wrongExam);
  };

  const handleClearWrongBank = () => {
    if (confirm('¿Deseas vaciar tu banco de fallos pendientes?')) {
      sound.playClick();
      storage.clearWrongQuestions();
      onRefreshStats();
    }
  };

  // Average official grade calculation
  const totalGrades = stats.history.reduce((sum, h) => sum + h.officialGrade, 0);
  const avgGrade = stats.history.length > 0 ? (totalGrades / stats.history.length).toFixed(2) : '0.00';

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-purple-950/40">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2.5">
            <BarChart3 className="w-7 h-7 text-purple-400" />
            Panel de Progreso y Estadísticas
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Seguimiento de tu rendimiento, precisión y evolución en tus simulacros de examen.
          </p>
        </div>

        <button
          onClick={() => { sound.playClick(); onGoHome(); }}
          className="self-start sm:self-auto px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs sm:text-sm font-medium text-slate-300 hover:text-white transition-colors"
        >
          Volver al catálogo
        </button>
      </div>

      {/* 4 Key Performance Indicators (KPIs) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10">
          <div className="flex items-center justify-between text-purple-400 mb-2">
            <span className="text-xs font-semibold text-slate-400">Tests Completados</span>
            <Award className="w-4 h-4" />
          </div>
          <p className="text-3xl font-extrabold text-white">{stats.totalTestsTaken}</p>
          <span className="text-[11px] text-slate-500">Sesiones finalizadas</span>
        </div>

        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10">
          <div className="flex items-center justify-between text-emerald-400 mb-2">
            <span className="text-xs font-semibold text-slate-400">Nota Media Oficial</span>
            <TrendingUp className="w-4 h-4" />
          </div>
          <p className="text-3xl font-extrabold text-white">{avgGrade} <span className="text-sm font-normal text-slate-400">/ 10</span></p>
          <span className="text-[11px] text-slate-500">Con penalización aplicada</span>
        </div>

        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10">
          <div className="flex items-center justify-between text-cyan-400 mb-2">
            <span className="text-xs font-semibold text-slate-400">Preguntas Contestadas</span>
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <p className="text-3xl font-extrabold text-white">{stats.totalQuestionsAnswered}</p>
          <span className="text-[11px] text-slate-500">{stats.correctAnswersCount} aciertos totales</span>
        </div>

        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10">
          <div className="flex items-center justify-between text-amber-400 mb-2">
            <span className="text-xs font-semibold text-slate-400">Efectividad Media</span>
            <BrainCircuit className="w-4 h-4" />
          </div>
          <p className="text-3xl font-extrabold text-white">{stats.averageScorePercentage}%</p>
          <span className="text-[11px] text-slate-500">Precisión global</span>
        </div>
      </div>

      {/* Adaptive Error Bank (Banco de Fallos) */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-950/30 via-purple-950/20 to-[#0f0e24] border border-amber-500/30 mb-8 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Active Recall & Spaced Repetition
              </span>
              <span className="text-xs text-slate-400">• Sistema Kernel Study</span>
            </div>
            <h3 className="text-lg font-bold text-white">Banco de Preguntas Falladas</h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl mt-1">
              Tienes <strong>{wrongQuestionsList.length}</strong> preguntas pendientes de consolidar. Practica solo estas preguntas hasta dominarlas al 100%.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {wrongQuestionsList.length > 0 && (
              <>
                <button
                  onClick={handleClearWrongBank}
                  title="Vaciar banco de errores"
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-rose-500/20 text-slate-400 hover:text-rose-300 border border-white/10 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <button
                  onClick={handleLaunchWrongPractice}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg transition-all hover:scale-105"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Repasar {wrongQuestionsList.length} Fallos Ahora</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* History Table */}
      <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Clock className="w-4 h-4 text-purple-400" />
          Historial de Simulacros Recientes
        </h3>

        {stats.history.length === 0 ? (
          <div className="text-center py-12 text-slate-400 text-sm">
            <HelpCircle className="w-8 h-8 text-slate-600 mx-auto mb-2" />
            <p>Aún no has completado ningún simulacro.</p>
            <p className="text-xs text-slate-500 mt-1">Elige un examen en el catálogo para registrar tu primera nota.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-white/10 text-slate-400 font-semibold">
                  <th className="py-3 px-3">Fecha</th>
                  <th className="py-3 px-3">Examen</th>
                  <th className="py-3 px-3">Modo</th>
                  <th className="py-3 px-3 text-center">Aciertos / Fallos</th>
                  <th className="py-3 px-3 text-right">Nota Oficial</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {stats.history.map((h) => {
                  const dateStr = new Date(h.date).toLocaleDateString('es-ES', {
                    day: '2-digit',
                    month: 'short',
                    hour: '2-digit',
                    minute: '2-digit',
                  });

                  return (
                    <tr key={h.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3.5 px-3 text-slate-400 whitespace-nowrap">{dateStr}</td>
                      <td className="py-3.5 px-3 font-medium text-white max-w-xs truncate">{h.examTitle}</td>
                      <td className="py-3.5 px-3 whitespace-nowrap">
                        <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-white/5 border border-white/10 text-purple-300">
                          {h.mode === 'exam' ? 'Simulacro' : 'Estudio'}
                        </span>
                      </td>
                      <td className="py-3.5 px-3 text-center whitespace-nowrap">
                        <span className="text-emerald-400 font-bold">{h.correctCount}</span>
                        <span className="text-slate-500 mx-1">/</span>
                        <span className="text-rose-400 font-bold">{h.incorrectCount}</span>
                      </td>
                      <td className="py-3.5 px-3 text-right whitespace-nowrap">
                        <span className={`font-bold px-2.5 py-1 rounded-lg text-xs ${
                          h.officialGrade >= 5 ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                        }`}>
                          {h.officialGrade.toFixed(2)}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
