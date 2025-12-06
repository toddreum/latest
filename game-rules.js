// ============================================
// BIRDTURDS v40.5 - Complete Rules & Point System
// ============================================

const GameRules = {
    version: '40.5',
    
    // ==========================================
    // POINT SYSTEM
    // ==========================================
    points: {
        // Bird shooting (FLYING BIRDS ONLY!)
        birds: {
            pigeon: { points: 10, shootable: true, flying: true, desc: 'Common pigeon' },
            sparrow: { points: 15, shootable: true, flying: true, desc: 'Quick sparrow' },
            crow: { points: 25, shootable: true, flying: true, desc: 'Crafty crow' },
            seagull: { points: 30, shootable: true, flying: true, desc: 'Beach pest' },
            goose: { points: 50, shootable: true, flying: true, desc: 'Aggressive goose' },
            hawk: { points: 75, shootable: true, flying: true, desc: 'Speedy hawk' },
            eagle: { points: 100, shootable: true, flying: true, desc: 'Majestic eagle (bonus bird)' },
            owl: { points: -50, shootable: false, flying: true, desc: 'Protected owl - DO NOT SHOOT' },
            bluebird: { points: -75, shootable: false, flying: true, desc: 'Protected bluebird - DO NOT SHOOT' },
            cardinal: { points: -100, shootable: false, flying: true, desc: 'Protected cardinal - DO NOT SHOOT' }
        },
        
        // SNIPERS - Enemy hunters that shoot at you!
        snipers: {
            kill: { points: 500, desc: 'Shoot a sniper hiding in the scene' },
            scenes: ['park', 'farm', 'country', 'beach', 'city'],
            note: 'Snipers do NOT appear in Trump scene'
        },
        
        // GOLDEN RINGS - Level unlock (Park only)
        goldenRings: {
            grab: { points: 100, desc: 'Grab a golden ring from predator bird' },
            unlock: { points: 250, desc: 'Collect ring to unlock next level' },
            scene: 'park',
            howTo: 'Jump up into hawk/eagle talons to grab the ring!'
        },
        
        // GROUND ANIMALS - NEVER SHOOTABLE
        groundAnimals: {
            note: 'Ground animals CANNOT be shot! Only flying birds are valid targets.',
            protected: ['cow', 'horse', 'pig', 'chicken', 'rooster', 'goat', 'sheep', 'dog', 'cat', 'deer', 'elk', 'bear', 'wolf']
        },
        
        // HELPER BIRDS - Carry the hunter!
        helperBirds: {
            grab: { points: 0, desc: 'Grab onto helper bird to fly' },
            handCatch: { points: 'Bird points x2', desc: 'Catch bird by hand while flying!' },
            types: ['eagle', 'pelican', 'stork']
        },
        
        // KNIFE SYSTEM
        knife: {
            pickup: { points: 0, desc: 'Pick up knife from ground' },
            meleeKill: { points: 'Bird points x1.5', desc: '50% bonus for knife kills!' },
            durability: 5,
            note: 'Knife has 5 uses before breaking'
        },
        
        // POOP BLASTING - Shoot turds out of the air!
        poopBlasting: {
            turdShot: { points: 15, desc: 'Shoot a falling turd' },
            turdCombo: { points: 5, desc: 'Bonus per combo hit' },
            splatterBonus: { points: 25, desc: 'Hit multiple turds with shotgun' }
        },
        
        // FARM ANIMAL riding/bouncing
        farmAnimals: {
            rideHorse: { points: 500, desc: 'Ride the horse (one-time bonus)' },
            rideCow: { points: 500, desc: 'Ride the cow (one-time bonus)' },
            bounceOffAnimal: { points: 0, desc: 'Bounce gives height, not points' }
        },
        
        // WILDLIFE riding/bouncing
        wildlife: {
            rideDeer: { points: 1000, desc: 'Ride the deer in the park!' },
            bounceElk: { power: 2.3, desc: 'Highest bounce power' },
            bounceBear: { power: 1.6, desc: 'Sturdy bounce' },
            bounceWolf: { power: 1.8, desc: 'Quick wolf bounce' }
        },
        
        // NPC Bouncing
        npcBounce: {
            farmer: { points: 30, power: 1.4, desc: 'Bounce off the farmer' },
            otherHunter: { points: 20, power: 1.3, desc: 'Bounce off other hunters' },
            child: { points: 25, power: 1.5, desc: 'Bounce off the child' }
        },
        
        // Bonuses
        bonuses: {
            perfectRound: { points: 200, desc: 'Complete round with no penalties' },
            sniperAce: { points: 300, desc: 'Kill all snipers in scene' },
            rideCombo: { points: 1000, desc: 'Ride both horse AND cow in same round' },
            deerMaster: { points: 500, desc: 'Ride the deer + kill 3 birds while mounted' },
            helperMaster: { points: 100, desc: 'Catch 3+ birds while flying' }
        }
    },
    
    // ==========================================
    // HEALTH SYSTEM
    // ==========================================
    health: {
        starting: 100,
        maxHealth: 100,
        
        damage: {
            hitByTurd: 5,
            hitByFallingBird: 10,
            hitByBird: 15
        },
        
        healing: {
            umbrellaDuration: 5000, // 5 seconds of invincibility
            medkitHeal: 25
        }
    },
    
    // ==========================================
    // BOUNCEABLE ENTITIES (All animals & people!)
    // ==========================================
    bounceables: {
        // FARM ANIMALS (sprites provided)
        farmAnimals: {
            horse: { power: 2.2, rideable: true, points: 500, size: '90x85' },
            cow: { power: 1.8, rideable: true, points: 500, size: '80x55' },
            cat: { power: 1.7, rideable: false, size: '50x45' },
            goat: { power: 1.6, rideable: false, size: '55x55' },
            dog: { power: 1.5, rideable: false, size: '60x45' },
            sheep: { power: 1.4, rideable: false, size: '55x50' },
            pig: { power: 1.3, rideable: false, size: '65x50' },
            chicken: { power: 1.2, rideable: false, size: '35x30' },
            rooster: { power: 1.2, rideable: false, size: '40x45' }
        },
        
        // WILDLIFE (drawn programmatically)
        wildlife: {
            deer: { 
                power: 2.0, 
                rideable: true, 
                points: 1000, 
                scenes: ['park', 'country'],
                size: '85x80',
                note: 'Highest ride bonus in the game!'
            },
            elk: { 
                power: 2.3, 
                rideable: false, 
                scenes: ['country', 'farm'],
                size: '100x90',
                note: 'Highest bounce power!'
            },
            bear: { 
                power: 1.6, 
                rideable: false, 
                scenes: ['country', 'park'],
                size: '80x70'
            },
            wolf: { 
                power: 1.8, 
                rideable: false, 
                scenes: ['country', 'farm'],
                size: '60x45'
            }
        },
        
        // ALL PEOPLE are bounceable!
        people: {
            child: {
                power: 1.5,
                points: 25,
                scenes: ['park', 'farm', 'country', 'beach'],
                desc: 'The child loves being bounced on and says "Wheee!"'
            },
            farmer: {
                power: 1.4,
                points: 30,
                scenes: ['farm', 'country'],
                desc: 'The farmer waves after being bounced on'
            },
            otherHunters: {
                power: 1.3,
                points: 20,
                scenes: ['park', 'farm', 'country', 'beach', 'city'],
                desc: 'Other hunters grunt when bounced on'
            }
        }
    },
    
    // ==========================================
    // SNIPER SYSTEM (Enemy NPCs!)
    // ==========================================
    snipers: {
        description: 'Enemy snipers hide in the scene and try to shoot you!',
        points: 500,
        scenes: ['park', 'farm', 'country', 'beach', 'city'],
        excludedScenes: ['trump'],
        behavior: [
            'Snipers HIDE behind cover (bushes, haystacks, rocks, dumpsters)',
            'They PEEK out before shooting - watch for the red scope glint!',
            'They SHOOT at you - avoid the red tracer bullets!',
            'Shoot them while they\'re peeking or shooting for +500 points'
        ],
        hidingSpots: {
            park: 'bushes, trees',
            farm: 'haystacks, barn windows',
            country: 'bushes, rocks, fences',
            beach: 'umbrellas, sandcastles, lifeguard towers',
            city: 'dumpsters, mailboxes, windows'
        },
        damage: 15,
        tip: 'Watch for the red "!" warning when they peek!'
    },
    
    // ==========================================
    // GOLDEN RING SYSTEM (Park Level Unlock)
    // ==========================================
    goldenRings: {
        description: 'Predator birds carry golden rings in their talons!',
        scene: 'park',
        howToGet: 'Jump UP into the hawk/eagle\'s talons to grab the ring',
        points: {
            grab: 100,
            unlock: 250
        },
        effect: 'Collecting a ring unlocks the next level!',
        carriers: ['hawk', 'eagle'],
        tip: 'Look for the shiny golden ring under the predator birds!'
    },
    
    // ==========================================
    // RANDOM ANIMAL SPAWNING (All Scenes!)
    // ==========================================
    randomAnimals: {
        description: 'Animals can now appear randomly in ANY scene!',
        spawnRates: {
            farm: '80% - Most animals',
            country: '70%',
            park: '30% - Some wildlife',
            beach: '20% - Occasional pets',
            city: '10% - Rare strays'
        },
        sceneAnimals: {
            park: ['dog', 'cat', 'deer', 'bear'],
            farm: ['cow', 'horse', 'pig', 'chicken', 'rooster', 'goat', 'sheep', 'dog', 'cat', 'elk', 'wolf'],
            country: ['cow', 'horse', 'sheep', 'goat', 'dog', 'deer', 'elk', 'wolf'],
            beach: ['dog', 'cat'],
            city: ['dog', 'cat']
        }
    },
    
    // ==========================================
    // SCENE-SPECIFIC RULES
    // ==========================================
    scenes: {
        park: {
            name: 'City Park',
            features: ['Umbrellas spawn on ground', 'Benches for cover', 'Fountains', 'Child NPC'],
            animals: false,
            hasChild: true,
            specialItem: 'Umbrella Shield'
        },
        farm: {
            name: 'Farm',
            features: ['Barn', 'Tractor', 'Hay bales', 'Child NPC'],
            animals: true,
            hasChild: true,
            animalTypes: ['cow', 'horse', 'pig', 'chicken', 'rooster', 'goat', 'sheep', 'dog', 'cat'],
            specialItem: 'Tractor Scoop'
        },
        country: {
            name: 'Countryside',
            features: ['Rolling hills', 'Fences', 'Trees', 'Child NPC'],
            animals: true,
            hasChild: true,
            animalTypes: ['cow', 'horse', 'sheep', 'goat', 'dog'],
            specialItem: 'Animal Riding'
        },
        beach: {
            name: 'Beach',
            features: ['Seagulls', 'Waves', 'Umbrellas (static)', 'Child NPC'],
            animals: false,
            hasChild: true,
            specialItem: 'Beach Chair Cover'
        },
        city: {
            name: 'Downtown',
            features: ['Tall buildings', 'Pigeons galore', 'Traffic'],
            animals: false,
            hasChild: false,
            specialItem: 'Hardhat'
        }
    },
    
    // ==========================================
    // POOP BLASTING RULES
    // ==========================================
    poopBlasting: {
        description: 'Shoot bird turds out of the air for points!',
        howTo: 'When birds poop, the turds fall slowly. Shoot them before they hit you!',
        points: {
            singleShot: 15,
            comboBonus: '+5 per consecutive hit',
            shotgunMultiHit: 25
        },
        tips: [
            'Turds have a golden ring showing they are shootable',
            'Build combos by hitting multiple turds quickly',
            'Shotgun can hit multiple turds at once for bonus points',
            'A 5+ turd streak gives +50 bonus points!'
        ]
    },
    
    // ==========================================
    // UMBRELLA RULES (Park Scene)
    // ==========================================
    umbrella: {
        location: 'Park scene only',
        spawnOnGround: true,
        cost: 'FREE',
        protection: {
            blocksTurds: true,
            blocksFallingBirds: true,
            duration: '5 seconds'
        },
        respawn: '15 seconds after pickup',
        maxOnScreen: 3,
        howToUse: 'Walk over umbrella to pick up. Shield activates automatically.'
    },
    
    // ==========================================
    // ANIMAL RIDING RULES (Farm & Country)
    // ==========================================
    riding: {
        rideableAnimals: ['horse', 'cow'],
        points: 500,
        howToRide: 'Jump and land on top of horse or cow',
        onlyOnce: true, // Can only get ride bonus once per animal per round
        dismount: 'Press DOWN or JUMP to dismount',
        whileRiding: {
            canShoot: true,
            movement: 'Animal controls movement',
            speed: 'Faster than walking'
        }
    },
    
    // ==========================================
    // BOUNCE RULES (All Animals + Child)
    // ==========================================
    bounce: {
        allAnimals: true,
        childBounce: true,
        howToBounce: 'Jump and land on any animal OR the child',
        effect: 'Launch higher into the air',
        bouncePowers: {
            horse: 2.2,
            cow: 1.8,
            cat: 1.7,
            goat: 1.6,
            dog: 1.5,
            sheep: 1.4,
            pig: 1.3,
            chicken: 1.2,
            rooster: 1.2,
            child: 1.5
        },
        childBonus: '+25 points each time you bounce off the child',
        birdCollision: {
            shootableBird: 'Bird dies, earn DOUBLE points',
            protectedBird: 'LOSE points (-50 to -100)'
        }
    },
    
    // ==========================================
    // FALLING BIRD RULES
    // ==========================================
    fallingBirds: {
        trigger: 'Birds fall after being shot',
        danger: 'Falling birds can hit the hunter',
        penalty: {
            points: -25,
            health: -10
        },
        protection: 'Umbrella shield blocks falling birds',
        visual: 'Dead birds tumble and rotate as they fall'
    },
    
    // ==========================================
    // TRACTOR RULES (Farm Scene)
    // ==========================================
    tractor: {
        location: 'Farm scene',
        function: 'Automatically scoops up turds',
        points: '2 points per turd scooped',
        visual: 'Animated scoop showing turds being collected',
        interval: 'Drives across screen periodically'
    }
};

