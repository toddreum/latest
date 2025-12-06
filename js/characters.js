/*!
 * BirdTurds - Characters Module
 * v38.0 - Character definitions and roster
 * Copyright (c) 2025 Dude.com. All Rights Reserved.
 */

// ========== CHARACTER ROSTER ==========
export const CHARACTER_ROSTER = {
  buck: {
    id: 'buck',
    name: 'Buck "Deadeye" Thompson',
    gender: 'male',
    desc: 'Rugged cowboy with a trusty rifle',
    weapon: 'Lever-Action Rifle',
    weaponStats: { fireRate: 0.25, damage: 1.0, spread: 0 },
    style: 'Western Cowboy',
    color: '#60a5fa',
    age: 42,
    hometown: 'Amarillo, Texas',
    bio: 'A 5th generation rancher from Texas. His grandfather fought in WWII and his daddy was a rodeo champion.',
    skills: ['Eagle Eye (+15% accuracy)', 'Quick Draw (-0.2s reload)', 'Rattlesnake Reflexes'],
    animations: {
      idle: { frames: 4, cols: 2, rows: 2, frameRate: 4, loop: true },
      walk: { frames: 8, cols: 4, rows: 2, frameRate: 10, loop: true },
      run: { frames: 8, cols: 4, rows: 2, frameRate: 14, loop: true },
      shoot: { frames: 4, cols: 2, rows: 2, frameRate: 12, loop: false },
      jump: { frames: 4, cols: 2, rows: 2, frameRate: 10, loop: false },
      hurt: { frames: 2, cols: 2, rows: 1, frameRate: 8, loop: false }
    }
  },
  daisy: {
    id: 'daisy',
    name: 'Daisy Mae Reynolds',
    gender: 'female',
    desc: 'Sharpshooting cowgirl with attitude',
    weapon: 'Double-Barrel Shotgun',
    weaponStats: { fireRate: 0.9, damage: 0.6, spread: 0.5, pellets: 8 },
    style: 'Country Cowgirl',
    color: '#f472b6',
    age: 28,
    hometown: 'Nashville, Tennessee',
    bio: 'Former competitive skeet shooter turned country singer. Won 3 national championships.',
    skills: ['Spread Shot (+20% spread)', 'Quick Reload', 'Country Strong'],
    animations: {
      idle: { frames: 4, cols: 2, rows: 2, frameRate: 4, loop: true },
      walk: { frames: 8, cols: 4, rows: 2, frameRate: 10, loop: true },
      run: { frames: 8, cols: 4, rows: 2, frameRate: 14, loop: true },
      shoot: { frames: 4, cols: 2, rows: 2, frameRate: 12, loop: false },
      jump: { frames: 4, cols: 2, rows: 2, frameRate: 10, loop: false },
      hurt: { frames: 2, cols: 2, rows: 1, frameRate: 8, loop: false }
    }
  },
  bubba: {
    id: 'bubba',
    name: 'Bubba "Gator" Jackson',
    gender: 'male',
    desc: 'Big-hearted Southern boy with firepower',
    weapon: 'Pump-Action Shotgun',
    weaponStats: { fireRate: 0.7, damage: 0.6, spread: 0.35, pellets: 6 },
    style: 'Swamp Hunter',
    color: '#f59e0b',
    age: 55,
    hometown: 'Bayou La Batre, Alabama',
    bio: 'Swamp guide for 30 years. Survived 3 gator attacks. His shotgun is named "Bertha".',
    skills: ['Swamp Knowledge (+25% animal damage)', 'Gator Skin (+15 HP)', 'Heavy Hitter'],
    animations: {
      idle: { frames: 4, cols: 2, rows: 2, frameRate: 4, loop: true },
      walk: { frames: 8, cols: 4, rows: 2, frameRate: 10, loop: true },
      run: { frames: 8, cols: 4, rows: 2, frameRate: 14, loop: true },
      shoot: { frames: 4, cols: 2, rows: 2, frameRate: 12, loop: false },
      jump: { frames: 4, cols: 2, rows: 2, frameRate: 10, loop: false },
      hurt: { frames: 2, cols: 2, rows: 1, frameRate: 8, loop: false }
    }
  },
  clyde: {
    id: 'clyde',
    name: 'Clyde "Mountain" Morrison',
    gender: 'male',
    desc: 'Grizzled veteran who never misses',
    weapon: 'Semi-Auto Hunting Rifle',
    weaponStats: { fireRate: 0.2, damage: 1.2, spread: 0 },
    style: 'Mountain Man',
    color: '#84cc16',
    age: 62,
    hometown: 'Jackson Hole, Wyoming',
    bio: 'Former park ranger, 40 years in the Rockies. Can track a mouse through a blizzard.',
    skills: ['Tracker (+30% critical hit)', 'Mountain Man (no fall damage)', 'Patience'],
    animations: {
      idle: { frames: 4, cols: 2, rows: 2, frameRate: 4, loop: true },
      walk: { frames: 8, cols: 4, rows: 2, frameRate: 10, loop: true },
      run: { frames: 8, cols: 4, rows: 2, frameRate: 14, loop: true },
      shoot: { frames: 4, cols: 2, rows: 2, frameRate: 12, loop: false },
      jump: { frames: 4, cols: 2, rows: 2, frameRate: 10, loop: false },
      hurt: { frames: 2, cols: 2, rows: 1, frameRate: 8, loop: false }
    }
  },
  sierra: {
    id: 'sierra',
    name: 'Sierra "Quickdraw" Valdez',
    gender: 'female',
    desc: 'Quick-draw expert from the frontier',
    weapon: 'AR-15 Carbine',
    weaponStats: { fireRate: 0.08, damage: 0.8, spread: 0.05 },
    style: 'Frontier Gal',
    color: '#ec4899',
    age: 32,
    hometown: 'El Paso, Texas',
    bio: 'Competitive quick-draw champion and stunt performer. Family has been on the border for 7 generations.',
    skills: ['Lightning Hands (+40% fire rate)', 'Dual Wield', 'Acrobat'],
    animations: {
      idle: { frames: 4, cols: 2, rows: 2, frameRate: 4, loop: true },
      walk: { frames: 8, cols: 4, rows: 2, frameRate: 10, loop: true },
      run: { frames: 8, cols: 4, rows: 2, frameRate: 14, loop: true },
      shoot: { frames: 4, cols: 2, rows: 2, frameRate: 12, loop: false },
      jump: { frames: 4, cols: 2, rows: 2, frameRate: 10, loop: false },
      hurt: { frames: 2, cols: 2, rows: 1, frameRate: 8, loop: false }
    }
  },
  gunner: {
    id: 'gunner',
    name: 'Sgt. Marcus "Gunner" Williams',
    gender: 'male',
    desc: 'Ex-military with heavy artillery',
    weapon: 'AK Assault Rifle',
    weaponStats: { fireRate: 0.1, damage: 0.9, spread: 0.1 },
    style: 'Army Veteran',
    color: '#10b981',
    age: 38,
    hometown: 'Fort Bragg, North Carolina',
    bio: '3 tours in Afghanistan, 2 Purple Hearts, Silver Star. Now defending the homeland.',
    skills: ['Suppressive Fire (+50% ammo)', 'Combat Training', 'Iron Will'],
    animations: {
      idle: { frames: 4, cols: 2, rows: 2, frameRate: 4, loop: true },
      walk: { frames: 8, cols: 4, rows: 2, frameRate: 10, loop: true },
      run: { frames: 8, cols: 4, rows: 2, frameRate: 14, loop: true },
      shoot: { frames: 4, cols: 2, rows: 2, frameRate: 12, loop: false },
      jump: { frames: 4, cols: 2, rows: 2, frameRate: 10, loop: false },
      hurt: { frames: 2, cols: 2, rows: 1, frameRate: 8, loop: false }
    }
  },
  jolene: {
    id: 'jolene',
    name: 'Jolene Parker',
    gender: 'female',
    desc: 'Ranch owner who protects her land',
    weapon: 'Bolt-Action Sniper Rifle',
    weaponStats: { fireRate: 1.0, damage: 2.0, spread: 0 },
    style: 'Ranch Owner',
    color: '#a855f7',
    age: 48,
    hometown: 'Lexington, Kentucky',
    bio: 'Owner of 5,000-acre cattle ranch, mother of 4. Ranch in family since 1847.',
    skills: ['Leadership (+10% team bonus)', 'Ranch Owner', 'Determined'],
    animations: {
      idle: { frames: 4, cols: 2, rows: 2, frameRate: 4, loop: true },
      walk: { frames: 8, cols: 4, rows: 2, frameRate: 10, loop: true },
      run: { frames: 8, cols: 4, rows: 2, frameRate: 14, loop: true },
      shoot: { frames: 4, cols: 2, rows: 2, frameRate: 12, loop: false },
      jump: { frames: 4, cols: 2, rows: 2, frameRate: 10, loop: false },
      hurt: { frames: 2, cols: 2, rows: 1, frameRate: 8, loop: false }
    }
  },
  tammy: {
    id: 'tammy',
    name: 'Tammy "Ghost" Chen',
    gender: 'female',
    desc: 'Fearless huntress from the hills',
    weapon: 'Semi-Auto Pistol',
    weaponStats: { fireRate: 0.12, damage: 0.7, spread: 0.02 },
    style: 'Stealth Hunter',
    color: '#f43f5e',
    age: 26,
    hometown: 'Austin, Texas',
    bio: 'Former Olympic archery hopeful turned wildlife conservationist. Believes in ethical hunting.',
    skills: ['Silent Strike (no sound)', 'Stealth Mode', 'Precision'],
    animations: {
      idle: { frames: 4, cols: 2, rows: 2, frameRate: 4, loop: true },
      walk: { frames: 8, cols: 4, rows: 2, frameRate: 10, loop: true },
      run: { frames: 8, cols: 4, rows: 2, frameRate: 14, loop: true },
      shoot: { frames: 4, cols: 2, rows: 2, frameRate: 12, loop: false },
      jump: { frames: 4, cols: 2, rows: 2, frameRate: 10, loop: false },
      hurt: { frames: 2, cols: 2, rows: 1, frameRate: 8, loop: false }
    }
  }
};

