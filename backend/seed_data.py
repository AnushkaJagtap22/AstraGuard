from database import init_db, save_radar_item, save_investigation, get_radar_items
from services.ai_provider import MockProvider

def seed_initial_data():
    init_db()
    existing_radar = get_radar_items()
    if len(existing_radar) > 0:
        return  # Already seeded

    provider = MockProvider()
    
    # Pre-generate 3 primary investigations
    inv1 = provider.analyze_investigation("text", "", preset_id="fake_scholarship")
    inv2 = provider.analyze_investigation("url", "", preset_id="phishing_link")
    inv3 = provider.analyze_investigation("image", "", preset_id="viral_misinformation")
    
    save_investigation(inv1)
    save_investigation(inv2)
    save_investigation(inv3)

    # Seed Radar Items
    radar_items = [
        {
            "id": "radar-101",
            "title": "Universal ₹50,000 Student Scholarship WhatsApp Alert",
            "category": "Fake Scholarship",
            "severity": "HIGH",
            "source": "WhatsApp Viral Groups",
            "timestamp": "10 mins ago",
            "summary": "Viral message offering ₹50k government grant directing students to unverified '.xyz' domain.",
            "preloaded_input": "Government launched ₹50,000 scholarship for all students. Applications close tomorrow! Apply at: http://govt-scholarship-scheme-2026-verify.xyz",
            "investigation_id": inv1["id"]
        },
        {
            "id": "radar-102",
            "title": "SBI Urgent KYC Account Block Warning SMS",
            "category": "Phishing",
            "severity": "CRITICAL",
            "source": "Smishing SMS Telecommunication Alerts",
            "timestamp": "25 mins ago",
            "summary": "Fraudulent banking SMS threatening account suspension within 24h with fake login link.",
            "preloaded_input": "Dear Customer, Your SBI Bank account will be blocked within 24 hours due to pending KYC update. Click here immediately to verify: http://sbi-kyc-update-portal-net.in/login",
            "investigation_id": inv2["id"]
        },
        {
            "id": "radar-103",
            "title": "2021 Flood Media Visual Recycled as Today's Dam Breach",
            "category": "Misinformation",
            "severity": "HIGH",
            "source": "Twitter/X Trending",
            "timestamp": "1 hour ago",
            "summary": "5-year old photo from Bangladesh re-captioned as an ongoing disaster in Assam.",
            "preloaded_input": "Breaking: Massive dam breach and flooding reported in Assam today! Shocking live visual from the site.",
            "investigation_id": inv3["id"]
        },
        {
            "id": "radar-104",
            "title": "Railway Recruitment Board Telegram Payment Demand Scam",
            "category": "Fake Job",
            "severity": "HIGH",
            "source": "Telegram Job Alert Channels",
            "timestamp": "2 hours ago",
            "summary": "Fraudulent direct-hiring job offer demanding ₹1,200 'document verification fee' via UPI.",
            "preloaded_input": "Direct Selection in Indian Railways RRB 2026! Salary ₹45,000/month. Pay registration fee ₹1,200 to secure hall ticket.",
            "investigation_id": None
        },
        {
            "id": "radar-105",
            "title": "Spoofed PIB Factcheck Handle Requesting OTPs",
            "category": "Impersonation",
            "severity": "MEDIUM",
            "source": "X/Twitter Direct Messages",
            "timestamp": "4 hours ago",
            "summary": "Account handle @PIB_Factcheck_Help impersonating official government fact-checking body.",
            "preloaded_input": "@PIB_Factcheck_Help - Send your mobile number and SMS verification code to verify your pension account status.",
            "investigation_id": None
        }
    ]

    for item in radar_items:
        save_radar_item(item)

if __name__ == "__main__":
    seed_initial_data()
    print("Seed data initialized successfully.")