// ==========================================
// HOW TO PLAY CONTENT
// ==========================================

const HowToPlay = {
    title: 'HOW TO PLAY BIRDTURDS',
    version: 'v40.5',
    
    sections: [
        {
            title: '🎯 OBJECTIVE',
            content: 'Shoot FLYING birds, avoid snipers, grab golden rings, ride wild animals, and survive!'
        },
        {
            title: '🎮 CONTROLS',
            items: [
                'ARROW KEYS / WASD - Move hunter',
                'SPACE / CLICK - Shoot',
                'E - Use knife (when equipped)',
                'DOWN - Dismount/Drop',
                'P - Pause game',
                'M - Mute/unmute'
            ]
        },
        {
            title: '🎯 SNIPERS - DANGER!',
            items: [
                '⚠️ Enemy snipers HIDE in the scene and shoot at you!',
                '🔴 Watch for the RED SCOPE GLINT when they peek!',
                '💥 Avoid their red tracer bullets!',
                '🎯 Shoot them for +500 POINTS!',
                '📍 They hide in: bushes, haystacks, rocks, dumpsters',
                '🚫 Snipers do NOT appear in Trump scene'
            ]
        },
        {
            title: '💍 GOLDEN RINGS - Level Unlock!',
            items: [
                '🦅 Predator birds (hawks/eagles) carry golden rings!',
                '⬆️ Jump UP into their talons to GRAB the ring!',
                '💰 +100 points per ring grabbed',
                '🔓 Collect a ring to UNLOCK THE NEXT LEVEL!',
                '📍 Only available in PARK scene'
            ]
        },
        {
            title: '🦌 WILDLIFE ANIMALS',
            items: [
                '🦌 DEER - Rideable! +1000 points (Park, Country)',
                '🫎 ELK - Highest bounce 2.3x (Country, Farm)',
                '🐻 BEAR - 1.6x bounce (Country, Park)',
                '🐺 WOLF - 1.8x bounce (Country, Farm)',
                'All wildlife is bounceable but only deer is rideable!'
            ]
        },
        {
            title: '🐄 FARM ANIMALS',
            items: [
                '🐴 Horse - 2.2x bounce, RIDEABLE +500',
                '🐄 Cow - 1.8x bounce, RIDEABLE +500',
                '🐱 Cat - 1.7x bounce',
                '🐐 Goat - 1.6x bounce',
                '🐕 Dog - 1.5x bounce',
                '🐑 Sheep - 1.4x bounce',
                '🐷 Pig - 1.3x bounce',
                '🐔🐓 Chicken/Rooster - 1.2x bounce',
                '⚠️ Animals appear RANDOMLY in all scenes now!'
            ]
        },
        {
            title: '👥 BOUNCEABLE PEOPLE',
            items: [
                '👨‍🌾 Farmer - 1.4x bounce, +30 pts (Farm, Country)',
                '🎯 Other Hunters - 1.3x bounce, +20 pts (All scenes)',
                '👶 Child - 1.5x bounce, +25 pts (Park, Farm, Country, Beach)'
            ]
        },
        {
            title: '🔪 KNIFE SYSTEM',
            items: [
                '🔪 Knives spawn on the ground',
                '⚔️ Press E for melee kill - +50% bonus points!',
                '🔢 5 uses per knife',
                '✅ Works on flying birds only'
            ]
        },
        {
            title: '🦅 HELPER BIRDS - FLY!',
            items: [
                '🦅 Jump UP into helper bird to grab on!',
                '🕹️ Use arrow keys to fly (5-6 seconds)',
                '✋ Hand catch birds for DOUBLE points!',
                '💚 Green glow = friendly helper bird'
            ]
        },
        {
            title: '⚠️ SHOOTING RULES',
            items: [
                '✅ CAN SHOOT: Flying birds, falling poop, SNIPERS',
                '❌ CANNOT SHOOT: Ground animals, protected birds, people, helper birds'
            ]
        },
        {
            title: '⭐ BONUS POINTS',
            items: [
                '🎯 Kill all snipers = +300',
                '🦌 Deer Master (ride + 3 kills) = +500',
                '🐴🐄 Ride horse + cow = +1000',
                '✋ Catch 3+ birds flying = +100',
                '🏆 Perfect round = +200'
            ]
        }
    ]
};

