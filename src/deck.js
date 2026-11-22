// Slide controller. Runs via double-click (file://): no modules, no fetch.
// Keys: → Space PgDn = next · ← PgUp = back · Home/End · N notes · S presenter view · F fullscreen · P reset timer
// On-screen labels stay German: they are part of the talk.
(() => {
  'use strict';
  const W = 1920, H = 1080;
  const TARGET_MIN = Number(document.body.dataset.duration) || 0; // from "duration" in deck.toml, 0 = no target
  const presenter = new URLSearchParams(location.search).has('presenter');
  const deck = document.querySelector('.deck');
  const slides = [...deck.children];
  const last = slides.length - 1;

  // Steps: procon columns, otherwise top-level list items
  for (const s of slides) {
    if (!s.hasAttribute('data-steps')) continue;
    const cols = s.querySelectorAll('.col');
    (cols.length ? cols : s.querySelectorAll('.content > ul > li, .content > ol > li'))
      .forEach(e => e.classList.add('step'));
  }
  const stepsOf = i => (slides[i] ? slides[i].querySelectorAll('.step').length : 0);

  let idx = 0, step = 0, other = null, t0 = null, nextDeck = null;

  function show(d, i, st) {
    [...d.children].forEach((s, k) => {
      s.classList.toggle('active', k === i);
      if (k === i) s.querySelectorAll('.step').forEach((e, j) => e.classList.toggle('shown', j < st));
    });
  }

  function fit(d) {
    const r = d.parentElement.getBoundingClientRect();
    const s = Math.min(r.width / W, r.height / H);
    d.style.transform = `translate(${(r.width - W * s) / 2}px, ${(r.height - H * s) / 2}px) scale(${s})`;
  }
  const fitAll = () => { fit(deck); if (nextDeck) fit(nextDeck); };

  function go(i, st, { remote = false, nav = true } = {}) {
    idx = Math.max(0, Math.min(last, i));
    step = Math.max(0, Math.min(stepsOf(idx), st));
    show(deck, idx, step);
    document.querySelector('.progress span').style.width = `${(idx / Math.max(1, last)) * 100}%`;
    if (presenter) {
      if (nav && t0 === null) t0 = Date.now();
      updatePresenter();
    } else if (location.hash !== `#${idx + 1}`) {
      history.replaceState(null, '', `#${idx + 1}`);
    }
    if (!remote && other && !other.closed) other.postMessage({ idx, step, nav }, '*');
  }
  const next = () => { if (step < stepsOf(idx)) go(idx, step + 1); else if (idx < last) go(idx + 1, 0); };
  const prev = () => { if (step > 0) go(idx, step - 1); else if (idx > 0) go(idx - 1, stepsOf(idx - 1)); };
  const resetTimer = () => { t0 = null; if (!presenter && other && !other.closed) other.postMessage({ reset: true }, '*'); };

  // ---- Presenter view (same file with ?presenter, synced via postMessage) ----
  function updatePresenter() {
    const [ni, ns] = step < stepsOf(idx) ? [idx, step + 1] : [idx + 1, 0];
    document.querySelector('.pv-next').classList.toggle('end', ni > last);
    if (ni <= last) show(nextDeck, ni, ns);
    const n = slides[idx].querySelector('.notes');
    document.querySelector('.pv-notes').innerHTML = n ? n.innerHTML : '<p class="none">Keine Notizen</p>';
    document.querySelector('.pv-count').textContent = `Folie ${idx + 1} / ${slides.length}` +
      (stepsOf(idx) ? ` · Schritt ${step} / ${stepsOf(idx)}` : '');
  }
  function tick() {
    const sec = t0 === null ? 0 : Math.floor((Date.now() - t0) / 1000);
    const mm = s => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
    const el = document.querySelector('.pv-time');
    el.textContent = TARGET_MIN ? `${mm(sec)} / ${mm(TARGET_MIN * 60)}` : mm(sec);
    el.classList.toggle('over', TARGET_MIN > 0 && sec > TARGET_MIN * 60);
  }
  if (presenter) {
    document.body.classList.add('presenter');
    document.title = 'Referentenansicht – ' + document.title;
    document.body.insertAdjacentHTML('afterbegin',
      '<div class="pv"><div class="pv-bar"><span class="pv-time"></span><span class="pv-count"></span>' +
      '<span class="pv-keys">→ / ← blättern · P Timer zurück</span></div>' +
      '<div class="pv-cur"></div><div class="pv-next" data-label="Als Nächstes"></div><div class="pv-notes"></div></div>');
    document.querySelector('.pv-cur').append(deck);
    nextDeck = deck.cloneNode(true);
    document.querySelector('.pv-next').append(nextDeck);
    other = window.opener;
    if (other) other.postMessage({ hello: true }, '*');
    setInterval(tick, 500);
    tick();
  }

  addEventListener('message', e => {
    const m = e.data || {};
    if (m.hello) { other = e.source; other.postMessage({ idx, step, nav: false }, '*'); }
    else if (m.reset) t0 = null;
    else if ('idx' in m) go(m.idx, m.step, { remote: true, nav: m.nav });
  });

  addEventListener('keydown', e => {
    if (e.altKey || e.ctrlKey || e.metaKey) return;
    const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
    if (['ArrowRight', 'ArrowDown', 'PageDown', ' ', 'Enter'].includes(k)) next();
    else if (['ArrowLeft', 'ArrowUp', 'PageUp', 'Backspace'].includes(k)) prev();
    else if (k === 'Home') go(0, 0);
    else if (k === 'End') go(last, stepsOf(last));
    else if (k === 'n') document.body.classList.toggle('show-notes');
    else if (k === 's' && !presenter) other = open(location.href.split(/[?#]/)[0] + '?presenter', 'presenter', 'width=1400,height=850');
    else if (k === 'f') document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen();
    else if (k === 'p') resetTimer();
    else return;
    e.preventDefault();
  });

  addEventListener('hashchange', () => go(parseInt(location.hash.slice(1), 10) - 1 || 0, 0, { nav: false }));
  addEventListener('resize', fitAll);
  fitAll();
  go((parseInt(location.hash.slice(1), 10) || 1) - 1, 0, { nav: false });
  document.fonts && document.fonts.ready.then(fitAll);
})();
