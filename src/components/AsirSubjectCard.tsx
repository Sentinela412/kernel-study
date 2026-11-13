import React, { useState } from 'react';
import { Exam, StudyMode } from '../types';
import { Play, Brain, X, ChevronRight, Award, Clock } from 'lucide-react';
import { sound } from '../utils/audio';

interface AsirSubjectCardProps {
  exam: Exam;
  onStartExam: (exam: Exam, mode: StudyMode) => void;
}

export const AsirSubjectCard: React.FC<AsirSubjectCardProps> = ({
  exam,
  onStartExam,
}) => {
  const [showModal, setShowModal] = useState(false);

  // SVG Icon dispatcher matching the user's images
  const renderSubjectIcon = () => {
    if (exam.id === 'asir-hardware') {
      // Hardware / Graphics card icon
      return (
        <svg viewBox="0 0 100 100" fill="none" className="w-24 h-24 stroke-slate-300" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          {/* PCIe bracket */}
          <path d="M22 18 L22 82 M22 28 L16 28 L16 80 L22 80" />
          {/* PCB Main board */}
          <rect x="22" y="24" width="58" height="52" rx="3" strokeWidth="1.8" />
          {/* Fan Circle & Blades */}
          <circle cx="56" cy="48" r="18" strokeWidth="1.8" />
          <circle cx="56" cy="48" r="4" fill="#c8f53c" stroke="#c8f53c" />
          {/* Fan blades */}
          <path d="M56 30 C56 36 52 42 56 44 M56 66 C56 60 60 54 56 52 M74 48 C68 48 62 44 60 48 M38 48 C44 48 50 52 52 48" />
          {/* Capacitors and chips */}
          <rect x="28" y="32" width="8" height="10" rx="1" />
          <rect x="28" y="48" width="8" height="10" rx="1" />
          <rect x="39" y="60" width="6" height="6" rx="1" fill="#c8f53c" stroke="none" />
          {/* PCIe golden fingers */}
          <path d="M30 76 L30 84 M35 76 L35 84 M40 76 L40 84 M45 76 L45 84 M50 76 L50 84 M55 76 L55 84 M65 76 L65 84 M70 76 L70 84 M75 76 L75 84" />
        </svg>
      );
    }

    if (exam.id === 'asir-bases-datos') {
      // Database cylinder on desktop monitor with tree nodes
      return (
        <svg viewBox="0 0 100 100" fill="none" className="w-24 h-24 stroke-slate-300" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          {/* Monitor frame */}
          <rect x="18" y="30" width="64" height="42" rx="3" strokeWidth="1.8" />
          {/* Stand and base */}
          <path d="M46 72 L44 80 L56 80 L54 72" />
          <path d="M36 80 L64 80" />
          <circle cx="50" cy="67" r="1.5" />
          {/* Database Cylinder on top/center */}
          <g transform="translate(18, -12)">
            <ellipse cx="32" cy="30" rx="14" ry="5" strokeWidth="1.8" />
            <path d="M18 30 L18 42 C18 45 24 47 32 47 C40 47 46 45 46 42 L46 30" strokeWidth="1.8" />
            <path d="M18 36 C18 39 24 41 32 41 C40 41 46 39 46 36" strokeWidth="1.8" />
          </g>
          {/* Relational / Network nodes inside screen */}
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
      // Smartphone + Smartwatch with arrows
      return (
        <svg viewBox="0 0 100 100" fill="none" className="w-24 h-24 stroke-slate-300" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          {/* Smartphone */}
          <rect x="20" y="16" width="36" height="66" rx="6" strokeWidth="1.8" />
          <circle cx="38" cy="22" r="1" />
          <line x1="30" y1="22" x2="35" y2="22" />
          <line x1="34" y1="76" x2="42" y2="76" />
          {/* Smartwatch strap */}
          <rect x="62" y="24" width="18" height="52" rx="3" strokeWidth="1.8" />
          {/* Smartwatch case */}
          <rect x="56" y="36" width="30" height="30" rx="6" fill="#001779" strokeWidth="1.8" />
          {/* Exchange Arrows */}
          <path d="M42 42 L28 42 M28 42 L33 37 M28 42 L33 47" strokeWidth="2" stroke="#c8f53c" />
          <path d="M28 58 L42 58 M42 58 L37 53 M42 58 L37 63" strokeWidth="2" stroke="#c8f53c" />
          {/* Screen dumbbell/app widget */}
          <path d="M65 46 L65 56 M77 46 L77 56 M65 51 L77 51" stroke="#c8f53c" strokeWidth="2" />
          <path d="M32 30 L44 30 M32 34 L40 34" />
        </svg>
      );
    }

    // Default: Operating systems laptop
    return (
      <svg viewBox="0 0 100 100" fill="none" className="w-24 h-24 stroke-slate-300" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        {/* Laptop Screen */}
        <rect x="22" y="24" width="56" height="40" rx="4" strokeWidth="1.8" />
        {/* Laptop Base */}
        <path d="M12 66 L88 66 C88 68 86 76 80 76 L20 76 C14 76 12 68 12 66 Z" strokeWidth="1.8" />
        <path d="M42 66 L58 66 L55 70 L45 70 Z" />
        {/* Power On Symbol on Screen */}
        <path d="M44 40 A8 8 0 1 0 56 40" strokeWidth="2" stroke="#c8f53c" />
        <line x1="50" y1="34" x2="50" y2="42" strokeWidth="2" stroke="#c8f53c" />
        {/* Loading / status progress line */}
        <line x1="36" y1="52" x2="64" y2="52" strokeWidth="1.8" stroke="#c8f53c" />
      </svg>
    );
  };

  // Splitting title into ASIR prefix and subject name
  const titleParts = exam.title.split(' - ');
  const code = titleParts[0] || 'A1S2627ASIR';
  const name = titleParts[1] || exam.title;

  return (
    <>
      {/* Subject Card replicating the screenshot exactly */}
      <div className="relative flex flex-col justify-between w-full min-h-[380px] p-6 rounded-3xl bg-[#001779] border border-blue-900/60 shadow-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_15px_35px_rgba(0,23,121,0.5)]">
        {/* Header Title: Exact typography and layout */}
        <div>
          <span className="block text-xl sm:text-2xl font-black text-white tracking-tight leading-tight font-sans">
            {code} -
          </span>
          <span className="block text-xl sm:text-2xl font-black text-white tracking-tight leading-snug font-sans">
            {name}
          </span>
        </div>

        {/* Center Line Art Icon */}
        <div className="flex items-center justify-center my-6 py-2">
          {renderSubjectIcon()}
        </div>

        {/* Bottom Section: Lime Pill "Entrar" Button */}
        <div>
          <button
            onClick={() => {
              sound.playClick();
              setShowModal(true);
            }}
            className="w-full py-3.5 px-6 rounded-full bg-[#c8f53c] hover:bg-[#bbf028] active:scale-95 text-[#001779] font-black text-base sm:text-lg tracking-wide text-center transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
          >
            <span>Entrar</span>
          </button>
        </div>
      </div>

      {/* Mode Selector Modal when clicking "Entrar" */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-[#071355] border-2 border-[#c8f53c]/40 rounded-3xl p-6 sm:p-8 shadow-2xl relative animate-fadeIn text-slate-100">
            {/* Close Button */}
            <button
              onClick={() => { sound.playClick(); setShowModal(false); }}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Subject Header */}
            <div className="mb-6">
              <span className="text-xs font-black uppercase tracking-wider text-[#c8f53c]">
                {code}
              </span>
              <h3 className="text-2xl font-black text-white leading-tight mt-1">
                {name}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                {exam.description}
              </p>
            </div>

            {/* Exam Info badges */}
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

            {/* 2 Study Modes */}
            <div className="space-y-3 mb-6">
              {/* Mode 1: Test Evaluable */}
              <button
                onClick={() => {
                  sound.playClick();
                  setShowModal(false);
                  onStartExam(exam, 'exam');
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

              {/* Mode 2: Ponte a prueba */}
              <button
                onClick={() => {
                  sound.playClick();
                  setShowModal(false);
                  onStartExam(exam, 'smart_study');
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
    </>
  );
};
