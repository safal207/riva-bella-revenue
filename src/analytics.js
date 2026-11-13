const EVENTS_KEY = 'rb-session-events';
const allowedEvents = new Set(['menu_view','category_select','product_view','add_to_cart','remove_from_cart','cart_open','addon_impression','addon_accepted','order_draft_copied','bundle_impression','bundle_added','view_mode_change','favorite_toggle','product_share','product_share_fallback']);
const clean = v => String(v ?? '').replace(/[^a-zA-Z0-9_\-]/g,'').slice(0,64);
function track(event, properties={}) {
  if(!allowedEvents.has(event)) return;
  try {
    const current = JSON.parse(sessionStorage.getItem(EVENTS_KEY)||'[]');
    const payload = {event, at:new Date().toISOString(), productId:clean(properties.productId), category:clean(properties.category),
      source:clean(new URLSearchParams(location.search).get('utm_source'))};
    current.push(payload);
    sessionStorage.setItem(EVENTS_KEY,JSON.stringify(current.slice(-200)));
  } catch { /* never interrupt the menu due to blocked storage */ }
}
function getEvents() {
  try { const v = JSON.parse(sessionStorage.getItem(EVENTS_KEY)||'[]'); return Array.isArray(v)?v:[]; } catch{return []}
}






export {track,getEvents};
