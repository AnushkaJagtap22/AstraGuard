import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import AstraGuardLogo from './AstraGuardLogo';

export default function Sidebar({ onOpenAssistant }) {
  const location = useLocation();
  const navigate = useNavigate();

  const getActiveTab = () => {
    const p = location.pathname;
    if (p === '/') return 'dashboard';
    if (p.startsWith('/investigate')) return 'investigate';
    if (p.startsWith('/identity')) return 'identity';
    if (p.startsWith('/risk-radar')) return 'radar';
    if (p.startsWith('/evidence')) return 'vault';
    if (p.startsWith('/history')) return 'history';
    if (p.startsWith('/police')) return 'police';
    if (p.startsWith('/incident')) return 'incident';
    if (p.startsWith('/assistant')) return 'assistant';
    return '';
  };

  const activeTab = getActiveTab();

  const sections = [
    {
      title: 'HOME',
      items: [
        { id: 'dashboard', label: 'Dashboard', path: '/' },
        { id: 'investigate', label: 'Investigate', path: '/investigate' },
      ]
    },
    {
      title: 'INTELLIGENCE',
      items: [
        { id: 'identity', label: 'Identity', path: '/identity' },
        { id: 'radar', label: 'Risk Radar', path: '/risk-radar' },
      ]
    },
    {
      title: 'CASES & COMPLIANCE',
      items: [
        { id: 'vault', label: 'Evidence Vault', path: '/evidence' },
        { id: 'history', label: 'Investigation History', path: '/history' },
        { id: 'police', label: 'Law Enforcement Portal', path: '/police' },
      ]
    },
    {
      title: 'ASSIST',
      items: [
        { id: 'assistant', label: 'Astra Assistant', path: '/assistant' },
      ]
    }
  ];

  return (
    <aside className="w-64 shrink-0 bg-[#1C1C1A] border-r border-[#292824] flex flex-col justify-between h-screen sticky top-0 z-30 select-none font-mono">
      
      {/* BRAND HEADER */}
      <div className="p-4 border-b border-[#292824]">
        <Link to="/" className="block">
          <AstraGuardLogo size="md" darkTheme={true} />
        </Link>
      </div>

      {/* NAVIGATION SECTIONS */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {sections.map((sec, sIdx) => (
          <div key={sIdx} className="space-y-1">
            <h4 className="px-3 text-[10px] font-bold text-[#858078] uppercase tracking-wider">
              {sec.title}
            </h4>
            <div className="space-y-0.5">
              {sec.items.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      if (item.id === 'assistant' && onOpenAssistant) {
                        onOpenAssistant();
                      }
                      navigate(item.path);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-xs font-mono transition-all focus:outline-none cursor-pointer relative ${
                      isActive
                        ? 'bg-[#292824] text-[#FFFFFF] font-bold border-l-2 border-[#C74634]'
                        : 'text-[#D8D3C9] hover:text-[#FFFFFF] hover:bg-[#292824]/60'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#C74634]"></span>}
                      <span>{item.label}</span>
                    </div>
                    {item.id === 'assistant' && (
                      <span className="w-2 h-2 rounded-full bg-[#C74634] animate-pulse"></span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* FOOTER SYSTEM STATUS */}
      <div className="p-4 border-t border-[#292824] bg-[#1C1C1A]">
        <div className="flex items-center space-x-2 text-[11px] text-[#39704D] font-bold bg-[#292824] border border-[#39704D]/30 px-3 py-2 rounded-md">
          <span className="w-2 h-2 rounded-full bg-[#39704D] animate-pulse"></span>
          <span className="text-[#D8D3C9]">All systems operational</span>
        </div>
      </div>

    </aside>
  );
}
