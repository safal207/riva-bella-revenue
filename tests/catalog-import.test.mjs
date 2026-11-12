import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {inspectCatalog,toPublicCatalog} from '../src/catalog-import.js';

const source=JSON.parse(await readFile(new URL('../data/source-categories.json',import.meta.url)));
const empty=JSON.parse(await readFile(new URL('../data/catalog-draft.json',import.meta.url)));
const item=()=>({
  id:'test-breakfast',categoryTr:'KAHVALTILAR',status:'approved',
  currency:'TRY',publicPrice:450,sourceUrl:'https://qrmn.net/rivabella',
  ownerApprovedBy:'restaurant-owner',ownerApprovedAt:'2026-11-12T14:30:00+03:00',
  title:{tr:'Test kahvaltı',en:'Test breakfast',ru:'Тестовый завтрак'},
  description:{tr:'Test ürünü',en:'Test item',ru:'Тестовое блюдо'},
  imageUrl:'https://example.org/approved.jpg',imageRights:'owner-approved',
  allergenStatus:'not-provided',available:true,
  internalCosts:{ingredients:100},unitsSold:12345,notes:'private data'
});
const run=items=>inspectCatalog({items},source);

test('public manifest contains 30 observed categories',()=>assert.equal(source.categories.length,30));
test('blank staging draft has no fake products',()=>assert.deepEqual(run(empty.items).counts,{total:0,approved:0,pending:0}));
test('valid approved item passes gate with allergen notice',()=>{
  const report=run([item()]);
  assert.deepEqual(report.errors,[]);
  assert.equal(report.warnings.length,1);
});
test('draft item is never exported',()=>{
  const draft={...item(),status:'draft'};
  assert.deepEqual(run([draft]).counts,{total:1,approved:0,pending:1});
  assert.throws(()=>toPublicCatalog({items:[draft]},source),/No owner-approved/);
});
test('unknown category and duplicate ids are blocked',()=>{
  const r=run([item(),{...item(),categoryTr:'MADE UP'}]);
  assert.ok(r.errors.some(x=>x.includes('duplicate')));
  assert.ok(r.errors.some(x=>x.includes('categoryTr')));
});
test('incomplete translations block publication',()=>{
  const bad=item(); delete bad.title.ru;
  assert.ok(run([bad]).errors.some(x=>x.includes('tr/en/ru titles')));
});
test('unverified price and image rights block publication',()=>{
  const bad=item();bad.publicPrice=0;bad.imageRights='unknown';
  assert.ok(run([bad]).errors.some(x=>x.includes('publicPrice')));
  assert.ok(run([bad]).errors.some(x=>x.includes('rights')));
});
test('owner approval evidence is mandatory',()=>{
  const bad=item();bad.ownerApprovedAt='';
  assert.ok(run([bad]).errors.some(x=>x.includes('owner approval')));
});
test('allergen disclosure is validated',()=>{
  const good=item();good.allergenStatus='verified';good.allergens=['milk','eggs'];
  assert.deepEqual(run([good]).errors,[]);
  assert.ok(run([{...good,allergens:['milk',42]}]).errors.some(x=>x.includes('allergens')));
});
test('public export never leaks costs, sales or approval identity',()=>{
  const published=toPublicCatalog({items:[item()]},source);
  const json=JSON.stringify(published);
  assert.equal(published.items.length,1);
  for(const name of ['internalCosts','unitsSold','notes','ownerApprovedBy','imageRights']){
    assert.ok(!json.includes(name),name);
  }
  assert.equal(published.items[0].publicPrice,450);
});
