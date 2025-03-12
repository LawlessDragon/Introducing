// Audio System with Easter Egg State Management

const audioSystem = {
    isEasterEggActive: false,
    audioContext: null,
    audioElements: {},
    isMusicPlaying: true, // Default music state is on

    // Initialize audio system
    init() {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.preloadAudio();
    },

    // Set Easter egg state
    setEasterEggState(active) {
        this.isEasterEggActive = active;
        this.updateAudioState();
        
        // Update lore text in navigation
        const loreLink = document.querySelector('a[href="#lore"]');
        if (loreLink) {
            loreLink.textContent = active ? 'Vore' : 'Lore';
        }
    },

    updateAudioState() {

        this.stopAllNonUniversalAudio();
        this.stopAllBackgroundMusic();
        
        if (this.isEasterEggActive) {
            if (this.currentPage === 'lore') {
                this.playBackgroundMusic('playful');
            }
        } else {
            this.stopAllEasterEggAudio();
            setTimeout(() => {
                if (!this.isEasterEggActive && this.currentPage === 'lore') {
                    this.playBackgroundMusic('ambient');
                }
            }, 500);
        }
    },

    currentPage: null,
    currentMusic: null,
    currentVolume: 0.5,
    soundEffects: {},


    setCurrentPage(page) {
        const previousPage = this.currentPage;
        this.currentPage = page;
        if ((previousPage === 'lore' && page !== 'lore') || 
            (this.isEasterEggActive && page !== 'lore')) {
            this.stopAllBackgroundMusic();
            this.stopAllEasterEggAudio();
            this.isEasterEggActive = false; 
            const loreLink = document.querySelector('a[href="#lore"]');
            if (loreLink) {
                loreLink.textContent = 'Lore';
            }
        }
        if (page === 'lore') {
            this.updateAudioState();
        }
    },

    // Preload all audio files
    preloadAudio() {
        // Universal sounds (always available)
        const universalSounds = {
            'click': 'audio/click.mp3' // Universal click sound at root audio directory
        };

        // Regular background music tracks
        const backgroundTracks = {
            'main-theme': 'audio/background/main_theme.mp3',
            'opening-theme': 'audio/background/main_theme.mp3',
            'ice-theme': 'audio/background/ice_caverns.mp3',
            'ocean-theme': 'audio/background/azure_depths.mp3',
            'crystal-theme': 'audio/background/crystal_nexus.mp3',
            'mystery-theme': 'audio/background/crystal_nexus.mp3',
            'training-theme': 'audio/background/ice_caverns.mp3',
            'discovery-theme': 'audio/background/crystal_nexus.mp3',
            'revelation-theme': 'audio/background/crystal_nexus.mp3',
            'wisdom-theme': 'audio/background/azure_depths.mp3',
            'triumph-theme': 'audio/background/main_theme.mp3',
            'journey-theme': 'audio/background/main_theme.mp3',
            'deep-ocean-theme': 'audio/background/azure_depths.mp3',
            'exploration-theme': 'audio/background/azure_depths.mp3',
            'mystical-theme': 'audio/background/crystal_nexus.mp3',
            'ambient': 'audio/background/main_theme.mp3'
        };

        // Regular sound effects
        const regularEffects = {
            'transition': 'audio/effects/transition.mp3',
            'achievement': 'audio/effects/achievement.mp3',
            'glitch': 'audio/effects/glitch.mp3'
        };

        // Easter egg sounds
        const easterEggSounds = {
            'gulp': 'audio/vore_easter_egg/gulp.mp3',
            'stomach': 'audio/vore_easter_egg/stomach.mp3',
            'heartbeat': 'audio/vore_easter_egg/heartbeat.mp3',
            'playful': 'audio/vore_easter_egg/playful.mp3',
            'intense': 'audio/vore_easter_egg/intense.mp3',
            'stomach_struggle': 'audio/vore_easter_egg/stomach_struggle.mp3'
        };

        // Preload universal sounds
        for (const [id, path] of Object.entries(universalSounds)) {
            const audio = new Audio();
            audio.src = path;
            audio.preload = 'auto';
            audio.volume = this.currentVolume;
            this.audioElements[id] = audio;

            // Add error handling for missing files
            audio.onerror = () => {
                console.warn(`Failed to load audio file: ${path}`);
            };
        }

        // Preload background music
        for (const [id, path] of Object.entries(backgroundTracks)) {
            const audio = new Audio();
            audio.src = path;
            audio.preload = 'auto';
            audio.loop = true;
            audio.volume = this.currentVolume;
            this.audioElements[id] = audio;

            // Add error handling for missing files
            audio.onerror = () => {
                console.warn(`Failed to load audio file: ${path}. Using fallback.`);
                // The game will still function without audio
            };
        }

        // Preload regular sound effects
        for (const [id, path] of Object.entries(regularEffects)) {
            const audio = new Audio();
            audio.src = path;
            audio.preload = 'auto';
            audio.volume = this.currentVolume;
            this.soundEffects[id] = audio;

            // Add error handling for missing files
            audio.onerror = () => {
                console.warn(`Failed to load sound effect: ${path}`);
            };
        }

        // Preload easter egg sounds
        for (const [id, path] of Object.entries(easterEggSounds)) {
            const audio = new Audio();
            audio.src = path;
            audio.preload = 'auto';
            audio.volume = this.currentVolume;
            this.audioElements[id] = audio;

            // Add error handling for missing files
            audio.onerror = () => {
                console.warn(`Failed to load easter egg sound: ${path}`);
            };
        }
    },

    // Play sound with state checking
    playSound(soundId) {
        // Check if it's a sound effect
        if (this.soundEffects[soundId]) {
            // Only play regular effects when easter egg is not active
            if (!this.isEasterEggActive) {
                // Clone the audio to allow overlapping sounds
                const sound = this.soundEffects[soundId].cloneNode();
                sound.volume = this.currentVolume;
                sound.play()
                    .catch(error => console.warn(`Error playing sound effect: ${error.message}`));
            }
            return;
        }
        
        const audio = this.audioElements[soundId];
        if (!audio) return;

        // Universal sounds can always play
        if (soundId === 'click') {
            audio.currentTime = 0;
            audio.play()
                .catch(error => console.warn(`Error playing sound: ${error.message}`));
            return;
        }

        // Easter egg sounds only play when Easter egg is active
        const isEasterEggSound = [
            'gulp', 'stomach', 'heartbeat', 'playful', 
            'intense', 'stomach_struggle'
        ].includes(soundId);

        if ((isEasterEggSound && this.isEasterEggActive) || 
            (!isEasterEggSound && !this.isEasterEggActive)) {
            audio.currentTime = 0;
            audio.play()
                .catch(error => console.warn(`Error playing sound: ${error.message}`));
        }
    },

    // Play background music with state checking
    playBackgroundMusic(musicId) {
        const music = this.audioElements[musicId];
        if (!music) return;

        // Store current music ID
        this.currentMusic = musicId;
        
        // Stop current background music
        this.stopAllBackgroundMusic();

        // Easter egg music only plays when Easter egg is active
        const isEasterEggMusic = ['playful', 'intense'].includes(musicId);

        if ((isEasterEggMusic && this.isEasterEggActive) || 
            (!isEasterEggMusic && !this.isEasterEggActive)) {
            music.loop = true;
            music.volume = this.currentVolume;
            music.play();
        }
    },

    // Change background music with fade effect
    changeBackgroundMusic(musicId) {
        if (this.currentMusic === musicId) return; // Already playing this music
        
        const currentMusic = this.audioElements[this.currentMusic];
        if (currentMusic && !currentMusic.paused) {
            // Fade out current music
            const fadeOut = setInterval(() => {
                if (currentMusic.volume > 0.05) {
                    currentMusic.volume -= 0.05;
                } else {
                    clearInterval(fadeOut);
                    currentMusic.pause();
                    currentMusic.currentTime = 0;
                    currentMusic.volume = this.currentVolume; // Reset volume for future use
                    this.playBackgroundMusic(musicId);
                }
            }, 100);
        } else {
            this.playBackgroundMusic(musicId);
        }
    },
    
    // Stop all background music
    stopAllBackgroundMusic() {
        // Get all music IDs from audioElements
        for (const [trackId, track] of Object.entries(this.audioElements)) {
            // Skip non-music elements (click and easter egg sounds)
            if (trackId !== 'click' && 
                !['gulp', 'stomach', 'heartbeat', 'playful', 'intense', 'stomach_struggle'].includes(trackId)) {
                track.pause();
                track.currentTime = 0;
            }
        }
    },

    // Stop all audio
    stopAllAudio() {
        // Stop all audio elements
        for (const [soundId, audio] of Object.entries(this.audioElements)) {
            audio.pause();
            audio.currentTime = 0;
        }
        
        // Stop all sound effects
        for (const [effectId, audio] of Object.entries(this.soundEffects)) {
            audio.pause();
            audio.currentTime = 0;
        }
    },
    
    // Stop all non-universal audio
    stopAllNonUniversalAudio() {
        const backgroundMusicTracks = [
            'main-theme', 'opening-theme', 'ice-theme', 'ocean-theme',
            'crystal-theme', 'mystery-theme', 'training-theme', 'discovery-theme',
            'revelation-theme', 'wisdom-theme', 'triumph-theme', 'journey-theme',
            'deep-ocean-theme', 'exploration-theme', 'mystical-theme', 'ambient'
        ];
        
        for (const [soundId, audio] of Object.entries(this.audioElements)) {
            if (soundId !== 'click' && 
                !['gulp', 'stomach', 'heartbeat', 'playful', 'intense', 'stomach_struggle'].includes(soundId) &&
                !backgroundMusicTracks.includes(soundId)) {
                audio.pause();
                audio.currentTime = 0;
            }
        }
        
        // Also stop all sound effects
        for (const [effectId, audio] of Object.entries(this.soundEffects)) {
            audio.pause();
            audio.currentTime = 0;
        }
    },
    
    // Stop all Easter egg audio
    stopAllEasterEggAudio() {
        const easterEggSounds = ['gulp', 'stomach', 'heartbeat', 'playful', 'intense', 'stomach_struggle'];
        easterEggSounds.forEach(soundId => {
            const sound = this.audioElements[soundId];
            if (sound) {
                sound.pause();
                sound.currentTime = 0;
            }
        });
    }
};

