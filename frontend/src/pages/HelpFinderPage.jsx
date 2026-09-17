import React, { useState, useEffect } from 'react';

const DEFAULT_HELPLINES = [
  {
    state: "National / Central",
    district: "All India",
    authority: "National Cyber Crime Reporting Portal (MHA)",
    helpline: "1930",
    website: "https://cybercrime.gov.in",
    category: "Financial Fraud & Cybercrime",
    address: "Ministry of Home Affairs, New Delhi"
  },
  {
    state: "National / Central",
    district: "All India",
    authority: "PIB Fact Check Unit (Misinformation)",
    helpline: "+91 87997 11259",
    website: "https://pib.gov.in/factcheck",
    category: "Misinformation Verification",
    address: "Press Information Bureau, Shastri Bhawan, New Delhi"
  },
  {
    state: "Maharashtra",
    district: "Mumbai",
    authority: "Mumbai Police Cyber Crime Cell",
    helpline: "022-26556677 / 1930",
    website: "https://mumbaipolice.gov.in",
    category: "Cyber Police Station",
    address: "BKC Cyber Police Station, Bandra Kurla Complex, Mumbai - 400051"
  },
  {
    state: "Karnataka",
    district: "Bengaluru",
    authority: "Bengaluru CEN Police Station (Cyber Crime)",
    helpline: "080-22201021 / 1930",
    website: "https://ksp.karnataka.gov.in",
    category: "Cyber Police Station",
    address: "Infantry Road, Central Police Office, Bengaluru - 560001"
  }
];

export default function HelpFinderPage() {
  const [helplines, setHelplines] = useState(DEFAULT_HELPLINES);
  const [selectedState, setSelectedState] = useState('All');

  useEffect(() => {
    fetch(`/api/help-finder?state=${selectedState}`)
      .then((res) => {
        if (!res.ok) throw new Error('API offline');
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setHelplines(data);
        }
      })
      .catch((err) => {
        console.log('Help Finder API offline, using default directory');
        if (selectedState === 'All') {
          setHelplines(DEFAULT_HELPLINES);
        } else {
          setHelplines(DEFAULT_HELPLINES.filter(h => h.state.toLowerCase() === selectedState.toLowerCase() || h.state.includes("National")));
        }
      });
  }, [selectedState]);

  const states = ['All', 'National / Central', 'Maharashtra', 'Karnataka', 'Delhi', 'Tamil Nadu'];
  const safeItems = Array.isArray(helplines) ? helplines : DEFAULT_HELPLINES;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 bg-[#F5F1E8]">
      
      {/* HEADER */}
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold font-mono text-[#1C1C1A]">
          Official Cybercrime & Misinformation Helpline Directory
        </h2>
        <p className="text-xs text-[#5E5B55]">
          Verified, authoritative contact information for Indian police cyber cells, Ministry of Home Affairs helpline (1930), and PIB fact-check units.
        </p>
      </div>

      {/* STATE SELECTOR */}
      <div className="bg-[#FFFFFF] border border-[#D4CEC2] p-4 rounded-xl flex flex-wrap items-center justify-between gap-4 shadow-subtle">
        <span className="text-xs font-mono font-bold text-[#1C1C1A]">Filter by State / Jurisdiction:</span>
        <div className="flex flex-wrap gap-2">
          {states.map((st) => (
            <button
              key={st}
              onClick={() => setSelectedState(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                selectedState === st ? 'bg-[#C74634] text-white font-bold' : 'bg-[#FAF8F4] text-[#5E5B55] hover:text-[#1C1C1A] border border-[#D4CEC2]'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* DIRECTORY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {safeItems.map((item, idx) => (
          <div key={idx} className="bg-[#FFFFFF] border border-[#D4CEC2] hover:border-[#C74634] rounded-2xl p-6 space-y-4 shadow-subtle transition-all">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-[#C74634] uppercase font-bold">
                  {item.state} • {item.district}
                </span>
                <h3 className="text-base font-bold font-mono text-[#1C1C1A]">{item.authority}</h3>
              </div>
              <span className="text-[10px] bg-[#EAF3ED] text-[#39704D] px-2.5 py-1 rounded-full font-mono border border-[#B9D3C1] font-bold">
                {item.category}
              </span>
            </div>

            <div className="bg-[#FAF8F4] p-4 rounded-xl border border-[#E1DCD2] space-y-2 text-xs font-mono">
              <div className="flex items-center justify-between">
                <span className="text-[#5E5B55]">Official Helpline:</span>
                <strong className="text-[#C74634] text-sm font-extrabold">{item.helpline}</strong>
              </div>
              <div className="flex items-center justify-between border-t border-[#E1DCD2] pt-2 text-[#5E5B55]">
                <span className="text-[#5E5B55]">Physical Address:</span>
                <span className="text-[#1C1C1A] text-right max-w-[220px]">{item.address}</span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={item.website}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-1.5 text-xs font-mono text-[#C74634] hover:underline"
              >
                <span>Visit Official Portal ({item.website})</span>
              </a>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