// ==========================================
// MENU CONTENT
// ==========================================

const MenuContent = {
    mainMenu: {
        title: 'BIRDTURDS',
        subtitle: 'The Ultimate Bird Hunting Experience',
        version: 'v40.2',
        buttons: [
            { id: 'play', text: 'PLAY NOW', primary: true },
            { id: 'howto', text: 'HOW TO PLAY' },
            { id: 'shop', text: 'SHOP' },
            { id: 'leaderboard', text: 'LEADERBOARD' },
            { id: 'settings', text: 'SETTINGS' }
        ]
    },
    
    pauseMenu: {
        title: 'PAUSED',
        buttons: [
            { id: 'resume', text: 'RESUME' },
            { id: 'restart', text: 'RESTART' },
            { id: 'howto', text: 'HOW TO PLAY' },
            { id: 'settings', text: 'SETTINGS' },
            { id: 'quit', text: 'QUIT TO MENU' }
        ]
    },
    
    settingsMenu: {
        title: 'SETTINGS',
        sections: [
            {
                title: 'AUDIO',
                items: [
                    { id: 'musicVolume', label: 'Music Volume', type: 'slider', min: 0, max: 100 },
                    { id: 'sfxVolume', label: 'Sound Effects', type: 'slider', min: 0, max: 100 },
                    { id: 'voiceVolume', label: 'Voice Volume', type: 'slider', min: 0, max: 100 }
                ]
            },
            {
                title: 'DISPLAY',
                items: [
                    { id: 'fullscreen', label: 'Fullscreen', type: 'toggle' },
                    { id: 'particles', label: 'Particle Effects', type: 'toggle' },
                    { id: 'screenShake', label: 'Screen Shake', type: 'toggle' }
                ]
            }
        ]
    },
    
    gameOverScreen: {
        title: 'GAME OVER',
        stats: [
            { id: 'score', label: 'Final Score' },
            { id: 'birdsShot', label: 'Birds Shot' },
            { id: 'knifeKills', label: 'Knife Kills' },
            { id: 'handCatches', label: 'Hand Catches' },
            { id: 'poopBlasted', label: 'Poop Blasted' },
            { id: 'animalsRidden', label: 'Animals Ridden' },
            { id: 'peopleBounced', label: 'People Bounced' },
            { id: 'flightTime', label: 'Flight Time' },
            { id: 'accuracy', label: 'Accuracy' }
        ],
        buttons: [
            { id: 'playAgain', text: 'PLAY AGAIN', primary: true },
            { id: 'shop', text: 'SHOP' },
            { id: 'menu', text: 'MAIN MENU' }
        ]
    }
};

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { GameRules, HowToPlay, MenuContent };
}

console.log('Game Rules v40.2 loaded!');
