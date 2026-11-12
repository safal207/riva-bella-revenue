/**
 * Owner-reviewed catalog import gate.
 * Category discovery is not product approval or image licensing.
 * Only an explicit whitelist of public fields can be exported.
 */
const LANGUAGES = ['tr','en','ru'];
const secureUrl = v => typeof v === 'string' && /^https:\/\/[^\s/]+(?:\/[^\s]*)?$/i.test(v.trim());
const string = v => typeof v === 'string' && v.trim().length > 0;
const finitePrice = v => typeof v === 'number' && Number.isFinite(v) && v > 0;
const stableId = v => typeof v === 'string' && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(v);
const isDate = v => string(v) && !Number.isNaN(Date.parse(v)) && /^\d{4}-\d{2}-\d{2}T/.test(v);

function inspectCatalog(catalog, categoryManifest) {
  const errors = [], warnings = [];
  const items = Array.isArray(catalog?.items) ? catalog.items : [];
  const categories = new Set(categoryManifest?.categories || []);
  if (!Array.isArray(catalog?.items)) errors.push('items must be an array');
  if (!categories.size) errors.push('known category manifest is empty');
  if (!string(categoryManifest?.sourceUrl)) errors.push('category source is missing');
  const ids = new Set();
  let approved=0, pending=0;
  for (const [index,item] of items.entries()) {
    const prefix='items['+index+']';
    if (!item || typeof item !== 'object' || Array.isArray(item)) { errors.push(prefix+': invalid item'); continue; }
    if (!stableId(item.id)) errors.push(prefix+': id must be a stable kebab-case identifier');
    if (ids.has(item.id)) errors.push(prefix+': duplicate id '+item.id);
    ids.add(item.id);
    if (!categories.has(item.categoryTr)) errors.push(prefix+': categoryTr must match a verified category');
    if (!['draft','approved'].includes(item.status)) errors.push(prefix+': status must be draft or approved');
    if (item.status !== 'approved') { pending++; continue; }
    approved++;
    if (item.currency !== 'TRY' || !finitePrice(item.publicPrice)) errors.push(prefix+': owner-verified positive publicPrice in TRY required');
    if (!secureUrl(item.sourceUrl)) errors.push(prefix+': HTTPS sourceUrl required');
    if (!string(item.ownerApprovedBy) || !isDate(item.ownerApprovedAt)) errors.push(prefix+': owner approval identity and ISO date required');
    if (!item.title || LANGUAGES.some(lang=>!string(item.title[lang]))) errors.push(prefix+': verified tr/en/ru titles required');
    if (!item.description || LANGUAGES.some(lang=>!string(item.description[lang]))) errors.push(prefix+': verified tr/en/ru descriptions required');
    if (!string(item.imageUrl) || !secureUrl(item.imageUrl) || item.imageRights !== 'owner-approved') errors.push(prefix+': owner-approved HTTPS image URL and rights confirmation required');
    if (!['verified','not-provided'].includes(item.allergenStatus)) errors.push(prefix+': allergenStatus must be verified or not-provided');
    if (item.allergenStatus === 'verified' && (!Array.isArray(item.allergens) || item.allergens.some(x=>!string(x)))) errors.push(prefix+': verified allergens must be an array of labels');
    if (item.allergenStatus === 'not-provided') warnings.push(prefix+': allergens missing; display uncertainty notice');
    if (typeof item.available !== 'boolean') errors.push(prefix+': available must be a boolean');
  }
  return {errors,warnings,counts:{total:items.length,approved,pending}};
}

function toPublicCatalog(catalog, categoryManifest) {
  const report=inspectCatalog(catalog,categoryManifest);
  if (report.errors.length) throw new Error(report.errors.join('\n'));
  const approved=catalog.items.filter(item=>item.status==='approved');
  if (!approved.length) throw new Error('No owner-approved products: public catalog was not generated.');
  return {
    restaurant:'Riva Bella',currency:'TRY',
    notice:'Independent concept preview. Verify prices and allergens with the restaurant.',
    items:approved.map(item=>({
      id:item.id,categoryTr:item.categoryTr,
      title:Object.fromEntries(LANGUAGES.map(lang=>[lang,item.title[lang].trim()])),
      description:Object.fromEntries(LANGUAGES.map(lang=>[lang,item.description[lang].trim()])),
      publicPrice:item.publicPrice,imageUrl:item.imageUrl.trim(),available:item.available,
      allergenStatus:item.allergenStatus,allergens:item.allergenStatus==='verified'?item.allergens:[],
      sourceUrl:item.sourceUrl.trim(),verifiedAt:item.ownerApprovedAt
    }))
  };
}
export {LANGUAGES,inspectCatalog,toPublicCatalog};