// Add additional audio control functions

// Set volume for all audio elements
audioSystem.setVolume = function(volume) {
    this.currentVolume = volume;
    
    // Update volume for all audio elements
    for (const [id, audio] of Object.entries(this.audioElements)) {
        audio.volume = volume;
    }
    
    // Update volume for all sound effects
    for (const [id, effect] of Object.entries(this.soundEffects)) {
        effect.volume = volume;
    }
};

// Toggle music on/off
audioSystem.toggleMusic = function() {
    this.isMusicPlaying = !this.isMusicPlaying;
    
    if (this.isMusicPlaying && this.currentMusic && this.audioElements[this.currentMusic]) {
        // Resume current music
        this.audioElements[this.currentMusic].play()
            .catch(error => console.warn(`Error resuming music: ${error.message}`));
    } else if (!this.isMusicPlaying && this.currentMusic && this.audioElements[this.currentMusic]) {
        // Pause current music
        this.audioElements[this.currentMusic].pause();
    }
    
    // Update UI to show music state
    this.updateMusicToggleButton();
};

// Update music toggle button UI
audioSystem.updateMusicToggleButton = function() {
    const musicToggle = document.querySelector('.music-toggle');
    if (musicToggle) {
        musicToggle.innerHTML = this.isMusicPlaying ? '🔊 Music: ON' : '🔇 Music: OFF';
    }
};

// Setup universal click sound for all interactive elements
audioSystem.setupUniversalClickSound = function() {
    // Add click sound to all buttons and interactive elements
    document.addEventListener('click', (e) => {
        // Check if the clicked element is a button or interactive element
        if (e.target.tagName === 'BUTTON' || 
            e.target.classList.contains('choice-button') || 
            e.target.classList.contains('nav-link') || 
            e.target.classList.contains('enter-btn') ||
            e.target.closest('.interactive')) {
            // Play click sound
            this.playSound('click');
        }
    });
};

// Initialize the audio system when the document is loaded
document.addEventListener('DOMContentLoaded', () => {
    audioSystem.init();
    audioSystem.setupUniversalClickSound();
});

// Make audioSystem globally available
window.audioSystem = audioSystem;