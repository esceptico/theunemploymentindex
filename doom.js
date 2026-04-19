/* Shared ES module: content pools, seeded RNG, and quote generator.
 * Imported by both the browser (main.js) and the edge function (api/og.tsx). */

export const DATA = {
  percentages: {
    ugly: [
      12, 17, 23, 29, 37, 42, 44, 51, 58, 63,
      66, 69, 73, 77, 81, 85, 88, 91, 94, 97, 99
    ],
    unhingedNumeric: [
      '420%', '1000%', '9999%',
      '\u2135\u2080%', '7/4%', '0.0001%',
      'a p < 0.05 fraction of', '2 standard deviations of',
    ],
    qualifier: [
      'all',
      'most',
      'many',
      'literally all',
      'basically all',
      'all but one of',
      'all the non-tenured',
      'the top 2% of',
      'the bottom 90% of',
      'approximately some of',
      'the overwhelming majority of',
      'a statistically unusual share of',
      'every remaining',
      'the silent majority of',
      'a non-trivial number of',
      'a load-bearing fraction of',
      'some unknowable fraction of',
      'asymptotically all'
    ]
  },

  jobs: {
    plausible: [
      'software engineers', 'paralegals', 'radiologists', 'copywriters',
      'translators', 'bookkeepers', 'data analysts', 'customer support reps',
      'graphic designers', 'financial advisors', 'junior consultants',
      'technical writers', 'UX researchers', 'tax preparers',
      'middle managers', 'compliance officers', 'internal communications leads',
      'procurement specialists', 'entry-level analysts', 'executive assistants',
      'marketing associates', 'recruiters', 'account executives'
    ],
    weird: [
      'baristas', 'mimes', 'sommeliers', 'tarot readers', 'puppeteers',
      'dog walkers', 'wedding officiants', 'professional mourners',
      'ice sculptors', 'yoga instructors', 'tattoo artists', 'magicians',
      'street performers', 'calligraphers', 'pet psychics', 'hand models',
      'trainspotters', 'crossword constructors', 'cheese graders',
      'professional whistleblowers', 'forensic accountants',
      'museum night-guards', 'Formula 1 tire engineers'
    ],
    absurd: [
      'popes', 'competitive hot dog eaters',
      'LinkedIn thought leaders', 'royal swan counters',
      'night-shift lighthouse keepers', 'wedding DJs on cruise ships',
      'sommeliers for dogs', 'professional ghost witnesses',
      'exorcists for smart fridges', 'mall Santas in July',
      'people who clap at the end of movies', 'reply guys',
      'crossword constructors who hate vowels', 'sleep consultants for cats',
      'influencers who influence other influencers', 'bird whisperers',
      'medieval reenactors with iPhones', 'professional apologizers',
      'competitive whistlers', 'deepfake detectives',
      'cloud architects (literally, in the sky)', 'moon real-estate agents',
      'artisanal pixel polishers', 'freelance oracles',
      'people who still use the word \u201Csynergy\u201D',
      'competitive nappers', 'vibe archaeologists',
      'LinkedIn poets', 'professional fifth wheels',
      'sentient traffic cones', 'artisanal air-quote providers',
      'emergency meme responders', 'PhDs in vibes',
      'licensed bridge trolls', 'people who correct \u201Cwhom\u201D',
      'stand-up philosophers', 'professional bystanders',
      'certified aura readers (corporate tier)',
      'enterprise feng shui consultants',
      'Roomba whisperers', 'sudoku influencers',
      'ghostwriters for actual ghosts', 'part-time cryptids',
      'thread guys who start with \u201Cok so\u201D',
      'reply guys with a podcast', 'founders still in stealth since 2019',
      'cofounders #4', 'chiefs of staff to the chief of staff',
      'Y Combinator dropouts', 'Series A tourists',
      'angel investors with three followers',
      'technical cofounders who don\u2019t code',
      'designers who ship one thing a year',
      'growth hackers on Adderall', 'vibecoders',
      'Cursor speedrunners', 'Replit vibe coaches',
      'token astrologers', 'TPOT oracles',
      'e/acc posters with anime avatars',
      'decel doomers who post through it',
      'AI safety researchers on sabbatical',
      'prompt whisperers', 'RAG consultants',
      'LLM benchmark dunkers', 'evals influencers',
      'substack doomers', 'demo-day pitch poets',
      'founding engineers who can\u2019t git rebase',
      'diamond-checkmark X accounts',
      'head of AI at a non-AI company',
      'Vercel deployment monks', 'Slack bot shepherds',
      '10x engineers who are actually 0.1x',
      'solo devs with 47 abandoned side projects',
      'people who post \u201Cbreaking:\u201D before non-news',
      'people who say \u201Cbuilt this in 30 min with Cursor\u201D',
      'ex-OpenAI engineers \u201Cbuilding something\u201D',
      'newsletter-having ex-Googlers',
      'VCs who call themselves \u201Coperators\u201D',
      'founders on their third pivot this quarter'
    ]
  },

  times: {
    units: [
      'second', 'minute', 'hour', 'day', 'week', 'month',
      'year', 'decade', 'quarter', 'fortnight', 'sprint'
    ],
    literals: [
      'by Tuesday', 'by lunch', 'retroactively, last Thursday',
      'in 3 business goats', 'before you finish reading this',
      'in half a heartbeat', 'by the next eclipse',
      'in a fortnight of Mondays', 'in 0.7 solar cycles',
      'by the time your coffee cools', 'before the next vibe shift',
      'by the next mercury retrograde', 'in exactly 1 (one) Tuesday',
      'by god-knows-when', 'faster than you can say \u201Cprompt engineering\u201D',
      'in the time it takes to post a thread',
      'by the end of this blink',
      'by the next OpenAI board coup',
      'before Dario posts another essay',
      'by the next Ilya hoodie sighting',
      'in post-AGI time',
      'by the time GPT-6 ships (so, never)',
      'before Altman tweets again',
      'by the next Anthropic funding round',
      'in less than one Cursor update',
      'before the next foundation model drops',
      'by the next launch week',
      'by the next X thread on \u201Ctimelines\u201D',
      'in one-tenth of a Claude context window',
      'by the time your H100 order ships',
      'by the next time Yann posts',
      'in under one ChatGPT outage',
      'by the next \u201Cwe updated our model\u201D email',
      'in the time between two Altman interviews',
      'by next demo day',
      'in roughly 1 (one) hype cycle',
      'before the next board drama',
      'by Q3, which we pushed from Q2'
    ]
  },

  attributions: {
    parody: [
      'Dario Amodoom', 'Sham Altperson', 'Elon Tusk', 'Sundar Pipedream',
      'Geoffrey Hintlol', 'Mira Muratiless', 'Ilya Sutseeker',
      'Mark Zuckerbot', 'Satya Nah-della', 'Andrew Ngope',
      'Sam Bankman-Doomed', 'Demis Hashtag', 'Yann LeCope',
      'Jensen Leatherman', 'Andrej Karparty', 'Ian Goodfake',
      'Oriol Vinyard', 'Paul Grayham', 'Marc Andreoutofideas',
      'Reid Hoffmask', 'Peter Theorist', 'Balaji Srinicast',
      'Naval Ravitweet', 'David Sixpack', 'Mustafa Soothsayer',
      'Jeff Dean-of-Students'
    ],
    role: [
      'An anonymous AI lab CEO',
      'A tech billionaire on X',
      'An unnamed Anthropic cofounder',
      'A senior engineer who \u201Cjust knows\u201D',
      'A VC at an undisclosed fund',
      'A whistleblower from an unnamed lab',
      'An AI researcher, speaking off the record',
      'A LinkedIn thought leader',
      'A founder still on the hero\u2019s journey',
      'An OpenAI alum (one of several)',
      'A staff+ engineer with strong opinions',
      'A cofounder who has since left to \u201Cbuild something\u201D',
      'A pseudonymous X account with 147k followers',
      'A reply guy with 12 followers and strong takes',
      'A thread guy who starts with \u201Cok so\u201D',
      'An e/acc poster with an anime avatar',
      'A decel doomer running on Adderall',
      'A Y Combinator partner after three espressos',
      'A podcaster who pivoted from crypto to AI',
      'A Chief of Staff to the Chief of Staff',
      'A founder pivoting for the third time this quarter',
      'A TPOT oracle',
      'A diamond-checkmark X account',
      'A postdoc who left to start an AI company',
      'A former Googler with a Substack',
      'A principal engineer who hasn\u2019t shipped since 2021',
      'A VC associate pretending to be a partner',
      'An AI ethics person on sabbatical',
      'A growth hacker with 6-figure followers and 0 revenue',
      'A founding engineer at a 3-person AI startup',
      'A solo dev with a viral tweet and no product'
    ]
  }
};

