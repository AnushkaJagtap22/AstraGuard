import os
import json
import uuid
from typing import Dict, Any, List
from datetime import datetime

class AIProvider:
    def analyze_investigation(self, input_type: str, content: str, preset_id: str = None) -> Dict[str, Any]:
        raise NotImplementedError

class MockProvider(AIProvider):
    def analyze_investigation(self, input_type: str, content: str, preset_id: str = None) -> Dict[str, Any]:
        inv_id = f"AG-{datetime.now().strftime('%Y')}-{uuid.uuid4().hex[:6].upper()}"
        content_lower = content.lower()
        
        # PRESET 1: Fake Govt Scholarship
        if preset_id == "fake_scholarship" or "scholarship" in content_lower or "50,000" in content_lower or "50000" in content_lower:
            return {
                "id": inv_id,
                "title": "Government ₹50,000 Student Scholarship WhatsApp Alert",
                "input_type": input_type,
                "input_content": content or "Government launched ₹50,000 scholarship for all students. Applications close tomorrow! Apply at: http://govt-scholarship-scheme-2026-verify.xyz",
                "status": "COMPLETED",
                "assessment": "MISLEADING / POTENTIAL SCAM",
                "confidence": "HIGH",
                "evidence_strength": "STRONG",
                "threats_detected": [
                    {"category": "Misinformation", "severity": "HIGH", "detected": True, "description": "False claim of official government announcement for universal student grant."},
                    {"category": "Fake Scholarship", "severity": "HIGH", "detected": True, "description": "Unauthorized domain requesting personal detail submission under false deadline pressure."},
                    {"category": "Phishing", "severity": "HIGH", "detected": True, "description": "Suspicious registration portal domain '.xyz' mimicking official National Scholarship Portal."},
                    {"category": "Financial Scam", "severity": "MEDIUM", "detected": True, "description": "Asks for registration processing fee of ₹150 prior to disbursement."}
                ],
                "claims": [
                    {
                        "id": "c1",
                        "text": "The Ministry of Education launched a universal ₹50,000 scholarship for all college students.",
                        "status": "Contradicted",
                        "confidence": "HIGH",
                        "reason": "Official National Scholarship Portal (scholarships.gov.in) has issued no such blanket ₹50,000 scheme notification."
                    },
                    {
                        "id": "c2",
                        "text": "Applications close urgently by tomorrow.",
                        "status": "Misleading",
                        "confidence": "HIGH",
                        "reason": "Artificially engineered urgency mechanism commonly leveraged by social engineering phishing scams."
                    },
                    {
                        "id": "c3",
                        "text": "Applications must be submitted through 'http://govt-scholarship-scheme-2026-verify.xyz'.",
                        "status": "Contradicted",
                        "confidence": "HIGH",
                        "reason": "Domain was registered 3 days ago via anonymous registrar and is unassociated with any government entity (.gov.in / .nic.in)."
                    }
                ],
                "sources": [
                    {
                        "id": "s1",
                        "name": "National Scholarship Portal (Official Government Portal)",
                        "url": "https://scholarships.gov.in",
                        "source_type": "Primary/Official",
                        "publication_date": "2026-09-01",
                        "reliability": "HIGH",
                        "relation": "contradicts",
                        "extracted_summary": "Official scheme listing shows Central Sector Interest Subsidy and Merit-cum-Means schemes, none matching blanket ₹50,000 cash grant."
                    },
                    {
                        "id": "s2",
                        "name": "Press Information Bureau (PIB) Fact Check Unit",
                        "url": "https://pib.gov.in/factcheck",
                        "source_type": "Primary/Official",
                        "publication_date": "2026-08-20",
                        "reliability": "HIGH",
                        "relation": "contradicts",
                        "extracted_summary": "PIB Fact Check previously debunked similar viral WhatsApp scholarship messages using non-.gov.in links."
                    },
                    {
                        "id": "s3",
                        "name": "WHOIS Domain Registry Query",
                        "url": "https://whois.domaintools.com",
                        "source_type": "Reputable Secondary",
                        "publication_date": "2026-09-13",
                        "reliability": "HIGH",
                        "relation": "contradicts",
                        "extracted_summary": "Domain 'govt-scholarship-scheme-2026-verify.xyz' registered 3 days ago with WHOIS Privacy Protection enabled."
                    }
                ],
                "context_findings": {
                    "claimed_context": "Current official government relief grant active across all states in India.",
                    "verified_context": "Recycled fraudulent campaign active on WhatsApp groups attempting to collect student Aadhaar and bank details.",
                    "image_reused": True,
                    "original_date": "First detected: November 2023 under variant domain names.",
                    "temporal_mismatch": "The promotional banner image was copied from a 2021 State Government IT program launch."
                },
                "identity_findings": {
                    "sender_type": "Unverified WhatsApp Business Account",
                    "reported_complaints": 142,
                    "risk_flag": "HIGH_SUSPICION"
                },
                "evidence_nodes": [
                    {"id": "n1", "label": "WhatsApp Viral Claim: ₹50,000 Scholarship", "type": "claim", "status": "MISLEADING"},
                    {"id": "n2", "label": "Claim 1: Govt launched ₹50,000 for all", "type": "claim", "status": "Contradicted"},
                    {"id": "n3", "label": "Claim 2: Unofficial Portal '.xyz'", "type": "claim", "status": "Contradicted"},
                    {"id": "n4", "label": "Official Portal: scholarships.gov.in", "type": "source", "status": "VERIFIED"},
                    {"id": "n5", "label": "PIB Fact Check Warning", "type": "source", "status": "VERIFIED"},
                    {"id": "n6", "label": "Fake Site: govt-scholarship...xyz", "type": "url", "status": "SUSPICIOUS"},
                    {"id": "n7", "label": "Threat: Phishing & Data Harvesting", "type": "threat", "status": "CRITICAL"}
                ],
                "evidence_edges": [
                    {"id": "e1", "source": "n1", "target": "n2", "label": "decomposes_into"},
                    {"id": "e2", "source": "n1", "target": "n3", "label": "decomposes_into"},
                    {"id": "e3", "source": "n4", "target": "n2", "label": "contradicts"},
                    {"id": "e4", "source": "n5", "target": "n1", "label": "contradicts"},
                    {"id": "e5", "source": "n3", "target": "n6", "label": "originates_from"},
                    {"id": "e6", "source": "n6", "target": "n7", "label": "triggers_threat"}
                ],
                "timeline": [
                    {"time": "10:31:02 AM", "agent": "Orchestrator", "message": "Initialized multi-agent decomposition for submission.", "status": "done"},
                    {"time": "10:31:05 AM", "agent": "Claim Agent", "message": "Decomposed submission into 3 atomic testable claims.", "status": "done"},
                    {"time": "10:31:12 AM", "agent": "Source Agent", "message": "Cross-referenced Ministry of Education & National Scholarship Portal databases.", "status": "done"},
                    {"time": "10:31:18 AM", "agent": "Media Agent", "message": "Performed OCR on uploaded screenshot; extracted domain and text strings.", "status": "done"},
                    {"time": "10:31:24 AM", "agent": "Scam Agent", "message": "Flagged non-governmental domain suffix (.xyz) and artificial urgency pattern.", "status": "done"},
                    {"time": "10:31:30 AM", "agent": "Context Agent", "message": "Matched promotional header visual to 2021 archival launch photo.", "status": "done"},
                    {"time": "10:31:35 AM", "agent": "Response Agent", "message": "Synthesized risk assessment report and safety precautions.", "status": "done"}
                ],
                "recommendations": [
                    "Do NOT click on 'http://govt-scholarship-scheme-2026-verify.xyz' or enter your Aadhaar/Bank credentials.",
                    "Verify all legitimate student schemes strictly on official portal: https://scholarships.gov.in.",
                    "Report this WhatsApp message to Cybercrime helpline (1930) or cybercrime.gov.in.",
                    "Inform friends/family in group chats where this message was forwarded."
                ],
                "report": "AstraGuard Digital Investigation Report\nCase ID: " + inv_id + "\nAssessment: MISLEADING / POTENTIAL SCAM\nConfidence: HIGH\n\nExecutive Summary:\nThe submitted content claims that the Indian Government has announced a universal ₹50,000 scholarship for all college students closing tomorrow. Our multi-agent investigation confirmed that this claim is false. The official National Scholarship Portal (scholarships.gov.in) has no record of such a scheme. Furthermore, the link provided leads to an unverified private domain (.xyz) registered 3 days ago, exhibiting strong phishing and identity harvesting risk signatures."
            }

        # PRESET 2: Phishing URL / KYC Scam
        elif preset_id == "phishing_link" or "kyc" in content_lower or "bank" in content_lower or "sbi" in content_lower or "account blocked" in content_lower:
            return {
                "id": inv_id,
                "title": "Urgent Bank KYC Account Block Phishing SMS",
                "input_type": input_type,
                "input_content": content or "Dear Customer, Your SBI Bank account will be blocked within 24 hours due to pending KYC update. Click here immediately to verify: http://sbi-kyc-update-portal-net.in/login",
                "status": "COMPLETED",
                "assessment": "CRITICAL PHISHING SCAM",
                "confidence": "HIGH",
                "evidence_strength": "STRONG",
                "threats_detected": [
                    {"category": "Phishing", "severity": "CRITICAL", "detected": True, "description": "Spoofed banking portal interface capturing internet banking passwords and OTPs."},
                    {"category": "Impersonation", "severity": "HIGH", "detected": True, "description": "Impersonating State Bank of India official communication."},
                    {"category": "Scam", "severity": "CRITICAL", "detected": True, "description": "Coercive social engineering threat ('account will be blocked in 24 hours')."}
                ],
                "claims": [
                    {
                        "id": "c1",
                        "text": "Your SBI account will be blocked within 24 hours if KYC is not updated online.",
                        "status": "Contradicted",
                        "confidence": "HIGH",
                        "reason": "RBI regulations mandate banks never send SMS links threatening immediate 24-hour account suspension for online KYC."
                    },
                    {
                        "id": "c2",
                        "text": "'http://sbi-kyc-update-portal-net.in' is an official SBI banking web portal.",
                        "status": "Contradicted",
                        "confidence": "HIGH",
                        "reason": "Official SBI online banking domain is exclusively 'onlinesbi.sbi'. Private domain 'sbi-kyc-update-portal-net.in' is hosted on a bulletproof offshore server."
                    }
                ],
                "sources": [
                    {
                        "id": "s1",
                        "name": "State Bank of India Official Security Advisory",
                        "url": "https://bank.sbi",
                        "source_type": "Primary/Official",
                        "publication_date": "2026-01-10",
                        "reliability": "HIGH",
                        "relation": "contradicts",
                        "extracted_summary": "SBI explicitly warns customers: 'SBI never sends embedded links via SMS to update account or KYC details.'"
                    },
                    {
                        "id": "s2",
                        "name": "Reserve Bank of India (RBI) Cyber Crime Cell",
                        "url": "https://rbi.org.in",
                        "source_type": "Primary/Official",
                        "publication_date": "2025-11-15",
                        "reliability": "HIGH",
                        "relation": "contradicts",
                        "extracted_summary": "Mandatory directive forbidding financial institutions from requiring KYC updates over third-party unencrypted websites."
                    }
                ],
                "context_findings": {
                    "claimed_context": "Official banking urgent notice.",
                    "verified_context": "Smishing (SMS Phishing) attack campaign targeting mobile banking users across multiple telecom circles."
                },
                "identity_findings": {
                    "sender_header": "LM-SBINB-UNKNOWN",
                    "spoofed": True
                },
                "evidence_nodes": [
                    {"id": "n1", "label": "SMS Alert: SBI KYC Account Block", "type": "claim", "status": "SCAM"},
                    {"id": "n2", "label": "Official Portal: onlinesbi.sbi", "type": "source", "status": "VERIFIED"},
                    {"id": "n3", "label": "Malicious Domain: sbi-kyc-...net.in", "type": "url", "status": "CRITICAL"},
                    {"id": "n4", "label": "Threat: Smishing & Credential Theft", "type": "threat", "status": "CRITICAL"}
                ],
                "evidence_edges": [
                    {"id": "e1", "source": "n2", "target": "n1", "label": "contradicts"},
                    {"id": "e2", "source": "n1", "target": "n3", "label": "contains_url"},
                    {"id": "e3", "source": "n3", "target": "n4", "label": "triggers_threat"}
                ],
                "timeline": [
                    {"time": "10:32:00 AM", "agent": "Orchestrator", "message": "Received URL / SMS analysis request.", "status": "done"},
                    {"time": "10:32:02 AM", "agent": "Source Agent", "message": "Domain WHOIS lookup: Registered in Seychelles 48 hours ago.", "status": "done"},
                    {"time": "10:32:05 AM", "agent": "Scam Agent", "message": "Detected high-risk keywords: 'blocked in 24 hours', 'update KYC'.", "status": "done"},
                    {"time": "10:32:08 AM", "agent": "Response Agent", "message": "Generated financial incident mitigation protocol.", "status": "done"}
                ],
                "recommendations": [
                    "DO NOT open the link or enter your SBI username, password, or OTP.",
                    "Report smishing SMS to your mobile provider and national cybercrime portal (cybercrime.gov.in).",
                    "If credentials were entered, immediately freeze your account via official SBI customer care: 1800 1234."
                ],
                "report": "AstraGuard Phishing Investigation Report\nCase ID: " + inv_id + "\nAssessment: CRITICAL PHISHING SCAM\nDomain Flagged: sbi-kyc-update-portal-net.in\nOfficial Domain: onlinesbi.sbi"
            }

        # PRESET 3: Misleading Context Photo
        elif preset_id == "viral_misinformation" or "flood" in content_lower or "viral" in content_lower or "breaking" in content_lower or "disaster" in content_lower:
            return {
                "id": inv_id,
                "title": "Misleading Context: 2021 Flood Photo Recycled for Current Event",
                "input_type": input_type,
                "input_content": content or "Breaking: Massive dam breach and flooding reported in Assam today! Shocking live visual from the site.",
                "status": "COMPLETED",
                "assessment": "MISLEADING CONTEXT",
                "confidence": "HIGH",
                "evidence_strength": "STRONG",
                "threats_detected": [
                    {"category": "Misinformation", "severity": "HIGH", "detected": True, "description": "Authentic photograph assigned to an incorrect date, location, and event."},
                    {"category": "Manipulated Media", "severity": "MEDIUM", "detected": True, "description": "Misleading context framing on viral social post causing unwarranted panic."}
                ],
                "claims": [
                    {
                        "id": "c1",
                        "text": "The shared image shows a dam breach taking place today in Assam.",
                        "status": "Contradicted",
                        "confidence": "HIGH",
                        "reason": "Reverse image search and metadata match this photograph to a July 2021 flood event in Chittagong, Bangladesh."
                    },
                    {
                        "id": "c2",
                        "text": "A massive dam breach occurred in Assam today.",
                        "status": "Contradicted",
                        "confidence": "HIGH",
                        "reason": "Assam State Disaster Management Authority (ASDMA) published zero breach alerts for today."
                    }
                ],
                "sources": [
                    {
                        "id": "s1",
                        "name": "Assam State Disaster Management Authority (ASDMA)",
                        "url": "https://asdma.assam.gov.in",
                        "source_type": "Primary/Official",
                        "publication_date": "2026-09-16",
                        "reliability": "HIGH",
                        "relation": "contradicts",
                        "extracted_summary": "Daily flood bulletin confirms all major embankments and dams are stable."
                    },
                    {
                        "id": "s2",
                        "name": "Reuters Image Archive (Original Publication)",
                        "url": "https://pictures.reuters.com",
                        "source_type": "Primary/Official",
                        "publication_date": "2021-07-28",
                        "reliability": "HIGH",
                        "relation": "contradicts",
                        "extracted_summary": "Photo captured by Reuters photojournalist on July 28, 2021 in Bangladesh."
                    }
                ],
                "context_findings": {
                    "claimed_context": "Dam breach in Assam, today.",
                    "verified_context": "2021 flood photo in Chittagong, Bangladesh.",
                    "image_reused": True,
                    "original_date": "2021-07-28",
                    "temporal_mismatch": "5-year temporal displacement."
                },
                "identity_findings": {},
                "evidence_nodes": [
                    {"id": "n1", "label": "Viral Post: Assam Dam Breach Today", "type": "claim", "status": "MISLEADING"},
                    {"id": "n2", "label": "Original Reuters Photo (2021)", "type": "image", "status": "VERIFIED"},
                    {"id": "n3", "label": "ASDMA Official Bulletin", "type": "source", "status": "VERIFIED"},
                    {"id": "n4", "label": "Threat: Panic Misinformation", "type": "threat", "status": "HIGH"}
                ],
                "evidence_edges": [
                    {"id": "e1", "source": "n2", "target": "n1", "label": "predates_and_contradicts"},
                    {"id": "e2", "source": "n3", "target": "n1", "label": "contradicts"},
                    {"id": "e3", "source": "n1", "target": "n4", "label": "causes"}
                ],
                "timeline": [
                    {"time": "10:33:00 AM", "agent": "Orchestrator", "message": "Started multimodal reverse context verification.", "status": "done"},
                    {"time": "10:33:04 AM", "agent": "Context Agent", "message": "Matched image hash to 2021 news archive.", "status": "done"},
                    {"time": "10:33:09 AM", "agent": "Source Agent", "message": "Cross-checked disaster management authority bulletins.", "status": "done"},
                    {"time": "10:33:14 AM", "agent": "Response Agent", "message": "Generated public fact-check summary.", "status": "done"}
                ],
                "recommendations": [
                    "Do not forward panic-inducing unverified flood videos or posts.",
                    "Check official state disaster management bulletins (ASDMA) for genuine warnings.",
                    "Report misleading media posts on Twitter/X, Meta, or Telegram platforms."
                ],
                "report": "AstraGuard Image Context Verification Report\nCase ID: " + inv_id + "\nAssessment: MISLEADING CONTEXT\nImage Source: Reuters 2021 Archive (Chittagong, Bangladesh)"
            }

        # DEFAULT GENERIC DYNAMIC ANALYSIS FOR USER CUSTOM INPUT
        return {
            "id": inv_id,
            "title": f"Investigation: {content[:45]}...",
            "input_type": input_type,
            "input_content": content,
            "status": "COMPLETED",
            "assessment": "NEEDS VERIFICATION / UNVERIFIED",
            "confidence": "MEDIUM",
            "evidence_strength": "MODERATE",
            "threats_detected": [
                {"category": "Misinformation", "severity": "MEDIUM", "detected": True, "description": "Unverified claims requiring official corroboration."},
                {"category": "Scam", "severity": "LOW", "detected": False, "description": "No explicit monetary solicitation identified."},
                {"category": "Phishing", "severity": "LOW", "detected": False, "description": "No malicious external domain redirects detected."}
            ],
            "claims": [
                {
                    "id": "c1",
                    "text": content[:120] if len(content) > 120 else content,
                    "status": "Unverified",
                    "confidence": "MEDIUM",
                    "reason": "Extracted core claim requires cross-referencing with primary institutional sources."
                }
            ],
            "sources": [
                {
                    "id": "s1",
                    "name": "AstraGuard Intelligence Search Crawler",
                    "url": None,
                    "source_type": "Unverified",
                    "publication_date": datetime.now().strftime("%Y-%m-%d"),
                    "reliability": "MEDIUM",
                    "relation": "contextualizes",
                    "extracted_summary": "Crawled primary indexes. Limited official statements found directly confirming this assertion."
                }
            ],
            "context_findings": {
                "claimed_context": "User submitted query.",
                "verified_context": "Synthesized through AstraGuard agentic multi-source verification engine.",
                "image_reused": False
            },
            "identity_findings": {},
            "evidence_nodes": [
                {"id": "n1", "label": f"User Submission: {content[:30]}...", "type": "claim", "status": "UNVERIFIED"},
                {"id": "n2", "label": "Primary Source Query", "type": "source", "status": "CHECKING"}
            ],
            "evidence_edges": [
                {"id": "e1", "source": "n2", "target": "n1", "label": "evaluating"}
            ],
            "timeline": [
                {"time": "10:35:00 AM", "agent": "Orchestrator", "message": "Parsed custom user input.", "status": "done"},
                {"time": "10:35:03 AM", "agent": "Claim Agent", "message": "Extracted testable claims.", "status": "done"},
                {"time": "10:35:06 AM", "agent": "Source Agent", "message": "Searched index database.", "status": "done"},
                {"time": "10:35:10 AM", "agent": "Response Agent", "message": "Compiled initial investigation state.", "status": "done"}
            ],
            "recommendations": [
                "Treat unverified viral messages with caution before sharing.",
                "Look for official press releases or primary domain notifications (.gov, .edu, official news).",
                "Bookmark this investigation in Evidence Vault for future updates."
            ],
            "report": "AstraGuard Investigation Summary\nCase ID: " + inv_id + "\nAssessment: NEEDS VERIFICATION\nContent Analyzed: " + content[:100]
        }
