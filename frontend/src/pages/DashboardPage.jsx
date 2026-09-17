import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { demoInvestigations, demoRadarItems } from '../lib/demoData';
import AstraGuardLogo from '../components/AstraGuardLogo';

export default function DashboardPage({ onStartInvestigation, onSelectSavedInvestigation, onNavigate }) {
  const [inputText, setInputText] = useState('');
  const [recentCases, setRecentCases] = useState(demoInvestigations);
  const [radarItems, setRadarItems] = useState(demoRadarItems);
  const navigate = useNavigate();

  const navigateTo = (target) => {
    if (onNavigate) {
      onNavigate(target);
    } else {
      const map = {
        investigate: '/investigate',
        identity: '/identity',
        radar: '/risk-radar',
        vault: '/evidence',
        history: '/history',
        police: '/police',
        help: '/police',
      };
      navigate(map[target] || '/');
    }
  };

  useEffect(() => {
    fetch('/api/investigations')
      .then((res) => res.ok ? res.json() : Promise.reject())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setRecentCases(data);
      })
      .catch(() => setRecentCases(demoInvestigations));

    fetch('/api/radar')
      .then((res) => res.ok ? res.json() : Promise.reject())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setRadarItems(data);
      })
      .catch(() => setRadarItems(demoRadarItems));
  }, []);

  const safeRecent = Array.isArray(recentCases) ? recentCases : demoInvestigations;

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    if (onStartInvestigation) {
      onStartInvestigation('text', inputText);
    }
    navigate('/investigate');
  };

  const statCards = [
    { value: "12", label: "INVESTIGATIONS", color: "text-[#1C1C1A]" },
    { value: "03", label: "ACTIVE CASES", color: "text-[#1C1C1A]" },
    { value: "05", label: "VERIFICATION REQUIRED", color: "text-[#B7791F]" },
    { value: "02", label: "CRITICAL", color: "text-[#C74634]" }
  ];

  const agentList = [
    { name: "Orchestrator", status: "Ready" },
    { name: "Claim Analysis", status: "Ready" },
    { name: "Source Verification", status: "Ready" },
    { name: "Context Analysis", status: "Ready" },
    { name: "Threat Detection", status: "Ready" },
    { name: "Evidence Analysis", status: "Ready" }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 bg-[#F5F1E8]">
      
      {/* HERO SECTION */}
      <div className="bg-[#FFFFFF] border border-[#D4CEC2] rounded-xl p-8 space-y-6 relative shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold text-[#C74634] tracking-wider uppercase">
              ASTRAGUARD INTELLIGENCE OS
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold font-mono text-[#1C1C1A]">
              See something suspicious?
            </h1>
            <h2 className="text-2xl sm:text-3xl font-bold font-mono text-[#C74634]">
              Investigate it.
            </h2>
            <p className="text-sm text-[#5E5B55] font-sans max-w-2xl leading-relaxed">
              Upload a message, image, URL, video or claim and let AstraGuard trace the evidence, identify risks and explain what it finds.
            </p>
          </div>
          <div className="hidden md:block">
            <AstraGuardLogo size="2xl" iconOnly />
          </div>
        </div>

        {/* INPUT BAR FORM */}
        <form onSubmit={handleSearchSubmit} className="space-y-3">
          <div className="bg-[#FAF8F4] border border-[#D4CEC2] focus-within:border-[#C74634] rounded-lg p-3 flex flex-col sm:flex-row items-center gap-2 transition-all">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste a suspicious message, URL, claim or upload evidence..."
              className="flex-1 bg-transparent text-sm text-[#1C1C1A] placeholder-[#858078] focus:outline-none font-sans px-2 w-full"
            />
            <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
              <button
                type="button"
                onClick={() => navigateTo('investigate')}
                className="px-4 py-2.5 bg-[#EDE8DD] hover:bg-[#E4DED1] text-[#1C1C1A] border border-[#D4CEC2] rounded-md text-xs font-mono font-bold cursor-pointer transition-all"
              >
                Upload Evidence
              </button>
              <button
                type="submit"
                disabled={!inputText.trim()}
                className="px-6 py-2.5 bg-[#C74634] hover:bg-[#9F2F24] text-[#FFFFFF] font-bold text-xs rounded-md font-mono disabled:opacity-50 cursor-pointer transition-all shadow-sm"
              >
                Investigate
              </button>
            </div>
          </div>
        </form>

        <div className="text-xs font-mono text-[#858078]">
          Try: <button type="button" onClick={() => { if (onStartInvestigation) onStartInvestigation('text', "Is this scholarship message legitimate?", 'fake_scholarship'); navigate('/investigate'); }} className="text-[#C74634] hover:underline font-medium cursor-pointer">"Is this scholarship message legitimate?"</button>
        </div>
      </div>

      {/* QUICK ACTIONS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "🔎 Investigate Content", desc: "Check post, message or claim", target: "investigate" },
          { label: "🔗 Check Link", desc: "Analyze URL & phishing risk", target: "investigate" },
          { label: "👤 Verify Identity", desc: "Audit suspicious handles", target: "identity" },
          { label: "🖼️ Analyze Media", desc: "Check image/video context", target: "investigate" }
        ].map((act, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => navigateTo(act.target)}
            className="bg-[#FFFFFF] border border-[#D4CEC2] hover:border-[#C74634] hover:bg-[#FAF8F4] p-4 rounded-lg text-left space-y-1 transition-all cursor-pointer shadow-sm"
          >
            <h4 className="text-xs font-bold font-mono text-[#1C1C1A]">{act.label}</h4>
            <p className="text-[11px] text-[#5E5B55] font-sans">{act.desc}</p>
          </button>
        ))}
      </div>

      {/* STAT CARDS (FORENSIC COMPACT BLOCKS) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statCards.map((stat, idx) => (
          <div key={idx} className="bg-[#FFFFFF] border border-[#D4CEC2] p-4 rounded-lg space-y-1 font-mono shadow-sm">
            <span className={`text-2xl font-bold ${stat.color}`}>{stat.value}</span>
            <p className="text-[10px] text-[#858078] font-mono tracking-wider font-bold">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* MAIN CONTENT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: RECENT INVESTIGATIONS */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between border-b border-[#D4CEC2] pb-2">
            <h3 className="text-sm font-bold font-mono text-[#1C1C1A]">Recent Investigations</h3>
            <button type="button" onClick={() => navigateTo('vault')} className="text-xs font-mono text-[#C74634] hover:underline cursor-pointer font-bold">
              View Evidence Vault →
            </button>
          </div>

          <div className="bg-[#FFFFFF] border border-[#D4CEC2] rounded-lg overflow-hidden text-xs font-mono shadow-sm">
            <table className="w-full text-left">
              <thead className="bg-[#FAF8F4] border-b border-[#D4CEC2] text-[#858078] text-[10px] uppercase font-mono">
                <tr>
                  <th className="p-3">CASE</th>
                  <th className="p-3">TITLE</th>
                  <th className="p-3">TYPE</th>
                  <th className="p-3">ASSESSMENT</th>
                  <th className="p-3 text-right">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E1DCD2]">
                {safeRecent.slice(0, 4).map((c) => (
                  <tr key={c.id} className="hover:bg-[#FAF8F4] transition-colors">
                    <td className="p-3 font-bold text-[#C74634]">{c.id}</td>
                    <td className="p-3 font-sans text-[#1C1C1A] font-medium">{c.title}</td>
                    <td className="p-3 uppercase text-[#858078] text-[10px]">{c.input_type || 'Misinformation'}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#FBF2DD] text-[#B7791F] border border-[#E5CC99]">
                        {c.assessment}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <button
                        type="button"
                        onClick={() => {
                          if (onSelectSavedInvestigation) onSelectSavedInvestigation(c.id);
                          navigate(`/investigate/${c.id}`);
                        }}
                        className="text-[#C74634] hover:underline font-bold cursor-pointer"
                      >
                        Open
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* RIGHT COLUMN: AI AGENTS STATUS */}
        <div className="space-y-4">
          <div className="bg-[#FFFFFF] border border-[#D4CEC2] p-4 rounded-lg space-y-3 font-mono shadow-sm">
            <div className="flex items-center justify-between border-b border-[#D4CEC2] pb-2">
              <h3 className="text-xs font-bold text-[#1C1C1A] uppercase">AI Agents Network</h3>
              <span className="text-[10px] text-[#39704D] font-bold">● ACTIVE</span>
            </div>
            <div className="space-y-2 text-xs">
              {agentList.map((ag, idx) => (
                <div key={idx} className="bg-[#FAF8F4] p-2.5 rounded border border-[#E1DCD2] flex items-center justify-between">
                  <span className="text-[#1C1C1A]">{ag.name}</span>
                  <span className="text-[10px] text-[#39704D] font-bold flex items-center gap-1">
                    <span>●</span> {ag.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
