// utils/AnalyticsManager.js

// Constants for keys and API endpoint
const ANALYTICS_KEY = 'analyticsData'; // Key used to store events in sessionStorage
const SESSION_KEY = '__tea_session_id_515785'; // Session ID saved in sessionStorage
const COOKIE_KEY = 'session_meta'; // Cookie key expected to be set by the server
const API_ENDPOINT = 'https://r98ngavlng.execute-api.ap-southeast-2.amazonaws.com/default/voyex_analytics';

const AnalyticsManager = {
  async init() {
    // Ensure the session is established by calling the API once
    await this.ensureSessionIdFromServer();

    // Add event listeners for user interactions
    document.addEventListener('click', this.handleClick.bind(this)); // Track clicks
    window.addEventListener('scroll', this.handleScroll.bind(this)); // Track scrolls
    window.addEventListener('beforeunload', this.sendAnalyticsData.bind(this)); 
    // 'beforeunload' triggers when user closes tab, reloads, or navigates away
  },

  async ensureSessionIdFromServer() {
    const existing = this.getCookie(COOKIE_KEY); // Check if session cookie exists
    if (!existing) {
      try {
        // Send request to server to initiate a session
        const res = await fetch(API_ENDPOINT, {
          method: 'POST',
          credentials: 'include', // Accept cookies set by server
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            service: 'session',
            entity_type: 'user',
            entity_id: '21123', // Dummy user ID for example
            referrer: document.referrer || 'direct', // Where the user came from
            path: window.location.pathname, // Current page path
          }),
        });

        console.log('📡 Session initiation request sent. Status:', res.status);
        // Nothing is stored manually; the server handles cookie/session setting
      } catch (err) {
        console.error('❌ Failed to trigger session setup API:', err);
      }
    } else {
      console.log('🔄 session_meta cookie present. Session already established.', existing);
    }
  },

  handleClick(event) {
    // Prepare click event payload
    const payload = {
      click_position: {
        x: event.clientX,
        y: event.clientY,
      },
      tag: event.target.tagName,
      button_id: event.target.id || null,
    };

    this.storeEvent('click', payload); // Store the click event
  },

  handleScroll() {
    // Calculate how far the user has scrolled (as a percentage)
    const scrollPercent = Math.round(
      (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
    );
    this.storeEvent('scroll', { scroll_depth: `${scrollPercent}%` }); // Store scroll event
  },

  storeEvent(type, payload) {
    // Retrieve any existing analytics events from sessionStorage
    const current = JSON.parse(sessionStorage.getItem(ANALYTICS_KEY)) || [];

    // Add the new event to the list
    current.push({
      type,
      event: payload,
      timestamp: new Date().toISOString(),
    });

    // Save updated events back into sessionStorage
    sessionStorage.setItem(ANALYTICS_KEY, JSON.stringify(current));
  },

  sendAnalyticsData() {
    const raw = sessionStorage.getItem(ANALYTICS_KEY); // Fetch stored events

    if (!raw) {
      console.warn('❌ Missing events. Aborting send.', { raw });
      return;
    }

    const events = JSON.parse(raw);
    if (!Array.isArray(events) || events.length === 0) {
      console.warn('📭 No valid events to send.');
      return;
    }

    // Extract event types and merge all event data into one object
    const eventTypes = events.map(e => e.type);
    const mergedEventData = events.reduce((acc, curr) => {
      acc = { ...acc, ...curr.event };
      return acc;
    }, {});

    const payload = {
      service: 'analytics',
      action: 'insert',
      eventTypes: [...new Set(eventTypes)], // Deduplicate event types
      event: mergedEventData,
      metadata: {
        user_agent: navigator.userAgent, // Browser details
        device: window.innerWidth < 768 ? 'mobile' : 'desktop', // Device type
      },
    };

    console.log('📦 Final payload being sent:', payload);

    // Send the collected analytics data to the backend
    fetch(API_ENDPOINT, {
      method: 'POST',
      credentials: 'include', // Important to maintain session cookies
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      keepalive: true, // Allow sending even during page unload
    })
    .then(res => {
      if (!res.ok) {
        console.error('❌ Analytics send failed:', res.status, res.statusText);
        return;
      }
      sessionStorage.removeItem(ANALYTICS_KEY); // Clear stored events after successful send
      console.log('✅ Analytics sent');
    })
    .catch(err => {
      console.error('❌ Failed to send analytics:', err);
    });
  },

  getCookie(name) {
    // Utility function to retrieve a cookie value by name
    return document.cookie
      .split('; ')
      .find(row => row.startsWith(name + '='))
      ?.split('=')[1];
  },
};

export default AnalyticsManager;
