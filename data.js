/* Content pools for the AI Unemployment Index.
 * All quotes are fictional parody. See safety rule in main.js. */

const DATA = {
  percentages: {
    // Rendered as "N% of" before the job. Tame — real-name attribution allowed.
    ugly: [12, 17, 23, 29, 37, 42, 51, 58, 63, 69, 73, 81, 88, 94, 99],

    // Numeric-style but obviously unhinged. Triggers safety rule.
    unhingedNumeric: ['420%', '1000%', '√(-1)%', 'NaN%', '-17%', 'ℵ₀%', '7/4%', '0.0001%'],

    // Qualifier phrases that go straight before the plural job noun.
    // Triggers safety rule.
    qualifier: [
      'all',
      'most',
      'many',
      'literally all',
      'all but one of',
      'the top 2% of',
      'approximately some of',
      'the overwhelming majority of',
      'a statistically unusual share of',
      'every remaining'
    ]
  },

  jobs: {
    // Tame: plausible real jobs. Real-name attribution allowed.
    plausible: [
      'software engineers', 'paralegals', 'radiologists', 'copywriters',
      'translators', 'bookkeepers', 'data analysts', 'customer support reps',
      'graphic designers', 'financial advisors', 'junior consultants',
      'technical writers', 'UX researchers', 'tax preparers'
    ],

    // Weird but real — still OK for real-name attribution.
    weird: [
      'baristas', 'mimes', 'sommeliers', 'tarot readers', 'puppeteers',
      'dog walkers', 'wedding officiants', 'professional mourners',
      'ice sculptors', 'yoga instructors', 'tattoo artists', 'magicians',
      'street performers', 'calligraphers', 'pet psychics', 'hand models',
      'trainspotters', 'crossword constructors'
    ],

    // Absurd — triggers safety rule.
    absurd: [
      'popes', 'competitive hot dog eaters', 'LinkedIn thought leaders',
      'beekeepers who are also bees', 'royal swan counters',
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
      'people who still use the word "synergy"', 'goth baristas',
      'competitive nappers', 'vibe archaeologists',
      'LinkedIn poets', 'professional fifth wheels',
      'sentient traffic cones', 'artisanal air-quote providers',
      'emergency meme responders', 'PhDs in vibes',
      'licensed bridge trolls', 'people who correct "whom"',
      'stand-up philosophers', 'professional bystanders',
      'certified aura readers (corporate)', 'enterprise feng shui consultants',
      'Roomba whisperers', 'sudoku influencers',
      'ghostwriters for actual ghosts', 'part-time cryptids'
    ]
  },

  times: {
    // Numeric unit mode. Paired with an integer 1..N. "in the next N unit(s)".
    units: ['second', 'minute', 'hour', 'day', 'week', 'month', 'year', 'decade', 'quarter', 'fortnight'],

    // Joke literals. Triggers safety rule. Rendered as-is after the job.
    literals: [
      'by Tuesday', 'by lunch', 'retroactively, last Thursday',
      'in 3 business goats', 'before you finish reading this',
      'in half a heartbeat', 'by the next eclipse',
      'in a fortnight of Mondays', 'in 0.7 solar cycles',
      'by the time your coffee cools', 'before the next vibe shift',
      'by the next mercury retrograde', 'in exactly 1 (one) Tuesday',
      'by god-knows-when', 'faster than you can say prompt engineering',
      'in the time it takes to write this tweet', 'by the end of this blink',
      'by the next OpenAI dev day', 'in under one ChatGPT outage',
      'by the time the next foundation model drops'
    ]
  },

  attributions: {
    // Real, public AI-industry figures. Only used for tame rolls.
    real: [
      'Dario Amodei', 'Sam Altman', 'Demis Hassabis', 'Sundar Pichai',
      'Mustafa Suleyman', 'Jensen Huang'
    ],

    // Obvious parody names. Safe for any roll.
    parody: [
      'Dario Amodoom', 'Sham Altperson', 'Elon Tusk', 'Sundar Pipedream',
      'Demis Hasnobrain', 'Yann LeCunt', 'Geoffrey Hintlol', 'Mira Muratiless',
      'Ilya Sutseeker', 'Jensen Wang', 'Mark Zuckerbot', 'Satya Nah-della',
      'Andrew Ngope', 'Sam Bankman-Doomed'
    ],

    // Role-only. Safe for any roll. Bulletproof.
    role: [
      'An anonymous AI lab CEO',
      'A tech billionaire on X',
      'An unnamed Anthropic cofounder',
      'A senior engineer who "just knows"',
      'A VC at an undisclosed fund',
      'A whistleblower from an unnamed lab',
      'An AI researcher, speaking off the record',
      'A LinkedIn thought leader',
      'A founder still on the hero\u2019s journey',
      'An OpenAI alum (one of several)',
      'A staff+ engineer with strong opinions',
      'A cofounder who has since left to "build something"',
      'A pseudonymous X account with 147k followers'
    ]
  }
};
