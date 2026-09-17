from typing import Dict, Any
from services.ai_provider import MockProvider

class InvestigationOrchestrator:
    def __init__(self):
        self.provider = MockProvider()

    def run_investigation(self, input_type: str, content: str, preset_id: str = None) -> Dict[str, Any]:
        # Evaluates the input and delegates to specialized agents via MockProvider
        state = self.provider.analyze_investigation(input_type, content, preset_id)
        return state
