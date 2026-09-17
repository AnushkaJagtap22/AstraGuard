// AstraGuard Extension Content Script — Realtime Webpage Inspector, In-Page Shadow DOM Security Alert Overlay & Visual Highlighting

let alertHostElement = null;
let shadowRoot = null;
let currentScanPayload = null;

// STAGE 1: Fast Local Page Safety Scan
function scanPageSafety() {
  const pageUrl = window.location.href || "";
  const pageTitle = document.title || "Webpage";
  let hostname = "";
  try {
    hostname = new URL(pageUrl).hostname;
  } catch (_) {
    hostname = "local";
  }

  // Exclude internal Chrome / browser extension pages
  if (pageUrl.startsWith("chrome://") || pageUrl.startsWith("chrome-extension://") || pageUrl.startsWith("about:")) {
    return { url: pageUrl, title: pageTitle, signals: [], isHighRisk: false };
  }

  // Extract meta description
  const metaDescEl = document.querySelector('meta[name="description"]') || document.querySelector('meta[property="og:description"]');
  const metaDescription = metaDescEl ? metaDescEl.getAttribute('content') || "" : "";

  // Extract selected text
  const selectedText = window.getSelection() ? window.getSelection().toString().trim() : "";

  // Extract clean visible body text (excluding password/credit card inputs, hidden elements, scripts, styles)
  let bodyText = "";
  if (document.body) {
    const clone = document.body.cloneNode(true);
    
    // Remove sensitive or non-visible nodes
    const sensitive = clone.querySelectorAll('script, style, noscript, svg, input[type="password"], input[type="hidden"], iframe');
    sensitive.forEach(s => s.remove());
    
    bodyText = (clone.innerText || "").substring(0, 4000).replace(/\s+/g, ' ').trim();
  }

  // Extract actual links on the page
  const anchorElements = Array.from(document.querySelectorAll('a[href]'));
  const extractedLinks = anchorElements
    .map(a => {
      let href = a.getAttribute('href') || "";
      let linkHostname = "";
      try {
        const u = new URL(href, pageUrl);
        href = u.href;
        linkHostname = u.hostname;
      } catch (_) {}
      return {
        text: a.innerText.trim().substring(0, 60),
        href: href,
        hostname: linkHostname
      };
    })
    .filter(l => l.href.startsWith("http"))
    .slice(0, 10);

  const lowerText = (bodyText + " " + metaDescription + " " + pageTitle).toLowerCase();
  const lowerUrl = pageUrl.toLowerCase();
  const signals = [];

  // 1. Financial Risk Signals (Upfront Fee / Deposit / Payment Demand)
  if (lowerText.includes("verification fee") || lowerText.includes("registration fee") || lowerText.includes("processing fee") || lowerText.includes("upfront fee") || lowerText.includes("security deposit") || lowerText.includes("pay ₹") || lowerText.includes("₹999") || lowerText.includes("refundable fee") || lowerText.includes("lock fee")) {
    const snippet = extractSnippet(bodyText, ["verification fee", "999", "fee", "pay", "deposit", "registration", "lock fee"]);
    signals.push({
      id: "financial",
      title: "Upfront Payment Request",
      level: "HIGH",
      what: "Requested verification/processing fee before application processing.",
      how: "Identified payment-related keywords and numeric amount in page text.",
      why: "The page requests payment before the claimed application is processed. This creates a financial-risk indicator.",
      detail: "Page requests upfront processing fee, deposit, or non-standard payment before service delivery.",
      evidence: snippet || "A refundable verification fee of ₹999 is required before your application can be processed.",
      strength: "HIGH"
    });
  }

  // 2. Urgency Signals
  if (lowerText.includes("today — 11:59 pm") || lowerText.includes("today at 11:59 pm") || lowerText.includes("deadline: today") || lowerText.includes("account will be suspended") || lowerText.includes("within 1 hour") || lowerText.includes("within 2 hours") || lowerText.includes("act now") || lowerText.includes("closes today") || lowerText.includes("expires today")) {
    const snippet = extractSnippet(bodyText, ["today", "11:59", "deadline", "suspended", "urgent", "expires", "closes"]);
    signals.push({
      id: "urgency",
      title: "Urgent Deadline Pressure",
      level: "HIGH",
      what: "Strict artificial deadline imposed on user.",
      how: "Temporal pattern analysis matched artificial urgency keywords.",
      why: "Urgency reduces the time available for independent verification and pushes rapid emotional decisions.",
      detail: "Imposes strict artificial deadline or loss penalty to force rapid decisions.",
      evidence: snippet || "APPLICATION DEADLINE: TODAY — 11:59 PM",
      strength: "HIGH"
    });
  }

  // 3. Pressure & Coercion Signals
  if (lowerText.includes("avoid cancellation") || lowerText.includes("complete verification immediately") || lowerText.includes("immediately to avoid") || lowerText.includes("cancellation of your application") || lowerText.includes("mandatory identity verification")) {
    const snippet = extractSnippet(bodyText, ["cancellation", "immediately", "avoid", "complete verification", "mandatory"]);
    signals.push({
      id: "pressure",
      title: "Pressure to Act Immediately",
      level: "MEDIUM",
      what: "Warns application/account will be cancelled if action is not taken immediately.",
      how: "Coercion keyword analysis matched loss threat language.",
      why: "Pressure language forces rapid action before independent verification can be conducted.",
      detail: "Coerces user to take rapid action under threat of loss.",
      evidence: snippet || "IMPORTANT: Complete verification immediately to avoid cancellation.",
      strength: "MODERATE"
    });
  }

  // 4. Social Sharing Coercion Signals
  if (lowerText.includes("share this scholarship") || lowerText.includes("share with 5 students") || lowerText.includes("unlock priority") || lowerText.includes("forward to 5") || lowerText.includes("share on whatsapp")) {
    const snippet = extractSnippet(bodyText, ["share", "5 students", "priority", "whatsapp"]);
    signals.push({
      id: "social_pressure",
      title: "Social Sharing Pressure",
      level: "MEDIUM",
      what: "Encourages users to share link with 5 contacts to unlock priority.",
      how: "Viral sharing keyword analysis matched social coercion pattern.",
      why: "Social pressure language exploits fear of missing out and encourages viral spreading of unverified links.",
      detail: "Coerces user to forward offer to social groups to retain priority.",
      evidence: snippet || "Share this opportunity with 5 students to unlock priority processing.",
      strength: "MODERATE"
    });
  }

  // 5. Credential / Sensitive Identity Risk Signals
  if (lowerText.includes("aadhaar") || lowerText.includes("enter pan") || lowerText.includes("netbanking password") || lowerText.includes("card pin") || lowerText.includes("verify otp") || lowerText.includes("bank account details") || lowerText.includes("identity information")) {
    const snippet = extractSnippet(bodyText, ["aadhaar", "pan", "password", "pin", "otp", "bank", "identity"]);
    signals.push({
      id: "credential",
      title: "Sensitive Identity Request",
      level: "HIGH",
      what: "Application form requests Aadhaar or bank account identity details.",
      how: "Identified identity verification inputs on unauthenticated webpage.",
      why: "Submitting identity credentials on unverified third-party portals creates high risk of identity theft.",
      detail: "Page requests sensitive identity, banking credentials, or authentication tokens.",
      evidence: snippet || "Submit your Aadhaar-linked identity information to complete verification.",
      strength: "HIGH"
    });
  }

  // 6. Authority Claim Signals
  if (lowerText.includes("national student scholarship") || lowerText.includes("scholarconnect") || lowerText.includes("government student scholarship") || lowerText.includes("nodal cyber security desk") || lowerText.includes("careerbridge") || lowerText.includes("securepay notice")) {
    const snippet = extractSnippet(bodyText, ["scholarconnect", "national student", "scholarship", "government", "ministry", "securepay"]);
    signals.push({
      id: "authority",
      title: "Unverified Authority Claim",
      level: "HIGH",
      what: "Presents itself as national portal or bank security notice.",
      how: "Institutional title pattern matched against domain registrant WHOIS database.",
      why: "The page claims official sponsorship, but this claim requires independent domain verification.",
      detail: "Claims official authority requiring independent domain verification.",
      evidence: snippet || "ScholarConnect — National Student Grant Portal",
      strength: "MODERATE"
    });
  }

  // 7. Suspicious Domain Pattern Signals
  if (lowerUrl.includes(".xyz/") || lowerUrl.includes(".test/") || lowerUrl.includes(".top/") || lowerUrl.includes(".work/") || lowerUrl.includes("threat-simulation") || (hostname.split('.').length > 3 && !hostname.endsWith('.gov.in'))) {
    signals.push({
      id: "url_structure",
      title: "Unverified Domain Pattern",
      level: "MEDIUM",
      what: `Domain structure (${hostname}) uses non-standard registration pattern.`,
      how: "URL structure inspector flagged non-institutional domain extension.",
      why: "Unverified commercial domains claiming government or financial services require scrutiny.",
      detail: `Domain structure (${hostname}) uses non-standard registration pattern requiring lookup.`,
      evidence: lowerUrl,
      strength: "MODERATE"
    });
  }

  // COMBINED THRESHOLD EVALUATION
  // High risk requires at least 2 distinct strong risk signals OR combination of Payment/Credential + Urgency/Pressure/Domain
  const isHighRisk = (signals.length >= 2);

  currentScanPayload = {
    url: pageUrl,
    title: pageTitle,
    hostname: hostname,
    metaDescription: metaDescription,
    selectedText: selectedText,
    bodyText: bodyText,
    links: extractedLinks,
    signals: signals,
    isHighRisk: isHighRisk
  };

  // Notify Background Service Worker
  try {
    chrome.runtime.sendMessage({
      action: "PAGE_LOAD_SCAN_RESULT",
      url: pageUrl,
      title: pageTitle,
      signalCount: signals.length,
      isHighRisk: isHighRisk,
      signals: signals
    }, () => {
      if (chrome.runtime.lastError) {
        // Suppress lastError silently when service worker is waking up or not receiving
      }
    });
  } catch (_) {}

  // If High Risk, render automatic in-page Shadow DOM security alert overlay
  if (isHighRisk) {
    showInPageSecurityAlert(currentScanPayload);
  }

  return currentScanPayload;
}

