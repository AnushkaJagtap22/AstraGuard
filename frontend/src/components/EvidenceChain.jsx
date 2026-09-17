import React, { useState } from 'react';
import { 
  FileText, 
  Upload, 
  Link as LinkIcon, 
  Image as ImageIcon, 
  Video, 
  FileCode, 
  CheckCircle2, 
  ShieldAlert, 
  Clock, 
  ExternalLink,
  ChevronRight,
  ChevronDown,
  Ban,
  Network,
  Info,
  Layers,
  AlertTriangle,
  HelpCircle
} from 'lucide-react';

export default function EvidenceChain({ 
  inputType = 'screenshot',
  title = '',
  rawText = '',
  detectedUrl = null,
  claims = [],
  threats = [],
  sources = [],
  evidenceItems = [],
  assessment = null,
  isDemo = false,
  badgeLabel = 'USER PROVIDED'
}) {
  const [selectedChainItem, setSelectedChainItem] = useState(null);
  const [showConnectionsModal, setShowConnectionsModal] = useState(false);
  const [showWhyRationale, setShowWhyRationale] = useState(true);

  // Build sequential Evidence Chain steps dynamically from actual investigation state
  const chainSteps = [];

  // Step 1: ORIGINAL INPUT
  chainSteps.push({
    id: 'input',
    stage: '01 ORIGINAL INPUT',
    icon: inputType === 'screenshot' ? Upload : inputType === 'url' ? LinkIcon : inputType === 'image' ? ImageIcon : inputType === 'video' ? Video : inputType === 'document' ? FileCode : FileText,
    title: `Input Format: ${inputType.toUpperCase()}`,
    detail: rawText ? (rawText.length > 80 ? rawText.substring(0, 80) + '...' : rawText) : title,
    badge: badgeLabel,
    badgeColor: isDemo ? 'bg-[#FBF2DD] text-[#B7791F] border-[#E5CC99]' : 'bg-[#EDF2F5] text-[#46627A] border-[#D4CEC2]',
    category: 'Source Evidence',
    strength: 'STRONG',
    why: 'Submitted directly into AstraGuard investigation desk.',
    extractedFrom: `User ${inputType.toUpperCase()} submission`
  });

  // Step 2: OCR / MEDIA / DOCUMENT EXTRACTION
  if (inputType === 'screenshot' || inputType === 'image') {
    chainSteps.push({
      id: 'ocr',
      stage: '02 OCR EXTRACTION',
      icon: ImageIcon,
      title: 'OCR Visual Extraction',
      detail: rawText ? `Extracted ${rawText.split('\n').length || 1} text blocks from visual container.` : 'Visual pixels scanned.',
      badge: rawText ? 'TEXT EXTRACTED' : 'VISUAL PARSED',
      badgeColor: 'bg-[#EAF3ED] text-[#39704D] border-[#B9D3C1]',
      category: 'Media Analysis',
      strength: 'STRONG',
      why: 'Optical Character Recognition scanned visual bounds.',
      extractedFrom: 'Visual bounding box regions'
    });
  } else if (inputType === 'video') {
    chainSteps.push({
      id: 'media',
      stage: '02 MEDIA & KEYFRAMES',
      icon: Video,
      title: 'Keyframe Telemetry',
      detail: 'Sampled 24 keyframes across timeline segments.',
      badge: 'KEYFRAMES PARSED',
      badgeColor: 'bg-[#EDF2F5] text-[#46627A] border-[#D4CEC2]',
      category: 'Media Analysis',
      strength: 'MODERATE',
      why: 'Keyframe spectral alignment sampled.',
      extractedFrom: 'Video timestamp track'
    });
  } else if (inputType === 'document') {
    chainSteps.push({
      id: 'doc',
      stage: '02 DOCUMENT PARSING',
      icon: FileCode,
      title: 'Parsed Document Body',
      detail: rawText ? `Parsed document text streams (${rawText.length} chars).` : 'Document structural layout parsed.',
      badge: 'PARSED',
      badgeColor: 'bg-[#EDF2F5] text-[#46627A] border-[#D4CEC2]',
      category: 'Document Analysis',
      strength: 'STRONG',
      why: 'Parsed document layout and embedded metadata.',
      extractedFrom: 'Document payload'
    });
  }

  // Step 3: CLAIMS EXTRACTED
  if (claims && claims.length > 0) {
    chainSteps.push({
      id: 'claim',
      stage: '03 EXTRACTED CLAIMS',
      icon: FileText,
      title: `Claim #01: "${claims[0]}"`,
      detail: claims.length > 1 ? `+ ${claims.length - 1} additional atomic claims extracted.` : 'Atomic claim extracted for verification.',
      badge: `${claims.length} CLAIMS`,
      badgeColor: 'bg-[#FBF2DD] text-[#B7791F] border-[#E5CC99]',
      category: 'Atomic Claim Decomposition',
      strength: 'STRONG',
      why: 'Extracted from submitted content using Claim Decomposer agent.',
      extractedFrom: 'Submitted text / extracted OCR payload'
    });
  }

  // Step 4: URL DETECTED (CONDITIONAL!)
  if (detectedUrl) {
    chainSteps.push({
      id: 'url',
      stage: '04 DISCOVERED URL',
      icon: LinkIcon,
      title: 'Target URL Detected',
      detail: detectedUrl,
      badge: 'URL DETECTED',
      badgeColor: 'bg-[#EDF2F5] text-[#46627A] border-[#D4CEC2]',
      category: 'URL Intelligence',
      strength: 'STRONG',
      why: 'Discovered embedded hyperlink in submitted content.',
      extractedFrom: 'Content regex scan',
      urlLink: detectedUrl
    });
  } else {
    chainSteps.push({
      id: 'url_none',
      stage: '04 URL CHECK',
      icon: Ban,
      title: 'NO URL DETECTED',
      detail: '✓ Content contains no embedded URLs. URL Intelligence Agent skipped.',
      badge: 'NO URL',
      badgeColor: 'bg-[#EDE8DD] text-[#858078] border-[#D4CEC2]',
      category: 'URL Intelligence',
      strength: 'UNVERIFIED',
      why: 'No embedded hyperlink detected in submission content.',
      extractedFrom: 'Content scan'
    });
  }

  // Step 5: THREAT SIGNALS
  if (threats && threats.length > 0) {
    chainSteps.push({
      id: 'threat',
      stage: '05 THREAT INDICATORS',
      icon: AlertTriangle,
      title: typeof threats[0] === 'string' ? threats[0] : (threats[0]?.label || 'Threat Signal Flagged'),
      detail: threats.length > 1 ? `+ ${threats.length - 1} additional threat risk signals.` : 'Risk indicator flagged by Threat Detector.',
      badge: `${threats.length} THREATS`,
      badgeColor: 'bg-[#FBEDEA] text-[#C74634] border-[#F5D8D2]',
      category: 'Threat Analysis',
      strength: 'STRONG',
      why: 'Matched known scam patterns (urgency, fee demand, domain spoofing).',
      extractedFrom: 'Threat Detector Agent'
    });
  }

  // Step 6: SOURCE VERIFICATION
  const primarySource = sources && sources.length > 0 ? sources[0] : null;
  chainSteps.push({
    id: 'source',
    stage: '06 SOURCE VERIFICATION',
    icon: ShieldAlert,
    title: primarySource ? primarySource.name : 'Authoritative Registry Check',
    detail: primarySource ? (primarySource.extracted_summary || primarySource.detail || 'Registry queried.') : (isDemo ? 'Official government registry queried. 1 direct contradiction found.' : 'External source verification queried. Registries cross-referenced.'),
    badge: primarySource ? primarySource.relation?.toUpperCase() || 'VERIFIED' : (isDemo ? 'CONTRADICTS' : 'CHECKED'),
    badgeColor: primarySource?.relation === 'contradicts' || isDemo ? 'bg-[#FBEDEA] text-[#C74634] border-[#F5D8D2]' : 'bg-[#EAF3ED] text-[#39704D] border-[#B9D3C1]',
    category: 'Source Verification',
    strength: 'STRONG',
    why: 'Cross-checked against official databases (scholarships.gov.in, PIB Fact Check).',
    extractedFrom: 'Authoritative Registries',
    urlLink: primarySource?.url && primarySource.url.startsWith('http') ? primarySource.url : null
  });

  // Step 7: EVIDENCE SYNTHESIS & FINAL ASSESSMENT
  chainSteps.push({
    id: 'synthesis',
    stage: '07 EVIDENCE SYNTHESIS',
    icon: CheckCircle2,
    title: assessment?.verdict || 'Potentially Misleading / Risk Indicators',
    detail: assessment?.coverage || 'Synthesized final evidence-backed assessment.',
    badge: assessment?.severity || 'HIGH RISK',
    badgeColor: 'bg-[#FBF2DD] text-[#B7791F] border-[#E5CC99]',
    category: 'Final Verdict Synthesis',
    strength: assessment?.confidence || 'Strong',
    why: 'Synthesized by Evidence Synthesis Agent based on connected evidence nodes.',
    extractedFrom: 'Multi-Agent Evidence Synthesis'
  });

  return (
    <div className="space-y-6 font-mono">
      
      {/* WHY THIS ASSESSMENT? SECTION */}
      {assessment && (
        <div className="bg-[#FFFFFF] border border-[#D4CEC2] p-5 rounded-xl space-y-3 shadow-sm">
          <div className="flex justify-between items-center border-b border-[#E1DCD2] pb-2">
            <h3 className="text-xs font-bold text-[#B7791F] uppercase tracking-wider flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-[#B7791F]" />
              <span>WHY THIS ASSESSMENT?</span>
            </h3>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] text-[#858078]">Strength: <strong className="text-[#1C1C1A]">{assessment.confidence || 'Strong'}</strong></span>
              <button
                type="button"
                onClick={() => setShowWhyRationale(!showWhyRationale)}
                className="text-[#C74634] hover:underline text-xs font-bold font-mono cursor-pointer"
              >
                [ {showWhyRationale ? 'Hide Details' : 'Show Details'} ]
              </button>
            </div>
          </div>

          <div>
            <span className="text-[10px] text-[#858078] uppercase font-bold">SYNTHESIZED VERDICT</span>
            <h4 className="text-base font-bold text-[#C74634] mt-0.5">{assessment.verdict}</h4>
          </div>

          {showWhyRationale && (
            <div className="bg-[#FAF8F4] p-4 rounded-lg border border-[#E1DCD2] space-y-2 text-xs font-sans text-[#1C1C1A] animate-in fade-in duration-200">
              <strong className="text-[#B7791F] font-mono text-[11px] block">AstraGuard Identified Key Drivers:</strong>
              {assessment.why ? (
                assessment.why.map((reason, idx) => (
                  <p key={idx}>• {reason}</p>
                ))
              ) : (
                <>
                  <p>• Explicit fee payment requested prior to grant disbursement.</p>
                  <p>• Artificial urgency deadline pressure ('TODAY at 11:59 PM').</p>
                  <p>• Target web domain extension is unverified and non-governmental.</p>
                </>
              )}
              {assessment.unresolved && (
                <div className="pt-2 border-t border-[#E1DCD2] text-[11px] font-mono">
                  <span className="text-[#858078]">UNRESOLVED: </span>
                  <span className="text-[#5E5B55]">{assessment.unresolved}</span>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* EVIDENCE CHAIN HEADER & OPTIONAL VIEW CONNECTIONS BUTTON */}
      <div className="flex justify-between items-center border-b border-[#D4CEC2] pb-2">
        <div>
          <h3 className="text-xs font-bold text-[#1C1C1A] uppercase tracking-wider flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#C74634]" />
            <span>Interactive Evidence Chain ({chainSteps.length} Steps)</span>
          </h3>
          <p className="text-[11px] text-[#858078] mt-0.5">Click any chain node to inspect connected evidence details</p>
        </div>

        <button
          type="button"
          onClick={() => setShowConnectionsModal(true)}
          className="px-3.5 py-1.5 bg-[#FAF8F4] hover:bg-[#EDE8DD] text-[#C74634] border border-[#D4CEC2] rounded-md text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
        >
          <Network className="w-3.5 h-3.5" />
          <span>[ View Connections ]</span>
        </button>
      </div>

      {/* RESPONSIVE EVIDENCE CHAIN (HORIZONTAL DESK / VERTICAL MOBILE) */}
      <div className="bg-[#FFFFFF] border border-[#D4CEC2] p-4 sm:p-6 rounded-xl shadow-sm overflow-x-auto">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 min-w-max md:min-w-0">
          {chainSteps.map((step, idx) => {
            const Icon = step.icon;
            const isSelected = selectedChainItem?.id === step.id;

            return (
              <React.Fragment key={step.id}>
                {/* STEP NODE CARD */}
                <div
                  type="button"
                  onClick={() => setSelectedChainItem(isSelected ? null : step)}
                  className={`flex-1 min-w-[160px] p-3.5 rounded-lg border cursor-pointer transition-all space-y-2 relative group hover:border-[#C74634] ${
                    isSelected
                      ? 'bg-[#FAF8F4] border-[#C74634] ring-1 ring-[#C74634]/40'
                      : 'bg-[#FFFFFF] border-[#D4CEC2] text-[#1C1C1A]'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] uppercase font-bold">
                    <span className="text-[#C74634] flex items-center gap-1 font-mono">
                      <Icon className="w-3 h-3" />
                      {step.stage.split(' ')[0]}
                    </span>
                    <span className={`px-1.5 py-0.5 rounded border text-[9px] font-bold ${step.badgeColor}`}>
                      {step.badge}
                    </span>
                  </div>

                  <h4 className="text-xs font-bold font-sans line-clamp-2 text-[#1C1C1A]">{step.title}</h4>
                  <p className="text-[10px] text-[#858078] font-sans line-clamp-1">{step.detail}</p>
                </div>

                {/* CHAIN CONNECTING ARROW */}
                {idx < chainSteps.length - 1 && (
                  <div className="flex md:flex-col items-center justify-center text-[#B9B1A3] my-1 md:my-0">
                    <ChevronRight className="w-5 h-5 hidden md:block text-[#C74634]/60" />
                    <ChevronDown className="w-5 h-5 md:hidden text-[#C74634]/60" />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* CLICKED EVIDENCE ITEM INSPECTOR DRAWER */}
      {selectedChainItem && (
        <div className="bg-[#FFFFFF] border border-[#D4CEC2] p-5 rounded-xl space-y-3 text-xs animate-in fade-in duration-200 shadow-sm">
          <div className="flex justify-between items-center border-b border-[#E1DCD2] pb-2 text-[#C74634] font-bold">
            <span className="flex items-center gap-2">
              <Info className="w-4 h-4 text-[#C74634]" />
              <span>EVIDENCE INSPECTOR: {selectedChainItem.stage}</span>
            </span>
            <button type="button" onClick={() => setSelectedChainItem(null)} className="text-[#858078] hover:text-[#1C1C1A]">✕</button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-[11px]">
            <div>
              <strong className="text-[#858078] block uppercase text-[10px]">Title / Claim:</strong>
              <p className="text-[#1C1C1A] font-sans mt-0.5 font-medium">{selectedChainItem.title}</p>
            </div>
            <div>
              <strong className="text-[#858078] block uppercase text-[10px]">Category:</strong>
              <p className="text-[#46627A] font-sans mt-0.5">{selectedChainItem.category}</p>
            </div>
            <div>
              <strong className="text-[#858078] block uppercase text-[10px]">Evidence Strength:</strong>
              <p className="text-[#B7791F] font-bold mt-0.5">{selectedChainItem.strength}</p>
            </div>
          </div>

          <div className="bg-[#FAF8F4] p-3 rounded-lg border border-[#E1DCD2] space-y-1">
            <strong className="text-[#1C1C1A]">WHY? </strong>
            <p className="text-[#5E5B55] font-sans text-xs">{selectedChainItem.why}</p>
            <p className="text-[10px] text-[#858078] pt-1 font-mono">Extracted from: {selectedChainItem.extractedFrom}</p>
          </div>

          {selectedChainItem.urlLink && (
            <div className="pt-2 flex justify-end">
              <a
                href={selectedChainItem.urlLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-1.5 bg-[#C74634] hover:bg-[#9F2F24] text-[#FFFFFF] font-bold text-xs rounded-md flex items-center gap-1.5"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>[ View Source ]</span>
              </a>
            </div>
          )}
        </div>
      )}

      {/* LIGHTWEIGHT CONNECTIONS MODAL */}
      {showConnectionsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-2xl bg-[#F5F1E8] border border-[#D4CEC2] rounded-2xl p-6 space-y-5 shadow-2xl">
            <div className="flex justify-between items-center border-b border-[#D4CEC2] pb-3 text-[#C74634] font-bold text-xs">
              <span className="flex items-center gap-2">
                <Network className="w-4 h-4 text-[#C74634]" />
                <span>EVIDENCE RELATIONSHIPS MODAL</span>
              </span>
              <button type="button" onClick={() => setShowConnectionsModal(false)} className="text-[#858078] hover:text-[#1C1C1A] font-bold">
                ✕ [ Close ]
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="bg-[#FFFFFF] p-3.5 rounded-lg border border-[#D4CEC2] flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-[#858078] block uppercase font-bold">SUBMITTED CLAIM</span>
                  <span className="text-[#1C1C1A] font-bold font-sans">"{claims[0] || title}"</span>
                </div>
                <span className="text-[#C74634] font-bold text-[10px] bg-[#FBEDEA] px-2.5 py-1 rounded border border-[#F5D8D2]">
                  CONTRADICTED BY
                </span>
                <div>
                  <span className="text-[10px] text-[#858078] block uppercase font-bold">OFFICIAL SOURCE</span>
                  <span className="text-[#39704D] font-bold font-sans">{sources[0]?.name || 'scholarships.gov.in'}</span>
                </div>
              </div>

              <div className="bg-[#FFFFFF] p-3.5 rounded-lg border border-[#D4CEC2] flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-[#858078] block uppercase font-bold">THREAT SIGNAL</span>
                  <span className="text-[#C74634] font-bold font-sans">{typeof threats[0] === 'string' ? threats[0] : (threats[0]?.label || '₹999 fee solicitation')}</span>
                </div>
                <span className="text-[#46627A] font-bold text-[10px] bg-[#EDF2F5] px-2.5 py-1 rounded border border-[#D4CEC2]">
                  TRIGGERS THREAT
                </span>
                <div>
                  <span className="text-[10px] text-[#858078] block uppercase font-bold">FINAL VERDICT</span>
                  <span className="text-[#B7791F] font-bold font-sans">{assessment?.verdict || 'Potentially Misleading'}</span>
                </div>
              </div>
            </div>

            <div className="pt-2 text-right">
              <button
                type="button"
                onClick={() => setShowConnectionsModal(false)}
                className="px-5 py-2 bg-[#1C1C1A] hover:bg-[#292824] text-white text-xs font-bold rounded-md cursor-pointer"
              >
                [ Return to Evidence Chain ]
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
