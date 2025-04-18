// utils/AnalyticsManager.js

// Constants for keys and analytics endpoint
const ANALYTICS_KEY = 'analyticsData';            // Key for storing analytics events in sessionStorage
const SESSION_KEY = 'voyexSessionId';             // Cookie key for session ID
const SESSION_META_KEY = 'session_meta';          // Cookie key for backend-required session meta
const API_ENDPOINT = 'https://r98ngavlng.execute-api.ap-southeast-2.amazonaws.com/default/voyex_analytics';

const AnalyticsManager = {
  // Initialize the Analytics Manager: ensure session, register event listeners
  async init() {
    await this.ensureSessionId();

    // Register interaction and lifecycle listeners
    document.addEventListener('click', this.handleClick);
    window.addEventListener('scroll', this.handleScroll);
    window.addEventListener('beforeunload', this.sendAnalyticsData);
    document.addEventListener('visibilitychange', this.handleVisibilityChange);
  },

  // Ensure session ID exists in cookie; if not, request from server
  async ensureSessionId() {
    const existing = this.getCookie(SESSION_KEY);
    if (!existing) {
      try {
        // Request a new session from the analytics API
        const res = await fetch(API_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            service: 'session',
            entity_type: 'user',
            entity_id: '21123', // Can be dynamic in real use
            referrer: document.referrer || 'direct',
            path: window.location.pathname,
          }),
        });

        const data = await res.json();

        // Store both session ID and session_meta cookies if received
        if (data.sessionId) {
          this.setCookie(SESSION_KEY, data.sessionId, 1);       // Store sessionId for 1 day
          this.setCookie(SESSION_META_KEY, data.sessionId, 1);  // Set session_meta for backend requirement
        }
      } catch (err) {
        console.error('Failed to get session ID:', err);
      }
    }
  },

  // Track and store click events
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
  },

  // Track and store scroll depth as percentage
  handleScroll() {
    const scrollPercent = Math.round(
      (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
    );
    const payload = {
      scroll_depth: `${scrollPercent}%`,
    };
    this.storeEvent('scroll', payload);
  },

  // Store event in sessionStorage under ANALYTICS_KEY
  storeEvent(type, payload) {
    const current = JSON.parse(sessionStorage.getItem(ANALYTICS_KEY)) || [];
    current.push({
      type,
      event: payload,
      timestamp: new Date().toISOString(),
    });
    sessionStorage.setItem(ANALYTICS_KEY, JSON.stringify(current));
  },

  // Send stored analytics data to backend
  sendAnalyticsData() {
    const raw = sessionStorage.getItem(ANALYTICS_KEY);
    const sessionId = this.getCookie(SESSION_KEY);
    const sessionMeta = this.getCookie(SESSION_META_KEY);

    // Abort if no session or data to send
    if (!raw || !sessionId || !sessionMeta) return;

    const events = JSON.parse(raw);
    if (events.length === 0) return;

    // Extract event types and merge all payloads into one object
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

    // Send payload to backend with keepalive for unload scenarios
    fetch(API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      keepalive: true,
    })
      .then(() => {
        sessionStorage.removeItem(ANALYTICS_KEY); // Clear events after successful send
      })
      .catch((err) => {
        console.error('Failed to send analytics:', err);
      });
  },

  // Fallback to send data when user leaves or switches tab
  handleVisibilityChange() {
    if (document.visibilityState === 'hidden') {
      this.sendAnalyticsData();
    }
  },

  // Utility to set a cookie with optional expiration (in days)
  setCookie(name, value, days) {
    const expires = days
      ? `; expires=${new Date(Date.now() + days * 864e5).toUTCString()}`
      : '';
    document.cookie = `${name}=${encodeURIComponent(value || '')}${expires}; path=/`;
  },

  // Utility to get a cookie by name
  getCookie(name) {
    return document.cookie
      .split('; ')
      .find(row => row.startsWith(name + '='))
      ?.split('=')[1];
  },
};

export default AnalyticsManager;
