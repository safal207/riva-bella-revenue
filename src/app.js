import {demoMenu,demoPairs,categoryIds} from './menu.js';
import {demoBundles,validateBundles,bundleSummary,addBundle} from './bundles.js';
import {safePrice,variableCost,contribution,contributionRate,cartCount,cartTotal,cartAdd,cartRemove,validateMenu,recommend,classify,simulateMonthly} from './core.js';
import {text,getLanguage} from './i18n.js';
import {track,getEvents} from './analytics.js';
const issues = [...validateMenu(demoMenu, demoPairs), ...validateBundles(demoBundles,demoMenu)];
if (issues.length) console.error('Invalid demo menu', issues);
const app = document.querySelector('#app');
const menuIndex = new Map(demoMenu.map(item=>[item.id,item]));
const initialLanguage = (() => {try{return localStorage.getItem('riva-language')}catch{return null}})();
const state = {
  lang: getLanguage(initialLanguage || (navigator.language||'tr').slice(0,2)),
  cart: loadCart(), category:'all', search:'', view:'menu', drawer:false, detail:null,
  simulator:{orders:1200, attach:18, margin:90}, impressionIds:new Set(), bundleImpressions:new Set()
};

function loadCart() {
  try {
    const raw=JSON.parse(localStorage.getItem('riva-demo-cart')||'{}');
    const result={};
    if(!raw || typeof raw!=='object' || Array.isArray(raw)) return result;
    for(const [id,count] of Object.entries(raw)) if(menuIndex.has(id) && Number.isInteger(count) && count>0) result[id]=Math.min(99,count);
    return result;
  }catch{return {}}
}
function saveCart(){try{localStorage.setItem('riva-demo-cart', JSON.stringify(state.cart))}catch{}}
function saveLanguage(){try{localStorage.setItem('riva-language',state.lang)}catch{}}
function tr(k){return text[state.lang][k]||k}
function esc(value){return String(value??'').replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function money(n){return new Intl.NumberFormat(state.lang==='tr'?'tr-TR':state.lang==='ru'?'ru-RU':'en-US',{style:'currency',currency:'TRY',maximumFractionDigits:0}).format(n)}
function decimal(n){return new Intl.NumberFormat(state.lang==='tr'?'tr-TR':state.lang==='ru'?'ru-RU':'en-US',{maximumFractionDigits:0}).format(n)}
function name(item){return esc(item.title[state.lang]||item.title.tr)}
function desc(item){return esc(item.description[state.lang]||item.description.tr)}
const icon = (char,extra='')=>`<span aria-hidden="true" class="icon ${extra}">${char}</span>`;

function shell(){
  return `<div class="site-shell">
    <div class="demo-banner">${icon('◇')} ${esc(tr('demo'))}</div>
    <header class="topbar">
      <div class="topbar-inner">
        <button class="wordmark" data-action="home" aria-label="Riva Bella ${esc(tr('home'))}">
          <span class="wordmark-symbol" aria-hidden="true">RB</span>
          <span class="wordmark-text">RIVA <strong>BELLA</strong><small>RESTAURANT EXPERIENCE</small></span>
        </button>
        <div class="topbar-controls">
          <div class="language" aria-label="Language">
           ${['tr','en','ru'].map(code=>`<button data-action="lang" data-lang="${code}" class="lang-option ${state.lang===code?'active':''}" aria-pressed="${state.lang===code}">${code.toUpperCase()}</button>`).join('')}
          </div>
          <button aria-label="${esc(tr('owner'))}" class="owner-link ${state.view==='owner'?'selected':''}" data-action="owner">${icon('▥')}<span>${esc(tr('owner'))}</span></button>
          <button class="basket-button" data-action="open-cart" aria-label="${esc(tr('cart'))}">${icon('▣')}<span class="cart-label">${esc(tr('cart'))}</span><span class="basket-count" id="header-count">0</span></button>
        </div>
      </div>
    </header>
    <main id="main-content"></main>
    <div id="mobile-cart-button" class="mobile-cart-bar"></div>
    <div id="drawer-overlay" class="overlay" data-action="close-cart" hidden></div>
    <aside id="cart-drawer" class="drawer" aria-label="${esc(tr('cart'))}" role="dialog" aria-modal="true" hidden>
      <div class="drawer-head"><div><div class="eyebrow">RIVA BELLA</div><h2>${esc(tr('cart'))}</h2></div>
      <button class="round-close" data-action="close-cart" aria-label="${esc(tr('close'))}">×</button></div>
      <div class="drawer-body" id="cart-content"></div>
    </aside>
    <div id="detail-overlay" class="overlay" data-action="close-detail" hidden></div>
    <div id="detail-dialog" class="detail-dialog" aria-modal="true" role="dialog" hidden></div>
    <div id="toast" class="toast" role="status" aria-live="polite"></div>
    <footer class="footer"><strong>RIVA BELLA</strong> <span> · CONCEPT PREVIEW</span> <span class="footer-note">${esc(tr('orderNote'))}</span></footer>
  </div>`;
}
function hero(){
  return `<section class="hero"><div class="hero-inner">
    <div class="hero-copy"><div class="hero-ornament">✦ &nbsp; RIVA BELLA &nbsp; ✦</div>
      <h1>${esc(tr('intro'))}</h1><p class="hero-subtitle">${esc(tr('subtitle'))}</p>
      <div class="hero-actions"><button data-action="quick" class="btn btn-primary">${esc(tr('choose'))}<span aria-hidden="true">↗</span></button>
        <button data-action="scroll-menu" class="btn btn-ghost">${esc(tr('seeMenu'))} <span aria-hidden="true">↓</span></button></div>
      <div class="hero-foot">EST. 2026 <span>✧</span> ${esc(tr('testData'))}</div>
    </div>
    <div class="hero-visual" aria-hidden="true"><div class="hero-ring"><div class="hero-plate"><div class="hero-dish">🍽️</div></div></div><div class="hero-glow"></div><div class="floating-card"><span>✦</span> CURATED EXPERIENCE</div></div>
  </div></section>`;
}

function bundleSection() {
  const cards=demoBundles.map(bundle=>{
    const summary=bundleSummary(bundle,demoMenu);
    if(!summary)return '';
    const parts=summary.lines.map(({item,quantity})=>quantity+' × '+name(item)).join(' · ');
    return '<article class="occasion-card" data-bundle-id="'+esc(bundle.id)+'">' +
      '<div class="occasion-symbol" aria-hidden="true">'+esc(bundle.emoji)+'</div>'+
      '<h3>'+esc(bundle.title[state.lang])+'</h3>'+
      '<p>'+esc(bundle.description[state.lang])+'</p>'+
      '<div class="occasion-parts">'+parts+'</div>'+
      '<div class="occasion-bottom"><strong>'+money(summary.total)+'</strong>'+
      '<button class="occasion-add" data-action="add-bundle" data-id="'+esc(bundle.id)+'">'+esc(tr('bundleAdd'))+' ＋</button></div>'+
      '</article>';
  }).filter(Boolean).join('');
  return '<section class="occasion-section" id="occasions">'+
    '<div class="section-heading"><div><div class="eyebrow">✦ &nbsp; RIVA BELLA / CURATED CHOICES</div>'+
    '<h2>'+esc(tr('bundleTitle'))+'</h2><p>'+esc(tr('bundleSubtitle'))+'</p></div></div>'+
    '<div class="occasion-grid">'+cards+'</div>'+
    '<p class="occasion-note">'+esc(tr('bundleNote'))+
      ' <a href="https://qrmn.net/rivabella" target="_blank" rel="noopener noreferrer">'+esc(tr('officialMenu'))+' ↗</a></p>'+
    '</section>';
}

function categoryButtons(){return categoryIds.map(id=>`<button data-action="category" data-category="${id}" aria-pressed="${state.category===id}" class="category-pill ${state.category===id?'is-selected':''}">${esc(tr(id))}</button>`).join('')}
function card(item){
  const popularity = item.tags.includes('popular') ? `<span class="item-badge">★ ${esc(tr('testData'))}</span>` : '';
  return `<article class="menu-card" data-item="${esc(item.id)}">
     <button class="food-photo" data-action="details" data-id="${esc(item.id)}" aria-label="${esc(tr('view'))}: ${name(item)}">
       <img loading="lazy" decoding="async" src="${esc(item.photo)}" alt="" onerror="this.style.display='none'">
       <span class="food-fallback" aria-hidden="true">${esc(item.emoji)}</span>${popularity}
     </button>
     <div class="menu-card-body"><div class="card-top"><h3>${name(item)}</h3><span class="item-price">${money(item.publicPrice)}</span></div>
       <p>${desc(item)}</p><div class="card-bottom"><button data-action="details" data-id="${esc(item.id)}" class="text-link">${esc(tr('view'))} <span>↗</span></button>
       <button class="add-button" data-action="add" data-id="${esc(item.id)}" aria-label="${esc(tr('add'))}: ${name(item)}"><span aria-hidden="true">＋</span> ${esc(tr('add'))}</button></div></div>
  </article>`;
}
function renderMenu(){
  const root=document.querySelector('#main-content');
  root.innerHTML = `${hero()}${bundleSection()}
    <section class="quick-choice" id="quick-choice"><div class="section-heading compact"><div><div class="eyebrow">✦ &nbsp; SIMPLE BY DESIGN</div><h2>${esc(tr('selected'))}</h2><p>${esc(tr('how'))}</p></div></div>
      <div class="quick-options">${categoryIds.filter(x=>x!=='all').slice(0,5).map((id,i)=>`<button class="quick-option quick-${i}" data-action="category" data-category="${id}"><span>${['🍳','🍕','🍔','🍰','☕'][i]}</span><b>${esc(tr(id))}</b><em>↗</em></button>`).join('')}</div>
    </section>
    <section id="menu" class="menu-section"><div class="section-heading"><div><div class="eyebrow">THE RIVA BELLA SELECTION</div><h2>${esc(tr('menuTitle'))}</h2><p>${esc(tr('menuSubtitle'))}</p></div><div class="menu-count" id="menu-count"></div></div>
       <div class="filters"><div class="categories" aria-label="Categories" id="categories">${categoryButtons()}</div>
       <label class="search-wrap">${icon('⌕')}<input type="search" id="menu-search" placeholder="${esc(tr('search'))}" value="${esc(state.search)}" aria-label="${esc(tr('search'))}"></label></div>
       <div class="menu-grid" id="menu-grid"></div>
    </section>`;
  renderCards();
  if('IntersectionObserver' in window){
    const observer=new IntersectionObserver((entries,obs)=>{
      for(const entry of entries){
        if(!entry.isIntersecting)continue;
        const id=entry.target.dataset.bundleId;
        if(id&&!state.bundleImpressions.has(id)){
          track('bundle_impression',{productId:id});
          state.bundleImpressions.add(id);
        }
        obs.unobserve(entry.target);
      }
    },{threshold:0.45});
    document.querySelectorAll('[data-bundle-id]').forEach(node=>{
      if(!state.bundleImpressions.has(node.dataset.bundleId))observer.observe(node);
    });
  }
}
function renderCards(){
  if(state.view!=='menu')return;
  const q=state.search.toLocaleLowerCase(state.lang).trim();
  const items=demoMenu.filter(item => item.available && (state.category==='all'||item.category===state.category) &&
    (!q||Object.values(item.title).some(t=>t.toLocaleLowerCase(state.lang).includes(q))));
  document.querySelector('#menu-grid').innerHTML=items.length?items.map(card).join(''):`<div class="no-results">${esc(tr('noItems'))}</div>`;
  document.querySelector('#menu-count').textContent=`${items.length} ${tr('unit')}`;
  document.querySelector('#categories').innerHTML=categoryButtons();
}
function ownerView(){
  const cls=classify(demoMenu); const classMap=new Map(cls.map(x=>[x.id,x]));
  const eventList=getEvents(); const counts=Object.entries(eventList.reduce((a,e)=>{a[e.event]=(a[e.event]||0)+1;return a},{})).sort((a,b)=>b[1]-a[1]);
  return `<section class="owner-intro"><div class="owner-content"><button data-action="home" class="back-button">← ${esc(tr('back'))}</button>
    <div class="eyebrow">RIVA BELLA / BUSINESS INTELLIGENCE / SANDBOX</div><h1>${esc(tr('ownerTitle'))}</h1><p>${esc(tr('ownerSub'))}</p></div></section>
    <div class="owner-main"><div class="owner-stat-grid"><div class="owner-stat"><span>${esc(tr('products'))}</span><strong>${demoMenu.length}</strong><small>${esc(tr('testData'))}</small></div>
      <div class="owner-stat"><span>${esc(tr('gross'))}</span><strong>${money(cartTotal(state.cart,demoMenu))}</strong><small>${esc(tr('testData'))}</small></div>
      <div class="owner-stat"><span>${esc(tr('experiments'))}</span><strong>${eventList.length}</strong><small>${esc(tr('eventNote'))}</small></div></div>
      <section class="dashboard-section"><div class="section-heading compact"><div><div class="eyebrow">UNIT ECONOMICS</div><h2>${esc(tr('profitTitle'))}</h2><p>${esc(tr('demoInsight'))}</p></div></div>
        <div class="table-scroll"><table><thead><tr><th>${esc(tr('product'))}</th><th>${esc(tr('quantity'))}</th><th>${esc(tr('contribution'))}</th><th>${esc(tr('group'))}</th></tr></thead>
         <tbody>${demoMenu.filter(x=>x.available).map(item=>`<tr><td>${name(item)}</td><td>${item.unitsSold}</td><td>${money(contribution(item))}</td><td><span class="type-pill type-${classMap.get(item.id).group}">${esc(tr(classMap.get(item.id).group))}</span></td></tr>`).join('')}</tbody></table></div>
      </section>
      <section class="dashboard-section"><div class="section-heading compact"><div><div class="eyebrow">SCENARIO MODEL</div><h2>${esc(tr('simulator'))}</h2><p>${esc(tr('demoInsight'))}</p></div></div>
        <div class="simulator"><div class="simulator-controls">
          ${slider('orders',tr('orders'),200,5000,100,state.simulator.orders)}
          ${slider('attach',tr('attach'),0,50,1,state.simulator.attach)}
          ${slider('margin',tr('addonMargin'),10,300,5,state.simulator.margin)}
          </div><div class="simulator-result"><span>${esc(tr('extra'))}</span><strong id="uplift-value"></strong><small>${esc(tr('demoInsight'))}</small></div></div>
      </section>
      <section class="dashboard-section"><div class="section-heading compact"><div><div class="eyebrow">SESSION INSTRUMENTATION</div><h2>${esc(tr('events'))}</h2><p>${esc(tr('eventNote'))}</p></div></div>
        <div class="event-grid">${counts.length?counts.map(([k,v])=>`<div class="event-item"><span>${esc(k)}</span><strong>${v}</strong></div>`).join(''):'<div class="empty-events">—</div>'}</div>
      </section>
    </div>`;
}
function slider(id,label,min,max,step,value){return `<label class="slider-row"><span class="slider-label"><span>${esc(label)}</span><strong data-slider-value="${id}">${decimal(value)}</strong></span><input type="range" data-slider="${id}" min="${min}" max="${max}" step="${step}" value="${value}"></label>`}
function updateSimulator(){
  const sim=state.simulator;
  const out=simulateMonthly(sim.orders,sim.attach,sim.margin);
  const dest=document.querySelector('#uplift-value'); if(dest)dest.textContent=money(out.contribution);
  for(const id of ['orders','attach','margin']){const e=document.querySelector(`[data-slider-value="${id}"]`);if(e)e.textContent=decimal(sim[id])+(id==='attach'?'%':id==='margin'?' ₺':'')}
}
function renderCart(){
  const content=document.querySelector('#cart-content'); if(!content)return;
  const selected=demoMenu.filter(item=>state.cart[item.id]>0);
  const suggestions=recommend(state.cart,demoMenu,demoPairs);
  content.innerHTML = `${selected.length?`<div class="cart-items">${selected.map(item=>`<div class="cart-item">
    <div class="cart-item-thumb">${esc(item.emoji)}</div><div class="cart-item-info"><h3>${name(item)}</h3><span>${money(item.publicPrice)}</span></div>
    <div class="quantity"><button data-action="remove" data-id="${esc(item.id)}" aria-label="Remove one ${name(item)}">−</button><output>${state.cart[item.id]}</output><button data-action="add" data-id="${esc(item.id)}" aria-label="Add one ${name(item)}">＋</button></div>
    </div>`).join('')}</div>`:`<div class="empty-cart"><span>♧</span><h3>${esc(tr('noItems'))}</h3><p>${esc(tr('how'))}</p></div>`}
    ${suggestions.length?`<section class="recommendation"><div class="eyebrow">✧ ${esc(tr('suggested'))}</div><h3>${esc(tr('matches'))}</h3>
      ${suggestions.map(({item})=>`<div class="suggestion-row"><span class="suggestion-image">${esc(item.emoji)}</span><div><strong>${name(item)}</strong><small>${money(item.publicPrice)}</small></div><button data-action="add-suggestion" data-id="${esc(item.id)}" aria-label="${esc(tr('add'))}: ${name(item)}">+</button></div>`).join('')}
    </section>`:''}
    <div class="cart-summary"><div class="summary-line"><span>${esc(tr('subtotal'))}</span><strong>${money(cartTotal(state.cart,demoMenu))}</strong></div>
    <button class="btn btn-primary btn-full" data-action="copy" ${!selected.length?'disabled':''}>${esc(tr('copy'))} ↗</button><p>${esc(tr('orderNote'))}</p></div>`;
  document.querySelector('#header-count').textContent=cartCount(state.cart);
  const mobile=document.querySelector('#mobile-cart-button');
  if(cartCount(state.cart)){mobile.innerHTML=`<button data-action="open-cart" class="mobile-cart-trigger"><span>▣ &nbsp; ${esc(tr('cart'))} · ${cartCount(state.cart)}</span><strong>${money(cartTotal(state.cart,demoMenu))} ↗</strong></button>`;mobile.classList.add('show')}
  else {mobile.innerHTML='';mobile.classList.remove('show')}
  if(state.drawer) for(const {item} of suggestions){if(!state.impressionIds.has(item.id)){track('addon_impression',{productId:item.id});state.impressionIds.add(item.id)}}
}
function openCart(){state.drawer=true;document.querySelector('#drawer-overlay').hidden=false;document.querySelector('#cart-drawer').hidden=false;document.body.classList.add('dialog-open');renderCart();track('cart_open');document.querySelector('.round-close').focus()}
function closeCart(){state.drawer=false;document.querySelector('#drawer-overlay').hidden=true;document.querySelector('#cart-drawer').hidden=true;document.body.classList.remove('dialog-open')}
function openDetail(id){
 const item=menuIndex.get(id);if(!item)return;state.detail=id;
 const d=document.querySelector('#detail-dialog');
 d.innerHTML=`<button class="round-close detail-close" data-action="close-detail" aria-label="${esc(tr('close'))}">×</button>
 <div class="detail-photo"><img src="${esc(item.photo)}" alt="" onerror="this.style.display='none'"/><span>${esc(item.emoji)}</span></div>
 <div class="detail-content"><div class="eyebrow">RIVA BELLA · ${esc(tr(item.category))}</div><h2>${name(item)}</h2><p>${desc(item)}</p><div class="caution">${esc(tr('noAllergens'))}</div>
 <div class="detail-footer"><strong>${money(item.publicPrice)}</strong><button class="btn btn-primary" data-action="add" data-id="${esc(item.id)}">＋ ${esc(tr('add'))}</button></div></div>`;
 d.hidden=false;document.querySelector('#detail-overlay').hidden=false;document.body.classList.add('dialog-open');track('product_view',{productId:id});d.querySelector('.detail-close').focus();
}
function closeDetail(){state.detail=null;document.querySelector('#detail-dialog').hidden=true;document.querySelector('#detail-overlay').hidden=true;document.body.classList.remove('dialog-open')}
function toast(message){const el=document.querySelector('#toast');if(!el)return;el.textContent=message;el.classList.add('visible');clearTimeout(toast.timer);toast.timer=setTimeout(()=>el.classList.remove('visible'),2200)}
function renderApp(){const y=window.scrollY;app.innerHTML=shell();document.documentElement.lang=state.lang;document.querySelector('#main-content').innerHTML=state.view==='menu'?'':ownerView();if(state.view==='menu')renderMenu();else updateSimulator();renderCart();window.scrollTo(0,y)}
function showView(view){state.view=view;closeIfOpen();window.scrollTo(0,0);renderApp()}
function closeIfOpen(){if(state.detail)closeDetail();if(state.drawer)closeCart()}
function changeCategory(category){if(!categoryIds.includes(category))return;state.category=category;state.view='menu';renderCards();track('category_select',{category});document.querySelector('#menu')?.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'})}
function changeLanguage(lang){state.lang=getLanguage(lang);saveLanguage();renderApp()}
function add(id, source){if(!menuIndex.has(id))return;state.cart=cartAdd(state.cart,id);saveCart();track(source==='suggestion'?'addon_accepted':'add_to_cart',{productId:id});renderCart();toast(tr('added'))}
function addOccasion(id){
  const bundle=demoBundles.find(b=>b.id===id);
  if(!bundle)return;
  const updated=addBundle(state.cart,bundle,demoMenu);
  if(!updated){toast(tr('bundleError'));return}
  state.cart=updated;saveCart();track('bundle_added',{productId:id});renderCart();openCart();toast(tr('bundleAdded'));
}
function remove(id){if(!menuIndex.has(id))return;state.cart=cartRemove(state.cart,id);saveCart();track('remove_from_cart',{productId:id});renderCart()}
async function copyOrder(){
 const lines=demoMenu.filter(item=>state.cart[item.id]>0).map(item=>`${item.title[state.lang]} × ${state.cart[item.id]} — ${money(item.publicPrice*state.cart[item.id])}`);
 if(!lines.length)return;
 const content=`RIVA BELLA — CONCEPT DEMO\n${lines.join('\n')}\n${tr('subtotal')}: ${money(cartTotal(state.cart,demoMenu))}\n${tr('orderNote')}`;
 try {await navigator.clipboard.writeText(content);track('order_draft_copied');toast(tr('copied'))}
 catch {try {const el=document.createElement('textarea');el.value=content;el.style.position='fixed';el.style.opacity='0';document.body.append(el);el.select();const ok=document.execCommand('copy');el.remove();if(!ok)throw Error('copy');track('order_draft_copied');toast(tr('copied'))}catch{toast(tr('copyFail'))}}
}

document.addEventListener('click',event=>{
 const button=event.target.closest('[data-action]');if(!button)return;
 const {action,id,lang,category}=button.dataset;
 switch(action){
  case 'home': showView('menu');break;
  case 'owner': showView(state.view==='owner'?'menu':'owner');break;
  case 'lang': changeLanguage(lang);break;
  case 'quick': document.querySelector('#occasions')?.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});break;
  case 'scroll-menu': document.querySelector('#menu')?.scrollIntoView({behavior:'smooth'});break;
  case 'category': changeCategory(category);break;
  case 'add': add(id);break;
  case 'add-suggestion': add(id,'suggestion');break;
  case 'add-bundle': addOccasion(id);break;
  case 'remove': remove(id);break;
  case 'open-cart': openCart();break;
  case 'close-cart': closeCart();break;
  case 'details': openDetail(id);break;
  case 'close-detail': closeDetail();break;
  case 'copy': copyOrder();break;
 }
});
document.addEventListener('input',event=>{
 if(event.target.id==='menu-search'){state.search=event.target.value;renderCards()}
 if(event.target.dataset.slider){const key=event.target.dataset.slider;state.simulator[key]=Number(event.target.value);updateSimulator()}
});
document.addEventListener('keydown',event=>{if(event.key==='Escape'){if(state.detail)closeDetail();else if(state.drawer)closeCart()}});
track('menu_view');renderApp();
