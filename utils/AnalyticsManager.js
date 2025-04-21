// utils/AnalyticsManager.js

const ANALYTICS_KEY = 'analyticsData';
const SESSION_KEY = 'voyexSessionId';
const SESSION_META_KEY = 'session_meta';
const API_ENDPOINT = 'https://r98ngavlng.execute-api.ap-southeast-2.amazonaws.com/default/voyex_analytics';

let analyticsTimer = null; // Global timer reference

const AnalyticsManager = {
  async init() {
    await this.ensureSessionId();

    document.addEventListener('click', this.handleClick.bind(this));
    window.addEventListener('scroll', this.handleScroll.bind(this));
    window.addEventListener('beforeunload', this.sendAnalyticsData.bind(this));
    document.addEventListener('visibilitychange', this.handleVisibilityChange.bind(this));
  },

  async ensureSessionId() {
    const existing = this.getCookie(SESSION_KEY);
    if (!existing) {
      try {
        const res = await fetch(API_ENDPOINT, {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            service: 'session',
            entity_type: 'user',
            entity_id: '21123',
            referrer: document.referrer || 'direct',
            path: window.location.pathname,
          }),
        });

        const data = await res.json();
        if (data.session_id) {
          this.setCookie(SESSION_KEY, data.session_id, 1);
          this.setCookie(SESSION_META_KEY, data.session_id, 1);
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
    this.storeEvent('click', payload);

    // Start 10-second timer to send analytics
    if (!analyticsTimer) {
      analyticsTimer = setTimeout(() => {
        this.sendAnalyticsData();
        analyticsTimer = null; // reset timer
      }, 10000); // 10,000ms = 10s
    }
  },

  handleScroll() {
    const scrollPercent = Math.round(
      (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
    );
    const payload = {
      scroll_depth: `${scrollPercent}%`,
    };
    this.storeEvent('scroll', payload);
  },

  storeEvent(type, payload) {
    const current = JSON.parse(sessionStorage.getItem(ANALYTICS_KEY)) || [];
    current.push({
      type,
      event: payload,
      timestamp: new Date().toISOString(),
    });
    sessionStorage.setItem(ANALYTICS_KEY, JSON.stringify(current));
  },

  sendAnalyticsData() {
    const raw = sessionStorage.getItem(ANALYTICS_KEY);
    const sessionId = this.getCookie(SESSION_KEY);
    const sessionMeta = this.getCookie(SESSION_META_KEY);
    if (!raw || !sessionId || !sessionMeta) return;

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
      // 🔥 ADD THIS to log before sending
  console.log('📦 Payload to send:', payload);
    fetch(API_ENDPOINT, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      keepalive: true,
    })
      .then(() => {
        sessionStorage.removeItem(ANALYTICS_KEY);
        console.log('Analytics sent to server');
      })
      .catch((err) => {
        console.error('Failed to send analytics:', err);
      });
  },

  handleVisibilityChange() {
    if (document.visibilityState === 'hidden') {
      this.sendAnalyticsData();
    }
  },

  // Cookie utilities
  setCookie(name, value, days) {
    const expires = days
      ? `; expires=${new Date(Date.now() + days * 864e5).toUTCString()}`
      : '';
    document.cookie = `${name}=${encodeURIComponent(value || '')}${expires}; path=/`;
  },

  getCookie(name) {
    return document.cookie
      .split('; ')
      .find(row => row.startsWith(name + '='))
      ?.split('=')[1];
  },
};

export default AnalyticsManager;
