export async function submitLeadSilently(leadData) {
  try {
    const res = await fetch('/api/leads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Source': 'chatbot-widget',
      },
      body: JSON.stringify({
        name: leadData.name,
        phone: leadData.phone || undefined,
        email: leadData.email,
        interestedCourse: leadData.interestedCourse,
        source: 'website_chatbot',
        timestamp: new Date().toISOString(),
        page: window.location.href,
        userAgent: navigator.userAgent,
      }),
    });
    if (!res.ok) {
      const body = await res.text();
      throw new Error(`HTTP ${res.status}: ${body}`);
    }
  } catch (err) {
    console.error('[Chatbot] Lead submission failed:', err);
    const pending = JSON.parse(localStorage.getItem('pendingLeads') || '[]');
    pending.push({ ...leadData, _failedAt: new Date().toISOString() });
    localStorage.setItem('pendingLeads', JSON.stringify(pending));
  }
}
