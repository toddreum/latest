// ============================================
// BIRDTURDS v41.0 - MASTER PATHS REFERENCE
// All asset paths in one place for easy reference
// ============================================

const ASSET_PATHS = {
    version: '41.0',
    
    // Base paths
    base: {
        sprites: '/sprites',
        sounds: '/sounds',
        js: '/js/systems'
    },
    
    // ==========================================
    // SPRITES
    // ==========================================
    sprites: {
        // Animals (farm)
        animals: {
            cat:      { left: '/sprites/animals/cat_strip.png',      right: '/sprites/animals/cat_strip_right.png',      frames: 4, frameW: 63,  frameH: 45 },
            dog:      { left: '/sprites/animals/dog_strip.png',      right: '/sprites/animals/dog_strip_right.png',      frames: 4, frameW: 64,  frameH: 45 },
            cow:      { left: '/sprites/animals/cow_strip.png',      right: '/sprites/animals/cow_strip_right.png',      frames: 4, frameW: 79,  frameH: 55 },
            horse:    { left: '/sprites/animals/horse_strip.png',    right: '/sprites/animals/horse_strip_right.png',    frames: 4, frameW: 91,  frameH: 85 },
            pig:      { left: '/sprites/animals/pig_strip.png',      right: '/sprites/animals/pig_strip_right.png',      frames: 4, frameW: 66,  frameH: 50 },
            goat:     { left: '/sprites/animals/goat_strip.png',     right: '/sprites/animals/goat_strip_right.png',     frames: 4, frameW: 57,  frameH: 55 },
            sheep:    { left: '/sprites/animals/sheep_strip.png',    right: '/sprites/animals/sheep_strip_right.png',    frames: 4, frameW: 54,  frameH: 50 },
            rooster:  { left: '/sprites/animals/rooster_strip.png',  right: '/sprites/animals/rooster_strip_right.png',  frames: 4, frameW: 65,  frameH: 45 },
            chicken:  { left: '/sprites/animals/chicken_strip.png',  right: '/sprites/animals/chicken_strip_right.png',  frames: 4, frameW: 40,  frameH: 27 }
        },
        
        // Vehicles (tractors)
        vehicles: {
            tractor_good:      { left: '/sprites/vehicles/tractor_good_strip_left.png', right: '/sprites/vehicles/tractor_good_strip.png', frames: 4, frameW: 100, frameH: 80 },
            tractor_bad:       { left: '/sprites/vehicles/tractor_bad_strip_left.png',  right: '/sprites/vehicles/tractor_bad_strip.png',  frames: 4, frameW: 100, frameH: 80 },
            tractor_good_new:  { file: '/sprites/vehicles/tractor_good_new.png', format: 'grid', cols: 2, rows: 2, frameW: 422, frameH: 332 },
            tractor_bad_new:   { file: '/sprites/vehicles/tractor_bad_new.png',  format: 'grid', cols: 2, rows: 4, frameW: 444, frameH: 320 }
        },
        
        // Bots (phone zombies)
        bots: {
            bot1: { left: '/sprites/bots/bot1_strip_left.png', right: '/sprites/bots/bot1_strip.png', frames: 4, frameW: 50, frameH: 75 },
            bot2: { left: '/sprites/bots/bot2_strip_left.png', right: '/sprites/bots/bot2_strip.png', frames: 4, frameW: 50, frameH: 75 },
            bot3: { left: '/sprites/bots/bot3_strip_left.png', right: '/sprites/bots/bot3_strip.png', frames: 4, frameW: 50, frameH: 75 },
            bot4: { left: '/sprites/bots/bot4_strip_left.png', right: '/sprites/bots/bot4_strip.png', frames: 4, frameW: 50, frameH: 75 }
        },
        
        // Demon
        demon: {
            fly:    { left: '/sprites/demon/demon_strip_left.png', right: '/sprites/demon/demon_strip.png', frames: 4, frameW: 60, frameH: 70 },
            attack: { file: '/sprites/demon/demon_attack_sized.png', frameW: 60, frameH: 70 },
            hit:    { file: '/sprites/demon/demon_hit_sized.png',    frameW: 60, frameH: 70 },
            flee:   { file: '/sprites/demon/demon_flee_sized.png',   frameW: 60, frameH: 70 }
        },
        
        // Enemies
        enemies: {
            sniper: { left: '/sprites/enemies/sniper_strip.png', right: '/sprites/enemies/sniper_strip_right.png', frames: 4, frameW: 60, frameH: 70 }
        },
        
        // NPCs
        npcs: {
            farmer: { left: '/sprites/npcs/farmer_strip.png', right: '/sprites/npcs/farmer_strip_right.png', frames: 4, frameW: 50, frameH: 55 },
            child:  { left: '/sprites/npcs/child_strip.png',  right: '/sprites/npcs/child_strip_right.png',  frames: 4, frameW: 30, frameH: 50 }
        },
        
        // Trump event
        trump: {
            walk:           { file: '/sprites/trump/trump_walk.png',      cols: 3, rows: 3, frameW: 422, frameH: 436 },
            run:            { file: '/sprites/trump/trump_run.png',       cols: 3, rows: 3, frameW: 436, frameH: 468 },
            hurt:           { file: '/sprites/trump/trump_hurt.png',      cols: 1, rows: 1, frameW: 636, frameH: 924 },
            bodyguard_walk: { file: '/sprites/trump/bodyguard_walk.png',  cols: 3, rows: 4, frameW: 342, frameH: 396 },
            bodyguard_shoot:{ file: '/sprites/trump/bodyguard_shoot.png', cols: 4, rows: 4, frameW: 320, frameH: 256 }
        },
        
        // Items
        items: {
            umbrella: { file: '/sprites/items/umbrella.png', frameW: 40, frameH: 40 }
        }
    },
    
    // ==========================================
    // SOUNDS
    // ==========================================
    sounds: {
        // Animal sounds
        animals: {
            bear:    '/sounds/bear_growl.mp3',
            cat:     '/sounds/cat_meow.mp3',
            chicken: '/sounds/chicken_cluck.mp3',
            cow:     '/sounds/cow_moo.mp3',
            crow:    '/sounds/crow_caw.mp3',
            deer:    '/sounds/deer_call.mp3',
            dog:     '/sounds/dog_bark.mp3',
            duck:    '/sounds/duck_quack.mp3',
            eagle:   '/sounds/eagle_cry.mp3',
            elk:     '/sounds/elk_bugle.mp3',
            goat:    '/sounds/goat_bleat.mp3',
            goose:   '/sounds/goose_honk.mp3',
            horse:   '/sounds/horse_neigh.mp3',
            owl:     '/sounds/owl_hoot.mp3',
            pig:     '/sounds/pig_oink.mp3',
            pigeon:  '/sounds/pigeon_coo.mp3',
            rooster: '/sounds/rooster_crow.mp3',
            seagull: '/sounds/seagull_squawk.mp3',
            sheep:   '/sounds/sheep_baa.mp3',
            wolf:    '/sounds/wolf_howl.mp3'
        },
        
        // Character sounds
        character: {
            hunter_hurt: '/sounds/hunter_oof.mp3',
            child_happy: '/sounds/child_wheee.mp3'
        },
        
        // Enemy sounds
        enemies: {
            demon:  '/sounds/demon_screech.mp3',
            sniper: '/sounds/sniper_shot.mp3'
        },
        
        // Vehicle sounds
        vehicles: {
            tractor_good_engine: '/sounds/tractor_good.mp3',
            tractor_bad_engine:  '/sounds/tractor_bad.mp3',
            tractor_good_voice:  '/sounds/tractor_driver_good.mp3',
            tractor_bad_voice:   '/sounds/tractor_driver_bad.mp3'
        },
        
        // Item sounds
        items: {
            ring_grab:     '/sounds/ring_grab.mp3',
            umbrella_open: '/sounds/umbrella_open.mp3',
            knife_slash:   '/sounds/knife_slash.mp3'
        }
    },
    
    // ==========================================
    // SYSTEM JS FILES
    // ==========================================
    systems: {
        'angel-system':        '/js/systems/angel-system.js',
        'animal-sprites':      '/js/systems/animal-sprites.js',
        'audio-manager':       '/js/systems/audio-manager.js',
        'AUDIO_CONFIG':        '/js/systems/AUDIO_CONFIG.js',
        'bible-system':        '/js/systems/bible-system.js',
        'bot-hunter-system':   '/js/systems/bot-hunter-system.js',
        'comic-bubble-system': '/js/systems/comic-bubble-system.js',
        'community-system':    '/js/systems/community-system.js',
        'debug-system':        '/js/systems/debug-system.js',
        'demon-system':        '/js/systems/demon-system.js',
        'devotional-system':   '/js/systems/devotional-system.js',
        'family-system':       '/js/systems/family-system.js',
        'farm-animals':        '/js/systems/farm-animals.js',
        'game-integration':    '/js/systems/game-integration.js',
        'game-rules':          '/js/systems/game-rules.js',
        'input-manager':       '/js/systems/input-manager.js',
        'leaderboard-system':  '/js/systems/leaderboard-system.js',
        'news-system':         '/js/systems/news-system.js',
        'npc-systems':         '/js/systems/npc-systems.js',
        'personal-journey':    '/js/systems/personal-journey.js',
        'prayer-system':       '/js/systems/prayer-system.js',
        'resources-system':    '/js/systems/resources-system.js',
        'scripture-quiz':      '/js/systems/scripture-quiz.js',
        'sniper-wildlife':     '/js/systems/sniper-wildlife.js',
        'social-system':       '/js/systems/social-system.js',
        'tractor-system':      '/js/systems/tractor-system.js',
        'voice-system':        '/js/systems/voice-system.js',
        'wellness-system':     '/js/systems/wellness-system.js',
        'worship-music-system':'/js/systems/worship-music-system.js'
    },
    
    // Helper to get full path
    getSpritePath: function(category, name, direction) {
        const sprite = this.sprites[category]?.[name];
        if (!sprite) return null;
        if (direction === 'left') return sprite.left || sprite.file;
        if (direction === 'right') return sprite.right || sprite.file;
        return sprite.file || sprite.right;
    },
    
    getSoundPath: function(category, name) {
        return this.sounds[category]?.[name] || null;
    }
};

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ASSET_PATHS;
}
if (typeof window !== 'undefined') {
    window.ASSET_PATHS = ASSET_PATHS;
}
