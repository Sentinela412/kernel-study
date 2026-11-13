import React from 'react';
import { Sparkles, Brain, Award, Clock, Search } from 'lucide-react';
import { sound } from '../utils/audio';

interface HeroSectionProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  categories: string[];
  onCreateClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
  categories,
  onCreateClick,
}) => {
  return (
    <div className="relative overflow-hidden pt-8 pb-10 border-b border-purple-950/40">
      {/* Background glowing orbs */}
      <div className="absolute top-0 left-1/4 -translate-x-1/2 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Top badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-900/40 border border-purple-500/30 text-purple-200 text-xs sm:text-sm font-medium mb-5 shadow-glow-purple">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>La alternativa gratuita a Thea.study para crear y practicar exámenes</span>
        </div>

        {/* Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-4">
          Aprende más rápido con <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-purple-400 via-indigo-300 to-cyan-400 bg-clip-text text-transparent">
            Simulacros y Estudio Inteligente
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-300 mb-8 leading-relaxed">
          Practica con cronómetros y penalizaciones oficiales de oposición, pon a prueba tu memoria con flashcards y genera tests automáticamente a partir de cualquier texto o tema con IA.
        </p>

        {/* Key Feature highlights */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto mb-8">
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-2.5 text-left">
            <div className="p-2 rounded-xl bg-purple-500/20 text-purple-300">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs text-slate-400">Simulacros</p>
              <p className="text-xs sm:text-sm font-semibold text-white">Tiempo Real</p>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-2.5 text-left">
            <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-300">
              <Brain className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs text-slate-400">Modo Activo</p>
              <p className="text-xs sm:text-sm font-semibold text-white">Smart Study</p>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-2.5 text-left">
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-300">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs text-slate-400">Baremo Oficial</p>
              <p className="text-xs sm:text-sm font-semibold text-white">Penalización</p>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-2.5 text-left">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-300">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs text-slate-400">Generador</p>
              <p className="text-xs sm:text-sm font-semibold text-white">IA y Apuntes</p>
            </div>
          </div>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar test por tema o palabra clave..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 transition-colors text-sm"
            />
          </div>

          {/* Quick Create Button */}
          <button
            onClick={() => { sound.playClick(); onCreateClick(); }}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-medium text-sm flex items-center justify-center gap-2 shadow-glow-purple transition-all hover:scale-105"
          >
            <Sparkles className="w-4 h-4" />
            Crear Nuevo Test
          </button>
        </div>

        {/* Category Pills */}
        <div className="flex items-center justify-center gap-2 flex-wrap mt-4">
          <button
            onClick={() => { sound.playClick(); onSelectCategory('all'); }}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
              selectedCategory === 'all'
                ? 'bg-purple-600 text-white border border-purple-400'
                : 'bg-white/5 text-slate-400 hover:text-white border border-white/10'
            }`}
          >
            Todos
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => { sound.playClick(); onSelectCategory(cat); }}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-purple-600 text-white border border-purple-400'
                  : 'bg-white/5 text-slate-400 hover:text-white border border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
