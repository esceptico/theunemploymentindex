import { mulberry32, generate, seedFromParam, newSeed } from './doom.js';

/* ------------------------------ URL ------------------------------- */

function urlSeed() {
  return seedFromParam(new URLSearchParams(location.search).get('s'));
}

function writeSeed(seed) {
  const url = new URL(location.href);
  url.searchParams.set('s', seed.toString(36));
  history.replaceState(null, '', url.toString());
}

/* ---------------------------- Rendering --------------------------- */

const q = (sel) => document.querySelector(sel);

const els = {
  quote:       q('.quote'),
  attribution: q('.attribution'),
  pct:         q('.pct'),
  job:         q('.job'),
  time:        q('.time'),
  attr:        q('.attr'),
  regen:       q('.regen'),
  share:       q('.share'),
  toast:       q('.toast')
};

function paint(roll) {
  els.pct.textContent  = roll.pct;
  els.job.textContent  = roll.job;
  els.time.textContent = roll.time;
  els.attr.textContent = roll.attribution;
}

/* --------------------------- Regenerate --------------------------- */

const EASE = 'cubic-bezier(0.2, 0.7, 0.2, 1)';
let regenerating = false;

async function regenerate() {
  if (regenerating) return;
  regenerating = true;

  const swap = () => {
    const seed = newSeed();
    writeSeed(seed);
    paint(generate(mulberry32(seed)));
  };

  if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
    swap();
    regenerating = false;
    return;
  }

  const targets = [els.quote, els.attribution];

  const outAnims = targets.map(el => el.animate(
    [
      { opacity: 1, transform: 'translateY(0)' },
      { opacity: 0, transform: 'translateY(-6px)' }
    ],
    { duration: 220, easing: EASE, fill: 'forwards' }
  ));

  await Promise.all(outAnims.map(a => a.finished));

  swap();

  const inAnims = targets.map(el => el.animate(
    [
      { opacity: 0, transform: 'translateY(8px)' },
      { opacity: 1, transform: 'translateY(0)' }
    ],
    { duration: 380, delay: 16, easing: EASE, fill: 'both' }
  ));

  await Promise.all(inAnims.map(a => a.finished));

  [...outAnims, ...inAnims].forEach(a => a.cancel());
  regenerating = false;
}

/* ------------------------------ Share ----------------------------- */

let toastTimer = null;

async function share() {
  try {
    await navigator.clipboard.writeText(location.href);
  } catch {
    return;
  }
  els.toast.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { els.toast.hidden = true; }, 1800);
}

/* ------------------------------ Init ------------------------------ */

function init() {
  const existing = urlSeed();
  const seed = existing !== null ? existing : newSeed();
  if (existing === null) writeSeed(seed);
  paint(generate(mulberry32(seed)));

  document.body.classList.add('load');

  els.regen.addEventListener('click', regenerate);
  els.share.addEventListener('click', share);

  window.addEventListener('keydown', (e) => {
    const tag = (e.target && e.target.tagName) || '';
    if (tag === 'INPUT' || tag === 'TEXTAREA') return;
    if (e.target === els.share) return;
    if (e.code === 'Space' || e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      regenerate();
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
