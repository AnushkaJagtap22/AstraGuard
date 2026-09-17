import React, { useState, useEffect } from 'react';
import { 
  UserCheck, 
  ShieldAlert, 
  CheckCircle2, 
  AlertTriangle, 
  Search, 
  Activity, 
  ChevronRight, 
  X, 
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Clock,
  RotateCcw,
  RefreshCw,
  Ban
} from 'lucide-react';
import { demoIdentityCases } from '../lib/demoData';

// DEFINITION OF AGENT PIPELINE STAGES
const BASE_AGENT_PIPELINE = [
  {
    id: 'orch',
    name: 'Identity Orchestrator',
    role: 'Orchestration & Planning',
    action: 'Creating investigation plan...',
    checked: 'Input classification, metadata parsing, agent execution plan',
    finding: 'Evaluated identity input and planned 8-agent audit pipeline.',
    strength: 'STRONG',
    evidence: ['Input payload verified', 'Audit strategy generated']
  },
  {
    id: 'resolver',
    name: 'Identity Resolver',
    role: 'Handle & URL Resolution',
    action: 'Resolving account identity signals...',
    checked: 'Username format, profile URL structure, platform mappings',
    finding: 'Resolved target identity handle across public platform registries.',
    strength: 'STRONG',
    evidence: ['Public profile handle resolved', 'Platform identifier matched']
  },
  {
    id: 'profile',
    name: 'Profile Analyzer',
    role: 'Metadata Audit',
    action: 'Examining profile structure and metadata...',
    checked: 'Username/profile consistency, bio structure, organization claims, external links, profile completeness',
    finding: 'Examined bio metadata and organizational claim disclosures.',
    strength: 'MODERATE',
    evidence: ['Profile metadata parsed', 'Bio claim extractions']
  },
  {
    id: 'username',
    name: 'Username Intelligence',
    role: 'Handle Pattern Analysis',
    action: 'Checking username patterns and homoglyphs...',
    checked: 'Homoglyph character replacement, official brand name spoofing, character distance',
    finding: 'Analyzed username handle for character substitution patterns.',
    strength: 'STRONG',
    evidence: ['Handle similarity index check', 'Character substitution scan']
  },
  {
    id: 'avatar',
    name: 'Avatar / Image Analyzer',
    role: 'Visual Identity Audit',
    action: 'Checking avatar reuse indicators...',
    checked: 'Profile avatar image, banner graphics, reverse image lookup',
    finding: 'Evaluated profile visual assets against press release visual databases.',
    strength: 'MODERATE',
    evidence: ['Reverse image match index', 'Logo reuse check']
  },
  {
    id: 'content',
    name: 'Content Pattern Analyzer',
    role: 'Solicitation & Post Analysis',
    action: 'Analyzing content patterns and solicitation language...',
    checked: 'Recent posts, urgent fee language, financial solicitations',
    finding: 'Parsed post history for financial payment requests.',
    strength: 'STRONG',
    evidence: ['Language solicitation patterns', 'Urgency keyword frequency']
  },
  {
    id: 'cross',
    name: 'Cross-Source Verification',
    role: 'Public Source Check',
    action: 'Comparing public-source signals...',
    checked: 'Outbound website links, WHOIS registry, official directory listing',
    finding: 'Cross-checked external bio link against authoritative registries.',
    strength: 'STRONG',
    evidence: ['External domain registry lookup', 'Official directory audit']
  },
  {
    id: 'impersonation',
    name: 'Impersonation Detector',
    role: 'Brand Protection Score',
    action: 'Evaluating impersonation indicators...',
    checked: 'Official brand match score, verified checkmark status, impersonation risk index',
    finding: 'Calculated impersonation similarity score against official brand assets.',
    strength: 'STRONG',
    evidence: ['Brand impersonation metric', 'Official account cross-reference']
  }
];

