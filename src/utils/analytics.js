// src/utils/analytics.js
class Analytics {
  constructor() {
    this.initialized = false;
  }
  
  init() {
    if (this.initialized) return;
    
    // Google Analytics
    if (import.meta.env.VITE_GOOGLE_ANALYTICS_ID) {
      this.initGA();
    }
    
    // Performance monitoring
    this.initPerformanceMonitoring();
    
    this.initialized = true;
  }
  
  initGA() {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${import.meta.env.VITE_GOOGLE_ANALYTICS_ID}`;
    document.head.appendChild(script);
    
    window.dataLayer = window.dataLayer || [];
    window.gtag = function() { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', import.meta.env.VITE_GOOGLE_ANALYTICS_ID);
  }
  
  initPerformanceMonitoring() {
    if ('performance' in window) {
      // Monitor Core Web Vitals
      this.observeWebVitals();
      
      // Monitor API calls
      this.monitorAPI();
    }
  }
  
  observeWebVitals() {
    if ('webVitals' in window) {
      // LCP, FID, CLS monitoring
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          this.sendToAnalytics({
            name: entry.name,
            value: entry.value,
            rating: entry.rating,
          });
        }
      }).observe({ type: 'web-vital', buffered: true });
    }
  }
  
  monitorAPI() {
    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
      const start = performance.now();
      const response = await originalFetch(...args);
      const duration = performance.now() - start;
      
      if (duration > 3000) {
        this.sendToAnalytics({
          type: 'slow_api',
          url: args[0],
          duration,
        });
      }
      
      return response;
    };
  }
  
  trackPageView(path) {
    if (window.gtag) {
      window.gtag('event', 'page_view', {
        page_path: path,
      });
    }
  }
  
  trackEvent(category, action, label = null, value = null) {
    if (window.gtag) {
      window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value,
      });
    }
  }
  
  trackEcommerce(type, data) {
    if (window.gtag) {
      window.gtag('event', type, {
        ...data,
        send_to: import.meta.env.VITE_GOOGLE_ANALYTICS_ID,
      });
    }
  }
  
  sendToAnalytics(data) {
    if (window.gtag) {
      window.gtag('event', 'performance', data);
    }
  }
}

export const analytics = new Analytics();