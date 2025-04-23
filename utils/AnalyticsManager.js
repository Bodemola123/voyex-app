// utils/AnalyticsManager.js

const ANALYTICS_KEY = 'analyticsData';
const SESSION_KEY = '__tea_session_id_515785';
const COOKIE_KEY = 'session_meta'
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
    const existing = this.getCookie(COOKIE_KEY);
    if (!existing) {
      try {
        const res = await fetch(API_ENDPOINT, {
          method: 'POST',
          credentials: 'include', // Allows the server to set cookies
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            service: 'session',
            entity_type: 'user',
            entity_id: '21123',
            referrer: document.referrer || 'direct',
            path: window.location.pathname,
          }),
        });
  
        console.log('📡 Session initiation request sent. Status:', res.status);
      } catch (err) {
        console.error('❌ Failed to trigger session setup API:', err);
      }
    } else {
      console.log('🔄 session_meta cookie present. Session already established.', existing);
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
    const existing = this.getCookie(COOKIE_KEY);
    const raw = sessionStorage.getItem(ANALYTICS_KEY);
    const sessionId = sessionStorage.getItem(SESSION_KEY)

    console.log("session meta is:", existing)

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

    console.log('📦 Final payload being sent:', payload);


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