export function mulberry32(seed) {
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

function rollPercentage(rng) {
  const r = rng();
  if (r < 0.50) return `${pick(rng, DATA.percentages.ugly)}% of`;
  if (r < 0.75) return `${pick(rng, DATA.percentages.unhingedNumeric)} of`;
  return pick(rng, DATA.percentages.qualifier);
}

function rollJob(rng) {
  const r = rng();
  if (r < 0.15) return pick(rng, DATA.jobs.plausible);
  if (r < 0.50) return pick(rng, DATA.jobs.weird);
  return pick(rng, DATA.jobs.absurd);
}

function rollTime(rng) {
  if (chance(rng, 0.4)) {
    const unit = pick(rng, DATA.times.units);
    const n = 1 + randInt(rng, 99);
    const plural = n === 1 ? unit : unit + 's';
    return `in the next ${n} ${plural}`;
  }
  return pick(rng, DATA.times.literals);
}

function rollAttribution(rng) {
  return chance(rng, 0.72)
    ? pick(rng, DATA.attributions.parody)
    : pick(rng, DATA.attributions.role);
}

export function generate(rng) {
  return {
    pct:         rollPercentage(rng),
    job:         rollJob(rng),
    time:        rollTime(rng),
    attribution: rollAttribution(rng)
  };
}

export function seedFromParam(v) {
  if (v == null) return null;
  const n = parseInt(v, 36);
  return Number.isFinite(n) ? n : null;
}

export function newSeed() {
  return Math.floor(Math.random() * 0x7FFFFFFF);
}
