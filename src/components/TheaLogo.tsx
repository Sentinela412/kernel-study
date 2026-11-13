import React from 'react';

interface KernelLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const TheaLogo: React.FC<KernelLogoProps> = ({ className = '', size = 'md' }) => {
  const iconSizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
  };

  const textSizes = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl',
  };

  return (
    <div className={`flex items-center gap-2.5 font-bold tracking-tight select-none cursor-pointer ${className}`}>
      {/* Kernel Emblem: Microchip core / CPU kernel with purple and cyan glowing sparks */}
      <div className={`relative flex items-center justify-center rounded-xl bg-gradient-to-br from-purple-900/70 via-indigo-950 to-slate-950 p-1 border border-purple-500/40 shadow-glow-purple ${iconSizes[size]}`}>
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full text-white">
          {/* Outer processor frame */}
          <rect x="24" y="24" width="52" height="52" rx="10" stroke="currentColor" strokeWidth="6" />
          {/* Inner Kernel Core */}
          <rect x="38" y="38" width="24" height="24" rx="5" fill="#7c3aed" stroke="#38bdf8" strokeWidth="3" />
          {/* Kernel circuit lines */}
          <line x1="50" y1="14" x2="50" y2="24" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
          <line x1="50" y1="76" x2="50" y2="86" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
          <line x1="14" y1="50" x2="24" y2="50" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
          <line x1="76" y1="50" x2="86" y2="50" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
          {/* Sparks */}
          <polygon points="20,18 22,23 27,24.5 22,26 20,31 18,26 13,24.5 18,23" fill="#c084fc" />
          <polygon points="80,72 81.5,76 85.5,77.5 81.5,79 80,83 78.5,79 74.5,77.5 78.5,76" fill="#38bdf8" />
        </svg>
      </div>

      <div className="flex items-center">
        <span className={`font-black text-white tracking-tight font-sans ${textSizes[size]}`}>
          Kernel
        </span>
        <span className="text-xs font-black tracking-wider px-2.5 py-0.5 ml-2 rounded-full bg-purple-900/60 text-purple-200 border border-purple-500/40 uppercase shadow-inner">
          STUDY
        </span>
      </div>
    </div>
  );
};

export const KernelLogo = TheaLogo;
