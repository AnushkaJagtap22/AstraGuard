from fastapi import APIRouter
from typing import Dict, Any
from schemas import ChatRequest
from database import get_investigation

router = APIRouter(prefix="/api/chat", tags=["AstraGuard Assistant"])

@router.post("")
def chat_assistant(req: ChatRequest) -> Dict[str, Any]:
    msg_lower = req.message.lower()
    inv_context = None
    
    if req.investigation_id:
        inv_context = get_investigation(req.investigation_id)

    # Contextual answering based on active investigation state
    if inv_context:
        title = inv_context.get("title", "")
        assessment = inv_context.get("assessment", "")
        sources = inv_context.get("sources", [])
        claims = inv_context.get("claims", [])
        
        if "why" in msg_lower or "flag" in msg_lower or "reason" in msg_lower:
            reply = f"In Case **{inv_context['id']}** (*{title}*), AstraGuard flagged the content as **{assessment}** primarily because:\n\n"
            for i, c in enumerate(claims, 1):
                reply += f"{i}. **{c['text']}**: {c['reason']}\n"
            return {"reply": reply, "investigation_id": req.investigation_id}

        elif "source" in msg_lower or "contradict" in msg_lower or "official" in msg_lower:
            reply = f"For Case **{inv_context['id']}**, our Source Agent evaluated the following verified sources:\n\n"
            for s in sources:
                reply += f"• **{s['name']}** ({s['source_type']}): {s['extracted_summary']}\n"
            return {"reply": reply, "investigation_id": req.investigation_id}

        elif "action" in msg_lower or "do now" in msg_lower or "protect" in msg_lower:
            recs = inv_context.get("recommendations", [])
            reply = f"Here are the recommended safety actions for Case **{inv_context['id']}**:\n\n"
            for r in recs:
                reply += f"✓ {r}\n"
            return {"reply": reply, "investigation_id": req.investigation_id}

    # Generic AstraGuard Assistant responses grounded in Digital Safety & Misinformation
    if "how to report" in msg_lower or "cybercrime" in msg_lower:
        reply = "You can report cyber fraud or misinformation in India via:\n1. National Cyber Crime Helpline: Call **1930**\n2. Official Web Portal: **cybercrime.gov.in**\n3. Misinformation WhatsApp PIB Helpline: **+91 87997 11259**."
    elif "what is astraguard" in msg_lower or "how does it work" in msg_lower:
        reply = "AstraGuard is an agentic AI digital investigation operating system. When you submit suspicious content, our central Orchestrator deploys 8 specialized agents (Claim, Source, Media, Scam, Context, Identity, Evidence, Response) to decompose claims, verify sources against official registries, build an interactive Evidence Graph, and generate actionable reports."
    else:
        reply = f"I am your **AstraGuard Investigation Assistant**. Currently observing active investigation telemetry. You can ask me: 'Why was this flagged?', 'Which official sources contradict this claim?', or 'What steps should I take now?'."

    return {"reply": reply, "investigation_id": req.investigation_id}