// ========== PHONE ZOMBIE TYPES ==========
export const PHONE_ZOMBIE_TYPES = [
  {
    type: 'teen_boy',
    name: 'Distracted Teen',
    walkFrames: 4,
    wakeFrames: 4,
    helpFrames: 4,
    quotes: ["Just scrolling...", "One more video...", "Whatever...", "Leave me alone..."],
    wokenQuotes: ["Whoa, what's happening?!", "I can see clearly now!", "Thank you!", "God is real!"],
    helpQuotes: ["I'll help fight!", "For America!", "Let's go!"]
  },
  {
    type: 'teen_girl',
    name: 'Social Media Addict',
    walkFrames: 4,
    wakeFrames: 4,
    helpFrames: 4,
    quotes: ["Need more likes...", "Posting selfie...", "So bored...", "Drama everywhere..."],
    wokenQuotes: ["Wait, what's real?!", "My eyes are open!", "This matters more!", "I was so blind!"],
    helpQuotes: ["Count me in!", "Truth matters!", "Fighting back!"]
  },
  {
    type: 'adult_man',
    name: 'News Zombie',
    walkFrames: 4,
    wakeFrames: 4,
    helpFrames: 4,
    quotes: ["Must check news...", "The experts say...", "Trust the algorithm...", "Can't look away..."],
    wokenQuotes: ["It was all lies!", "I've been deceived!", "The truth shall set you free!", "Wake up people!"],
    helpQuotes: ["I'll spread the word!", "No more fake news!", "Truth warrior now!"]
  },
  {
    type: 'adult_woman',
    name: 'Doom Scroller',
    walkFrames: 4,
    wakeFrames: 4,
    helpFrames: 4,
    quotes: ["So anxious...", "Everything's terrible...", "Can't stop scrolling...", "Need distraction..."],
    wokenQuotes: ["There's hope!", "God has a plan!", "I feel peace now!", "Fear is gone!"],
    helpQuotes: ["Spreading hope!", "Join us!", "Light defeats darkness!"]
  }
];

// ========== HELPER FUNCTIONS ==========
export function getSelectedCharacter() {
  const saved = localStorage.getItem('birdturds_character');
  if (saved && CHARACTER_ROSTER[saved]) {
    return CHARACTER_ROSTER[saved];
  }
  return CHARACTER_ROSTER.buck;
}

export function setSelectedCharacter(characterId) {
  if (CHARACTER_ROSTER[characterId]) {
    localStorage.setItem('birdturds_character', characterId);
    return true;
  }
  return false;
}

export function getCharacterById(id) {
  return CHARACTER_ROSTER[id] || CHARACTER_ROSTER.buck;
}
