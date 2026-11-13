import test from 'node:test';
import assert from 'node:assert/strict';
import {demoMenu} from '../src/menu.js';
import {demoBundles,validateBundles,bundleSummary,addBundle} from '../src/bundles.js';
import {cartTotal,cartCount} from '../src/core.js';

test('three example occasions have valid products and all translations',()=>{
  assert.equal(demoBundles.length,3);
  assert.deepEqual(validateBundles(demoBundles,demoMenu),[]);
});
test('bundle total is exactly sum of item prices without invented discount',()=>{
  const dinner=demoBundles.find(x=>x.id==='dinner-for-two');
  const summary=bundleSummary(dinner,demoMenu);
  assert.equal(summary.count,4);
  assert.equal(summary.total,2*440+2*180);
});
test('bundle cart addition is atomic and leaves original untouched',()=>{
  const cart={coffee:1},pair=demoBundles[0],result=addBundle(cart,pair,demoMenu);
  assert.deepEqual(cart,{coffee:1});
  assert.deepEqual(result,{coffee:2,eggs:1});
  assert.equal(cartTotal(result,demoMenu),cartTotal(cart,demoMenu)+bundleSummary(pair,demoMenu).total);
});
test('unavailable items block whole combination',()=>{
  const menu=demoMenu.map(x=>x.id==='pizza'?{...x,available:false}:x);
  assert.equal(bundleSummary(demoBundles[1],menu),null);
  assert.equal(addBundle({},demoBundles[1],menu),null);
});
test('removed product blocks bundle and no incomplete cart is produced',()=>{
  const menu=demoMenu.filter(x=>x.id!=='lemonade');
  assert.equal(addBundle({pizza:1},demoBundles[1],menu),null);
});
test('cart quantity cap prevents partial addition',()=>{
  const original={pizza:98,lemonade:1};
  assert.equal(addBundle(original,demoBundles[1],demoMenu),null);
  assert.deepEqual(original,{pizza:98,lemonade:1});
});
test('invalid or duplicate products are rejected',()=>{
  const invalid={...demoBundles[0],lines:[{id:'eggs',quantity:1},{id:'eggs',quantity:0}]};
  assert.ok(validateBundles([invalid],demoMenu).length>=2);
});
test('all bundle additions have positive transparent totals',()=>{
  for(const b of demoBundles){
    const summary=bundleSummary(b,demoMenu);
    const cart=addBundle({},b,demoMenu);
    assert.ok(summary.total>0);
    assert.equal(cartCount(cart),summary.count);
    assert.equal(cartTotal(cart,demoMenu),summary.total);
  }
});
