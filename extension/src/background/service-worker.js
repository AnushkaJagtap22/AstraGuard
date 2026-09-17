// AstraGuard Extension Background Service Worker (Manifest V3)
// Real-time AI Web Safety Layer Service Worker

const BACKEND_URL = "http://127.0.0.1:8000";
const WEB_WORKSTATION_URL = "https://astra-guard-phi.vercel.app";

// De-duplication cache for notifications to prevent notification spam
const notifiedUrls = new Set();

// Register Context Menu Items on Installation
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "astraguard-investigate-text",
    title: "Investigate text with अस्त्रGuard",
    contexts: ["selection"]
  });
  chrome.contextMenus.create({
    id: "astraguard-check-link",
    title: "Check link with अस्त्रGuard",
    contexts: ["link"]
  });
  chrome.contextMenus.create({
    id: "astraguard-scan-page",
    title: "Scan page with अस्त्रGuard",
    contexts: ["page"]
  });
  console.log("अस्त्रGuard Context Menu Items Installed.");
});

// Handle Context Menu Clicks
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  const pageUrl = info.pageUrl || tab?.url || "";
  const pageTitle = tab?.title || "Web Page";

  if (info.menuItemId === "astraguard-investigate-text") {
    const selectedText = info.selectionText || "";
    try {
      const response = await fetch(`${BACKEND_URL}/api/extension/investigate-text`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ selectedText, pageUrl, pageTitle })
      });
      if (response.ok) {
        const result = await response.json();
        chrome.tabs.create({ url: `${WEB_WORKSTATION_URL}/investigate?case=${result.id || 'AG-DEMO-001'}` });
        return;
      }
    } catch (err) {
      console.warn("Context menu backend fallback:", err);
    }
    chrome.tabs.create({ url: `${WEB_WORKSTATION_URL}/investigate?text=${encodeURIComponent(selectedText)}` });
  }

  if (info.menuItemId === "astraguard-check-link") {
    const linkUrl = info.linkUrl || "";
    chrome.tabs.create({ url: `${WEB_WORKSTATION_URL}/investigate?url=${encodeURIComponent(linkUrl)}` });
  }

  if (info.menuItemId === "astraguard-scan-page") {
    chrome.tabs.create({ url: `${WEB_WORKSTATION_URL}/investigate?url=${encodeURIComponent(pageUrl)}` });
  }
});

// Helper: Show Chrome System Notification for High Risk Webpages
function triggerSystemNotification(pageTitle, riskCount, pageUrl) {
  if (notifiedUrls.has(pageUrl)) return;
  notifiedUrls.add(pageUrl);

  // Clear from deduplication cache after 5 minutes
  setTimeout(() => notifiedUrls.delete(pageUrl), 5 * 60 * 1000);

  if (typeof chrome.notifications !== "undefined" && chrome.notifications.create) {
    try {
      chrome.notifications.create({
        type: "basic",
        iconUrl: "icons/icon128.png",
        title: "🛡️ AstraGuard Security Alert",
        message: `⚠ ${riskCount} risk indicators detected on "${pageTitle || 'scanned page'}". Click to investigate.`,
        priority: 2
      });
    } catch (err) {
      console.warn("AstraGuard Notification failed:", err);
    }
  }
}

// Handle System Notification Clicks
if (typeof chrome.notifications !== "undefined" && chrome.notifications.onClicked) {
  chrome.notifications.onClicked.addListener(() => {
    if (typeof chrome.action !== "undefined" && chrome.action.openPopup) {
      try {
        chrome.action.openPopup();
      } catch (_) {}
    }
  });
}

// Listen for messages from popup or content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const tabId = sender.tab ? sender.tab.id : null;

  if (request.action === "GET_CURRENT_TAB_INFO") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs && tabs[0]) {
        sendResponse({ url: tabs[0].url, title: tabs[0].title, tabId: tabs[0].id });
      } else {
        sendResponse({ url: "", title: "", tabId: null });
      }
    });
    return true;
  }

  if (request.action === "OPEN_DEMO_TAB") {
    const demoUrl = request.url || `${WEB_WORKSTATION_URL}/demo/threat-simulation`;
    chrome.tabs.create({ url: demoUrl }, (tab) => {
      sendResponse({ success: true, tabId: tab ? tab.id : null });
    });
    return true;
  }

  // STAGE 1: Fast Page Scan Result Handler from Content Script
  if (request.action === "PAGE_SCANNED" || request.action === "PAGE_LOAD_SCAN_RESULT") {
    const isHighRisk = request.isHighRisk || (request.signalCount >= 2);
    const signalCount = request.signalCount || 0;

    if (tabId && typeof chrome.action !== "undefined") {
      if (isHighRisk) {
        chrome.action.setBadgeText({ tabId, text: "!" });
        chrome.action.setBadgeBackgroundColor({ tabId, color: "#FF4D4D" });
        
        // Trigger system notification if applicable
        triggerSystemNotification(request.title, signalCount, request.url);

        // Attempt automatic popup opening where supported by Chrome version
        if (typeof chrome.action.openPopup === "function") {
          try {
            chrome.action.openPopup();
          } catch (_) {}
        }
      } else {
        chrome.action.setBadgeText({ tabId, text: "" });
      }
    }
    sendResponse({ acknowledged: true });
    return true;
  }

  // STAGE 2: Deep Multi-Agent Investigation Execution Request
  if (request.action === "START_DEEP_INVESTIGATION") {
    const pagePayload = request.payload || {};

    if (tabId && typeof chrome.action !== "undefined") {
      chrome.action.setBadgeText({ tabId, text: "..." });
      chrome.action.setBadgeBackgroundColor({ tabId, color: "#C74634" });
    }

    // Call FastAPI Backend Orchestrator
    fetch(`${BACKEND_URL}/api/extension/check-safety`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pagePayload)
    })
      .then(async (res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        
        // Save cached investigation result for active tab
        if (tabId) {
          const cacheKey = `astraguard_case_${tabId}`;
          await chrome.storage.local.set({ [cacheKey]: data });
          
          const threatCount = Array.isArray(data.threats) ? data.threats.length : 0;
          chrome.action.setBadgeText({ tabId, text: threatCount > 0 ? `${threatCount}` : "✓" });
          chrome.action.setBadgeBackgroundColor({ tabId, color: threatCount > 0 ? "#C74634" : "#39704D" });
        }

        sendResponse({ success: true, data: data });
      })
      .catch((err) => {
        console.warn("Backend check safety failed, returning local normalized result:", err);
        if (tabId) {
          chrome.action.setBadgeText({ tabId, text: "!" });
          chrome.action.setBadgeBackgroundColor({ tabId, color: "#B7791F" });
        }
        sendResponse({ success: false, error: err.message });
      });

    return true; // Keep response channel open for async fetch
  }

  // Get cached investigation for tab
  if (request.action === "GET_CACHED_INVESTIGATION") {
    const tId = request.tabId || tabId;
    if (tId) {
      const cacheKey = `astraguard_case_${tId}`;
      chrome.storage.local.get([cacheKey], (result) => {
        sendResponse({ data: result[cacheKey] || null });
      });
      return true;
    }
    sendResponse({ data: null });
    return true;
  }
});
