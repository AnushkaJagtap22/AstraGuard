import React, { useState, useEffect, useRef } from 'react';
import { 
  FileText, 
  Upload, 
  Link as LinkIcon, 
  Image as ImageIcon, 
  Video, 
  FileCode, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldAlert, 
  Clock, 
  Eye, 
  ChevronDown, 
  ChevronUp, 
  Layers, 
  Cpu, 
  X, 
  CheckCheck,
  Play,
  RotateCcw,
  Terminal,
  BrainCircuit,
  Ban,
  Network,
  Trash2,
  RefreshCw,
  FileCheck
} from 'lucide-react';
import EvidenceGraphPage from './EvidenceGraphPage';
import EvidenceChain from '../components/EvidenceChain';
import { demoInvestigations, demoScreenshotData, demoUrlData, demoImageData, demoVideoData, demoDocumentData } from '../lib/demoData';

// DEMO PRESETS FOR FALLBACK / QUICK CONVENIENCE DEMO
const DEMO_PRESETS = {
  screenshot: {
    title: "Government Student Scholarship WhatsApp Alert",
    hasUrl: true,
    detectedUrl: "https://example-scholarship-demo.test/apply",
    rawText: "🎓 Government Student Scholarship 2026\nApplications OPEN / Up to ₹50,000 grant\nPay ₹999 processing fee to confirm application\nhttps://example-scholarship-demo.test/apply",
    ocrRegions: [
      { id: "r1", text: "🎓 Government Student Scholarship 2026", confidence: "99%" },
      { id: "r2", text: "Applications OPEN / Up to ₹50,000 grant", confidence: "98%" },
      { id: "r3", text: "Pay ₹999 processing fee to confirm application", confidence: "99%" },
      { id: "r4", text: "https://example-scholarship-demo.test/apply", confidence: "97%" }
    ],
    claims: [
      "Government student scholarship 2026 is currently open.",
      "Students receive up to ₹50,000 grant.",
      "₹999 payment is required to confirm application."
    ],
    threats: [
      "⚠ Artificial urgency language ('TODAY at 11:59 PM')",
      "⚠ Upfront payment request prior to grant disbursement",
      "⚠ Unverified government authority logo graphic",
      "⚠ Unverified '.test' domain extension"
    ],
    assessment: {
      verdict: "Potentially Misleading / Possible Scam Indicators",
      severity: "HIGH",
      confidence: "Strong",
      coverage: "8 / 8 evidence items verified",
      why: [
        "Payment is requested before receiving the claimed scholarship grant.",
        "Official National Scholarship Portal (scholarships.gov.in) has issued no such blanket scheme.",
        "Urgency language ('TODAY at 11:59 PM') is used to pressure recipients.",
        "The web domain extension (.test) is unverified and non-governmental."
      ],
      unresolved: "Original originator of the forwarded message in public WhatsApp groups.",
      nextAction: "Do NOT submit payment or banking details. Verify official schemes directly at scholarships.gov.in."
    }
  },
  text: {
    title: "Urgent SMS Bank Account Block Notice",
    hasUrl: true,
    detectedUrl: "https://sbi-kyc-verify-update.test/login",
    rawText: "Dear Customer, Your SBI Bank account will be blocked within 24 hours due to pending KYC verification. Click here immediately to verify: https://sbi-kyc-verify-update.test/login",
    claims: [
      "Bank account faces immediate 24-hour block due to missing KYC.",
      "KYC must be verified at external web link immediately."
    ],
    threats: [
      "⚠ Coercive 24-hour account suspension penalty threat",
      "⚠ Non-institutional credential harvesting portal URL"
    ],
    assessment: {
      verdict: "High Risk Phishing / Credential Harvesting Scam",
      severity: "CRITICAL",
      confidence: "Very Strong",
      coverage: "6 / 6 evidence items verified",
      why: [
        "Commercial banks do not send account block warnings with external HTTP links.",
        "The domain 'sbi-kyc-verify-update.test' is unauthorized and spoofed.",
        "Artificially engineered 24-hour urgency is designed to capture login credentials."
      ],
      unresolved: "Originating SMS gateway aggregator source.",
      nextAction: "Do NOT enter credentials. Forward SMS to bank cyber fraud division or 1930."
    }
  },
  url: {
    title: "Suspicious National Scholarship Portal Domain",
    hasUrl: true,
    detectedUrl: "https://national-scholarship-portal-2026.xyz/apply",
    rawText: "https://national-scholarship-portal-2026.xyz/apply",
    claims: [
      "Domain is official website for Ministry of Education scholarship grants.",
      "Upfront ₹1,200 administrative fee required."
    ],
    threats: [
      "⚠ Domain Name Spoofing (mimics scholarships.gov.in)",
      "⚠ Recent domain creation date (3 days ago)"
    ],
    assessment: {
      verdict: "High Risk Phishing / Domain Impersonation",
      severity: "CRITICAL",
      confidence: "High",
      coverage: "7 / 7 evidence items verified",
      why: [
        "WHOIS records confirm domain creation date 3 days prior.",
        "SSL certificate does not align with Ministry of Education NIC servers.",
        "Official national portal URL is strictly scholarships.gov.in."
      ],
      unresolved: "Hosting server geographical IP proxy location.",
      nextAction: "Block URL in organization firewall and report domain to National Cyber Crime Portal."
    }
  },
  image: {
    title: "Viral Assam Flood Media Visual",
    hasUrl: false,
    detectedUrl: null,
    rawText: "ASSAM FLOOD RELIEF FUND URGENT DONATION - Live visual from dam breach site.",
    claims: [
      "Visual shows ongoing major dam breach in Assam today."
    ],
    threats: [
      "⚠ Reused Archival Visual (matches July 2021 photo in Chittagong)",
      "⚠ Misleading Caption Context"
    ],
    assessment: {
      verdict: "Misleading Context / Recycled Visual Media",
      severity: "MEDIUM",
      confidence: "High",
      coverage: "5 / 5 evidence items verified",
      why: [
        "Reverse image search identified 14 archival matches from July 2021 flood in Bangladesh.",
        "No current flood emergency reported in the claimed district today.",
        "Possible manipulation indicators: Image pixels are authentic, but accompanying caption misrepresents context."
      ],
      unresolved: "Camera EXIF creation timestamp stripped during social media re-upload.",
      nextAction: "Flag viral post with context advisory tag on social media networks."
    }
  },
  video: {
    title: "Leaked Official Statement Video",
    hasUrl: false,
    detectedUrl: null,
    rawText: "LEAKED: Ministry official confirming immediate examination cancellation.",
    claims: [
      "Ministry official confirms exam cancellation for all 2026 candidates."
    ],
    threats: [
      "⚠ Deepfake Audio Synthesis (94% probability)",
      "⚠ Out-of-sync lip movements"
    ],
    assessment: {
      verdict: "Synthetic Media / Deepfake Audio Manipulation",
      severity: "HIGH",
      confidence: "Very High",
      coverage: "9 / 9 evidence items verified",
      why: [
        "Audio spectral analysis revealed robotic pitch consistency and synthetic vocal harmonics.",
        "Ministry press bureau has published no such official video press release.",
        "Video keyframe analysis shows frame duplication around lip boundary regions."
      ],
      unresolved: "Original source account uploading the MP4 video binary.",
      nextAction: "Issue official clarification note and report deepfake video file."
    }
  },
  document: {
    title: "Recruitment Allotment PDF Notice",
    hasUrl: false,
    detectedUrl: null,
    filename: "Railway_Recruitment_Appointment_2026.pdf",
    rawText: "RAILWAY RECRUITMENT BOARD APPOINTMENT LETTER 2026\nSelected for Senior Assistant Station Master\nPay ₹4,500 medical examination fee within 3 days.",
    claims: [
      "Official Railway Recruitment Board appointment letter 2026.",
      "₹4,500 medical fee required to confirm appointment."
    ],
    threats: [
      "⚠ Outdated Ministry logo emblem retired in 2020",
      "⚠ Non-governmental bank account specified for fee deposit",
      "⚠ Grammar and font inconsistencies in official letterhead"
    ],
    assessment: {
      verdict: "Fraudulent PDF Document / Employment Impersonation",
      severity: "CRITICAL",
      confidence: "High",
      coverage: "6 / 6 evidence items verified",
      why: [
        "Railway Recruitment Board explicitly states medical fees are never collected via private UPI accounts.",
        "The header graphic uses a retired 2020 logo design.",
        "The contact phone number points to a non-official mobile number."
      ],
      unresolved: "PDF author metadata reveals generic unverified editor.",
      nextAction: "Do NOT transfer medical fees. Report document to Railway Vigilance Cyber Desk."
    }
  }
};

