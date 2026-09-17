from fastapi import APIRouter
from typing import List, Dict, Any

router = APIRouter(prefix="/api/help-finder", tags=["Help Finder"])

OFFICIAL_HELPLINES = [
    {
        "state": "National / Central",
        "district": "All India",
        "authority": "National Cyber Crime Reporting Portal (MHA)",
        "helpline": "1930",
        "website": "https://cybercrime.gov.in",
        "category": "Financial Fraud & Cybercrime",
        "address": "Ministry of Home Affairs, New Delhi"
    },
    {
        "state": "National / Central",
        "district": "All India",
        "authority": "PIB Fact Check Unit (Misinformation)",
        "helpline": "+91 87997 11259",
        "website": "https://pib.gov.in/factcheck",
        "category": "Misinformation Verification",
        "address": "Press Information Bureau, Shastri Bhawan, New Delhi"
    },
    {
        "state": "Maharashtra",
        "district": "Mumbai",
        "authority": "Mumbai Police Cyber Crime Cell",
        "helpline": "022-26556677 / 1930",
        "website": "https://mumbaipolice.gov.in",
        "category": "Cyber Police Station",
        "address": "BKC Cyber Police Station, Bandra Kurla Complex, Mumbai - 400051"
    },
    {
        "state": "Maharashtra",
        "district": "Pune",
        "authority": "Pune City Cyber Police Cell",
        "helpline": "020-26123345 / 1930",
        "website": "https://punepolice.gov.in",
        "category": "Cyber Police Station",
        "address": "Shivajinagar Police Headquarters, Pune - 411005"
    },
    {
        "state": "Karnataka",
        "district": "Bengaluru",
        "authority": "Bengaluru CEN Police Station (Cyber Crime)",
        "helpline": "080-22201021 / 1930",
        "website": "https://ksp.karnataka.gov.in",
        "category": "Cyber Police Station",
        "address": "Infantry Road, Central Police Office, Bengaluru - 560001"
    },
    {
        "state": "Delhi",
        "district": "New Delhi",
        "authority": "Delhi Police IFSO (Intelligence Fusion & Strategic Operations)",
        "helpline": "011-20892606 / 1930",
        "website": "https://delhipolice.gov.in",
        "category": "Specialized Cyber Cell",
        "address": "Sector 16, Dwarka, New Delhi - 110078"
    },
    {
        "state": "Tamil Nadu",
        "district": "Chennai",
        "authority": "State Cyber Crime Wing - Tamil Nadu",
        "helpline": "044-28447700 / 1930",
        "website": "https://eservices.tnpolice.gov.in",
        "category": "State Headquarters",
        "address": "Block 2, DGP Office Campus, Mylapore, Chennai - 600004"
    }
]

@router.get("", response_model=List[Dict[str, Any]])
def get_helplines(state: str = None, district: str = None):
    results = OFFICIAL_HELPLINES
    if state and state != "All":
        results = [item for item in results if item["state"].lower() == state.lower() or item["state"] == "National / Central"]
    if district and district != "All":
        results = [item for item in results if item["district"].lower() == district.lower() or item["district"] == "All India"]
    return results
