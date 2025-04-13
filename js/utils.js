// Utility functions for the game engine

// Timestamp for game loop
let timestamp = 0;

// Constants
const KEYS = {
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    SPACE: 32
};

// Key state tracking
const keyState = {
    left: false,
    right: false,
    up: false,
    down: false,
    space: false
};

// Utility functions
const utils = {
    // Time management
    timestamp: () => timestamp,
    
    // Linear interpolation
    lerp: (a, b, t) => a + (b - a) * t,
    
    // Clamp value between min and max
    clamp: (value, min, max) => Math.max(min, Math.min(max, value)),
    
    // Convert degrees to radians
    toRad: (deg) => (deg * Math.PI) / 180,
    
    // Random number between min and max
    random: (min, max) => min + Math.random() * (max - min),
    
    // Check if rectangles overlap
    overlap: (x1, w1, x2, w2) => {
        const half = (w1 + w2) / 2;
        const diff = x1 - x2;
        return Math.abs(diff) < half;
    },
    
    // Exponential fog factor
    exponentialFog: (distance, density) => 1 / Math.pow(Math.E, distance * distance * density),
    
    // Percentage formatter
    percentageComplete: (n) => Math.round(n * 100),
    
    // Format time as MM:SS.mmm
    formatTime: (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        const milliseconds = Math.floor((time % 1) * 1000);
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;
    }
};

// Event listeners for keyboard
document.addEventListener('keydown', (e) => {
    switch(e.keyCode) {
        case KEYS.LEFT:  keyState.left = true; break;
        case KEYS.RIGHT: keyState.right = true; break;
        case KEYS.UP:    keyState.up = true; break;
        case KEYS.DOWN:  keyState.down = true; break;
        case KEYS.SPACE: keyState.space = true; break;
    }
});

document.addEventListener('keyup', (e) => {
    switch(e.keyCode) {
        case KEYS.LEFT:  keyState.left = false; break;
        case KEYS.RIGHT: keyState.right = false; break;
        case KEYS.UP:    keyState.up = false; break;
        case KEYS.DOWN:  keyState.down = false; break;
        case KEYS.SPACE: keyState.space = false; break;
    }
});

// Error handling
window.onerror = function(msg, url, lineNo, columnNo, error) {
    const errorScreen = document.getElementById('errorScreen');
    const errorMessage = document.getElementById('errorMessage');
    if (errorScreen && errorMessage) {
        errorMessage.textContent = `${msg} (Line ${lineNo})`;
        errorScreen.style.display = 'flex';
    }
    return false;
};

// Export utilities
window.utils = utils;
window.keyState = keyState;
window.KEYS = KEYS;