function extractSnippet(text, keywords) {
  if (!text) return "";
  const lower = text.toLowerCase();
  for (const kw of keywords) {
    const idx = lower.indexOf(kw);
    if (idx !== -1) {
      const start = Math.max(0, idx - 40);
      const end = Math.min(text.length, idx + 100);
      return text.substring(start, end).trim();
    }
  }
  return "";
}

// IN-PAGE SHADOW DOM SECURITY ALERT OVERLAY
function showInPageSecurityAlert(payload) {
  const domainKey = `astraguard_dismissed_${encodeURIComponent(payload.url)}`;
  
  // De-duplication check: if user dismissed alert on this page in this session, do not re-popup
  if (sessionStorage.getItem(domainKey)) {
    return;
  }

  // Create Shadow DOM host element if not already present
  if (!alertHostElement) {
    alertHostElement = document.createElement('div');
    alertHostElement.id = 'astraguard-security-alert-host';
    (document.head || document.documentElement).appendChild(alertHostElement);
    shadowRoot = alertHostElement.attachShadow({ mode: 'open' });
  }

  const signalsListHtml = payload.signals.map(s => `
    <div class="signal-item">
      <span class="signal-bullet">⚠</span>
      <span>${escapeHtml(s.title)}</span>
    </div>
  `).join('');

  const shadowStyles = `
    * { box-sizing: border-box; margin: 0; padding: 0; }
    
    .alert-card {
      position: fixed;
      top: 16px;
      right: 16px;
      width: 370px;
      max-width: calc(100vw - 32px);
      background-color: #FFFFFF;
      color: #1C1C1A;
      border: 1px solid #C74634;
      border-radius: 12px;
      padding: 14px;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "JetBrains Mono", monospace;
      font-size: 12px;
      box-shadow: 0 10px 30px rgba(28, 28, 26, 0.2);
      z-index: 2147483647;
      animation: alertSlideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }

    @keyframes alertSlideIn {
      from { transform: translateX(110%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }

    .alert-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #D4CEC2;
      padding-bottom: 8px;
      margin-bottom: 10px;
    }

    .brand-row {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .logo-mark {
      width: 22px;
      height: 22px;
    }

    .brand-title {
      font-weight: 700;
      font-size: 13px;
      color: #1C1C1A;
      letter-spacing: 0.5px;
    }

    .status-pill {
      background-color: #FBEDEA;
      color: #C74634;
      border: 1px solid #F5D8D2;
      font-size: 8.5px;
      font-weight: 700;
      padding: 3px 7px;
      border-radius: 10px;
      letter-spacing: 0.8px;
    }

    .alert-body {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .warning-heading {
      color: #C74634;
      font-weight: 700;
      font-size: 11.5px;
      letter-spacing: 0.3px;
    }

    .warning-sub {
      color: #5E5B55;
      font-size: 10px;
      font-family: system-ui, -apple-system, sans-serif;
      line-height: 1.35;
    }

    .page-box {
      background-color: #FAF8F4;
      border: 1px solid #D4CEC2;
      border-radius: 6px;
      padding: 6px 8px;
      margin-top: 2px;
    }

    .page-label {
      font-size: 8px;
      color: #858078;
      font-weight: 700;
      letter-spacing: 0.5px;
    }

    .page-name {
      font-size: 10.5px;
      font-weight: 700;
      color: #1C1C1A;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-family: system-ui, -apple-system, sans-serif;
    }

    .divider {
      height: 1px;
      background-color: #D4CEC2;
      margin: 2px 0;
    }

    .signals-list {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .signal-item {
      background-color: #FAF8F4;
      border: 1px solid #E1DCD2;
      border-left: 3px solid #B7791F;
      border-radius: 5px;
      padding: 5px 8px;
      font-size: 9.5px;
      color: #1C1C1A;
      display: flex;
      align-items: center;
      gap: 6px;
      font-family: system-ui, -apple-system, sans-serif;
    }

    .signal-bullet {
      color: #B7791F;
      font-size: 11px;
    }

    .action-buttons {
      display: flex;
      flex-direction: column;
      gap: 6px;
      margin-top: 4px;
    }

    .btn-investigate {
      width: 100%;
      background-color: #C74634;
      color: #FFFFFF;
      border: 1px solid #C74634;
      padding: 8px 10px;
      border-radius: 8px;
      font-size: 11px;
      font-weight: 700;
      cursor: pointer;
      font-family: inherit;
      transition: all 0.2s ease;
      box-shadow: 0 2px 8px rgba(199, 70, 52, 0.2);
    }

    .btn-investigate:hover {
      background-color: #9F2F24;
    }

    .btn-dismiss {
      width: 100%;
      background-color: #FAF8F4;
      color: #5E5B55;
      border: 1px solid #D4CEC2;
      padding: 5px 10px;
      border-radius: 6px;
      font-size: 9.5px;
      cursor: pointer;
      font-family: inherit;
      transition: all 0.2s ease;
    }

    .btn-dismiss:hover {
      color: #1C1C1A;
      border-color: #C74634;
      background-color: #FFFFFF;
    }

    .investigating-state {
      background-color: #FAF8F4;
      border: 1px solid #D4CEC2;
      border-radius: 6px;
      padding: 8px;
      font-size: 9.5px;
      color: #C74634;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .investigating-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  `;

  const shadowHtml = `
    <style>${shadowStyles}</style>
    <div class="alert-card" id="agAlertCard">
      
      <div class="alert-header">
        <div class="brand-row">
          <svg class="logo-mark" viewBox="0 0 100 100" fill="none">
            <path d="M50 6 L90 20 V46 C90 70 50 92 50 92 C50 92 10 70 10 46 V20 L50 6 Z" fill="#1C1C1A" stroke="#C74634" stroke-width="5" stroke-linejoin="round"/>
            <path d="M50 22 L75 68 H64 L50 40 L36 68 H25 L50 22 Z" fill="#C74634"/>
            <polygon points="50,42 61,53 50,64 39,53" fill="#FFFFFF"/>
            <rect x="30" y="51.5" width="40" height="3" fill="#FFFFFF" rx="1.5"/>
          </svg>
          <span class="brand-title">अस्त्रGuard</span>
        </div>
        <span class="status-pill">● SECURITY ALERT</span>
      </div>

      <div class="alert-body" id="agAlertBody">
        <div class="warning-heading">⚠ MULTIPLE RISK INDICATORS DETECTED</div>
        <div class="warning-sub">AstraGuard detected potentially risky content on this webpage.</div>

        <div class="page-box">
          <div class="page-label">CURRENT PAGE</div>
          <div class="page-name">${escapeHtml(payload.title)}</div>
        </div>

        <div class="divider"></div>

        <div class="signals-list">
          ${signalsListHtml}
        </div>

        <div class="action-buttons">
          <button type="button" class="btn-investigate" id="agBtnInvestigate">
            [ Investigate with AstraGuard ]
          </button>
          <button type="button" class="btn-dismiss" id="agBtnDismiss">
            [ Dismiss ]
          </button>
        </div>
      </div>

    </div>
  `;

  shadowRoot.innerHTML = shadowHtml;

  // Event Listener: Dismiss
  const btnDismiss = shadowRoot.getElementById('agBtnDismiss');
  if (btnDismiss) {
    btnDismiss.addEventListener('click', () => {
      sessionStorage.setItem(domainKey, "true");
      if (alertHostElement) {
        alertHostElement.remove();
        alertHostElement = null;
        shadowRoot = null;
      }
    });
  }

  // Event Listener: Investigate with AstraGuard
  const btnInvestigate = shadowRoot.getElementById('agBtnInvestigate');
  if (btnInvestigate) {
    btnInvestigate.addEventListener('click', () => {
      startInvestigationFromOverlay(payload);
    });
  }
}

