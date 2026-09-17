from fastapi import APIRouter, HTTPException, Depends
from typing import List, Dict, Any
from schemas import InvestigationCreateRequest, InvestigationResponse
from agents.orchestrator import InvestigationOrchestrator
from database import save_investigation, get_investigation, get_all_investigations

router = APIRouter(prefix="/api/investigations", tags=["Investigations"])
orchestrator = InvestigationOrchestrator()

@router.post("", response_model=Dict[str, Any])
def create_investigation(req: InvestigationCreateRequest):
    result = orchestrator.run_investigation(
        input_type=req.input_type,
        content=req.input_content,
        preset_id=req.preset_id
    )
    if req.title:
        result["title"] = req.title
    save_investigation(result)
    return result

@router.get("", response_model=List[Dict[str, Any]])
def list_investigations():
    return get_all_investigations()

@router.get("/{inv_id}", response_model=Dict[str, Any])
def fetch_investigation(inv_id: str):
    data = get_investigation(inv_id)
    if not data:
        raise HTTPException(status_code=404, detail="Investigation not found")
    return data

@router.get("/{inv_id}/graph", response_model=Dict[str, Any])
def get_evidence_graph(inv_id: str):
    data = get_investigation(inv_id)
    if not data:
        raise HTTPException(status_code=404, detail="Investigation not found")
    return {
        "nodes": data.get("evidence_nodes", []),
        "edges": data.get("evidence_edges", [])
    }
