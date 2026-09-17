import React from 'react';
import { ArrowDown, History, AlertTriangle } from 'lucide-react';

export default function ContextEngine({ contextFindings }) {
  if (!contextFindings) return null;

  const claimed = contextFindings.claimed_context || "Context provided in user submission.";
  const verified = contextFindings.verified_context || "Synthesized through historical media archive.";
  const temporal = contextFindings.temporal_mismatch;
  const isReused = contextFindings.image_reused;

  return (
    <div className="bg-[#FFFFFF] border border-[#D4CEC2] p-5 rounded-2xl space-y-4 shadow-subtle">
      <div className="flex items-center justify-between border-b border-[#E1DCD2] pb-3">
        <div className="flex items-center space-x-2">
          <History className="w-4 h-4 text-[#C74634]" />
          <h3 className="text-xs font-bold font-mono text-[#1C1C1A] uppercase tracking-wider">
            Context Engine & Temporal Displacement Analysis
          </h3>
        </div>
        <span className="text-[10px] font-mono bg-[#EDF2F5] text-[#46627A] px-2 py-0.5 rounded border border-[#C6D3DC] font-bold">
          Reverse Context Search Active
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono items-center">
        
        {/* CLAIMED CONTEXT */}
        <div className="bg-[#FAF8F4] p-4 rounded-xl border border-[#D4CEC2] space-y-2 h-full flex flex-col justify-between">
          <div className="space-y-1">
            <span className="text-[10px] text-[#B7791F] uppercase font-bold">1. Claimed Context</span>
            <p className="text-[#1C1C1A] font-sans">{claimed}</p>
          </div>
          <div className="text-[10px] text-[#858078] pt-2 border-t border-[#E1DCD2]">
            Source: Submission text/caption
          </div>
        </div>

        {/* TRANSITION ARROW / GAP */}
        <div className="flex flex-col items-center justify-center space-y-2 py-2 text-[#C74634]">
          <div className="w-8 h-8 rounded-full bg-[#FAF8F4] border border-[#D4CEC2] flex items-center justify-center shadow-subtle">
            <ArrowDown className="w-4 h-4 text-[#C74634] md:-rotate-90" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-center text-[#B7791F] bg-[#FBF2DD] px-2 py-0.5 rounded border border-[#E5CC99]">
            {isReused ? 'Temporal Mismatch' : 'Context Gap Discovered'}
          </span>
        </div>

        {/* ORIGINAL VERIFIED CONTEXT */}
        <div className="bg-[#EAF3ED] p-4 rounded-xl border border-[#B9D3C1] space-y-2 h-full flex flex-col justify-between">
          <div className="space-y-1">
            <span className="text-[10px] text-[#39704D] uppercase font-bold">2. Original Verified Context</span>
            <p className="text-[#1C1C1A] font-sans">{verified}</p>
          </div>
          <div className="text-[10px] text-[#5E5B55] pt-2 border-t border-[#B9D3C1] flex justify-between">
            <span>Archive Match</span>
            <strong className="text-[#39704D]">{contextFindings.original_date || 'Historical Index'}</strong>
          </div>
        </div>

      </div>

      {/* CONTEXT GAP SUMMARY BANNER */}
      <div className="p-3 bg-[#FAF8F4] border border-[#D4CEC2] rounded-xl flex items-start space-x-3 text-xs text-[#5E5B55]">
        <AlertTriangle className="w-4 h-4 text-[#B7791F] shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <strong className="text-[#1C1C1A] font-mono">Context Evaluation Summary: </strong>
          <span className="font-sans">
            {temporal || "The media or text claim appears authentic in origin, but has been assigned to an incorrect event, timeframe, or location."}
          </span>
        </div>
      </div>

    </div>
  );
}
