import React, { useState, useEffect, useMemo } from 'react';
import { Exam, ExamResult, StudyMode, UserStats, AppSettings } from './types';
import { storage } from './services/storage';
import { sound } from './utils/audio';
import { Navbar, NavTab } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ExamCard } from './components/ExamCard';
import { AsirSubjectCard } from './components/AsirSubjectCard';
import { ExamRunner } from './components/ExamRunner';
import { ExamResults } from './components/ExamResults';
import { FlashcardRunner } from './components/FlashcardRunner';
import { ExamCreatorModal } from './components/ExamCreatorModal';
import { UserStatsView } from './components/UserStatsView';
import { DeployGuideModal } from './components/DeployGuideModal';
import { TheaLogo } from './components/TheaLogo';
import { 
  Sparkles, 
  BookOpen, 
  RotateCcw, 
  HelpCircle, 
  Share2, 
  Plus, 
  Globe, 
  CheckCircle2 
} from 'lucide-react';

export const App: React.FC = () => {
  // Application State
  const [exams, setExams] = useState<Exam[]>(() => storage.getExams());
  const [stats, setStats] = useState<UserStats>(() => storage.getUserStats());
  const [settings, setSettings] = useState<AppSettings>(() => storage.getSettings());

  // Navigation & Current Flow
  const [currentTab, setCurrentTab] = useState<NavTab>('explore');
  const [activeExam, setActiveExam] = useState<Exam | null>(null);
  const [studyMode, setStudyMode] = useState<StudyMode>('exam');
  const [examResult, setExamResult] = useState<ExamResult | null>(null);

  // Modals
  const [isCreatorOpen, setIsCreatorOpen] = useState(false);
  const [isDeployGuideOpen, setIsDeployGuideOpen] = useState(false);

  // Search & Filtering
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Sync sound settings
  useEffect(() => {
    sound.setEnabled(settings.soundEnabled);
  }, [settings.soundEnabled]);

  // Check for shared exam in URL on startup
  useEffect(() => {
    const sharedExam = storage.decodeExamFromUrl();
    if (sharedExam) {
      storage.saveExam(sharedExam);
      setExams(storage.getExams());
      // Clean query parameter from URL without reload
      window.history.replaceState({}, document.title, window.location.pathname);
      alert(`¡Se ha importado con éxito el examen compartido: "${sharedExam.title}"!`);
      setActiveExam(sharedExam);
      setStudyMode('exam');
    }
  }, []);

  // Compute Categories
  const categories = useMemo(() => {
    const set = new Set<string>();
    exams.forEach((e) => {
      if (e.category) set.add(e.category);
    });
    return Array.from(set);
  }, [exams]);

  // Filtered Exams
  const filteredExams = useMemo(() => {
    return exams.filter((e) => {
      const matchSearch =
        e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchCategory = selectedCategory === 'all' || e.category === selectedCategory;

      return matchSearch && matchCategory;
    });
  }, [exams, searchQuery, selectedCategory]);

  // Wrong Questions count
  const wrongQuestionsCount = Object.keys(stats.savedWrongQuestions).length;

  // Handlers
  const handleStartExam = (exam: Exam, mode: StudyMode) => {
    setActiveExam(exam);
    setStudyMode(mode);
    setExamResult(null);
  };

  const handleFinishExam = (result: ExamResult) => {
    if (activeExam) {
      storage.saveExamResult(result, activeExam);
      setStats(storage.getUserStats());
    }
    setExamResult(result);
  };

  const handleSaveExam = (newExam: Exam) => {
    storage.saveExam(newExam);
    setExams(storage.getExams());
    setIsCreatorOpen(false);
    setCurrentTab('explore');
    sound.playCorrect();
    // Auto start the newly created exam
    handleStartExam(newExam, 'exam');
  };

  const handleDeleteExam = (id: string) => {
    storage.deleteExam(id);
    setExams(storage.getExams());
  };

  const handleToggleSound = () => {
    const updated = !settings.soundEnabled;
    const newSettings = { ...settings, soundEnabled: updated };
    setSettings(newSettings);
    storage.saveSettings(newSettings);
    sound.setEnabled(updated);
    if (updated) sound.playClick();
  };

  const handleSelectTab = (tab: NavTab) => {
    if (tab === 'creator') {
      setIsCreatorOpen(true);
    } else {
      setCurrentTab(tab);
      setActiveExam(null);
      setExamResult(null);
    }
  };

  // Launch wrong questions practice directly
  const handleStartWrongSession = (wrongExam: Exam) => {
    setActiveExam(wrongExam);
    setStudyMode('exam');
    setExamResult(null);
    setCurrentTab('explore');
  };

  // 1. ACTIVE FLOW: EXAM RUNNER (SIMULACRO O ESTUDIO INTELIGENTE)
  if (activeExam && !examResult && studyMode !== 'flashcards') {
    return (
      <ExamRunner
        exam={activeExam}
        mode={studyMode}
        onFinishExam={handleFinishExam}
        onExit={() => {
          setActiveExam(null);
          setExamResult(null);
        }}
      />
    );
  }

  // 2. ACTIVE FLOW: FLASHCARD RUNNER
  if (activeExam && !examResult && studyMode === 'flashcards') {
    return (
      <FlashcardRunner
        exam={activeExam}
        onExit={() => {
          setActiveExam(null);
          setExamResult(null);
        }}
      />
    );
  }

  // 3. ACTIVE FLOW: RESULTS SCREEN
  if (activeExam && examResult) {
    return (
      <ExamResults
        exam={activeExam}
        result={examResult}
        onRetryFull={() => {
          setExamResult(null);
        }}
        onRetryWrongOnly={(wrongExam) => {
          setActiveExam(wrongExam);
          setExamResult(null);
          setStudyMode('exam');
        }}
        onGoHome={() => {
          setActiveExam(null);
          setExamResult(null);
          setCurrentTab('explore');
        }}
      />
    );
  }

  // 4. MAIN DASHBOARD / TAB VIEWS
  return (
    <div className="min-h-screen bg-[#090814] text-slate-100 flex flex-col justify-between selection:bg-purple-600 selection:text-white">
      {/* Navigation Bar */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={handleSelectTab}
        wrongQuestionsCount={wrongQuestionsCount}
        soundEnabled={settings.soundEnabled}
        onToggleSound={handleToggleSound}
        onOpenDeployGuide={() => setIsDeployGuideOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentTab === 'explore' && (
          <div>
            {/* Hero Section */}
            <HeroSection
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              categories={categories}
              onCreateClick={() => setIsCreatorOpen(true)}
            />

            {/* Exam Cards Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-purple-400" />
                    Catálogo de Simulacros y Tests
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Elige un tema y comienza a practicar en cualquiera de sus 3 modalidades.
                  </p>
                </div>

                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300">
                  {filteredExams.length} tests disponibles
                </span>
              </div>

              {filteredExams.length === 0 ? (
                <div className="p-12 text-center rounded-3xl bg-white/[0.02] border border-white/10 max-w-md mx-auto">
                  <HelpCircle className="w-10 h-10 text-slate-500 mx-auto mb-3" />
                  <h3 className="text-lg font-bold text-white mb-1">No se encontraron tests</h3>
                  <p className="text-xs text-slate-400 mb-5">
                    No hay ningún examen que coincida con tus términos de búsqueda o categoría.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                    }}
                    className="px-4 py-2 rounded-xl bg-purple-600 text-white text-xs font-semibold"
                  >
                    Restablecer filtros
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                  {filteredExams.map((exam) => {
                    if (exam.id.startsWith('asir-')) {
                      return (
                        <AsirSubjectCard
                          key={exam.id}
                          exam={exam}
                          onStartExam={handleStartExam}
                        />
                      );
                    }

                    return (
                      <ExamCard
                        key={exam.id}
                        exam={exam}
                        onStartExam={handleStartExam}
                        onDeleteExam={handleDeleteExam}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* PROGRESS & STATS TAB */}
        {currentTab === 'stats' && (
          <UserStatsView
            stats={stats}
            onStartWrongSession={handleStartWrongSession}
            onRefreshStats={() => setStats(storage.getUserStats())}
            onGoHome={() => setCurrentTab('explore')}
          />
        )}

        {/* WRONG QUESTIONS REVIEW TAB */}
        {currentTab === 'wrong_review' && (
          <div className="max-w-4xl mx-auto px-4 py-10">
            <div className="p-8 rounded-3xl bg-amber-950/20 border border-amber-500/30 text-center">
              <span className="p-3 rounded-2xl bg-amber-500/20 text-amber-300 inline-block mb-4">
                <RotateCcw className="w-8 h-8" />
              </span>
              <h2 className="text-2xl font-bold text-white mb-2">
                Repaso Inteligente de Fallos ({wrongQuestionsCount} pendientes)
              </h2>
              <p className="text-sm text-slate-300 max-w-lg mx-auto mb-6">
                Kernel Study registra automáticamente las preguntas que has fallado en tus simulacros anteriores para que puedas practicarlas de forma focalizada hasta memorizarlas.
              </p>

              {wrongQuestionsCount > 0 ? (
                <button
                  onClick={() => {
                    const wrongExam: Exam = {
                      id: `wrong-test-${Date.now()}`,
                      title: 'Repaso de Preguntas Falladas',
                      description: 'Sesión enfocada en reforzar tus puntos débiles.',
                      category: 'Refuerzo',
                      timeLimitMinutes: Math.max(5, Math.ceil(wrongQuestionsCount * 1.5)),
                      penaltyRatio: 0.33,
                      questions: Object.values(stats.savedWrongQuestions),
                      createdAt: new Date().toISOString(),
                      isCustom: true,
                    };
                    handleStartWrongSession(wrongExam);
                  }}
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-black font-bold text-sm shadow-xl hover:scale-105 transition-all"
                >
                  Comenzar Test de Fallos Ahora
                </button>
              ) : (
                <p className="text-xs text-emerald-400 font-semibold">
                  ¡No tienes ningún fallo pendiente en tu banco de errores! Buen trabajo.
                </p>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Global Footer */}
      <footer className="mt-16 border-t border-purple-950/40 bg-[#070611] py-10 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <TheaLogo size="sm" />
            <span className="text-slate-500">|</span>
            <span>Simulador de exámenes tipo test y estudio activo</span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <button
              onClick={() => { sound.playClick(); setIsDeployGuideOpen(true); }}
              className="text-emerald-400 hover:underline flex items-center gap-1 font-medium"
            >
              <Globe className="w-3.5 h-3.5" />
              Publicar Gratis en Google
            </button>
            <button
              onClick={() => { sound.playClick(); setIsCreatorOpen(true); }}
              className="text-purple-400 hover:underline flex items-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Crear con IA
            </button>
          </div>

          <div className="text-slate-500 flex items-center gap-1 text-[11px]">
            <span>100% Gratuito y de código abierto</span>
          </div>
        </div>
      </footer>

      {/* Creator Modal */}
      {isCreatorOpen && (
        <ExamCreatorModal
          onSaveExam={handleSaveExam}
          onClose={() => setIsCreatorOpen(false)}
        />
      )}

      {/* Deploy & SEO Guide Modal */}
      {isDeployGuideOpen && (
        <DeployGuideModal
          onClose={() => setIsDeployGuideOpen(false)}
        />
      )}
    </div>
  );
};

export default App;
