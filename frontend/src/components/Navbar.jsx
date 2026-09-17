import React from 'react';
import { Search, Activity, Share2, Compass, Database, UserCheck, PhoneCall, Bot, Command } from 'lucide-react';
import AstraGuardLogo from './AstraGuardLogo';

export default function Navbar({ activeTab, setActiveTab, openCommandPalette, openAssistant, activeCaseId }) {
  const navItems = [
    { id: 'investigate', label: 'Investigate', icon: Search },
    { id: 'radar', label: 'Risk Radar', icon: Compass },
    { id: 'graph', label: 'Evidence Graph', icon: Share2 },
    { id: 'identity', label: 'Identity', icon: UserCheck },
    { id: 'vault', label: 'Evidence Vault', icon: Database },
    { id: 'help', label: 'Local Help', icon: PhoneCall },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FFFFFF] border-b border-[#D4CEC2] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <AstraGuardLogo 
          size="md" 
          onClick={() => setActiveTab('investigate')} 
        />

        {/* Center Nav Tabs */}
        <nav className="hidden md:flex items-center space-x-1 bg-[#F5F1E8] border border-[#D4CEC2] p-1 rounded-lg">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-md text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-[#FFFFFF] text-[#C74634] font-bold border border-[#D4CEC2] shadow-sm'
                    : 'text-[#5E5B55] hover:text-[#1C1C1A] hover:bg-[#EDE8DD]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#C74634]' : 'text-[#858078]'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center space-x-3">
          
          {/* Command Palette Trigger */}
          <button
            onClick={openCommandPalette}
            className="hidden lg:flex items-center space-x-2 bg-[#F5F1E8] hover:bg-[#EDE8DD] border border-[#D4CEC2] px-3 py-1.5 rounded-md text-xs text-[#5E5B55] hover:text-[#1C1C1A] transition-all"
          >
            <Search className="w-3.5 h-3.5 text-[#C74634]" />
            <span>Search...</span>
            <kbd className="bg-[#FFFFFF] border border-[#D4CEC2] px-1.5 py-0.5 text-[10px] font-mono text-[#858078] rounded flex items-center">
              <Command className="w-2.5 h-2.5 mr-0.5" /> K
            </kbd>
          </button>

          {/* Assistant Trigger Button */}
          <button
            onClick={openAssistant}
            className="flex items-center space-x-2 bg-[#FBEDEA] hover:bg-[#F5D8D2] border border-[#C74634]/40 text-[#C74634] px-3.5 py-1.5 rounded-md text-xs font-bold transition-all shadow-sm"
          >
            <Bot className="w-4 h-4 text-[#C74634]" />
            <span className="hidden sm:inline">Astra Assistant</span>
          </button>

          {/* Live Telemetry Indicator */}
          <div className="hidden xl:flex items-center space-x-2 bg-[#EAF3ED] border border-[#39704D]/30 px-2.5 py-1.5 rounded-md text-[11px] font-mono text-[#39704D]">
            <span className="w-2 h-2 rounded-full bg-[#39704D] animate-pulse"></span>
            <span className="font-bold">AGENTS LIVE</span>
          </div>

        </div>
      </div>
    </header>
  );
}
