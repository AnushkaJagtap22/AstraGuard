import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Compass, Share2, UserCheck, Database, PhoneCall, ShieldAlert, X } from 'lucide-react';

export default function CommandPalette({ isOpen, onClose, onSelectPreset }) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else setQuery('');
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const actions = [
    { title: 'Investigate New Content', icon: Search, path: '/investigate' },
    { title: 'View Live Threat Risk Radar', icon: Compass, path: '/risk-radar' },
    { title: 'Open Interactive Evidence Graph', icon: Share2, path: '/evidence' },
    { title: 'Audit Social Profile / Handle', icon: UserCheck, path: '/identity' },
    { title: 'Browse Evidence Vault', icon: Database, path: '/evidence' },
    { title: 'Find Cybercrime Helplines & Police', icon: PhoneCall, path: '/police' },
  ];

  const presets = [
    { title: 'Demo Case: ₹50,000 Govt Scholarship WhatsApp Scam', preset: 'fake_scholarship' },
    { title: 'Demo Case: SBI Urgent KYC Account Block Smishing Link', preset: 'phishing_link' },
    { title: 'Demo Case: 2021 Flood Photo Recycled as Dam Breach Today', preset: 'viral_misinformation' },
  ];

  const filteredActions = actions.filter(a => a.title.toLowerCase().includes(query.toLowerCase()));
  const filteredPresets = presets.filter(p => p.title.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-xl bg-[#FFFFFF] border border-[#D4CEC2] rounded-2xl shadow-2xl overflow-hidden animate-in fade-in duration-200">
        
        {/* Search Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-[#D4CEC2] bg-[#FAF8F4]">
          <Search className="w-5 h-5 text-[#C74634] mr-3" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search investigations... (Esc to close)"
            className="w-full bg-transparent text-sm text-[#1C1C1A] placeholder-[#858078] focus:outline-none font-mono"
          />
          <button onClick={onClose} className="p-1 text-[#858078] hover:text-[#1C1C1A] rounded cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Action List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1 bg-[#F5F1E8]">
          <div className="px-3 py-1 text-[11px] font-mono text-[#C74634] uppercase tracking-wider font-bold">Quick Navigation</div>
          {filteredActions.map((action, idx) => {
            const Icon = action.icon;
            return (
              <button
                key={idx}
                onClick={() => {
                  navigate(action.path);
                  onClose();
                }}
                className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-left text-xs text-[#1C1C1A] hover:bg-[#FFFFFF] hover:text-[#C74634] transition-colors cursor-pointer"
              >
                <Icon className="w-4 h-4 text-[#858078]" />
                <span className="font-medium font-sans">{action.title}</span>
              </button>
            );
          })}

          <div className="px-3 py-1 text-[11px] font-mono text-[#B7791F] uppercase tracking-wider mt-3 font-bold">Demo Cases</div>
          {filteredPresets.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => {
                if (onSelectPreset) onSelectPreset(preset.preset);
                navigate('/investigate');
                onClose();
              }}
              className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-left text-xs text-[#1C1C1A] hover:bg-[#FBF2DD] hover:text-[#B7791F] transition-colors border border-transparent cursor-pointer"
            >
              <ShieldAlert className="w-4 h-4 text-[#B7791F]" />
              <span className="font-medium font-sans">{preset.title}</span>
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="px-4 py-2 bg-[#FAF8F4] border-t border-[#D4CEC2] flex justify-between items-center text-[10px] font-mono text-[#858078]">
          <span>Navigate with keyboard or mouse</span>
          <span className="bg-[#FFFFFF] px-1.5 py-0.5 rounded border border-[#D4CEC2]">ESC to close</span>
        </div>
      </div>
    </div>
  );
}