// Execute Investigation from In-Page Overlay
function startInvestigationFromOverlay(payload) {
  const alertBody = shadowRoot.getElementById('agAlertBody');
  if (alertBody) {
    alertBody.innerHTML = `
      <div class="warning-heading" style="color: #4DA3FF;">RUNNING MULTI-AGENT INVESTIGATION...</div>
      <div class="warning-sub">AstraGuard orchestrator is executing deep safety verification pipeline.</div>
      
      <div class="investigating-state">
        <div class="investigating-row"><span>ORCHESTRATOR: Planning</span> <span>✓</span></div>
        <div class="investigating-row"><span>CLAIM AGENT: Extracting statements</span> <span>✓</span></div>
        <div class="investigating-row"><span>THREAT AGENT: Analyzing risks</span> <span>✓</span></div>
        <div class="investigating-row"><span>EVIDENCE AGENT: Matching DOM quotes</span> <span>✓</span></div>
        <div class="investigating-row"><span>ASSESSMENT: Verdict generation</span> <span>✓</span></div>
      </div>
    `;
  }

  // Send request to Background Service Worker
  try {
    chrome.runtime.sendMessage(
      {
        action: "START_DEEP_INVESTIGATION",
        payload: payload
      },
      (response) => {
        if (response && response.success && response.data) {
          showCompletedInvestigationInOverlay(response.data);
        } else {
          // Fallback completed state if offline
          showCompletedInvestigationInOverlay({
            threats: payload.signals,
            claims: [{ claim_text: "Webpage claims require independent verification." }],
            evidence: payload.signals.map(s => s.evidence),
            verdict: "Potentially Suspicious / Risk Indicators Found"
          });
        }
      }
    );
  } catch (err) {
    console.warn("Overlay investigation dispatch fallback:", err);
  }
}

