/**
 * DEMO FIXTURES ONLY. These items, prices, photos and sales figures are NOT
 * verified Riva Bella menu or POS data. Replace with owner-approved catalog.
 * Net revenue and variable costs are illustrative TRY amounts per sold item.
 */
const demoMenu = [
  {
    id: 'breakfast-board', category: 'breakfast', emoji: '🍳',
    title: { tr: 'Kahvaltı tabağı · demo', en: 'Breakfast board · demo', ru: 'Тарелка завтрака · демо' },
    description: { tr: 'Örnek menü ürünü; içerik doğrulanmamıştır.', en: 'Example menu item; ingredients are not verified.', ru: 'Демонстрационная позиция; состав не подтверждён.' },
    publicPrice: 420, netRevenue: 382, variableCosts: {ingredients: 128, packaging: 0, fees: 5, other: 18},
    unitsSold: 120, photo: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=880&q=80',
    tags: ['morning'], available: true
  },
  {
    id: 'eggs', category: 'breakfast', emoji: '🥚',
    title: { tr: 'Yumurtalı kahvaltı · demo', en: 'Egg breakfast · demo', ru: 'Завтрак с яйцами · демо' },
    description: { tr: 'Örnek ürün; alerjen bilgisi teyit edilmeli.', en: 'Sample item; allergens require verification.', ru: 'Пример блюда; аллергены необходимо подтвердить.' },
    publicPrice: 290, netRevenue: 264, variableCosts: {ingredients: 94, packaging: 0, fees: 3, other: 15},
    unitsSold: 90, photo: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=880&q=80',
    tags: ['morning'], available: true
  },
  {
    id: 'pizza', category: 'pizza', emoji: '🍕',
    title: { tr: 'Pizza · demo', en: 'Pizza · demo', ru: 'Пицца · демо' },
    description: { tr: 'Fotoğraf ve fiyat örnektir.', en: 'Illustrative photo and price.', ru: 'Фотография и цена приведены для примера.' },
    publicPrice: 440, netRevenue: 400, variableCosts: {ingredients: 166, packaging: 12, fees: 5, other: 21},
    unitsSold: 162, photo: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=880&q=80',
    tags: ['popular'], available: true
  },
  {
    id: 'burger', category: 'mains', emoji: '🍔',
    title: { tr: 'Burger · demo', en: 'Burger · demo', ru: 'Бургер · демо' },
    description: { tr: 'Ürün örnektir; gerçek menüden alınmamıştır.', en: 'Sample only, not sourced from the real menu.', ru: 'Образец, не перенесён из настоящего меню.' },
    publicPrice: 460, netRevenue: 418, variableCosts: {ingredients: 205, packaging: 15, fees: 6, other: 21},
    unitsSold: 110, photo: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=880&q=80',
    tags: [], available: true
  },
  {
    id: 'cheesecake', category: 'dessert', emoji: '🍰',
    title: { tr: 'Cheesecake · demo', en: 'Cheesecake · demo', ru: 'Чизкейк · демо' },
    description: { tr: 'Dilim fotoğrafı konsepti; gerçek ürün değildir.', en: 'Illustrative slice concept, not a verified item.', ru: 'Пример подачи в разрезе, не подтверждённая позиция.' },
    publicPrice: 260, netRevenue: 236, variableCosts: {ingredients: 78, packaging: 4, fees: 3, other: 12},
    unitsSold: 67, photo: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=880&q=80',
    tags: ['sweet'], available: true
  },
  {
    id: 'coffee', category: 'drinks', emoji: '☕',
    title: { tr: 'Sıcak kahve · demo', en: 'Hot coffee · demo', ru: 'Горячий кофе · демо' },
    description: { tr: 'Örnek içecek ve fiyat.', en: 'Illustrative drink and price.', ru: 'Пример напитка и цены.' },
    publicPrice: 150, netRevenue: 136, variableCosts: {ingredients: 34, packaging: 6, fees: 2, other: 8},
    unitsSold: 183, photo: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=880&q=80',
    tags: ['quick'], available: true
  },
  {
    id: 'lemonade', category: 'drinks', emoji: '🍋',
    title: { tr: 'Limonata · demo', en: 'Lemonade · demo', ru: 'Лимонад · демо' },
    description: { tr: 'Doğrulanmamış örnek içecek.', en: 'Unverified illustrative drink.', ru: 'Неподтверждённый пример напитка.' },
    publicPrice: 180, netRevenue: 164, variableCosts: {ingredients: 42, packaging: 7, fees: 2, other: 10},
    unitsSold: 48, photo: 'https://images.unsplash.com/photo-1513558161293-cdaf765edfd7?auto=format&fit=crop&w=880&q=80',
    tags: [], available: true
  },
  {
    id: 'fries', category: 'sides', emoji: '🍟',
    title: { tr: 'Patates kızartması · demo', en: 'Fries · demo', ru: 'Картофель фри · демо' },
    description: { tr: 'Örnek ek ürün.', en: 'Example add-on.', ru: 'Пример дополнения к заказу.' },
    publicPrice: 140, netRevenue: 127, variableCosts: {ingredients: 39, packaging: 6, fees: 2, other: 9},
    unitsSold: 124, photo: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=880&q=80',
    tags: [], available: true
  }
];

