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

  function rollAttribution(rng, allowReal) {
    // Target distribution when real allowed: 30/50/20.
    // When not allowed, redistribute across parody + role: ~70/30.
    if (allowReal) {
      const r = rng();
      if (r < 0.30) return pick(rng, DATA.attributions.real);
      if (r < 0.80) return pick(rng, DATA.attributions.parody);
      return              pick(rng, DATA.attributions.role);
    }
    return chance(rng, 0.70)
      ? pick(rng, DATA.attributions.parody)
      : pick(rng, DATA.attributions.role);
  }

  function generate(rng) {
    const pct  = rollPercentage(rng);
    const job  = rollJob(rng);
    const time = rollTime(rng);

    // SAFETY RULE — no real names on absurd combos.
    const mustBeSafe = pct.unhinged || job.tier === 'absurd' || time.literal;
    const attribution = rollAttribution(rng, !mustBeSafe);

    return {
      pct:  pct.text,
      job:  job.text,
      time: time.text,
      attribution,
      hue: Math.floor(rng() * 360)
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
    pct:  q('.pct'),
    job:  q('.job'),
    time: q('.time'),
    attr: q('.attr'),
    regen: q('.regen'),
    share: q('.share'),
    toast: q('.toast')
  };

  function paint(roll) {
    els.pct.textContent  = roll.pct;
    els.job.textContent  = roll.job;
    els.time.textContent = roll.time;
    els.attr.textContent = roll.attribution;
    document.documentElement.style.setProperty('--hue', String(roll.hue));
  }

  /* --------------------------- Regenerate --------------------------- */

  let regenerating = false;

  function regenerate() {
    if (regenerating) return;
    regenerating = true;

    const prefersReduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dimMs = prefersReduced ? 0 : 160;

    document.body.classList.add('thinking');

    setTimeout(() => {
      const seed = newSeed();
      writeSeed(seed);
      const roll = generate(mulberry32(seed));

      // The dim state is captured as the "old" view-transition snapshot,
      // and the class-removal + paint happen inside the callback so the
      // "new" snapshot is the fresh, undimmed quote.
      const update = () => {
        paint(roll);
        document.body.classList.remove('thinking');
      };

      if (document.startViewTransition) {
        const vt = document.startViewTransition(update);
        vt.finished.finally(() => { regenerating = false; });
      } else {
        update();
        regenerating = false;
      }
    }, dimMs);
  }

  /* ------------------------------ Share ----------------------------- */

  let toastTimer = null;

  async function share() {
    try {
      await navigator.clipboard.writeText(location.href);
    } catch {
      // Fallback: select the URL visually? For now, just bail silently.
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
    const roll = generate(mulberry32(seed));
    paint(roll);

    document.body.classList.add('load');

    els.regen.addEventListener('click', regenerate);
    els.share.addEventListener('click', share);

    window.addEventListener('keydown', (e) => {
      const tag = (e.target && e.target.tagName) || '';
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      if (e.code === 'Space' || e.key === ' ' || e.key === 'Enter') {
        if (e.target === els.share) return; // let share handle its own click
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
