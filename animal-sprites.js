// ============================================
// BIRDTURDS v40.5 - Animal Sprite Configuration
// ============================================

const AnimalSprites = {
    // Farm animals (from uploaded sprites)
    farm: {
        cat: {
            strip: 'assets/animals/processed/cat_strip.png',
            stripRight: 'assets/animals/processed/cat_strip_right.png',
            frames: 4,
            frameWidth: 50,
            frameHeight: 45,
            gameWidth: 50,
            gameHeight: 45,
            speed: 1.1,
            bouncePower: 1.7
        },
        dog: {
            strip: 'assets/animals/processed/dog_strip.png',
            stripRight: 'assets/animals/processed/dog_strip_right.png',
            frames: 4,
            frameWidth: 60,
            frameHeight: 45,
            gameWidth: 60,
            gameHeight: 45,
            speed: 1.4,
            bouncePower: 1.5
        },
        cow: {
            strip: 'assets/animals/processed/cow_strip.png',
            stripRight: 'assets/animals/processed/cow_strip_right.png',
            frames: 4,
            frameWidth: 80,
            frameHeight: 55,
            gameWidth: 80,
            gameHeight: 55,
            speed: 0.5,
            bouncePower: 1.8,
            rideable: true,
            ridePoints: 500
        },
        horse: {
            strip: 'assets/animals/processed/horse_strip.png',
            stripRight: 'assets/animals/processed/horse_strip_right.png',
            frames: 4,
            frameWidth: 90,
            frameHeight: 85,
            gameWidth: 90,
            gameHeight: 85,
            speed: 1.2,
            bouncePower: 2.2,
            rideable: true,
            ridePoints: 500
        },
        pig: {
            strip: 'assets/animals/processed/pig_strip.png',
            stripRight: 'assets/animals/processed/pig_strip_right.png',
            frames: 4,
            frameWidth: 65,
            frameHeight: 50,
            gameWidth: 65,
            gameHeight: 50,
            speed: 0.7,
            bouncePower: 1.3
        },
        goat: {
            strip: 'assets/animals/processed/goat_strip.png',
            stripRight: 'assets/animals/processed/goat_strip_right.png',
            frames: 4,
            frameWidth: 55,
            frameHeight: 55,
            gameWidth: 55,
            gameHeight: 55,
            speed: 0.9,
            bouncePower: 1.6
        },
        sheep: {
            strip: 'assets/animals/processed/sheep_strip.png',
            stripRight: 'assets/animals/processed/sheep_strip_right.png',
            frames: 4,
            frameWidth: 55,
            frameHeight: 50,
            gameWidth: 55,
            gameHeight: 50,
            speed: 0.6,
            bouncePower: 1.4
        },
        rooster: {
            strip: 'assets/animals/processed/rooster_strip.png',
            stripRight: 'assets/animals/processed/rooster_strip_right.png',
            frames: 4,
            frameWidth: 40,
            frameHeight: 45,
            gameWidth: 40,
            gameHeight: 45,
            speed: 0.8,
            bouncePower: 1.2
        },
        chicken: {
            // Need sprite - using placeholder
            placeholder: true,
            frames: 4,
            frameWidth: 35,
            frameHeight: 30,
            gameWidth: 35,
            gameHeight: 30,
            speed: 0.9,
            bouncePower: 1.2,
            color: '#FFD700'
        }
    },
    
    // Wildlife animals (drawn programmatically)
    wildlife: {
        deer: {
            drawn: true,
            frames: 4,
            gameWidth: 85,
            gameHeight: 80,
            speed: 1.2,
            bouncePower: 2.0,
            rideable: true,
            ridePoints: 1000,
            scenes: ['park', 'country']
        },
        elk: {
            drawn: true,
            frames: 4,
            gameWidth: 100,
            gameHeight: 90,
            speed: 0.9,
            bouncePower: 2.3,
            scenes: ['country', 'farm']
        },
        bear: {
            drawn: true,
            frames: 4,
            gameWidth: 80,
            gameHeight: 70,
            speed: 0.7,
            bouncePower: 1.6,
            scenes: ['country', 'park']
        },
        wolf: {
            drawn: true,
            frames: 4,
            gameWidth: 60,
            gameHeight: 45,
            speed: 1.5,
            bouncePower: 1.8,
            scenes: ['country', 'farm']
        }
    },
    
    // Size reference for proportions (relative to hunter ~50x70)
    sizeGuide: {
        tiny: { example: 'chicken', maxWidth: 40 },
        small: { example: 'cat, rooster', maxWidth: 55 },
        medium: { example: 'dog, pig, goat, sheep, wolf', maxWidth: 70 },
        large: { example: 'cow, deer, bear', maxWidth: 90 },
        xlarge: { example: 'horse, elk', maxWidth: 100 }
    },
    
    // Loader
    loaded: {},
    
    loadAll: function() {
        const promises = [];
        
        Object.entries(this.farm).forEach(([name, config]) => {
            if (config.placeholder) return;
            
            // Load left-facing strip
            const imgLeft = new Image();
            imgLeft.src = config.strip;
            promises.push(new Promise(resolve => {
                imgLeft.onload = () => {
                    this.loaded[name + '_left'] = imgLeft;
                    resolve();
                };
                imgLeft.onerror = () => resolve();
            }));
            
            // Load right-facing strip
            const imgRight = new Image();
            imgRight.src = config.stripRight;
            promises.push(new Promise(resolve => {
                imgRight.onload = () => {
                    this.loaded[name + '_right'] = imgRight;
                    resolve();
                };
                imgRight.onerror = () => resolve();
            }));
        });
        
        return Promise.all(promises);
    },
    
    getSprite: function(animalType, direction) {
        const key = animalType + (direction > 0 ? '_right' : '_left');
        return this.loaded[key] || null;
    },
    
    getConfig: function(animalType) {
        return this.farm[animalType] || this.wildlife[animalType] || null;
    }
};

// Auto-load when script runs
if (typeof window !== 'undefined') {
    AnimalSprites.loadAll().then(() => {
        console.log('Animal sprites loaded:', Object.keys(AnimalSprites.loaded));
    });
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { AnimalSprites };
}
