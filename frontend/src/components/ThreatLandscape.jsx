import React from 'react';
import { BarChart3 } from 'lucide-react';

export default function ThreatLandscape({ activeFilter, onSelectFilter }) {
  const categories = [
    { name: "Misinformation", count: 88, percentage: 88, color: "bg-[#C74634]" },
    { name: "Scams", count: 64, percentage: 64, color: "bg-[#B7791F]" },
    { name: "Phishing", count: 48, percentage: 48, color: "bg-[#9F2F24]" },
    { name: "Impersonation", count: 40, percentage: 40, color: "bg-[#46627A]" },
    { name: "Manipulated Media", count: 32, percentage: 32, color: "bg-[#5E5B55]" }
  ];

  return (
    <div className="bg-[#FFFFFF] border border-[#D4CEC2] p-5 rounded-2xl space-y-4 shadow-subtle">
      <div className="flex items-center justify-between border-b border-[#E1DCD2] pb-2">
        <div className="flex items-center space-x-2">
          <BarChart3 className="w-4 h-4 text-[#C74634]" />
          <h3 className="text-xs font-bold font-mono text-[#1C1C1A] uppercase tracking-wider">
            Current Threat Landscape
          </h3>
        </div>
        <span className="text-[10px] font-mono text-[#858078]">Click category to filter intelligence feed</span>
      </div>

      <div className="space-y-3 font-mono text-xs">
        {categories.map((cat, idx) => {
          const isSelected = activeFilter === cat.name;
          return (
            <div
              key={idx}
              onClick={() => onSelectFilter(isSelected ? 'ALL' : cat.name)}
              className={`space-y-1 cursor-pointer group p-1 rounded-lg transition-colors ${
                isSelected ? 'bg-[#FAF8F4] border border-[#C74634]' : ''
              }`}
            >
              <div className="flex justify-between items-center text-[#1C1C1A] group-hover:text-[#C74634]">
                <span className="font-medium">{cat.name}</span>
                <span className="text-[10px] text-[#858078]">{cat.count} Signals</span>
              </div>
              
              <div className="w-full bg-[#FAF8F4] h-2 rounded-full overflow-hidden border border-[#E1DCD2]">
                <div
                  className={`h-full ${cat.color} transition-all duration-500`}
                  style={{ width: `${cat.percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