// Explicit compatibility pairs; never recommend a product only for its margin.
const demoPairs = [
  {baseId:'breakfast-board', addId:'coffee', relevance: 0.98},
  {baseId:'eggs', addId:'coffee', relevance: 0.94},
  {baseId:'pizza', addId:'lemonade', relevance: 0.90},
  {baseId:'pizza', addId:'fries', relevance: 0.56},
  {baseId:'burger', addId:'fries', relevance: 0.98},
  {baseId:'burger', addId:'lemonade', relevance: 0.82},
  {baseId:'cheesecake', addId:'coffee', relevance: 0.94},
  {baseId:'fries', addId:'lemonade', relevance: 0.62}
];

const categoryIds = ['all','breakfast','pizza','mains','dessert','drinks','sides'];

/** Pure functions for the menu, recommendations and contribution economics. */
const safePrice = x => Number.isFinite(x) && x >= 0 ? x : 0;
const variableCost = item => Object.values(item.variableCosts || {}).reduce((sum, v) => sum + safePrice(v), 0);
const contribution = item => safePrice(item.netRevenue) - variableCost(item);
const contributionRate = item => safePrice(item.netRevenue) ? contribution(item) / item.netRevenue : 0;
const cartCount = cart => Object.values(cart).reduce((n, qty) => n + Math.max(0, Number(qty) || 0), 0);
const cartTotal = (cart, menu) => menu.reduce((sum, item) => sum + (cart[item.id] || 0) * safePrice(item.publicPrice), 0);
const cartAdd = (cart, id) => ({...cart, [id]: Math.max(0, cart[id] || 0) + 1});
function cartRemove(cart, id) { const result = {...cart}; if ((result[id] || 0) <= 1) delete result[id]; else result[id]--; return result; }
function validateMenu(menu, pairs) {
  const ids = new Set(); const errors = [];
  for (const item of menu) {
    if (!item.id || ids.has(item.id)) errors.push(`duplicate or missing id: ${item.id}`);
    ids.add(item.id);
    if (!Number.isFinite(item.publicPrice) || item.publicPrice < 0) errors.push(`invalid price: ${item.id}`);
    if (!Number.isFinite(item.netRevenue) || item.netRevenue < 0) errors.push(`invalid net revenue: ${item.id}`);
    if (Object.values(item.variableCosts).some(v => !Number.isFinite(v) || v < 0)) errors.push(`invalid costs: ${item.id}`);
  }
  for (const pair of pairs) if (!ids.has(pair.baseId) || !ids.has(pair.addId) || pair.baseId === pair.addId) errors.push(`invalid pair: ${pair.baseId} → ${pair.addId}`);
  return errors;
}
function recommend(cart, menu, pairs, max = 2) {
  const index = new Map(menu.map(item => [item.id, item]));
  const candidates = new Map();
  for (const pair of pairs) {
    if (!cart[pair.baseId] || cart[pair.addId]) continue;
    const item = index.get(pair.addId);
    if (!item?.available || contribution(item) <= 0) continue;
    const score = Math.max(0, Math.min(1, pair.relevance)) * Math.max(1, contribution(item));
    if (!candidates.has(item.id) || candidates.get(item.id).score < score) candidates.set(item.id, {item, score, baseId: pair.baseId});
  }
  return [...candidates.values()].sort((a,b) => b.score-a.score || a.item.id.localeCompare(b.item.id)).slice(0,max);
}
const median = nums => {const arr=[...nums].sort((a,b)=>a-b); return arr.length ? (arr[Math.floor((arr.length-1)/2)] + arr[Math.floor(arr.length/2)])/2 : 0;};
/** Simple median-based menu engineering classification (pilot heuristic). */
function classify(menu) {
  const active = menu.filter(x=>x.available);
  const medianUnits = median(active.map(x=>x.unitsSold ?? 0));
  const medianContribution = median(active.map(contribution));
  return active.map(item => {
    const popular = (item.unitsSold ?? 0) >= medianUnits;
    const profitable = contribution(item) >= medianContribution;
    return {id:item.id, contribution:contribution(item), unitsSold:item.unitsSold ?? 0, popular, profitable,
      group: popular ? (profitable?'star':'workhorse') : (profitable?'puzzle':'dog')};
  });
}
/** Expected incremental contribution before increased fixed costs, cannibalization etc. */
function simulateMonthly(orders, attachPercent, addonContribution) {
  const o = safePrice(orders), p = Math.max(0,Math.min(100,safePrice(attachPercent)))/100;
  return {addOns: o*p, contribution: o*p*safePrice(addonContribution)};
}

