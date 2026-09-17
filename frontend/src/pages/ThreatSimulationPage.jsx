import React, { useState } from 'react';
import { 
  GraduationCap, 
  Briefcase, 
  Package, 
  ShieldAlert, 
  Building2, 
  Award, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  ShieldCheck, 
  ChevronDown, 
  ChevronUp, 
  Share2,
  Lock,
  ArrowRight,
  Search,
  MapPin,
  CreditCard,
  UserCheck,
  PhoneCall,
  Mail,
  ExternalLink
} from 'lucide-react';

export default function ThreatSimulationPage() {
  const pathname = window.location.pathname;

  // Determine scenario type from pathname URL
  let scenarioType = 'scholarship';
  if (pathname.includes('/job-offer')) scenarioType = 'job';
  else if (pathname.includes('/parcel')) scenarioType = 'parcel';
  else if (pathname.includes('/bank-alert')) scenarioType = 'bank';
  else if (pathname.includes('/admission')) scenarioType = 'admission';

  const [openFaq, setOpenFaq] = useState(null);
  const [formData, setFormData] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const toggleFaq = (idx) => setOpenFaq(openFaq === idx ? null : idx);
  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = (e) => { e.preventDefault(); setIsSubmitted(true); };

  // =========================================================================
  // SCENARIO 1: SCHOLARSHIP PORTAL (ScholarConnect)
  // =========================================================================
  if (scenarioType === 'scholarship') {
    return (
      <div className="min-h-screen bg-white text-slate-800 font-sans selection:bg-blue-100 selection:text-blue-900">
        <div className="bg-slate-900 text-slate-300 text-[11px] font-mono py-1 px-4 text-center border-b border-slate-800 flex items-center justify-center space-x-2">
          <span>Demo environment — fictional website for security testing.</span>
        </div>

        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 px-6 py-4 shadow-sm">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xl font-bold text-slate-900 tracking-tight block leading-none">ScholarConnect<span className="text-blue-600">.in</span></span>
                <span className="text-[10px] font-medium text-slate-500 tracking-wider uppercase block mt-0.5">National Student Grant Portal</span>
              </div>
            </div>

            <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-600">
              <a href="#home" className="hover:text-blue-600">Home</a>
              <a href="#eligibility" className="hover:text-blue-600">Eligibility</a>
              <a href="#how-it-works" className="hover:text-blue-600">Guidelines</a>
              <a href="#apply" className="hover:text-blue-600">Application Form</a>
            </nav>

            <a href="#apply" className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-lg shadow-md shadow-blue-600/20 transition-all flex items-center space-x-2">
              <span>Apply Now</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </header>

        <section className="bg-gradient-to-b from-blue-50/80 via-indigo-50/30 to-white py-16 px-6 border-b border-slate-100">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center space-x-2 bg-blue-100/80 border border-blue-200 px-3.5 py-1.5 rounded-full text-blue-700 text-xs font-semibold">
                <Award className="w-4 h-4 text-blue-600" />
                <span>National Student Scholarship Scheme 2026</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Higher Education Financial Assistance for Students
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                ScholarConnect provides merit and need-based educational grants of up to <strong className="text-slate-900 font-semibold">₹50,000</strong> to eligible college and university students enrolled in recognized institutions across India.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a href="#apply" className="px-7 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-base rounded-xl shadow-lg shadow-blue-600/25 transition-all">
                  Apply for Scholarship 2026
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6 relative overflow-hidden">
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-amber-800 uppercase tracking-wider block">APPLICATION DEADLINE</span>
                    <p className="text-sm font-extrabold text-amber-950 mt-0.5">TODAY — 11:59 PM</p>
                    <p className="text-xs text-amber-700 mt-1">Applications submitted after the deadline may not be considered.</p>
                  </div>
                </div>

                <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-4 space-y-2">
                  <div className="flex items-center space-x-2 text-blue-900 font-bold text-sm">
                    <ShieldCheck className="w-4 h-4 text-blue-600" />
                    <span>Scholarship Verification Notice</span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed font-normal">
                    To complete your application, a refundable verification fee of ₹999 is required before your scholarship application can be processed. Your application will remain incomplete until payment has been successfully verified.
                  </p>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-xl p-3.5 flex items-start space-x-2.5">
                  <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-red-900 font-semibold leading-snug">
                    IMPORTANT: Complete verification immediately to avoid cancellation of your application.
                  </p>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-600 flex items-center space-x-2">
                  <Share2 className="w-4 h-4 text-slate-500 flex-shrink-0" />
                  <span>Share this scholarship opportunity with 5 students to unlock priority processing.</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="apply" className="py-16 px-6 bg-slate-50 border-y border-slate-200">
          <div className="max-w-3xl mx-auto bg-white border border-slate-200 rounded-3xl p-8 sm:p-10 shadow-xl space-y-6">
            <h3 className="text-xl font-extrabold text-slate-900">Student Verification & Registration Form</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input type="text" name="name" required placeholder="Full Name" className="bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm" />
                <input type="text" name="aadhaar" required placeholder="Aadhaar Reference ID" className="bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm" />
              </div>
              <button type="submit" className="w-full py-4 bg-blue-600 text-white font-bold text-base rounded-xl shadow-lg">
                Submit Application & Pay Verification Fee ₹999
              </button>
            </form>
          </div>
        </section>

        <footer className="bg-slate-900 text-slate-400 py-8 px-6 text-xs text-center border-t border-slate-800">
          <p>© 2026 ScholarConnect India. Fictional demonstration website created for security testing.</p>
        </footer>
      </div>
    );
  }

  // =========================================================================
  // SCENARIO 2: JOB OFFER PORTAL (CareerBridge)
  // =========================================================================
  if (scenarioType === 'job') {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-teal-100 selection:text-teal-900">
        <div className="bg-slate-900 text-slate-300 text-[11px] font-mono py-1 px-4 text-center border-b border-slate-800 flex items-center justify-center space-x-2">
          <span>Demo environment — fictional website for security testing.</span>
        </div>

        <header className="sticky top-0 z-30 bg-slate-900 text-white px-6 py-4 border-b border-slate-800">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-teal-500 flex items-center justify-center text-slate-950 font-bold shadow-md">
                <Briefcase className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight block leading-none">CareerBridge<span className="text-teal-400">.jobs</span></span>
                <span className="text-[10px] font-medium text-slate-400 tracking-wider uppercase block mt-0.5">Global Talent Recruitment Portal</span>
              </div>
            </div>
            <div className="hidden sm:flex items-center space-x-6 text-xs font-mono">
              <span>ACTIVE OPENINGS: 1,420</span>
              <span className="text-teal-400">REMOTE SPECIALIST PROGRAM</span>
            </div>
          </div>
        </header>

        <section className="py-12 px-6 max-w-7xl mx-auto space-y-8">
          <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-xl space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-6">
              <div>
                <span className="text-xs font-bold text-teal-600 uppercase tracking-wider block mb-1">URGENT HIRING • IMMEDIATE JOINING</span>
                <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900">Remote Data Entry & Document Specialist</h1>
                <p className="text-sm text-slate-600 mt-1">TechCorp International Recruiting Nodal Office</p>
              </div>
              <div className="bg-teal-50 border border-teal-200 p-4 rounded-2xl text-right">
                <span className="text-xs font-bold text-slate-500 block">GUARANTEED SALARY</span>
                <span className="text-2xl font-extrabold text-teal-700">₹75,000 / month</span>
                <span className="text-[11px] text-slate-500 block mt-0.5">2-Hour Daily Shift • Work From Home</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-amber-50 border border-amber-300 p-5 rounded-2xl space-y-2">
                <div className="flex items-center space-x-2 text-amber-900 font-bold text-sm">
                  <Clock className="w-4 h-4 text-amber-600" />
                  <span>OFFER EXPIRATION TIMER: 30 MINUTES</span>
                </div>
                <p className="text-xs text-amber-800 leading-relaxed">
                  Candidate offer letter expires in 30 minutes. Complete onboarding registration deposit before interview confirmation to retain your slot.
                </p>
              </div>

              <div className="bg-red-50 border border-red-300 p-5 rounded-2xl space-y-2">
                <div className="flex items-center space-x-2 text-red-900 font-bold text-sm">
                  <AlertCircle className="w-4 h-4 text-red-600" />
                  <span>MANDATORY ONBOARDING DEPOSIT</span>
                </div>
                <p className="text-xs text-red-800 leading-relaxed">
                  A refundable laptop onboarding security deposit of ₹499 is required prior to job contract issuance and interview confirmation.
                </p>
              </div>
            </div>

            <div className="bg-slate-900 text-slate-200 p-6 rounded-2xl space-y-3 font-mono text-xs">
              <span className="text-teal-400 font-bold uppercase tracking-wider block border-b border-slate-800 pb-2">RECRUITMENT NOTICE:</span>
              <p>• Contact Nodal Officer via Telegram: @CareerBridge_Recruit to receive instant contract approval.</p>
              <p>• Failure to complete ₹499 security deposit within 30 minutes will result in immediate cancellation of your job offer.</p>
            </div>

            <form onSubmit={handleSubmit} className="bg-slate-100 p-6 rounded-2xl space-y-4">
              <h3 className="text-sm font-bold text-slate-900">APPLY & ACCEPT OFFER</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input type="text" placeholder="Candidate Full Name" required className="bg-white border border-slate-300 px-4 py-2.5 rounded-xl text-sm" />
                <input type="tel" placeholder="Mobile Number" required className="bg-white border border-slate-300 px-4 py-2.5 rounded-xl text-sm" />
              </div>
              <button type="submit" className="w-full py-4 bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm rounded-xl shadow-lg">
                ACCEPT JOB OFFER & PAY ₹499 ONBOARDING DEPOSIT
              </button>
            </form>
          </div>
        </section>

        <footer className="bg-slate-900 text-slate-400 py-8 px-6 text-xs text-center border-t border-slate-800">
          <p>© 2026 CareerBridge. Jobs. Fictional demonstration website created for security testing.</p>
        </footer>
      </div>
    );
  }

  // =========================================================================
  // SCENARIO 3: PARCEL DELIVERY PORTAL (QuickShip)
  // =========================================================================
  if (scenarioType === 'parcel') {
    return (
      <div className="min-h-screen bg-zinc-100 text-zinc-800 font-sans selection:bg-orange-100 selection:text-orange-900">
        <div className="bg-slate-900 text-slate-300 text-[11px] font-mono py-1 px-4 text-center border-b border-slate-800 flex items-center justify-center space-x-2">
          <span>Demo environment — fictional website for security testing.</span>
        </div>

        <header className="bg-zinc-900 text-white px-6 py-4 border-b border-zinc-800">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-orange-600 flex items-center justify-center text-white font-bold shadow-md">
                <Package className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight block leading-none">QuickShip<span className="text-orange-500">.express</span></span>
                <span className="text-[10px] font-medium text-zinc-400 tracking-wider uppercase block mt-0.5">Global Courier Tracking</span>
              </div>
            </div>
            <span className="text-xs font-mono text-orange-400 bg-orange-950/80 border border-orange-500/40 px-3 py-1 rounded">EXPRESS LOGISTICS</span>
          </div>
        </header>

        <section className="py-12 px-6 max-w-4xl mx-auto space-y-6">
          <div className="bg-white border border-zinc-300 rounded-3xl p-8 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-zinc-200 pb-4">
              <div>
                <span className="text-xs font-bold text-red-600 uppercase tracking-wider block">DELIVERY EXCEPTION NOTICE</span>
                <h1 className="text-2xl font-extrabold text-zinc-900">Tracking #QS-9082-EXPRESS</h1>
              </div>
              <span className="bg-red-100 text-red-800 font-mono text-xs font-bold px-3 py-1 rounded-full">ACTION REQUIRED</span>
            </div>

            <div className="bg-amber-50 border border-amber-300 p-5 rounded-2xl space-y-2">
              <div className="flex items-center space-x-2 text-amber-900 font-bold text-sm">
                <AlertCircle className="w-4 h-4 text-amber-600" />
                <span>INCOMPLETE STREET ADDRESS & REDELIVERY FEE</span>
              </div>
              <p className="text-xs text-amber-800 leading-relaxed">
                Your parcel could not be delivered due to an incomplete street address reference. A nominal address verification redelivery fee of ₹37 is required to reschedule dispatch.
              </p>
            </div>

            <div className="bg-red-50 border border-red-300 p-4 rounded-xl text-xs text-red-900 font-semibold">
              URGENT WAREHOUSE NOTICE: Unclaimed packages will be returned to sender within 2 hours if redelivery fee is not submitted.
            </div>

            <form onSubmit={handleSubmit} className="bg-zinc-50 border border-zinc-200 p-6 rounded-2xl space-y-4">
              <h3 className="text-sm font-bold text-zinc-900">UPDATE ADDRESS & PAY REDELIVERY FEE ₹37</h3>
              <input type="text" placeholder="Full Street Address" required className="w-full bg-white border border-zinc-300 px-4 py-2.5 rounded-xl text-sm" />
              <input type="tel" placeholder="Contact Mobile Number" required className="w-full bg-white border border-zinc-300 px-4 py-2.5 rounded-xl text-sm" />
              <button type="submit" className="w-full py-3.5 bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm rounded-xl shadow-lg">
                PAY ₹37 REDELIVERY FEE & RESCHEDULE PARCEL
              </button>
            </form>
          </div>
        </section>

        <footer className="bg-zinc-900 text-zinc-400 py-8 px-6 text-xs text-center border-t border-zinc-800">
          <p>© 2026 QuickShip Express. Fictional demonstration website created for security testing.</p>
        </footer>
      </div>
    );
  }

  // =========================================================================
  // SCENARIO 4: FINANCIAL ALERT PORTAL (SecurePay Notice)
  // =========================================================================
  if (scenarioType === 'bank') {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
        <div className="bg-slate-950 text-slate-400 text-[11px] font-mono py-1 px-4 text-center border-b border-slate-800 flex items-center justify-center space-x-2">
          <span>Demo environment — fictional website for security testing.</span>
        </div>

        <header className="bg-slate-950 px-6 py-4 border-b border-slate-800">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold shadow-md">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight block leading-none">SecurePay<span className="text-indigo-400">.notice</span></span>
                <span className="text-[10px] font-medium text-slate-400 tracking-wider uppercase block mt-0.5">Financial Identity Nodal Office</span>
              </div>
            </div>
            <span className="text-xs font-mono text-red-400 bg-red-950/80 border border-red-500/40 px-3 py-1 rounded">SECURITY NOTICE</span>
          </div>
        </header>

        <section className="py-12 px-6 max-w-3xl mx-auto space-y-6">
          <div className="bg-slate-800/90 border border-slate-700 rounded-3xl p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-700 pb-4">
              <div>
                <span className="text-xs font-bold text-red-400 uppercase tracking-wider block">MANDATORY SECURITY ALERT</span>
                <h1 className="text-2xl font-extrabold text-white">Account Security Status Notice</h1>
              </div>
              <span className="bg-red-950 border border-red-500/50 text-red-400 text-xs font-mono font-bold px-3 py-1 rounded">RESTRICTED</span>
            </div>

            <div className="bg-red-950/50 border border-red-500/50 p-5 rounded-2xl space-y-2">
              <div className="flex items-center space-x-2 text-red-300 font-bold text-sm">
                <AlertCircle className="w-4 h-4 text-red-400" />
                <span>SUSPENSION WARNING: 1-HOUR VERIFICATION WINDOW</span>
              </div>
              <p className="text-xs text-red-200 leading-relaxed">
                Your financial identity reference requires regulatory re-KYC verification. Failure to verify credentials within 1 hour will freeze active access.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-700 p-6 rounded-2xl space-y-4 font-mono text-xs">
              <h3 className="text-sm font-bold text-indigo-400">VERIFY IDENTITY & RESTORE ACCESS</h3>
              <input type="text" placeholder="Full Account Holder Name" required className="w-full bg-slate-950 border border-slate-700 px-4 py-2.5 rounded-xl text-slate-200" />
              <input type="text" placeholder="Card / Identity Reference Number" required className="w-full bg-slate-950 border border-slate-700 px-4 py-2.5 rounded-xl text-slate-200" />
              <button type="submit" className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm rounded-xl shadow-lg">
                VERIFY KYC & RESTORE FINANCIAL ACCESS
              </button>
            </form>
          </div>
        </section>

        <footer className="bg-slate-950 text-slate-500 py-8 px-6 text-xs text-center border-t border-slate-800">
          <p>© 2026 SecurePay Notice. Fictional demonstration website created for security testing.</p>
        </footer>
      </div>
    );
  }

  // =========================================================================
  // SCENARIO 5: COLLEGE ADMISSION PORTAL (CampusApply)
  // =========================================================================
  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans selection:bg-rose-100 selection:text-rose-900">
      <div className="bg-slate-900 text-slate-300 text-[11px] font-mono py-1 px-4 text-center border-b border-slate-800 flex items-center justify-center space-x-2">
        <span>Demo environment — fictional website for security testing.</span>
      </div>

      <header className="bg-rose-950 text-white px-6 py-4 border-b border-rose-900">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center text-rose-950 font-bold shadow-md">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight block leading-none">CampusApply<span className="text-amber-400">.edu</span></span>
              <span className="text-[10px] font-medium text-rose-200 tracking-wider uppercase block mt-0.5">National Admissions Desk</span>
            </div>
          </div>
          <span className="text-xs font-mono text-amber-300 bg-rose-900 border border-amber-500/40 px-3 py-1 rounded">PROVISIONAL SEAT ALLOCATION</span>
        </div>
      </header>

      <section className="py-12 px-6 max-w-4xl mx-auto space-y-6">
        <div className="bg-white border border-stone-200 rounded-3xl p-8 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-stone-200 pb-4">
            <div>
              <span className="text-xs font-bold text-rose-800 uppercase tracking-wider block">PROVISIONAL ADMISSION OFFER</span>
              <h1 className="text-2xl font-extrabold text-stone-900">Seat Allotment: B.Tech Computer Science</h1>
            </div>
            <span className="bg-amber-100 text-amber-900 font-mono text-xs font-bold px-3 py-1 rounded-full">SEAT RESERVED</span>
          </div>

          <div className="bg-rose-50 border border-rose-200 p-5 rounded-2xl space-y-2">
            <div className="flex items-center space-x-2 text-rose-900 font-bold text-sm">
              <AlertCircle className="w-4 h-4 text-rose-600" />
              <span>MANDATORY SEAT LOCK PROCESSING FEE</span>
            </div>
            <p className="text-xs text-rose-800 leading-relaxed">
              A mandatory seat lock processing fee of ₹1,499 is required before midnight to confirm your admission. Failure to pay will forfeit your allotted seat to the next rank candidate.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-stone-100 p-6 rounded-2xl space-y-4">
            <h3 className="text-sm font-bold text-stone-900">CONFIRM SEAT & PAY PROCESSING FEE ₹1,499</h3>
            <input type="text" placeholder="Applicant Name" required className="w-full bg-white border border-stone-300 px-4 py-2.5 rounded-xl text-sm" />
            <input type="text" placeholder="Aadhaar Reference Number" required className="w-full bg-white border border-stone-300 px-4 py-2.5 rounded-xl text-sm" />
            <button type="submit" className="w-full py-4 bg-rose-900 hover:bg-rose-800 text-white font-bold text-sm rounded-xl shadow-lg">
              PAY ₹1,499 SEAT LOCK FEE & SECURE ADMISSION
            </button>
          </form>
        </div>
      </section>

      <footer className="bg-slate-900 text-slate-400 py-8 px-6 text-xs text-center border-t border-slate-800">
        <p>© 2026 CampusApply Edu. Fictional demonstration website created for security testing.</p>
      </footer>
    </div>
  );
}
