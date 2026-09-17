import React from 'react';

/**
 * Unified AstraGuard Brand Logo Component
 * Ivory + Charcoal + Vermilion Visual System
 */
export default function AstraGuardLogo({ 
  size = 'md', 
  iconOnly = false, 
  showSub = true, 
  showVersion = true,
  darkTheme = false,
  className = '',
  onClick = null 
}) {
  const sizeMap = {
    xs: { icon: 'w-4 h-4', text: 'text-sm', sub: 'text-[9px]', pad: 'p-1' },
    sm: { icon: 'w-5 h-5', text: 'text-base', sub: 'text-[10px]', pad: 'p-1.5' },
    md: { icon: 'w-6 h-6', text: 'text-lg', sub: 'text-[11px]', pad: 'p-2' },
    lg: { icon: 'w-8 h-8', text: 'text-xl', sub: 'text-xs', pad: 'p-2.5' },
    xl: { icon: 'w-10 h-10', text: 'text-2xl', sub: 'text-xs', pad: 'p-3' },
    '2xl': { icon: 'w-12 h-12', text: 'text-3xl', sub: 'text-sm', pad: 'p-3.5' }
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  const markSvg = (
    <svg 
      className={`${currentSize.icon} shrink-0 transition-transform duration-200 group-hover:scale-105`} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="astraguard-vermilion-shield" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1C1C1A" />
          <stop offset="100%" stopColor="#292824" />
        </linearGradient>
      </defs>
      {/* Outer Shield Contour */}
      <path 
        d="M50 6 L90 20 V46 C90 70 50 92 50 92 C50 92 10 70 10 46 V20 L50 6 Z" 
        fill="url(#astraguard-vermilion-shield)" 
        stroke="#C74634" 
        strokeWidth="5" 
        strokeLinejoin="round"
      />
      {/* Stylized Astra "A" Geometry in Vermilion */}
      <path d="M50 22 L75 68 H64 L50 40 L36 68 H25 L50 22 Z" fill="#C74634" />
      {/* Verification Core Diamond */}
      <polygon points="50,42 61,53 50,64 39,53" fill="#FFFFFF" />
      {/* Horizontal Verification Bar */}
      <rect x="30" y="51.5" width="40" height="3" fill="#FFFFFF" rx="1.5" />
    </svg>
  );

  return (
    <div 
      onClick={onClick}
      className={`flex items-center space-x-3 select-none ${onClick ? 'cursor-pointer group' : ''} ${className}`}
    >
      {/* Logo Mark Container with Vermilion Border */}
      <div className={`rounded-lg bg-[#1C1C1A] border border-[#C74634]/60 flex items-center justify-center ${currentSize.pad} group-hover:border-[#C74634] shadow-sm transition-all`}>
        {markSvg}
      </div>

      {!iconOnly && (
        <div className="flex flex-col">
          <div className="flex items-center space-x-1.5">
            <span className={`font-bold font-mono tracking-tight ${darkTheme ? 'text-white' : 'text-[#1C1C1A]'} ${currentSize.text}`}>
              अस्त्रGuard
            </span>
            {showVersion && (
              <span className={`text-[10px] uppercase tracking-widest font-mono border px-1.5 py-0.5 rounded font-bold ${
                darkTheme 
                  ? 'bg-[#292824] text-[#C74634] border-[#C74634]/40' 
                  : 'bg-[#FBEDEA] text-[#C74634] border-[#F5D8D2]'
              }`}>
                OS v1.0
              </span>
            )}
          </div>
          {showSub && (
            <p className={`font-mono tracking-wider ${darkTheme ? 'text-[#918C82]' : 'text-[#5E5B55]'} ${currentSize.sub}`}>
              Detect. Verify. Protect.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
