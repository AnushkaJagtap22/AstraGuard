import React from 'react';
import { Cpu, CheckCircle2 } from 'lucide-react';

export default function AgentNetworkStatus() {
  const agents = [
    { name: "Orchestrator", status: "ONLINE", role: "Supervisor" },
    { name: "Claim Agent", status: "ONLINE", role: "Decomposer" },
    { name: "Source Agent", status: "ONLINE", role: "Registry Crawler" },
    { name: "Evidence Agent", status: "ONLINE", role: "Graph Builder" },
    { name: "Context Agent", status: "ONLINE", role: "Temporal Check" },
    { name: "Media Agent", status: "ONLINE", role: "OCR & Hash" },
    { name: "Threat Agent", status: "ONLINE", role: "Risk Classifier" },
    { name: "Response Agent", status: "ONLINE", role: "Action Protocol" }
  ];

  return (
    <div className="bg-white border border-[#D4CEC2] p-4 rounded-2xl space-y-3 shadow-subtle">
      <div className="flex items-center justify-between border-b border-[#E1DCD2] pb-2">
        <div className="flex items-center space-x-2">
          <Cpu className="w-4 h-4 text-[#C74634]" />
          <h3 className="text-xs font-bold font-mono text-[#1C1C1A] uppercase tracking-wider">
            Investigation Network
          </h3>
        </div>
        <span className="text-[10px] font-mono text-[#39704D] flex items-center gap-1 font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-[#39704D]"></span>
          8 AGENTS ACTIVE
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
        {agents.map((ag, idx) => (
          <div key={idx} className="bg-[#FAF8F4] p-2 rounded-lg border border-[#E1DCD2] flex items-center justify-between">
            <div className="flex items-center space-x-1.5">
              <CheckCircle2 className="w-3 h-3 text-[#39704D]" />
              <span className="text-[#1C1C1A] font-bold">{ag.name}</span>
            </div>
            <span className="text-[9px] text-[#39704D] bg-[#EAF3ED] px-1.5 py-0.5 rounded border border-[#B9D3C1] font-bold">
              {ag.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
