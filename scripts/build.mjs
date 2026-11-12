import {mkdir,copyFile} from 'node:fs/promises';
await mkdir('dist/src',{recursive:true});
await Promise.all([copyFile('index.html','dist/index.html'),copyFile('styles.css','dist/styles.css'),copyFile('src/app.js','dist/src/app.js')]);
console.log('Built GitHub Pages artifact in dist/');
