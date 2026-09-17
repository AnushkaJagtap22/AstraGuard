import React from 'react';
import { 
  ShieldAlert, 
  FileText, 
  Share2, 
  Link as LinkIcon, 
  ExternalLink, 
  ArrowLeft
} from 'lucide-react';
import ContextEngine from '../components/ContextEngine';
import ActionCenter from '../components/ActionCenter';

export default function InvestigationResultPage({ investigation, onBack, onViewGraph, openAssistant, openReportModal, onNavigate }) {
  if (!investigation) return null;

  const isMisleading = investigation.assessment?.includes("MISLEADING") || investigation.assessment?.includes("FALSE") || investigation.assessment?.includes("SCAM") || investigation.assessment?.includes("PHISHING");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300 bg-[#F5F1E8]">
      
      {/* NAVIGATION BAR */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#D4CEC2] pb-4">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-xs font-mono text-[#5E5B55] hover:text-[#C74634] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>BACK TO INVESTIGATION COMMAND</span>
        </button>

        <div className="flex items-center space-x-3">
          <button
            onClick={onViewGraph}
            className="flex items-center space-x-2 px-3.5 py-1.5 bg-[#FFFFFF] hover:bg-[#FAF8F4] text-[#1C1C1A] border border-[#D4CEC2] text-xs rounded-lg font-mono transition-all cursor-pointer shadow-subtle"
          >
            <Share2 className="w-3.5 h-3.5 text-[#5E5B55]" />
            <span>Open Evidence Graph</span>
          </button>
          
          <button
            onClick={openReportModal}
            className="flex items-center space-x-2 px-3.5 py-1.5 bg-[#C74634] hover:bg-[#9F2F24] text-white text-xs font-bold rounded-lg font-mono transition-all shadow-subtle cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5 text-white" />
            <span>Generate Report</span>
          </button>
        </div>
      </div>

      {/* FINAL ASSESSMENT HEADER BANNER */}
      <div className={`bg-[#FFFFFF] border rounded-3xl p-8 shadow-subtle relative overflow-hidden text-center space-y-4 ${
        isMisleading ? 'border-[#C74634] bg-[#FBEDEA]' : 'border-[#39704D] bg-[#EAF3ED]'
      }`}>
        <span className="text-[11px] font-mono text-[#858078] tracking-widest uppercase font-bold">
          INVESTIGATION COMPLETE • CASE #{investigation.id}
        </span>

        <div className="space-y-1">
          <h1 className={`text-3xl sm:text-5xl font-extrabold font-mono uppercase tracking-tight ${
            isMisleading ? 'text-[#C74634]' : 'text-[#39704D]'
          }`}>
            {investigation.assessment}
          </h1>

          <div className="flex items-center justify-center space-x-4 text-xs font-mono text-[#5E5B55] pt-2">
            <span>Confidence Rating: <strong className="text-[#1C1C1A]">{investigation.confidence}</strong></span>
            <span>•</span>
            <span>Evidence Strength: <strong className="text-[#C74634]">{investigation.evidence_strength}</strong></span>
          </div>
        </div>

        {/* WHY ASTRAGUARD REACHED THIS ASSESSMENT */}
        <div className="max-w-2xl mx-auto bg-[#FFFFFF] border border-[#D4CEC2] p-4 rounded-xl text-left space-y-2 text-xs font-sans shadow-subtle">
          <h4 className="font-mono font-bold text-[#C74634] uppercase tracking-wider text-[11px]">
            Why AstraGuard reached this assessment:
          </h4>
          <ul className="space-y-1 text-[#1C1C1A]">
            <li className="flex items-start space-x-2">
              <span className="text-[#C74634] font-bold font-mono">1.</span>
              <span>Official primary source registry contradicts the submitted claim parameters.</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-[#C74634] font-bold font-mono">2.</span>
              <span>Context Engine identified temporal displacement matching older historical archive photos.</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-[#C74634] font-bold font-mono">3.</span>
              <span>Domain parameters exhibit suspicious non-governmental suffix indicators (.xyz).</span>
            </li>
          </ul>
        </div>
      </div>

      {/* CLAIM BREAKDOWN INTELLIGENCE */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-[#1C1C1A] font-mono uppercase tracking-wider">
          Claim Breakdown Intelligence
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {investigation.claims?.map((claim, idx) => (
            <div key={idx} className="bg-[#FFFFFF] border border-[#D4CEC2] p-4 rounded-xl space-y-3 flex flex-col justify-between shadow-subtle">
              <div className="space-y-2">
                <div className="flex justify-between items-center text-[10px] font-mono">
                  <span className="text-[#858078] uppercase font-bold">CLAIM 0{idx + 1}</span>
                  <span className={`px-2 py-0.5 rounded font-bold border ${
                    claim.status === 'Contradicted' ? 'bg-[#FBEDEA] text-[#C74634] border-[#F5D8D2]' :
                    claim.status === 'Misleading' ? 'bg-[#FBF2DD] text-[#B7791F] border-[#E5CC99]' :
                    'bg-[#EAF3ED] text-[#39704D] border-[#B9D3C1]'
                  }`}>
                    {claim.status}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-[#1C1C1A] font-sans">{claim.text}</h4>
              </div>

              <div className="bg-[#FAF8F4] p-3 rounded-lg border border-[#E1DCD2] text-[11px] text-[#5E5B55] font-sans">
                <strong className="text-[#C74634] font-mono">Rationale: </strong>
                {claim.reason}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MULTI-THREAT INTELLIGENCE MATRIX */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-[#1C1C1A] font-mono uppercase tracking-wider flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-[#C74634]" />
          <span>Multi-Threat Intelligence Detection</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {investigation.threats_detected?.map((t, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-xl border bg-[#FFFFFF] shadow-subtle space-y-2 ${
                t.detected ? 'border-[#B7791F] bg-[#FBF2DD]/40' : 'border-[#E1DCD2] opacity-60'
              }`}
            >
              <div className="flex justify-between items-center text-xs font-bold font-mono">
                <span className={t.detected ? 'text-[#B7791F]' : 'text-[#858078]'}>{t.category}</span>
                <span className={`px-2 py-0.5 text-[9px] rounded font-bold ${
                  t.severity === 'CRITICAL' ? 'bg-[#FBEDEA] text-[#C74634] border border-[#F5D8D2]' :
                  t.severity === 'HIGH' ? 'bg-[#FBF2DD] text-[#B7791F] border border-[#E5CC99]' : 'bg-[#FAF8F4] text-[#858078]'
                }`}>
                  {t.detected ? t.severity : 'CLEAR'}
                </span>
              </div>
              <p className="text-[11px] text-[#5E5B55] leading-relaxed font-sans">{t.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CONTEXT ENGINE */}
      <ContextEngine contextFindings={investigation.context_findings} />

      {/* SOURCE ANALYSIS */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-[#1C1C1A] font-mono uppercase tracking-wider">
          Source Analysis & Registry Cross-Reference
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {investigation.sources?.map((s, idx) => (
            <div key={idx} className="bg-[#FFFFFF] border border-[#D4CEC2] p-4 rounded-xl space-y-2 shadow-subtle">
              <div className="flex justify-between items-start">
                <span className="text-xs font-bold text-[#1C1C1A] font-mono">{s.name}</span>
                <span className="text-[10px] font-mono bg-[#EDF2F5] text-[#46627A] px-2 py-0.5 rounded border border-[#C6D3DC] font-bold">
                  {s.source_type}
                </span>
              </div>
              
              <p className="text-xs text-[#5E5B55] leading-relaxed font-sans">{s.extracted_summary}</p>
              
              {s.url && (
                <a
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center space-x-1 text-[11px] font-mono text-[#C74634] hover:underline pt-1"
                >
                  <LinkIcon className="w-3 h-3" />
                  <span>{s.url}</span>
                  <ExternalLink className="w-2.5 h-2.5 ml-1" />
                </a>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ACTION CENTER */}
      <ActionCenter
        recommendations={investigation.recommendations}
        assessment={investigation.assessment}
        onOpenHelp={() => onNavigate('help')}
      />

    </div>
  );
}
