import {mkdir,copyFile,cp} from 'node:fs/promises';
await mkdir('dist',{recursive:true});
await Promise.all([copyFile('index.html','dist/index.html'),copyFile('styles.css','dist/styles.css')]);
await cp('src','dist/src',{recursive:true});
console.log('Built GitHub Pages artifact in dist/');