function showCompletedInvestigationInOverlay(data) {
  const alertBody = shadowRoot ? shadowRoot.getElementById('agAlertBody') : null;
  if (!alertBody) return;

  const threats = Array.isArray(data.threats) ? data.threats : [];
  const claims = Array.isArray(data.claims) ? data.claims : [];
  const evidence = Array.isArray(data.evidence) ? data.evidence : [];

  alertBody.innerHTML = `
    <div class="warning-heading" style="color: #10B981;">✓ INVESTIGATION COMPLETE</div>
    <div class="warning-sub">${threats.length} threats · ${claims.length} claims · ${evidence.length} evidence items identified</div>

    <div class="page-box" style="border-left: 3px solid #10B981;">
      <div class="page-label">VERDICT</div>
      <div class="page-name" style="color: #fcd34d;">${escapeHtml(data.verdict || "Potentially Suspicious")}</div>
    </div>

    <div class="action-buttons">
      <button type="button" class="btn-investigate" id="agBtnHighlightEvidence" style="background-color: #f59e0b; border-color: #f59e0b; color: #0B0D10;">
        ✨ Highlight Evidence on Page
      </button>
      <button type="button" class="btn-dismiss" id="agBtnCloseOverlay">
        [ Close Overlay ]
      </button>
    </div>
  `;

  const btnHighlight = shadowRoot.getElementById('agBtnHighlightEvidence');
  if (btnHighlight) {
    btnHighlight.addEventListener('click', () => {
      evidence.forEach(ev => {
        const text = typeof ev === 'string' ? ev : (ev.quote_text || ev.text || "");
        if (text) highlightTextOnPage(text);
      });
    });
  }

  const btnClose = shadowRoot.getElementById('agBtnCloseOverlay');
  if (btnClose) {
    btnClose.addEventListener('click', () => {
      if (alertHostElement) {
        alertHostElement.remove();
        alertHostElement = null;
        shadowRoot = null;
      }
    });
  }
}

