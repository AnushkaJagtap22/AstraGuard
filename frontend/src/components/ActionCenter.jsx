import React from 'react';
import { 
  CreditCard, 
  Ban, 
  Archive, 
  Flag, 
  ShieldCheck, 
  PhoneCall
} from 'lucide-react';

export default function ActionCenter({ recommendations = [], assessment = '', onOpenHelp }) {
  const isScam = assessment.includes("SCAM") || assessment.includes("FINANCIAL");
  const isPhishing = assessment.includes("PHISHING") || assessment.includes("URL");

  const actionCards = [
    {
      title: "DON'T PAY",
      condition: isScam,
      icon: CreditCard,
      badge: "CRITICAL",
      badgeColor: "bg-[#FBEDEA] text-[#C74634] border-[#F5D8D2]",
      desc: "Do not send registration fees, processing charges, or UPI payments requested by unverified contacts."
    },
    {
      title: "DON'T CLICK",
      condition: isPhishing,
      icon: Ban,
      badge: "CRITICAL",
      badgeColor: "bg-[#FBEDEA] text-[#C74634] border-[#F5D8D2]",
      desc: "Do not open suspicious links or enter banking credentials, Aadhaar numbers, or SMS OTPs."
    },
    {
      title: "PRESERVE EVIDENCE",
      condition: true,
      icon: Archive,
      badge: "IMPORTANT",
      badgeColor: "bg-[#FAF8F4] text-[#1C1C1A] border-[#D4CEC2]",
      desc: "Save original message text, screenshots, timestamps, sender numbers, and URLs for legal cyber reporting."
    },
    {
      title: "REPORT CONTENT",
      condition: true,
      icon: Flag,
      badge: "ACTIONABLE",
      badgeColor: "bg-[#FBF2DD] text-[#B7791F] border-[#E5CC99]",
      desc: "Report this message or handle directly on WhatsApp, Meta, X, or Telegram platform security queues."
    },
    {
      title: "VERIFY OFFICIAL SOURCE",
      condition: true,
      icon: ShieldCheck,
      badge: "VERIFIED",
      badgeColor: "bg-[#EAF3ED] text-[#39704D] border-[#B9D3C1]",
      desc: "Verify government schemes exclusively on official portal domains (.gov.in / .nic.in)."
    },
    {
      title: "GET OFFICIAL HELP",
      condition: true,
      icon: PhoneCall,
      badge: "HELPLINE",
      badgeColor: "bg-[#EDF2F5] text-[#46627A] border-[#C6D3DC]",
      desc: "Contact MHA National Cyber Crime Helpline at 1930 or submit details on cybercrime.gov.in."
    }
  ];

  return (
    <div className="space-y-4 font-mono">
      <div className="flex items-center justify-between border-b border-[#D4CEC2] pb-2">
        <h3 className="text-xs font-bold text-[#1C1C1A] uppercase tracking-wider flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#C74634]" />
          <span>Action Center — Recommended Protocol</span>
        </h3>
        <span className="text-[10px] text-[#858078]">Safety Protocol Guidance</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {actionCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className={`bg-[#FFFFFF] border p-4 rounded-xl space-y-2 flex flex-col justify-between transition-all shadow-subtle ${
                card.condition ? 'border-[#C74634]' : 'border-[#D4CEC2] opacity-80'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Icon className="w-4 h-4 text-[#C74634]" />
                    <h4 className="text-xs font-bold text-[#1C1C1A]">{card.title}</h4>
                  </div>
                  <span className={`text-[9px] font-mono px-2 py-0.5 rounded border font-bold ${card.badgeColor}`}>
                    {card.badge}
                  </span>
                </div>
                <p className="text-xs text-[#5E5B55] font-sans leading-relaxed">{card.desc}</p>
              </div>

              {card.title === 'GET OFFICIAL HELP' && (
                <button
                  onClick={onOpenHelp}
                  className="w-full mt-2 py-1.5 bg-[#C74634] hover:bg-[#9F2F24] text-white rounded-lg text-xs font-mono transition-all text-center cursor-pointer shadow-subtle"
                >
                  Locate Nearest Cyber Station
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
