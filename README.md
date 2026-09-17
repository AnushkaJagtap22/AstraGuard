# अस्त्रGuard
### Detect. Verify. Protect.

**AI-Powered Digital Investigation & Safety Platform**

AstraGuard is designed to transform suspicious digital content into an evidence-backed investigation and actionable safety response.

---

## 🔄 Core Workflow

```text
ANY CONTENT
     ↓
INVESTIGATE
     ↓
ORCHESTRATE
     ↓
VERIFY
     ↓
CONNECT EVIDENCE
     ↓
EXPLAIN
     ↓
RESPOND
     ↓
PROTECT
```

---

## 🛡️ The Problem AstraGuard Solves

Modern web users encounter digital risks daily across messages, emails, social networks, and websites:

* 🚨 **Suspicious websites & fake domain names**
* 💸 **Scam messages & financial fraud solicitations**
* 💼 **Fraudulent remote job offers**
* 🎓 **Fake scholarship & admission grant schemes**
* 👥 **Impersonation & forged identities**
* 🔗 **Phishing links & credential harvesting portals**
* ⚠️ **Social engineering & artificial urgency tactics**
* 🖼️ **Manipulated media, deepfakes, & recycled visuals**

Traditional security tools often provide only a binary warning (`Block / Allow`) without context. AstraGuard instead focuses on providing a transparent, forensic explanation:

```text
What was detected?
Why is it concerning?
What evidence supports it?
What should the user verify?
What action can the user take?
```

---

## ✨ Key Features

### 🔍 Multi-Format AI Investigation
Analyze diverse digital content formats:
* 📄 **Text & Messages**: SMS, WhatsApp forwards, email text, social posts
* 🔗 **URLs & Links**: Web domain age, WHOIS records, SSL checks, domain spoofing
* 🖼️ **Screenshots & Images**: Reverse image search, archival media matching, OCR extraction
* 🎥 **Videos & Audio**: Deepfake audio probability analysis, visual keyframe analysis
* 📂 **Documents**: PDF letterhead verification, retired logo detection, fee payment checks
* 🌐 **Webpages**: Real-time content extraction via the browser extension

### 🤖 Multi-Agent AI Orchestration
AstraGuard uses a network of specialized AI agents working together in a coordinated pipeline:

* **Orchestrator Agent**: Plans the investigation strategy, assigns tasks, and synthesizes final reports.
* **Classifier Agent**: Categorizes input data type (Text, URL, Screenshot, Document, Video).
* **Claim Agent**: Extracts atomic, testable claims from submitted content.
* **Source Agent**: Cross-references claims against primary institutional indexes and government portals.
* **Context Agent**: Analyzes temporal urgency, pressure tactics, and historical context.
* **Threat Agent**: Identifies specific risk vectors (Phishing, Impersonation, Misinformation, Financial Scam).
* **Media Agent**: Checks image and video provenance, archival reuse, and synthetic manipulation.
* **Identity Agent**: Audits social handles, usernames, and organization credentials.
* **Evidence Agent**: Connects claims, sources, and threat signals into a relational graph.
* **Response Agent**: Recommends immediate protective actions and response protocols.

---

## 🕸️ Evidence Chain Architecture

AstraGuard prioritizes evidence before conclusions:

```text
Input
  ↓
Claim
  ↓
Evidence
  ↓
Source
  ↓
Support / Contradiction
  ↓
Assessment
```

Every investigation outcome is backed by verifiable evidence nodes and source relationships, avoiding ungrounded AI assertions.

---

## 🧩 Browser Extension

The AstraGuard Browser Extension provides an active safety layer while browsing:

```text
Browser Active Tab
        ↓
AstraGuard Extension
        ↓
Content Extraction
        ↓
Local Safety Scan
        ↓
AI Investigation API
        ↓
Evidence & Signals
        ↓
Safety Assessment Overlay
```

### Extension Capabilities:
* 🔍 **Scan Current Page**: Extracts active tab content and runs instant multi-agent analysis.
* 🚨 **Automatic Threat Alerts**: Prominently notifies users when high-risk indicators are detected.
* 📝 **Selected-Text Investigation**: Right-click or inspect selected text clips directly.
* 🔗 **Link Safety Verification**: Instant safety check for hyperlinked URLs.
* 🎓 **Interactive Demo Scenarios**: Built-in launcher for security testing simulations.
* 🔒 **Strict Privacy Protections**: Does NOT inspect passwords, OTPs, CVVs, card numbers, bank credentials, or private form values.