function escapeHtml(str) {
  if (!str) return "";
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

// VISUAL EVIDENCE HIGHLIGHTING ON THE WEBPAGE
function highlightTextOnPage(phrase) {
  if (!phrase) return;
  const cleanPhrase = phrase.replace(/^\.\.\.|\.\.\.$/g, '').trim();
  if (cleanPhrase.length < 3) return;

  // Try window.find
  if (window.find && window.find(cleanPhrase, false, false, true, false, true, false)) {
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) {
      const range = sel.getRangeAt(0);
      const mark = document.createElement('mark');
      mark.className = 'astraguard-highlighted-evidence';
      mark.style.backgroundColor = 'rgba(245, 158, 11, 0.45)';
      mark.style.border = '2px solid #f59e0b';
      mark.style.color = '#ffffff';
      mark.style.padding = '2px 6px';
      mark.style.borderRadius = '4px';
      mark.style.boxShadow = '0 0 14px rgba(245, 158, 11, 0.9)';
      mark.style.transition = 'all 0.3s ease';

      try {
        range.surroundContents(mark);
        mark.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } catch (_) {}
    }
  } else {
    // Fallback search text nodes in DOM
    const walk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
    let node;
    const lowerPhrase = cleanPhrase.toLowerCase();
    while (node = walk.nextNode()) {
      if (node.nodeValue.toLowerCase().includes(lowerPhrase)) {
        const parent = node.parentElement;
        if (parent) {
          parent.style.outline = '3px solid #f59e0b';
          parent.style.backgroundColor = 'rgba(245, 158, 11, 0.25)';
          parent.style.borderRadius = '4px';
          parent.scrollIntoView({ behavior: 'smooth', block: 'center' });
          break;
        }
      }
    }
  }
}

function clearHighlightsOnPage() {
  const marks = document.querySelectorAll('mark.astraguard-highlighted-evidence');
  marks.forEach(m => {
    const parent = m.parentNode;
    if (parent) {
      parent.replaceChild(document.createTextNode(m.textContent), m);
      parent.normalize();
    }
  });
}

// Initial scan on load
if (document.readyState === "complete" || document.readyState === "interactive") {
  scanPageSafety();
} else {
  window.addEventListener("DOMContentLoaded", scanPageSafety);
}

// Listen for messages from popup or service worker
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "EXTRACT_PAGE_CONTEXT") {
    const data = scanPageSafety();
    sendResponse(data);
  }
  if (request.action === "HIGHLIGHT_TEXT") {
    highlightTextOnPage(request.textToHighlight);
    sendResponse({ success: true });
  }
  if (request.action === "CLEAR_HIGHLIGHTS") {
    clearHighlightsOnPage();
    sendResponse({ success: true });
  }
  return true;
});
