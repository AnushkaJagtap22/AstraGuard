// AstraGuard API Adapter for Browser Extension

const BACKEND_URL = "http://127.0.0.1:8000";

export async function checkPageSafety(url, title, contentPreview) {
  try {
    const res = await fetch(`${BACKEND_URL}/api/extension/check-safety`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url, title, contentPreview })
    });
    if (!res.ok) throw new Error("Safety check failed");
    return await res.json();
  } catch (err) {
    console.warn("Safety check network fallback:", err);
    return {
      status: "UNAVAILABLE",
      safety_badge: "⚪ UNVERIFIED SERVICE",
      threat_count: 0,
      claim_count: 0,
      evidence_count: 0,
      summary: "Verification service currently offline."
    };
  }
}

export async function investigatePage(url, title, selectedText, pageContent) {
  try {
    const res = await fetch(`${BACKEND_URL}/api/extension/investigate-page`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url, title, selectedText, pageContent })
    });
    if (!res.ok) throw new Error("Investigation service error");
    return await res.json();
  } catch (err) {
    console.warn("Investigate page fallback:", err);
    return { status: "ERROR", error: err.message };
  }
}

export async function investigateText(selectedText, pageUrl, pageTitle) {
  try {
    const res = await fetch(`${BACKEND_URL}/api/extension/investigate-text`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ selectedText, pageUrl, pageTitle })
    });
    if (!res.ok) throw new Error("Text investigation service error");
    return await res.json();
  } catch (err) {
    console.warn("Investigate text fallback:", err);
    return { status: "ERROR", error: err.message };
  }
}
