export const demoInvestigations = [
  {
    id: "AG-2026-001",
    title: "Government ₹50,000 Student Scholarship WhatsApp Alert",
    input_type: "text",
    input_content: "Forwarded message claims that a new government scholarship is open and asks students to pay ₹2,000 as a registration fee before midnight.",
    status: "COMPLETED",
    assessment: "MISLEADING / POTENTIAL SCAM",
    confidence: "HIGH",
    evidence_strength: "STRONG",
    threats_detected: [
      { category: "Misinformation", severity: "HIGH", detected: true, description: "False claim of official government announcement for universal student grant." },
      { category: "Fake Scholarship", severity: "HIGH", detected: true, description: "Unauthorized domain requesting personal detail submission under false deadline pressure." },
      { category: "Phishing", severity: "HIGH", detected: true, description: "Suspicious registration portal domain '.xyz' mimicking official National Scholarship Portal." },
      { category: "Financial Scam", severity: "MEDIUM", detected: true, description: "Asks for registration processing fee of ₹2,000 prior to disbursement." }
    ],
    claims: [
      { id: "c1", text: "Scholarship registration is currently open for all students.", status: "Contradicted", confidence: "HIGH", reason: "Official National Scholarship Portal (scholarships.gov.in) has issued no such blanket ₹50,000 scheme notification." },
      { id: "c2", text: "Applicants must pay ₹2,000 registration fee.", status: "Contradicted", confidence: "HIGH", reason: "Government scholarship applications on official portals never require upfront registration fees." },
      { id: "c3", text: "Payment is required to receive the scholarship funds.", status: "Misleading", confidence: "HIGH", reason: "Artificially engineered urgency mechanism commonly leveraged by financial phishing scams." }
    ],
    sources: [
      { id: "s1", name: "National Scholarship Portal (Official Government Portal)", url: "https://scholarships.gov.in", source_type: "Primary/Official", publication_date: "2026-09-01", reliability: "HIGH", relation: "contradicts", extracted_summary: "Official scheme listing shows Central Sector Interest Subsidy schemes, none requiring upfront registration fees." },
      { id: "s2", name: "Press Information Bureau (PIB) Fact Check Unit", url: "https://pib.gov.in/factcheck", source_type: "Primary/Official", publication_date: "2026-08-20", reliability: "HIGH", relation: "contradicts", extracted_summary: "PIB Fact Check previously debunked similar viral WhatsApp scholarship messages demanding payment." },
      { id: "s3", name: "WHOIS Domain Registry Query", url: "https://whois.domaintools.com", source_type: "Reputable Secondary", publication_date: "2026-09-13", reliability: "HIGH", relation: "contradicts", extracted_summary: "Domain 'govt-scholarship-scheme-2026-verify.xyz' registered 3 days ago with WHOIS Privacy Protection enabled." }
    ],
    context_findings: {
      claimed_context: "Current official government relief grant active across all states in India.",
      verified_context: "Recycled fraudulent campaign active on WhatsApp groups attempting to collect student Aadhaar and bank details.",
      image_reused: true,
      original_date: "First detected: November 2023 under variant domain names.",
      temporal_mismatch: "The promotional banner image was copied from a 2021 State Government IT program launch."
    },
    identity_findings: {
      sender_type: "Unverified WhatsApp Business Account",
      reported_complaints: 142,
      risk_flag: "HIGH_SUSPICION"
    },
    pipeline_steps: [
      { stage: "INPUT", agent: "Orchestrator", status: "COMPLETE", detail: "Parsed text payload and classified input parameters." },
      { stage: "CLASSIFY", agent: "Claim Agent", status: "COMPLETE", detail: "Identified text type as WhatsApp forwarded financial solicitation." },
      { stage: "DECOMPOSE", agent: "Claim Agent", status: "COMPLETE", detail: "Extracted 3 atomic claims regarding fee, deadline, and authority." },
      { stage: "VERIFY", agent: "Source Agent", status: "COMPLETE", detail: "Crawled National Scholarship Portal & PIB registry indexes." },
      { stage: "CROSS-CHECK", agent: "Context Agent", status: "COMPLETE", detail: "Cross-checked promotional banner against 2021 archival launch photo." },
      { stage: "CONNECT EVIDENCE", agent: "Evidence Agent", status: "COMPLETE", detail: "Built relational graph connecting 7 nodes and 6 edge paths." },
      { stage: "ASSESS", agent: "Scam Agent", status: "COMPLETE", detail: "Synthesized threat matrix: High Phishing & Financial Scam risk." },
      { stage: "RESPOND", agent: "Response Agent", status: "COMPLETE", detail: "Generated safety protocol recommendations and incident report." }
    ],
    evidence_nodes: [
      { id: "n1", label: "WhatsApp Message: ₹50,000 Scholarship", type: "claim", status: "MISLEADING", x: 100, y: 150 },
      { id: "n2", label: "Claim 1: ₹2,000 Registration Fee", type: "claim", status: "Contradicted", x: 300, y: 80 },
      { id: "n3", label: "Claim 2: Apply Before Midnight", type: "claim", status: "Misleading", x: 300, y: 220 },
      { id: "n4", label: "Official Portal: scholarships.gov.in", type: "source", status: "VERIFIED", x: 550, y: 80 },
      { id: "n5", label: "PIB Fact Check Advisory", type: "source", status: "VERIFIED", x: 550, y: 220 },
      { id: "n6", label: "Fake Site: govt-scholarship...xyz", type: "url", status: "SUSPICIOUS", x: 300, y: 340 },
      { id: "n7", label: "Threat: Financial Fee Scam", type: "threat", status: "CRITICAL", x: 550, y: 340 }
    ],
    evidence_edges: [
      { id: "e1", source: "n1", target: "n2", label: "EXTRACTED FROM", strength: "STRONG" },
      { id: "e2", source: "n1", target: "n3", label: "EXTRACTED FROM", strength: "STRONG" },
      { id: "e3", source: "n4", target: "n2", label: "CONTRADICTS", strength: "STRONG" },
      { id: "e4", source: "n5", target: "n1", label: "CONTRADICTS", strength: "STRONG" },
      { id: "e5", source: "n3", target: "n6", label: "LINKED TO", strength: "MEDIUM" },
      { id: "e6", source: "n6", target: "n7", label: "TRIGGERS THREAT", strength: "STRONG" }
    ],
    story_steps: [
      { stage: "INPUT", title: "User Submission", content: "User submitted a viral WhatsApp message claiming a ₹50,000 scholarship." },
      { stage: "CLAIMS", title: "Atomic Claims Extracted", content: "Extracted 3 claims regarding eligibility, urgency, and ₹2,000 fee requirement." },
      { stage: "EVIDENCE", title: "Registry Crawl Findings", content: "Searched National Scholarship Portal (scholarships.gov.in) and WHOIS domain records." },
      { stage: "CONTRADICTIONS", title: "Discrepancies Found", content: "Official government portals never demand registration fees via '.xyz' web links." },
      { stage: "ASSESSMENT", title: "Final Assessment", content: "Rated as MISLEADING / POTENTIAL SCAM with High Confidence." },
      { stage: "ACTION", title: "Recommended Protocol", content: "Do NOT pay fee. Report WhatsApp message to Cybercrime Helpline 1930." }
    ],
    timeline: [
      { time: "10:31:02 AM", agent: "Orchestrator", message: "Initialized multi-agent decomposition for submission.", status: "done" },
      { time: "10:31:05 AM", agent: "Claim Agent", message: "Decomposed submission into 3 atomic testable claims.", status: "done" },
      { time: "10:31:12 AM", agent: "Source Agent", message: "Cross-referenced Ministry of Education & National Scholarship Portal databases.", status: "done" },
      { time: "10:31:18 AM", agent: "Media Agent", message: "Performed OCR on uploaded screenshot; extracted domain and text strings.", status: "done" },
      { time: "10:31:24 AM", agent: "Scam Agent", message: "Flagged non-governmental domain suffix (.xyz) and artificial urgency pattern.", status: "done" },
      { time: "10:31:30 AM", agent: "Context Agent", message: "Matched promotional header visual to 2021 archival launch photo.", status: "done" },
      { time: "10:31:35 AM", agent: "Response Agent", message: "Synthesized risk assessment report and safety precautions.", status: "done" }
    ],
    recommendations: [
      "Do NOT click on 'http://govt-scholarship-scheme-2026-verify.xyz' or enter your Aadhaar/Bank credentials.",
      "Verify all legitimate student schemes strictly on official portal: https://scholarships.gov.in.",
      "Report this WhatsApp message to Cybercrime helpline (1930) or cybercrime.gov.in.",
      "Inform friends/family in group chats where this message was forwarded."
    ],
    report: "AstraGuard Digital Investigation Report\nCase ID: AG-2026-001\nAssessment: MISLEADING / POTENTIAL SCAM\nConfidence: HIGH\n\nExecutive Summary:\nThe submitted content claims that the Indian Government has announced a universal ₹50,000 scholarship for all college students closing tomorrow. Our multi-agent investigation confirmed that this claim is false. The official National Scholarship Portal (scholarships.gov.in) has no record of such a scheme. Furthermore, the link provided leads to an unverified private domain (.xyz) registered 3 days ago, exhibiting strong phishing and identity harvesting risk signatures.",
    created_at: "2026-09-16T10:31:00Z"
  }
];

