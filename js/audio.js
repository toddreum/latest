/*!
 * BirdTurds - Audio Module
 * v38.0 - Sound and voice management
 * Copyright (c) 2025 Dude.com. All Rights Reserved.
 */

// ========== AUDIO STATE ==========
let soundEnabled = true;
let musicEnabled = true;
let voiceEnabled = true;
let currentMusic = null;
let voiceCache = {};

// ========== VOICE IDS (Character to Voice mapping) ==========
// Note: Actual voice IDs are now on server-side for security
const CHARACTER_VOICES = {
  buck: 'buck',
  daisy: 'daisy',
  bubba: 'bubba',
  clyde: 'clyde',
  sierra: 'sierra',
  gunner: 'gunner',
  jolene: 'jolene',
  tammy: 'tammy'
};

// ========== VOICE LINES ==========
export const VOICE_LINES = {
  buck: {
    pickMe: ["Howdy partner, pick me!", "I'm your huckleberry!", "Ready to bag some birds!"],
    selected: "Alright! Let's go huntin'!",
    kill: ["Got 'em!", "Yeehaw!", "That's how it's done!"],
    hurt: ["Dagnabbit!", "Ow!"],
    death: "I'll be back..."
  },
  daisy: {
    pickMe: ["Hey y'all, pick me!", "Choose me sugar!", "I'm the best shot here!"],
    selected: "Let's show 'em how it's done!",
    kill: ["Gotcha!", "Boom!", "Next!"],
    hurt: ["Ouch!", "Hey!"],
    death: "Dang it..."
  },
  bubba: {
    pickMe: ["Well shoot, pick me!", "Bubba's ready to hunt!", "I got the big guns!"],
    selected: "Time to get 'er done!",
    kill: ["Ka-boom!", "Haha got 'em!", "That's what I'm talkin' about!"],
    hurt: ["Oof!", "That hurt!"],
    death: "Aw shucks..."
  },
  clyde: {
    pickMe: ["Pick me. I never miss.", "Choose wisely. Choose Clyde.", "Mountains are calling..."],
    selected: "Let's move.",
    kill: ["Target down.", "Clean shot.", "Next."],
    hurt: ["Grr...", "That tickled."],
    death: "Not today..."
  },
  sierra: {
    pickMe: ["¡Vamos! Pick me!", "I'm the fastest draw!", "Choose Sierra!"],
    selected: "¡Perfecto! Let's go!",
    kill: ["¡Boom!", "Adios!", "Too easy!"],
    hurt: ["¡Ay!", "Watch it!"],
    death: "¡No puede ser!"
  },
  gunner: {
    pickMe: ["Lock and load, soldier!", "Choose Gunner!", "Ready for combat!"],
    selected: "Mission accepted!",
    kill: ["Hostile down!", "Target eliminated!", "Oorah!"],
    hurt: ["Medic!", "Taking fire!"],
    death: "Mission failed..."
  },
  jolene: {
    pickMe: ["Pick me, partner!", "This is my land to protect!", "Choose Jolene!"],
    selected: "Let's protect this land!",
    kill: ["Got one!", "For the ranch!", "Perfect!"],
    hurt: ["Ouch!", "Not today!"],
    death: "My ranch..."
  },
  tammy: {
    pickMe: ["Shh... pick me quietly.", "Choose the silent hunter.", "I never miss."],
    selected: "Let's do this... quietly.",
    kill: ["Silent kill.", "Clean.", "Gone."],
    hurt: ["Ow...", "Hey!"],
    death: "So close..."
  }
};

// ========== SOUND EFFECTS ==========
const SOUND_EFFECTS = {
  shoot: '/sounds/shoot.mp3',
  reload: '/sounds/reload.mp3',
  hit: '/sounds/hit.mp3',
  kill: '/sounds/kill.mp3',
  hurt: '/sounds/hurt.mp3',
  death: '/sounds/death.mp3',
  coin: '/sounds/coin.mp3',
  powerup: '/sounds/powerup.mp3',
  levelup: '/sounds/levelup.mp3',
  error: '/sounds/error.mp3',
  explosion: '/sounds/explosion.mp3',
  splash: '/sounds/splash.mp3'
};

// ========== MUSIC TRACKS ==========
const MUSIC_TRACKS = {
  menu: '/music/menu.mp3',
  peaceful: '/music/peaceful.mp3',
  action: '/music/action.mp3',
  boss: '/music/boss.mp3',
  victory: '/music/victory.mp3',
  swamp: '/music/swamp.mp3',
  desert: '/music/desert.mp3',
  winter: '/music/winter.mp3',
  anthem: '/music/anthem.mp3'
};

