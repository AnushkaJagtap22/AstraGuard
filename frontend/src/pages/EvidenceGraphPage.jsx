import React, { useState } from 'react';
import { 
  Share2, 
  BookOpen
} from 'lucide-react';
import { demoInvestigations } from '../lib/demoData';
import EvidenceChain from '../components/EvidenceChain';

export default function EvidenceGraphPage({ investigation }) {
  const activeCase = investigation || demoInvestigations[0];
  const [storyMode, setStoryMode] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 bg-[#F5F1E8] text-[#1C1C1A] font-mono">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#D4CEC2] pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-xl font-bold text-[#1C1C1A] flex items-center gap-2">
              <Share2 className="w-5 h-5 text-[#C74634]" />
              <span>Interactive Evidence Chain & Relational Graph</span>
            </h2>
            <button
              type="button"
              onClick={() => setStoryMode(!storyMode)}
              className="px-3 py-1 bg-[#FFFFFF] hover:bg-[#FAF8F4] text-[#C74634] border border-[#D4CEC2] rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ml-2 cursor-pointer shadow-subtle"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#C74634]" />
              <span>{storyMode ? 'Exit Story Mode' : 'Investigation Story'}</span>
            </button>
          </div>
          <p className="text-xs text-[#858078] mt-1">
            Case #{activeCase.id} • {activeCase.claims?.length || 3} Extracted Claims • {activeCase.sources?.length || 3} Connected Sources
          </p>
        </div>
      </div>

      {/* STORY MODE */}
      {storyMode ? (
        <div className="bg-[#FFFFFF] border border-[#D4CEC2] rounded-2xl p-6 space-y-6 shadow-subtle animate-in fade-in duration-300">
          <div className="flex justify-between items-center border-b border-[#E1DCD2] pb-3">
            <h3 className="text-sm font-bold text-[#C74634] uppercase flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#C74634]" />
              <span>Investigation Narrative Story</span>
            </h3>
            <button type="button" onClick={() => setStoryMode(false)} className="text-xs text-[#858078] hover:text-[#1C1C1A] cursor-pointer">[ Exit Story ]</button>
          </div>

          <div className="space-y-4">
            {activeCase.story_steps?.map((step, idx) => (
              <div key={idx} className="bg-[#FAF8F4] border border-[#D4CEC2] p-4 rounded-xl space-y-1">
                <div className="flex items-center space-x-2 text-xs">
                  <span className="text-[#C74634] font-bold font-mono">STAGE 0{idx + 1}: {step.stage}</span>
                  <span className="text-[#1C1C1A] font-bold font-sans">• {step.title}</span>
                </div>
                <p className="text-xs text-[#5E5B55] font-sans leading-relaxed">{step.content}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* LIGHTWEIGHT EVIDENCE CHAIN COMPONENT */
        <EvidenceChain
          inputType={activeCase.input_type || 'text'}
          title={activeCase.title}
          rawText={activeCase.input_content}
          detectedUrl="https://govt-scholarship-scheme-2026-verify.xyz"
          claims={activeCase.claims?.map(c => c.text) || []}
          threats={activeCase.threats_detected?.map(t => t.description) || []}
          sources={activeCase.sources || []}
          assessment={{
            verdict: activeCase.assessment || 'MISLEADING / POTENTIAL SCAM',
            severity: 'HIGH',
            confidence: activeCase.confidence || 'HIGH',
            coverage: `${activeCase.claims?.length || 3} claims & ${activeCase.sources?.length || 3} sources verified`,
            why: [
              'Official National Scholarship Portal (scholarships.gov.in) issued no such blanket scheme.',
              'PIB Fact Check previously debunked similar viral WhatsApp scholarship messages.',
              'Target domain (.xyz) was registered 3 days ago with WHOIS privacy protection.'
            ],
            unresolved: 'Original originator of forwarded WhatsApp message.'
          }}
          isDemo={true}
          badgeLabel="DEMO INVESTIGATION"
        />
      )}

    </div>
  );
}
