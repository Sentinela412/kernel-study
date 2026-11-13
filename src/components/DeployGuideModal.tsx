import React, { useState } from 'react';
import { 
  Globe, 
  Check, 
  Copy, 
  X, 
  Search, 
  Sparkles, 
  ExternalLink, 
  Terminal, 
  ShieldCheck,
  Server
} from 'lucide-react';
import { sound } from '../utils/audio';

interface DeployGuideModalProps {
  onClose: () => void;
}

export const DeployGuideModal: React.FC<DeployGuideModalProps> = ({ onClose }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyCode = (text: string, index: number) => {
    sound.playClick();
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="w-full max-w-3xl bg-[#0e0d22] border border-purple-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl my-8">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              <Globe className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                Cómo Alojar Gratis y Aparecer en Google
              </h3>
              <p className="text-xs sm:text-sm text-slate-400">
                Guía completa para publicar tu aplicación sin pagar un solo euro y recibir visitas de cualquier persona.
              </p>
            </div>
          </div>
          <button
            onClick={() => { sound.playClick(); onClose(); }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
          {/* Section 1: Hosting */}
          <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10">
            <div className="flex items-center gap-2 text-white font-bold text-base mb-3">
              <Server className="w-5 h-5 text-purple-400" />
              <span>Paso 1: Alojamiento Gratuito de por Vida (Recomendado: Vercel)</span>
            </div>
            <p className="mb-3">
              Esta aplicación está construida con <strong>Vite + React</strong>, lo que genera una web estática ultra-rápida con HTTPS (candado verde) y dominio gratuito automático.
            </p>

            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-black/40 border border-white/5">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-semibold text-white flex items-center gap-1.5">
                    <Terminal className="w-4 h-4 text-cyan-400" />
                    Opción A: Publicar directamente desde la terminal con Vercel (1 minuto)
                  </span>
                  <button
                    onClick={() => copyCode('npx vercel', 1)}
                    className="p-1 text-slate-400 hover:text-white"
                  >
                    {copiedIndex === 1 ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                <code className="block font-mono text-purple-300 text-xs bg-slate-950 p-2 rounded-lg">
                  npx vercel
                </code>
                <p className="text-[11px] text-slate-400 mt-1">
                  Ejecuta este comando en la carpeta del proyecto. Te pedirá iniciar sesión con tu cuenta de GitHub/Google gratis y te generará una URL pública (ejemplo: <strong className="text-white">https://tu-examen.vercel.app</strong>).
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-black/40 border border-white/5">
                <span className="font-semibold text-white block mb-1">
                  Opción B: Subir a GitHub + Vercel / Netlify
                </span>
                <p className="text-[11px] text-slate-400 mb-2">
                  1. Sube este código a tu repositorio de GitHub.<br />
                  2. Entra en <a href="https://vercel.com" target="_blank" rel="noreferrer" className="text-purple-400 underline">vercel.com</a> o <a href="https://netlify.com" target="_blank" rel="noreferrer" className="text-purple-400 underline">netlify.com</a> con tu cuenta.<br />
                  3. Haz clic en "Add New Project" e importa tu repositorio. ¡Se compilará automáticamente en 30 segundos!
                </p>
              </div>
            </div>
          </div>

          {/* Section 2: Google Search SEO */}
          <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10">
            <div className="flex items-center gap-2 text-white font-bold text-base mb-3">
              <Search className="w-5 h-5 text-cyan-400" />
              <span>Paso 2: Cómo Hacer que Aparezca en Google (100% Gratis)</span>
            </div>

            <p className="mb-3">
              Ya hemos preparado la aplicación con todo el SEO técnico necesario para posicionarse en los primeros resultados de Google:
            </p>

            <ul className="space-y-2 mb-4">
              <li className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Metaetiquetas SEO y OpenGraph</strong> ya integradas en <code className="text-purple-300">index.html</code> (título, descripción atractiva, palabras clave para oposiciones y estudiantes).</span>
              </li>
              <li className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Schema.org JSON-LD estructurado</strong>: Google reconocerá tu web como <code className="text-purple-300">WebApplication</code> y plataforma educativa, mostrando resultados enriquecidos.</span>
              </li>
              <li className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Archivos <code className="text-purple-300">robots.txt</code> y <code className="text-purple-300">sitemap.xml</code> incluidos en la carpeta <code className="text-purple-300">public/</code> para dar la bienvenida a Googlebot.</span>
              </li>
            </ul>

            <div className="p-4 rounded-xl bg-purple-950/30 border border-purple-500/30">
              <h5 className="font-bold text-white mb-2 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-400" />
                Pasos para indexar tu web en Google en 24 horas:
              </h5>
              <ol className="list-decimal list-inside space-y-1.5 text-xs text-slate-300">
                <li>
                  Accede a <a href="https://search.google.com/search-console" target="_blank" rel="noreferrer" className="text-cyan-300 underline font-semibold">Google Search Console</a> (herramienta oficial y gratuita de Google).
                </li>
                <li>
                  Haz clic en <strong>"Añadir propiedad"</strong> y pega la URL de tu aplicación (ej: <code className="text-purple-300">https://mi-test.vercel.app</code>).
                </li>
                <li>
                  En el menú lateral, ve a <strong>"Sitemaps"</strong> e introduce: <code className="text-emerald-300 font-mono">sitemap.xml</code>.
                </li>
                <li>
                  En la barra superior de búsqueda de Search Console, pega tu URL y haz clic en <strong>"Solicitar indexación"</strong>. ¡Google enviará su robot a rastrear tu web de inmediato!
                </li>
              </ol>
            </div>
          </div>

          {/* Section 3: Custom Domain (Optional) */}
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex items-start gap-3">
            <Globe className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h5 className="font-semibold text-white mb-1">¿Quieres un dominio propio (.com o .es)? (Opcional)</h5>
              <p className="text-xs text-slate-400">
                Vercel y Netlify te permiten conectar un dominio personalizado (como <code className="text-purple-300">www.misexamenes.com</code>) de forma 100% gratuita. Solo tendrías que adquirir el nombre de dominio en cualquier registrador si en el futuro deseas tu propia marca.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 mt-6 border-t border-white/10 flex justify-end">
          <button
            onClick={() => { sound.playClick(); onClose(); }}
            className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-sm shadow-glow-purple transition-all"
          >
            Entendido, ¡gracias!
          </button>
        </div>
      </div>
    </div>
  );
};
