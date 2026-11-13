/**
 * Shared menu viewing logic for feed → photo grid → compact list.
 * This module is catalog-agnostic: the old 176-product catalog can replace
 * demo fixtures without losing sorting, filters, cart or view preferences.
 */
export const MODES = Object.freeze(['feed','grid','list']);
export const DEFAULT_MODE = 'feed';
export const VIEW_STORAGE_KEY = 'riva-menu-view';
export const LIKES_STORAGE_KEY = 'riva-menu-likes';
export function validMode(x){return MODES.includes(x)?x:DEFAULT_MODE;}
export function readSavedMode(storage){
  try{return validMode(storage?.getItem(VIEW_STORAGE_KEY));}catch{return DEFAULT_MODE;}
}
export function readLikes(storage,validIds){
  try{
    const data=JSON.parse(storage?.getItem(LIKES_STORAGE_KEY)||'[]');
    if(!Array.isArray(data))return new Set();
    return new Set(data.filter(id=>typeof id==='string'&&validIds.has(id)).slice(0,500));
  }catch{return new Set();}
}
export function persistLikes(storage,likes){
  try{storage?.setItem(LIKES_STORAGE_KEY,JSON.stringify([...likes]));return true;}catch{return false;}
}
export function persistMode(storage,mode){
  try{storage?.setItem(VIEW_STORAGE_KEY,validMode(mode));return true;}catch{return false;}
}
export function productsForView(menu,{category='all',search='',language='tr',savedOnly=false,likes=new Set()}={}){
  const q=String(search||'').trim().toLocaleLowerCase(['tr','en','ru'].includes(language)?language:'tr');
  return menu.filter(item=>{
    if(!item.available||category!=='all'&&item.category!==category)return false;
    if(savedOnly&&!likes.has(item.id))return false;
    return !q||Object.values(item.title||{}).some(s=>String(s).toLocaleLowerCase(language).includes(q));
  });
}
export function makeItemLink(href,itemId,language='tr'){
  const url=new URL(href);
  url.searchParams.delete('q');url.searchParams.delete('category');
  url.searchParams.set('item',itemId);
  url.searchParams.set('lang',['tr','en','ru'].includes(language)?language:'tr');
  url.hash='';
  return url.href;
}
