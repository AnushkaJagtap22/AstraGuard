from pydantic import BaseModel, Field
from typing import List, Dict, Any, Optional

class InvestigationCreateRequest(BaseModel):
    input_type: str = Field(..., description="text | url | image | screenshot | video")
    input_content: str = Field(..., description="Text payload or URL or file reference")
    title: Optional[str] = None
    preset_id: Optional[str] = None

class ClaimModel(BaseModel):
    id: str
    text: str
    status: str  # Verified | Supported | Contradicted | Misleading | Unverified
    confidence: str  # HIGH | MEDIUM | LOW
    reason: str

class SourceModel(BaseModel):
    id: str
    name: str
    url: Optional[str] = None
    source_type: str  # Primary/Official | Reputable Secondary | User Generated | Unverified
    publication_date: Optional[str] = None
    reliability: str  # HIGH | MEDIUM | LOW
    relation: str  # supports | contradicts | contextualizes
    extracted_summary: str

class EvidenceNodeModel(BaseModel):
    id: str
    label: str
    type: str  # claim | source | url | image | video | profile | threat | event
    status: Optional[str] = None
    metadata: Dict[str, Any] = {}

class EvidenceEdgeModel(BaseModel):
    id: str
    source: str
    target: str
    label: str  # supports | contradicts | originates_from | contextualizes | suspicious_link

class ThreatModel(BaseModel):
    category: str  # Misinformation | Scam | Phishing | Fake Job | Fake Scholarship | Impersonation | Manipulated Media
    severity: str  # CRITICAL | HIGH | MEDIUM | LOW | CLEAR
    detected: bool
    description: str

class TimelineEventModel(BaseModel):
    time: str
    agent: str
    message: str
    status: str  # done | in_progress | pending

class InvestigationResponse(BaseModel):
    id: str
    title: str
    input_type: str
    input_content: str
    status: str
    assessment: str  # VERIFIED | CREDIBLE | MISLEADING | LIKELY FALSE | SCAM / PHISHING | UNVERIFIED
    confidence: str  # HIGH | MEDIUM | LOW
    evidence_strength: str  # STRONG | MODERATE | WEAK
    threats_detected: List[ThreatModel]
    claims: List[ClaimModel]
    sources: List[SourceModel]
    evidence_nodes: List[EvidenceNodeModel]
    evidence_edges: List[EvidenceEdgeModel]
    context_findings: Dict[str, Any]
    identity_findings: Dict[str, Any]
    timeline: List[TimelineEventModel]
    recommendations: List[str]
    report: str
    user_notes: Optional[str] = ""
    created_at: str

class IdentityAuditRequest(BaseModel):
    handle_or_url: str
    platform: Optional[str] = "social"

class ChatRequest(BaseModel):
    investigation_id: Optional[str] = None
    message: str
