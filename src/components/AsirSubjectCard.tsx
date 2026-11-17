import React, { useState } from 'react';
import { Exam, StudyMode } from '../types';
import { Play, Brain, X, ChevronRight, Award, Clock, BookOpen, GraduationCap, FileText, Trophy } from 'lucide-react';
import { sound } from '../utils/audio';

interface AsirSubjectCardProps {
  exam: Exam;
  onStartExam: (exam: Exam, mode: StudyMode) => void;
}

// Submodes for Test Evaluable
type ExamSubMode = 'ud1' | 'ud2' | 'ud3' | 'final';

interface SubModeOption {
  id: ExamSubMode;
  label: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const DEFAULT_SUB_MODES: SubModeOption[] = [
  {
    id: 'ud1',
    label: 'Test Evaluable UD1',
    description: 'Unidad Didáctica 1 · Preguntas del primer bloque',
    icon: <BookOpen className="w-5 h-5" />,
    color: 'bg-blue-500/20',
  },
  {
    id: 'ud2',
    label: 'Test Evaluable UD2',
    description: 'Unidad Didáctica 2 · Preguntas del segundo bloque',
    icon: <FileText className="w-5 h-5" />,
    color: 'bg-cyan-500/20',
  },
  {
    id: 'ud3',
    label: 'Test Evaluable UD3',
    description: 'Unidad Didáctica 3 · Preguntas del tercer bloque',
    icon: <GraduationCap className="w-5 h-5" />,
    color: 'bg-purple-500/20',
  },
  {
    id: 'final',
    label: 'Test Evaluable FINAL',
    description: 'Examen completo · Todas las unidades',
    icon: <Trophy className="w-5 h-5" />,
    color: 'bg-amber-500/20',
  },
];

const IAW_UNITS = [
  { num: 1, label: 'UD1. ¡Ponte a prueba!', desc: 'Unidad Didáctica 1 · Repaso con Active Recall', color: 'bg-emerald-500/20' },
  { num: 2, label: 'UD2. ¡Ponte a prueba!', desc: 'Unidad Didáctica 2 · Repaso con Active Recall', color: 'bg-cyan-500/20' },
  { num: 3, label: 'UD3. ¡Ponte a prueba!', desc: 'Unidad Didáctica 3 · Repaso con Active Recall', color: 'bg-blue-500/20' },
  { num: 4, label: 'UD4. ¡Ponte a prueba!', desc: 'Unidad Didáctica 4 · Repaso con Active Recall', color: 'bg-indigo-500/20' },
  { num: 5, label: 'UD5. ¡Ponte a prueba!', desc: 'Unidad Didáctica 5 · Repaso con Active Recall', color: 'bg-purple-500/20' },
  { num: 6, label: 'UD6. ¡Ponte a prueba!', desc: 'Unidad Didáctica 6 · Repaso con Active Recall', color: 'bg-pink-500/20' },
  { num: 7, label: 'UD7. ¡Ponte a prueba!', desc: 'Unidad Didáctica 7 · Repaso con Active Recall', color: 'bg-amber-500/20' },
];

export const AsirSubjectCard: React.FC<AsirSubjectCardProps> = ({
  exam,
  onStartExam,
}) => {
  // 'closed' | 'mode-select' | 'exam-submode' | 'gbd-nested' | 'iaw-smart-study' | 'iaw-ud6-nested'
  const [modalStep, setModalStep] = useState<'closed' | 'mode-select' | 'exam-submode' | 'gbd-nested' | 'iaw-smart-study' | 'iaw-ud6-nested'>('closed');

  const isBasesDatos = exam.id === 'asir-bases-datos';
  const isAppWeb = exam.id === 'asir-aplicaciones-web';

  // SVG Icon dispatcher matching the user's images
  const renderSubjectIcon = () => {
    if (exam.id === 'asir-hardware') {
      return (
        <svg viewBox="0 0 100 100" fill="none" className="w-24 h-24 stroke-slate-300" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 18 L22 82 M22 28 L16 28 L16 80 L22 80" />
          <rect x="22" y="24" width="58" height="52" rx="3" strokeWidth="1.8" />
          <circle cx="56" cy="48" r="18" strokeWidth="1.8" />
          <circle cx="56" cy="48" r="4" fill="#c8f53c" stroke="#c8f53c" />
          <path d="M56 30 C56 36 52 42 56 44 M56 66 C56 60 60 54 56 52 M74 48 C68 48 62 44 60 48 M38 48 C44 48 50 52 52 48" />
          <rect x="28" y="32" width="8" height="10" rx="1" />
          <rect x="28" y="48" width="8" height="10" rx="1" />
          <rect x="39" y="60" width="6" height="6" rx="1" fill="#c8f53c" stroke="none" />
          <path d="M30 76 L30 84 M35 76 L35 84 M40 76 L40 84 M45 76 L45 84 M50 76 L50 84 M55 76 L55 84 M65 76 L65 84 M70 76 L70 84 M75 76 L75 84" />
        </svg>
      );
    }

    if (exam.id === 'asir-bases-datos') {
      return (
        <svg viewBox="0 0 100 100" fill="none" className="w-24 h-24 stroke-slate-300" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="18" y="30" width="64" height="42" rx="3" strokeWidth="1.8" />
          <path d="M46 72 L44 80 L56 80 L54 72" />
          <path d="M36 80 L64 80" />
          <circle cx="50" cy="67" r="1.5" />
          <g transform="translate(18, -12)">
            <ellipse cx="32" cy="30" rx="14" ry="5" strokeWidth="1.8" />
            <path d="M18 30 L18 42 C18 45 24 47 32 47 C40 47 46 45 46 42 L46 30" strokeWidth="1.8" />
            <path d="M18 36 C18 39 24 41 32 41 C40 41 46 39 46 36" strokeWidth="1.8" />
          </g>
          <g transform="translate(2, 6)">
            <circle cx="32" cy="52" r="3" fill="#c8f53c" stroke="#c8f53c" />
            <circle cx="48" cy="52" r="3" fill="#c8f53c" stroke="#c8f53c" />
            <circle cx="64" cy="52" r="3" fill="#c8f53c" stroke="#c8f53c" />
            <path d="M35 52 L45 52 M51 52 L61 52 M48 42 L48 49" />
          </g>
        </svg>
      );
    }

    if (exam.id === 'asir-aplicaciones-web') {
      return (
        <svg viewBox="0 0 100 100" fill="none" className="w-24 h-24 stroke-slate-300" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="20" y="16" width="36" height="66" rx="6" strokeWidth="1.8" />
          <circle cx="38" cy="22" r="1" />
          <line x1="30" y1="22" x2="35" y2="22" />
          <line x1="34" y1="76" x2="42" y2="76" />
          <rect x="62" y="24" width="18" height="52" rx="3" strokeWidth="1.8" />
          <rect x="56" y="36" width="30" height="30" rx="6" fill="#001779" strokeWidth="1.8" />
          <path d="M42 42 L28 42 M28 42 L33 37 M28 42 L33 47" strokeWidth="2" stroke="#c8f53c" />
          <path d="M28 58 L42 58 M42 58 L37 53 M42 58 L37 63" strokeWidth="2" stroke="#c8f53c" />
          <path d="M65 46 L65 56 M77 46 L77 56 M65 51 L77 51" stroke="#c8f53c" strokeWidth="2" />
          <path d="M32 30 L44 30 M32 34 L40 34" />
        </svg>
      );
    }

    return (
      <svg viewBox="0 0 100 100" fill="none" className="w-24 h-24 stroke-slate-300" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="22" y="24" width="56" height="40" rx="4" strokeWidth="1.8" />
        <path d="M12 66 L88 66 C88 68 86 76 80 76 L20 76 C14 76 12 68 12 66 Z" strokeWidth="1.8" />
        <path d="M42 66 L58 66 L55 70 L45 70 Z" />
        <path d="M44 40 A8 8 0 1 0 56 40" strokeWidth="2" stroke="#c8f53c" />
        <line x1="50" y1="34" x2="50" y2="42" strokeWidth="2" stroke="#c8f53c" />
        <line x1="36" y1="52" x2="64" y2="52" strokeWidth="1.8" stroke="#c8f53c" />
      </svg>
    );
  };

  const titleParts = exam.title.split(' - ');
  const code = titleParts[0] || 'A1S2627ASIR';
  const name = titleParts[1] || exam.title;

  const closeModal = () => {
    sound.playClick();
    setModalStep('closed');
  };

  const handleSubModeSelect = (sub: ExamSubMode) => {
    sound.playClick();
    setModalStep('closed');

    // Filter questions by UD category, or use all for FINAL
    let filteredQuestions = exam.questions;
    if (sub !== 'final') {
      filteredQuestions = exam.questions.filter((q) => q.category === sub);
    }

    const subExam: Exam = {
      ...exam,
      id: `${exam.id}-${sub}`,
      title: `${exam.title.split(' - ')[1] ?? exam.title} · ${
        sub === 'ud1' ? 'UD1' :
        sub === 'ud2' ? 'UD2' :
        sub === 'ud3' ? 'UD3' : 'FINAL'
      }`,
      questions: filteredQuestions.length > 0 ? filteredQuestions : exam.questions,
      timeLimitMinutes: sub === 'final' ? exam.timeLimitMinutes : Math.max(10, Math.ceil(filteredQuestions.length * 1.5)),
    };

    onStartExam(subExam, 'exam');
  };

  const handleGbdUd456Select = () => {
    sound.playClick();
    setModalStep('closed');

    const categoryKey = 'gbd-ud456';
    const filtered = exam.questions.filter((q) => q.category === categoryKey);

    const subExam: Exam = {
      ...exam,
      id: `${exam.id}-ud456`,
      title: `${exam.title.split(' - ')[1] ?? exam.title} · Test Evaluable UD4-UD5-UD6`,
      questions: filtered.length > 0 ? filtered : exam.questions,
      timeLimitMinutes: filtered.length > 0 ? Math.max(10, Math.ceil(filtered.length * 1.5)) : exam.timeLimitMinutes,
    };

    onStartExam(subExam, 'exam');
  };

  const handleGbdTestSelect = (testNum: 1 | 2) => {
    sound.playClick();
    setModalStep('closed');

    const categoryKey = testNum === 1 ? 'gbd-test1' : 'gbd-test2';
    const filtered = exam.questions.filter((q) => q.category === categoryKey);

    const subExam: Exam = {
      ...exam,
      id: `${exam.id}-test${testNum}`,
      title: `${exam.title.split(' - ')[1] ?? exam.title} · Test Evaluable ${testNum} (UD1-UD2-UD3)`,
      questions: filtered.length > 0 ? filtered : exam.questions,
      timeLimitMinutes: filtered.length > 0 ? Math.max(10, Math.ceil(filtered.length * 1.5)) : exam.timeLimitMinutes,
    };

    onStartExam(subExam, 'exam');
  };

  const handleIawSmartStudySelect = (udNumber: number) => {
    sound.playClick();
    setModalStep('closed');

    const categoryKey = `iaw-ud${udNumber}`;
    const filtered = exam.questions.filter((q) => q.category === categoryKey);

    const subExam: Exam = {
      ...exam,
      id: `${exam.id}-smart-ud${udNumber}`,
      title: `${exam.title.split(' - ')[1] ?? exam.title} · UD${udNumber}. ¡Ponte a prueba!`,
      questions: filtered.length > 0 ? filtered : exam.questions,
      timeLimitMinutes: 0,
    };

    onStartExam(subExam, 'smart_study');
  };

  const handleIawUd6TestSelect = (testNum: 1 | 2 | 3) => {
    sound.playClick();
    setModalStep('closed');

    const categoryKey = `iaw-ud6-test${testNum}`;
    const filtered = exam.questions.filter((q) => q.category === categoryKey);

    const subExam: Exam = {
      ...exam,
      id: `${exam.id}-smart-ud6-t${testNum}`,
      title: `${exam.title.split(' - ')[1] ?? exam.title} · UD6 - Ponte a prueba ${testNum}`,
      questions: filtered.length > 0 ? filtered : exam.questions,
      timeLimitMinutes: 0,
    };

    onStartExam(subExam, 'smart_study');
  };

  return (
    <>
      {/* Subject Card */}
      <div className="relative flex flex-col justify-between w-full min-h-[380px] p-6 rounded-3xl bg-[#001779] border border-blue-900/60 shadow-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_15px_35px_rgba(0,23,121,0.5)]">
        <div>
          <span className="block text-xl sm:text-2xl font-black text-white tracking-tight leading-tight font-sans">
            {code} -
          </span>
          <span className="block text-xl sm:text-2xl font-black text-white tracking-tight leading-snug font-sans">
            {name}
          </span>
        </div>

        <div className="flex items-center justify-center my-6 py-2">
          {renderSubjectIcon()}
        </div>

        <div>
          <button
            onClick={() => {
              sound.playClick();
              setModalStep('mode-select');
            }}
            className="w-full py-3.5 px-6 rounded-full bg-[#c8f53c] hover:bg-[#bbf028] active:scale-95 text-[#001779] font-black text-base sm:text-lg tracking-wide text-center transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
          >
            <span>Entrar</span>
          </button>
        </div>
      </div>

      {/* ── MODAL PASO 1: Selección de modo (Test Evaluable vs Ponte a prueba) ── */}
      {modalStep === 'mode-select' && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-[#071355] border-2 border-[#c8f53c]/40 rounded-3xl p-6 sm:p-8 shadow-2xl relative animate-fadeIn text-slate-100">
            <button
              onClick={closeModal}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <span className="text-xs font-black uppercase tracking-wider text-[#c8f53c]">{code}</span>
              <h3 className="text-2xl font-black text-white leading-tight mt-1">{name}</h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">{exam.description}</p>
            </div>

            <div className="flex items-center gap-4 text-xs text-slate-200 mb-6 py-3 px-4 rounded-2xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-[#c8f53c]" />
                <span>{exam.questions.length} preguntas oficiales</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-sky-400" />
                <span>{exam.timeLimitMinutes} min (3 fallos = -1 acierto)</span>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              {/* Test Evaluable → abre submodal */}
              <button
                onClick={() => {
                  sound.playClick();
                  setModalStep('exam-submode');
                }}
                className="w-full p-4 rounded-2xl bg-white/10 hover:bg-[#c8f53c] text-white hover:text-[#001779] border border-white/10 hover:border-transparent transition-all duration-200 flex items-center justify-between group"
              >
                <div className="flex items-center gap-3.5 text-left">
                  <div className="p-3 rounded-xl bg-purple-500/20 group-hover:bg-[#001779]/20 text-[#c8f53c] group-hover:text-[#001779] transition-colors">
                    <Play className="w-5 h-5 fill-current" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm sm:text-base">Test Evaluable</h4>
                    <p className="text-xs opacity-80">Con cronómetro y penalización por error</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </button>

              {/* Ponte a prueba → abre selector de UDs en IAW o inicia directamente */}
              <button
                onClick={() => {
                  sound.playClick();
                  if (isAppWeb) {
                    setModalStep('iaw-smart-study');
                  } else {
                    setModalStep('closed');
                    onStartExam(exam, 'smart_study');
                  }
                }}
                className="w-full p-4 rounded-2xl bg-white/10 hover:bg-[#c8f53c] text-white hover:text-[#001779] border border-white/10 hover:border-transparent transition-all duration-200 flex items-center justify-between group"
              >
                <div className="flex items-center gap-3.5 text-left">
                  <div className="p-3 rounded-xl bg-cyan-500/20 group-hover:bg-[#001779]/20 text-[#c8f53c] group-hover:text-[#001779] transition-colors">
                    <Brain className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm sm:text-base">Ponte a prueba</h4>
                    <p className="text-xs opacity-80">Corrección instantánea y explicación detallada</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL PASO 2: Selección de bloques para Test Evaluable ── */}
      {modalStep === 'exam-submode' && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-[#071355] border-2 border-[#c8f53c]/40 rounded-3xl p-6 sm:p-8 shadow-2xl relative animate-fadeIn text-slate-100">
            {/* Botón cerrar */}
            <button
              onClick={closeModal}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Cabecera */}
            <div className="mb-6">
              <button
                onClick={() => { sound.playClick(); setModalStep('mode-select'); }}
                className="text-xs text-[#c8f53c] hover:underline mb-2 flex items-center gap-1 opacity-80 hover:opacity-100"
              >
                ← Volver
              </button>
              <span className="text-xs font-black uppercase tracking-wider text-[#c8f53c]">{code}</span>
              <h3 className="text-2xl font-black text-white leading-tight mt-1">{name}</h3>
              <p className="text-sm text-slate-300 mt-2">
                Selecciona el test evaluable que quieres realizar:
              </p>
            </div>

            {/* Si es Gestión de bases de datos: mostrar opción UD1-UD2-UD3 y FINAL */}
            {isBasesDatos ? (
              <div className="space-y-3">
                {/* Test Evaluable UD1-UD2-UD3 */}
                <button
                  onClick={() => {
                    sound.playClick();
                    setModalStep('gbd-nested');
                  }}
                  className="w-full p-4 rounded-2xl bg-white/10 hover:bg-[#c8f53c] text-white hover:text-[#001779] border border-white/10 hover:border-transparent transition-all duration-200 flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3.5 text-left">
                    <div className="p-3 rounded-xl bg-blue-500/20 group-hover:bg-[#001779]/20 text-[#c8f53c] group-hover:text-[#001779] transition-colors">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm sm:text-base">Test Evaluable UD1-UD2-UD3</h4>
                      <p className="text-xs opacity-80">Unidades Didácticas 1, 2 y 3 · 2 Tests evaluables</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </button>

                {/* Test Evaluable UD4-UD5-UD6 */}
                <button
                  onClick={() => handleGbdUd456Select()}
                  className="w-full p-4 rounded-2xl bg-white/10 hover:bg-[#c8f53c] text-white hover:text-[#001779] border border-white/10 hover:border-transparent transition-all duration-200 flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3.5 text-left">
                    <div className="p-3 rounded-xl bg-purple-500/20 group-hover:bg-[#001779]/20 text-[#c8f53c] group-hover:text-[#001779] transition-colors">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm sm:text-base">Test Evaluable UD4-UD5-UD6</h4>
                      <p className="text-xs opacity-80">Unidades Didácticas 4, 5 y 6 · 20 preguntas oficiales</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </button>

                {/* Test Evaluable FINAL */}
                <button
                  onClick={() => handleSubModeSelect('final')}
                  className="w-full p-4 rounded-2xl bg-white/10 hover:bg-[#c8f53c] text-white hover:text-[#001779] border border-white/10 hover:border-transparent transition-all duration-200 flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3.5 text-left">
                    <div className="p-3 rounded-xl bg-amber-500/20 group-hover:bg-[#001779]/20 text-[#c8f53c] group-hover:text-[#001779] transition-colors">
                      <Trophy className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm sm:text-base">Test Evaluable FINAL</h4>
                      <p className="text-xs opacity-80">Examen completo · Todas las unidades</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </button>
              </div>
            ) : (
              /* Para el resto de asignaturas: UD1, UD2, UD3, FINAL */
              <div className="space-y-3">
                {DEFAULT_SUB_MODES.map((sub) => (
                  <button
                    key={sub.id}
                    onClick={() => handleSubModeSelect(sub.id)}
                    className="w-full p-4 rounded-2xl bg-white/10 hover:bg-[#c8f53c] text-white hover:text-[#001779] border border-white/10 hover:border-transparent transition-all duration-200 flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3.5 text-left">
                      <div className={`p-3 rounded-xl ${sub.color} group-hover:bg-[#001779]/20 text-[#c8f53c] group-hover:text-[#001779] transition-colors`}>
                        {sub.icon}
                      </div>
                      <div>
                        <h4 className="font-bold text-sm sm:text-base">{sub.label}</h4>
                        <p className="text-xs opacity-80">{sub.description}</p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── MODAL PASO 3 (Específico para Bases de datos UD1-UD2-UD3): Test 1 y Test 2 ── */}
      {modalStep === 'gbd-nested' && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-[#071355] border-2 border-[#c8f53c]/40 rounded-3xl p-6 sm:p-8 shadow-2xl relative animate-fadeIn text-slate-100">
            {/* Botón cerrar */}
            <button
              onClick={closeModal}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Cabecera */}
            <div className="mb-6">
              <button
                onClick={() => { sound.playClick(); setModalStep('exam-submode'); }}
                className="text-xs text-[#c8f53c] hover:underline mb-2 flex items-center gap-1 opacity-80 hover:opacity-100"
              >
                ← Volver
              </button>
              <span className="text-xs font-black uppercase tracking-wider text-[#c8f53c]">{code}</span>
              <h3 className="text-2xl font-black text-white leading-tight mt-1">{name}</h3>
              <p className="text-sm font-bold text-[#c8f53c] mt-1">
                Test Evaluable UD1-UD2-UD3
              </p>
              <p className="text-xs text-slate-300 mt-1">
                Selecciona cuál de los dos tests evaluables deseas realizar:
              </p>
            </div>

            {/* Opciones: Test Evaluable 1 y Test Evaluable 2 */}
            <div className="space-y-3">
              {/* Test Evaluable 1 */}
              <button
                onClick={() => handleGbdTestSelect(1)}
                className="w-full p-4 rounded-2xl bg-white/10 hover:bg-[#c8f53c] text-white hover:text-[#001779] border border-white/10 hover:border-transparent transition-all duration-200 flex items-center justify-between group"
              >
                <div className="flex items-center gap-3.5 text-left">
                  <div className="p-3 rounded-xl bg-blue-500/20 group-hover:bg-[#001779]/20 text-[#c8f53c] group-hover:text-[#001779] transition-colors">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm sm:text-base">Test Evaluable 1</h4>
                    <p className="text-xs opacity-80">Primer examen evaluable · UD1, UD2 y UD3</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </button>

              {/* Test Evaluable 2 */}
              <button
                onClick={() => handleGbdTestSelect(2)}
                className="w-full p-4 rounded-2xl bg-white/10 hover:bg-[#c8f53c] text-white hover:text-[#001779] border border-white/10 hover:border-transparent transition-all duration-200 flex items-center justify-between group"
              >
                <div className="flex items-center gap-3.5 text-left">
                  <div className="p-3 rounded-xl bg-purple-500/20 group-hover:bg-[#001779]/20 text-[#c8f53c] group-hover:text-[#001779] transition-colors">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm sm:text-base">Test Evaluable 2</h4>
                    <p className="text-xs opacity-80">Segundo examen evaluable · UD1, UD2 y UD3</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL PASO 4 (Específico para Implantación de aplicaciones web): UD1 a UD7 en Ponte a prueba ── */}
      {modalStep === 'iaw-smart-study' && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg max-h-[90vh] flex flex-col bg-[#071355] border-2 border-[#c8f53c]/40 rounded-3xl p-6 sm:p-8 shadow-2xl relative animate-fadeIn text-slate-100">
            {/* Botón cerrar */}
            <button
              onClick={closeModal}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Cabecera */}
            <div className="mb-4 flex-shrink-0">
              <button
                onClick={() => { sound.playClick(); setModalStep('mode-select'); }}
                className="text-xs text-[#c8f53c] hover:underline mb-2 flex items-center gap-1 opacity-80 hover:opacity-100"
              >
                ← Volver
              </button>
              <span className="text-xs font-black uppercase tracking-wider text-[#c8f53c]">{code}</span>
              <h3 className="text-2xl font-black text-white leading-tight mt-1">{name}</h3>
              <p className="text-sm font-bold text-[#c8f53c] mt-1">
                Ponte a prueba
              </p>
              <p className="text-xs text-slate-300 mt-1">
                Selecciona la unidad didáctica que deseas repasar:
              </p>
            </div>

            {/* Opciones UD1 a UD7 con scroll */}
            <div className="space-y-2.5 overflow-y-auto max-h-[55vh] pr-1.5">
              {IAW_UNITS.map((u) => (
                <button
                  key={u.num}
                  onClick={() => {
                    if (u.num === 6) {
                      sound.playClick();
                      setModalStep('iaw-ud6-nested');
                    } else {
                      handleIawSmartStudySelect(u.num);
                    }
                  }}
                  className="w-full p-3.5 rounded-2xl bg-white/10 hover:bg-[#c8f53c] text-white hover:text-[#001779] border border-white/10 hover:border-transparent transition-all duration-200 flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3.5 text-left">
                    <div className={`p-2.5 rounded-xl ${u.color} group-hover:bg-[#001779]/20 text-[#c8f53c] group-hover:text-[#001779] transition-colors`}>
                      <Brain className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm sm:text-base">{u.label}</h4>
                      <p className="text-xs opacity-80">{u.desc}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL PASO 5 (Específico para Implantación de aplicaciones web UD6): Ponte a prueba 1, 2 y 3 ── */}
      {modalStep === 'iaw-ud6-nested' && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-[#071355] border-2 border-[#c8f53c]/40 rounded-3xl p-6 sm:p-8 shadow-2xl relative animate-fadeIn text-slate-100">
            {/* Botón cerrar */}
            <button
              onClick={closeModal}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Cabecera */}
            <div className="mb-6">
              <button
                onClick={() => { sound.playClick(); setModalStep('iaw-smart-study'); }}
                className="text-xs text-[#c8f53c] hover:underline mb-2 flex items-center gap-1 opacity-80 hover:opacity-100"
              >
                ← Volver
              </button>
              <span className="text-xs font-black uppercase tracking-wider text-[#c8f53c]">{code}</span>
              <h3 className="text-2xl font-black text-white leading-tight mt-1">{name}</h3>
              <p className="text-sm font-bold text-[#c8f53c] mt-1">
                UD6. ¡Ponte a prueba!
              </p>
              <p className="text-xs text-slate-300 mt-1">
                Selecciona cuál de las tres pruebas deseas realizar:
              </p>
            </div>

            {/* Opciones: Ponte a prueba 1, 2 y 3 */}
            <div className="space-y-3">
              {/* Ponte a prueba 1 */}
              <button
                onClick={() => handleIawUd6TestSelect(1)}
                className="w-full p-4 rounded-2xl bg-white/10 hover:bg-[#c8f53c] text-white hover:text-[#001779] border border-white/10 hover:border-transparent transition-all duration-200 flex items-center justify-between group"
              >
                <div className="flex items-center gap-3.5 text-left">
                  <div className="p-3 rounded-xl bg-blue-500/20 group-hover:bg-[#001779]/20 text-[#c8f53c] group-hover:text-[#001779] transition-colors">
                    <Brain className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm sm:text-base">Ponte a prueba 1</h4>
                    <p className="text-xs opacity-80">10 preguntas · Acceso a datos, consultas y MySQLi</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </button>

              {/* Ponte a prueba 2 */}
              <button
                onClick={() => handleIawUd6TestSelect(2)}
                className="w-full p-4 rounded-2xl bg-white/10 hover:bg-[#c8f53c] text-white hover:text-[#001779] border border-white/10 hover:border-transparent transition-all duration-200 flex items-center justify-between group"
              >
                <div className="flex items-center gap-3.5 text-left">
                  <div className="p-3 rounded-xl bg-cyan-500/20 group-hover:bg-[#001779]/20 text-[#c8f53c] group-hover:text-[#001779] transition-colors">
                    <Brain className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm sm:text-base">Ponte a prueba 2</h4>
                    <p className="text-xs opacity-80">10 preguntas · Sentencias preparadas y seguridad</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </button>

              {/* Ponte a prueba 3 */}
              <button
                onClick={() => handleIawUd6TestSelect(3)}
                className="w-full p-4 rounded-2xl bg-white/10 hover:bg-[#c8f53c] text-white hover:text-[#001779] border border-white/10 hover:border-transparent transition-all duration-200 flex items-center justify-between group"
              >
                <div className="flex items-center gap-3.5 text-left">
                  <div className="p-3 rounded-xl bg-purple-500/20 group-hover:bg-[#001779]/20 text-[#c8f53c] group-hover:text-[#001779] transition-colors">
                    <Brain className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm sm:text-base">Ponte a prueba 3</h4>
                    <p className="text-xs opacity-80">10 preguntas · Scripting, sesiones y administración</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
