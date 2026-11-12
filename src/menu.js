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


export {demoMenu,demoPairs,categoryIds};