const text = {
  tr: {
    demo:'KONSEPT DEMOSU · FİYATLAR VE ÜRÜNLER GERÇEK DEĞİLDİR', home:'Menü', owner:'Gelir laboratuvarı', intro:'İyi yemek, doğru seçim.', subtitle:'Zahmetsiz seçim ve her ana yakışan lezzetler.',
    choose:'Seçmeme yardım et', seeMenu:'Menüyü keşfet', selected:'Bugün ne istersiniz?', how:'Önce bir kategori seçin',
    all:'Hepsi', breakfast:'Kahvaltı', pizza:'Pizza', mains:'Ana yemek', dessert:'Tatlı', drinks:'İçecek', sides:'Yan ürünler',
    menuTitle:'Menüyü keşfet', menuSubtitle:'Aradığınızı kolayca bulun.', search:'Menüde ara...', add:'Ekle', view:'Detay',
    added:'Sepete eklendi', cart:'Sepet', noItems:'Sepetiniz boş', subtotal:'Toplam', unit:'adet', matches:'Bunlar da yakışabilir', suggested:'Uyumlu öneri',
    copy:'Sipariş taslağını kopyala', copied:'Sipariş taslağı kopyalandı', copyFail:'Kopyalanamadı', orderNote:'Bu bir demodur. Sipariş gönderilmez ve ödeme alınmaz.',
    close:'Kapat', details:'Ürün açıklaması', noAllergens:'Alerjenler ve içerik restoran tarafından henüz doğrulanmadı.',
    ownerTitle:'Riva Bella · Revenue Lab', ownerSub:'Örnek verilerle çalışan yönetici ekranı. Gerçek ciro veya kâr değildir.',
    gross:'Sepet tutarı (demo)', products:'Örnek ürünler', experiments:'Bu oturumdaki etkileşimler', demoInsight:'Aşağıdaki değerler sadece örnek menüye aittir.',
    profitTitle:'Ürün bazında katkı payı', product:'Ürün', quantity:'Örnek adet', contribution:'Birim katkı', group:'Grup',
    star:'Yıldız', workhorse:'Çalışkan', puzzle:'Potansiyel', dog:'Gözden geçir',
    simulator:'Ek satış simülatörü', orders:'Aylık sipariş', attach:'Ek ürün alan siparişler (%)', addonMargin:'Ek ürün katkı payı (₺)', extra:'Aylık ek katkı (₺)',
    events:'Test olayları', eventNote:'Yalnızca bu tarayıcı oturumunda tutulur; gerçek sipariş değildir.', back:'Menüye dön', testData:'Örnek veriler'
  },
  en: {
    demo:'CONCEPT DEMO · PRODUCTS AND PRICES ARE NOT REAL', home:'Menu', owner:'Revenue lab', intro:'Good food, easy choices.', subtitle:'Effortless discovery and thoughtful pairings for every occasion.',
    choose:'Help me choose', seeMenu:'Explore the menu', selected:'What would you like today?', how:'Start by choosing a category',
    all:'All', breakfast:'Breakfast', pizza:'Pizza', mains:'Mains', dessert:'Desserts', drinks:'Drinks', sides:'Sides',
    menuTitle:'Discover the menu', menuSubtitle:'Find your favorite without the endless scroll.', search:'Search the menu...', add:'Add', view:'Details',
    added:'Added to cart', cart:'Cart', noItems:'Your cart is empty', subtotal:'Subtotal', unit:'items', matches:'Pairs nicely with', suggested:'Thoughtful pairing',
    copy:'Copy order draft', copied:'Order draft copied', copyFail:'Could not copy', orderNote:'Concept demo only. No order is sent and no payment is taken.',
    close:'Close', details:'About this item', noAllergens:'Allergens and ingredients have not been verified with the restaurant.',
    ownerTitle:'Riva Bella · Revenue Lab', ownerSub:'Owner view with illustrative numbers. Not actual sales or profit.',
    gross:'Demo cart value', products:'Sample items', experiments:'This session’s interactions', demoInsight:'Values below are based only on sample menu data.',
    profitTitle:'Item contribution margin', product:'Product', quantity:'Demo units', contribution:'Unit contribution', group:'Group',
    star:'Star', workhorse:'Workhorse', puzzle:'Puzzle', dog:'Review',
    simulator:'Add-on contribution simulator', orders:'Monthly orders', attach:'Orders with extra item (%)', addonMargin:'Add-on contribution (₺)', extra:'Expected monthly uplift (₺)',
    events:'Test events', eventNote:'Stored in this browser session only; not actual orders.', back:'Return to menu', testData:'Sample data'
  },
  ru: {
    demo:'КОНЦЕПТ-ДЕМО · БЛЮДА И ЦЕНЫ НЕ ПОДТВЕРЖДЕНЫ', home:'Меню', owner:'Revenue Lab', intro:'Хорошая еда. Лёгкий выбор.', subtitle:'Находите любимые вкусы быстро — с красивой подачей и уместными дополнениями.',
    choose:'Помогите выбрать', seeMenu:'Смотреть меню', selected:'Чего хочется сегодня?', how:'Начните с подходящей категории',
    all:'Всё', breakfast:'Завтраки', pizza:'Пицца', mains:'Основное', dessert:'Десерты', drinks:'Напитки', sides:'Дополнения',
    menuTitle:'Вкус, который хочется открыть', menuSubtitle:'Быстрый поиск, приятный выбор, ничего лишнего.', search:'Найти блюдо...', add:'Добавить', view:'Подробнее',
    added:'Добавлено в корзину', cart:'Корзина', noItems:'Корзина пока пуста', subtotal:'Итого', unit:'поз.', matches:'Хорошо сочетается', suggested:'Подходящее дополнение',
    copy:'Скопировать черновик заказа', copied:'Черновик заказа скопирован', copyFail:'Не удалось скопировать', orderNote:'Это демо: заказ не отправляется и оплата не принимается.',
    close:'Закрыть', details:'О блюде', noAllergens:'Состав и аллергены пока не подтверждены рестораном.',
    ownerTitle:'Riva Bella · Revenue Lab', ownerSub:'Кабинет с демонстрационными данными — не фактическая выручка или прибыль.',
    gross:'Стоимость корзины (демо)', products:'Демо-позиции', experiments:'Действия за сессию', demoInsight:'Расчёты ниже основаны только на примерных данных.',
    profitTitle:'Вклад в покрытие расходов по блюдам', product:'Позиция', quantity:'Демо-продажи', contribution:'Вклад с единицы', group:'Группа',
    star:'Звезда', workhorse:'Рабочая лошадка', puzzle:'Потенциал', dog:'Пересмотреть',
    simulator:'Симулятор допродаж', orders:'Заказов в месяц', attach:'Заказов с дополнением (%)', addonMargin:'Вклад от дополнения (₺)', extra:'Дополнительный вклад в месяц (₺)',
    events:'Тестовые события', eventNote:'Только в этой браузерной сессии; это не реальные заказы.', back:'Вернуться в меню', testData:'Демо-данные'
  }
};
const getLanguage = x => ['tr','ru','en'].includes(x) ? x : 'tr';

