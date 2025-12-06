/*!
 * BirdTurds - Configuration Module
 * v38.0 - Modular Architecture
 * Copyright (c) 2025 Dude.com. All Rights Reserved.
 */

// ========== GAME DIMENSIONS ==========
export const GAME_WIDTH = 1280;
export const GAME_HEIGHT = 640;
export const WORLD_WIDTH = 20000;

// ========== SCALING ==========
export const TURD_SCALE = 0.04;
export const BIRD_SCALE = 0.12;
export const ANIMAL_SCALE = 0.08;
export const HUNTER_SCALE = 0.24;

// ========== ANIMATION STATES ==========
export const ANIM_IDLE = 'idle';
export const ANIM_WALK = 'walk';
export const ANIM_RUN = 'run';
export const ANIM_SHOOT = 'shoot';
export const ANIM_JUMP = 'jump';
export const ANIM_HURT = 'hurt';

// ========== DIFFICULTY MODES ==========
export const DIFFICULTY_MODES = {
  beginner: {
    name: 'Beginner',
    emoji: '🟢',
    description: 'For new players - more health, slower enemies, helpful hints',
    playerHealth: 150,
    playerMaxHealth: 150,
    turdDamage: 5,
    demonDamage: 8,
    enemySpeed: 0.7,
    birdSpawnRate: 0.7,
    globalistSpawnRate: 0.5,
    demonSpawnRate: 0.5,
    bossHealth: 0.6,
    startingAmmo: 120,
    startingCoins: 100,
    birdsToAdvance: 20,
    showHints: true,
    angelDuration: 20,
    respawnTime: 5
  },
  intermediate: {
    name: 'Intermediate',
    emoji: '🟡',
    description: 'Balanced challenge - standard gameplay experience',
    playerHealth: 100,
    playerMaxHealth: 100,
    turdDamage: 8,
    demonDamage: 15,
    enemySpeed: 1.0,
    birdSpawnRate: 1.0,
    globalistSpawnRate: 1.0,
    demonSpawnRate: 1.0,
    bossHealth: 1.0,
    startingAmmo: 90,
    startingCoins: 0,
    birdsToAdvance: 25,
    showHints: false,
    angelDuration: 15,
    respawnTime: 3
  },
  advanced: {
    name: 'Advanced',
    emoji: '🔴',
    description: 'For experts - less health, faster enemies, no mercy!',
    playerHealth: 75,
    playerMaxHealth: 75,
    turdDamage: 12,
    demonDamage: 25,
    enemySpeed: 1.4,
    birdSpawnRate: 1.5,
    globalistSpawnRate: 1.5,
    demonSpawnRate: 1.8,
    bossHealth: 1.5,
    startingAmmo: 60,
    startingCoins: 0,
    birdsToAdvance: 35,
    showHints: false,
    angelDuration: 10,
    respawnTime: 0,
    allBossesAtWhiteHouse: true,
    doubleGlobalists: true
  }
};

// ========== LEVEL CONFIG ==========
export const LEVEL_CONFIG = {
  1:  { birdsToKill: 15,  spawnRate: 3.0, birdSpeed: 0.8, turdChance: 0.08, bossChance: 0.00, name: 'Country Farm' },
  2:  { birdsToKill: 20,  spawnRate: 2.8, birdSpeed: 0.85, turdChance: 0.10, bossChance: 0.02, name: 'Deep Forest' },
  3:  { birdsToKill: 25,  spawnRate: 2.6, birdSpeed: 0.9, turdChance: 0.12, bossChance: 0.05, name: 'Fishing Lake' },
  4:  { birdsToKill: 0,   spawnRate: 2.5, birdSpeed: 0.8, turdChance: 0.10, bossChance: 0.00, name: 'STATE PARK (NO HUNTING!)' },
  5:  { birdsToKill: 30,  spawnRate: 2.4, birdSpeed: 0.95, turdChance: 0.15, bossChance: 0.08, name: 'Wild West Desert' },
  6:  { birdsToKill: 35,  spawnRate: 2.2, birdSpeed: 1.0, turdChance: 0.18, bossChance: 0.10, name: 'Frozen Peaks' },
  7:  { birdsToKill: 40,  spawnRate: 2.0, birdSpeed: 1.05, turdChance: 0.20, bossChance: 0.12, name: 'Coastal Beach' },
  8:  { birdsToKill: 45,  spawnRate: 1.8, birdSpeed: 1.1, turdChance: 0.22, bossChance: 0.15, name: 'Quiet Suburbs' },
  9:  { birdsToKill: 50,  spawnRate: 1.6, birdSpeed: 1.15, turdChance: 0.25, bossChance: 0.18, name: 'Western Town' },
  10: { birdsToKill: 30,  spawnRate: 2.0, birdSpeed: 1.0, turdChance: 0.15, bossChance: 0.10, name: 'Church Camp' },
  11: { birdsToKill: 60,  spawnRate: 1.4, birdSpeed: 1.2, turdChance: 0.30, bossChance: 0.20, name: 'THE SWAMP' },
  12: { birdsToKill: 100, spawnRate: 1.2, birdSpeed: 1.3, turdChance: 0.35, bossChance: 0.25, name: 'THE WHITE HOUSE' }
};