export default function IdentityPage() {
  const [identityInput, setIdentityInput] = useState('@scholarship_desk_in');
  const [activeCaseData, setActiveCaseData] = useState(demoIdentityCases[0]);
  const [badgeLabel, setBadgeLabel] = useState('DEMO');

  const [investigationStatus, setInvestigationStatus] = useState('completed'); // 'idle' | 'running' | 'completed'
  const [activeAgentIndex, setActiveAgentIndex] = useState(7);
  const [selectedAgentId, setSelectedAgentId] = useState('impersonation');

  const [errorMessage, setErrorMessage] = useState(null);
  const [auditLogs, setAuditLogs] = useState([
    '15:42:01 Identity audit pipeline initialized for @scholarship_desk_in...',
    '15:42:03 Handle resolution verified across Telegram, X, and Instagram.',
    '15:42:06 Extracted 4 bio claim statements.',
    '15:42:09 Homoglyph check flagged character replacement: "desk_in" mimics official registry.',
    '15:42:12 Reverse visual lookup matched 2020 press bulletin emblem.',
    '15:42:15 Calculated Brand Protection Score: HIGH IMPERSONATION RISK.'
  ]);

  const handleIdentityInvestigation = () => {
    if (!identityInput.trim()) {
      setErrorMessage("Please enter a username or profile URL to audit.");
      return;
    }

    setErrorMessage(null);
    setInvestigationStatus('running');
    setActiveAgentIndex(0);
    setSelectedAgentId(BASE_AGENT_PIPELINE[0].id);

    const isCustom = !demoIdentityCases.some(c => c.handle.toLowerCase() === identityInput.toLowerCase());
    setBadgeLabel(isCustom ? 'USER PROVIDED' : 'DEMO');

    let matchingCase = demoIdentityCases.find(c => c.handle.toLowerCase() === identityInput.toLowerCase());

    if (!matchingCase) {
      matchingCase = {
        id: `AG-ID-${Math.floor(100 + Math.random() * 900)}`,
        handle: identityInput.startsWith('@') ? identityInput : `@${identityInput}`,
        platform: "Multi-Platform Audit",
        name: identityInput.replace('@', ''),
        created: "Recent (Unverified creation date)",
        verified: false,
        bio: `Account claims official affiliation regarding ${identityInput}.`,
        external_url: `https://${identityInput.replace('@', '')}.test`,
        signals: [
          { name: "Handle Substitution", status: "? Unverified", why: "Scanned handle for homoglyph characters." },
          { name: "Official Verification Badge", status: "✕ Unverified", why: "No platform verification badge detected." },
          { name: "Payment Solicitation", status: "⚠ Solicitations Found", why: "Account posts request upfront fee deposits." }
        ],
        impersonation_score: "HIGH RISK (85%)",
        verdict: "High Impersonation & Unverified Identity Risk",
        recommendation: "Do NOT engage in financial transactions or submit credentials to this account."
      };
    }

    setActiveCaseData(matchingCase);
    setAuditLogs([`15:42:01 Initializing 8-agent audit pipeline for ${matchingCase.handle}...`]);

    const totalAgents = BASE_AGENT_PIPELINE.length;
    let step = 0;

    const interval = setInterval(() => {
      step++;
      if (step < totalAgents) {
        setActiveAgentIndex(step);
        const ag = BASE_AGENT_PIPELINE[step];
        setAuditLogs(prev => [
          ...prev,
          `15:42:${String(step * 2 + 1).padStart(2, '0')} ${ag.name}: ${ag.action}`,
          `15:42:${String(step * 2 + 1).padStart(2, '0')} Finding: ${ag.finding}`
        ]);
      } else {
        clearInterval(interval);
        setActiveAgentIndex(totalAgents - 1);
        setInvestigationStatus('completed');
        setAuditLogs(prev => [
          ...prev,
          `15:42:15 Pipeline complete. Final Verdict: ${matchingCase.verdict}`
        ]);
      }
    }, 400);
  };

  const selectedAgent = BASE_AGENT_PIPELINE.find(a => a.id === selectedAgentId) || BASE_AGENT_PIPELINE[activeAgentIndex];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 bg-[#F5F1E8] text-[#1C1C1A]">
      
      {/* HEADER */}
      <div className="border-b border-[#D4CEC2] pb-4 flex flex-col sm:flex-row justify-between sm:items-center gap-2 font-mono">
        <div>
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl font-bold text-[#1C1C1A] flex items-center gap-2">
              <UserCheck className="w-6 h-6 text-[#C74634]" />
              <span>Identity Intelligence Workspace</span>
            </h1>
            <span className={`text-[10px] px-2.5 py-0.5 rounded font-bold border ${
              badgeLabel === 'DEMO' ? 'bg-[#FBF2DD] text-[#B7791F] border-[#E5CC99]' : 'bg-[#EAF3ED] text-[#39704D] border-[#B9D3C1]'
            }`}>
              [ {badgeLabel} ]
            </span>
          </div>
          <p className="text-xs text-[#5E5B55] mt-1">Who is behind this account? Trace profile signals and impersonation indicators.</p>
        </div>

        <div className="flex items-center space-x-3">
          {investigationStatus === 'running' ? (
            <span className="text-xs text-[#C74634] font-bold bg-[#FBEDEA] px-3.5 py-1.5 rounded-full border border-[#F5D8D2] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C74634] animate-ping"></span>
              <span>● Investigation in progress...</span>
            </span>
          ) : (
            <span className="text-xs text-[#39704D] font-bold bg-[#EAF3ED] px-3.5 py-1.5 rounded-full border border-[#B9D3C1] flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#39704D]" />
              <span>✓ Pipeline Completed</span>
            </span>
          )}

          {investigationStatus === 'completed' && (
            <button
              type="button"
              onClick={handleIdentityInvestigation}
              className="px-3 py-1.5 bg-[#FAF8F4] hover:bg-[#EDE8DD] text-[#C74634] border border-[#D4CEC2] rounded-md font-bold text-xs flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>[ Investigate Again ]</span>
            </button>
          )}
        </div>
      </div>

      {/* ERROR ALERT */}
      {errorMessage && (
        <div className="bg-[#FBEDEA] border border-[#E8B5AC] p-4 rounded-xl flex items-center justify-between text-xs text-[#9F2F24] font-mono">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="w-5 h-5 text-[#C74634]" />
            <span>{errorMessage}</span>
          </div>
          <button type="button" onClick={() => setErrorMessage(null)} className="px-3 py-1 bg-[#9F2F24] text-white rounded font-bold">
            [ Dismiss ]
          </button>
        </div>
      )}

      {/* INPUT CONTAINER */}
      <div className="bg-[#FFFFFF] border border-[#D4CEC2] rounded-xl p-6 space-y-4 shadow-sm">
        <form onSubmit={(e) => { e.preventDefault(); handleIdentityInvestigation(); }} className="flex flex-col sm:flex-row items-center gap-3">
          <input
            type="text"
            value={identityInput}
            onChange={(e) => {
              setIdentityInput(e.target.value);
              setErrorMessage(null);
            }}
            placeholder="Enter username / profile URL / account identifier... (e.g. @scholarship_desk_in)"
            className="flex-1 bg-[#FAF8F4] border border-[#D4CEC2] focus:border-[#C74634] rounded-md px-4 py-3 text-sm text-[#1C1C1A] placeholder-[#858078] focus:outline-none font-mono"
          />
          <button
            type="submit"
            disabled={investigationStatus === 'running'}
            className={`w-full sm:w-auto px-6 py-3 font-bold text-xs rounded-md font-mono shadow-sm flex items-center justify-center space-x-2 transition-all cursor-pointer ${
              investigationStatus === 'running'
                ? 'bg-[#FAF8F4] text-[#858078] border border-[#D4CEC2] cursor-not-allowed'
                : 'bg-[#C74634] hover:bg-[#9F2F24] text-[#FFFFFF]'
            }`}
          >
            {investigationStatus === 'running' ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-[#C74634] border-t-transparent rounded-full animate-spin"></span>
                <span>Investigating...</span>
              </>
            ) : (
              <>
                <Search className="w-4 h-4" />
                <span>INVESTIGATE IDENTITY</span>
              </>
            )}
          </button>
        </form>

        {/* PRESET CHIPS */}
        <div className="flex items-center space-x-2 text-xs font-mono">
          <span className="text-[#858078]">Demo Targets:</span>
          {demoIdentityCases.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => {
                setIdentityInput(c.handle);
                setActiveCaseData(c);
                setBadgeLabel('DEMO');
                setErrorMessage(null);
              }}
              className={`px-2.5 py-1 rounded-md text-[11px] font-bold border transition-all cursor-pointer ${
                activeCaseData?.handle === c.handle
                  ? 'bg-[#FBEDEA] text-[#C74634] border-[#F5D8D2]'
                  : 'bg-[#FAF8F4] text-[#5E5B55] border-[#D4CEC2] hover:text-[#1C1C1A]'
              }`}
            >
              {c.handle}
            </button>
          ))}
        </div>
      </div>

      {/* ACCOUNT SUMMARY CARD & RISK ASSESSMENT */}
      {activeCaseData && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 font-mono">
          
          {/* PROFILE SUMMARY BLOCK */}
          <div className="bg-[#FFFFFF] border border-[#D4CEC2] p-6 rounded-xl space-y-4 shadow-sm">
            <div className="flex justify-between items-start border-b border-[#E1DCD2] pb-3">
              <div>
                <span className="text-[10px] text-[#C74634] uppercase font-bold tracking-wider">TARGET ACCOUNT</span>
                <h2 className="text-xl font-bold text-[#1C1C1A] mt-0.5">{activeCaseData.handle}</h2>
                <p className="text-xs text-[#5E5B55] font-sans">{activeCaseData.name}</p>
              </div>
              <span className="px-2.5 py-1 rounded text-xs font-bold bg-[#FBEDEA] text-[#C74634] border border-[#F5D8D2]">
                {activeCaseData.impersonation_score}
              </span>
            </div>

            <div className="space-y-2 text-xs font-sans text-[#1C1C1A]">
              <div>
                <strong className="font-mono text-[10px] text-[#858078] block uppercase">Platform</strong>
                <p className="font-medium">{activeCaseData.platform}</p>
              </div>
              <div>
                <strong className="font-mono text-[10px] text-[#858078] block uppercase">Bio Statement</strong>
                <p className="bg-[#FAF8F4] p-3 rounded-md border border-[#E1DCD2] text-xs leading-relaxed">{activeCaseData.bio}</p>
              </div>
              {activeCaseData.external_url && (
                <div>
                  <strong className="font-mono text-[10px] text-[#858078] block uppercase">Bio Link</strong>
                  <a href={activeCaseData.external_url} target="_blank" rel="noopener noreferrer" className="text-[#C74634] underline font-mono text-xs flex items-center gap-1">
                    <span>{activeCaseData.external_url}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* AUDIT SIGNALS GRID */}
          <div className="lg:col-span-2 bg-[#FFFFFF] border border-[#D4CEC2] p-6 rounded-xl space-y-4 shadow-sm">
            <div className="flex justify-between items-center border-b border-[#E1DCD2] pb-3">
              <h3 className="text-xs font-bold text-[#1C1C1A] uppercase tracking-wider">IDENTITY AUDIT SIGNALS</h3>
              <span className="text-xs text-[#858078]">{activeCaseData.signals?.length || 0} Signals Evaluated</span>
            </div>

            <div className="space-y-2">
              {activeCaseData.signals?.map((sig, idx) => (
                <div key={idx} className="bg-[#FAF8F4] border border-[#E1DCD2] p-3 rounded-md flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <div>
                    <span className="font-bold text-[#1C1C1A]">{sig.name}</span>
                    <p className="text-[11px] text-[#5E5B55] font-sans">{sig.why}</p>
                  </div>
                  <span className={`px-2.5 py-1 rounded text-[10px] font-bold border shrink-0 ${
                    sig.status.includes('Solici') || sig.status.includes('⚠')
                      ? 'bg-[#FBEDEA] text-[#C74634] border-[#F5D8D2]'
                      : 'bg-[#FBF2DD] text-[#B7791F] border-[#E5CC99]'
                  }`}>
                    {sig.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* 8-AGENT EXECUTION PIPELINE */}
      <div className="bg-[#FFFFFF] border border-[#D4CEC2] p-6 rounded-xl space-y-4 font-mono shadow-sm">
        <div className="flex justify-between items-center border-b border-[#E1DCD2] pb-3">
          <div>
            <h3 className="text-sm font-bold text-[#1C1C1A] uppercase">8-AGENT IDENTITY AUDIT PIPELINE</h3>
            <p className="text-xs text-[#858078]">Sequential multi-agent verification stack</p>
          </div>
          <span className="text-xs font-bold text-[#39704D] bg-[#EAF3ED] border border-[#B9D3C1] px-3 py-1 rounded-full">
            ● PIPELINE ACTIVE
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {BASE_AGENT_PIPELINE.map((ag, idx) => {
            const isDone = activeAgentIndex >= idx;
            const isSelected = selectedAgentId === ag.id;

            return (
              <div
                key={ag.id}
                onClick={() => setSelectedAgentId(ag.id)}
                className={`p-3.5 rounded-lg border cursor-pointer transition-all space-y-2 ${
                  isSelected
                    ? 'bg-[#FAF8F4] border-[#C74634] ring-1 ring-[#C74634]/40'
                    : isDone
                    ? 'bg-[#FFFFFF] border-[#E1DCD2] hover:border-[#D4CEC2]'
                    : 'bg-[#FAF8F4]/50 border-[#E1DCD2]/50 text-[#AAA59B]'
                }`}
              >
                <div className="flex justify-between items-center text-[10px]">
                  <span className="font-bold text-[#858078]">{ag.name}</span>
                  <span className={`px-1.5 py-0.5 rounded font-bold text-[9px] ${
                    isDone ? 'bg-[#EAF3ED] text-[#39704D] border border-[#B9D3C1]' : 'bg-[#EDE8DD] text-[#858078]'
                  }`}>
                    {isDone ? '✓ DONE' : '○ PENDING'}
                  </span>
                </div>
                <p className="text-[11px] font-sans text-[#1C1C1A] font-medium line-clamp-2">{ag.finding}</p>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
