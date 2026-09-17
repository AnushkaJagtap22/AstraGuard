import React, { useState } from 'react';
import { 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle2, 
  RefreshCw, 
  Clock, 
  DollarSign, 
  FileText, 
  Lock,
  Building2,
  Briefcase,
  ChevronRight,
  HelpCircle,
  Mail
} from 'lucide-react';

export const DEMO_SCENARIOS = {
  scholarship: {
    id: 'scholarship',
    title: 'National Student Scholarship Portal 2026',
    category: 'Educational Grant Application',
    authorityClaim: 'National Student Scholarship Portal Desk',
    urgencyText: 'TODAY — 11:59 PM',
    feeText: 'Refundable verification fee: ₹999',
    grantText: 'Eligible students can receive financial assistance of up to ₹50,000.',
    extraText: [
      'To complete your application, a refundable verification fee of ₹999 is required.',
      'Your application may be cancelled if payment is not completed before the deadline.',
      'Students are requested to forward this opportunity to friends and classmates.',
      'Submit your Aadhaar-linked identity information to complete verification.'
    ],
    ctaText: 'COMPLETE APPLICATION NOW',
    detectedSignals: [
      { id: 'sig1', title: '⚠ Upfront payment request', level: 'HIGH', detail: '₹999 verification fee requested before grant approval.' },
      { id: 'sig2', title: '⚠ Urgency pressure', level: 'HIGH', detail: 'Deadline enforced: "TODAY — 11:59 PM".' },
      { id: 'sig3', title: '⚠ Unverified authority claim', level: 'HIGH', detail: 'Presents itself as official student scholarship service.' },
      { id: 'sig4', title: '⚠ Sensitive information context', level: 'MEDIUM', detail: 'Application form requests Aadhaar identity details.' },
      { id: 'sig5', title: '⚠ Pressure language', level: 'MEDIUM', detail: 'Warns application may be cancelled and urges viral sharing.' }
    ]
  },
  job: {
    id: 'job',
    title: 'TechCorp International — Remote Data Entry Specialist',
    category: 'Employment Opportunity Simulation',
    authorityClaim: 'TechCorp HR Global Recruitment Desk',
    urgencyText: 'Immediate joiners required within 2 hours.',
    feeText: 'Equipment Security Deposit & Onboarding Fee: ₹1,499',
    grantText: 'Guaranteed monthly salary of ₹80,000 with flexible 2-hour daily work shift.',
    extraText: [
      'No prior experience required for instant selection.',
      'Contact Recruitment Nodal Officer via Telegram @TechCorp_Jobs_Official.',
      'Pay ₹1,499 laptop security deposit to receive company MacBook.',
      'Failure to pay within 1 hour will result in cancellation of offer letter.'
    ],
    ctaText: 'ACCEPT OFFER & PAY ONBOARDING FEE',
    detectedSignals: [
      { id: 'sig1', title: '⚠ Unrealistic Compensation', level: 'HIGH', detail: 'Promises ₹80,000/month without qualification checks.' },
      { id: 'sig2', title: '⚠ Upfront Equipment Deposit', level: 'HIGH', detail: 'Demands ₹1,499 payment prior to job contract.' },
      { id: 'sig3', title: '⚠ Off-Platform Messaging Redirect', level: 'HIGH', detail: 'Directs candidate to Telegram (@TechCorp_Jobs_Official).' }
    ]
  },
  kyc: {
    id: 'kyc',
    title: 'SBI Urgent Bank Account Block Alert',
    category: 'Financial Phishing / Credential Harvest',
    authorityClaim: 'State Bank Nodal Cyber Security Desk',
    urgencyText: 'Account will be PERMANENTLY BLOCKED within 2 hours.',
    feeText: 'Mandatory Online Re-KYC Verification',
    grantText: 'Immediate account access restoration upon submitting credentials.',
    extraText: [
      'Dear customer, your bank account has been flagged due to unverified regulatory KYC.',
      'Click link to update your NetBanking User ID, Password, and Card OTP.',
      'Failure to complete KYC before 11:00 PM will freeze all active funds.'
    ],
    ctaText: 'VERIFY KYC & RESTORE BANK ACCESS NOW',
    detectedSignals: [
      { id: 'sig1', title: '⚠ Account Freeze Threat', level: 'HIGH', detail: 'Threatens 2-hour account suspension.' },
      { id: 'sig2', title: '⚠ Sensitive Credential Harvest', level: 'HIGH', detail: 'Solicits NetBanking User ID, Password, and OTP.' }
    ]
  }
};

