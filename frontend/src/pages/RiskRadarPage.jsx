import React, { useState, useEffect } from 'react';
import { demoRadarItems } from '../lib/demoData';

export default function RiskRadarPage({ onInvestigateRadarItem }) {
  const [radarItems, setRadarItems] = useState(demoRadarItems);
  const [loading, setLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState('ALL');

  useEffect(() => {
    fetch('/api/radar')
      .then((res) => {
        if (!res.ok) throw new Error('API offline');
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setRadarItems(data);
        }
      })
      .catch((err) => {
        console.log('Radar API offline, using demo radar items');
        setRadarItems(demoRadarItems);
      });
  }, []);

  const categories = ['ALL', 'Fake Scholarship', 'Phishing', 'Misinformation', 'Fake Job', 'Impersonation'];
  const safeItems = Array.isArray(radarItems) ? radarItems : demoRadarItems;

  const filteredItems = activeCategory === 'ALL'
    ? safeItems
    : safeItems.filter(item => item?.category?.toLowerCase().includes(activeCategory.toLowerCase()));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 bg-[#F5F1E8]">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#D4CEC2] pb-4">
        <div>
          <h2 className="text-xl font-bold font-mono text-[#1C1C1A] flex items-center gap-2">
            <span>AstraGuard Live Risk Radar</span>
          </h2>
          <p className="text-xs text-[#5E5B55] font-mono">
            Real-time digital threat intelligence stream across social platforms, messaging channels & domain registries.
          </p>
        </div>

        {/* Categories */}
        <div className="flex items-center space-x-1 bg-[#FFFFFF] p-1 rounded-lg border border-[#D4CEC2] text-xs overflow-x-auto shadow-sm">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-md font-mono transition-all whitespace-nowrap cursor-pointer ${
                activeCategory === cat ? 'bg-[#FBEDEA] text-[#C74634] border border-[#F5D8D2] font-bold' : 'text-[#5E5B55] hover:text-[#1C1C1A]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* THREAT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => {
          const isCritical = item.severity === 'CRITICAL';
          const isHigh = item.severity === 'HIGH';

          return (
            <div
              key={item.id}
              className="bg-[#FFFFFF] border border-[#D4CEC2] hover:border-[#C74634] rounded-xl p-5 flex flex-col justify-between space-y-4 transition-all shadow-sm group"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-center text-[10px] font-mono">
                  <span className="bg-[#FAF8F4] text-[#46627A] px-2 py-0.5 rounded border border-[#D4CEC2] font-bold">
                    {item.category}
                  </span>
                  
                  <span className={`px-2 py-0.5 rounded font-bold border ${
                    isCritical ? 'bg-[#FBEDEA] text-[#C74634] border-[#F5D8D2]' :
                    isHigh ? 'bg-[#FBF2DD] text-[#B7791F] border-[#E5CC99]' :
                    'bg-[#EDF2F5] text-[#46627A] border-[#D4CEC2]'
                  }`}>
                    {item.severity}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-[#1C1C1A] font-mono group-hover:text-[#C74634] transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs text-[#5E5B55] font-sans leading-relaxed">
                  {item.summary}
                </p>
              </div>

              <div className="space-y-3 pt-3 border-t border-[#E1DCD2]">
                <div className="flex justify-between items-center text-[10px] font-mono text-[#858078]">
                  <span>Source: {item.source}</span>
                  <span>{item.timestamp}</span>
                </div>

                <button
                  onClick={() => onInvestigateRadarItem(item)}
                  className="w-full py-2 bg-[#FAF8F4] hover:bg-[#EDE8DD] text-[#C74634] border border-[#D4CEC2] rounded-md font-mono text-xs font-bold transition-all flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <span>INVESTIGATE THIS</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
