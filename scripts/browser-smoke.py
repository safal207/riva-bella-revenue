"""Run a small real-Chromium smoke test of the fictional menu demo."""
import functools
import html
import http.server
import json
import re
import shutil
import subprocess
import tempfile
import threading
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
HARNESS = r'''<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="stylesheet" href="/styles.css"></head><body><div id="app"></div><pre id="test-result">PENDING</pre><script type="module">
const results=[]; const test=(name,ok,detail='')=>results.push({name,ok:!!ok,detail});
let target=''; Element.prototype.scrollIntoView=function(){target=this.id};
try {
  await import('/src/app.js');
  const click=(selector)=>{const e=document.querySelector(selector);if(!e)throw new Error('Missing '+selector);e.click()};
  click('[data-action="quick"]');test('choice scrolls to categories',target==='quick-choice',target);
  for(const [lang,remove,add] of [['ru','Убрать одну порцию','Добавить одну порцию'],['tr','Bir adet çıkar','Bir adet ekle'],['en','Remove one','Add one']]){
    click('[data-action="lang"][data-lang="'+lang+'"]');
    if(document.querySelector('#header-count').textContent==='0')click('[data-action="add"][data-id="pizza"]');
    click('[data-action="open-cart"]');
    const x=document.querySelector('[data-action="remove"][data-id="pizza"]');
    const y=document.querySelector('.cart-item [data-action="add"][data-id="pizza"]');
    test(lang+' cart quantity labels',!!x && !!y && x.getAttribute('aria-label').startsWith(remove) && y.getAttribute('aria-label').startsWith(add));
    click('[data-action="close-cart"]');
  }
  click('[data-action="lang"][data-lang="en"]');click('[data-action="owner"]');
  test('control-adjusted scenario',document.querySelector('#uplift-value')?.textContent.replace(/[^\d-]/g,'')==='3240',document.querySelector('#uplift-value')?.textContent);
  const baseline=document.querySelector('[data-slider="baseline"]'),attach=document.querySelector('[data-slider="attach"]');
  baseline.value='20';baseline.dispatchEvent(new Event('input',{bubbles:true}));attach.value='10';attach.dispatchEvent(new Event('input',{bubbles:true}));
  test('negative scenario',document.querySelector('#uplift-value')?.textContent.includes('-'),document.querySelector('#uplift-value')?.textContent);
} catch(e) {test('unexpected error',false,String(e));}
document.querySelector('#test-result').textContent=JSON.stringify(results);document.title=results.length && results.every(x=>x.ok)?'PASS':'FAIL';
</script></body></html>'''

class Handler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/qa-harness':
            body = HARNESS.encode('utf-8')
            self.send_response(200)
            self.send_header('Content-Type','text/html; charset=utf-8')
            self.send_header('Content-Length',str(len(body)))
            self.end_headers()
            self.wfile.write(body)
        else:
            super().do_GET()

    def log_message(self, *args):
        pass

chrome = next((shutil.which(x) for x in ('google-chrome','google-chrome-stable','chromium','chromium-browser') if shutil.which(x)), None)
if not chrome:
    raise SystemExit('Chromium executable was not found on the runner')
server = http.server.ThreadingHTTPServer(('127.0.0.1',0), functools.partial(Handler,directory=str(ROOT)))
threading.Thread(target=server.serve_forever,daemon=True).start()
try:
    with tempfile.TemporaryDirectory(prefix='riva-smoke-') as profile:
        command=[chrome,'--headless=new','--disable-gpu','--no-sandbox','--disable-dev-shm-usage','--no-first-run',
                 '--disable-background-networking','--blink-settings=imagesEnabled=false',f'--user-data-dir={profile}',
                 '--window-size=1280,900','--virtual-time-budget=3000','--dump-dom',f'http://127.0.0.1:{server.server_port}/qa-harness']
        completed=subprocess.run(command,capture_output=True,timeout=45)
        output=completed.stdout.decode('utf-8',errors='replace')
        found=re.search(r'<pre id="test-result">(.*?)</pre>',output,re.S)
        print('Smoke results:',html.unescape(found.group(1)) if found else 'no test result')
        if completed.returncode or '<title>PASS</title>' not in output:
            print(completed.stderr.decode('utf-8',errors='replace')[-3000:])
            raise SystemExit('Chromium smoke test failed')
finally:
    server.shutdown()
