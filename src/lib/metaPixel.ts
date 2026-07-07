/**
 * Meta/Facebook Pixel & Conversions API (CAPI) Integration Utility
 * Handles dual-track client (browser) and secure server-side tracking.
 */

const DEFAULT_PIXEL_ID = '1407604213914859';

interface PixelEventData {
  email?: string;
  value?: number;
  currency?: string;
  content_name?: string;
  content_type?: string;
  [key: string]: any;
}

// Get the Pixel ID from environment variables, fallback to the requested ID
export const getPixelId = (): string => {
  return ((import.meta as any).env?.VITE_FB_PIXEL_ID as string) || DEFAULT_PIXEL_ID;
};

/**
 * Dynamically initializes the standard Meta Pixel browser SDK script
 */
export const initPixel = () => {
  if (typeof window === 'undefined') return;
  
  const pixelId = getPixelId();

  // If already initialized, don't re-initialize
  if ((window as any).fbq) {
    return;
  }

  /* eslint-disable */
  (function(f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
    if (f.fbq) return;
    n = f.fbq = function() {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = !0;
    n.version = '2.0';
    n.queue = [];
    t = b.createElement(e);
    t.async = !0;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
  /* eslint-enable */

  // Initialize and track PageView
  (window as any).fbq('init', pixelId);
  (window as any).fbq('track', 'PageView');
  
  console.log(`[Meta Pixel] Initialized successfully with ID: ${pixelId}`);
};

/**
 * Tracks a custom or standard Meta Pixel event.
 * Fires BOTH standard browser-side event and the secure Conversions API server proxy.
 */
export const trackEvent = async (eventName: string, data: PixelEventData = {}) => {
  if (typeof window === 'undefined') return;

  const pixelId = getPixelId();
  
  // 1. Browser-side Tracking (Meta Pixel SDK)
  if ((window as any).fbq) {
    try {
      const fbData: Record<string, any> = {};
      if (data.value !== undefined) fbData.value = data.value;
      if (data.currency !== undefined) fbData.currency = data.currency || 'BRL';
      if (data.content_name !== undefined) fbData.content_name = data.content_name;
      if (data.content_type !== undefined) fbData.content_type = data.content_type;
      
      // Do not send raw email to browser-side track (Meta SDK hashes it automatically if configured, or uses Advanced Matching)
      (window as any).fbq('track', eventName, fbData);
      console.log(`[Meta Pixel] Client event tracked: ${eventName}`, fbData);
    } catch (err) {
      console.error('[Meta Pixel] Client tracking failed:', err);
    }
  } else {
    // If Pixel wasn't initialized yet, try initializing now
    initPixel();
  }

  // 2. Server-side Tracking Proxy (Conversions API)
  try {
    const response = await fetch('/api/fb-capi', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        eventName,
        eventUrl: window.location.href,
        email: data.email,
        value: data.value,
        currency: data.currency || 'BRL',
        contentName: data.content_name || data.contentName,
      }),
    });
    
    if (response.ok) {
      const resJson = await response.json();
      console.log(`[Meta CAPI] Server event proxy success: ${eventName}`, resJson);
    } else {
      console.warn(`[Meta CAPI] Server event proxy returned non-OK status: ${response.status}`);
    }
  } catch (err) {
    console.error('[Meta CAPI] Server proxy connection error:', err);
  }
};
