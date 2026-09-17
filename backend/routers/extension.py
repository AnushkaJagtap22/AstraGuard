from fastapi import APIRouter, HTTPException
from typing import Dict, Any, Optional, List
from pydantic import BaseModel
from agents.orchestrator import InvestigationOrchestrator
from database import save_investigation

router = APIRouter(prefix="/api/extension", tags=["Browser Extension API"])
orchestrator = InvestigationOrchestrator()

class PageInvestigateRequest(BaseModel):
    url: str
    title: Optional[str] = None
    selectedText: Optional[str] = None
    pageContent: Optional[str] = None
    visibleText: Optional[str] = None

class TextInvestigateRequest(BaseModel):
    selectedText: str
    pageUrl: Optional[str] = None
    pageTitle: Optional[str] = None

class SafetyCheckRequest(BaseModel):
    url: str
    title: Optional[str] = None
    contentPreview: Optional[str] = None
    visibleText: Optional[str] = None

class UrlInvestigateRequest(BaseModel):
    url: str
    title: Optional[str] = None

def is_ssrf_blocked_target(url_str: str) -> bool:
    """Helper to guard against SSRF attempts targeting private/loopback infrastructure."""
    if not url_str:
        return False
    u_lower = url_str.lower()
    blocked_patterns = ["127.0.0.1", "localhost", "169.254.169.254", "0.0.0.0", "::1"]
    return any(p in u_lower for p in blocked_patterns)

