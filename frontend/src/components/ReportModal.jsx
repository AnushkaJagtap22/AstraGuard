import React from 'react';
import { FileText, Copy, Printer, X, CheckCircle2 } from 'lucide-react';

export default function ReportModal({ isOpen, onClose, investigation }) {
  if (!isOpen || !investigation) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(investigation.report || '');
    alert('Structured incident report copied to clipboard!');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1C1C1A]/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="w-full max-w-3xl bg-[#FFFFFF] border border-[#D4CEC2] rounded-2xl shadow-xl overflow-hidden my-8">
        
        {/* Header */}
        <div className="px-6 py-4 bg-[#FAF8F4] border-b border-[#D4CEC2] flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-[#FBEDEA] border border-[#F5D8D2] flex items-center justify-center">
              <FileText className="w-5 h-5 text-[#C74634]" />
            </div>
            <div>
              <h3 className="text-sm font-bold font-mono text-[#1C1C1A]">ASTRAGUARD OFFICIAL INCIDENT REPORT</h3>
              <p className="text-xs text-[#858078] font-mono">Case #{investigation.id} • {investigation.created_at}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopy}
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-[#FFFFFF] hover:bg-[#FAF8F4] text-[#1C1C1A] border border-[#D4CEC2] text-xs rounded-lg transition-colors font-mono cursor-pointer"
            >
              <Copy className="w-3.5 h-3.5 text-[#5E5B55]" />
              <span>Copy</span>
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-[#C74634] hover:bg-[#9F2F24] text-white border border-[#9F2F24] text-xs rounded-lg transition-colors font-mono cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-white" />
              <span>Print / PDF</span>
            </button>
            <button onClick={onClose} className="p-1.5 text-[#858078] hover:text-[#1C1C1A] rounded cursor-pointer">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Report Body */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto text-[#1C1C1A] text-xs font-mono bg-[#F5F1E8]">
          
          <div className="border border-[#D4CEC2] bg-[#FFFFFF] p-4 rounded-xl space-y-2">
            <div className="flex justify-between items-center text-sm font-bold border-b border-[#E1DCD2] pb-2 text-[#C74634]">
              <span>Case Reference: {investigation.id}</span>
              <span>Assessment: {investigation.assessment}</span>
            </div>
            <div className="grid grid-cols-2 gap-4 text-[11px] text-[#5E5B55] pt-1">
              <div><strong className="text-[#1C1C1A]">Input Type:</strong> {investigation.input_type}</div>
              <div><strong className="text-[#1C1C1A]">Confidence Rating:</strong> {investigation.confidence}</div>
              <div><strong className="text-[#1C1C1A]">Evidence Strength:</strong> {investigation.evidence_strength}</div>
              <div><strong className="text-[#1C1C1A]">Orchestrated Agents:</strong> 8 Specialized AI Agents</div>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold text-[#1C1C1A] uppercase tracking-wider mb-2 border-b border-[#D4CEC2] pb-1">1. Original Submitted Content</h4>
            <p className="bg-[#FFFFFF] p-3 rounded-lg border border-[#D4CEC2] text-[#1C1C1A] font-sans">{investigation.input_content}</p>
          </div>

          <div>
            <h4 className="text-xs font-bold text-[#1C1C1A] uppercase tracking-wider mb-2 border-b border-[#D4CEC2] pb-1">2. Decomposed Claims Analysis</h4>
            <div className="space-y-2">
              {investigation.claims?.map((c, idx) => (
                <div key={idx} className="bg-[#FFFFFF] p-3 rounded-lg border border-[#D4CEC2]">
                  <div className="flex justify-between font-bold text-[#1C1C1A] mb-1">
                    <span>Claim {idx + 1}: {c.text}</span>
                    <span className={`px-2 py-0.5 text-[10px] rounded font-bold ${c.status === 'Contradicted' ? 'bg-[#FBEDEA] text-[#C74634] border border-[#F5D8D2]' : 'bg-[#FBF2DD] text-[#B7791F] border border-[#E5CC99]'}`}>{c.status}</span>
                  </div>
                  <p className="text-[11px] text-[#5E5B55] font-sans">{c.reason}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold text-[#1C1C1A] uppercase tracking-wider mb-2 border-b border-[#D4CEC2] pb-1">3. Verified Official Sources</h4>
            <div className="space-y-2">
              {investigation.sources?.map((s, idx) => (
                <div key={idx} className="bg-[#FFFFFF] p-3 rounded-lg border border-[#D4CEC2] flex justify-between items-start">
                  <div>
                    <span className="font-bold text-[#1C1C1A]">{s.name}</span>
                    <p className="text-[11px] text-[#5E5B55] font-sans mt-0.5">{s.extracted_summary}</p>
                  </div>
                  <span className="text-[10px] bg-[#EDF2F5] text-[#46627A] px-2 py-0.5 rounded border border-[#C6D3DC] font-bold">{s.source_type}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold text-[#1C1C1A] uppercase tracking-wider mb-2 border-b border-[#D4CEC2] pb-1">4. Recommended Incident Action Plan</h4>
            <ul className="space-y-1 bg-[#FFFFFF] p-4 rounded-lg border border-[#D4CEC2] font-sans">
              {investigation.recommendations?.map((r, idx) => (
                <li key={idx} className="flex items-start space-x-2 text-[#1C1C1A]">
                  <CheckCircle2 className="w-4 h-4 text-[#39704D] shrink-0 mt-0.5" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-[#FAF8F4] border-t border-[#D4CEC2] text-center text-[10px] text-[#858078] font-mono">
          Generated automatically by AstraGuard AI Agentic Investigation Operating System. Valid for law enforcement & security archive.
        </div>

      </div>
    </div>
  );
}