---

## 🧪 Simulation Demo Scenarios

AstraGuard includes controlled demonstration environments for testing and education:

| Route | Scenario Name | Description |
| :--- | :--- | :--- |
| `/demo/scholarship` | **ScholarConnect** | Student grant scheme with ₹999 registration fee & deadline pressure |
| `/demo/job-offer` | **CareerBridge** | High-paying remote data entry offer requiring equipment fee |
| `/demo/parcel` | **QuickShip Express** | Failed delivery SMS link requesting re-delivery address & card fee |
| `/demo/bank-alert` | **SecurePay Notice** | Account suspension notice directing to a spoofed bank login page |
| `/demo/admission` | **CampusApply Edu** | Provisional college seat allotment requiring instant lock fee |

*Note: All demo scenarios are simulated security-testing environments.*

---

## 📍 Application Routes

AstraGuard uses clean client-side routing:

| Route | Workspace / Page |
| :--- | :--- |
| `/` | **Dashboard** — Central intelligence command & search |
| `/investigate` | **Investigation Workspace** — Multi-format content analyzer |
| `/investigate/:investigationId` | **Dynamic Investigation Detail** — View case result by ID |
| `/identity` | **Identity Intelligence** — Social handle & entity audit |
| `/risk-radar` | **AI Risk Radar** — Real-time threat feed & landscape |
| `/evidence` | **Evidence Vault** — Forensic archive of cases & evidence graphs |
| `/evidence/:evidenceId` | **Evidence Detail View** — Interactive graph node inspection |
| `/history` | **Investigation History** — Past case logs & reports |
| `/assistant` | **Astra Assistant** — Interactive AI investigation assistant |
| `/police` | **Law Enforcement Portal** — Cybercrime helpline & emergency directory |
| `/incident` & `/incident/:incidentId` | **Incident Management** — Official report creation workflow |

---

## 🏗️ Architecture

```text
                    ┌─────────────────────┐
                    │      User           │
                    └──────────┬──────────┘
                               │
                ┌──────────────┴──────────────┐
                │                             │
        ┌───────▼────────┐            ┌───────▼────────┐
        │   Web App      │            │ Browser Ext.   │
        │   (React SPA)  │            │ (Manifest V3)  │
        └───────┬────────┘            └───────┬────────┘
                │                             │
                └──────────────┬──────────────┘
                               │
                       ┌───────▼────────┐
                       │  FastAPI Server│
                       └───────┬────────┘
                               │
                       ┌───────▼────────┐
                       │ AI Orchestrator│
                       └───────┬────────┘
                               │
             ┌─────────────────┼─────────────────┐
             │        │        │        │        │
             ▼        ▼        ▼        ▼        ▼
          Claims   Sources  Context  Threat   Identity
             │        │        │        │        │
             └────────┴────────┴────────┴────────┘
                               │
                       ┌───────▼────────┐
                       │ Evidence Layer │
                       └───────┬────────┘
                               │
                       ┌───────▼────────┐
                       │ Safety Result  │
                       └────────────────┘
```

---

## 🛠️ Technology Stack

* **Frontend**: React 18, Vite, Tailwind CSS, Lucide React, Framer Motion, React Router v6
* **Backend**: Python 3.10+, FastAPI, Uvicorn, SQLite
* **AI Orchestration**: Custom Multi-Agent Pipeline (Mistral / OpenAI integration supported)
* **Browser Extension**: Manifest V3, HTML5, Modular CSS3, ES6 JavaScript
---

## 🌐 Backend Deployment — Render

AstraGuard's FastAPI backend is configured for simple, production-grade deployment on **Render**:

### Deployment Configuration Summary:
* **Root Directory**: `backend`
* **Runtime**: `Python 3`
* **Build Command**: `pip install -r requirements.txt`
* **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
* **Health Check Path**: `/health`

### Required Environment Variables on Render:
| Variable Name | Value / Placeholder | Description |
| :--- | :--- | :--- |
| `HOST` | `0.0.0.0` | Binds to all network interfaces |
| `ENVIRONMENT` | `production` | Production environment flag |
| `CORS_ORIGINS` | `https://your-app.vercel.app` | Comma-separated allowed frontend domains |
| `MISTRAL_API_KEY` | `your_mistral_api_key_here` | Optional API key for Mistral LLM model |
| `OPENAI_API_KEY` | `your_openai_api_key_here` | Optional API key for OpenAI model fallback |

