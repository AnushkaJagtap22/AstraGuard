import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { demoInvestigations } from '../lib/demoData';

export default function EvidenceVaultPage({ onSelectSavedInvestigation }) {
  const [investigations, setInvestigations] = useState(demoInvestigations);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/investigations')
      .then((res) => {
        if (!res.ok) throw new Error('API offline');
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setInvestigations(data);
        }
      })
      .catch(() => {
        console.log('Evidence Vault API offline, using demo dataset');
        setInvestigations(demoInvestigations);
      });
  }, []);

  const safeInvs = Array.isArray(investigations) ? investigations : demoInvestigations;

  const filtered = safeInvs.filter(inv =>
    inv.title?.toLowerCase().includes(search.toLowerCase()) ||
    inv.id?.toLowerCase().includes(search.toLowerCase()) ||
    inv.assessment?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 bg-[#F5F1E8]">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#D4CEC2] pb-4">
        <div>
          <h2 className="text-xl font-bold font-mono text-[#1C1C1A] flex items-center gap-2">
            <span>AstraGuard Evidence Vault Archive</span>
          </h2>
          <p className="text-xs text-[#5E5B55] font-mono">
            Persistent forensic repository of verified cases, evidence graphs, source trails, and incident reports.
          </p>
        </div>

        {/* SEARCH BAR */}
        <div className="relative w-full sm:w-72">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search vault cases..."
            className="w-full bg-[#FFFFFF] border border-[#D4CEC2] rounded-md px-4 py-2 text-xs text-[#1C1C1A] placeholder-[#858078] focus:outline-none focus:border-[#C74634] font-mono shadow-sm"
          />
        </div>
      </div>

      {/* VAULT CASE LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((inv) => (
          <div
            key={inv.id}
            className="bg-[#FFFFFF] border border-[#D4CEC2] hover:border-[#C74634] rounded-lg p-5 space-y-4 transition-all flex flex-col justify-between shadow-sm"
          >
            <div className="space-y-3">
              <div className="flex justify-between items-center text-[10px] font-mono">
                <span className="text-[#C74634] font-bold">{inv.id}</span>
                <span className="bg-[#FAF8F4] text-[#5E5B55] px-2 py-0.5 rounded border border-[#E1DCD2] uppercase font-bold">
                  {inv.input_type || 'CASE'}
                </span>
              </div>

              <h3 className="text-sm font-bold text-[#1C1C1A] font-sans line-clamp-2">{inv.title}</h3>

              <div className="inline-block px-2.5 py-1 rounded-md text-xs font-mono font-bold border bg-[#FBEDEA] text-[#C74634] border-[#F5D8D2]">
                {inv.assessment}
              </div>
            </div>

            <div className="pt-3 border-t border-[#E1DCD2] flex items-center justify-between font-mono">
              <span className="text-[10px] text-[#858078]">
                {inv.created_at?.split('T')[0] || '16 SEP 2026'}
              </span>

              <button
                onClick={() => {
                  if (onSelectSavedInvestigation) onSelectSavedInvestigation(inv.id);
                  navigate(`/investigate/${inv.id}`);
                }}
                className="px-3 py-1.5 bg-[#FAF8F4] hover:bg-[#EDE8DD] text-[#C74634] border border-[#D4CEC2] rounded-md text-xs font-mono font-bold transition-all flex items-center space-x-1 cursor-pointer"
              >
                <span>Open Case</span>
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
