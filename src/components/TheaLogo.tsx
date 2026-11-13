import React from 'react';

interface TheaLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const TheaLogo: React.FC<TheaLogoProps> = ({ className = '', size = 'md' }) => {
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
      {/* Thea Logo Icon replicating the uploaded emblem: feather quill with purple and cyan sparkles */}
      <div className={`relative flex items-center justify-center rounded-xl bg-gradient-to-br from-purple-900/60 to-indigo-950/80 p-1 border border-purple-500/30 shadow-glow-purple ${iconSizes[size]}`}>
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full text-white">
          {/* Feather quill pen contour */}
          <path
            d="M74 24 C69 19 46 30 33 48 C26 58 24 67 24 75 C32 75 41 73 51 66 C69 53 81 33 77 28 Z"
            stroke="currentColor"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Feather quill inner slit */}
          <path
            d="M40 58 L52 46"
            stroke="currentColor"
            strokeWidth="5"
            strokeLinecap="round"
          />
          {/* Sparkles (purple top-left, cyan bottom-right) */}
          <polygon points="23,24 25,29 30,30.5 25,32 23,37 21,32 16,30.5 21,29" fill="#c084fc" />
          <polygon points="76,68 77.5,72 81.5,73.5 77.5,75 76,79 74.5,75 70.5,73.5 74.5,72" fill="#38bdf8" />
        </svg>
      </div>

      <div className="flex items-center">
        <span className={`font-extrabold text-white tracking-tight ${textSizes[size]}`}>Thea</span>
        <span className="text-xs font-semibold px-2 py-0.5 ml-2 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
          STUDY
        </span>
      </div>
    </div>
  );
};
