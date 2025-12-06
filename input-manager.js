// ============================================
// BIRDTURDS v40.5 - INPUT MANAGER
// Handles all keyboard and mouse input
// ============================================

const InputManager = {
    keys: {},
    keysJustPressed: {},
    mouse: {
        x: 0,
        y: 0,
        down: false,
        justClicked: false
    },
    
    // Key mappings
    bindings: {
        left: ['ArrowLeft', 'KeyA'],
        right: ['ArrowRight', 'KeyD'],
        up: ['ArrowUp', 'KeyW'],
        down: ['ArrowDown', 'KeyS'],
        jump: ['ArrowUp', 'KeyW', 'Space'],
        shoot: ['Space'],
        knife: ['KeyE'],
        umbrella: ['KeyQ'],
        angel: ['KeyA'],  // Summon angel!
        pause: ['Escape', 'KeyP']
    },
    
    init: function() {
        this.keys = {};
        this.keysJustPressed = {};
        
        // Keyboard events
        document.addEventListener('keydown', (e) => this.onKeyDown(e));
        document.addEventListener('keyup', (e) => this.onKeyUp(e));
        
        // Mouse events
        const canvas = document.getElementById('gameCanvas');
        if (canvas) {
            canvas.addEventListener('mousedown', (e) => this.onMouseDown(e));
            canvas.addEventListener('mouseup', (e) => this.onMouseUp(e));
            canvas.addEventListener('mousemove', (e) => this.onMouseMove(e));
        }
        
        console.log('InputManager initialized');
    },
    
    onKeyDown: function(e) {
        // Prevent default for game keys
        if (this.isGameKey(e.code)) {
            e.preventDefault();
        }
        
        // Track just pressed (for single-press actions)
        if (!this.keys[e.code]) {
            this.keysJustPressed[e.code] = true;
        }
        
        this.keys[e.code] = true;
    },
    
    onKeyUp: function(e) {
        this.keys[e.code] = false;
    },
    
    onMouseDown: function(e) {
        this.mouse.down = true;
        this.mouse.justClicked = true;
        this.updateMousePosition(e);
    },
    
    onMouseUp: function(e) {
        this.mouse.down = false;
    },
    
    onMouseMove: function(e) {
        this.updateMousePosition(e);
    },
    
    updateMousePosition: function(e) {
        const canvas = document.getElementById('gameCanvas');
        if (canvas) {
            const rect = canvas.getBoundingClientRect();
            const scaleX = canvas.width / rect.width;
            const scaleY = canvas.height / rect.height;
            this.mouse.x = (e.clientX - rect.left) * scaleX;
            this.mouse.y = (e.clientY - rect.top) * scaleY;
        }
    },
    
    isGameKey: function(code) {
        for (const action in this.bindings) {
            if (this.bindings[action].includes(code)) {
                return true;
            }
        }
        return false;
    },
    
    // Check if action is currently pressed
    isPressed: function(action) {
        const keys = this.bindings[action];
        if (!keys) return false;
        
        return keys.some(key => this.keys[key]);
    },
    
    // Check if action was just pressed this frame
    justPressed: function(action) {
        const keys = this.bindings[action];
        if (!keys) return false;
        
        return keys.some(key => this.keysJustPressed[key]);
    },
    
    // Clear just-pressed states (call at end of frame)
    clearJustPressed: function() {
        this.keysJustPressed = {};
        this.mouse.justClicked = false;
    },
    
    // Process input for player
    processPlayerInput: function(player) {
        // Movement
        if (this.isPressed('left')) {
            player.velocityX = -player.speed;
            player.direction = -1;
        } else if (this.isPressed('right')) {
            player.velocityX = player.speed;
            player.direction = 1;
        } else {
            player.velocityX = 0;
        }
        
        // Jump
        if (this.justPressed('jump') && player.isGrounded) {
            player.velocityY = player.jumpForce;
            player.isGrounded = false;
        }
        
        // Shoot
        if (this.justPressed('shoot') || this.mouse.justClicked) {
            if (typeof PlayerSystem !== 'undefined') {
                PlayerSystem.shoot();
            }
        }
        
        // Knife
        if (this.justPressed('knife') && player.hasKnife) {
            if (typeof PlayerSystem !== 'undefined') {
                PlayerSystem.useKnife();
            }
        }
        
        // Umbrella
        if (this.justPressed('umbrella') && player.hasUmbrella) {
            if (typeof PlayerSystem !== 'undefined') {
                PlayerSystem.toggleUmbrella();
            }
        }
        
        // Angel summon - special handling
        if (this.justPressed('angel')) {
            if (typeof AngelSystem !== 'undefined') {
                AngelSystem.summon();
            }
        }
        
        // Duck / Exit vehicle
        if (this.justPressed('down')) {
            if (player.isRiding) {
                // Exit current ride
                if (player.isRiding === 'tractor_bucket') {
                    TractorSystem.exitBucket(player);
                } else {
                    player.isRiding = null;
                }
            }
        }
        
        // Pause
        if (this.justPressed('pause')) {
            if (BirdturdsGame.state === 'playing') {
                BirdturdsGame.pauseGame();
            } else if (BirdturdsGame.state === 'paused') {
                BirdturdsGame.resumeGame();
            }
        }
    }
};

// Export
if (typeof module !== 'undefined') {
    module.exports = InputManager;
}
