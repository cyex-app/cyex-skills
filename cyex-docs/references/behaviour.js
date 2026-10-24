// cyex docs behaviour: scroll-spy, a sidebar that follows the reader both ways,
// independent column scrolling, the Ctrl/Cmd+K filter, and shared code-sample tabs.
// No framework. In Svelte, call initDocs() from an $effect (after the sections render)
// and return the cleanup it gives back.
//
// Markup it expects (see the starter page):
//   header.top                                  the sticky page header
//   aside.docs-nav > .nav-search > input        the filter
//   aside.docs-nav > nav.nav-scroll             the index; its own scroll container
//     .nav-group > .nav-group-title + a.nav-item[href="#id"]
//   section[id]                                 one per index entry, in the same order

export function initDocs(opts = {}) {
  const HEADER_OFFSET = opts.headerOffset ?? 80; // matches section scroll-margin-top
  const BAND = opts.band ?? [0.25, 0.6];          // the comfortable zone, as fractions of the rail
  const PARK = opts.park ?? 0.35;                 // where an item is brought to when it leaves it
  const LANG_KEY = opts.langKey ?? 'cyexDocsLang';

  const header = document.querySelector('header.top');
  const aside = document.querySelector('.docs-nav');
  const nav = document.querySelector('.nav-scroll');
  const search = document.querySelector('.nav-search');
  const input = search?.querySelector('input');
  const sections = [...document.querySelectorAll('section[id]')];
  const items = new Map([...nav.querySelectorAll('a.nav-item')].map(a => [a.getAttribute('href').slice(1), a]));
  const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
  const cleanups = [];
  const on = (target, type, fn, options) => { target.addEventListener(type, fn, options); cleanups.push(() => target.removeEventListener(type, fn, options)); };

  // The rail sits under the header, so it needs the header's real height.
  const setHeaderHeight = () => document.documentElement.style.setProperty('--header-h', `${header?.offsetHeight ?? 62}px`);

  // ---------- scroll-spy ----------
  // Offsets are measured once (and again on resize) and compared with scrollY.
  // An IntersectionObserver band thin enough for one section is thin enough for two
  // to straddle it, and then it lights the section you are leaving.
  let tops = [];
  const measure = () => { tops = sections.map(s => ({ id: s.id, top: s.getBoundingClientRect().top + scrollY })); };

  let activeId = null;
  let edge = null; // 'top' | 'end' | null: the page is at one of its ends
  let frame = 0;

  function update() {
    frame = 0;
    if (!tops.length) return;
    const atTop = scrollY <= 2;
    const atEnd = innerHeight + scrollY >= document.documentElement.scrollHeight - 2;
    let current = tops[0];
    if (atEnd) current = tops[tops.length - 1]; // a short last section may never reach the header
    else {
      const y = scrollY + HEADER_OFFSET;
      // Two pixels of slack: a hash jump parks a section exactly on the boundary.
      for (const t of tops) { if (t.top <= y + 2) current = t; else break; }
    }
    const nextEdge = atTop ? 'top' : atEnd ? 'end' : null;
    if (current.id !== activeId || nextEdge !== edge) {
      setActive(current.id);
      edge = nextEdge;
      follow();
    }
  }
  const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
  const onResize = () => { setHeaderHeight(); measure(); onScroll(); };

  function setActive(id) {
    if (id === activeId) return;
    items.get(activeId)?.classList.remove('active');
    items.get(activeId)?.removeAttribute('aria-current');
    activeId = id;
    items.get(id)?.classList.add('active');
    items.get(id)?.setAttribute('aria-current', 'location');
  }

  // ---------- the rail follows, both ways ----------
  // The lit item (with its group's heading when it leads the group) is kept inside a
  // band around the middle of the rail, so the index travels with the reader going
  // down exactly as it does going up. At the page's top the rail goes to its top; at
  // the page's end, to its end. A rail the reader just scrolled by hand is left alone
  // until the next change of section.
  let railTouchedAt = 0;

  function follow() {
    if (!nav || getComputedStyle(aside).position !== 'sticky') return; // stacked layout: the rail isn't beside the text
    if (performance.now() - railTouchedAt < 1200) return;
    const max = nav.scrollHeight - nav.clientHeight;
    if (max <= 0) return;

    let target;
    if (edge === 'top') target = 0;
    else if (edge === 'end') target = max;
    else {
      const el = items.get(activeId);
      if (!el || el.hidden) return;
      const group = el.closest('.nav-group');
      const leads = group && group.querySelector('.nav-item:not([hidden])') === el;
      const anchor = (leads && group.querySelector('.nav-group-title')) || el;
      const box = nav.getBoundingClientRect();
      const h = nav.clientHeight;
      const top = anchor.getBoundingClientRect().top - box.top;
      const bottom = el.getBoundingClientRect().bottom - box.top;
      if (top >= h * BAND[0] && bottom <= h * BAND[1]) return; // already comfortable
      target = nav.scrollTop + top - h * PARK;
    }
    target = Math.max(0, Math.min(max, Math.round(target)));
    if (Math.abs(target - nav.scrollTop) < 2) return;
    nav.scrollTo({ top: target, behavior: reduced() ? 'auto' : 'smooth' });
  }

  // ---------- two columns, two scrolls ----------
  // Whichever column the pointer is over is the one that moves. overscroll-behavior on
  // the rail stops it handing the wheel to the page at its ends; this covers the parts
  // that aren't scroll containers (search box, padding, a filtered-down short list).
  on(aside, 'wheel', e => {
    if (getComputedStyle(aside).position !== 'sticky') return;
    railTouchedAt = performance.now();
    if (!nav.contains(e.target)) { e.preventDefault(); return; }
    const atTop = nav.scrollTop <= 0;
    const atEnd = nav.scrollTop + nav.clientHeight >= nav.scrollHeight - 1;
    if ((e.deltaY < 0 && atTop) || (e.deltaY > 0 && atEnd)) e.preventDefault();
  }, { passive: false });
  on(nav, 'pointerdown', () => { railTouchedAt = performance.now(); });
  on(nav, 'touchmove', () => { railTouchedAt = performance.now(); }, { passive: true });
  // Picking an entry is a request to go there, not a manual scroll of the rail.
  on(nav, 'click', e => { if (e.target.closest('a.nav-item')) railTouchedAt = 0; });

  // ---------- filter ----------
  if (input) {
    const kbd = search.querySelector('.nav-kbd');
    if (kbd) kbd.textContent = /Mac|iP(hone|ad|od)/.test(navigator.platform || navigator.userAgent) ? '⌘K' : 'Ctrl K';
    const empty = nav.querySelector('.nav-empty');
    const apply = () => {
      const q = input.value.trim().toLowerCase();
      search.classList.toggle('has-value', !!input.value);
      let any = false;
      // Entries match on their own text (label, method, path); a group heading never
      // matches by itself, so "admin" finds admin endpoints by their own names.
      for (const group of nav.querySelectorAll('.nav-group')) {
        let shown = 0;
        for (const a of group.querySelectorAll('.nav-item')) {
          const hit = !q || (a.textContent + ' ' + (a.dataset.search ?? '')).toLowerCase().includes(q);
          a.hidden = !hit;
          if (hit) shown++;
        }
        group.hidden = !shown;
        if (shown) any = true;
      }
      if (empty) { empty.hidden = any; empty.textContent = `Nothing matches “${input.value.trim()}”.`; }
    };
    on(input, 'input', apply);
    search.querySelector('.input-clear')?.addEventListener('click', () => { input.value = ''; apply(); input.focus(); });
    on(document, 'keydown', e => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); input.focus(); input.select(); }
      else if (e.key === 'Escape' && document.activeElement === input) { input.value = ''; apply(); input.blur(); }
    });
  }

  // ---------- code samples ----------
  // One language choice for the whole page, remembered: picking Python once shouldn't
  // mean picking it again on the next endpoint.
  const setLang = lang => {
    for (const tab of document.querySelectorAll('.lang-tab')) tab.setAttribute('aria-selected', String(tab.dataset.lang === lang));
    for (const pre of document.querySelectorAll('pre[data-lang]')) pre.hidden = pre.dataset.lang !== lang;
  };
  let lang = document.querySelector('.lang-tab')?.dataset.lang;
  try { const saved = localStorage.getItem(LANG_KEY); if (saved && document.querySelector(`.lang-tab[data-lang="${saved}"]`)) lang = saved; } catch {}
  if (lang) setLang(lang);
  on(document, 'click', e => {
    const tab = e.target.closest('.lang-tab');
    if (tab) { setLang(tab.dataset.lang); try { localStorage.setItem(LANG_KEY, tab.dataset.lang); } catch {} return; }
    const copy = e.target.closest('.code-copy');
    if (!copy) return;
    const pre = [...copy.closest('.code-block').querySelectorAll('pre')].find(p => !p.hidden);
    navigator.clipboard?.writeText(pre.textContent).then(() => {
      copy.classList.add('copied');
      clearTimeout(copy._t);
      copy._t = setTimeout(() => copy.classList.remove('copied'), 1600);
    }).catch(() => {});
  });

  // ---------- start ----------
  setHeaderHeight();
  measure();
  const hash = decodeURIComponent(location.hash.slice(1));
  if (items.has(hash)) setActive(hash); // a deep link lights its entry before any scrolling
  update();
  on(window, 'scroll', onScroll, { passive: true });
  on(window, 'resize', onResize);
  // Sections change height as fonts land and samples fill in; cached offsets go stale.
  // The header is watched too: it wraps to more lines on narrow screens.
  const ro = new ResizeObserver(onResize);
  ro.observe(document.body);
  if (header) ro.observe(header);
  cleanups.push(() => ro.disconnect(), () => frame && cancelAnimationFrame(frame));

  return () => cleanups.forEach(fn => fn());
}
