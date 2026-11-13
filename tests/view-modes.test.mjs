import test from 'node:test';
import assert from 'node:assert/strict';
import {demoMenu} from '../src/menu.js';
import {MODES,DEFAULT_MODE,readSavedMode,persistMode,readLikes,persistLikes,productsForView,makeItemLink} from '../src/view-modes.js';

test('the visible order of modes is feed, grid, list',()=>{
 assert.deepEqual(MODES,['feed','grid','list']);assert.equal(DEFAULT_MODE,'feed');
});
test('view preference is validated and storage failures are harmless',()=>{
 const data=new Map();const storage={getItem:key=>data.get(key),setItem:(key,value)=>data.set(key,value)};
 assert.equal(readSavedMode(storage),'feed');
 assert.equal(persistMode(storage,'list'),true);assert.equal(readSavedMode(storage),'list');
 data.set('riva-menu-view','invalid');assert.equal(readSavedMode(storage),'feed');
 assert.equal(readSavedMode({getItem(){throw Error('denied')}}),'feed');
});
test('likes are private to device and reject unknown product IDs',()=>{
 const data=new Map([['riva-menu-likes','["pizza","pizza","unknown","coffee",null]']]);
 const storage={getItem:key=>data.get(key),setItem:(key,value)=>data.set(key,value)};
 const likes=readLikes(storage,new Set(demoMenu.map(x=>x.id)));
 assert.deepEqual([...likes],['pizza','coffee']);
 assert.equal(persistLikes(storage,likes),true);
 assert.deepEqual(JSON.parse(data.get('riva-menu-likes')),['pizza','coffee']);
});
test('filtering is identical for feed, grid and list',()=>{
 const opts={category:'pizza',language:'ru'};
 const filtered=productsForView(demoMenu,opts);
 assert.equal(filtered.length,1);assert.equal(filtered[0].id,'pizza');
 assert.equal(productsForView(demoMenu,{search:'пицца',language:'ru'}).length,1);
 assert.equal(productsForView(demoMenu,{savedOnly:true,likes:new Set(['coffee'])}).length,1);
});
test('unknown and unavailable menu items are never shown',()=>{
 const items=[...demoMenu,{...demoMenu[0],id:'sold-out',available:false}];
 assert.ok(!productsForView(items).some(x=>x.id==='sold-out'));
});
test('share URL contains only catalog id and language, not cart data',()=>{
 const url=makeItemLink('https://example.test/menu/?utm_source=qr&q=coffee#old','coffee','ru');
 const u=new URL(url);
 assert.equal(u.searchParams.get('item'),'coffee');assert.equal(u.searchParams.get('lang'),'ru');
 assert.equal(u.searchParams.get('q'),null);assert.equal(u.hash,'');
 assert.equal(u.searchParams.get('utm_source'),'qr');
});
