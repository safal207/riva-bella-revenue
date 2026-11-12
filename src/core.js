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


export {safePrice,variableCost,contribution,contributionRate,cartCount,cartTotal,cartAdd,cartRemove,validateMenu,recommend,classify,simulateMonthly};
