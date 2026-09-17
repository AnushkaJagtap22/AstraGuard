import React from 'react';
import { Link } from 'react-router-dom';
import AstraGuardLogo from '../components/AstraGuardLogo';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-[#F5F1E8] text-[#1C1C1A] flex flex-col items-center justify-center p-6 font-mono select-none">
      <div className="max-w-md w-full bg-[#FFFFFF] border border-[#D4CEC2] rounded-xl p-8 shadow-md flex flex-col items-center text-center space-y-6">
        
        <AstraGuardLogo size="lg" darkTheme={false} />

        <div className="space-y-2">
          <span className="text-4xl font-bold text-[#C74634]">404</span>
          <h1 className="text-lg font-bold tracking-wide text-[#1C1C1A]">PAGE NOT FOUND</h1>
          <p className="text-xs text-[#5E5B55] font-sans leading-relaxed">
            The AstraGuard route you requested does not exist or has been moved.
          </p>
        </div>

        <div className="w-full pt-2">
          <Link
            to="/"
            className="w-full inline-flex items-center justify-center px-4 py-2.5 bg-[#C74634] hover:bg-[#9F2F24] text-white font-mono text-xs font-bold rounded-lg transition-all shadow-subtle cursor-pointer"
          >
            [ Return to Dashboard ]
          </Link>
        </div>

      </div>
    </div>
  );
}