export const demoScreenshotData = {
  ocr_regions: [
    { id: "r1", text: "URGENT!!", confidence: "99%" },
    { id: "r2", text: "Government Student Laptop Scheme 2026", confidence: "98%" },
    { id: "r3", text: "Register before midnight.", confidence: "97%" },
    { id: "r4", text: "Pay ₹999 processing fee.", confidence: "99%" },
    { id: "r5", text: "Limited 500 students only.", confidence: "95%" },
    { id: "r6", text: "Click here: laptop-free-scheme-2026.xyz", confidence: "99%" }
  ],
  extracted_urls: ["http://laptop-free-scheme-2026.xyz"],
  extracted_claims: [
    "Government launched Free Laptop Scheme 2026.",
    "Registration closes at midnight tonight.",
    "Students must pay ₹999 processing fee."
  ],
  threat_indicators: [
    "Artificial Urgency (Deadline: Midnight)",
    "Upfront Payment Request (₹999 Fee)",
    "Unverifiable Authority Claim (Fake Govt Seal)",
    "Suspicious Domain Extension (.xyz)"
  ]
};

export const demoUrlData = {
  url: "https://example-student-portal-2026.xyz/apply",
  domain: "example-student-portal-2026.xyz",
  registered_days_ago: 3,
  https: true,
  redirects: "Redirects to external unencrypted payment page",
  impersonation_target: "National Scholarship Portal (scholarships.gov.in)",
  suspicious_keywords: ["free-laptop", "urgent-scholarship", "pay-fee-now"],
  risk_signals: [
    { title: "Suspicious Domain Pattern", desc: "SIMULATED DEMO SIGNAL: Domain registered 3 days ago via offshore privacy registrar." },
    { title: "Unverified Organization Identity", desc: "SIMULATED DEMO SIGNAL: No SSL certificate alignment with Ministry of Education." },
    { title: "Financial Request Detected", desc: "SIMULATED DEMO SIGNAL: Asks for immediate UPI payment prior to application submission." }
  ]
};

