// Audio System with Easter Egg State Management

const audioSystem = {
    isEasterEggActive: false,
    audioContext: null,
    audioElements: {},

    // Initialize audio system
    init() {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.preloadAudio();
    },

    // Set Easter egg state
    setEasterEggState(active) {
        this.isEasterEggActive = active;
        
        // Stop all non-universal audio when Easter egg is activated
        if (active) {
            this.stopAllNonUniversalAudio();
        } else {
            // When Easter egg is deactivated, stop all Easter egg sounds
            this.stopAllEasterEggAudio();
            
            // Optionally restart regular background music
            setTimeout(() => {
                if (!this.isEasterEggActive) { // Double-check state hasn't changed
                    this.playBackgroundMusic('ambient');
                }
            }, 500);
        }
    },

    // Preload all audio files
    preloadAudio() {
        const audioFiles = {
            // Universal sounds (always available)
            'click': 'audio/effects/click.mp3',
            
            // Regular page sounds
            'background': 'audio/background.mp3',
            'ambient': 'audio/ambient.mp3',
            
            // Easter egg sounds
            'gulp': 'audio/vore_easter_egg/gulp.mp3',
            'stomach': 'audio/vore_easter_egg/stomach.mp3',
            'heartbeat': 'audio/vore_easter_egg/heartbeat.mp3',
            'playful': 'audio/vore_easter_egg/playful.mp3',
            'intense': 'audio/vore_easter_egg/intense.mp3',
            'stomach_struggle': 'audio/vore_easter_egg/stomach_struggle.mp3'
        };

        // Preload each audio file
        for (const [key, url] of Object.entries(audioFiles)) {
            const audio = new Audio();
            audio.src = url;
            audio.preload = 'auto';
            this.audioElements[key] = audio;
        }
    },

    // Play sound with state checking
    playSound(soundId) {
        const audio = this.audioElements[soundId];
        if (!audio) return;

        // Universal sounds can always play
        if (soundId === 'click') {
            audio.currentTime = 0;
            audio.play();
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
            audio.play();
        }
    },

    // Play background music with state checking
    playBackgroundMusic(musicId) {
        const music = this.audioElements[musicId];
        if (!music) return;

        // Stop current background music
        this.stopAllBackgroundMusic();

        // Easter egg music only plays when Easter egg is active
        const isEasterEggMusic = ['playful', 'intense'].includes(musicId);

        if ((isEasterEggMusic && this.isEasterEggActive) || 
            (!isEasterEggMusic && !this.isEasterEggActive)) {
            music.loop = true;
            music.play();
        }
    },

    // Stop all background music
    stopAllBackgroundMusic() {
        const backgroundTracks = ['background', 'ambient', 'playful', 'intense'];
        backgroundTracks.forEach(trackId => {
            const track = this.audioElements[trackId];
            if (track) {
                track.pause();
                track.currentTime = 0;
            }
        });
    },

    // Stop all non-universal audio
    stopAllNonUniversalAudio() {
        for (const [soundId, audio] of Object.entries(this.audioElements)) {
            if (soundId !== 'click') {
                audio.pause();
                audio.currentTime = 0;
            }
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

// Export the audio system
export default audioSystem;