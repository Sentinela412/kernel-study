import React from 'react';
import { TheaLogo } from './TheaLogo';
import { 
  Sparkles, 
  BarChart3, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Globe, 
  PlusCircle, 
  BookOpen
} from 'lucide-react';
import { sound } from '../utils/audio';

export type NavTab = 'explore' | 'creator' | 'stats' | 'wrong_review';

interface NavbarProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  wrongQuestionsCount: number;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenDeployGuide: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  wrongQuestionsCount,
  soundEnabled,
  onToggleSound,
  onOpenDeployGuide,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#090814]/85 border-b border-purple-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand / Logo */}
        <div onClick={() => { sound.playClick(); onSelectTab('explore'); }}>
          <TheaLogo size="md" />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1.5 p-1 rounded-2xl bg-white/5 border border-white/10">
          <button
            onClick={() => { sound.playClick(); onSelectTab('explore'); }}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-sm font-medium transition-all ${
              currentTab === 'explore'
                ? 'bg-purple-600 text-white shadow-glow-purple'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Explorar Tests
          </button>

          <button
            onClick={() => { sound.playClick(); onSelectTab('creator'); }}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-sm font-medium transition-all ${
              currentTab === 'creator'
                ? 'bg-purple-600 text-white shadow-glow-purple'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Sparkles className="w-4 h-4 text-purple-300" />
            Crear con IA
          </button>

          <button
            onClick={() => { sound.playClick(); onSelectTab('stats'); }}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-sm font-medium transition-all ${
              currentTab === 'stats'
                ? 'bg-purple-600 text-white shadow-glow-purple'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            Estadísticas
          </button>

          {wrongQuestionsCount > 0 && (
            <button
              onClick={() => { sound.playClick(); onSelectTab('wrong_review'); }}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-sm font-medium transition-all ${
                currentTab === 'wrong_review'
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'text-amber-300 hover:text-white hover:bg-amber-500/10'
              }`}
            >
              <RotateCcw className="w-4 h-4" />
              Repasar Fallos
              <span className="px-1.5 py-0.5 rounded-full text-xs font-bold bg-amber-400 text-black">
                {wrongQuestionsCount}
              </span>
            </button>
          )}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2.5">
          {/* Sound Toggle */}
          <button
            onClick={onToggleSound}
            title={soundEnabled ? 'Sonido activado' : 'Sonido silenciado'}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10 transition-colors"
          >
            {soundEnabled ? <Volume2 className="w-5 h-5 text-purple-400" /> : <VolumeX className="w-5 h-5 text-slate-500" />}
          </button>

          {/* Hosting & Google SEO Guide Button */}
          <button
            onClick={() => { sound.playClick(); onOpenDeployGuide(); }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-medium bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 transition-all hover:scale-105"
          >
            <Globe className="w-4 h-4 text-emerald-400" />
            <span className="hidden sm:inline">Aparecer en Google Gratis</span>
            <span className="sm:hidden">Publicar</span>
          </button>

          {/* Quick Create CTA for Mobile */}
          <button
            onClick={() => { sound.playClick(); onSelectTab('creator'); }}
            className="md:hidden p-2 rounded-xl bg-purple-600 text-white shadow-glow-purple"
          >
            <PlusCircle className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Mobile Navigation bar */}
      <div className="md:hidden flex items-center justify-around border-t border-white/5 py-2 px-1 bg-[#090814]/90">
        <button
          onClick={() => { sound.playClick(); onSelectTab('explore'); }}
          className={`flex flex-col items-center gap-1 px-3 py-1 text-xs font-medium ${
            currentTab === 'explore' ? 'text-purple-400 font-bold' : 'text-slate-400'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          Tests
        </button>
        <button
          onClick={() => { sound.playClick(); onSelectTab('creator'); }}
          className={`flex flex-col items-center gap-1 px-3 py-1 text-xs font-medium ${
            currentTab === 'creator' ? 'text-purple-400 font-bold' : 'text-slate-400'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          Crear IA
        </button>
        <button
          onClick={() => { sound.playClick(); onSelectTab('stats'); }}
          className={`flex flex-col items-center gap-1 px-3 py-1 text-xs font-medium ${
            currentTab === 'stats' ? 'text-purple-400 font-bold' : 'text-slate-400'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          Progreso
        </button>
        {wrongQuestionsCount > 0 && (
          <button
            onClick={() => { sound.playClick(); onSelectTab('wrong_review'); }}
            className={`flex flex-col items-center gap-1 px-3 py-1 text-xs font-medium ${
              currentTab === 'wrong_review' ? 'text-amber-400 font-bold' : 'text-amber-300/70'
            }`}
          >
            <RotateCcw className="w-4 h-4" />
            Fallos ({wrongQuestionsCount})
          </button>
        )}
      </div>
    </header>
  );
};