export const demoImageData = {
  filename: "viral_disaster_visual.png",
  ocr_extracted: "ASSAM FLOOD RELIEF FUND URGENT DONATION",
  visual_context: "Matches news photograph published in July 2021 in Chittagong, Bangladesh.",
  claim_extracted: "Photograph shows ongoing dam breach in Assam today.",
  reverse_search_matches: 14,
  manipulation_findings: "Possible manipulation indicators: Image file is authentic and unedited, but accompanying viral caption creates a misleading context mismatch."
};

export const demoVideoData = {
  filename: "breaking_scheme_announcement.mp4",
  frames_analyzed: 24,
  transcript_segments: 8,
  claims_extracted: 4,
  external_sources_checked: 7,
  timeline: [
    { time: "00:00", label: "Opening statement", claim: "Host introduces purported central education grant." },
    { time: "00:12", label: "Main claim", claim: "Claims ₹50,000 cash will be transferred directly to student bank accounts." },
    { time: "00:27", label: "Supporting statement", claim: "Displays mock government notification banner." },
    { time: "00:41", label: "Context requiring verification", claim: "Instructs viewers to click external Telegram channel link." },
    { time: "00:55", label: "Conclusion", claim: "Urges immediate payment of ₹500 registration charge." }
  ]
};

export const demoDocumentData = {
  filename: "Student_Scholarship_Notice.pdf",
  pages: 3,
  extracted_text_preview: "OFFICIAL NOTIFICATION: Ministry of Human Resource Development announces Special Higher Education Incentive Grant...",
  claims: [
    "Grant amount: ₹50,000 per eligible applicant.",
    "Processing fee: ₹1,500 required for document verification.",
    "Deadline: Within 48 hours of notice issuance."
  ],
  organizations_mentioned: ["Ministry of Education", "National Informatics Centre", "Private Grant Trust"],
  dates_mentioned: ["September 14, 2026", "Closing: September 16, 2026"],
  urls_mentioned: ["http://govt-incentive-grant.org.in"],
  inconsistencies: [
    "Document uses outdated Ministry logo retired in 2020.",
    "Official government documents do not list personal Gmail addresses for contact.",
    "Listed IFSC code belongs to a private co-operative bank rather than Reserve Bank portal."
  ]
};

