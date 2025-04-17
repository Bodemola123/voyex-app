// utils/AnalyticsManager.js

const ANALYTICS_KEY = 'analyticsData';
const SESSION_KEY = 'voyexSessionId';
const API_ENDPOINT = 'https://r98ngavlng.execute-api.ap-southeast-2.amazonaws.com/default/voyex_analytics';

const AnalyticsManager = {
  async init() {
    await this.ensureSessionId();

    document.addEventListener('click', this.handleClick);
    window.addEventListener('scroll', this.handleScroll);
    window.addEventListener('beforeunload', this.sendAnalyticsData);
    document.addEventListener('visibilitychange', this.handleVisibilityChange);
  },

  async ensureSessionId() {
    const existing = sessionStorage.getItem(SESSION_KEY);
    if (!existing) {
      try {
        const res = await fetch(API_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            service: 'session',
            entity_type: 'user',
            entity_id: '21123', // You can dynamically replace this if you have a real user ID
            referrer: document.referrer || 'direct',
            path: window.location.pathname,
          }),
        });
  
        const data = await res.json();
  
        // You’ll want to check what field holds the sessionId in the response
        if (data.sessionId) {
          sessionStorage.setItem(SESSION_KEY, data.sessionId);
        }
      } catch (err) {
        console.error('Failed to get session ID:', err);
      }
    }
  },  

  handleClick(event) {
    const payload = {
      click_position: {
        x: event.clientX,
        y: event.clientY,
      },
      tag: event.target.tagName,
      button_id: event.target.id || null,
    };
    AnalyticsManager.storeEvent('click', payload);
  },

  handleScroll() {
    const scrollPercent = Math.round(
      (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
    );
    const payload = {
      scroll_depth: `${scrollPercent}%`,
    };
    AnalyticsManager.storeEvent('scroll', payload);
  },

  storeEvent(type, payload) {
    const current = JSON.parse(localStorage.getItem(ANALYTICS_KEY)) || [];
    current.push({
      type,
      event: payload,
      timestamp: new Date().toISOString(),
    });
    localStorage.setItem(ANALYTICS_KEY, JSON.stringify(current));
  },

  sendAnalyticsData() {
    const raw = localStorage.getItem(ANALYTICS_KEY);
    const sessionId = sessionStorage.getItem(SESSION_KEY);
    if (!raw || !sessionId) return;

    const events = JSON.parse(raw);
    if (events.length === 0) return;

    const eventTypes = events.map(e => e.type);
    const mergedEventData = events.reduce((acc, curr) => {
      acc = { ...acc, ...curr.event };
      return acc;
    }, {});

    const payload = {
      service: 'analytics',
      action: 'insert',
      eventTypes: [...new Set(eventTypes)],
      event: mergedEventData,
      metadata: {
        user_agent: navigator.userAgent,
        device: window.innerWidth < 768 ? 'mobile' : 'desktop',
        session_id: sessionId,
      },
    };

    // Fallback with fetch (now only this part will be used)
    fetch(API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      keepalive: true, // Ensures that the request goes through even if the user navigates away
    })
      .then(() => {
        localStorage.removeItem(ANALYTICS_KEY);
      })
      .catch((err) => {
        console.error('Failed to send analytics:', err);
      });
  },

  handleVisibilityChange() {
    if (document.visibilityState === 'hidden') {
      AnalyticsManager.sendAnalyticsData();
    }
  },
};

export default AnalyticsManager;
