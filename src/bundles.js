/**
 * Restaurant occasion bundles: transparent, optional demo combinations.
 * All bundle items are fictional; no discount, real stock or POS promises.
 * Future use with a verified catalog must require owner approval.
 */
const demoBundles = [
  {
    id:'morning-pair',
    emoji:'☀️',
    title:{tr:'Güne güzel bir başlangıç · demo',en:'Good morning pairing · demo',ru:'Доброе утро · демо'},
    description:{tr:'Kahvaltı ve sıcak kahve',en:'Breakfast and hot coffee',ru:'Завтрак и горячий кофе'},
    lines:[{id:'eggs',quantity:1},{id:'coffee',quantity:1}]
  },
  {
    id:'dinner-for-two',
    emoji:'🌅',
    title:{tr:'İki kişilik sofra · demo',en:'Dinner for two · demo',ru:'Ужин для двоих · демо'},
    description:{tr:'İki pizza ve iki limonata',en:'Two pizzas with two lemonades',ru:'Две пиццы и два лимонада'},
    lines:[{id:'pizza',quantity:2},{id:'lemonade',quantity:2}]
  },
  {
    id:'sweet-break',
    emoji:'🍰',
    title:{tr:'Tatlı bir mola · demo',en:'Sweet coffee break · demo',ru:'Сладкая пауза · демо'},
    description:{tr:'İki tatlı ve iki sıcak kahve',en:'Two desserts and two hot coffees',ru:'Два десерта и два горячих кофе'},
    lines:[{id:'cheesecake',quantity:2},{id:'coffee',quantity:2}]
  }
];
const isCount=q=>Number.isSafeInteger(q)&&q>=1&&q<=20;
function validateBundles(bundles,menu){
  const errors=[], ids=new Set(),index=new Map(menu.map(i=>[i.id,i]));
  for(const b of bundles){
    if(!b || !/^[a-z]+(?:-[a-z]+)*$/.test(b.id||'') || ids.has(b.id))errors.push('invalid or duplicate bundle id');
    ids.add(b?.id);
    if(!b?.title || !['tr','en','ru'].every(lang=>typeof b.title[lang]==='string'&&b.title[lang].trim()))errors.push('missing translations: '+b?.id);
    if(!Array.isArray(b?.lines)||!b.lines.length){errors.push('empty bundle: '+b?.id);continue;}
    const seen=new Set();
    for(const line of b.lines){
      if(!index.has(line.id) || !isCount(line.quantity))errors.push('invalid item/quantity: '+b.id+' '+line.id);
      if(seen.has(line.id))errors.push('duplicate bundle item: '+b.id+' '+line.id);
      seen.add(line.id);
    }
  }
  return errors;
}
function bundleSummary(bundle,menu){
  const index=new Map(menu.map(x=>[x.id,x]));
  if(!bundle?.lines?.length)return null;
  const lines=[];
  for(const entry of bundle.lines){
    const item=index.get(entry.id);
    if(!item||!item.available||!isCount(entry.quantity)||!Number.isFinite(item.publicPrice)||item.publicPrice<0)return null;
    lines.push({item,quantity:entry.quantity,subtotal:item.publicPrice*entry.quantity});
  }
  return {lines,total:lines.reduce((sum,line)=>sum+line.subtotal,0),count:lines.reduce((sum,line)=>sum+line.quantity,0)};
}
function addBundle(cart,bundle,menu){
  const summary=bundleSummary(bundle,menu);
  if(!summary)return null;
  const next={...cart};
  for(const {item,quantity} of summary.lines){
    const existing=Number(next[item.id]||0);
    if(!Number.isSafeInteger(existing)||existing<0||existing+quantity>99)return null;
    next[item.id]=existing+quantity;
  }
  return next;
}
export {demoBundles,validateBundles,bundleSummary,addBundle};