const EVENTS_KEY = 'rb-session-events';
const allowedEvents = new Set(['menu_view','category_select','product_view','add_to_cart','remove_from_cart','cart_open','addon_impression','addon_accepted','order_draft_copied']);
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





const issues = validateMenu(demoMenu, demoPairs);
if (issues.length) console.error('Invalid demo menu', issues);
const app = document.querySelector('#app');
const menuIndex = new Map(demoMenu.map(item=>[item.id,item]));
const initialLanguage = (() => {try{return localStorage.getItem('riva-language')}catch{return null}})();
const state = {
  lang: getLanguage(initialLanguage || (navigator.language||'tr').slice(0,2)),
  cart: loadCart(), category:'all', search:'', view:'menu', drawer:false, detail:null,
  simulator:{orders:1200, attach:18, margin:90}, impressionIds:new Set()
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
  root.innerHTML = `${hero()}
    <section class="quick-choice" id="quick-choice"><div class="section-heading compact"><div><div class="eyebrow">✦ &nbsp; SIMPLE BY DESIGN</div><h2>${esc(tr('selected'))}</h2><p>${esc(tr('how'))}</p></div></div>
      <div class="quick-options">${categoryIds.filter(x=>x!=='all').slice(0,5).map((id,i)=>`<button class="quick-option quick-${i}" data-action="category" data-category="${id}"><span>${['🍳','🍕','🍔','🍰','☕'][i]}</span><b>${esc(tr(id))}</b><em>↗</em></button>`).join('')}</div>
    </section>
    <section id="menu" class="menu-section"><div class="section-heading"><div><div class="eyebrow">THE RIVA BELLA SELECTION</div><h2>${esc(tr('menuTitle'))}</h2><p>${esc(tr('menuSubtitle'))}</p></div><div class="menu-count" id="menu-count"></div></div>
       <div class="filters"><div class="categories" aria-label="Categories" id="categories">${categoryButtons()}</div>
       <label class="search-wrap">${icon('⌕')}<input type="search" id="menu-search" placeholder="${esc(tr('search'))}" value="${esc(state.search)}" aria-label="${esc(tr('search'))}"></label></div>
       <div class="menu-grid" id="menu-grid"></div>
    </section>`;
  renderCards();
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
  case 'quick': document.querySelector('#quick-choice')?.scrollIntoView({behavior:'smooth'});break;
  case 'scroll-menu': document.querySelector('#menu')?.scrollIntoView({behavior:'smooth'});break;
  case 'category': changeCategory(category);break;
  case 'add': add(id);break;
  case 'add-suggestion': add(id,'suggestion');break;
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
