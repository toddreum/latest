/**
 * BirdTurds v41 - Comprehensive Game Fixes
 * Fixes: ground level, scene backgrounds, mobile layout, sprite glow,
 *        score display, character scaling, tractor positioning, bird animation
 */

(function() {
    'use strict';
    
    console.log('🔧 Loading game-fixes-v41.js...');
    
    // ============================================================
    // FIX 1: GROUND LEVEL - Stop characters sinking into snow/ground
    // ============================================================
    window.GROUND_LEVEL_FIX = {
        // Adjust these values to raise characters up
        hunterYOffset: -20,      // Raise hunter up 20px
        npcYOffset: -15,         // Raise NPCs up 15px
        animalYOffset: -10,      // Raise animals up 10px
        tractorYOffset: -25,     // Raise tractors up 25px (they were floating)
        farmerScale: 0.28,       // Make farmer bigger (was too small)
        
        apply: function(sprite, type) {
            if (!sprite) return;
            
            switch(type) {
                case 'hunter':
                    sprite.y += this.hunterYOffset;
                    break;
                case 'npc':
                    sprite.y += this.npcYOffset;
                    break;
                case 'animal':
                    sprite.y += this.animalYOffset;
                    break;
                case 'tractor':
                case 'vehicle':
                    sprite.y += this.tractorYOffset;
                    break;
            }
        }
    };
    
    // ============================================================
    // FIX 2: SCENE BACKGROUNDS - No snow in Scene 2
    // ============================================================
    window.SCENE_BACKGROUNDS = {
        1: { hasSnow: true, groundColor: 0xFFFFFF },   // Winter scene
        2: { hasSnow: false, groundColor: 0x7CBA3D },  // Spring/grass
        3: { hasSnow: false, groundColor: 0x8B7355 },  // Autumn/dirt
        4: { hasSnow: false, groundColor: 0x7CBA3D },  // Summer/grass
        5: { hasSnow: false, groundColor: 0x7CBA3D },  // Farm
        6: { hasSnow: true, groundColor: 0xFFFFFF },   // Winter again
        7: { hasSnow: false, groundColor: 0x808080 },  // City
        8: { hasSnow: false, groundColor: 0x7CBA3D },  // Park
        9: { hasSnow: false, groundColor: 0x7CBA3D },  // Meadow
        10: { hasSnow: false, groundColor: 0x808080 }, // Airport
        11: { hasSnow: false, groundColor: 0x7CBA3D }, // Swamp
        12: { hasSnow: false, groundColor: 0x808080 }, // Washington
        13: { hasSnow: false, groundColor: 0x7CBA3D }, // White House
    };
    
    // ============================================================
    // FIX 3: REDUCE WHITE GLOW (was causing speckling)
    // ============================================================
    window.SPRITE_GLOW_FIX = {
        // Reduce glow intensity to prevent white speckling
        hunter: { color: 0xFFFFFF, strength: 2, quality: 0.08, distance: 16 },
        bird: { color: 0xFFFFFF, strength: 1, quality: 0.05, distance: 8 },
        animal: { color: 0xFFFFFF, strength: 1.5, quality: 0.06, distance: 10 },
        npc: { color: 0xFFFFFF, strength: 1.5, quality: 0.06, distance: 10 },
        vehicle: { color: 0xFFFFFF, strength: 1.5, quality: 0.06, distance: 12 },
        
        applyGlow: function(sprite, type) {
            if (!sprite || !sprite.preFX) return;
            
            const config = this[type] || this.animal;
            try {
                // Clear any existing glow first
                sprite.preFX.clear();
                // Apply reduced glow
                sprite.preFX.addGlow(config.color, config.strength, 0, false, config.quality, config.distance);
            } catch(e) {
                console.warn('Glow apply failed:', e);
            }
        }
    };
    
    // ============================================================
    // FIX 4: MOBILE LAYOUT - Comments below game, no black space
    // ============================================================
    window.MOBILE_LAYOUT_FIX = {
        init: function() {
            if (typeof window === 'undefined') return;
            
            // Move comic bubbles/comments below game on mobile
            const style = document.createElement('style');
            style.textContent = `
                /* Mobile: Move comments below game */
                @media (max-width: 768px) {
                    #comic-bubble-container,
                    .comic-bubble,
                    .speech-bubble,
                    .game-comment {
                        position: fixed !important;
                        bottom: 10px !important;
                        top: auto !important;
                        left: 50% !important;
                        transform: translateX(-50%) !important;
                        max-width: 90vw !important;
                        z-index: 1000 !important;
                    }
                    
                    /* Remove black dead space below game */
                    #game-container {
                        min-height: 100vh !important;
                        min-height: 100dvh !important;
                        background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%) !important;
                    }
                    
                    body {
                        background: #1a1a2e !important;
                        overflow: hidden !important;
                    }
                    
                    /* Make canvas fill available space */
                    #game-container canvas {
                        width: 100% !important;
                        height: auto !important;
                        max-height: 100vh !important;
                        max-height: 100dvh !important;
                    }
                }
                
                /* All devices: Comments at bottom */
                .comic-bubble-bottom {
                    position: fixed !important;
                    bottom: 60px !important;
                    left: 50% !important;
                    transform: translateX(-50%) !important;
                    top: auto !important;
                }
            `;
            document.head.appendChild(style);
            
            // Also fix viewport height on mobile
            this.fixViewportHeight();
            window.addEventListener('resize', () => this.fixViewportHeight());
        },
        
        fixViewportHeight: function() {
            // Fix for mobile browser address bar
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
            
            // Fill black space with game background
            const gameContainer = document.getElementById('game-container');
            if (gameContainer) {
                gameContainer.style.minHeight = `${window.innerHeight}px`;
            }
        }
    };
    
    // ============================================================
    // FIX 5: SCORE/POINTS DISPLAY - Ensure visible
    // ============================================================
    window.SCORE_DISPLAY_FIX = {
        ensureVisible: function(scene) {
            if (!scene) return;
            
            // Check if score text exists
            if (!scene.scoreText) {
                // Create score display
                scene.scoreText = scene.add.text(20, 20, 'Score: 0', {
                    fontSize: '28px',
                    fontFamily: 'Arial Black, sans-serif',
                    color: '#FFD700',
                    stroke: '#000000',
                    strokeThickness: 4,
                    shadow: { blur: 4, color: '#000000', fill: true }
                }).setScrollFactor(0).setDepth(100);
            }
            
            // Ensure it's visible
            scene.scoreText.setVisible(true);
            scene.scoreText.setDepth(100);
        },
        
        update: function(scene, score) {
            if (scene && scene.scoreText) {
                scene.scoreText.setText('Score: ' + (score || 0));
            }
        }
    };
    
    // ============================================================
    // FIX 6: CHARACTER SCALING - Farmer bigger, consistent sizes
    // ============================================================
    window.CHARACTER_SCALE_FIX = {
        scales: {
            hunter: 0.24,
            farmer: 0.28,      // Was too small, now bigger
            child: 0.18,
            npc: 0.24,
            animal: 0.22,
            tractor: 0.20,     // Slightly bigger
            bird: 0.12,
            trump: 0.26,
            bodyguard: 0.25,
            sniper: 0.22,
            bot: 0.22
        },
        
        apply: function(sprite, type) {
            if (!sprite) return;
            const scale = this.scales[type] || 0.22;
            sprite.setScale(scale);
        }
    };
    
    // ============================================================
    // FIX 7: BIRD ANIMATION - Flapping wings
    // ============================================================
    window.BIRD_ANIMATION_FIX = {
        // Add bob/flap animation to birds
        animateBird: function(bird, scene) {
            if (!bird || !scene) return;
            
            // Simple bob animation for flying effect
            if (scene.tweens) {
                scene.tweens.add({
                    targets: bird,
                    y: bird.y - 8,
                    duration: 300 + Math.random() * 200,
                    yoyo: true,
                    repeat: -1,
                    ease: 'Sine.easeInOut'
                });
                
                // Slight rotation for wing flap effect
                scene.tweens.add({
                    targets: bird,
                    angle: { from: -3, to: 3 },
                    duration: 150 + Math.random() * 100,
                    yoyo: true,
                    repeat: -1,
                    ease: 'Sine.easeInOut'
                });
            }
        },
        
        // Animate planes and helicopters
        animateAircraft: function(aircraft, scene, type) {
            if (!aircraft || !scene) return;
            
            if (type === 'helicopter') {
                // Helicopter hover bob
                scene.tweens?.add({
                    targets: aircraft,
                    y: aircraft.y - 5,
                    duration: 400,
                    yoyo: true,
                    repeat: -1,
                    ease: 'Sine.easeInOut'
                });
            } else {
                // Plane slight wobble
                scene.tweens?.add({
                    targets: aircraft,
                    angle: { from: -2, to: 2 },
                    duration: 1000,
                    yoyo: true,
                    repeat: -1,
                    ease: 'Sine.easeInOut'
                });
            }
        }
    };
    
    // ============================================================
    // FIX 8: TRACTOR GROUNDING - Place on ground properly
    // ============================================================
    window.TRACTOR_POSITION_FIX = {
        // Calculate proper Y position for tractors
        getGroundY: function(scene) {
            if (!scene || !scene.scale) return 500;
            const groundY = scene.scale.height - 80; // 80px from bottom
            return groundY;
        },
        
        placeTractor: function(tractor, scene) {
            if (!tractor || !scene) return;
            
            const groundY = this.getGroundY(scene);
            tractor.y = groundY;
            tractor.setOrigin(0.5, 1); // Bottom center origin
        }
    };
    
    // ============================================================
    // MASTER INIT - Apply all fixes
    // ============================================================
    window.GameFixesV41 = {
        initialized: false,
        
        init: function() {
            if (this.initialized) return;
            this.initialized = true;
            
            console.log('🔧 Applying game fixes v41...');
            
            // Apply mobile layout fix immediately
            MOBILE_LAYOUT_FIX.init();
            
            // Patch sprite creation functions
            this.patchSpriteCreation();
            
            console.log('✅ Game fixes v41 applied!');
        },
        
        patchSpriteCreation: function() {
            // This will be called by game.js after sprites are created
            // to apply our fixes
        },
        
        // Call this after creating a sprite
        fixSprite: function(sprite, type, scene) {
            if (!sprite) return sprite;
            
            // Apply scaling
            CHARACTER_SCALE_FIX.apply(sprite, type);
            
            // Apply ground level fix
            GROUND_LEVEL_FIX.apply(sprite, type);
            
            // Apply reduced glow (no more speckling)
            SPRITE_GLOW_FIX.applyGlow(sprite, type);
            
            // Special handling
            if (type === 'tractor' || type === 'vehicle') {
                TRACTOR_POSITION_FIX.placeTractor(sprite, scene);
            }
            
            if (type === 'bird') {
                BIRD_ANIMATION_FIX.animateBird(sprite, scene);
            }
            
            return sprite;
        },
        
        // Call this in scene create
        initScene: function(scene) {
            SCORE_DISPLAY_FIX.ensureVisible(scene);
            
            // Check scene number and disable snow if needed
            const sceneNum = parseInt(scene.key?.replace(/\D/g, '')) || 1;
            const sceneConfig = SCENE_BACKGROUNDS[sceneNum];
            
            if (sceneConfig && !sceneConfig.hasSnow && scene.snowEmitter) {
                scene.snowEmitter.stop();
            }
        },
        
        // Call this in scene update
        updateScene: function(scene, score) {
            SCORE_DISPLAY_FIX.update(scene, score);
        }
    };
    
    // Auto-init when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => GameFixesV41.init());
    } else {
        GameFixesV41.init();
    }
    
    console.log('✅ game-fixes-v41.js loaded!');
    
})();
