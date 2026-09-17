from fastapi import APIRouter, HTTPException
from typing import List, Dict, Any
from database import get_radar_items, get_investigation
from agents.orchestrator import InvestigationOrchestrator

router = APIRouter(prefix="/api/radar", tags=["Risk Radar"])
orchestrator = InvestigationOrchestrator()

@router.get("", response_model=List[Dict[str, Any]])
def list_radar():
    return get_radar_items()

@router.post("/{radar_id}/investigate")
def investigate_radar_item(radar_id: str):
    items = get_radar_items()
    target = next((item for item in items if item["id"] == radar_id), None)
    if not target:
        raise HTTPException(status_code=404, detail="Radar item not found")
    
    # Map category/title to preset or run orchestrator
    preset_id = None
    if "scholarship" in target["category"].lower() or "scholarship" in target["title"].lower():
        preset_id = "fake_scholarship"
    elif "phishing" in target["category"].lower() or "bank" in target["title"].lower():
        preset_id = "phishing_link"
    elif "misinformation" in target["category"].lower() or "flood" in target["title"].lower():
        preset_id = "viral_misinformation"

    result = orchestrator.run_investigation(
        input_type="text",
        content=target["preloaded_input"],
        preset_id=preset_id
    )
    return result