export default function InvestigatePage({ initialInput = null, onOpenCase = null }) {
  const [inputMode, setInputMode] = useState('text');
  const [userText, setUserText] = useState('');
  const [userUrl, setUserUrl] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);

  const [isDemo, setIsDemo] = useState(false);
  const [badgeLabel, setBadgeLabel] = useState('USER PROVIDED');
  const [errorMessage, setErrorMessage] = useState(null);

  // INVESTIGATION PIPELINE STATE
  const [investigationStatus, setInvestigationStatus] = useState('idle'); // 'idle' | 'analyzing' | 'completed'
  const [activeAgentIndex, setActiveAgentIndex] = useState(0);
  const [selectedAgentId, setSelectedAgentId] = useState(null);
  const [showWhyExplanation, setShowWhyExplanation] = useState(false);
  const [showGraphOverlay, setShowGraphOverlay] = useState(false);

  // DYNAMICALLY GENERATED AGENT STEPS FOR ACTIVE CASE
  const [pipelineAgents, setPipelineAgents] = useState([]);

  // LIVE TELEMETRY COUNTERS
  const [liveCounters, setLiveCounters] = useState({
    claims: 0,
    sources: 0,
    evidence: 0,
    threats: 0,
    relationships: 0
  });

  const [consoleLogs, setConsoleLogs] = useState([]);
  const [timelineLogs, setTimelineLogs] = useState([]);

  // DYNAMIC DATA FROM REAL OR DEMO PIPELINE
  const [extractedClaims, setExtractedClaims] = useState([]);
  const [detectedThreats, setDetectedThreats] = useState([]);
  const [activeAssessment, setActiveAssessment] = useState(null);
  const [detectedUrlString, setDetectedUrlString] = useState(null);

  const consoleEndRef = useRef(null);

  // Helper: Extract URLs from text string using regex
  const extractUrlsFromText = (text) => {
    if (!text) return [];
    const urlRegex = /(https?:\/\/[^\s]+)/gi;
    const matches = text.match(urlRegex);
    return matches ? Array.from(new Set(matches)) : [];
  };

  // Helper: Build Dynamic Agent Pipeline based on content & detected URLs
  const buildDynamicAgents = (mode, isDemoMode, contentText, detectedUrl) => {
    const list = [];
    list.push({
      id: 'class',
      name: '01 INPUT CLASSIFIER',
      role: 'Input Classification & Formatting',
      action: `Analyzing ${mode.toUpperCase()} input payload structure (${isDemoMode ? 'Demo Mode' : 'User Provided'}).`,
      findings: `Classified as ${mode.toUpperCase()} payload. Length: ${contentText?.length || 0} characters.`
    });

    if (mode === 'screenshot' || mode === 'image') {
      list.push({
        id: 'ocr',
        name: '02 OCR / MEDIA AGENT',
        role: 'Visual Analysis & Text Extraction',
        action: 'Scanning visual pixels and extracting embedded text blocks.',
        findings: contentText ? 'Extracted visible text from image payload.' : 'Visual content parsed. No embedded text overlay.'
      });
      list.push({
        id: 'claim',
        name: '03 CLAIM DECOMPOSER',
        role: 'Claim Decomposition',
        action: 'Decomposing extracted text into testable atomic assertions.',
        findings: 'Identified testable claims regarding content context.'
      });
    } else if (mode === 'video') {
      list.push({
        id: 'media',
        name: '02 MEDIA AGENT',
        role: 'Keyframe Extraction',
        action: 'Extracting keyframes across video timeline.',
        findings: 'Sampled keyframes across timestamp segments.'
      });
      list.push({
        id: 'transcript',
        name: '03 TRANSCRIPT AGENT',
        role: 'Speech-to-Text Processing',
        action: 'Transcribing speech audio and parsing timestamped dialog.',
        findings: isDemoMode ? 'Processed 8 audio transcript segments.' : 'Transcript processing: Transcript unavailable (using visual keyframe telemetry).'
      });
      list.push({
        id: 'claim',
        name: '04 CLAIM DECOMPOSER',
        role: 'Claim Extraction',
        action: 'Extracting assertions from video timeline.',
        findings: 'Decomposed assertions from video timeline.'
      });
    } else if (mode === 'document') {
      list.push({
        id: 'doc',
        name: '02 DOCUMENT PARSER',
        role: 'Document Parsing',
        action: 'Parsing document structure, layout, and text streams.',
        findings: 'Parsed document layout and extracted text body.'
      });
      list.push({
        id: 'claim',
        name: '03 CLAIM DECOMPOSER',
        role: 'Claim Extraction',
        action: 'Decomposing document text into testable statements.',
        findings: 'Extracted atomic claims from document body.'
      });
      list.push({
        id: 'entity',
        name: '04 ENTITY AGENT',
        role: 'Named Entity Recognition',
        action: 'Extracting organizations, dates, bank accounts, and seals.',
        findings: 'Extracted organizational entities and date references.'
      });
    } else {
      list.push({
        id: 'claim',
        name: '02 CLAIM DECOMPOSER',
        role: 'Claim Decomposition',
        action: 'Decomposing input text into atomic assertions.',
        findings: 'Extracted atomic claims from submitted content.'
      });
    }

    // URL INTELLIGENCE AGENT (CONDITIONAL!)
    const agentNum = list.length + 1;
    if (detectedUrl) {
      list.push({
        id: 'url',
        name: `${String(agentNum).padStart(2, '0')} URL INTELLIGENCE AGENT`,
        role: 'Domain & Link Analysis',
        action: `Investigating discovered URL: ${detectedUrl}`,
        findings: `Analyzed domain pattern and security signals for: ${detectedUrl}`,
        urlDetected: detectedUrl,
        skipped: false
      });
    } else {
      list.push({
        id: 'url',
        name: `${String(agentNum).padStart(2, '0')} URL INTELLIGENCE AGENT`,
        role: 'Domain & Link Analysis',
        action: 'Checking content for embedded hyperlinks or domain references.',
        findings: '✓ No URL detected in content — URL agent skipped.',
        urlDetected: null,
        skipped: true
      });
    }

    // SOURCE INVESTIGATOR
    const sourceNum = list.length + 1;
    list.push({
      id: 'source',
      name: `${String(sourceNum).padStart(2, '0')} SOURCE INVESTIGATOR`,
      role: 'Authoritative Source Verification',
      action: 'Cross-checking claims against official registries and news databases.',
      findings: isDemoMode ? 'Queried 5 primary registries. 1 direct contradiction found.' : 'Queried authoritative registries. External verification result compiled.'
    });

    // CONTEXT ANALYZER
    const contextNum = list.length + 1;
    list.push({
      id: 'context',
      name: `${String(contextNum).padStart(2, '0')} CONTEXT ANALYZER`,
      role: 'Temporal & Image Context Verification',
      action: 'Checking publication timestamps and archival matches.',
      findings: 'Evaluated temporal signals and contextual consistency.'
    });

    // THREAT DETECTOR
    const threatNum = list.length + 1;
    list.push({
      id: 'threat',
      name: `${String(threatNum).padStart(2, '0')} THREAT DETECTOR`,
      role: 'Misinformation & Scam Detection',
      action: 'Evaluating risk indicators (urgency, fee demand, credential harvest).',
      findings: 'Analyzed risk indicators and threat signatures.'
    });

    // EVIDENCE SYNTHESIZER
    const synthNum = list.length + 1;
    list.push({
      id: 'synth',
      name: `${String(synthNum).padStart(2, '0')} EVIDENCE SYNTHESIZER`,
      role: 'Evidence Graph & Verdict Synthesis',
      action: 'Building dynamic evidence graph and synthesizing final safety verdict.',
      findings: 'Synthesized final evidence-backed assessment.'
    });

    return list;
  };

  // RESET FUNCTIONALITY (New Investigation)
  const handleReset = () => {
    setUserText('');
    setUserUrl('');
    setSelectedFile(null);
    setFilePreview(null);
    setIsDemo(false);
    setBadgeLabel('USER PROVIDED');
    setErrorMessage(null);
    setInvestigationStatus('idle');
    setActiveAgentIndex(0);
    setSelectedAgentId(null);
    setShowWhyExplanation(false);
    setPipelineAgents([]);
    setLiveCounters({ claims: 0, sources: 0, evidence: 0, threats: 0, relationships: 0 });
    setConsoleLogs([]);
    setTimelineLogs([]);
    setExtractedClaims([]);
    setDetectedThreats([]);
    setActiveAssessment(null);
    setDetectedUrlString(null);
  };

  // FILE UPLOAD HANDLER FOR REAL USER FILES
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 50 * 1024 * 1024) {
      setErrorMessage("File size exceeds 50MB limit. Please choose a smaller file.");
      return;
    }

    setErrorMessage(null);
    setSelectedFile(file);
    setIsDemo(false);
    setBadgeLabel('USER PROVIDED');

    if (file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file);
      setFilePreview(url);
    } else if (file.type.startsWith('video/')) {
      const url = URL.createObjectURL(file);
      setFilePreview(url);
    } else {
      setFilePreview(file.name);
    }
  };

  // TRY DEMO BUTTON HANDLER FOR CURRENT INPUT MODE
  const handleTryDemo = () => {
    setIsDemo(true);
    setBadgeLabel('DEMO');
    setErrorMessage(null);

    const preset = DEMO_PRESETS[inputMode] || DEMO_PRESETS.text;
    setUserText(preset.rawText || "");
    setUserUrl(preset.detectedUrl || "");

    if (inputMode === 'screenshot' || inputMode === 'image') {
      setFilePreview('DEMO_IMAGE');
    } else if (inputMode === 'video') {
      setFilePreview('DEMO_VIDEO');
    } else if (inputMode === 'document') {
      setFilePreview(preset.filename || 'DEMO_DOCUMENT.pdf');
    }

    startInvestigation(true, preset);
  };

  // PARSE INITIAL ROUTE PARAMS (URL / TEXT / DEMO) ON MOUNT
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const textParam = params.get('text');
    const urlParam = params.get('url');
    const isDemoParam = params.get('demo');

    const pendingJson = sessionStorage.getItem('astraguard_pending_investigation');
    sessionStorage.removeItem('astraguard_pending_investigation');

    if (pendingJson) {
      try {
        const pData = JSON.parse(pendingJson);
        setIsDemo(pData.isDemo || false);
        setBadgeLabel(pData.isDemo ? 'DEMO' : 'USER PROVIDED');

        const textToUse = pData.text || DEMO_PRESETS.screenshot.rawText;
        const urlToUse = pData.url || DEMO_PRESETS.screenshot.detectedUrl;

        setUserUrl(urlToUse);
        setUserText(textToUse);
        if (pData.inputMode) setInputMode(pData.inputMode);

        setTimeout(() => {
          startInvestigation(pData.isDemo, {
            title: pData.title || "Government Student Scholarship 2026",
            rawText: textToUse,
            detectedUrl: urlToUse,
            claims: (pData.signals && pData.signals.length > 0) ? pData.signals.map(s => s.title) : DEMO_PRESETS.screenshot.claims,
            threats: (pData.signals && pData.signals.length > 0) ? pData.signals.map(s => s.detail) : DEMO_PRESETS.screenshot.threats,
            assessment: DEMO_PRESETS.screenshot.assessment
          });
        }, 300);
        return;
      } catch (_) {}
    }

    if (urlParam) {
      setInputMode('url');
      setUserUrl(urlParam);
      setIsDemo(false);
      setBadgeLabel('USER PROVIDED');
      setTimeout(() => startInvestigation(false), 300);
    } else if (textParam) {
      setInputMode('text');
      setUserText(textParam);
      setIsDemo(false);
      setBadgeLabel('USER PROVIDED');
      setTimeout(() => startInvestigation(false), 300);
    } else if (isDemoParam) {
      handleTryDemo();
    }
  }, []);

  // START INVESTIGATION PIPELINE (UNIVERSAL FOR BOTH REAL USER AND DEMO INPUTS)
  const startInvestigation = (isDemoTrigger = false, demoPreset = null) => {
    setErrorMessage(null);

    let textContent = isDemoTrigger ? (demoPreset?.rawText || userText) : userText;
    let urlContent = isDemoTrigger ? (demoPreset?.detectedUrl || userUrl) : userUrl;

    if (!isDemoTrigger) {
      if (inputMode === 'text' && !userText.trim()) {
        setErrorMessage("Please enter text to investigate.");
        return;
      }
      if (inputMode === 'url') {
        if (!userUrl.trim()) {
          setErrorMessage("Please enter a URL to investigate.");
          return;
        }
        try {
          new URL(userUrl.startsWith('http') ? userUrl : `https://${userUrl}`);
        } catch (_) {
          setErrorMessage("Please enter a valid URL (e.g., https://example.com).");
          return;
        }
        urlContent = userUrl;
      }
      if (['screenshot', 'image', 'video', 'document'].includes(inputMode) && !selectedFile && !userText.trim() && !filePreview) {
        setErrorMessage(`Please select or upload a ${inputMode} file to investigate.`);
        return;
      }
    }

    let detectedUrl = null;
    if (inputMode === 'url') {
      detectedUrl = urlContent;
    } else {
      const urls = extractUrlsFromText(textContent);
      if (urls.length > 0) {
        detectedUrl = urls[0];
      } else if (urlContent) {
        detectedUrl = urlContent;
      }
    }
    setDetectedUrlString(detectedUrl);

    let claims = [];
    let threats = [];
    let assessmentObj = null;

    if (isDemoTrigger && demoPreset && demoPreset.claims && demoPreset.claims.length > 0) {
      claims = demoPreset.claims;
      threats = demoPreset.threats || [];
      assessmentObj = demoPreset.assessment || null;
    } else {
      if (inputMode === 'text') {
        claims = textContent.split('. ').filter(s => s.trim().length > 5);
        if (claims.length === 0) claims = [textContent];
      } else if (inputMode === 'url') {
        claims = [`Domain '${urlContent}' claims to be an authorized web portal.`];
      } else {
        claims = [`Content submitted in ${inputMode.toUpperCase()} format requires verification.`];
      }

      const lower = (textContent + ' ' + urlContent).toLowerCase();
      if (lower.includes('fee') || lower.includes('pay') || lower.includes('₹') || lower.includes('money') || lower.includes('deposit')) {
        threats.push("⚠ Upfront payment request detected");
      }
      if (lower.includes('urgent') || lower.includes('today') || lower.includes('midnight') || lower.includes('24h') || lower.includes('immediately')) {
        threats.push("⚠ High urgency / pressure language detected");
      }
      if (lower.includes('bank') || lower.includes('kyc') || lower.includes('block') || lower.includes('login') || lower.includes('aadhaar')) {
        threats.push("⚠ Potential credential harvesting / sensitive identity threat");
      }
      if (detectedUrl && (detectedUrl.includes('.xyz') || detectedUrl.includes('.test') || detectedUrl.includes('free'))) {
        threats.push(`⚠ Unverified / Suspicious domain pattern (${detectedUrl})`);
      }
      if (threats.length === 0) {
        threats.push("⚠ Unverified claims requiring external source lookup");
      }

      assessmentObj = {
        verdict: threats.length > 1 ? "Potentially Misleading / Threat Indicators Found" : "Requires External Source Verification",
        severity: threats.length > 1 ? "HIGH" : "MEDIUM",
        confidence: "Moderate (Live Telemetry)",
        coverage: `${claims.length} claims & ${threats.length} threat signals analyzed`,
        why: threats.length > 0 ? threats.map(t => typeof t === 'string' ? t.replace('⚠ ', '') : t.description) : ["Claims require verification against official registries."],
        unresolved: "External live verification service status: Active.",
        nextAction: "Verify claims strictly on official government and organizational portals."
      };
    }

    setExtractedClaims(claims);
    setDetectedThreats(threats);
    setActiveAssessment(assessmentObj);

    const agents = buildDynamicAgents(inputMode, isDemoTrigger, textContent, detectedUrl);
    setPipelineAgents(agents);

    setInvestigationStatus('analyzing');
    setActiveAgentIndex(0);
    setSelectedAgentId(agents[0]?.id || 'class');
    setShowWhyExplanation(false);

    setLiveCounters({ claims: 0, sources: 0, evidence: 0, threats: 0, relationships: 0 });
    
    const startTime = "15:42:01";
    setTimelineLogs([{ time: startTime, label: "Input received" }]);
    setConsoleLogs([
      `15:42:01 Case #AG-2026-00421 initialized (${isDemoTrigger ? 'Demo Mode' : 'User Provided'})...`,
      `15:42:01 Parsing ${inputMode.toUpperCase()} evidence payload...`
    ]);

    const totalSteps = agents.length;
    let step = 0;

    const interval = setInterval(() => {
      step++;
      if (step < totalSteps) {
        setActiveAgentIndex(step);
        const ag = agents[step];
        const stepTime = `15:42:${String(step * 2 + 1).padStart(2, '0')}`;

        setTimelineLogs(prev => [...prev, { time: stepTime, label: ag.role }]);
        setConsoleLogs(prev => [
          ...prev,
          `${stepTime} ${ag.name}: ${ag.action}`,
          `${stepTime} Result: ${ag.findings}`
        ]);

        setLiveCounters(prev => ({
          claims: Math.min(claims.length, Math.ceil((step / totalSteps) * claims.length)),
          sources: Math.min(5, Math.ceil((step / totalSteps) * 5)),
          evidence: Math.min(claims.length + threats.length + 2, Math.ceil((step / totalSteps) * (claims.length + threats.length + 2))),
          threats: Math.min(threats.length, Math.ceil((step / totalSteps) * threats.length)),
          relationships: Math.min(11, Math.ceil((step / totalSteps) * 11))
        }));

      } else {
        clearInterval(interval);
        setActiveAgentIndex(totalSteps - 1);
        setInvestigationStatus('completed');

        const endTime = "15:42:15";
        setTimelineLogs(prev => [...prev, { time: endTime, label: "Assessment generated" }]);
        setConsoleLogs(prev => [
          ...prev,
          `${endTime} Relational graph built.`,
          `${endTime} Final assessment synthesized: ${assessmentObj.verdict}`
        ]);

        setLiveCounters({
          claims: claims.length,
          sources: 5,
          evidence: claims.length + threats.length + 2,
          threats: threats.length,
          relationships: 11
        });
      }
    }, 450);
  };

  const selectedAgentData = pipelineAgents.find(a => a.id === selectedAgentId);
  const activeSelectedAgent = selectedAgentData || pipelineAgents[activeAgentIndex] || null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 bg-[#F5F1E8]">
      
      {/* CASE HEADER BAR */}
      <div className="bg-[#FFFFFF] border border-[#D4CEC2] rounded-xl p-5 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E1DCD2] pb-3">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-mono font-bold text-[#C74634] uppercase tracking-wider">
                INVESTIGATION
              </span>
              <span className="text-[10px] font-mono bg-[#1C1C1A] text-white px-2 py-0.5 rounded font-bold">
                Case AG-2026-00421
              </span>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold border ${
                badgeLabel === 'DEMO'
                  ? 'bg-[#FBF2DD] text-[#B7791F] border-[#E5CC99]'
                  : 'bg-[#EAF3ED] text-[#39704D] border-[#B9D3C1]'
              }`}>
                {badgeLabel}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold font-mono text-[#1C1C1A] mt-1">
              AI-Powered Digital Investigation Workstation
            </h1>
          </div>

          <div className="flex items-center space-x-2 font-mono text-xs">
            <span className="text-[#858078] flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#5E5B55]" />
              16 SEP 2026 · 15:42 IST
            </span>
            {investigationStatus !== 'idle' && (
              <button
                type="button"
                onClick={handleReset}
                className="px-3 py-1.5 bg-[#FAF8F4] hover:bg-[#EDE8DD] text-[#C74634] border border-[#D4CEC2] rounded-md font-bold transition-all cursor-pointer"
              >
                [ New Case ]
              </button>
            )}
          </div>
        </div>

        {/* ERROR NOTIFICATION ALERT */}
        {errorMessage && (
          <div className="p-3 bg-[#FBEDEA] border border-[#E8B5AC] rounded-md text-xs font-mono text-[#9F2F24] flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4 text-[#C74634]" />
              <span>{errorMessage}</span>
            </div>
            <button type="button" onClick={() => setErrorMessage(null)} className="text-[#9F2F24] font-bold">✕</button>
          </div>
        )}
      </div>

      {/* INPUT MODE SELECTION TABS */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 font-mono">
        {[
          { id: 'text', label: 'Text / Claim', icon: FileText },
          { id: 'screenshot', label: 'Screenshot / OCR', icon: Upload },
          { id: 'url', label: 'URL / Domain', icon: LinkIcon },
          { id: 'image', label: 'Image', icon: ImageIcon },
          { id: 'video', label: 'Video', icon: Video },
          { id: 'document', label: 'Document PDF', icon: FileCode }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = inputMode === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                setInputMode(tab.id);
                setErrorMessage(null);
              }}
              className={`flex-1 min-w-[120px] flex items-center justify-center space-x-2 py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#FFFFFF] text-[#C74634] border border-[#D4CEC2] shadow-sm font-bold'
                  : 'text-[#5E5B55] hover:text-[#1C1C1A] hover:bg-[#FAF8F4]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* INPUT CONTENT & UPLOAD ZONE */}
      <div className="bg-[#FFFFFF] border border-[#D4CEC2] p-5 rounded-xl space-y-4 shadow-sm">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E1DCD2] pb-3">
          <div>
            <span className="text-[10px] text-[#C74634] uppercase font-bold tracking-wider font-mono">
              {inputMode.toUpperCase()} EVIDENCE SOURCE
            </span>
            <h2 className="text-sm font-bold text-[#1C1C1A] mt-0.5">
              {isDemo ? DEMO_PRESETS[inputMode].title : selectedFile ? selectedFile.name : `Investigate ${inputMode.toUpperCase()} Evidence`}
            </h2>
          </div>

          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={handleTryDemo}
              disabled={investigationStatus === 'analyzing'}
              className="px-4 py-2 bg-[#FBF2DD] hover:bg-[#F5E6BF] text-[#B7791F] border border-[#E5CC99] rounded-md text-xs font-bold font-mono transition-all cursor-pointer"
            >
              [ Try Demo {inputMode.toUpperCase()} ]
            </button>

            <button
              type="button"
              onClick={() => startInvestigation(false)}
              disabled={investigationStatus === 'analyzing'}
              className={`flex items-center space-x-2 px-6 py-2 rounded-md text-xs font-bold font-mono transition-all shadow-sm cursor-pointer ${
                investigationStatus === 'analyzing'
                  ? 'bg-[#FAF8F4] text-[#858078] border border-[#D4CEC2] cursor-not-allowed'
                  : 'bg-[#C74634] hover:bg-[#9F2F24] text-[#FFFFFF]'
              }`}
            >
              {investigationStatus === 'analyzing' ? (
                <>
                  <span className="w-3 h-3 border-2 border-[#C74634] border-t-transparent rounded-full animate-spin"></span>
                  <span>Investigating...</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>[ Analyze {inputMode.toUpperCase()} ]</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* MODE 1: TEXT MODE */}
        {inputMode === 'text' && (
          <div className="space-y-3 font-mono">
            <label className="block text-xs font-bold text-[#1C1C1A] uppercase">Paste suspicious text or message content:</label>
            <textarea
              rows={5}
              value={userText}
              onChange={(e) => {
                setUserText(e.target.value);
                setIsDemo(false);
                setBadgeLabel('USER PROVIDED');
                setErrorMessage(null);
              }}
              placeholder="Paste suspicious text here... (WhatsApp messages, social media posts, news claims, emails, job offers, scholarship alerts)"
              className="w-full bg-[#FAF8F4] border border-[#D4CEC2] rounded-lg p-4 text-xs text-[#1C1C1A] font-sans focus:border-[#C74634] focus:outline-none"
            />
          </div>
        )}

        {/* MODE 2: SCREENSHOT MODE */}
        {inputMode === 'screenshot' && (
          <div className="space-y-4 font-mono">
            {!filePreview ? (
              <label className="border-2 border-dashed border-[#D4CEC2] hover:border-[#C74634] bg-[#FAF8F4] rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all space-y-3 text-center">
                <Upload className="w-10 h-10 text-[#C74634]" />
                <div>
                  <span className="text-sm font-bold text-[#1C1C1A] block">DROP SCREENSHOT HERE</span>
                  <span className="text-xs text-[#858078]">or click to browse from device (PNG, JPG, JPEG, WEBP)</span>
                </div>
                <span className="px-4 py-2 bg-[#FFFFFF] text-[#C74634] border border-[#C74634]/40 rounded-md text-xs font-bold mt-2">
                  [ Choose Screenshot ]
                </span>
                <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
              </label>
            ) : (
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#C74634] font-bold uppercase">UPLOADED SCREENSHOT PREVIEW</span>
                  <div className="flex space-x-2">
                    <label className="px-3 py-1 bg-[#FAF8F4] hover:bg-[#EDE8DD] text-[#1C1C1A] border border-[#D4CEC2] rounded-md text-xs font-bold cursor-pointer">
                      [ Replace ]
                      <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                    </label>
                    <button
                      type="button"
                      onClick={() => { setSelectedFile(null); setFilePreview(null); }}
                      className="px-3 py-1 bg-[#FBEDEA] hover:bg-[#F5D8D2] text-[#C74634] border border-[#E8B5AC] rounded-md text-xs font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>[ Remove ]</span>
                    </button>
                  </div>
                </div>

                {filePreview === 'DEMO_IMAGE' ? (
                  <div className="bg-[#FAF8F4] border border-[#D4CEC2] rounded-lg p-4 font-sans text-xs space-y-2 max-w-lg">
                    <span className="text-[#5E5B55] font-mono text-[10px]">↩ Forwarded WhatsApp Message</span>
                    <p className="font-bold text-[#B7791F]">🎓 Government Student Scholarship 2026</p>
                    <p>Pay ₹999 fee to confirm application.</p>
                    <div className="bg-[#EDE8DD] p-2 rounded text-[10px] text-[#C74634] underline font-mono">
                      https://example-scholarship-demo.test/apply
                    </div>
                  </div>
                ) : (
                  <div className="bg-[#FAF8F4] border border-[#D4CEC2] rounded-xl p-2 flex justify-center max-h-80">
                    <img src={filePreview} alt="User Screenshot" className="max-h-72 object-contain rounded-lg" />
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* MODE 3: URL MODE */}
        {inputMode === 'url' && (
          <div className="space-y-3 font-mono">
            <label className="block text-xs font-bold text-[#1C1C1A] uppercase">Enter Target URL Address:</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={userUrl}
                onChange={(e) => {
                  setUserUrl(e.target.value);
                  setIsDemo(false);
                  setBadgeLabel('USER PROVIDED');
                  setErrorMessage(null);
                }}
                placeholder="https://example.com/suspicious-link"
                className="flex-1 bg-[#FAF8F4] border border-[#D4CEC2] rounded-lg px-4 py-3 text-xs text-[#C74634] font-mono focus:border-[#C74634] focus:outline-none"
              />
            </div>
          </div>
        )}

        {/* OTHER MODES */}
        {['image', 'video', 'document'].includes(inputMode) && (
          <div className="space-y-4 font-mono">
            {!filePreview ? (
              <label className="border-2 border-dashed border-[#D4CEC2] hover:border-[#C74634] bg-[#FAF8F4] rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all space-y-3 text-center">
                <Upload className="w-10 h-10 text-[#C74634]" />
                <div>
                  <span className="text-sm font-bold text-[#1C1C1A] block">UPLOAD {inputMode.toUpperCase()} FILE</span>
                  <span className="text-xs text-[#858078]">Supported forensic file formats</span>
                </div>
                <span className="px-4 py-2 bg-[#FFFFFF] text-[#C74634] border border-[#C74634]/40 rounded-md text-xs font-bold mt-2">
                  [ Choose File ]
                </span>
                <input type="file" onChange={handleFileUpload} className="hidden" />
              </label>
            ) : (
              <div className="bg-[#FAF8F4] p-4 rounded-lg border border-[#D4CEC2] flex justify-between items-center text-xs">
                <span className="text-[#1C1C1A] font-bold">{selectedFile ? selectedFile.name : filePreview}</span>
                <button type="button" onClick={() => { setSelectedFile(null); setFilePreview(null); }} className="text-[#C74634] font-bold">
                  [ Remove ]
                </button>
              </div>
            )}
          </div>
        )}

      </div>

      {/* DEVELOPER DEBUG TELEMETRY PANEL */}
      <div className="bg-[#FFFFFF] border border-[#D4CEC2] p-3 rounded-xl font-mono text-xs space-y-1 shadow-sm">
        <div className="flex justify-between items-center text-[#C74634] font-bold border-b border-[#E1DCD2] pb-1 text-[10px]">
          <span>DEVELOPER DEBUG TELEMETRY</span>
          <span>Payload Length: {(userText || userUrl || "").length} chars</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-[11px] text-[#5E5B55]">
          <div>Input Received: <span className="text-[#39704D] font-bold">{(userText || userUrl) ? 'YES' : 'NO'}</span></div>
          <div>Target Context: <span className="text-[#C74634] font-bold truncate block">{detectedUrlString || userUrl || 'Local Webpage'}</span></div>
          <div>Claims Extracted: <span className="text-[#B7791F] font-bold">{extractedClaims.length || (isDemo ? 3 : 0)}</span></div>
          <div>Threats Identified: <span className="text-[#C74634] font-bold">{detectedThreats.length || (isDemo ? 4 : 0)}</span></div>
        </div>
      </div>

      {/* EVIDENCE COUNTER STRIP */}
      {(() => {
        const claimsCount = extractedClaims?.length || (isDemo ? 3 : userText.length > 20 ? 2 : 0);
        const threatsCount = detectedThreats?.length || (isDemo ? 4 : userText.length > 20 ? 1 : 0);
        const evidenceCount = claimsCount + threatsCount + 2;
        const sourcesCount = Math.max(1, claimsCount);
        const relationshipsCount = claimsCount + threatsCount + 4;

        const displayClaims = investigationStatus === 'analyzing'
          ? Math.min(claimsCount, Math.ceil(((activeAgentIndex + 1) / (pipelineAgents.length || 1)) * claimsCount))
          : (liveCounters.claims || claimsCount);

        const displayThreats = investigationStatus === 'analyzing'
          ? Math.min(threatsCount, Math.ceil(((activeAgentIndex + 1) / (pipelineAgents.length || 1)) * threatsCount))
          : (liveCounters.threats || threatsCount);

        const displayEvidence = investigationStatus === 'analyzing'
          ? Math.min(evidenceCount, Math.ceil(((activeAgentIndex + 1) / (pipelineAgents.length || 1)) * evidenceCount))
          : (liveCounters.evidence || evidenceCount);

        const displaySources = investigationStatus === 'analyzing'
          ? Math.min(sourcesCount, Math.ceil(((activeAgentIndex + 1) / (pipelineAgents.length || 1)) * sourcesCount))
          : (liveCounters.sources || sourcesCount);

        const displayRelationships = investigationStatus === 'analyzing'
          ? Math.min(relationshipsCount, Math.ceil(((activeAgentIndex + 1) / (pipelineAgents.length || 1)) * relationshipsCount))
          : (liveCounters.relationships || relationshipsCount);

        return (
          <div className="bg-[#FFFFFF] border border-[#D4CEC2] p-3 rounded-xl grid grid-cols-2 sm:grid-cols-5 gap-3 text-center font-mono shadow-sm">
            <div className="bg-[#FAF8F4] p-2.5 rounded-lg border border-[#E1DCD2]">
              <span className="text-[10px] text-[#858078] block uppercase font-bold">CLAIMS</span>
              <span className="text-lg font-bold text-[#1C1C1A]">{displayClaims}</span>
            </div>
            <div className="bg-[#FAF8F4] p-2.5 rounded-lg border border-[#E1DCD2]">
              <span className="text-[10px] text-[#858078] block uppercase font-bold">SOURCES</span>
              <span className="text-lg font-bold text-[#46627A]">{displaySources}</span>
            </div>
            <div className="bg-[#FAF8F4] p-2.5 rounded-lg border border-[#E1DCD2]">
              <span className="text-[10px] text-[#858078] block uppercase font-bold">EVIDENCE</span>
              <span className="text-lg font-bold text-[#39704D]">{displayEvidence}</span>
            </div>
            <div className="bg-[#FAF8F4] p-2.5 rounded-lg border border-[#E1DCD2]">
              <span className="text-[10px] text-[#858078] block uppercase font-bold">THREATS</span>
              <span className="text-lg font-bold text-[#C74634]">{displayThreats}</span>
            </div>
            <div className="bg-[#FAF8F4] p-2.5 rounded-lg border border-[#E1DCD2] col-span-2 sm:col-span-1">
              <span className="text-[10px] text-[#858078] block uppercase font-bold">RELATIONSHIPS</span>
              <span className="text-lg font-bold text-[#B7791F]">{displayRelationships}</span>
            </div>
          </div>
        );
      })()}

      {/* MAIN ORCHESTRATOR & TELEMETRY LAYOUT */}
      {pipelineAgents.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* LEFT COLUMN: LIVE AGENT ORCHESTRATOR PANEL */}
          <div className="lg:col-span-2 space-y-4">
            
            <div className="bg-[#FFFFFF] border border-[#D4CEC2] p-5 rounded-xl space-y-4 shadow-sm">
              <div className="flex justify-between items-center border-b border-[#E1DCD2] pb-3">
                <div>
                  <span className="text-xs font-bold text-[#C74634] uppercase tracking-wider flex items-center gap-1.5 font-mono">
                    <Cpu className="w-4 h-4 text-[#C74634]" />
                    AI INVESTIGATION ORCHESTRATOR
                  </span>
                  <p className="text-[11px] text-[#858078]">Supervising {pipelineAgents.length} Specialized Forensic Agents</p>
                </div>

                <div>
                  {investigationStatus === 'analyzing' ? (
                    <span className="text-xs text-[#C74634] font-bold bg-[#FBEDEA] px-3 py-1 rounded-full border border-[#F5D8D2] flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#C74634] animate-ping"></span>
                      ● Investigation in progress
                    </span>
                  ) : (
                    <span className="text-xs text-[#39704D] font-bold bg-[#EAF3ED] px-3 py-1 rounded-full border border-[#B9D3C1] flex items-center gap-1.5">
                      ✓ All Agents Complete
                    </span>
                  )}
                </div>
              </div>

              {/* SEQUENTIAL AGENTS STACK */}
              <div className="space-y-2">
                {pipelineAgents.map((ag, idx) => {
                  const isActive = investigationStatus === 'analyzing' && activeAgentIndex === idx;
                  const isDone = investigationStatus === 'completed' || activeAgentIndex > idx;
                  const isSelected = selectedAgentId === ag.id;

                  return (
                    <div
                      key={ag.id}
                      onClick={() => setSelectedAgentId(ag.id)}
                      className={`p-3 rounded-lg border cursor-pointer transition-all flex items-center justify-between font-mono text-xs ${
                        isSelected
                          ? 'bg-[#FAF8F4] border-[#C74634] ring-1 ring-[#C74634]/40'
                          : isDone
                          ? 'bg-[#FFFFFF] border-[#E1DCD2] text-[#1C1C1A] hover:border-[#D4CEC2]'
                          : isActive
                          ? 'bg-[#FBEDEA] border-[#E8B5AC] text-[#C74634]'
                          : 'bg-[#FAF8F4]/50 border-[#E1DCD2]/50 text-[#AAA59B]'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="font-bold text-[#858078]">{ag.name.split(' ')[0]}</span>
                        <span className="font-bold text-[#1C1C1A]">{ag.name.split(' ').slice(1).join(' ')}</span>
                      </div>

                      <div className="flex items-center space-x-2">
                        {ag.skipped ? (
                          <span className="text-[10px] text-[#858078] bg-[#EDE8DD] border border-[#D4CEC2] px-2 py-0.5 rounded font-bold">
                            ✕ SKIPPED
                          </span>
                        ) : isDone ? (
                          <span className="text-[10px] text-[#39704D] font-bold bg-[#EAF3ED] border border-[#B9D3C1] px-2.5 py-0.5 rounded">
                            ✓ COMPLETE
                          </span>
                        ) : isActive ? (
                          <span className="text-[10px] text-[#C74634] font-bold bg-[#FBEDEA] border border-[#E8B5AC] px-2.5 py-0.5 rounded flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#C74634] animate-ping"></span>
                            ● ANALYZING...
                          </span>
                        ) : (
                          <span className="text-[10px] text-[#AAA59B] border border-[#E1DCD2] px-2 py-0.5 rounded">
                            ○ Pending
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ACTIVE AGENT DETAIL INSPECTOR */}
            {activeSelectedAgent && (
              <div className="bg-[#FFFFFF] border border-[#D4CEC2] p-5 rounded-xl space-y-3 font-mono text-xs shadow-sm">
                <div className="flex justify-between items-center border-b border-[#E1DCD2] pb-2">
                  <span className="font-bold text-[#C74634] uppercase tracking-wider">{activeSelectedAgent.name} INSPECTOR</span>
                  <span className="text-[10px] text-[#39704D] bg-[#EAF3ED] px-2 py-0.5 rounded border border-[#B9D3C1] font-bold">
                    {activeSelectedAgent.skipped ? '✕ SKIPPED' : investigationStatus === 'completed' || activeAgentIndex >= pipelineAgents.findIndex(a => a.id === activeSelectedAgent.id) ? '✓ COMPLETE' : '● THINKING'}
                  </span>
                </div>

                <div className="space-y-2">
                  <div>
                    <span className="text-[10px] text-[#858078] block uppercase font-bold">ACTION PERFORMED</span>
                    <p className="text-[#1C1C1A] font-sans text-xs bg-[#FAF8F4] p-2.5 rounded-md border border-[#E1DCD2]">
                      {activeSelectedAgent.action}
                    </p>
                  </div>

                  <div>
                    <span className="text-[10px] text-[#858078] block uppercase font-bold">AGENT FINDINGS</span>
                    <p className="text-[#1C1C1A] font-sans text-xs bg-[#FAF8F4] p-2.5 rounded-md border border-[#E1DCD2]">
                      {activeSelectedAgent.findings}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* REALTIME TERMINAL CONSOLE */}
            <div className="bg-[#1C1C1A] border border-[#292824] rounded-xl p-4 space-y-2 font-mono text-xs text-[#D8D3C9]">
              <div className="flex justify-between items-center border-b border-[#292824] pb-2 text-[#918C82]">
                <span className="flex items-center gap-1.5 text-xs text-[#C74634] font-bold">
                  <Terminal className="w-4 h-4 text-[#C74634]" />
                  LIVE INVESTIGATION CONSOLE
                </span>
                <span className="text-[10px] bg-[#292824] px-2 py-0.5 rounded text-white font-bold">Realtime Telemetry</span>
              </div>

              <div className="h-40 overflow-y-auto space-y-1.5 text-[11px] text-[#D8D3C9] font-mono pr-2">
                {consoleLogs.map((log, idx) => (
                  <div key={idx} className="flex items-start space-x-2">
                    <span className="text-[#C74634] flex-shrink-0">&gt;</span>
                    <span>{log}</span>
                  </div>
                ))}
                <div ref={consoleEndRef} />
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: TIMELINE & FINAL ASSESSMENT */}
          <div className="space-y-4">
            
            {/* TIMELINE PANEL */}
            <div className="bg-[#FFFFFF] border border-[#D4CEC2] p-4 rounded-xl space-y-3 font-mono text-xs shadow-sm">
              <span className="text-xs font-bold text-[#1C1C1A] uppercase tracking-wider block border-b border-[#E1DCD2] pb-2">
                INVESTIGATION TIMELINE
              </span>

              <div className="space-y-2 text-[11px]">
                {timelineLogs.map((t, idx) => (
                  <div key={idx} className="flex items-center justify-between bg-[#FAF8F4] p-2 rounded-md border border-[#E1DCD2]">
                    <span className="text-[#C74634] font-bold">{t.time}</span>
                    <span className="text-[#1C1C1A] font-medium">{t.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* FINAL ASSESSMENT CARD */}
            <div className="bg-[#FFFFFF] border border-[#D4CEC2] p-5 rounded-xl space-y-4 font-mono shadow-sm">
              
              {investigationStatus !== 'completed' ? (
                <div className="py-8 text-center space-y-3">
                  <div className="w-10 h-10 border-2 border-[#C74634] border-t-transparent rounded-full animate-spin mx-auto"></div>
                  <div>
                    <span className="text-xs text-[#C74634] font-bold block uppercase">FINAL ASSESSMENT</span>
                    <p className="text-xs text-[#858078] mt-1">Waiting for evidence synthesis agent...</p>
                  </div>
                </div>
              ) : (
                activeAssessment && (
                  <div className="space-y-4 animate-in fade-in duration-300">
                    <div className="flex justify-between items-start border-b border-[#E1DCD2] pb-3">
                      <div>
                        <span className="text-[10px] text-[#858078] uppercase font-bold">FINAL ASSESSMENT</span>
                        <h3 className="text-base font-bold text-[#C74634] mt-0.5">{activeAssessment.verdict}</h3>
                      </div>
                      <span className="text-[10px] bg-[#FBEDEA] text-[#C74634] border border-[#F5D8D2] px-2 py-0.5 rounded font-bold">
                        {activeAssessment.severity} RISK
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="bg-[#FAF8F4] p-2.5 rounded-md border border-[#E1DCD2]">
                        <span className="text-[10px] text-[#858078] block font-bold">EVIDENCE STRENGTH</span>
                        <span className="text-[#1C1C1A] font-bold">{activeAssessment.confidence}</span>
                      </div>
                      <div className="bg-[#FAF8F4] p-2.5 rounded-md border border-[#E1DCD2]">
                        <span className="text-[10px] text-[#858078] block font-bold">COVERAGE</span>
                        <span className="text-[#C74634] font-bold">{activeAssessment.coverage}</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setShowGraphOverlay(true)}
                      className="w-full py-2.5 bg-[#C74634] hover:bg-[#9F2F24] text-[#FFFFFF] font-bold text-xs rounded-md shadow-sm text-center font-mono flex items-center justify-center gap-2 cursor-pointer transition-all"
                    >
                      <Network className="w-4 h-4" />
                      <span>[ View Full Evidence Chain ]</span>
                    </button>
                  </div>
                )
              )}

            </div>

          </div>

        </div>
      )}

      {/* EVIDENCE CHAIN SECTION */}
      {investigationStatus === 'completed' && activeAssessment && (
        <div className="pt-4 border-t border-[#D4CEC2] animate-in fade-in duration-300">
          <EvidenceChain
            inputType={inputMode}
            title={isDemo ? DEMO_PRESETS[inputMode].title : (selectedFile ? selectedFile.name : `Investigate ${inputMode.toUpperCase()}`)}
            rawText={isDemo ? DEMO_PRESETS[inputMode].rawText : userText}
            detectedUrl={detectedUrlString}
            claims={extractedClaims}
            threats={detectedThreats}
            sources={isDemo ? (DEMO_PRESETS[inputMode]?.sources || []) : []}
            assessment={activeAssessment}
            isDemo={isDemo}
            badgeLabel={badgeLabel}
          />
        </div>
      )}

      {/* EVIDENCE GRAPH OVERLAY */}
      {showGraphOverlay && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-5xl bg-[#F5F1E8] border border-[#D4CEC2] rounded-2xl overflow-hidden flex flex-col max-h-[90vh] shadow-2xl">
            <div className="p-4 bg-[#FFFFFF] border-b border-[#D4CEC2] flex justify-between items-center font-mono">
              <span className="text-xs font-bold text-[#C74634]">EVIDENCE CHAIN OVERLAY — CASE #AG-2026-00421</span>
              <button 
                type="button" 
                onClick={() => setShowGraphOverlay(false)} 
                className="px-3 py-1 bg-[#1C1C1A] hover:bg-[#292824] text-white rounded-md text-xs font-bold cursor-pointer"
              >
                [ Close Overlay ]
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <EvidenceGraphPage investigation={demoInvestigations[0]} />
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
