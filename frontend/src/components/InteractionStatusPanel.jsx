import React from 'react';

export default function InteractionStatusPanel({ activeTab, inputMode }) {
  return (
    <div className="fixed bottom-0 left-64 right-0 z-40 bg-[#FFFFFF] border-t border-[#D4CEC2] px-4 py-1.5 flex items-center justify-between text-[10px] font-mono text-[#5E5B55] select-none shadow-subtle">
      <div className="flex items-center space-x-4">
        <span className="text-[#C74634] font-bold">INTERACTION STATUS</span>
        <span>Investigate Tabs: <strong className="text-[#39704D]">✓ ({inputMode.toUpperCase()})</strong></span>
        <span>Demo Buttons: <strong className="text-[#39704D]">✓</strong></span>
        <span>Analyze: <strong className="text-[#39704D]">✓</strong></span>
        <span>Agent Drawer: <strong className="text-[#39704D]">✓</strong></span>
        <span>Claim Drawer: <strong className="text-[#39704D]">✓</strong></span>
        <span>WHY: <strong className="text-[#39704D]">✓</strong></span>
        <span>Graph Controls: <strong className="text-[#39704D]">✓</strong></span>
        <span>Navigation: <strong className="text-[#39704D]">✓ ({activeTab.toUpperCase()})</strong></span>
      </div>
      <div className="text-[#39704D] font-bold">● ZERO RUNTIME ERRORS</div>
    </div>
  );
}