export const demoIdentityCases = [
  {
    handle: "@career_updates_india",
    risk_assessment: "Potential impersonation / suspicious identity indicators",
    confidence: "Moderate",
    evidence_coverage: "7 / 10 indicators investigated",
    why_flagged: [
      { num: "01", title: "Identity Inconsistency", desc: "Profile claims affiliation with Ministry of Skill Development, but public records do not confirm this account.", strength: "High", linkNode: "n4" },
      { num: "02", title: "Username Similarity", desc: "Username closely resembles official government initiative handle format.", strength: "Medium", linkNode: "n2" },
      { num: "03", title: "External-Link Mismatch", desc: "Linked website redirects to an unverified private blog with monetary solicitations.", strength: "High", linkNode: "n6" },
      { num: "04", title: "Content Pattern", desc: "Multiple recent posts use urgent financial language requesting registration fees.", strength: "Medium", linkNode: "n7" }
    ],
    agents: [
      { name: "Identity Resolver", status: "COMPLETE", checked: "Username, Profile URL & Metadata", finding: "Found 1 public profile handle registered 14 days ago.", strength: "HIGH", sources: ["Public Profile Scraper"], conclusion: "Account created recently with rapid follower count spike." },
      { name: "Profile Analyzer", status: "COMPLETE", checked: "Bio & Account History", finding: "Bio claims official government affiliation without verified checkmark.", strength: "HIGH", sources: ["Official Brand Registry"], conclusion: "Unverified organizational claims." },
      { name: "Username Intelligence", status: "COMPLETE", checked: "Homoglyphs & Handle Spoofing", finding: "Uses character replacement mimicking official portal handle.", strength: "MEDIUM", sources: ["Domain Similarity Index"], conclusion: "Potential spoofing attempt." },
      { name: "Avatar Analyzer", status: "COMPLETE", checked: "Profile Picture & Banner", finding: "Avatar graphic extracted from official press release banner.", strength: "HIGH", sources: ["Reverse Image Search"], conclusion: "Uncredited graphic reuse." },
      { name: "Content Analyzer", status: "COMPLETE", checked: "Recent Posts & Phrases", finding: "Contains 12 posts soliciting ₹1,500 application fees.", strength: "HIGH", sources: ["Language Pattern Engine"], conclusion: "Financial solicitation signals." },
      { name: "Cross-Source Verification", status: "COMPLETE", checked: "External Website Links", finding: "Outbound link redirects to offshore '.xyz' domain.", strength: "HIGH", sources: ["WHOIS Registry"], conclusion: "Domain mismatch." },
      { name: "Impersonation Detector", status: "COMPLETE", checked: "Brand Identity Comparison", finding: "High visual and handle match to official government portal.", strength: "HIGH", sources: ["Brand Protection Index"], conclusion: "High impersonation score." },
      { name: "Risk Synthesizer", status: "COMPLETE", checked: "All Agent Evidence Paths", finding: "Compiled 4 high-risk findings into final assessment report.", strength: "HIGH", sources: ["AstraGuard Core Engine"], conclusion: "Synthesized report ready." }
    ],
    signals: [
      { name: "Username Alignment", status: "⚠ Inconsistent", why: "Handle mimics official ministry account format without authorization." },
      { name: "Account Age", status: "⚠ Inconsistent", why: "Registered 14 days ago; unexpected for claimed official organization." },
      { name: "Profile Completeness", status: "✓ Consistent", why: "Bio and header images populated." },
      { name: "Bio Consistency", status: "⚠ Inconsistent", why: "Claims government authority unsupported by official website directory." },
      { name: "External Links", status: "⚠ Inconsistent", why: "Bio link points to '.xyz' domain instead of '.gov.in'." },
      { name: "Contact Information", status: "⚠ Inconsistent", why: "Lists free webmail address instead of official institutional email." },
      { name: "Avatar Reuse", status: "⚠ Inconsistent", why: "Logo copied from 2021 government press bulletin." },
      { name: "Content Patterns", status: "⚠ Inconsistent", why: "High frequency of urgent fee payment posts." },
      { name: "Organization Claims", status: "⚠ Inconsistent", why: "Official website does not list this handle as a verified channel." },
      { name: "Public-Source Consistency", status: "? Unknown", why: "Insufficient historical web archive index points." }
    ]
  },
  {
    handle: "@official_scholarship_help",
    risk_assessment: "High impersonation indicators detected",
    confidence: "High",
    evidence_coverage: "8 / 10 indicators investigated",
    why_flagged: [
      { num: "01", title: "Brand Impersonation", desc: "Profile uses official government logo as avatar image.", strength: "High", linkNode: "n4" },
      { num: "02", title: "Phishing Link", desc: "Bio contains unencrypted redirect link capturing banking credentials.", strength: "High", linkNode: "n6" }
    ],
    agents: [],
    signals: []
  },
  {
    handle: "@tech_giveaway_2026",
    risk_assessment: "Potential financial giveaway scam indicators",
    confidence: "Moderate",
    evidence_coverage: "6 / 10 indicators investigated",
    why_flagged: [
      { num: "01", title: "Urgent Payment Request", desc: "Demands shipping fee for free laptop dispatch.", strength: "High", linkNode: "n7" }
    ],
    agents: [],
    signals: []
  }
];