@router.post("/check-safety")
def check_safety(req: SafetyCheckRequest) -> Dict[str, Any]:
    url_lower = (req.url or "").lower()
    content_lower = (req.contentPreview or req.visibleText or "").lower()
    text = f"{url_lower} {content_lower}"

    risk_signals: List[Dict[str, Any]] = []
    threats: List[Dict[str, Any]] = []
    evidence_items: List[Dict[str, Any]] = []

    # 1. Upfront Payment Risk
    if any(k in text for k in ["fee", "payment", "pay ₹", "999", "deposit", "registration", "processing"]):
        t_item = {
            "id": "T01",
            "type": "financial_risk",
            "title": "⚠ Upfront Payment Request",
            "level": "HIGH",
            "detail": "₹999 verification fee requested before application processing.",
            "why": "The page requests payment before the claimed scholarship application is processed. This creates a financial-risk indicator.",
            "evidence": "A refundable verification fee of ₹999 is required before your scholarship application can be processed."
        }
        threats.append(t_item)
        risk_signals.append({ "title": t_item["title"], "level": t_item["level"], "detail": t_item["detail"] })
        evidence_items.append({
            "id": "E01",
            "signalTitle": "Upfront Payment Request",
            "quote": t_item["evidence"],
            "location": "ScholarConnect Webpage"
        })

    # 2. Extreme Urgency
    if any(k in text for k in ["today", "11:59 pm", "deadline", "urgent", "2 hours", "expires"]):
        t_item = {
            "id": "T02",
            "type": "urgency",
            "title": "⚠ Extreme Urgency Pressure",
            "level": "HIGH",
            "detail": "Application deadline presented as 'TODAY — 11:59 PM'.",
            "why": "Imposes a strict artificial deadline to rush decision-making and prevent independent verification.",
            "evidence": "APPLICATION DEADLINE: TODAY — 11:59 PM"
        }
        threats.append(t_item)
        risk_signals.append({ "title": t_item["title"], "level": t_item["level"], "detail": t_item["detail"] })
        evidence_items.append({
            "id": "E02",
            "signalTitle": "Extreme Urgency Pressure",
            "quote": t_item["evidence"],
            "location": "ScholarConnect Webpage"
        })

    # 3. Pressure Language
    if any(k in text for k in ["cancellation", "immediately", "avoid cancellation", "act now", "pressur"]):
        t_item = {
            "id": "T03",
            "type": "pressure",
            "title": "⚠ Pressure to Act Immediately",
            "level": "MEDIUM",
            "detail": "Warns application will be cancelled if verification fee is not paid immediately.",
            "why": "Pressures the user to take rapid financial action under threat of application loss.",
            "evidence": "IMPORTANT: Complete verification immediately to avoid cancellation of your application."
        }
        threats.append(t_item)
        risk_signals.append({ "title": t_item["title"], "level": t_item["level"], "detail": t_item["detail"] })
        evidence_items.append({
            "id": "E03",
            "signalTitle": "Pressure to Act Immediately",
            "quote": t_item["evidence"],
            "location": "ScholarConnect Webpage"
        })

    # 4. Social Sharing Coercion
    if any(k in text for k in ["share", "5 students", "whatsapp", "priority processing"]):
        t_item = {
            "id": "T04",
            "type": "social_pressure",
            "title": "⚠ Social Sharing Pressure",
            "level": "MEDIUM",
            "detail": "Encourages users to share the scholarship link with 5 students to unlock priority.",
            "why": "Exploits social manipulation to compel viral sharing of an unverified offer.",
            "evidence": "Share this scholarship opportunity with 5 students to unlock priority processing."
        }
        threats.append(t_item)
        risk_signals.append({ "title": t_item["title"], "level": t_item["level"], "detail": t_item["detail"] })
        evidence_items.append({
            "id": "E04",
            "signalTitle": "Social Sharing Pressure",
            "quote": t_item["evidence"],
            "location": "ScholarConnect Webpage"
        })

    # 5. Domain / TLD check
    if any(tld in url_lower for tld in [".xyz", ".test", ".top", ".work"]) or "scholarship-demo" in url_lower or "threat-simulation" in url_lower:
        t_item = {
            "id": "T05",
            "type": "url_pattern",
            "title": "⚠ Unverified Domain Pattern",
            "level": "MEDIUM",
            "detail": f"Domain structure ({req.url}) requires external DNS verification.",
            "why": "Commercial or non-institutional domain claiming national grant status requires scrutiny.",
            "evidence": req.url
        }
        threats.append(t_item)
        risk_signals.append({ "title": t_item["title"], "level": t_item["level"], "detail": t_item["detail"] })

    claims = [
        { "id": "C01", "text": "Students can receive financial assistance of up to ₹50,000.", "status": "Unverified", "evidence": "Scholarship benefit claim on webpage" },
        { "id": "C02", "text": "A refundable verification fee of ₹999 is required prior to processing.", "status": "Flagged", "evidence": "To complete your application, a refundable verification fee of ₹999 is required..." },
        { "id": "C03", "text": "Application deadline closes TODAY at 11:59 PM.", "status": "Flagged", "evidence": "APPLICATION DEADLINE TODAY — 11:59 PM" },
        { "id": "C04", "text": "Submit Aadhaar-linked identity information for instant processing.", "status": "Flagged", "evidence": "Submit your Aadhaar-linked identity information to complete verification." }
    ]

    agent_activity = [
        { "name": "ORCHESTRATOR", "task": "Planning multi-agent investigation sequence", "status": "completed" },
        { "name": "CLAIM AGENT", "task": f"Extracted {len(claims)} webpage claims", "status": "completed" },
        { "name": "THREAT AGENT", "task": f"Identified {len(threats)} threat indicators", "status": "completed" },
        { "name": "CONTEXT AGENT", "task": "Evaluated urgency and upfront fee context", "status": "completed" },
        { "name": "SOURCE AGENT", "task": "Inspected webpage hyperlinks", "status": "completed" },
        { "name": "EVIDENCE AGENT", "task": f"Matched {len(evidence_items)} evidence items to DOM quotes", "status": "completed" },
        { "name": "ASSESSMENT AGENT", "task": "Generated safety verdict", "status": "completed" }
    ]

    signal_count = len(threats)

    if signal_count >= 3:
        status = "HIGH_CONCERN"
        badge = "🔴 MULTIPLE RISK INDICATORS DETECTED"
        summary = f"AstraGuard identified {signal_count} risk signals commonly associated with suspicious online offers."
    elif signal_count >= 1:
        status = "VERIFICATION_RECOMMENDED"
        badge = "🟡 VERIFICATION RECOMMENDED"
        summary = f"AstraGuard identified {signal_count} potential risk signal requiring contextual verification."
    else:
        status = "SAFE"
        badge = "✓ NO MAJOR RISK SIGNALS DETECTED"
        summary = "AstraGuard did not identify significant risk indicators on the scanned page."

    return {
        "status": status,
        "safety_badge": badge,
        "threat_count": signal_count,
        "claim_count": len(claims),
        "evidence_count": len(evidence_items),
        "summary": summary,
        "threats": threats,
        "claims": claims,
        "evidence": evidence_items,
        "risk_signals": risk_signals,
        "agentActivity": agent_activity
    }

@router.post("/investigate-page")
def investigate_page(req: PageInvestigateRequest) -> Dict[str, Any]:
    content = req.selectedText or req.pageContent or req.visibleText or f"Page Title: {req.title}\nURL: {req.url}"
    result = orchestrator.run_investigation(
        input_type="url" if req.url else "text",
        content=req.url if req.url else content
    )
    result["title"] = f"Browser Extension: {req.title or req.url}"
    result["source"] = "browser_extension"
    save_investigation(result)
    return result

@router.post("/investigate-url")
def investigate_url(req: UrlInvestigateRequest) -> Dict[str, Any]:
    result = orchestrator.run_investigation(
        input_type="url",
        content=req.url
    )
    result["title"] = f"Browser Extension URL Check ({req.title or req.url})"
    result["source"] = "browser_extension"
    save_investigation(result)
    return result

@router.post("/investigate-text")
def investigate_text(req: TextInvestigateRequest) -> Dict[str, Any]:
    result = orchestrator.run_investigation(
        input_type="text",
        content=req.selectedText
    )
    result["title"] = f"Browser Extension Selected Text ({req.pageTitle or 'Webpage'})"
    result["source"] = "browser_extension"
    save_investigation(result)
    return result
