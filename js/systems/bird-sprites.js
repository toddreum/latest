// ============================================
// BIRDTURDS v41.0 - BIRD SPRITE SYSTEM
// All 41 bird types with configurations
// ============================================

const BirdSprites = {
    basePath: '/sprites/birds/',
    
    // All birds are 768x768 static images
    // They need to be scaled down for gameplay (~50-80px)
    defaultSize: 768,
    gameScale: 0.08,  // 768 * 0.08 = ~61px
    
    // Bird categories for spawning
    categories: {
        common: ['pigeon', 'crow', 'seagull', 'dove', 'sparrow'],
        waterfowl: ['duck', 'goose', 'swan', 'pelican', 'heron', 'crane', 'stork', 'pintail', 'teal', 'woodduck'],
        gamebirds: ['pheasant', 'quail', 'grouse', 'partridge', 'turkey', 'woodcock', 'snipe', 'chicken'],
        raptors: ['hawk', 'falcon', 'baldeagle', 'goldeneagle', 'osprey', 'owl', 'vulture'],
        exotic: ['parrot', 'toucan', 'flamingo', 'peacock', 'penguin', 'magpie'],
        mythical: ['phoenix', 'dragon', 'thunderbird', 'pterodactyl', 'dodo'],
        nocturnal: ['owl', 'bat']
    },
    
    // All 41 birds with their configurations
    birds: {
        // Common Birds
        pigeon: {
            name: 'Pigeon',
            file: 'pigeon.png',
            points: 10,
            speed: 2,
            poopChance: 0.3,
            rarity: 'common',
            sound: '/sounds/pigeon_coo.mp3'
        },
        crow: {
            name: 'Crow',
            file: 'crow.png',
            points: 15,
            speed: 2.5,
            poopChance: 0.35,
            rarity: 'common',
            sound: '/sounds/crow_caw.mp3'
        },
        seagull: {
            name: 'Seagull',
            file: 'seagull.png',
            points: 12,
            speed: 2.2,
            poopChance: 0.4,  // Seagulls are messy!
            rarity: 'common',
            sound: '/sounds/seagull_squawk.mp3'
        },
        dove: {
            name: 'Dove',
            file: 'dove.png',
            points: 20,
            speed: 1.8,
            poopChance: 0.15,
            rarity: 'common',
            special: 'peaceful',  // Less aggressive
            sound: null
        },
        
        // Waterfowl
        duck: {
            name: 'Duck',
            file: 'duck.png',
            points: 18,
            speed: 2,
            poopChance: 0.25,
            rarity: 'common',
            sound: '/sounds/duck_quack.mp3'
        },
        goose: {
            name: 'Goose',
            file: 'goose.png',
            points: 25,
            speed: 2.3,
            poopChance: 0.35,
            rarity: 'uncommon',
            special: 'aggressive',
            sound: '/sounds/goose_honk.mp3'
        },
        swan: {
            name: 'Swan',
            file: 'swan.png',
            points: 40,
            speed: 1.5,
            poopChance: 0.2,
            rarity: 'rare',
            special: 'graceful'
        },
        pelican: {
            name: 'Pelican',
            file: 'pelican.png',
            points: 35,
            speed: 1.8,
            poopChance: 0.3,
            rarity: 'uncommon'
        },
        heron: {
            name: 'Heron',
            file: 'heron.png',
            points: 30,
            speed: 1.6,
            poopChance: 0.2,
            rarity: 'uncommon'
        },
        crane: {
            name: 'Crane',
            file: 'crane.png',
            points: 45,
            speed: 1.7,
            poopChance: 0.2,
            rarity: 'rare'
        },
        stork: {
            name: 'Stork',
            file: 'stork.png',
            points: 50,
            speed: 1.5,
            poopChance: 0.15,
            rarity: 'rare',
            special: 'delivers_bonus'  // Sometimes drops good items
        },
        pintail: {
            name: 'Pintail',
            file: 'pintail.png',
            points: 22,
            speed: 2.2,
            poopChance: 0.25,
            rarity: 'uncommon'
        },
        teal: {
            name: 'Teal',
            file: 'teal.png',
            points: 20,
            speed: 2.4,
            poopChance: 0.25,
            rarity: 'uncommon'
        },
        woodduck: {
            name: 'Wood Duck',
            file: 'woodduck.png',
            points: 28,
            speed: 2.1,
            poopChance: 0.25,
            rarity: 'uncommon'
        },
        
        // Game Birds
        pheasant: {
            name: 'Pheasant',
            file: 'pheasant.png',
            points: 35,
            speed: 2.5,
            poopChance: 0.2,
            rarity: 'uncommon'
        },
        quail: {
            name: 'Quail',
            file: 'quail.png',
            points: 25,
            speed: 2.8,
            poopChance: 0.15,
            rarity: 'common'
        },
        grouse: {
            name: 'Grouse',
            file: 'grouse.png',
            points: 30,
            speed: 2.3,
            poopChance: 0.2,
            rarity: 'uncommon'
        },
        partridge: {
            name: 'Partridge',
            file: 'partridge.png',
            points: 28,
            speed: 2.4,
            poopChance: 0.2,
            rarity: 'uncommon'
        },
        turkey: {
            name: 'Turkey',
            file: 'turkey.png',
            points: 40,
            speed: 1.5,
            poopChance: 0.35,
            rarity: 'uncommon',
            size: 1.3  // 30% bigger
        },
        woodcock: {
            name: 'Woodcock',
            file: 'woodcock.png',
            points: 32,
            speed: 2.2,
            poopChance: 0.2,
            rarity: 'uncommon'
        },
        snipe: {
            name: 'Snipe',
            file: 'snipe.png',
            points: 45,
            speed: 3.0,
            poopChance: 0.15,
            rarity: 'rare',
            special: 'fast'  // Hard to hit!
        },
        chicken: {
            name: 'Chicken',
            file: 'chicken.png',
            points: 8,
            speed: 1.2,
            poopChance: 0.4,
            rarity: 'common',
            sound: '/sounds/chicken_cluck.mp3'
        },
        
        // Raptors (harder to hit, more points)
        hawk: {
            name: 'Hawk',
            file: 'hawk.png',
            points: 60,
            speed: 3.5,
            poopChance: 0.1,
            rarity: 'rare',
            special: 'swoops'  // Dives at player
        },
        falcon: {
            name: 'Falcon',
            file: 'falcon.png',
            points: 75,
            speed: 4.0,
            poopChance: 0.08,
            rarity: 'rare',
            special: 'fast'
        },
        baldeagle: {
            name: 'Bald Eagle',
            file: 'baldeagle.png',
            points: 100,
            speed: 3.0,
            poopChance: 0.15,
            rarity: 'epic',
            size: 1.4,
            sound: '/sounds/eagle_cry.mp3'
        },
        goldeneagle: {
            name: 'Golden Eagle',
            file: 'goldeneagle.png',
            points: 90,
            speed: 3.2,
            poopChance: 0.12,
            rarity: 'epic',
            size: 1.35
        },
        osprey: {
            name: 'Osprey',
            file: 'osprey.png',
            points: 70,
            speed: 3.3,
            poopChance: 0.1,
            rarity: 'rare'
        },
        owl: {
            name: 'Owl',
            file: 'owl.png',
            points: 55,
            speed: 2.0,
            poopChance: 0.2,
            rarity: 'rare',
            special: 'nocturnal',
            sound: '/sounds/owl_hoot.mp3'
        },
        vulture: {
            name: 'Vulture',
            file: 'vulture.png',
            points: 45,
            speed: 2.2,
            poopChance: 0.3,
            rarity: 'uncommon',
            size: 1.25
        },
        
        // Exotic Birds
        parrot: {
            name: 'Parrot',
            file: 'parrot.png',
            points: 50,
            speed: 2.5,
            poopChance: 0.25,
            rarity: 'rare',
            special: 'colorful'
        },
        toucan: {
            name: 'Toucan',
            file: 'toucan.png',
            points: 55,
            speed: 2.3,
            poopChance: 0.2,
            rarity: 'rare'
        },
        flamingo: {
            name: 'Flamingo',
            file: 'flamingo.png',
            points: 60,
            speed: 1.8,
            poopChance: 0.25,
            rarity: 'rare',
            size: 1.3
        },
        peacock: {
            name: 'Peacock',
            file: 'peacock.png',
            points: 70,
            speed: 1.5,
            poopChance: 0.3,
            rarity: 'epic',
            size: 1.4,
            special: 'display'  // Flashes tail feathers
        },
        penguin: {
            name: 'Penguin',
            file: 'penguin.png',
            points: 40,
            speed: 1.0,
            poopChance: 0.35,
            rarity: 'rare',
            special: 'waddles'  // Moves differently
        },
        magpie: {
            name: 'Magpie',
            file: 'magpie.png',
            points: 25,
            speed: 2.7,
            poopChance: 0.25,
            rarity: 'uncommon',
            special: 'steals'  // Can steal power-ups
        },
        
        // Mythical/Fantasy Birds (boss-tier)
        phoenix: {
            name: 'Phoenix',
            file: 'phoenix.png',
            points: 500,
            speed: 3.5,
            poopChance: 0.05,
            rarity: 'legendary',
            size: 1.5,
            special: 'respawns',  // Can come back after being hit
            health: 3
        },
        dragon: {
            name: 'Dragon',
            file: 'dragon.png',
            points: 750,
            speed: 3.0,
            poopChance: 0.4,
            rarity: 'legendary',
            size: 2.0,
            special: 'fire',  // Shoots fire
            health: 5
        },
        thunderbird: {
            name: 'Thunderbird',
            file: 'thunderbird.png',
            points: 600,
            speed: 4.0,
            poopChance: 0.1,
            rarity: 'legendary',
            size: 1.8,
            special: 'lightning',
            health: 4
        },
        pterodactyl: {
            name: 'Pterodactyl',
            file: 'pterodactyl.png',
            points: 400,
            speed: 3.8,
            poopChance: 0.2,
            rarity: 'legendary',
            size: 1.7,
            special: 'prehistoric',
            health: 3
        },
        dodo: {
            name: 'Dodo',
            file: 'dodo.png',
            points: 200,
            speed: 0.8,
            poopChance: 0.5,
            rarity: 'legendary',
            special: 'extinct',  // Very slow but worth a lot
            size: 1.2
        },
        
        // Bat (honorary "bird")
        bat: {
            name: 'Bat',
            file: 'bat.png',
            points: 30,
            speed: 3.0,
            poopChance: 0.15,
            rarity: 'uncommon',
            special: 'nocturnal',
            size: 0.8  // Smaller
        }
    },
    
    // Get a bird config
    getBird: function(birdId) {
        return this.birds[birdId] || null;
    },
    
    // Get sprite path
    getPath: function(birdId) {
        const bird = this.birds[birdId];
        if (!bird) return null;
        return this.basePath + bird.file;
    },
    
    // Get all bird IDs
    getAllBirdIds: function() {
        return Object.keys(this.birds);
    },
    
    // Get birds by category
    getBirdsByCategory: function(category) {
        return this.categories[category] || [];
    },
    
    // Get birds by rarity
    getBirdsByRarity: function(rarity) {
        return Object.entries(this.birds)
            .filter(([id, bird]) => bird.rarity === rarity)
            .map(([id]) => id);
    },
    
    // Get random bird based on rarity weights
    getRandomBird: function(allowMythical = false) {
        const weights = {
            common: 50,
            uncommon: 30,
            rare: 15,
            epic: 4,
            legendary: allowMythical ? 1 : 0
        };
        
        // Calculate total weight
        const totalWeight = Object.values(weights).reduce((a, b) => a + b, 0);
        let random = Math.random() * totalWeight;
        
        // Pick rarity
        let selectedRarity = 'common';
        for (const [rarity, weight] of Object.entries(weights)) {
            random -= weight;
            if (random <= 0) {
                selectedRarity = rarity;
                break;
            }
        }
        
        // Get birds of that rarity
        const birds = this.getBirdsByRarity(selectedRarity);
        if (birds.length === 0) {
            // Fallback to common
            const commonBirds = this.getBirdsByRarity('common');
            return commonBirds[Math.floor(Math.random() * commonBirds.length)];
        }
        
        return birds[Math.floor(Math.random() * birds.length)];
    },
    
    // Phaser preload helper
    loadBird: function(scene, birdId) {
        const bird = this.birds[birdId];
        if (!bird) return;
        
        scene.load.image('bird_' + birdId, this.basePath + bird.file);
    },
    
    // Load all birds
    loadAll: function(scene) {
        Object.keys(this.birds).forEach(birdId => {
            this.loadBird(scene, birdId);
        });
    },
    
    // Create a bird sprite
    createBird: function(scene, birdId, x, y) {
        const bird = this.birds[birdId];
        if (!bird) return null;
        
        const sprite = scene.add.image(x, y, 'bird_' + birdId);
        
        // Apply scale
        let scale = this.gameScale;
        if (bird.size) {
            scale *= bird.size;
        }
        sprite.setScale(scale);
        
        // Store bird data on sprite
        sprite.birdId = birdId;
        sprite.birdConfig = bird;
        
        return sprite;
    },
    
    // Get total bird count
    getTotalCount: function() {
        return Object.keys(this.birds).length;
    }
};

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { BirdSprites };
}
if (typeof window !== 'undefined') {
    window.BirdSprites = BirdSprites;
}