// ========== AUDIO MANAGER ==========
export const AudioManager = {
  sounds: {},
  music: {},
  
  // Initialize audio system
  init(scene) {
    this.scene = scene;
    
    // Load sound effects
    Object.entries(SOUND_EFFECTS).forEach(([key, path]) => {
      if (scene.cache.audio.exists(key)) {
        this.sounds[key] = scene.sound.add(key);
      }
    });
    
    // Load music
    Object.entries(MUSIC_TRACKS).forEach(([key, path]) => {
      if (scene.cache.audio.exists(key)) {
        this.music[key] = scene.sound.add(key, { loop: true, volume: 0.5 });
      }
    });
  },
  
  // Play a sound effect
  playSound(key, options = {}) {
    if (!soundEnabled) return;
    
    const sound = this.sounds[key];
    if (sound) {
      sound.play({
        volume: options.volume || 1,
        rate: options.rate || 1
      });
    }
  },
  
  // Play music
  playMusic(key) {
    if (!musicEnabled) return;
    
    // Stop current music
    if (currentMusic && currentMusic.isPlaying) {
      currentMusic.stop();
    }
    
    const music = this.music[key];
    if (music) {
      music.play();
      currentMusic = music;
    }
  },
  
  // Stop music
  stopMusic() {
    if (currentMusic) {
      currentMusic.stop();
      currentMusic = null;
    }
  },
  
  // Toggle sound
  toggleSound() {
    soundEnabled = !soundEnabled;
    return soundEnabled;
  },
  
  // Toggle music
  toggleMusic() {
    musicEnabled = !musicEnabled;
    if (!musicEnabled && currentMusic) {
      currentMusic.stop();
    }
    return musicEnabled;
  },
  
  // Toggle voice
  toggleVoice() {
    voiceEnabled = !voiceEnabled;
    return voiceEnabled;
  },
  
  // Get current state
  getState() {
    return {
      soundEnabled,
      musicEnabled,
      voiceEnabled
    };
  }
};

// ========== VOICE MANAGER ==========
// Uses server proxy for ElevenLabs API calls
export const VoiceManager = {
  currentAudio: null,
  
  // Play character voice line via server proxy
  async playVoice(characterId, type) {
    if (!voiceEnabled) return;
    
    const lines = VOICE_LINES[characterId];
    if (!lines) return;
    
    let text;
    if (Array.isArray(lines[type])) {
      text = lines[type][Math.floor(Math.random() * lines[type].length)];
    } else {
      text = lines[type];
    }
    
    if (!text) return;
    
    // Check cache first
    const cacheKey = `${characterId}_${type}_${text}`;
    if (voiceCache[cacheKey]) {
      this.playAudio(voiceCache[cacheKey]);
      return;
    }
    
    try {
      // Use server proxy
      const response = await fetch('/api/voice-proxy.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          characterId,
          text
        })
      });
      
      if (!response.ok) {
        console.warn('Voice synthesis failed, using fallback');
        this.playFallbackVoice(text);
        return;
      }
      
      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      
      // Cache the audio
      voiceCache[cacheKey] = audioUrl;
      
      this.playAudio(audioUrl);
      
    } catch (error) {
      console.error('Voice error:', error);
      this.playFallbackVoice(text);
    }
  },
  
  // Play audio from URL
  playAudio(url) {
    // Stop current audio
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;
    }
    
    this.currentAudio = new Audio(url);
    this.currentAudio.volume = 0.8;
    this.currentAudio.play().catch(err => {
      console.warn('Audio play failed:', err);
    });
  },
  
  // Fallback to Web Speech API
  playFallbackVoice(text) {
    if (!('speechSynthesis' in window)) return;
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 0.8;
    
    speechSynthesis.speak(utterance);
  },
  
  // Stop current voice
  stop() {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;
    }
    speechSynthesis.cancel();
  }
};

// ========== EXPORTS ==========
export function isSoundEnabled() { return soundEnabled; }
export function isMusicEnabled() { return musicEnabled; }
export function isVoiceEnabled() { return voiceEnabled; }

export function setSoundEnabled(enabled) { soundEnabled = enabled; }
export function setMusicEnabled(enabled) { musicEnabled = enabled; }
export function setVoiceEnabled(enabled) { voiceEnabled = enabled; }
