from playwright.sync_api import sync_playwright, expect
from pathlib import Path
import json, os, shutil
from urllib.parse import urlsplit
BASE=os.environ.get('QA_BASE_URL','http://localhost:4173/Spill-The-Beans/')
OUT=Path(os.environ.get('QA_OUTPUT_DIR','work/browser-qa'));OUT.mkdir(parents=True,exist_ok=True)
results=[]
def passed(name):
 results.append(name); print('PASS:',name,flush=True)
def no_overflow(page,label):
 assert page.evaluate('document.documentElement.scrollWidth <= window.innerWidth'),label
with sync_playwright() as p:
 browser=p.chromium.launch(executable_path=os.environ.get('CHROMIUM_PATH') or shutil.which('chromium'),headless=True,args=['--no-sandbox'])
 context=browser.new_context(viewport={'width':1440,'height':1000})
 page=context.new_page(); errors=[]
 page.on('pageerror',lambda e: errors.append(str(e)))
 response=page.goto(BASE); assert response.status==200
 page.get_by_role('heading',name='A little question. A whole lot of connection.').wait_for()
 page.wait_for_timeout(300);page.screenshot(path=str(OUT/'home-desktop.png'),full_page=True)
 passed('Production app loads at the GitHub Pages subpath')
 for width in [320,375,390,414,768,1440]:
  page.set_viewport_size({'width':width,'height':844})
  page.goto(BASE+'#home');no_overflow(page,f'home {width}')
  page.goto(BASE+'#mode/family');no_overflow(page,f'selection {width}')
  page.get_by_role('button',name='Let’s talk').click();page.locator('#question-text').wait_for();no_overflow(page,f'card {width}')
  if width==390:page.wait_for_timeout(300);page.screenshot(path=str(OUT/'question-mobile.png'),full_page=True)
  page.goto(BASE+'#favourites');no_overflow(page,f'favourites {width}')
  page.goto(BASE+'#history');no_overflow(page,f'history {width}')
 passed('No horizontal overflow at 320, 375, 390, 414, 768 and 1440 px across five screens')
 page.set_viewport_size({'width':390,'height':844});page.goto(BASE+'#home');page.wait_for_timeout(300);page.screenshot(path=str(OUT/'home-mobile.png'),full_page=True)
 for mode,filters in [('family',['all','kids','tweens','teens','adults']),('friends',['laughs','both','deep']),('work',['all','new','established','retreat','leadership'])]:
  for filter in filters:
   page.goto(BASE+f'#mode/{mode}')
   page.locator(f'[data-action="category"][data-value="all"]').click()
   page.locator(f'[data-action="filter"][data-value="{filter}"]').click()
   page.get_by_role('button',name='Let’s talk').click();page.locator('#question-text').wait_for()
  categories={'family':['laugh','imagine','heart','stories','big','faith'],'friends':['rather','debates','whatif','confessions','deep','memories'],'work':['ice','laugh','know','connect','grow','future']}[mode]
  for category in categories:
   page.goto(BASE+f'#mode/{mode}')
   page.locator(f'[data-action="filter"][data-value="{filters[0]}"]').click()
   page.locator(f'[data-action="category"][data-value="{category}"]').click()
   page.get_by_role('button',name='Let’s talk').click();page.locator('#question-text').wait_for()
 passed('All three modes, 18 categories and 13 audience options work through the UI')
 page.goto(BASE+'#home');page.get_by_role('button',name='Surprise Me').click();page.locator('#question-text').wait_for()
 for _ in range(15):
  assert 'Faith & Values' not in page.locator('.question-card-label').inner_text()
  page.get_by_role('button',name='Next Question').click()
 passed('Home Surprise Me provides fresh broadly suitable cards without faith prompts')
 page.get_by_role('button',name='Save to favourites').click()
 qid=page.locator('[data-action="favourite"]').get_attribute('data-id');text=page.locator('#question-text').inner_text()
 page.reload();page.goto(BASE+'#favourites');assert text in page.locator('main').inner_text()
 page.locator('.saved-question').click();assert page.locator('#question-text').inner_text()==text
 page.locator('[data-action="return"]').click();expect(page.locator('.saved-question')).to_have_count(1)
 page.get_by_role('button',name='Remove from favourites').click();expect(page.locator('.empty-state')).to_have_count(1)
 passed('Favourites persist across reload, revisit correctly and remove with an empty state')
 page.goto(BASE+f'#question/{qid}');assert page.locator('#question-text').inner_text()==text
 page.goto(BASE+'#history');assert text in page.locator('main').inner_text()
 page.get_by_role('button',name='Clear history',exact=True).click();page.get_by_role('button',name='Keep history').click();assert page.locator('.saved-card').count()>0
 page.get_by_role('button',name='Clear history',exact=True).click();page.locator('[data-action="confirm-clear"]').click();expect(page.locator('.empty-state')).to_have_count(1)
 assert page.evaluate("JSON.parse(localStorage.getItem('spill-the-beans-v1')).seen.length")==0
 passed('Shared deep link opens a card; history revisit, cancel and clear/reset work')
 page.goto(BASE+'#mode/family');page.locator('[data-action="filter"][data-value="kids"]').click();page.locator('[data-action="category"][data-value="laugh"]').click();page.reload()
 assert page.locator('[data-value="kids"]').get_attribute('aria-pressed')=='true'
 page.get_by_role('button',name='Let’s talk').click()
 texts=set()
 for i in range(14):
  current=page.locator('#question-text').inner_text();assert current not in texts;texts.add(current)
  if i<13:page.get_by_role('button',name='Next Question').click()
 page.get_by_role('button',name='Finish this selection').click();expect(page.get_by_role('heading',name='You’ve spilled every bean.')).to_have_count(1)
 page.reload();expect(page.get_by_role('heading',name='You’ve spilled every bean.')).to_have_count(1)
 page.get_by_role('button',name='Reshuffle this selection').click();page.locator('#question-text').wait_for()
 passed('14-card pool exhausts without repeats across reload and reshuffles explicitly')
 # Force the selectable-text fallback without relying on machine clipboard capabilities.
 page.evaluate("Object.defineProperty(navigator,'share',{value:undefined,configurable:true}); Object.defineProperty(navigator,'clipboard',{value:undefined,configurable:true})")
 page.get_by_role('button',name='Share question',exact=True).click();page.locator('.share-copy').wait_for();assert '#question/' in page.locator('.share-copy').input_value()
 page.get_by_role('button',name='Select text').click();assert page.evaluate('document.activeElement.selectionEnd > document.activeElement.selectionStart')
 page.get_by_role('button',name='Close dialog').click()
 passed('Manual sharing fallback exposes selectable question text and the correct deep link')
 page.get_by_role('button',name='About and install the app').click();assert 'Add to Home Screen' in page.locator('dialog').inner_text();page.keyboard.press('Escape');assert not page.locator('dialog').is_visible()
 page.goto(BASE+'#home');page.keyboard.press('Tab');assert page.evaluate("document.activeElement.tagName") in ['A','BUTTON']
 context.grant_permissions([])
 page.goto(BASE+'#mode/work');page.locator('.skip').focus();page.keyboard.press('Enter');assert page.url.endswith('#mode/work');assert page.evaluate('document.activeElement.id')=='main'
 passed('Install help, native dialog Escape, skip navigation and keyboard focus work')
 page.goto(BASE+'#home');page.evaluate("localStorage.setItem('spill-the-beans-v1','{broken')");page.reload();page.get_by_role('heading',name='A little question. A whole lot of connection.').wait_for()
 page.get_by_role('button',name='Surprise Me').click();page.locator('#question-text').wait_for()
 passed('Corrupted storage recovers to a working app')
 page.evaluate('navigator.serviceWorker.ready.then(() => true)')
 page.wait_for_function('navigator.serviceWorker.controller !== null')
 assert page.evaluate("caches.keys().then(keys=>keys.some(k=>k.startsWith('spill-the-beans-')))")
 context.set_offline(True);page.reload();page.locator('#question-text').wait_for();page.get_by_role('button',name='Next Question').click();page.locator('#question-text').wait_for()
 page.goto(BASE+'#mode/friends');page.get_by_role('button',name='Let’s talk').click();page.locator('#question-text').wait_for()
 context.set_offline(False)
 passed('Service worker caches the app; reload, next card and mode changes work offline')
 assert not errors,errors
 passed('No browser runtime errors throughout QA')
 # Browser storage explicitly unavailable from first load.
 denied=browser.new_context(viewport={'width':375,'height':812})
 denied.add_init_script("Object.defineProperty(window,'localStorage',{get(){throw new DOMException('Blocked','SecurityError')}})")
 dp=denied.new_page();dp.goto(BASE);dp.get_by_role('button',name='Surprise Me').click();dp.locator('#question-text').wait_for();dp.get_by_role('button',name='Save to favourites').click();dp.goto(BASE+'#favourites');expect(dp.locator('.saved-card')).to_have_count(1)
 passed('Unavailable browser storage retains in-memory favourites for the current visit')
 # The published files also work at the domain root.
 rootpage=context.new_page();assert rootpage.goto(urlsplit(BASE).scheme+'://'+urlsplit(BASE).netloc+'/').status==200;rootpage.get_by_role('button',name='Surprise Me').click();rootpage.locator('#question-text').wait_for()
 passed('Relative assets and navigation also work at a domain root')
 browser.close()
(OUT/'browser-results.json').write_text(json.dumps({'passed':results,'runtime_errors':errors},indent=2))
print(f'{len(results)} browser checks passed.',flush=True)
