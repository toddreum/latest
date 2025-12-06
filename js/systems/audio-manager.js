// ============================================
// BIRDTURDS v40.5 - SMART AUDIO MANAGER
// Prevents sound clutter, manages priorities
// ============================================

const AudioManager = {
    // Sound channels with limits
    channels: {
        music: { current: null, volume: 0.4 },
        voice: { current: null, volume: 1.0, queue: [] },
        sfx: { playing: [], maxConcurrent: 4, volume: 0.7 },
        ambient: { current: null, volume: 0.2 },
        birds: { playing: [], maxConcurrent: 2, volume: 0.5, cooldown: {} }  // LIMITED!
    },
    
    // Sound priority (higher = more important, plays over others)
    priorities: {
        // Critical - always play
        'angel_summon': 10,
        'angel_smite': 10,
        'demon_screech': 9,
        'bible_pickup': 9,
        
        // Important - usually play
        'sniper_shot': 8,
        'hunter_oof': 7,
        'player_hurt': 7,
        
        // Character sounds
        'bubba_shoot': 6,
        'daisy_shoot': 6,
        'buck_shoot': 6,
        'clyde_shoot': 6,
        
        // Animals - medium priority
        'cow_moo': 5,
        'horse_neigh': 5,
        'dog_bark': 5,
        'cat_meow': 5,
        
        // Birds - LOW priority, heavily limited
        'pigeon_coo': 2,
        'crow_caw': 2,
        'seagull_squawk': 2,
        'hawk_screech': 3,
        'eagle_cry': 3,
        'goose_honk': 2,
        'sparrow_chirp': 1,
        'owl_hoot': 2,
        'cardinal_song': 2,
        'bluebird_song': 2
    },
    
    // Cooldowns to prevent spam (in ms)
    cooldowns: {
        bird_death: 500,      // Min time between bird death sounds
        animal_bounce: 300,   // Min time between animal sounds
        gunshot: 200,         // Min time between shots
        default: 100
    },
    
    // Track last play times
    lastPlayed: {},
    
    // Loaded sounds cache
    sounds: {},
    
    init: function() {
        this.sounds = {};
        this.lastPlayed = {};
        console.log('AudioManager initialized with smart limiting');
    },
    
    // Load a sound (lazy loading)
    load: function(key, src) {
        if (this.sounds[key]) return this.sounds[key];
        
        const audio = new Audio();
        audio.src = src;
        audio.preload = 'auto';
        this.sounds[key] = audio;
        return audio;
    },
    
    // Main play function with smart limiting
    play: function(src, options = {}) {
        const key = this.getKeyFromSrc(src);
        const priority = this.priorities[key] || 3;
        const channel = options.channel || 'sfx';
        
        // Check cooldown
        if (!this.checkCooldown(key)) {
            return null;
        }
        
        // Check if it's a bird sound - extra limiting
        if (this.isBirdSound(key)) {
            return this.playBirdSound(key, src, options);
        }
        
        // Check channel capacity
        if (channel === 'sfx' && this.channels.sfx.playing.length >= this.channels.sfx.maxConcurrent) {
            // Only play if higher priority than lowest playing
            const lowestPriority = Math.min(...this.channels.sfx.playing.map(s => s.priority));
            if (priority <= lowestPriority) {
                return null; // Skip this sound
            }
            // Remove lowest priority sound
            this.removeLowestPriority('sfx');
        }
        
        // Play the sound
        return this.playSound(key, src, channel, priority, options);
    },
    
    // Special handling for bird sounds - very limited!
    playBirdSound: function(key, src, options) {
        const birdChannel = this.channels.birds;
        
        // Extra cooldown for bird sounds (prevent cacophony)
        const birdCooldown = 800; // 800ms between ANY bird sounds
        const now = Date.now();
        
        if (birdChannel.cooldown.last && now - birdChannel.cooldown.last < birdCooldown) {
            return null; // Too soon, skip
        }
        
        // Max 2 bird sounds at once
        if (birdChannel.playing.length >= birdChannel.maxConcurrent) {
            return null; // Too many birds chirping
        }
        
        // Play with reduced volume
        const audio = this.playSound(key, src, 'birds', 2, {
            ...options,
            volume: birdChannel.volume * (options.volume || 1)
        });
        
        if (audio) {
            birdChannel.cooldown.last = now;
        }
        
        return audio;
    },
    
    playSound: function(key, src, channel, priority, options) {
        // Get or load audio
        let audio = this.sounds[key];
        if (!audio) {
            audio = this.load(key, src);
        }
        
        // Clone for overlapping plays
        const sound = audio.cloneNode();
        sound.volume = (options.volume || 1) * (this.channels[channel]?.volume || 0.7);
        
        // Track in channel
        const trackObj = { audio: sound, priority: priority, key: key };
        
        if (channel === 'sfx') {
            this.channels.sfx.playing.push(trackObj);
        } else if (channel === 'birds') {
            this.channels.birds.playing.push(trackObj);
        }
        
        // Clean up when done
        sound.onended = () => {
            this.removeFromChannel(channel, trackObj);
        };
        
        // Play
        sound.play().catch(e => {
            // Autoplay blocked, ignore
        });
        
        // Record play time
        this.lastPlayed[key] = Date.now();
        
        return sound;
    },
    
    // Check if enough time has passed
    checkCooldown: function(key) {
        const now = Date.now();
        const lastTime = this.lastPlayed[key] || 0;
        
        // Determine cooldown type
        let cooldown = this.cooldowns.default;
        
        if (this.isBirdSound(key)) {
            cooldown = this.cooldowns.bird_death;
        } else if (key.includes('shoot')) {
            cooldown = this.cooldowns.gunshot;
        } else if (key.includes('_') && ['moo', 'bark', 'neigh', 'meow', 'oink', 'bleat'].some(s => key.includes(s))) {
            cooldown = this.cooldowns.animal_bounce;
        }
        
        return (now - lastTime) >= cooldown;
    },
    
    isBirdSound: function(key) {
        const birdKeys = ['pigeon', 'crow', 'hawk', 'eagle', 'seagull', 'goose', 'sparrow', 'owl', 'cardinal', 'bluebird', 'bird'];
        return birdKeys.some(bird => key.toLowerCase().includes(bird));
    },
    
    getKeyFromSrc: function(src) {
        // Extract filename without extension
        const parts = src.split('/');
        const filename = parts[parts.length - 1];
        return filename.replace('.mp3', '').replace('.wav', '');
    },
    
    removeLowestPriority: function(channel) {
        const ch = this.channels[channel];
        if (!ch || !ch.playing || ch.playing.length === 0) return;
        
        // Find lowest priority
        let lowestIdx = 0;
        let lowestPri = ch.playing[0].priority;
        
        ch.playing.forEach((s, i) => {
            if (s.priority < lowestPri) {
                lowestPri = s.priority;
                lowestIdx = i;
            }
        });
        
        // Stop and remove
        const removed = ch.playing.splice(lowestIdx, 1)[0];
        if (removed && removed.audio) {
            removed.audio.pause();
        }
    },
    
    removeFromChannel: function(channel, trackObj) {
        const ch = this.channels[channel];
        if (!ch || !ch.playing) return;
        
        const idx = ch.playing.indexOf(trackObj);
        if (idx > -1) {
            ch.playing.splice(idx, 1);
        }
    },
    
    // Play looping sound (music, ambient, tractor engine)
    playLoop: function(src, volume = 0.5) {
        const key = this.getKeyFromSrc(src);
        let audio = this.sounds[key];
        
        if (!audio) {
            audio = this.load(key, src);
        }
        
        audio.loop = true;
        audio.volume = volume;
        audio.play().catch(e => {});
        
        return audio;
    },
    
    // Play music
    playMusic: function(src) {
        // Stop current music
        if (this.channels.music.current) {
            this.channels.music.current.pause();
        }
        
        const music = this.playLoop(src, this.channels.music.volume);
        this.channels.music.current = music;
        return music;
    },
    
    // Stop all sounds
    stopAll: function() {
        // Stop music
        if (this.channels.music.current) {
            this.channels.music.current.pause();
        }
        
        // Stop SFX
        this.channels.sfx.playing.forEach(s => {
            if (s.audio) s.audio.pause();
        });
        this.channels.sfx.playing = [];
        
        // Stop birds
        this.channels.birds.playing.forEach(s => {
            if (s.audio) s.audio.pause();
        });
        this.channels.birds.playing = [];
    },
    
    // Pause all
    pauseAll: function() {
        if (this.channels.music.current) {
            this.channels.music.current.pause();
        }
    },
    
    // Resume
    resumeAll: function() {
        if (this.channels.music.current) {
            this.channels.music.current.play().catch(e => {});
        }
    },
    
    // Set master volume
    setVolume: function(channel, volume) {
        if (this.channels[channel]) {
            this.channels[channel].volume = Math.max(0, Math.min(1, volume));
        }
    }
};

// Export
if (typeof module !== 'undefined') {
    module.exports = AudioManager;
}