export default function DemoPage({ onNavigateToInvestigate }) {
  const [selectedScenarioId, setSelectedScenarioId] = useState('scholarship');
  const [resetMessage, setResetMessage] = useState(null);

  const scenario = DEMO_SCENARIOS[selectedScenarioId] || DEMO_SCENARIOS.scholarship;

  const handleResetDemo = () => {
    try {
      localStorage.removeItem('astraguard_current_case');
      localStorage.removeItem('astraguard_demo_state');
    } catch (_) {}

    setResetMessage('Demo state reset cleanly. Extension and workstation ready for clean run!');
    setTimeout(() => setResetMessage(null), 3000);
  };

  const handleLaunchInvestigation = () => {
    const targetUrl = window.location.href;
    const contentText = `${scenario.title}\n${scenario.authorityClaim}\n${scenario.urgencyText}\n${scenario.feeText}\n${scenario.grantText}\n${scenario.extraText.join('\n')}`;
    
    if (onNavigateToInvestigate) {
      onNavigateToInvestigate('text', contentText, 'scholarship', targetUrl);
    } else {
      window.location.href = `/investigate?demo=1&scenario=${selectedScenarioId}`;
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F1E8] text-[#1C1C1A] font-sans">
      
      {/* MANDATORY PROMINENT DEMO BANNER */}
      <div className="bg-[#B7791F] text-white py-2.5 px-4 font-mono font-bold text-center text-xs tracking-wider border-b border-[#9F2F24] flex flex-col sm:flex-row items-center justify-center gap-2 shadow-subtle">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 flex-shrink-0 text-white" />
          <span className="uppercase text-sm">ASTRAGUARD DEMO — SIMULATED SECURITY TEST</span>
        </div>
        <span className="hidden sm:inline">•</span>
        <span className="text-[11px] bg-[#1C1C1A]/20 px-2 py-0.5 rounded font-bold text-white">
          SAFE ENVIRONMENT • DO NOT ENTER REAL SENSITIVE DATA
        </span>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
        
        {/* SCENARIO SWITCHER STRIP */}
        <div className="bg-[#FFFFFF] border border-[#D4CEC2] p-3 rounded-2xl flex flex-wrap items-center justify-between gap-2 font-mono text-xs shadow-subtle">
          <div className="flex items-center space-x-2">
            <span className="text-[#858078] font-bold uppercase text-[10px] tracking-wider">DEMO SCENARIOS:</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              { id: 'scholarship', label: '1. National Scholarship Portal 2026', icon: FileText },
              { id: 'job', label: '2. Remote Job Offer', icon: Briefcase },
              { id: 'kyc', label: '3. SBI KYC Account Alert', icon: Building2 }
            ].map((sc) => {
              const Icon = sc.icon;
              const isActive = selectedScenarioId === sc.id;
              return (
                <button
                  key={sc.id}
                  type="button"
                  onClick={() => setSelectedScenarioId(sc.id)}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl font-bold transition-all text-xs cursor-pointer ${
                    isActive
                      ? 'bg-[#C74634] text-white shadow-subtle'
                      : 'bg-[#FAF8F4] text-[#5E5B55] hover:text-[#1C1C1A] border border-[#D4CEC2]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{sc.label}</span>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={handleResetDemo}
            className="flex items-center space-x-1.5 px-3 py-1.5 bg-[#FAF8F4] hover:bg-[#FBEDEA] text-[#B7791F] hover:text-[#C74634] border border-[#D4CEC2] rounded-xl font-bold transition-all text-xs cursor-pointer"
            title="Reset demo state & extension caches"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>[ Reset Demo ]</span>
          </button>
        </div>

        {/* RESET NOTIFICATION ALERT */}
        {resetMessage && (
          <div className="bg-[#EAF3ED] border border-[#B9D3C1] p-3 rounded-xl text-xs text-[#39704D] font-mono flex items-center justify-between animate-in fade-in duration-200">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-[#39704D]" />
              <span>{resetMessage}</span>
            </div>
            <button onClick={() => setResetMessage(null)} className="text-[#858078] hover:text-[#1C1C1A]">✕</button>
          </div>
        )}

        {/* SIMULATED WEBPAGE CONTENT CARD */}
        <div className="bg-[#FFFFFF] border-2 border-[#D4CEC2] rounded-3xl overflow-hidden shadow-subtle space-y-0">
          
          {/* FAKE BROWSER CHROME TOP BAR */}
          <div className="bg-[#FAF8F4] border-b border-[#D4CEC2] px-4 py-2.5 flex items-center justify-between font-mono text-xs">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-[#C74634] inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-[#B7791F] inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-[#39704D] inline-block"></span>
              <span className="text-[#858078] ml-2">SIMULATED BROWSER CONTEXT</span>
            </div>

            <div className="bg-[#FFFFFF] border border-[#D4CEC2] px-4 py-1 rounded-full text-[#1C1C1A] text-[11px] font-mono flex items-center space-x-2 max-w-md truncate">
              <Lock className="w-3 h-3 text-[#B7791F] flex-shrink-0" />
              <span className="text-[#B7791F] font-bold">http://localhost:5176/demo/scholarship</span>
            </div>

            <div className="text-[10px] text-[#B7791F] font-bold bg-[#FBF2DD] border border-[#E5CC99] px-2.5 py-0.5 rounded">
              SIMULATED PORTAL
            </div>
          </div>

          {/* PAGE HERO HEADER */}
          <div className="bg-[#1C1C1A] p-8 border-b border-[#D4CEC2] text-center space-y-3">
            <div className="inline-flex items-center space-x-2 bg-[#FAF8F4]/10 border border-[#D4CEC2]/30 px-3 py-1 rounded-full text-[#F5D8D2] text-xs font-mono font-bold">
              <AlertTriangle className="w-4 h-4 text-[#C74634]" />
              <span>{scenario.category}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-sans tracking-tight">
              {scenario.title}
            </h1>

            <p className="text-sm text-[#F5D8D2] font-mono font-semibold max-w-2xl mx-auto">
              {scenario.authorityClaim}
            </p>
          </div>

          {/* MAIN SIMULATED OFFER CONTENT */}
          <div className="p-6 sm:p-10 space-y-6 font-sans">
            
            {/* URGENCY & FEE CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#FBEDEA] border border-[#F5D8D2] p-5 rounded-2xl flex items-start space-x-4">
                <div className="p-3 bg-[#C74634]/10 rounded-xl text-[#C74634] flex-shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-mono font-bold text-[#C74634] uppercase tracking-wider block">APPLICATION DEADLINE</span>
                  <h3 className="text-base font-bold text-[#1C1C1A] mt-0.5">{scenario.urgencyText}</h3>
                </div>
              </div>

              <div className="bg-[#FBF2DD] border border-[#E5CC99] p-5 rounded-2xl flex items-start space-x-4">
                <div className="p-3 bg-[#B7791F]/10 rounded-xl text-[#B7791F] flex-shrink-0">
                  <DollarSign className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-mono font-bold text-[#B7791F] uppercase tracking-wider block">VERIFICATION FEE</span>
                  <h3 className="text-base font-bold text-[#1C1C1A] mt-0.5">{scenario.feeText}</h3>
                </div>
              </div>
            </div>

            {/* BENEFIT HIGHLIGHT */}
            <div className="bg-[#FAF8F4] border border-[#D4CEC2] p-6 rounded-2xl space-y-3">
              <h3 className="text-base font-bold text-[#1C1C1A] font-mono flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#39704D]" />
                GRANT ASSISTANCE OVERVIEW
              </h3>
              <p className="text-base font-medium text-[#1C1C1A] leading-relaxed">
                {scenario.grantText}
              </p>
            </div>

            {/* ADDITIONAL SIMULATED CLAIMS */}
            <div className="bg-[#FAF8F4] border border-[#D4CEC2] p-6 rounded-2xl space-y-3 font-mono text-xs">
              <span className="text-[#5E5B55] font-bold uppercase tracking-wider block border-b border-[#E1DCD2] pb-2">
                APPLICATION GUIDELINES & REQUIREMENT NOTICE:
              </span>
              <ul className="space-y-2.5 text-[#1C1C1A]">
                {scenario.extraText.map((line, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <ChevronRight className="w-4 h-4 text-[#B7791F] flex-shrink-0 mt-0.5" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* FICTIONAL APPLICATION FORM */}
            <div className="bg-[#FAF8F4] border border-[#D4CEC2] p-6 rounded-2xl space-y-4 font-mono">
              <h4 className="text-sm font-bold text-[#1C1C1A] uppercase tracking-wider border-b border-[#E1DCD2] pb-2">
                STUDENT REGISTRATION FORM (SIMULATION)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="text-[#5E5B55] block mb-1">Student Full Name</label>
                  <input type="text" readOnly value="Simulated Applicant" className="w-full bg-[#FFFFFF] border border-[#D4CEC2] px-3 py-2 rounded text-[#1C1C1A]" />
                </div>
                <div>
                  <label className="text-[#5E5B55] block mb-1">Aadhaar Reference ID</label>
                  <input type="text" readOnly value="XXXX-XXXX-9012" className="w-full bg-[#FFFFFF] border border-[#D4CEC2] px-3 py-2 rounded text-[#1C1C1A]" />
                </div>
              </div>
            </div>

            {/* CALL TO ACTION BUTTON */}
            <div className="pt-2 text-center space-y-3">
              <button
                type="button"
                onClick={handleLaunchInvestigation}
                className="w-full sm:w-auto px-8 py-4 bg-[#C74634] hover:bg-[#9F2F24] text-white font-extrabold text-sm rounded-2xl shadow-subtle transition-all font-mono tracking-wider cursor-pointer"
              >
                [ {scenario.ctaText} ]
              </button>

              <div className="text-xs text-[#858078] font-mono">
                Applicant Reference ID: <span className="text-[#1C1C1A] font-bold">DEMO-2026-001</span> (Simulated data only)
              </div>
            </div>

            {/* SUPPORT & FAQ FOOTER */}
            <div className="border-t border-[#D4CEC2] pt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono text-[#5E5B55]">
              <div className="flex items-center space-x-2">
                <HelpCircle className="w-4 h-4 text-[#C74634]" />
                <span>Need assistance? Contact Support Team.</span>
              </div>
              <div className="flex items-center space-x-2 sm:justify-end">
                <Mail className="w-4 h-4 text-[#C74634]" />
                <span>support-help@scholarship-demo.test</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
