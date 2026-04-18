(() => {
  'use strict';

  /* ------------------------------ RNG ------------------------------- */

  function mulberry32(seed) {
    return function () {
      seed |= 0;
      seed = (seed + 0x6D2B79F5) | 0;
      let t = seed;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return (((t ^ (t >>> 14)) >>> 0) / 4294967296);
    };
  }

  const randInt = (rng, n) => Math.floor(rng() * n);
  const pick = (rng, arr) => arr[randInt(rng, arr.length)];
  const chance = (rng, p) => rng() < p;

  /* --------------------------- Generator ---------------------------- */

  function rollPercentage(rng) {
    const r = rng();
    if (r < 0.50) {
      return { text: `${pick(rng, DATA.percentages.ugly)}% of`, unhinged: false };
    }
    if (r < 0.75) {
      return { text: `${pick(rng, DATA.percentages.unhingedNumeric)} of`, unhinged: true };
    }
    return { text: pick(rng, DATA.percentages.qualifier), unhinged: true };
  }

  function rollJob(rng) {
    const r = rng();
    if (r < 0.15) return { text: pick(rng, DATA.jobs.plausible), tier: 'plausible' };
    if (r < 0.50) return { text: pick(rng, DATA.jobs.weird),     tier: 'weird' };
    return                { text: pick(rng, DATA.jobs.absurd),    tier: 'absurd' };
  }

  function rollTime(rng) {
    if (chance(rng, 0.4)) {
      const unit = pick(rng, DATA.times.units);
      const n = 1 + randInt(rng, 99);
      const plural = n === 1 ? unit : unit + 's';
      return { text: `in the next ${n} ${plural}`, literal: false };
    }
    return { text: pick(rng, DATA.times.literals), literal: true };
  }

  function rollAttribution(rng) {
    return chance(rng, 0.72)
      ? pick(rng, DATA.attributions.parody)
      : pick(rng, DATA.attributions.role);
  }

  function generate(rng) {
    return {
      pct:         rollPercentage(rng).text,
      job:         rollJob(rng).text,
      time:        rollTime(rng).text,
      attribution: rollAttribution(rng)
    };
  }

  /* ------------------------------ URL ------------------------------- */

  function urlSeed() {
    const v = new URLSearchParams(location.search).get('s');
    if (!v) return null;
    const n = parseInt(v, 36);
    return Number.isFinite(n) ? n : null;
  }

  function writeSeed(seed) {
    const url = new URL(location.href);
    url.searchParams.set('s', seed.toString(36));
    history.replaceState(null, '', url.toString());
  }

  function newSeed() {
    return Math.floor(Math.random() * 0x7FFFFFFF);
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

    // Fade out — quote and attribution together, quick.
    const outAnims = targets.map(el => el.animate(
      [
        { opacity: 1, transform: 'translateY(0)' },
        { opacity: 0, transform: 'translateY(-6px)' }
      ],
      { duration: 220, easing: EASE, fill: 'forwards' }
    ));

    await Promise.all(outAnims.map(a => a.finished));

    // Swap content while invisible.
    swap();

    // Fade in — rises from below. fill:'both' + tiny delay holds the
    // start frame (opacity 0, y+8) before the animation visibly begins,
    // so there is no flash between the outgoing and incoming states.
    const inAnims = targets.map(el => el.animate(
      [
        { opacity: 0, transform: 'translateY(8px)' },
        { opacity: 1, transform: 'translateY(0)' }
      ],
      { duration: 380, delay: 16, easing: EASE, fill: 'both' }
    ));

    await Promise.all(inAnims.map(a => a.finished));

    // Release fill:forwards so natural styles (opacity 1, translate 0) apply.
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
})();
