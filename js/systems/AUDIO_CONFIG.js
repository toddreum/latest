// BIRDTURDS v40.5 - Audio Configuration
// Maps all sounds, voices, and bot configurations

const AudioConfig = {
    
    // ==========================================
    // BOT HUNTER SOUND MAPPING
    // Each bot uses a different character's gunshot
    // ==========================================
    botSounds: {
        bot1: 'sounds/bubba_shoot.mp3',   // Big guy orange cap
        bot2: 'sounds/daisy_shoot.mp3',   // Woman hunter
        bot3: 'sounds/buck_shoot.mp3',    // Lumberjack beard
        bot4: 'sounds/clyde_shoot.mp3'    // Cowboy
    },
    
    // ==========================================
    // ANIMAL SOUNDS
    // ==========================================
    animalSounds: {
        cat: 'sounds/cat_meow.mp3',
        chicken: 'sounds/chicken_cluck.mp3',
        cow: 'sounds/cow_moo.mp3',
        dog: 'sounds/dog_bark.mp3',
        goat: 'sounds/goat_bleat.mp3',
        horse: 'sounds/horse_neigh.mp3',
        pig: 'sounds/pig_oink.mp3',
        rooster: 'sounds/rooster_crow.mp3',
        sheep: 'sounds/sheep_baa.mp3',
        // Wildlife
        deer: 'sounds/deer_call.mp3',
        elk: 'sounds/elk_bugle.mp3',
        bear: 'sounds/bear_growl.mp3',
        wolf: 'sounds/wolf_howl.mp3'
    },
    
    // ==========================================
    // NPC SOUNDS
    // ==========================================
    npcSounds: {
        child: 'sounds/child_wheee.mp3',
        hunter_bounced: 'sounds/hunter_oof.mp3'
        // farmer_hey - SKIPPED per user request
    },
    
    // ==========================================
    // ITEM SOUNDS
    // ==========================================
    itemSounds: {
        umbrella_open: 'sounds/umbrella_open.mp3',
        knife_slash: 'sounds/knife_slash.mp3',
        ring_grab: 'sounds/ring_grab.mp3'
    },
    
    // ==========================================
    // ENEMY SOUNDS
    // ==========================================
    enemySounds: {
        sniper_shot: 'sounds/sniper_shot.mp3'
    },
    
    // ==========================================
    // VEHICLE SOUNDS
    // ==========================================
    vehicleSounds: {
        tractor_good: 'sounds/tractor_good.mp3',
        tractor_bad: 'sounds/tractor_bad.mp3',
        tractor_driver_bad: 'sounds/tractor_driver_bad.mp3'
    },
    
    // ==========================================
    // VOICE LINES SYSTEM
    // Uses ElevenLabs voices from server
    // ==========================================
    voiceLines: {
        
        // Pastor comments on bad tractor driver (random, spaced 30-60s)
        pastor: {
            lines: [
                "That fella sure has a chip on his shoulder!",
                "That man needs Jesus, bad!",
                "Let's pray for that poor soul...",
                "Lord have mercy on that angry man!"
            ],
            interval: { min: 30000, max: 60000 }, // 30-60 seconds
            // TODO: Point to ElevenLabs pastor voice files on server
            // voiceId: 'pastor_voice_id_here'
        },
        
        // Hunter comments when demon appears (random)
        hunters: {
            demonLines: [
                "There's that demon again!",
                "Time for some Jesus fire!",
                "In the name of Jesus, BE GONE!",
                "You ain't welcome here, devil!"
            ],
            // TODO: Point to ElevenLabs hunter voice files on server
            // voiceId: 'hunter_voice_id_here'
        },
        
        // Scripture quotes (every ~5 minutes)
        scripture: {
            quotes: [
                { text: "Submit to God. Resist the devil, and he will flee!", ref: "James 4:7" },
                { text: "The devil prowls like a roaring lion... resist him!", ref: "1 Peter 5:8-9" },
                { text: "Greater is He that is in you than he that is in the world!", ref: "1 John 4:4" },
                { text: "No weapon formed against you shall prosper!", ref: "Isaiah 54:17" },
                { text: "Be sober, be vigilant, for your adversary the devil seeks whom he may devour!", ref: "1 Peter 5:8" },
                { text: "Put on the whole armor of God to stand against the wiles of the devil!", ref: "Ephesians 6:11" }
            ],
            interval: 300000, // 5 minutes
            // TODO: Point to ElevenLabs scripture voice files on server
        }
    },
    
    // ==========================================
    // DEMON BEHAVIOR CONFIG
    // ==========================================
    demon: {
        // Hovers 50px above red tractor driver
        hoverOffset: 50,
        
        // When shot - flies off, doesn't die
        onHit: {
            action: 'flee',
            points: 100,          // +100 per hit
            returnDelay: 30000,   // Comes back in 30 seconds
            fleeSpeed: 15,        // Fast exit
            fleeDirection: 'up_and_away'
        },
        
        // Sprite frames: fly, attack, hit, flee
        frames: {
            fly: 0,
            attack: 1,
            hit: 2,
            flee: 3
        }
    }
};

// Export for use in game
if (typeof module !== 'undefined') {
    module.exports = AudioConfig;
}
