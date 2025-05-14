// utils/AnalyticsManager.js

const ANALYTICS_KEY = 'analyticsData';
const SESSION_KEY = '__tea_session_id_515785';
const COOKIE_KEY = 'session_meta';
const API_ENDPOINT = 'https://r98ngavlng.execute-api.ap-southeast-2.amazonaws.com/default/voyex_analytics';

let pageStartTime = null;
let userEngaged = false;

const AnalyticsManager = {
  async init() {
    await this.ensureSessionIdFromServer();
    pageStartTime = Date.now();

    this.storeEvent('page_load', {
      path: window.location.pathname,
    });

    document.addEventListener('click', this.handleClick.bind(this));
    window.addEventListener('scroll', this.handleScroll.bind(this));
    window.addEventListener('beforeunload', this.handlePageUnload.bind(this));
    document.addEventListener('click', this.handleRedirect.bind(this));

    // Track random queries
    const recommendedQuery = document.getElementById('randomqueries_clicked');
    if (recommendedQuery) {
      recommendedQuery.addEventListener('click', () => {
        this.storeEvent('recommended_query_click', { count: 1, query: recommendedQuery.textContent });
      });
    }

    // Track trending queries
    const trendingQuery = document.getElementById('trendingqueries_clicked');
    if (trendingQuery) {
      trendingQuery.addEventListener('click', () => {
        this.storeEvent('trending_query_click', { count: 1, query: trendingQuery.textContent });
      });
    }

    // Track search keywords
    const searchInput = document.getElementById('search_input');
    if (searchInput) {
      searchInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
          event.preventDefault();
          const keyword = searchInput.value.trim();
          if (keyword.length > 0) {
            this.storeEvent('search', { keyword });
          }
        }
      });
    }

    // Track loginButton click
    const loginButton = document.getElementById('log_in_button');
    if (loginButton) {
      loginButton.addEventListener('click', () => {
        this.storeEvent('auth_click', { action: 'login' });
      });
    }

    // Track SignUpButton click
    const signUpButton = document.getElementById('sign_up_button');
    if (signUpButton) {
      signUpButton.addEventListener('click', () => {
        this.storeEvent('auth_click', { action: 'signup' });
      });
    }
  },

  getEntityInfo() {
    let entityId = localStorage.getItem("entityId");
    let entityType = localStorage.getItem("userType") || localStorage.getItem("orgType");
  
    if (!entityId || !entityType) {
      // Generate guest ID if missing
      entityId = localStorage.getItem("guestId");
      if (!entityId) {
        entityId = 'guest_' + Math.random().toString(36).substring(2, 15);
        localStorage.setItem("guestId", entityId);
      }
      entityType = "guest";
    }
  
    return { entityId, entityType };
  },

  
  
  async ensureSessionIdFromServer() {
    const { entityId, entityType } = this.getEntityInfo();
    const existing = this.getCookie(COOKIE_KEY);
    if (!existing) {
      try {
        const res = await fetch(API_ENDPOINT, {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            service: 'session',
            entity_type: entityType,
            entity_id: entityId,
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
    userEngaged = true;
    if (event.target.id === 'randomqueries_clicked' || event.target.id === 'trendingqueries_clicked') {
      const queryText = event.target.textContent;
      this.storeEvent('query_usage', { query: queryText });
      this.trackQueryClick(queryText); // Track the specific query clicked
    }
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

  handleScroll() {
    const scrollPercent = Math.round(
      (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
    );
    this.storeEvent('scroll', { scroll_depth: `${scrollPercent}%` });
  },

  handleRedirect(event) {
    if (event.target.tagName === 'A') {
      this.storeEvent('redirected_from_page', { to: event.target.href });
    }
  },

  handlePageUnload() {
    if (!userEngaged) {
      this.storeEvent('non_engagement', { reason: 'no clicks or interactions' });
    }
    if (pageStartTime) {
      const timeSpentSeconds = Math.floor((Date.now() - pageStartTime) / 1000);
      this.storeEvent('page_stay', {
        path: window.location.pathname,
        duration_seconds: timeSpentSeconds,
      });
    }
    this.sendAnalyticsData();
  },

  storeEvent(type, payload) {
    const current = JSON.parse(sessionStorage.getItem(ANALYTICS_KEY)) || [];
    current.push({
      type: type,
      event: payload,
      timestamp: new Date().toISOString(),
    });
    sessionStorage.setItem(ANALYTICS_KEY, JSON.stringify(current));
  },

  trackQueryClick(queryText) {
    let queryData = JSON.parse(sessionStorage.getItem('queryClicks')) || {};
    if (!queryData[queryText]) {
      queryData[queryText] = 0;
    }
    queryData[queryText]++;
    sessionStorage.setItem('queryClicks', JSON.stringify(queryData));
    this.sendQueryDataPeriodically();
  },

  trackSearchKeyword(keyword) {
    let searchData = JSON.parse(sessionStorage.getItem('searchKeywords')) || {};
    if (!searchData[keyword]) {
      searchData[keyword] = 0;
    }
    searchData[keyword]++;
    sessionStorage.setItem('searchKeywords', JSON.stringify(searchData));
    this.sendSearchDataPeriodically();
  },

  sendQueryDataPeriodically() {
    // Optionally send query data to backend every 5 minutes
    setTimeout(() => {
      const queryData = JSON.parse(sessionStorage.getItem('queryClicks')) || {};
      if (Object.keys(queryData).length > 0) {
        this.sendAnalyticsData(queryData, 'query_usage');
        sessionStorage.removeItem('queryClicks');
      }
    }, 5 * 60 * 1000); // 5 minutes
  },

  sendSearchDataPeriodically() {
    // Optionally send search keyword data to backend every 10 minutes
    setTimeout(() => {
      const searchData = JSON.parse(sessionStorage.getItem('searchKeywords')) || {};
      if (Object.keys(searchData).length > 0) {
        this.sendAnalyticsData(searchData, 'search');
        sessionStorage.removeItem('searchKeywords');
      }
    }, 10 * 60 * 1000); // 10 minutes
  },

  sendAnalyticsData(data, type) {
    const { entityId, entityType } = this.getEntityInfo();
    const payload = {
      service: 'analytics',
      action: 'insert',
      eventTypes: [type],
      event: {
        [type]: data,
      },
      metadata: {
        user_agent: navigator.userAgent,
        device: window.innerWidth < 768 ? 'mobile' : 'desktop',
        entity_id: entityId,
        entity_type: entityType,
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
      console.log('✅ Analytics sent');
    })
    .catch(err => {
      console.error('❌ Failed to send analytics:', err);
    });
  },

  getCookie(name) {
    return document.cookie
      .split('; ')
      .find(row => row.startsWith(name + '='))?.split('=')[1];
  },
};

export default AnalyticsManager;