// ========== SPAWN CONFIGS ==========
export const PHONE_ZOMBIE_CONFIG = {
  spawnChance: 0.25,
  spawnInterval: 15,
  maxOnScreen: 4,
  wakeRange: 80,
  pointsForWaking: 200,
  coinsForWaking: 15,
  helpDuration: 30,
  helpDamage: 10
};

export const BIBLE_PICKUP_CONFIG = {
  spawnChance: 0.15,
  spawnInterval: 20,
  maxOnScreen: 3,
  glowColor: 0xffd700,
  pickupRange: 60
};

export const DEMON_CONFIG = {
  minLevel: 3,
  spawnChance: 0.15,
  maxOnScreen: 3,
  health: 100,
  damage: 15,
  speed: 80,
  scriptureWeakness: true
};

export const VILLAIN_CONFIG = {
  minLevel: 7,
  maxOnScreen: 6,
  spawnChance: 0.4,
  health: 50,
  speed: 40
};

// ========== SHOP ITEMS ==========
export const ANGEL_PROTECTION = {
  1: { name: 'Guardian Angel', cost: 50, duration: 30, turdBlock: 0.5, damageReduction: 0.25 },
  2: { name: 'Warrior Angel', cost: 100, duration: 45, turdBlock: 0.75, damageReduction: 0.50 },
  3: { name: 'Divine Shield', cost: 200, duration: 60, turdBlock: 1.0, damageReduction: 0.75 }
};

export const BIBLE_WEAPON = {
  cost: 75,
  ammo: 10,
  ammoCost: 25,
  ammoAmount: 5,
  damage: 50,
  range: 400,
  speed: 600,
  knockback: true
};

// ========== STATE MANAGEMENT ==========
export let currentDifficulty = DIFFICULTY_MODES.intermediate;

export function setDifficulty(mode) {
  if (DIFFICULTY_MODES[mode]) {
    currentDifficulty = DIFFICULTY_MODES[mode];
    return true;
  }
  return false;
}

// ========== GLOBAL GAME STATE ==========
export const btState = {
  score: 0,
  coins: 0,
  ammo: 90,
  health: 100,
  maxHealth: 100,
  turdMeter: 0,
  maxTurdMeter: 100,
  birdsKilled: 0,
  currentLevel: 1,
  birdsKilledThisLevel: 0,
  birdsNeededThisLevel: 25,
  levelComplete: false,
  gameOver: false,
  gameWon: false,
  currentCharacter: 'buck',
  difficulty: 'intermediate',
  
  // Reset function
  reset() {
    this.score = 0;
    this.ammo = currentDifficulty.startingAmmo;
    this.health = currentDifficulty.playerHealth;
    this.maxHealth = currentDifficulty.playerMaxHealth;
    this.turdMeter = 0;
    this.birdsKilled = 0;
    this.currentLevel = 1;
    this.birdsKilledThisLevel = 0;
    this.levelComplete = false;
    this.gameOver = false;
    this.gameWon = false;
  }
};