export const demoRadarItems = [
  {
    id: "radar-101",
    title: "Universal ₹50,000 Student Scholarship WhatsApp Alert",
    category: "Fake Scholarship",
    severity: "HIGH",
    source: "WhatsApp Viral Groups",
    timestamp: "10 mins ago",
    summary: "Viral message offering ₹50k government grant directing students to unverified '.xyz' domain.",
    preloaded_input: "Government launched ₹50,000 scholarship for all students. Applications close tomorrow! Apply at: http://govt-scholarship-scheme-2026-verify.xyz"
  },
  {
    id: "radar-102",
    title: "SBI Urgent KYC Account Block Warning SMS",
    category: "Phishing",
    severity: "CRITICAL",
    source: "Smishing SMS Telecommunication Alerts",
    timestamp: "25 mins ago",
    summary: "Fraudulent banking SMS threatening account suspension within 24h with fake login link.",
    preloaded_input: "Dear Customer, Your SBI Bank account will be blocked within 24 hours due to pending KYC update. Click here immediately to verify: http://sbi-kyc-update-portal-net.in/login"
  },
  {
    id: "radar-103",
    title: "2021 Flood Media Visual Recycled as Today's Dam Breach",
    category: "Misinformation",
    severity: "HIGH",
    source: "Twitter/X Trending",
    timestamp: "1 hour ago",
    summary: "5-year old photo from Bangladesh re-captioned as an ongoing disaster in Assam.",
    preloaded_input: "Breaking: Massive dam breach and flooding reported in Assam today! Shocking live visual from the site."
  }
];
