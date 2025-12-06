// ============================================
// BIRDTURDS v41.0 - Animal Sprite Configuration
// PATHS FIXED - All sprites in /sprites/animals/
// ============================================

const AnimalSprites = {
    basePath: '/sprites/animals/',
    
    farm: {
        cat: {
            strip: '/sprites/animals/cat_strip.png',
            stripRight: '/sprites/animals/cat_strip_right.png',
            frames: 4, frameWidth: 63, frameHeight: 45,
            gameWidth: 50, gameHeight: 45,
            speed: 1.1, bouncePower: 1.7,
            sound: '/sounds/cat_meow.mp3'
        },
        dog: {
            strip: '/sprites/animals/dog_strip.png',
            stripRight: '/sprites/animals/dog_strip_right.png',
            frames: 4, frameWidth: 64, frameHeight: 45,
            gameWidth: 60, gameHeight: 45,
            speed: 1.4, bouncePower: 1.5,
            sound: '/sounds/dog_bark.mp3'
        },
        cow: {
            strip: '/sprites/animals/cow_strip.png',
            stripRight: '/sprites/animals/cow_strip_right.png',
            frames: 4, frameWidth: 79, frameHeight: 55,
            gameWidth: 80, gameHeight: 55,
            speed: 0.5, bouncePower: 1.8,
            rideable: true, ridePoints: 500,
            sound: '/sounds/cow_moo.mp3'
        },
        horse: {
            strip: '/sprites/animals/horse_strip.png',
            stripRight: '/sprites/animals/horse_strip_right.png',
            frames: 4, frameWidth: 91, frameHeight: 85,
            gameWidth: 90, gameHeight: 85,
            speed: 1.2, bouncePower: 2.2,
            rideable: true, ridePoints: 500,
            sound: '/sounds/horse_neigh.mp3'
        },
        pig: {
            strip: '/sprites/animals/pig_strip.png',
            stripRight: '/sprites/animals/pig_strip_right.png',
            frames: 4, frameWidth: 66, frameHeight: 50,
            gameWidth: 65, gameHeight: 50,
            speed: 0.7, bouncePower: 1.3,
            sound: '/sounds/pig_oink.mp3'
        },
        goat: {
            strip: '/sprites/animals/goat_strip.png',
            stripRight: '/sprites/animals/goat_strip_right.png',
            frames: 4, frameWidth: 57, frameHeight: 55,
            gameWidth: 55, gameHeight: 55,
            speed: 0.9, bouncePower: 1.6,
            sound: '/sounds/goat_bleat.mp3'
        },
        sheep: {
            strip: '/sprites/animals/sheep_strip.png',
            stripRight: '/sprites/animals/sheep_strip_right.png',
            frames: 4, frameWidth: 54, frameHeight: 50,
            gameWidth: 55, gameHeight: 50,
            speed: 0.6, bouncePower: 1.4,
            sound: '/sounds/sheep_baa.mp3'
        },
        rooster: {
            strip: '/sprites/animals/rooster_strip.png',
            stripRight: '/sprites/animals/rooster_strip_right.png',
            frames: 4, frameWidth: 65, frameHeight: 45,
            gameWidth: 40, gameHeight: 45,
            speed: 0.8, bouncePower: 1.2,
            sound: '/sounds/rooster_crow.mp3'
        },
        chicken: {
            strip: '/sprites/animals/chicken_strip.png',
            stripRight: '/sprites/animals/chicken_strip_right.png',
            frames: 4, frameWidth: 40, frameHeight: 27,
            gameWidth: 35, gameHeight: 27,
            speed: 0.9, bouncePower: 1.2,
            sound: '/sounds/chicken_cluck.mp3'
        }
    },
    
    wildlife: {
        deer: { drawn: true, frames: 4, gameWidth: 85, gameHeight: 80, speed: 1.2, bouncePower: 2.0, rideable: true, ridePoints: 1000, scenes: ['park', 'country'], sound: '/sounds/deer_call.mp3' },
        elk: { drawn: true, frames: 4, gameWidth: 100, gameHeight: 90, speed: 0.9, bouncePower: 2.3, scenes: ['country', 'farm'], sound: '/sounds/elk_bugle.mp3' },
        bear: { drawn: true, frames: 4, gameWidth: 80, gameHeight: 70, speed: 0.7, bouncePower: 1.6, scenes: ['country', 'park'], sound: '/sounds/bear_growl.mp3' },
        wolf: { drawn: true, frames: 4, gameWidth: 60, gameHeight: 45, speed: 1.5, bouncePower: 1.8, scenes: ['country', 'farm'], sound: '/sounds/wolf_howl.mp3' }
    },
    
    loaded: {},
    
    loadAll: function() {
        const promises = [];
        Object.entries(this.farm).forEach(([name, config]) => {
            if (config.drawn || config.placeholder) return;
            const imgLeft = new Image();
            imgLeft.src = config.strip;
            promises.push(new Promise(resolve => {
                imgLeft.onload = () => { this.loaded[name + '_left'] = imgLeft; resolve(); };
                imgLeft.onerror = () => resolve();
            }));
            const imgRight = new Image();
            imgRight.src = config.stripRight;
            promises.push(new Promise(resolve => {
                imgRight.onload = () => { this.loaded[name + '_right'] = imgRight; resolve(); };
                imgRight.onerror = () => resolve();
            }));
        });
        return Promise.all(promises);
    },
    
    getSprite: function(animalType, direction) {
        return this.loaded[animalType + (direction > 0 ? '_right' : '_left')] || null;
    },
    
    getConfig: function(animalType) {
        return this.farm[animalType] || this.wildlife[animalType] || null;
    }
};

if (typeof window !== 'undefined') {
    AnimalSprites.loadAll().then(() => console.log('Animals loaded:', Object.keys(AnimalSprites.loaded).length));
}
if (typeof module !== 'undefined' && module.exports) module.exports = { AnimalSprites };
