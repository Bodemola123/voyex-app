// utils/AnalyticsManager.js

const ANALYTICS_KEY = 'analyticsData';
const SESSION_KEY = 'voyexSessionId';
const API_ENDPOINT = 'https://r98ngavlng.execute-api.ap-southeast-2.amazonaws.com/default/voyex_analytics';

let analyticsTimer = null;

const AnalyticsManager = {
  async init() {
    await this.ensureSessionIdFromServer();

    document.addEventListener('click', this.handleClick.bind(this));
    window.addEventListener('scroll', this.handleScroll.bind(this));
    window.addEventListener('beforeunload', this.sendAnalyticsData.bind(this));
    document.addEventListener('visibilitychange', this.handleVisibilityChange.bind(this));
  },

  async ensureSessionIdFromServer() {
    const existing = this.getCookie(SESSION_KEY);
    if (!existing) {
      try {
        const res = await fetch(API_ENDPOINT, {
          method: 'POST',
          credentials: 'include', // Server will handle cookie setting
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
        if (data?.session_id) {
          console.log('✅ Session established. Cookie set by server.');
        } else {
          console.warn('⚠️ No session_id returned from server');
        }
      } catch (err) {
        console.error('❌ Failed to establish session:', err);
      }
    } else {
      console.log('🔄 Session cookie already present.');
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

    if (!analyticsTimer) {
      analyticsTimer = setTimeout(() => {
        this.sendAnalyticsData();
        analyticsTimer = null;
      }, 3000);
    }
  },

  handleScroll() {
    const scrollPercent = Math.round(
      (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
    );
    this.storeEvent('scroll', { scroll_depth: `${scrollPercent}%` });
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

    if (!raw || !sessionId) {
      console.warn('❌ Missing session or events. Aborting send.', { sessionId, raw });
      return;
    }

    const events = JSON.parse(raw);
    if (!Array.isArray(events) || events.length === 0) {
      console.warn('📭 No valid events to send.');
      return;
    }

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

    console.log('📦 Payload to send:', payload);

    fetch(API_ENDPOINT, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      keepalive: true,
    })
    .then(res => {
      if (!res.ok) {
        console.error('❌ Analytics send failed:', res.status, res.statusText);
        return;
      }
      sessionStorage.removeItem(ANALYTICS_KEY);
      console.log('✅ Analytics sent');
    })
    .catch(err => {
      console.error('❌ Failed to send analytics:', err);
    });
  },

  handleVisibilityChange() {
    if (document.visibilityState === 'hidden') {
      this.sendAnalyticsData();
    }
  },

  getCookie(name) {
    return document.cookie
      .split('; ')
      .find(row => row.startsWith(name + '='))
      ?.split('=')[1];
  },
};

export default AnalyticsManager;
