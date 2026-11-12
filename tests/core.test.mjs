import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
const file = readFileSync(new URL('../src/app.js', import.meta.url), 'utf8');
const boundary = file.indexOf('const text = {');
if(boundary < 0) throw Error('Expected extracted economics and fixture section');
const functions = ['demoMenu','demoPairs','safePrice','validateMenu','contribution','cartAdd','cartRemove','cartTotal','cartCount','recommend','classify','simulateMonthly'];
const data = runInNewContext(file.slice(0,boundary)+`\n({${functions.join(',')}})`);
const {demoMenu,demoPairs,validateMenu,contribution,cartAdd,cartRemove,cartTotal,cartCount,recommend,classify,simulateMonthly}=data;
test('catalog includes clearly identified fictional fixtures',()=>{
  assert.equal(demoMenu.length,8);
  assert.ok(demoMenu.every(p=>Object.values(p.title).every(t=>t.includes('demo')||t.includes('демо'))));
  assert.equal(validateMenu(demoMenu,demoPairs).length,0);
});
test('cart add tracks repeat quantities',()=>{assert.equal(cartAdd(cartAdd({},'pizza'),'pizza').pizza,2)});
test('cart remove decrements and deletes last unit',()=>{
  const once=cartRemove({pizza:2,coffee:1},'pizza'); assert.equal(once.pizza,1); assert.equal(once.coffee,1);
  assert.equal('pizza' in cartRemove(once,'pizza'),false);
});
test('cart totals represent displayed price and quantity',()=>{
  const pizza=demoMenu.find(p=>p.id==='pizza'); assert.equal(cartTotal({pizza:2},demoMenu),2*pizza.publicPrice);
  assert.equal(cartCount({pizza:2,coffee:1}),3);
});
test('recommend only compatible products when base added',()=>{
  const rec=recommend({burger:1},demoMenu,demoPairs);
  assert.ok(rec.length>0);assert.ok(rec.every(r=>demoPairs.some(p=>p.baseId==='burger'&&p.addId===r.item.id)));
});
test('already ordered add-on is not recommended',()=>{
  assert.ok(!recommend({burger:1,fries:1},demoMenu,demoPairs).some(r=>r.item.id==='fries'));
});
test('no recommendations without base product',()=>assert.equal(recommend({},demoMenu,demoPairs).length,0));
test('contribution is net revenue minus variable costs, not net profit',()=>{
  const p=demoMenu[0], costs=Object.values(p.variableCosts).reduce((a,b)=>a+b,0);
  assert.equal(contribution(p),p.netRevenue-costs);
});
test('monthly simulator computes incremental contribution',()=>{
  const result=simulateMonthly(1200,18,90);assert.equal(result.addOns,216);assert.equal(result.contribution,19440);
});
test('group classifier assigns recognized menu engineering groups',()=>{
  assert.equal(classify(demoMenu).length,demoMenu.length);
  assert.ok(classify(demoMenu).every(x=>['star','workhorse','puzzle','dog'].includes(x.group)));
});
