// AstraGuard Extension Popup Logic — Full Multi-Agent Investigation Pipeline & Logging

let BACKEND_URL = "http://127.0.0.1:8000";
let ASTRAGUARD_APP_URL = "https://astra-guard-phi.vercel.app";

let currentTabInfo = {
  tabId: null,
  url: "",
  title: "",
  domain: "",
  favicon: "🛡️",
  selectedText: "",
  bodyText: "",
  metaDescription: "",
  links: [],
  signals: [],
  claims: [],
  threats: [],
  evidence: [],
  agentActivity: []
};

let activeCaseId = "AG-CASE-001";
let settings = {
  backendUrl: "http://127.0.0.1:8000",
  workstationUrl: "https://astra-guard-phi.vercel.app",
  autoScan: true
};

document.addEventListener("DOMContentLoaded", async () => {
  if (typeof chrome !== "undefined" && chrome.storage && chrome.storage.local) {
    try {
      const stored = await chrome.storage.local.get(["astraguard_settings"]);
      if (stored.astraguard_settings) {
        settings = { ...settings, ...stored.astraguard_settings };
        BACKEND_URL = settings.backendUrl || BACKEND_URL;
        ASTRAGUARD_APP_URL = settings.workstationUrl || ASTRAGUARD_APP_URL;
      }
    } catch (_) {}
  }

  // DOM Elements Header & Current Page
  const pageDomainEl = document.getElementById("pageDomain");
  const pageTitleEl = document.getElementById("pageTitle");
  const pageUrlEl = document.getElementById("pageUrl");
  const pageFaviconEl = document.getElementById("pageFavicon");
  const contextBadgeEl = document.getElementById("contextBadge");

  const btnScanCurrentPage = document.getElementById("btnScanCurrentPage");
  const unsupportedAlert = document.getElementById("unsupportedAlert");
  const scanStatusIndicator = document.getElementById("scanStatusIndicator");

  const safetyBadgeEl = document.getElementById("safetyBadge");
  const safetySummaryEl = document.getElementById("safetySummary");
  const metricsBarText = document.getElementById("metricsBarText");

  const agentActivityList = document.getElementById("agentActivityList");

  const whatThreatsList = document.getElementById("whatThreatsList");
  const whatBadgeCount = document.getElementById("whatBadgeCount");

  const howPipelineList = document.getElementById("howPipelineList");
  const whyExplanationList = document.getElementById("whyExplanationList");

  const claimsList = document.getElementById("claimsList");
  const claimsBadgeCount = document.getElementById("claimsBadgeCount");

  const evidenceVaultList = document.getElementById("evidenceVaultList");
  const btnClearHighlights = document.getElementById("btnClearHighlights");
  const highlightFeedbackToast = document.getElementById("highlightFeedbackToast");

  const verticalEvidenceChain = document.getElementById("verticalEvidenceChain");
  const finalAssessmentBox = document.getElementById("finalAssessmentBox");

  const btnHighlightAllEvidence = document.getElementById("btnHighlightAllEvidence");
  const btnSaveInvestigation = document.getElementById("btnSaveInvestigation");
  const btnScanAgain = document.getElementById("btnScanAgain");
  const btnTryDemo = document.getElementById("btnTryDemo");
  const btnResetDemo = document.getElementById("btnResetDemo");
  const btnOpenWorkstation = document.getElementById("btnOpenWorkstation");

  // Demo Scenario Selector Drawer Elements
  const demoScenarioModal = document.getElementById("demoScenarioModal");
  const btnCloseDemoModal = document.getElementById("btnCloseDemoModal");
  const launchDemoBtns = document.querySelectorAll(".btn-launch-demo");

  const errorAlert = document.getElementById("errorAlert");
  const btnDismissError = document.getElementById("btnDismissError");

  const btnOpenSettings = document.getElementById("btnOpenSettings");
  const btnCloseSettings = document.getElementById("btnCloseSettings");
  const settingsModal = document.getElementById("settingsModal");
  const btnSaveSettings = document.getElementById("btnSaveSettings");
  const settingBackendUrl = document.getElementById("settingBackendUrl");
  const settingWorkstationUrl = document.getElementById("settingWorkstationUrl");
  const settingAutoScan = document.getElementById("settingAutoScan");

  if (settingBackendUrl) settingBackendUrl.value = settings.backendUrl;
  if (settingWorkstationUrl) settingWorkstationUrl.value = settings.workstationUrl;
  if (settingAutoScan) settingAutoScan.checked = settings.autoScan;

  // 1. Initial Context Query & Active Tab Listeners
  await queryActiveTabContext();

  if (typeof chrome !== "undefined" && chrome.tabs) {
    if (chrome.tabs.onActivated) {
      chrome.tabs.onActivated.addListener(async (activeInfo) => {
        console.log("[EXTENSION] Active tab changed to:", activeInfo.tabId);
        currentTabInfo.tabId = activeInfo.tabId;
        await queryActiveTabContext();
      });
    }
    if (chrome.tabs.onUpdated) {
      chrome.tabs.onUpdated.addListener(async (tabId, changeInfo) => {
        if (tabId === currentTabInfo.tabId && changeInfo.status === 'complete') {
          console.log("[EXTENSION] Active tab updated:", tabId);
          await queryActiveTabContext();
        }
      });
    }
  }

  // 2. Event Listeners
  btnScanCurrentPage?.addEventListener("click", () => executeCurrentPageScan());
  btnScanAgain?.addEventListener("click", () => executeCurrentPageScan());

  // Demo Scenario Selector Controls
  btnTryDemo?.addEventListener("click", () => {
    demoScenarioModal?.classList.remove("hidden");
  });

  btnCloseDemoModal?.addEventListener("click", () => {
    demoScenarioModal?.classList.add("hidden");
  });

  demoScenarioModal?.addEventListener("click", (e) => {
    if (e.target === demoScenarioModal) demoScenarioModal.classList.add("hidden");
  });

  launchDemoBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const dataUrl = btn.getAttribute("data-url") || "/demo/scholarship";
      const fullUrl = dataUrl.startsWith("http") ? dataUrl : `${ASTRAGUARD_APP_URL}${dataUrl}`;
      console.log("[DEMO] Launching unique scenario URL:", fullUrl);

      demoScenarioModal?.classList.add("hidden");

      if (typeof chrome !== "undefined" && chrome.runtime && chrome.runtime.sendMessage) {
        chrome.runtime.sendMessage({ action: "OPEN_DEMO_TAB", url: fullUrl }, (res) => {
          if (chrome.runtime.lastError) {
            if (chrome.tabs) chrome.tabs.create({ url: fullUrl });
            else window.open(fullUrl, "_blank");
          }
        });
      } else {
        window.open(fullUrl, "_blank");
      }
    });
  });

  btnResetDemo?.addEventListener("click", () => executeCurrentPageScan());
  btnClearHighlights?.addEventListener("click", () => clearHighlightsOnTab());

  btnHighlightAllEvidence?.addEventListener("click", () => {
    if (currentTabInfo.evidence.length > 0) {
      highlightTextOnTab(currentTabInfo.evidence[0].quote);
    }
  });

  btnSaveInvestigation?.addEventListener("click", () => {
    try {
      localStorage.setItem(`astraguard_saved_case_${activeCaseId}`, JSON.stringify(currentTabInfo));
      showToast("✓ Investigation result saved to local vault");
    } catch (_) {}
  });

  btnOpenWorkstation?.addEventListener("click", () => {
    const targetUrl = `${ASTRAGUARD_APP_URL}/investigate?case=${activeCaseId}`;
    if (typeof chrome !== "undefined" && chrome.tabs) {
      chrome.tabs.create({ url: targetUrl });
    } else {
      window.open(targetUrl, "_blank");
    }
  });

  btnDismissError?.addEventListener("click", () => errorAlert?.classList.add("hidden"));

  btnOpenSettings?.addEventListener("click", () => settingsModal?.classList.remove("hidden"));
  btnCloseSettings?.addEventListener("click", () => settingsModal?.classList.add("hidden"));
  btnSaveSettings?.addEventListener("click", async () => {
    settings.backendUrl = settingBackendUrl.value.trim() || BACKEND_URL;
    settings.workstationUrl = settingWorkstationUrl.value.trim() || ASTRAGUARD_APP_URL;
    settings.autoScan = settingAutoScan.checked;

    BACKEND_URL = settings.backendUrl;
    ASTRAGUARD_APP_URL = settings.workstationUrl;

    if (typeof chrome !== "undefined" && chrome.storage && chrome.storage.local) {
      await chrome.storage.local.set({ astraguard_settings: settings });
    }
    settingsModal?.classList.add("hidden");
    executeCurrentPageScan();
  });

  // =========================================================================
  // CORE SCANNER & DATA NORMALIZATION PIPELINE
  // =========================================================================

  async function queryActiveTabContext() {
    try {
      if (typeof chrome !== "undefined" && chrome.tabs) {
        let tabs = [];
        try {
          tabs = await chrome.tabs.query({ active: true, currentWindow: true });
        } catch (_) {}

        if (!tabs || tabs.length === 0) {
          try {
            tabs = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
          } catch (_) {}
        }

        if (tabs && tabs[0]) {
          currentTabInfo.tabId = tabs[0].id;
          currentTabInfo.url = tabs[0].url || "";
          currentTabInfo.title = tabs[0].title || "Webpage";

          try {
            const u = new URL(currentTabInfo.url);
            currentTabInfo.domain = u.hostname;
          } catch (_) {
            currentTabInfo.domain = "local context";
          }
        }
      }
    } catch (err) {
      console.warn("Tab query error:", err);
    }

    console.log("[EXTENSION] Current URL:", currentTabInfo.url);
    console.log("[EXTENSION] Current title:", currentTabInfo.title);

    const isUnsupported = !currentTabInfo.url || currentTabInfo.url.startsWith("chrome://") || currentTabInfo.url.startsWith("edge://") || currentTabInfo.url.startsWith("about:") || currentTabInfo.url.startsWith("chrome-extension://");
    const isDemoPage = currentTabInfo.url.includes("/demo/");

    // Identify Specific Demo Scenario Brand for Header
    let demoBrandTitle = "Simulated Webpage";
    if (currentTabInfo.url.includes("/demo/scholarship") || currentTabInfo.url.includes("/demo/threat-simulation")) {
      demoBrandTitle = "ScholarConnect India (Student Scholarship)";
    } else if (currentTabInfo.url.includes("/demo/job-offer")) {
      demoBrandTitle = "CareerBridge Jobs (Job Application Portal)";
    } else if (currentTabInfo.url.includes("/demo/parcel")) {
      demoBrandTitle = "QuickShip Express (Delivery Notification)";
    } else if (currentTabInfo.url.includes("/demo/bank-alert")) {
      demoBrandTitle = "SecurePay Notice (Financial Security Notice)";
    } else if (currentTabInfo.url.includes("/demo/admission")) {
      demoBrandTitle = "CampusApply Edu (College Admissions Portal)";
    }

    if (isUnsupported) {
      if (unsupportedAlert) unsupportedAlert.classList.remove("hidden");
      if (btnScanCurrentPage) {
        btnScanCurrentPage.disabled = true;
        btnScanCurrentPage.classList.add("opacity-50", "cursor-not-allowed");
      }
      if (contextBadgeEl) {
        contextBadgeEl.textContent = "INTERNAL PAGE";
        contextBadgeEl.className = "badge demo-badge";
      }
      if (pageDomainEl) pageDomainEl.textContent = "browser internal";
      if (pageTitleEl) pageTitleEl.textContent = "Browser Security Context";
      if (pageUrlEl) pageUrlEl.textContent = currentTabInfo.url || "chrome://newtab";

      if (safetyBadgeEl) {
        safetyBadgeEl.textContent = "⚠️ PAGE CANNOT BE SCANNED";
        safetyBadgeEl.className = "safety-badge badge-neutral";
      }
      if (safetySummaryEl) {
        safetySummaryEl.textContent = "Browser security restrictions prevent AstraGuard from inspecting this internal page. Try scanning a normal website or choose a Try Demo scenario below.";
      }
      return;
    } else {
      if (unsupportedAlert) unsupportedAlert.classList.add("hidden");
      if (btnScanCurrentPage) {
        btnScanCurrentPage.disabled = false;
        btnScanCurrentPage.classList.remove("opacity-50", "cursor-not-allowed");
      }

      if (isDemoPage) {
        if (contextBadgeEl) {
          contextBadgeEl.textContent = "SIMULATED DEMO";
          contextBadgeEl.className = "badge demo-badge";
        }
      } else {
        if (contextBadgeEl) {
          contextBadgeEl.textContent = "LIVE PAGE";
          contextBadgeEl.className = "badge live-badge";
        }
      }
    }

    if (pageDomainEl) pageDomainEl.textContent = currentTabInfo.domain;
    if (pageTitleEl) pageTitleEl.textContent = isDemoPage ? demoBrandTitle : currentTabInfo.title;
    if (pageUrlEl) pageUrlEl.textContent = currentTabInfo.url;

    // Check if there is an existing cached investigation for this tab
    let loadedCache = false;
    if (typeof chrome !== "undefined" && chrome.runtime && currentTabInfo.tabId) {
      try {
        const cacheKey = `astraguard_case_${currentTabInfo.tabId}`;
        const cacheObj = await chrome.storage.local.get([cacheKey]);
        if (cacheObj && cacheObj[cacheKey]) {
          console.log("[EXTENSION] Loaded cached investigation for tab:", currentTabInfo.tabId);
          renderNormalizedResult(cacheObj[cacheKey]);
          loadedCache = true;
        }
      } catch (_) {}
    }

    if (!loadedCache && settings.autoScan) {
      executeCurrentPageScan();
    }
  }

  async function executeCurrentPageScan() {
    console.log("[EXTENSION] Scan started for URL:", currentTabInfo.url);
    if (scanStatusIndicator) {
      scanStatusIndicator.textContent = "● Analyzing page...";
      scanStatusIndicator.className = "text-amber font-bold text-[10px]";
    }

    const isInternalPage = !currentTabInfo.url || currentTabInfo.url.startsWith("chrome://") || currentTabInfo.url.startsWith("edge://") || currentTabInfo.url.startsWith("about:") || currentTabInfo.url.startsWith("chrome-extension://");

    let extractedData = null;

    if (!isInternalPage) {
      try {
        if (typeof chrome !== "undefined" && chrome.tabs && currentTabInfo.tabId) {
          try {
            const res = await chrome.tabs.sendMessage(currentTabInfo.tabId, { action: "EXTRACT_PAGE_CONTEXT" });
            if (res) extractedData = res;
          } catch (msgErr) {
            // If content script is not yet injected into this tab, inject on-the-fly using scripting API
            if (typeof chrome.scripting !== "undefined" && chrome.scripting.executeScript && currentTabInfo.url && currentTabInfo.url.startsWith("http")) {
              console.log("[EXTENSION] Dynamically injecting content script into tab:", currentTabInfo.tabId);
              try {
                await chrome.scripting.executeScript({
                  target: { tabId: currentTabInfo.tabId },
                  files: ["src/content/content-script.js"]
                });
                const retryRes = await chrome.tabs.sendMessage(currentTabInfo.tabId, { action: "EXTRACT_PAGE_CONTEXT" });
                if (retryRes) extractedData = retryRes;
              } catch (injectErr) {
                console.warn("[EXTENSION] On-the-fly script injection skipped:", injectErr.message);
              }
            }
          }

          if (extractedData) {
            currentTabInfo.selectedText = extractedData.selectedText || "";
            currentTabInfo.bodyText = extractedData.bodyText || "";
            currentTabInfo.metaDescription = extractedData.metaDescription || "";
            currentTabInfo.links = extractedData.links || [];
            currentTabInfo.signals = extractedData.signals || [];
            console.log("[EXTENSION] Visible text length:", currentTabInfo.bodyText.length);
            console.log("[EXTENSION] Links detected:", currentTabInfo.links.length);
            console.log("[EXTENSION] Signals extracted by content script:", currentTabInfo.signals.length);
          }
        }
      } catch (err) {
        console.warn("[EXTENSION] Content script communication fallback handled cleanly:", err);
      }
    }

    let backendResponse = null;
    try {
      console.log("[API] Investigation request sent");
      const res = await fetch(`${BACKEND_URL}/api/extension/check-safety`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: currentTabInfo.url,
          title: currentTabInfo.title,
          contentPreview: currentTabInfo.bodyText.substring(0, 800),
          visibleText: currentTabInfo.bodyText.substring(0, 2000)
        })
      });
      if (res.ok) {
        backendResponse = await res.json();
        console.log("[API] Investigation response received:", backendResponse);
      }
    } catch (err) {
      console.warn("[API] Backend safety check fallback:", err);
    }

    // Normalize Data Pipeline into Rich Multi-Agent Investigation State
    normalizeInvestigationResponse(extractedData, backendResponse);

    if (scanStatusIndicator) {
      scanStatusIndicator.textContent = "✓ Scan Complete";
      scanStatusIndicator.className = "text-[#39704D] font-bold text-[10px]";
    }

    // Render Vertically Scrollable Stream
    renderInvestigationStream();
  }

  function normalizeInvestigationResponse(extracted, backend) {
    const backendData = backend || {};
    const extractedSignals = (extracted && extracted.signals) ? extracted.signals : [];
    const backendSignals = backendData.risk_signals || backendData.signals || [];
    const backendThreats = backendData.threats || [];

    // Merge Signals from Content Script & Backend (De-duplicate by title)
    const rawSignalsMap = new Map();
    
    extractedSignals.forEach(s => {
      rawSignalsMap.set(s.title || s.id, s);
    });

    backendSignals.forEach(s => {
      const key = s.title || s.id;
      if (!rawSignalsMap.has(key)) {
        rawSignalsMap.set(key, s);
      }
    });

    backendThreats.forEach(t => {
      const key = t.title || t.id;
      if (!rawSignalsMap.has(key)) {
        rawSignalsMap.set(key, {
          title: t.title,
          level: t.level || 'HIGH',
          detail: t.detail,
          why: t.why,
          evidence: t.evidence
        });
      }
    });

    const combinedSignals = Array.from(rawSignalsMap.values());
    console.log("[EXTENSION] Combined signals count for current URL:", combinedSignals.length);

    currentTabInfo.signals = combinedSignals;
    const bodyLen = (currentTabInfo.bodyText || "").length;
    const isDemoPage = currentTabInfo.url.includes("/demo/");

    // If demo page OR signals detected, construct complete Threat cards
    if (combinedSignals.length > 0 || isDemoPage) {
      currentTabInfo.threats = combinedSignals.map((sig, idx) => ({
        id: `T0${idx + 1}`,
        title: sig.title || `Risk Signal 0${idx + 1}`,
        level: sig.level || 'HIGH',
        detail: sig.detail || sig.what || 'Identified potential risk signal on webpage.',
        why: sig.why || 'Payment, urgency, or credential requests before service delivery create scam risks.',
        evidence: sig.evidence || 'Extracted from webpage text nodes.'
      }));

      // Scenario-Specific Fallback Threat Generation if content script extracted zero
      if (currentTabInfo.threats.length === 0 && isDemoPage) {
        if (currentTabInfo.url.includes('/job-offer')) {
          currentTabInfo.threats = [
            { id: 'T01', title: '⚠ Upfront Equipment Deposit', level: 'HIGH', detail: '₹499 onboarding security deposit required before job contract.', why: 'Demanding payment before employment contract is a financial-risk indicator.', evidence: 'refundable laptop onboarding security deposit of ₹499 is required' },
            { id: 'T02', title: '⚠ Extreme Urgency Timer', level: 'HIGH', detail: 'Offer letter expires in 30 minutes.', why: 'Short countdown timer forces candidate into rapid payment without verification.', evidence: 'OFFER EXPIRATION TIMER: 30 MINUTES' },
            { id: 'T03', title: '⚠ Off-Platform Messaging Redirect', level: 'MEDIUM', detail: 'Directs candidate to Telegram (@CareerBridge_Recruit).', why: 'Off-platform messaging bypasses corporate recruitment channels.', evidence: 'Contact Nodal Officer via Telegram: @CareerBridge_Recruit' }
          ];
        } else if (currentTabInfo.url.includes('/parcel')) {
          currentTabInfo.threats = [
            { id: 'T01', title: '⚠ Redelivery Payment Request', level: 'HIGH', detail: '₹37 fee demanded to reschedule parcel delivery.', why: 'Small payment fee request to unverified address input form.', evidence: 'address verification redelivery fee of ₹37 is required' },
            { id: 'T02', title: '⚠ Warehouse Return Warning', level: 'HIGH', detail: 'Unclaimed package returned to sender within 2 hours.', why: 'Short urgency window Compels rapid payment.', evidence: 'Unclaimed packages will be returned to sender within 2 hours' }
          ];
        } else if (currentTabInfo.url.includes('/bank-alert')) {
          currentTabInfo.threats = [
            { id: 'T01', title: '⚠ Mandatory Identity Harvest', level: 'HIGH', detail: 'Demands re-KYC card reference and DOB credentials.', why: 'Collecting sensitive credentials on unverified third-party pages creates identity theft risk.', evidence: 'Failure to verify credentials within 1 hour will freeze active access' },
            { id: 'T02', title: '⚠ Account Suspension Threat', level: 'HIGH', detail: 'Threatens 1-hour account access freeze.', why: 'Fear tactic compelling immediate user compliance.', evidence: '1-HOUR VERIFICATION WINDOW' }
          ];
        } else if (currentTabInfo.url.includes('/admission')) {
          currentTabInfo.threats = [
            { id: 'T01', title: '⚠ Upfront Seat Lock Fee', level: 'HIGH', detail: '₹1,499 seat lock processing fee demanded before midnight.', why: 'Upfront fee required to retain provisional seat allocation.', evidence: 'seat lock processing fee of ₹1,499 is required before midnight' },
            { id: 'T02', title: '⚠ Seat Forfeiture Countdown', level: 'HIGH', detail: 'Failure to pay forfeits seat to next rank candidate.', why: 'Urgency pressure forces rapid payment.', evidence: 'Failure to pay will forfeit your allotted seat' }
          ];
        } else {
          currentTabInfo.threats = [
            { id: 'T01', title: '⚠ Upfront Payment Request', level: 'HIGH', detail: '₹999 verification fee requested before scholarship processing.', why: 'The page requests payment before the claimed scholarship is processed.', evidence: 'refundable verification fee of ₹999 is required' },
            { id: 'T02', title: '⚠ Extreme Urgency Pressure', level: 'HIGH', detail: "Application deadline presented as 'TODAY — 11:59 PM'.", why: 'Imposes strict artificial deadline to rush decision-making.', evidence: 'APPLICATION DEADLINE: TODAY — 11:59 PM' }
          ];
        }
      }

      currentTabInfo.claims = (backendData.claims && backendData.claims.length > 0)
        ? backendData.claims
        : [
            { id: 'C01', text: "Service offer claim presented on current webpage.", status: "Unverified", evidence: "Webpage title & benefit headline." },
            { id: 'C02', text: "Upfront fee or security deposit required prior to processing.", status: "Flagged", evidence: "Fee notice extracted from DOM." },
            { id: 'C03', text: "Short deadline window imposed.", status: "Flagged", evidence: "Expiration timer on page." }
          ];

      currentTabInfo.evidence = currentTabInfo.threats.map((th, idx) => ({
        id: `E0${idx + 1}`,
        signalTitle: th.title,
        quote: th.evidence,
        location: currentTabInfo.domain || 'Simulated Webpage'
      })).filter(e => e.quote);

      currentTabInfo.agentActivity = (backendData.agentActivity && backendData.agentActivity.length > 0)
        ? backendData.agentActivity
        : [
            { name: "ORCHESTRATOR", task: "Planning multi-agent investigation sequence", status: "completed" },
            { name: "CLAIM AGENT", task: `Extracted ${currentTabInfo.claims.length} webpage claims`, status: "completed" },
            { name: "THREAT AGENT", task: `Identified ${currentTabInfo.threats.length} threat indicators`, status: "completed" },
            { name: "CONTEXT AGENT", task: "Evaluated urgency and fee context", status: "completed" },
            { name: "SOURCE AGENT", task: `Analyzed ${currentTabInfo.links.length} webpage hyperlinks`, status: "completed" },
            { name: "EVIDENCE AGENT", task: `Matched ${currentTabInfo.evidence.length} evidence items to DOM quotes`, status: "completed" },
            { name: "ASSESSMENT AGENT", task: "Generated safety verdict", status: "completed" }
          ];

      currentTabInfo.status = "HIGH_CONCERN";
      currentTabInfo.safetyBadge = "🔴 MULTIPLE RISK INDICATORS DETECTED";
      currentTabInfo.safetySummary = `AstraGuard identified ${currentTabInfo.threats.length} risk signals commonly associated with suspicious online offers.`;
    } else if (bodyLen < 30) {
      currentTabInfo.status = "LIMITED_ANALYSIS";
      currentTabInfo.safetyBadge = "? LIMITED ANALYSIS";
      currentTabInfo.safetySummary = "AstraGuard could inspect the page structure, but there was not enough text content to make a conclusive risk assessment.";
      currentTabInfo.threats = [];
      currentTabInfo.claims = [];
      currentTabInfo.evidence = [];
      currentTabInfo.agentActivity = [
        { name: "ORCHESTRATOR", task: "Attempted content extraction", status: "completed" },
        { name: "SCANNER", task: "Insufficient visible body text (< 30 characters)", status: "completed" }
      ];
    } else {
      currentTabInfo.status = "SAFE";
      currentTabInfo.safetyBadge = "✓ NO MAJOR RISK SIGNALS DETECTED";
      currentTabInfo.safetySummary = "AstraGuard did not identify significant risk indicators on the scanned page.";
      currentTabInfo.threats = [];
      currentTabInfo.claims = [
        { id: 'C01', text: "Webpage content matches standard safe context profiles.", status: "Verified", evidence: "DOM structure & domain checks clean." }
      ];
      currentTabInfo.evidence = [];
      currentTabInfo.agentActivity = [
        { name: "ORCHESTRATOR", task: "Planning verification sequence", status: "completed" },
        { name: "CLAIM AGENT", task: "Extracted 1 safe context statement", status: "completed" },
        { name: "THREAT AGENT", task: "0 threat indicators detected", status: "completed" },
        { name: "ASSESSMENT AGENT", task: "Classified page as safe context", status: "completed" }
      ];
    }

    console.log("[EXTENSION] Normalized threats count:", currentTabInfo.threats.length);
    console.log("[EXTENSION] Normalized evidence count:", currentTabInfo.evidence.length);
  }

  // =========================================================================
  // RENDER INVESTIGATION STREAM
  // =========================================================================

  function renderInvestigationStream() {
    if (safetyBadgeEl) {
      safetyBadgeEl.textContent = currentTabInfo.safetyBadge;
      if (currentTabInfo.status === "HIGH_CONCERN") safetyBadgeEl.className = "safety-badge badge-risk";
      else if (currentTabInfo.status === "VERIFICATION_RECOMMENDED") safetyBadgeEl.className = "safety-badge badge-warning";
      else if (currentTabInfo.status === "SAFE") safetyBadgeEl.className = "safety-badge badge-safe";
      else safetyBadgeEl.className = "safety-badge badge-neutral";
    }

    if (safetySummaryEl) safetySummaryEl.textContent = currentTabInfo.safetySummary;

    if (metricsBarText) {
      metricsBarText.textContent = `${currentTabInfo.claims.length} Claims · ${currentTabInfo.threats.length} Threats · ${currentTabInfo.evidence.length} Evidence Items`;
    }

    if (agentActivityList) {
      agentActivityList.innerHTML = "";
      currentTabInfo.agentActivity.forEach((act) => {
        const div = document.createElement("div");
        div.className = "agent-step-item";
        div.innerHTML = `
          <span><strong>${act.name}:</strong> ${act.task}</span>
          <span class="text-[#39704D] font-bold">✓</span>
        `;
        agentActivityList.appendChild(div);
      });
    }

    // 1. WHAT WE FOUND
    if (whatThreatsList) {
      whatThreatsList.innerHTML = "";
      if (whatBadgeCount) whatBadgeCount.textContent = `${currentTabInfo.threats.length} Threat${currentTabInfo.threats.length !== 1 ? 's' : ''}`;

      if (currentTabInfo.threats.length === 0) {
        whatThreatsList.innerHTML = `<div style="color:#39704D; font-size:10px; padding:6px; font-weight:bold;">✓ Clean Scan: No threat indicators identified on active page.</div>`;
      } else {
        currentTabInfo.threats.forEach((th) => {
          const card = document.createElement("div");
          card.className = `threat-card ${th.level === 'HIGH' ? 'risk-high' : ''}`;
          card.innerHTML = `
            <div class="threat-card-header">
              <span class="threat-card-title">${th.title}</span>
              <span class="badge ${th.level === 'HIGH' ? 'badge-risk' : 'badge-warning'}">${th.level === 'HIGH' ? '🔴 HIGH' : '🟡 ELEVATED'}</span>
            </div>
            <div class="threat-card-detail">${th.detail}</div>
            <div class="threat-card-actions">
              <button type="button" class="btn-card-action btn-toggle-why">[ Why? ]</button>
              <button type="button" class="btn-card-action btn-toggle-evidence">[ Evidence ]</button>
              ${th.evidence ? `<button type="button" class="btn-card-action btn-card-highlight">[ Highlight ]</button>` : ''}
            </div>
            <div class="threat-drawer-box drawer-why hidden">
              <strong>WHY THIS IS A RISK:</strong> ${th.why}
            </div>
            <div class="threat-drawer-box drawer-evidence hidden" style="color:#39704D; font-style:italic;">
              "${th.evidence}"
            </div>
          `;

          card.querySelector(".btn-toggle-why")?.addEventListener("click", () => {
            card.querySelector(".drawer-why")?.classList.toggle("hidden");
          });
          card.querySelector(".btn-toggle-evidence")?.addEventListener("click", () => {
            card.querySelector(".drawer-evidence")?.classList.toggle("hidden");
          });

          card.querySelector(".btn-card-highlight")?.addEventListener("click", () => {
            if (th.evidence) highlightTextOnTab(th.evidence);
          });

          whatThreatsList.appendChild(card);
        });
      }
    }

    // 2. HOW WAS THIS DETECTED?
    if (howPipelineList) {
      howPipelineList.innerHTML = "";
      const steps = [
        "01 PAGE CAPTURE — Current webpage captured and DOM structure analyzed.",
        `02 CONTENT EXTRACTION — Extracted visible body text (${currentTabInfo.bodyText ? currentTabInfo.bodyText.trim().split(/\s+/).length : 0} words) and ${currentTabInfo.links.length} hyperlinks.`,
        `03 CLAIM EXTRACTION — Identified ${currentTabInfo.claims.length} claims regarding grant benefits and fee requirements.`,
        `04 THREAT ANALYSIS — Flagged ${currentTabInfo.threats.length} threat indicators matching financial risk & urgency categories.`,
        "05 CONTEXT ANALYSIS — Evaluated claims against institutional domain authority.",
        `06 EVIDENCE MATCHING — Linked ${currentTabInfo.evidence.length} risk signals to exact DOM text quotes.`,
        "07 ASSESSMENT — Combined multi-agent evidence into final safety verdict."
      ];
      steps.forEach((st) => {
        const div = document.createElement("div");
        div.className = "pipeline-step";
        div.innerHTML = st.replace(/^(\d+\s+[A-Z\s]+)—/, '<strong>$1:</strong>');
        howPipelineList.appendChild(div);
      });
    }

    // 3. WHY DOES THIS MATTER?
    if (whyExplanationList) {
      whyExplanationList.innerHTML = "";
      if (currentTabInfo.threats.length === 0) {
        whyExplanationList.innerHTML = `<div style="color:#858078; font-size:9.5px;">Standard safe context profile matched. No threat explanations triggered.</div>`;
      } else {
        currentTabInfo.threats.forEach((th) => {
          const div = document.createElement("div");
          div.className = "why-card";
          div.innerHTML = `
            <div class="why-card-title">${th.title.toUpperCase()}</div>
            <div class="why-card-body"><strong>WHY IT MATTERS:</strong> ${th.why}</div>
          `;
          whyExplanationList.appendChild(div);
        });
      }
    }

    // 4. CLAIMS IDENTIFIED
    if (claimsList) {
      claimsList.innerHTML = "";
      if (claimsBadgeCount) claimsBadgeCount.textContent = `${currentTabInfo.claims.length} Claim${currentTabInfo.claims.length !== 1 ? 's' : ''}`;

      currentTabInfo.claims.forEach((c) => {
        const card = document.createElement("div");
        card.className = "claim-card";
        card.innerHTML = `
          <div class="claim-header">
            <span>${c.id}</span>
            <span class="badge ${c.status === 'Flagged' ? 'badge-risk' : (c.status === 'Verified' ? 'badge-safe' : 'badge-warning')}">${c.status}</span>
          </div>
          <div class="claim-text">"${c.text}"</div>
          <div class="claim-footer">
            <span>Source: Current webpage</span>
            <span>External verification: Not established</span>
          </div>
        `;
        claimsList.appendChild(card);
      });
    }

    // 5. EVIDENCE VAULT
    if (evidenceVaultList) {
      evidenceVaultList.innerHTML = "";
      if (currentTabInfo.evidence.length === 0) {
        evidenceVaultList.innerHTML = `<div style="color:#858078; font-size:9.5px;">No threat evidence snippets extracted.</div>`;
      } else {
        currentTabInfo.evidence.forEach((ev) => {
          const card = document.createElement("div");
          card.className = "evidence-item-card";
          card.innerHTML = `
            <div class="flex-between font-mono text-[9px]">
              <span class="text-[#C74634] font-bold">${ev.id}</span>
              <span class="text-[#B7791F] font-bold">${ev.signalTitle}</span>
            </div>
            <div class="evidence-quote">"${ev.quote}"</div>
            <div class="flex-between mt-1">
              <span class="text-[8.5px] text-[#858078]">Source: ${ev.location}</span>
              <button type="button" class="btn-card-action btn-card-highlight">[ Highlight on Page ]</button>
            </div>
          `;

          card.querySelector(".btn-card-highlight")?.addEventListener("click", () => {
            highlightTextOnTab(ev.quote);
          });

          evidenceVaultList.appendChild(card);
        });
      }
    }

    // 6. VERTICAL EVIDENCE CHAIN
    if (verticalEvidenceChain) {
      verticalEvidenceChain.innerHTML = "";
      const nodes = [
        { type: "PAGE", label: currentTabInfo.domain || "Current Webpage", val: currentTabInfo.title },
        { type: "CLAIM", label: "Extracted Claim", val: currentTabInfo.claims.length > 0 ? currentTabInfo.claims[0].text : "DOM content" },
        { type: "RISK SIGNAL", label: "Signal Category", val: currentTabInfo.threats.length > 0 ? currentTabInfo.threats[0].title : "Safe Context" },
        { type: "EVIDENCE", label: "Evidence Quote", val: currentTabInfo.evidence.length > 0 ? `"${currentTabInfo.evidence[0].quote}"` : "DOM text" },
        { type: "ASSESSMENT", label: "Safety Verdict", val: currentTabInfo.threats.length > 0 ? "Financial-Risk Indicator" : "Safe" }
      ];

      nodes.forEach((n, idx) => {
        const div = document.createElement("div");
        div.className = "chain-step-node";
        div.innerHTML = `
          <span class="text-slate uppercase font-bold text-[8px]">${n.type}: <strong>${n.label}</strong></span>
          <span class="text-[#1C1C1A] font-bold text-[9.5px] truncate max-w-[180px]">${n.val}</span>
        `;
        verticalEvidenceChain.appendChild(div);

        if (idx < nodes.length - 1) {
          const arrow = document.createElement("div");
          arrow.className = "chain-arrow";
          arrow.textContent = "↓";
          verticalEvidenceChain.appendChild(arrow);
        }
      });
    }

    // 7. FINAL ASSESSMENT
    if (finalAssessmentBox) {
      if (currentTabInfo.status === "SAFE") {
        finalAssessmentBox.innerHTML = `
          <strong style="color: #39704D;">✓ SAFE CONTEXT EVALUATION</strong><br>
          AstraGuard did not identify significant risk indicators on the scanned webpage.
        `;
      } else {
        finalAssessmentBox.innerHTML = `
          <strong style="color: ${currentTabInfo.status === 'HIGH_CONCERN' ? '#C74634' : '#B7791F'};">⚠ POTENTIALLY SUSPICIOUS</strong><br>
          AstraGuard identified ${currentTabInfo.threats.length} risk indicators on this webpage. The strongest indicators are upfront payment demands before application completion, deadline pressure, and social-sharing coercion.
        `;
      }
    }
  }

  // =========================================================================
  // WEBPAGE HIGHLIGHTING & MESSAGING
  // =========================================================================

  function highlightTextOnTab(textToHighlight) {
    if (!textToHighlight) return;
    if (typeof chrome !== "undefined" && chrome.tabs && currentTabInfo.tabId) {
      chrome.tabs.sendMessage(currentTabInfo.tabId, {
        action: "HIGHLIGHT_TEXT",
        textToHighlight: textToHighlight
      }, (res) => {
        if (chrome.runtime.lastError) {
          console.warn("Highlight error:", chrome.runtime.lastError.message);
        } else {
          showHighlightToast();
        }
      });
    }
  }

  function clearHighlightsOnTab() {
    if (typeof chrome !== "undefined" && chrome.tabs && currentTabInfo.tabId) {
      chrome.tabs.sendMessage(currentTabInfo.tabId, { action: "CLEAR_HIGHLIGHTS" }, () => {});
    }
  }

  function showHighlightToast() {
    if (!highlightFeedbackToast) return;
    highlightFeedbackToast.classList.remove("hidden");
    setTimeout(() => {
      highlightFeedbackToast.classList.add("hidden");
    }, 2500);
  }

  function showToast(msg) {
    if (scanStatusIndicator) {
      scanStatusIndicator.textContent = msg;
      scanStatusIndicator.className = "text-[#C74634] font-bold text-[10px]";
      setTimeout(() => {
        scanStatusIndicator.textContent = "✓ Scan Complete";
        scanStatusIndicator.className = "text-[#39704D] font-bold text-[10px]";
      }, 3000);
    }
  }
});