### 1-Click Render Blueprint Deployment:
A `render.yaml` Infrastructure-as-Code file is provided in the repository. Connect your GitHub repository to Render and click **New → Blueprint** to auto-deploy the service.

---

## 🚀 Local Development Setup

### 1. Clone the Repository
```bash
git clone https://github.com/AnushkaJagtap22/AstraGuard.git
cd AstraGuard
```

### 2. Configure Environment Variables
```bash
cp .env.example .env
```

### 3. Backend Setup (Python FastAPI)
```bash
cd backend
python -m venv venv
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
# source venv/bin/activate

pip install fastapi uvicorn pydantic requests
python main.py
```
*The FastAPI backend will start at `http://127.0.0.1:8000`.*

### 4. Frontend Setup (React Vite)
Open a new terminal window:
```bash
cd frontend
npm install
npm run dev
```
*The React web application will start at `http://localhost:5176`.*

---

## 🧩 Browser Extension Installation

To install the browser extension in developer mode:

1. Open **Google Chrome** or **Microsoft Edge**.
2. Navigate to `chrome://extensions` (or `edge://extensions`).
3. Enable **Developer mode** using the toggle switch in the top-right corner.
4. Click **Load unpacked**.
5. Select the `extension/` folder inside the `AstraGuard` project directory.
6. Pin **अस्त्रGuard** to your browser toolbar.

---

## 🔒 Privacy & Security Principles

AstraGuard adheres to a strict **minimum-data privacy approach**:

* 🚫 **No Password Inspection**: Password input fields are explicitly ignored by content scripts.
* 🚫 **No Financial Credential Collection**: Credit card numbers, CVVs, and banking passwords are never read or stored.
* 🚫 **No Unnecessary Browsing History Uploads**: AstraGuard only scans the specific page or content explicitly requested by the user.
* 🛡️ **Uncertainty Disclosure**: If evidence is inconclusive, AstraGuard discloses low confidence rather than fabricating certainty.

---

## 🚨 Police & Incident Management Workflow

AstraGuard supports generating incident reports for cybercrime authorities:

```text
Suspicious Content
       ↓
Investigation Result
       ↓
Generate Report
       ↓
Incident Report ID
       ↓
Simulated Law Enforcement Portal (/police)
       ↓
Case Escalation
```

*Note: The police environment is a DEMO / SIMULATED LAW-ENFORCEMENT ENVIRONMENT for incident filing demonstrations.*

---

## 📁 Project Directory Tree

```text
AstraGuard/
├── backend/
│   ├── agents/            # Multi-agent AI implementations
│   ├── routers/           # FastAPI API endpoints
│   ├── services/          # AI provider & investigation services
│   ├── database.py        # SQLite database connection & schema
│   ├── main.py            # FastAPI application entry point
│   ├── schemas.py         # Pydantic data schemas
│   └── seed_data.py       # Seed data generator
├── extension/
│   ├── manifest.json      # Manifest V3 extension configuration
│   ├── icons/             # AstraGuard security mark branding assets
│   └── src/
│       ├── background/    # Service worker background logic
│       ├── content/       # Page content extraction scripts
│       └── popup/         # Extension popup HTML, CSS, JS
├── frontend/
│   ├── public/            # Static assets & brand icons
│   ├── src/
│   │   ├── components/    # Reusable UI components & Sidebar
│   │   ├── lib/           # Demo datasets & utility functions
│   │   ├── pages/         # Page views & Standalone Demos
│   │   ├── App.jsx        # Root application & React Router setup
│   │   ├── main.jsx       # React entry point
│   │   └── routes.js      # Central route definitions
│   ├── package.json       # Frontend dependencies & scripts
│   ├── vite.config.js     # Vite configuration
│   └── vercel.json        # SPA deployment rewrites
├── .env.example           # Environment variables template
├── .gitignore             # Git ignore rules
├── vercel.json            # Root deployment rewrites
└── README.md              # AstraGuard platform documentation
```

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](file:///c:/Users/Anushka/Documents/ANUSHKA/AstraGuard/LICENSE) file for details.
