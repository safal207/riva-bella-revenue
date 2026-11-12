import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {dirname,resolve} from 'node:path';
import {inspectCatalog,toPublicCatalog} from '../src/catalog-import.js';

const args=process.argv.slice(2);
const input=args[0] || 'data/catalog-draft.json';
const outputIndex=args.indexOf('--export');
if(outputIndex>=0 && (!args[outputIndex+1] || outputIndex!==1)){
  console.error('Usage: node scripts/audit-catalog.mjs [draft.json] [--export public.json]');
  process.exit(2);
}
const source=JSON.parse(await readFile('data/source-categories.json','utf8'));
const draft=JSON.parse(await readFile(input,'utf8'));
const report=inspectCatalog(draft,source);
console.log(JSON.stringify({
  source:source.sourceUrl,observedOn:source.observedOn,categories:source.categories.length,...report
},null,2));
if(report.errors.length)process.exitCode=1;
else if(outputIndex>=0){
  const out=resolve(args[outputIndex+1]);
  const publicCatalog=toPublicCatalog(draft,source);
  await mkdir(dirname(out),{recursive:true});
  await writeFile(out,JSON.stringify(publicCatalog,null,2)+'\n');
  console.log('Exported '+publicCatalog.items.length+' approved products to '+out);
}
