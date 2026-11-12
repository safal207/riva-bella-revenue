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


export {text,getLanguage};
