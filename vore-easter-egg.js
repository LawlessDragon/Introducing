// Easter Egg Feature - Vore Roleplay Game
// Triggered when user types "vore" on the Lore Page

const voreEasterEgg = {
  isActive: false,
  keySequence: [],
  targetSequence: "vore",
  audioElements: {},
  bellySize: 1, // 1: small, 2: medium, 3: large
  currentScene: 'intro',
  playerChoices: [],
  customCursor: null,
  originalContent: null,
  originalCursor: null,
  commandListener: null,
  exitButton: null,
  audioContext: null,
  backgroundMusic: null,
  soundEffects: {},
  
  // Initialize the easter egg
  init() {
    // Only initialize on the lore page
    if (!document.getElementById('lore')) return;
    
    // Set up key listener
    this.setupKeyListener();
    
    // Preload audio files
    this.preloadAudio();
    
    // Create audio context (will be initialized on user interaction)
    this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    // Set up universal click sound effect
    this.setupUniversalClickSound();
  },
  
  // Set up universal click sound for all interactive elements
  setupUniversalClickSound() {
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
  },
  
  // Set up key listener to detect the trigger word
  setupKeyListener() {
    document.addEventListener('keydown', (e) => {
      // Only track alphabetic keys
      if (/^[a-zA-Z]$/.test(e.key)) {
        this.keySequence.push(e.key.toLowerCase());
        
        // Keep only the last 4 characters
        if (this.keySequence.length > 4) {
          this.keySequence.shift();
        }
        
        // Check if the sequence matches the target
        const currentSequence = this.keySequence.join('');
        if (currentSequence.includes(this.targetSequence)) {
          this.activate();
          this.keySequence = []; // Reset the sequence
        }
      }
    });
  },
  
  // Preload audio files from vore_easter_egg folder
  preloadAudio() {
    const audioFiles = {
      'gulp': 'audio/vore_easter_egg/gulp.mp3',
      'stomach': 'audio/vore_easter_egg/stomach.mp3',
      'heartbeat': 'audio/vore_easter_egg/heartbeat.mp3',
      'playful': 'audio/vore_easter_egg/playful.mp3',
      'intense': 'audio/vore_easter_egg/intense.mp3',
      'stomach_struggle': 'audio/vore_easter_egg/stomach_struggle.mp3',
      'click': 'audio/effects/click.mp3'
    };
    
    // Preload each audio file
    for (const [key, url] of Object.entries(audioFiles)) {
      const audio = new Audio();
      audio.src = url;
      audio.preload = 'auto';
      this.audioElements[key] = audio;
    }
  },
  
  // Activate the easter egg
  activate() {
    if (this.isActive) return;
    
    // Only activate on the lore page
    const lorePage = document.getElementById('lore');
    if (!lorePage || lorePage.style.display === 'none') return;
    
    this.isActive = true;
    
    // Save original content and cursor
    this.originalContent = document.querySelector('.lore-container').innerHTML;
    this.originalCursor = document.querySelector('.custom-cursor').style.cssText;
    
    // Stop ALL currently playing normal page music and audio
    const allPageAudio = document.querySelectorAll('audio');
    allPageAudio.forEach(audio => {
      // Only stop audio that isn't part of the vore easter egg
      if (!Object.values(this.audioElements).includes(audio)) {
        audio.pause();
        audio.currentTime = 0;
      }
    });
    
    // Apply glitch effect to the screen
    this.applyGlitchEffect();
    
    // Play intro sound
    this.playSound('intro');
    
    // Start the roleplay game after the glitch effect
    setTimeout(() => {
      this.startRoleplay();
    }, 2000);
  },
  
  // Apply glitch effect to the screen - enhanced version for transition only
  applyGlitchEffect() {
    const loreContainer = document.querySelector('.lore-container');
    
    // Create glitch overlay
    const glitchOverlay = document.createElement('div');
    glitchOverlay.className = 'glitch-overlay';
    document.body.appendChild(glitchOverlay);
    
    // Apply CRT distortion effect
    const crtEffect = document.createElement('div');
    crtEffect.className = 'crt-effect';
    document.body.appendChild(crtEffect);
    
    // Apply screen shake
    document.body.classList.add('screen-shake');
    
    // Play glitch static sound
    this.playSound('heartbeat');
    
    // Stronger glitch effect during transition
    document.body.classList.add('intense-glitch');
    
    // Remove effects after transition (1-2 seconds)
    setTimeout(() => {
      document.body.classList.remove('screen-shake');
      document.body.classList.remove('intense-glitch');
      glitchOverlay.style.opacity = '0';
      crtEffect.style.opacity = '0';
      
      // Remove elements after fade out
      setTimeout(() => {
        if (glitchOverlay.parentNode) {
          glitchOverlay.parentNode.removeChild(glitchOverlay);
        }
        if (crtEffect.parentNode) {
          crtEffect.parentNode.removeChild(crtEffect);
        }
      }, 500);
    }, 2000);
  },
  
  // Start the roleplay game
  startRoleplay() {
    // Change cursor style
    const cursor = document.querySelector('.custom-cursor');
    cursor.classList.add('vore-cursor');
    
    // Clear the lore container
    const loreContainer = document.querySelector('.lore-container');
    loreContainer.innerHTML = '';
    
    // Create roleplay container
    const roleplayContainer = document.createElement('div');
    roleplayContainer.className = 'roleplay-container';
    loreContainer.appendChild(roleplayContainer);
    
    // Add exit button
    this.exitButton = document.createElement('button');
    this.exitButton.className = 'exit-button';
    this.exitButton.textContent = 'Exit';
    this.exitButton.addEventListener('click', () => this.exitRoleplay());
    document.body.appendChild(this.exitButton);
    
    // Start background music
    this.playBackgroundMusic('playful');
    
    // Show intro scene
    this.showScene('intro');
  },
  
  // Show a scene in the roleplay
  showScene(sceneId) {
    this.currentScene = sceneId;
    const roleplayContainer = document.querySelector('.roleplay-container');
    roleplayContainer.innerHTML = '';
    
    // Get scene content
    const scene = this.getSceneContent(sceneId);
    
    // Create dialog box
    const dialogBox = document.createElement('div');
    dialogBox.className = 'dialog-box';
    
    // Add character name if provided
    if (scene.character) {
      const characterName = document.createElement('div');
      characterName.className = 'dialog-character';
      characterName.textContent = scene.character;
      dialogBox.appendChild(characterName);
    }
    
    // Add dialog text with typing effect
    const dialogText = document.createElement('div');
    dialogText.className = 'dialog-text';
    dialogBox.appendChild(dialogText);
    
    roleplayContainer.appendChild(dialogBox);
    
    // Apply typing effect
    this.typeText(dialogText, scene.text, () => {
      // After typing is complete, show choices
      if (scene.choices && scene.choices.length > 0) {
        const choicesContainer = document.createElement('div');
        choicesContainer.className = 'choices-container';
        
        scene.choices.forEach(choice => {
          const button = document.createElement('button');
          button.className = 'choice-button';
          button.textContent = choice.text;
          button.addEventListener('click', () => {
            // Play sound effect
            this.playSound('gulp');
            
            // Record player choice
            this.playerChoices.push(choice.id);
            
            // Execute any effects
            if (choice.effect) {
              choice.effect();
            }
            
            // Go to next scene
            this.showScene(choice.nextScene);
          });
          
          choicesContainer.appendChild(button);
        });
        
        roleplayContainer.appendChild(choicesContainer);
      }
      
      // Apply any scene-specific effects
      if (scene.effect) {
        scene.effect();
      }
    });
  },
  
  // Type text with animation effect
  typeText(element, text, callback, speed = 30) {
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        element.innerHTML += text.charAt(i);
        i++;
      } else {
        clearInterval(interval);
        if (callback) callback();
      }
    }, speed);
  },
  
  // Show belly environment based on size
  showBellyEnvironment(size) {
    this.bellySize = size;
    const roleplayContainer = document.querySelector('.roleplay-container');
    
    // Create belly container
    const bellyContainer = document.createElement('div');
    bellyContainer.className = 'belly-container';
    bellyContainer.style.height = `${300 + (size * 100)}px`;
    
    // Add belly walls
    const bellyWalls = document.createElement('div');
    bellyWalls.className = 'belly-walls';
    bellyContainer.appendChild(bellyWalls);
    
    // Add belly fluid
    const bellyFluid = document.createElement('div');
    bellyFluid.className = 'belly-fluid';
    bellyFluid.style.height = `${20 + (size * 10)}%`;
    bellyContainer.appendChild(bellyFluid);
    
    // Add heartbeat effect
    const heartbeat = document.createElement('div');
    heartbeat.className = 'heartbeat';
    bellyContainer.appendChild(heartbeat);
    
    // Insert belly container before the dialog box
    roleplayContainer.insertBefore(bellyContainer, roleplayContainer.firstChild);
    
    // Adjust sounds based on belly size
    const stomachVolume = 0.3 + (size * 0.2);
    this.audioElements['stomach'].volume = stomachVolume;
    
    if (size === 3) {
      // For large belly, add bubbling sounds
      this.audioElements['fluid'].volume = 0.5;
      this.audioElements['fluid'].loop = true;
      this.audioElements['fluid'].play();
    }
  },
  
  // Get content for a specific scene
  getSceneContent(sceneId) {
    // Store previous scene for back navigation
    if (sceneId !== this.currentScene) {
      this.previousScene = this.currentScene;
      this.currentScene = sceneId;
    }

    const scenes = {
      // Scene 1: The Encounter (Teasing Stage)
      'intro': {
        character: 'Lawless',
        text: 'Oh? Kau benar-benar masih di sini?\nLucu sekali… seolah kau menginginkan ini terjadi. Atau mungkin kau hanya penasaran dengan apa yang bisa kulakukan padamu?',
        choices: [
          { id: 'panic', text: 'T-Tidak… aku hanya terjebak!', nextScene: 'capture' },
          { id: 'tease', text: 'Hahaha… memangnya apa yang bisa kau lakukan?', nextScene: 'capture_tease' },
          { id: 'submissive', text: 'Mengambil langkah mundur, tubuh gemetar.', nextScene: 'capture_submissive' },
          { id: 'curious', text: 'Aku... memang penasaran denganmu.', nextScene: 'curious_response' }
        ],
        effect: () => {
          document.body.style.background = 'linear-gradient(to bottom, var(--vore-bg-dark), var(--vore-bg-darker))';
          this.changeBackgroundMusic('playful');
          document.querySelectorAll('.choice-button').forEach(button => {
            button.addEventListener('click', () => this.playSound('click'));
          });
        }
      },
      
      'curious_response': {
        character: 'Lawless',
        text: 'Penasaran, hmm? Aku suka rasa ingin tahu yang berani. Kau tahu, tidak banyak yang berani mengakui ketertarikan mereka padaku. Kebanyakan terlalu takut... atau terlalu malu.',
        choices: [
          { id: 'ask_about', text: 'Apa yang biasanya terjadi pada mereka yang penasaran?', nextScene: 'curious_fate' },
          { id: 'admit_interest', text: 'Aku tertarik mengenalmu lebih jauh...', nextScene: 'lawless_backstory' },
          { id: 'back_away', text: 'Mungkin ini bukan ide yang baik...', nextScene: 'capture_tease' },
          { id: 'express_concern', text: 'Aku sedikit khawatir...', nextScene: 'reassurance_dialogue' }
        ],
        effect: () => {
          this.changeBackgroundMusic('playful');
        }
      },
      
      'curious_fate': {
        character: 'Lawless',
        text: 'Mereka yang penasaran? Oh, mereka biasanya berakhir... di dalam diriku. Tapi pengalaman setiap orang berbeda. Ada yang melawan, ada yang menyerah, dan ada yang... menikmatinya.',
        choices: [
          { id: 'ask_experience', text: 'Bagaimana rasanya bagimu?', nextScene: 'lawless_experience' },
          { id: 'volunteer', text: 'Bagaimana jika... aku menawarkan diri?', nextScene: 'volunteer_response' },
          { id: 'reconsider', text: 'Kurasa aku perlu memikirkan ini lagi...', nextScene: 'capture' }
        ],
        effect: () => {
          this.playSound('heartbeat');
        }
      },
      
      // Scene 2: The Capture (Domination Begins)
      'capture': {
        character: 'Lawless',
        text: 'Ahaha… sudah terlambat untuk kabur sekarang.\nAku ingin melihat ekspresi terbaikmu saat aku menelanmu bulat-bulat. Kau bisa merasakan bagaimana lidahku akan menjilati seluruh tubuhmu sebelum mendorongmu ke dalam kerongkonganku yang hangat.',
        choices: [
          { id: 'negotiate', text: 'T-Tunggu! Kita bisa bicara dulu!', nextScene: 'swallow_negotiate' },
          { id: 'challenge', text: 'Menggertak! Coba saja kalau bisa!', nextScene: 'swallow_challenge' },
          { id: 'resign', text: 'Diam terpaku, napas memburu…', nextScene: 'swallow_resign' },
          { id: 'beg', text: 'K-kumohon... jangan lakukan ini!', nextScene: 'beg_response' }
        ],
        effect: () => {
          this.changeBackgroundMusic('intense');
          this.playSound('heartbeat');
        }
      },
      
      'capture_tease': {
        character: 'Lawless',
        text: 'Apa yang bisa kulakukan? Hmm... Kau benar-benar ingin tahu, ya?\nAku suka mangsa yang punya... nyali. Mungkin aku akan menikmati menelanmu... perlahan. Merasakan setiap inci tubuhmu meluncur di kerongkonganku.',
        choices: [
          { id: 'negotiate', text: 'Aku hanya bercanda! Kita bisa bicara, kan?', nextScene: 'swallow_negotiate' },
          { id: 'challenge', text: 'Tentu saja! Tunjukkan padaku!', nextScene: 'swallow_challenge' },
          { id: 'flirt', text: 'Mungkin kita bisa bersenang-senang bersama...', nextScene: 'swallow_flirt' },
          { id: 'curious_tease', text: 'Aku penasaran... bagaimana rasanya di dalammu?', nextScene: 'curious_inside_description' }
        ],
        effect: () => {
          this.changeBackgroundMusic('intense');
          this.playSound('heartbeat');
        }
      },
      
      'curious_inside_description': {
        character: 'Lawless',
        text: 'Mmm~ Pertanyaan yang menarik. Di dalamku? Hangat, basah, dan sangat... intim. Kau akan merasakan dinding-dinding perutku bergerak di sekitarmu, detak jantungku yang menggetarkan seluruh tubuhmu, dan sensasi yang tak pernah kau rasakan sebelumnya.',
        choices: [
          { id: 'want_experience', text: 'Itu... terdengar menarik. Aku ingin merasakannya.', nextScene: 'pre_swallow' },
          { id: 'second_thoughts', text: 'Tunggu, aku tidak yakin ini ide yang baik...', nextScene: 'hesitation_response' },
          { id: 'playful_response', text: 'Kau sangat pandai menggoda, ya?', nextScene: 'swallow_flirt' }
        ],
        effect: () => {
          this.playSound('stomach');
        }
      },
      
      'capture_submissive': {
        character: 'Lawless',
        text: 'Gemetar seperti itu... sangat menggemaskan.\nKau tahu apa yang akan terjadi, tapi tetap di sini. Kau memang menarik. Aku akan menikmati setiap inci tubuhmu di dalam perutku. Mungkin kau juga akan menikmatinya... banyak yang akhirnya menyukai sensasi hangat di dalamku.',
        choices: [
          { id: 'plead', text: 'K-kumohon... bersikaplah lembut...', nextScene: 'swallow_gentle' },
          { id: 'accept', text: 'Menutup mata, menerima takdir', nextScene: 'swallow_accept' },
          { id: 'curious', text: 'A-aku hanya... penasaran...', nextScene: 'swallow_curious' },
          { id: 'trembling_question', text: 'A-apa yang akan terjadi padaku di dalam sana?', nextScene: 'submissive_explanation' }
        ],
        effect: () => {
          this.playSound('heartbeat');
        }
      },
      
      'submissive_explanation': {
        character: 'Lawless',
        text: 'Di dalam sana? Kau akan merasakan kehangatan yang belum pernah kau rasakan sebelumnya. Dinding-dinding perutku akan memelukmu dengan lembut, detak jantungku akan menjadi musik pengantar tidurmu. Kau akan menjadi bagian dariku... untuk sementara atau selamanya, tergantung bagaimana kau menyikapinya.',
        choices: [
          { id: 'temporary_request', text: 'B-bisakah aku hanya... tinggal sementara?', nextScene: 'temporary_stay_offer' },
          { id: 'surrender_completely', text: 'Aku... aku siap menjadi bagian darimu', nextScene: 'swallow_accept' },
          { id: 'still_afraid', text: 'Aku takut... tapi juga penasaran', nextScene: 'swallow_gentle' }
        ],
        effect: () => {
          this.playSound('stomach');
        }
      },
      
      'temporary_stay_offer': {
        character: 'Lawless',
        text: 'Sementara? Hmm... itu bisa diatur. Aku bisa menjadikanmu tamuku untuk beberapa waktu, merasakan sensasi berada di dalam diriku tanpa menjadi bagian dariku selamanya. Bagaimana menurutmu?',
        choices: [
          { id: 'accept_temp', text: 'Ya, aku ingin mencobanya...', nextScene: 'swallow_gentle' },
          { id: 'negotiate_terms', text: 'Berapa lama... aku akan di dalam?', nextScene: 'negotiation' },
          { id: 'too_scared', text: 'Maaf, aku terlalu takut...', nextScene: 'respect_fear' }
        ],
        effect: () => {
          this.changeBackgroundMusic('playful');
        }
      },
      
      'respect_fear': {
        character: 'Lawless',
        text: 'Ketakutan adalah hal yang wajar. Tapi kadang, pengalaman terbaik datang dari melangkah melewati ketakutanmu. Mungkin lain kali kau akan lebih... berani.',
        choices: [
          { id: 'reconsider', text: 'Tunggu... mungkin aku bisa mencoba', nextScene: 'swallow_gentle' },
          { id: 'firm_no', text: 'Tidak, aku tetap tidak bisa', nextScene: 'polite_exit' }
        ],
        effect: () => {
          this.playSound('heartbeat');
        }
      },
      
      // Scene 3: The Swallow (Vore Sequence)
      'swallow_negotiate': {
        character: 'Lawless',
        text: 'Bicara? Ahaha... Kau terlihat sangat lezat.\nSelamat datang dalam perjalananku, sayang~ Rasakan tenggorokanku yang hangat saat kau meluncur ke bawah... Kau akan menjadi bagian dari pengalamanku yang tak terlupakan.',
        choices: [
          { id: 'final_plea', text: 'Tunggu—!', nextScene: 'stomach_struggle' },
          { id: 'last_words', text: 'Aku punya satu permintaan terakhir!', nextScene: 'last_request' },
          { id: 'accept_fate_negotiate', text: 'Baiklah... aku menyerah', nextScene: 'negotiated_surrender' }
        ],
        effect: () => {
          document.body.classList.add('zoom-in');
          this.playSound('gulp');
          setTimeout(() => {
            document.body.classList.add('distortion');
            setTimeout(() => {
              document.body.classList.remove('distortion');
              document.body.classList.remove('zoom-in');
            }, 2000);
          }, 1000);
        }
      },
      
      'last_request': {
        character: 'Lawless',
        text: 'Permintaan terakhir? Hmm, menarik. Apa yang diinginkan oleh seseorang yang akan menjadi bagian dariku?',
        choices: [
          { id: 'ask_gentle', text: 'Tolong... bersikaplah lembut', nextScene: 'swallow_gentle' },
          { id: 'ask_temporary', text: 'Bisakah ini hanya... sementara?', nextScene: 'temporary_stay_offer' },
          { id: 'ask_remember', text: 'Tolong ingat aku sebagai yang spesial', nextScene: 'special_memory' }
        ],
        effect: () => {
          this.playSound('heartbeat');
        }
      },
      
      'special_memory': {
        character: 'Lawless',
        text: 'Spesial? Oh, kau pasti akan menjadi kenangan yang spesial. Tidak banyak yang memiliki keberanian untuk meminta hal seperti itu. Aku akan mengingatmu... bahkan saat kau menjadi bagian dariku.',
        choices: [
          { id: 'grateful', text: 'Terima kasih... aku siap sekarang', nextScene: 'swallow_accept' },
          { id: 'last_moment', text: 'Menutup mata, menikmati momen terakhir', nextScene: 'stomach_gentle' }
        ],
        effect: () => {
          this.changeBackgroundMusic('playful');
        }
      },
      
      'negotiated_surrender': {
        character: 'Lawless',
        text: 'Menyerah dengan begitu anggun... Aku menghargai itu. Kau akan menjadi pengalaman yang menyenangkan. Bersiaplah untuk sensasi yang belum pernah kau rasakan sebelumnya.',
        choices: [
          { id: 'close_eyes', text: 'Menutup mata, menerima takdir', nextScene: 'stomach_acceptance' },
          { id: 'watch_process', text: 'Ingin melihat proses penelanan', nextScene: 'swallow_view' }
        ],
        effect: () => {
          this.playSound('gulp');
        }
      },
      
      'swallow_view': {
        text: 'Kau melihat mulut Lawless terbuka lebar, memperlihatkan kerongkongan yang dalam dan basah. Lidahnya menjulur, menyentuh tubuhmu dengan lembut sebelum menarikmu ke dalam. Sensasi hangat dan basah menyelimutimu saat kau meluncur ke dalam kerongkongannya.',
        choices: [
          { id: 'observe_descent', text: 'Mengamati perjalananmu ke bawah', nextScene: 'throat_journey' }
        ],
        effect: () => {
          this.playSound('gulp');
          document.body.style.transition = 'filter 2s ease';
          document.body.style.filter = 'brightness(0.7) blur(3px)';
          setTimeout(() => {
            document.body.style.filter = '';
          }, 2000);
        }
      },
      
      'throat_journey': {
        text: 'Kau merasakan dinding-dinding kerongkongan Lawless bergerak dan berkontraksi di sekitarmu, mendorongmu semakin dalam. Suara detak jantungnya semakin keras terdengar saat kau mendekati perutnya.',
        choices: [
          { id: 'reach_stomach', text: 'Tiba di perut Lawless', nextScene: 'stomach_arrival' }
        ],
        effect: () => {
          this.playSound('stomach');
          this.playSound('heartbeat');
        }
      },
      
      'stomach_arrival': {
        text: 'Dengan dorongan terakhir, kau terjatuh ke dalam ruang perut Lawless. Cairan hangat menyelimutimu, dan dinding-dinding perut yang lembut bergerak di sekitarmu. Detak jantungnya terdengar jelas, menciptakan irama yang anehnya menenangkan.',
        choices: [
          { id: 'look_around', text: 'Melihat sekeliling', nextScene: 'stomach_exploration' },
          { id: 'relax', text: 'Bersantai dan menikmati sensasi', nextScene: 'stomach_acceptance' },
          { id: 'call_out', text: 'Memanggil Lawless', nextScene: 'conversation_inside' },
          { id: 'analyze_surroundings', text: 'Menganalisa lingkungan sekitar', nextScene: 'environment_analysis' },
          { id: 'feel_movements', text: 'Merasakan gerakan perutnya', nextScene: 'stomach_movements' }
        ],
        effect: () => {
          this.showBellyEnvironment(2);
          this.playSound('stomach');
        }
      },
      
      'swallow_challenge': {
        character: 'Lawless',
        text: 'Menantangku? Berani sekali...\nAku akan menikmati setiap detik saat kau berjuang di dalam perutku. Rasakan bagaimana dinding-dinding tenggorokanku meremas tubuhmu...',
        choices: [
          { id: 'last_defiance', text: 'Kau tidak akan—!', nextScene: 'stomach_fight' },
          { id: 'sudden_fear', text: 'T-tunggu, aku tidak serius!', nextScene: 'too_late_challenge' }
        ],
        effect: () => {
          this.playSound('heartbeat');
          setTimeout(() => {
            this.playSound('gulp');
          }, 1000);
          document.body.classList.add('screen-shake');
          setTimeout(() => {
            document.body.classList.remove('screen-shake');
          }, 2000);
        }
      },
      
      'swallow_resign': {
        character: 'Lawless',
        text: 'Pasrah seperti itu... sangat manis.\nKau akan menjadi pengalaman yang menyenangkan. Rasakan bagaimana lidahku menjilati seluruh tubuhmu sebelum menelanmu bulat-bulat...',
        choices: [
          { id: 'accept_fate', text: '...', nextScene: 'stomach_passive' }
        ],
        effect: () => {
          const overlay = document.createElement('div');
          overlay.className = 'fade-overlay';
          document.body.appendChild(overlay);
          this.playSound('gulp');
          setTimeout(() => {
            if (overlay.parentNode) {
              overlay.parentNode.removeChild(overlay);
            }
          }, 3000);
        }
      },
      
      'swallow_flirt': {
        character: 'Lawless',
        text: 'Bersenang-senang? Aku suka caramu berpikir.\nMari kita lihat seberapa menyenangkan kau di dalam perutku. Aku akan menelanmu dengan penuh gairah, merasakan setiap lekuk tubuhmu...',
        choices: [
          { id: 'playful', text: 'Aku siap untuk petualangan~', nextScene: 'stomach_playful' },
          { id: 'tease_back', text: 'Kau yakin bisa menangani aku?', nextScene: 'swallow_tease_back' }
        ],
        effect: () => {
          this.playSound('gulp');
        }
      },
      
      'swallow_tease_back': {
        character: 'Lawless',
        text: 'Menanganimu? Oh sayang... Kau tidak tahu apa yang kau hadapi. Lidahku sudah tidak sabar menjilati seluruh tubuhmu sebelum mendorongmu ke dalam kerongkonganku yang basah dan hangat...',
        choices: [
          { id: 'surrender_teasing', text: 'Baiklah, aku menyerah pada keahlianmu', nextScene: 'teasing_surrender' },
          { id: 'continue_teasing', text: 'Tunjukkan padaku kemampuanmu', nextScene: 'intense_swallow_scene' }
        ],
        effect: () => {
          this.changeBackgroundMusic('playful');
        }
      },
      
      'teasing_surrender': {
        character: 'Lawless',
        text: 'Menyerah begitu cepat? Padahal aku baru mulai bersenang-senang. Rasakan bagaimana lidahku membelai tubuhmu... perlahan... menikmati setiap inci...',
        choices: [
          { id: 'shiver', text: 'Gemetar dalam antisipasi', nextScene: 'slow_teasing_swallow' }
        ],
        effect: () => {
          this.playSound('heartbeat');
        }
      },
      
      'slow_teasing_swallow': {
        character: 'Lawless',
        text: 'Mmm~ Kau gemetar begitu manis. Aku bisa merasakan detak jantungmu yang cepat. Jangan khawatir, aku akan menelanmu dengan sangat... sangat... perlahan...',
        choices: [
          { id: 'feel_tongue', text: 'Merasakan lidahnya membelai tubuhmu', nextScene: 'tongue_exploration' }
        ],
        effect: () => {
          document.body.style.transition = 'filter 2s ease';
          document.body.style.filter = 'blur(3px)';
          setTimeout(() => {
            document.body.style.filter = '';
          }, 2000);
        }
      },
      
      'tongue_exploration': {
        text: 'Lidah Lawless bergerak dengan lembut di sekitar tubuhmu, meninggalkan jejak hangat dan basah. Kau bisa merasakan setiap gerakan yang presisi, seolah ia menikmati setiap momen sebelum menelanmu.',
        choices: [
          { id: 'enjoy_sensation', text: 'Menikmati sensasi yang asing namun menyenangkan', nextScene: 'gradual_swallow' }
        ],
        effect: () => {
          this.playSound('stomach');
        }
      },
      
      'gradual_swallow': {
        character: 'Lawless',
        text: 'Kau terasa sangat lezat~ Sekarang... biarkan aku menelanmu perlahan. Rasakan bagaimana tenggorokanku meremas tubuhmu saat kau meluncur ke bawah...',
        choices: [
          { id: 'surrender_completely', text: 'Menyerahkan diri sepenuhnya pada sensasi', nextScene: 'stomach_playful' }
        ],
        effect: () => {
          this.playSound('gulp');
        }
      },
      
      'intense_swallow_scene': {
        character: 'Lawless',
        text: 'Kau menantangku? Baiklah... Bersiaplah untuk pengalaman yang tak akan pernah kau lupakan!',
        choices: [
          { id: 'watch_intently', text: 'Menatap dengan intensitas yang sama', nextScene: 'intense_swallow_begin' }
        ],
        effect: () => {
          this.changeBackgroundMusic('intense');
        }
      },
      
      'intense_swallow_begin': {
        text: 'Lawless membuka mulutnya lebar, memperlihatkan tenggorokannya yang dalam. Dengan gerakan cepat, ia menarikmu ke dalam mulutnya, lidahnya membelitmu dengan kuat.',
        choices: [
          { id: 'gasp', text: 'Terkesiap saat lidahnya membelitmu', nextScene: 'intense_throat_descent' },
          { id: 'embrace_intensity', text: 'Menerima intensitas momen ini', nextScene: 'intense_acceptance' },
          { id: 'last_defiance', text: 'Memberikan perlawanan terakhir', nextScene: 'final_resistance' }
        ],
        effect: () => {
          this.playSound('intense');
        }
      },
      
      'intense_throat_descent': {
        text: 'Kau merasakan dirimu didorong ke dalam tenggorokan Lawless dengan kekuatan yang mengejutkan. Dinding-dinding kerongkongannya bergerak dengan ritme yang cepat, mendorongmu semakin dalam.',
        choices: [
          { id: 'feel_pressure', text: 'Merasakan tekanan dari segala arah', nextScene: 'rapid_stomach_entry' }
        ],
        effect: () => {
          this.playSound('gulp');
          document.body.classList.add('screen-shake');
          setTimeout(() => {
            document.body.classList.remove('screen-shake');
          }, 1500);
        }
      },
      
      'rapid_stomach_entry': {
        text: 'Dengan dorongan terakhir yang kuat, kau terjatuh ke dalam perut Lawless. Sensasi hangat dan basah langsung menyelimutimu, dan kau bisa mendengar detak jantungnya yang cepat di sekitarmu.',
        choices: [
          { id: 'catch_breath', text: 'Mencoba mengatur napas', nextScene: 'stomach_playful' }
        ],
        effect: () => {
          this.showBellyEnvironment(3);
          this.playSound('stomach');
        }
      },
      
      'swallow_gentle': {
        character: 'Lawless',
        text: 'Lembut? Baiklah... khusus untukmu.\nTutup matamu dan rasakan... Lidahku akan membelai tubuhmu dengan lembut sebelum menelanmu perlahan-lahan...',
        choices: [
          { id: 'close_eyes', text: 'Menutup mata, merasakan kehangatan', nextScene: 'stomach_gentle' },
          { id: 'last_request', text: 'Boleh aku meminta sesuatu sebelumnya?', nextScene: 'last_request' },
          { id: 'express_gratitude', text: 'Terima kasih atas kelembutan ini...', nextScene: 'gentle_gratitude' }
        ],
        effect: () => {
          this.playSound('gulp');
          document.body.style.transition = 'filter 3s ease';
          document.body.style.filter = 'brightness(0.5) blur(5px)';
          setTimeout(() => {
            document.body.style.filter = '';
          }, 3000);
        }
      },
      
      'swallow_accept': {
        character: 'Lawless',
        text: 'Penerimaan yang indah... Kau akan menjadi bagian dariku sekarang. Rasakan bagaimana tubuhmu meluncur ke dalam tenggorokanku yang hangat dan basah...',
        choices: [
          { id: 'surrender', text: 'Menyerahkan diri sepenuhnya', nextScene: 'stomach_acceptance' }
        ],
        effect: () => {
          this.playSound('gulp');
        }
      },
      
      'swallow_curious': {
        character: 'Lawless',
        text: 'Penasaran? Aku akan memuaskan rasa ingin tahumu...\nDari dalam perutku. Rasakan bagaimana mulutku terbuka lebar, lidahku menjulur untuk menyambutmu...',
        choices: [
          { id: 'experience', text: 'Merasakan pengalaman baru', nextScene: 'stomach_exploration' }
        ],
        effect: () => {
          this.playSound('gulp');
        }
      },
      
      // Scene 4: The Aftermath (Stomach Scenes)
      'stomach_struggle': {
        text: 'A-Aku tidak bisa bergerak...! Dinding-dinding perut Lawless bergerak dan meremas tubuhku dari segala arah. Cairan asam lambung yang hangat mulai menyelimuti kakiku, dan suara detak jantungnya bergema di sekitarku!',
        choices: [
          { id: 'fight', text: 'Berjuang sekuat tenaga!', nextScene: 'struggle_ending' },
          { id: 'conserve', text: 'Menghemat energi, mencari jalan keluar', nextScene: 'escape_attempt' }
        ],
        effect: () => {
          this.playSound('stomach_struggle');
          this.showBellyEnvironment(2);
          document.body.classList.add('screen-shake');
          setTimeout(() => {
            document.body.classList.remove('screen-shake');
          }, 1500);
        }
      },
      
      'stomach_passive': {
        text: 'Memeluk tubuh sendiri, mencoba menenangkan diri.',
        choices: [
          { id: 'accept', text: 'Menerima situasi', nextScene: 'acceptance_ending' },
          { id: 'talk', text: 'Berbicara dengan Lawless', nextScene: 'conversation_inside' },
          { id: 'explore_gently', text: 'Perlahan menjelajahi sekitar', nextScene: 'gentle_exploration' },
          { id: 'seek_comfort', text: 'Mencari posisi yang nyaman', nextScene: 'comfort_search' }
        ],
        effect: () => {
          this.playSound('stomach');
          this.showBellyEnvironment(1);
        }
      },
      
      'stomach_fight': {
        text: 'Kau berjuang dengan keras di dalam perut Lawless, mendorong dan memukul dinding-dindingnya.',
        choices: [
          { id: 'continue_fight', text: 'Terus melawan!', nextScene: 'struggle_ending' },
          { id: 'tire_out', text: 'Kelelahan dan menyerah', nextScene: 'exhaustion_ending' },
          { id: 'negotiate_inside', text: 'Mencoba bernegosiasi dari dalam', nextScene: 'inside_negotiation' },
          { id: 'change_tactics', text: 'Mengubah strategi perlawanan', nextScene: 'new_strategy' }
        ],
        effect: () => {
          this.playSound('stomach_struggle');
          this.showBellyEnvironment(3);
          document.body.classList.add('screen-shake');
          setTimeout(() => {
            document.body.classList.remove('screen-shake');
          }, 2000);
        }
      },
      
      // Endings
      'struggle_ending': {
        character: 'Lawless',
        text: 'Hahaha... kau masih berusaha? Lucu.\nTapi, aku suka yang seperti ini. Kita bisa bermain lebih lama.',
        choices: [
          { id: 'continue', text: 'Lanjutkan perjuangan...', nextScene: 'epilogue_struggle' }
        ],
        effect: () => {
          this.playSound('stomach');
          const roleplayContainer = document.querySelector('.roleplay-container');
          roleplayContainer.classList.add('belly-movement');
        }
      },
      
      'acceptance_ending': {
        character: 'Lawless',
        text: 'Kau ternyata lebih baik dari yang kuduga.\nMungkin aku bisa mempertimbangkan menyimpanmu lebih lama.',
        choices: [
          { id: 'content', text: 'Tersenyum dalam kegelapan...', nextScene: 'epilogue_acceptance' }
        ],
        effect: () => {
          this.playSound('heartbeat');
          const roleplayContainer = document.querySelector('.roleplay-container');
          roleplayContainer.classList.add('belly-glow');
        }
      },
      
      'epilogue_struggle': {
        text: 'Dan begitulah, perjuanganmu berlanjut... Lawless menikmati setiap momen perlawananmu, sementara kau terus mencari jalan keluar dari situasi yang tak terduga ini...',
        choices: [
          { id: 'end', text: 'Selesai', nextScene: 'exit' }
        ],
        effect: () => {
          setTimeout(() => {
            this.playSound('heartbeat');
          }, 1000);
        }
      },
      
      'epilogue_acceptance': {
        text: 'Kau menemukan kedamaian yang aneh dalam situasi ini. Kehangatan perut Lawless dan detak jantungnya menjadi lagu pengantar tidurmu setiap hari. Sebuah hubungan simbiosis yang tak terduga...',
        choices: [
          { id: 'end', text: 'Selesai', nextScene: 'exit' }
        ],
        effect: () => {
          this.playSound('stomach');
          setTimeout(() => {
            this.playSound('heartbeat');
          }, 2000);
        }
      },
      
      'exhaustion_ending': {
        character: 'Lawless',
        text: 'Hahaha... sayang sekali kau menyerah. Tapi, aku suka yang seperti ini. Kita bisa bermain lebih lama.',
        choices: [
          { id: 'rest', text: 'Beristirahat dalam kegelapan...', nextScene: 'epilogue_exhaustion' }
        ],
        effect: () => {
          this.playSound('stomach');
        }
      },
      
      'epilogue_exhaustion': {
        text: 'Kelelahan menguasaimu, dan kau akhirnya menyerah pada kehangatan yang menyelimutimu. Mungkin ini bukan akhir yang buruk...',
        choices: [
          { id: 'end', text: 'Selesai', nextScene: 'exit' }
        ],
        effect: () => {
          document.body.style.transition = 'filter 3s ease';
          document.body.style.filter = 'brightness(0.3)';
        }
      },
      
      'exit': {
        text: 'Terima kasih telah bermain dalam Easter Egg ini. Klik tombol Exit untuk kembali ke lore normal.',
        choices: [],
        effect: () => {
          if (this.exitButton) {
            this.exitButton.style.animation = 'pulse 1s infinite';
          }
        }
      },
      
      'lawless_backstory': {
        character: 'Lawless',
        text: 'Aku sudah ada sejak lama... sangat lama. Aku adalah entitas yang hidup dari ketakutan dan keingintahuan manusia. Tapi kau... kau berbeda. Kau memanggilku dengan sengaja.',
        choices: [
          { id: 'volunteer', text: 'Aku ingin menjadi bagian dari pengalamanmu', nextScene: 'volunteer_response' },
          { id: 'regret', text: 'Mungkin ini kesalahan...', nextScene: 'regret_response' }
        ]
      },
      
      'lawless_experience': {
        character: 'Lawless',
        text: 'Rasanya? Hmm... Bagaimana menjelaskannya... Seperti kehangatan yang menyebar ke seluruh tubuhku. Merasakan seseorang di dalam, bergerak, ketakutan atau malah menikmatinya... itu sensasi yang tak terlukiskan.',
        choices: [
          { id: 'want_experience', text: 'Aku ingin merasakannya...', nextScene: 'pre_swallow' },
          { id: 'too_intimate', text: 'Itu terdengar terlalu... intim', nextScene: 'too_intimate_response' }
        ]
      },
      
      'too_intimate_response': {
        character: 'Lawless',
        text: 'Terlalu intim? Haha, mungkin memang begitu. Tapi bukankah itu yang kau cari saat memanggilku?',
        choices: [
          { id: 'admit_curious', text: 'Ya... aku memang penasaran', nextScene: 'swallow_curious' },
          { id: 'deny_interest', text: 'Tidak, aku hanya ingin berbicara', nextScene: 'just_talk_path' }
        ]
      },
      
      'just_talk_path': {
        character: 'Lawless',
        text: 'Hmm, menarik. Jarang ada yang hanya ingin berbicara denganku. Baiklah, apa yang ingin kau bicarakan?',
        choices: [
          { id: 'ask_others', text: 'Apakah ada orang lain yang pernah memanggilmu?', nextScene: 'others_called' },
          { id: 'ask_powers', text: 'Kekuatan apa lagi yang kau miliki?', nextScene: 'other_powers' },
          { id: 'leave_politely', text: 'Kurasa aku harus pergi sekarang', nextScene: 'polite_exit' }
        ]
      },
      
      'others_called': {
        character: 'Lawless',
        text: 'Oh, tentu saja. Banyak yang memanggilku, tapi sedikit yang benar-benar tahu apa yang mereka lakukan. Kebanyakan dari mereka... yah, mereka menjadi bagian dariku sekarang.',
        choices: [
          { id: 'reconsider', text: 'Mungkin aku juga ingin mencobanya...', nextScene: 'swallow_curious' },
          { id: 'leave_politely', text: 'Kurasa aku harus pergi sekarang', nextScene: 'polite_exit' }
        ]
      },
      
      'other_powers': {
        character: 'Lawless',
        text: 'Kekuatanku? Aku bisa melakukan banyak hal... mengubah bentuk, membaca pikiran, dan tentu saja... menelan siapapun yang kuinginkan. Tapi kekuatan terbesar adalah memberikan pengalaman yang tak terlupakan.',
        choices: [
          { id: 'show_power', text: 'Bisakah kau tunjukkan padaku?', nextScene: 'swallow_curious' },
          { id: 'thank_conversation', text: 'Terima kasih atas percakapannya', nextScene: 'polite_exit' }
        ]
      },
      
      'polite_exit': {
        character: 'Lawless',
        text: 'Pergi begitu saja? Sayang sekali. Padahal kita baru mulai bersenang-senang. Mungkin lain kali kau akan lebih... berani.',
        effect: () => {
          this.playSound('exit');
          setTimeout(() => this.exitRoleplay(), 3000);
        }
      },
      
      'pre_swallow': {
        character: 'Lawless',
        text: 'Kau yakin? Ini bukan keputusan yang bisa kau tarik kembali dengan mudah...',
        choices: [
          { id: 'fully_commit', text: 'Aku yakin. Aku siap.', nextScene: 'swallow_gentle' },
          { id: 'hesitate', text: 'Aku... tidak yakin...', nextScene: 'hesitation_response' }
        ],
        effect: () => {
          this.changeBackgroundMusic('intense');
        }
      },
      
      'hesitation_response': {
        character: 'Lawless',
        text: 'Keraguan adalah hal yang wajar. Tapi kadang, pengalaman terbaik datang dari melangkah melewati ketakutanmu...',
        choices: [
          { id: 'overcome_fear', text: 'Kau benar. Aku siap.', nextScene: 'swallow_gentle' },
          { id: 'still_unsure', text: 'Aku masih belum yakin', nextScene: 'second_hesitation' }
        ]
      },
      
      'second_hesitation': {
        character: 'Lawless',
        text: 'Hmm, mungkin kau memang belum siap. Tidak apa-apa, aku bisa menunggu...',
        choices: [
          { id: 'final_decision_yes', text: 'Tidak, aku siap sekarang!', nextScene: 'swallow_gentle' },
          { id: 'final_decision_no', text: 'Mungkin lain kali...', nextScene: 'polite_exit' }
        ]
      },
      
      'swallow_scene': {
        character: 'Lawless',
        text: 'Pilihan yang berani... Bersiaplah untuk pengalaman yang tak akan pernah kau lupakan.',
        choices: [
          { id: 'close_eyes', text: 'Menutup mata dan pasrah', nextScene: 'stomach_passive' }
        ],
        effect: () => {
          this.playSound ('gulp');
        }
      },
      
      'stomach_choice': {
        text: 'Kau merasakan sensasi hangat saat Lawless menelanmu. Kegelapan menyelimutimu, dan kau bisa merasakan dinding-dinding perutnya bergerak di sekitarmu.',
        choices: [
          { id: 'explore_option', text: 'Menjelajahi ruang perut', nextScene: 'stomach_exploration' },
          { id: 'relax_option', text: 'Bersantai dan menikmati sensasinya', nextScene: 'stomach_passive' },
          { id: 'communicate_option', text: 'Mencoba berkomunikasi dengan Lawless', nextScene: 'communicate_stomach' }
        ],
        effect: () => {
          const size = Math.floor(Math.random() * 3) + 1;
          this.showBellyEnvironment(size);
          this.playSound('stomach');
          this.playSound('heartbeat');
        }
      },
      
      'explore_stomach': {
        text: 'Kau mulai menjelajahi interior perut Lawless. Dinding-dindingnya berkilau dengan cahaya aneh, dan kau menemukan berbagai bentuk dan tekstur yang tidak biasa.',
        choices: [
          { id: 'find_artifact', text: 'Memeriksa benda berkilau di sudut', nextScene: 'artifact_discovery' },
          { id: 'find_passage', text: 'Menemukan semacam lorong', nextScene: 'passage_discovery' },
          { id: 'return_main', text: 'Kembali ke area utama', nextScene: 'stomach_passive' }
        ]
      },
      
      'artifact_discovery': {
        text: 'Kau menemukan sebuah kristal kecil yang bercahaya. Saat kau menyentuhnya, kristal itu memancarkan energi aneh yang membuatmu bisa melihat kenangan-kenangan Lawless.',
        choices: [
          { id: 'view_memories', text: 'Melihat kenangan Lawless', nextScene: 'lawless_memories' },
          { id: 'ignore_crystal', text: 'Meletakkan kristal dan melanjutkan eksplorasi', nextScene: 'stomach_passive' }
        ]
      },
      
      'lawless_memories': {
        character: 'Lawless',
        text: 'Apa yang kau lakukan?! Kau... kau bisa melihat kenanganku?',
        choices: [
          { id: 'apologize_memories', text: 'Maaf, aku tidak sengaja', nextScene: 'stomach_passive' },
          { id: 'embrace_memories', text: 'Ini luar biasa! Aku bisa melihat masa lalumu!', nextScene: 'stomach_acceptance' }
        ]
      },
      
      'memory_forgiveness': {
        character: 'Lawless',
        text: 'Hmm... tidak apa-apa. Mungkin memang sudah waktunya seseorang mengetahui kisahku.',
        choices: [
          { id: 'ask_about_past', text: 'Ceritakan lebih banyak tentang masa lalumu', nextScene: 'lawless_past_story' },
          { id: 'respect_privacy', text: 'Aku akan menghormati privasimu', nextScene: 'privacy_respected' }
        ]
      },
      
      'memory_connection': {
        character: 'Lawless',
        text: 'Kau... kau orang pertama yang bisa melakukan ini. Mungkin kita memiliki koneksi yang lebih dalam dari yang kukira.',
        choices: [
          { id: 'deepen_connection', text: 'Aku ingin mengenal dirimu lebih dalam', nextScene: 'deeper_connection' },
          { id: 'overwhelmed', text: 'Ini terlalu banyak untukku', nextScene: 'overwhelmed_response' }
        ]
      },
      
      'passage_discovery': {
        text: 'Lorong itu tampak mengarah lebih dalam ke tubuh Lawless. Cahaya redup terlihat di ujungnya.',
        choices: [
          { id: 'follow_passage', text: 'Mengikuti lorong', nextScene: 'stomach_exploration' },
          { id: 'stay_stomach', text: 'Tetap di perut', nextScene: 'stomach_passive' }
        ]
      },
      
      'deeper_areas': {
        text: 'Kau menemukan dirimu di ruangan yang lebih luas, dengan dinding yang berdetak seperti jantung. Di tengah ruangan ada sesuatu yang bersinar terang.',
        choices: [
          { id: 'approach_light', text: 'Mendekati cahaya', nextScene: 'stomach_acceptance' },
          { id: 'observe_distance', text: 'Mengamati dari kejauhan', nextScene: 'stomach_passive' }
        ]
      },
      
      'core_discovery': {
        text: 'Cahaya itu adalah inti dari kekuatan Lawless. Saat kau mendek ati, kau merasakan energi yang luar biasa. Inti itu berdenyut dengan ritme yang hipnotis.',
        choices: [
          { id: 'touch_core', text: 'Menyentuh inti', nextScene: 'stomach_acceptance' },
          { id: 'study_core', text: 'Mempelajari inti dari dekat', nextScene: 'stomach_passive' },
          { id: 'respect_core', text: 'Menghormati dan tidak menyentuh', nextScene: 'stomach_passive' },
          { id: 'sync_heartbeat', text: 'Menyesuaikan detak jantungmu', nextScene: 'stomach_acceptance' }
        ],
        effect: () => {
          this.playSound('heartbeat');
          this.changeBackgroundMusic('intense');
        }
      },
      
      'relax_stomach': {
        text: 'Kau memutuskan untuk bersantai dan menikmati sensasi berada di dalam perut Lawless. Kehangatan menyelimutimu, dan kau merasakan detak jantungnya yang menenangkan.',
        choices: [
          { id: 'fall_asleep', text: 'Tertidur karena nyaman', nextScene: 'stomach_passive' },
          { id: 'meditate', text: 'Bermeditasi dan menyatu dengan energi', nextScene: 'stomach_acceptance' }
        ]
      },
      
      'dream_sequence': {
        text: 'Dalam mimpimu, kau melihat dunia dari perspektif Lawless. Kau merasakan kekuatannya, keabadiannya, dan juga... kesepiannya.',
        choices: [
          { id: 'embrace_dream', text: 'Menerima visi dan menyatu dengannya', nextScene: 'stomach_acceptance' },
          { id: 'resist_dream', text: 'Melawan mimpi dan mempertahankan identitas', nextScene: 'stomach_struggle' }
        ]
      },
      
      'communicate_stomach': {
        character: 'Lawless',
        text: 'Aku bisa mendengarmu, kau tahu. Bagaimana rasanya berada di dalam diriku?',
        choices: [
          { id: 'enjoy_inside', text: 'Ini... lebih nyaman dari yang kubayangkan', nextScene: 'stomach_acceptance' },
          { id: 'ask_questions', text: 'Aku punya banyak pertanyaan', nextScene: 'stomach_passive' },
          { id: 'express_concern', text: 'Aku sedikit khawatir...', nextScene: 'stomach_struggle' }
        ],
        effect: () => {
          this.playSound('stomach');
          this.showBellyEnvironment(2);
        }
      },
      
      'beg_response': {
        character: 'Lawless',
        text: 'Begitu manis~ Aku suka saat mangsaku tahu tempatnya.',
        choices: [
          { id: 'accept_fate', text: 'Menutup mata dan menerima nasib', nextScene: 'stomach_small' },
          { id: 'last_plea', text: 'Kumohon, pasti ada cara lain!', nextScene: 'alternative_offer' }
        ],
        effect: () => {
          this.playSound('gulp');
          this.changeBackgroundMusic('intense');
        }
      },
      
      'alternative_offer': {
        character: 'Lawless',
        text: 'Cara lain? Hmm... Mungkin ada. Aku bisa menawarkan... pengalaman yang berbeda.',
        choices: [
          { id: 'accept_alternative', text: 'Apa tawaranmu?', nextScene: 'special_offer' },
          { id: 'reject_alternative', text: 'Tidak', nextScene: 'polite_exit' }
        ]
      },
      
      'special_offer': {
        character: 'Lawless',
        text: 'Bagaimana kalau kita membuat... kesepakatan? Kau bisa menjadi tamuku untuk sementara, bukan mangsaku selamanya.',
        choices: [
          { id: 'accept_deal', text: 'Aku tertarik dengan tawaranmu', nextScene: 'temporary_stay' },
          { id: 'decline_deal', text: 'Aku lebih suka menjadi bagian darimu selamanya', nextScene: 'permanent_choice' }
        ]
      },
      
      'temporary_stay': {
        character: 'Lawless',
        text: 'Pilihan bijak. Kau akan merasakan sensasi luar biasa, dan aku akan melepaskanmu setelah... katakanlah, beberapa jam?',
        choices: [
          { id: 'agree_terms', text: 'Setuju dengan syaratmu', nextScene: 'stomach_medium' },
          { id: 'negotiate', text: 'Bisakah kita negosiasikan waktunya?', nextScene: 'negotiation' }
        ]
      },
      
      'negotiation': {
        character: 'Lawless',
        text: 'Hmm , kau berani menegosiasikan dengan predator? Menarik... Berapa lama yang kau inginkan?',
        choices: [
          { id: 'short_time', text: 'Hanya setengah jam', nextScene: 'short_stay' },
          { id: 'medium_time', text: 'Satu jam penuh', nextScene: 'medium_stay' },
          { id: 'long_time', text: 'Dua jam, aku ingin menikmatinya', nextScene: 'long_stay' }
        ]
      },
      
      'short_stay': {
        character: 'Lawless',
        text: 'Setengah jam? Baiklah, tapi kau mungkin tidak akan merasakan pengalaman penuhnya...',
        choices: [
          { id: 'confirm_short', text: 'Itu cukup untukku', nextScene: 'stomach_small' }
        ]
      },
      
      'medium_stay': {
        character: 'Lawless',
        text: 'Satu jam... waktu yang cukup untuk kita berdua menikmati pengalaman ini.',
        choices: [
          { id: 'confirm_medium', text: 'Sempurna', nextScene: 'stomach_medium' }
        ]
      },
      
      'long_stay': {
        character: 'Lawless',
        text: 'Dua jam? Kau benar-benar ingin menikmati waktumu di dalam diriku, ya? Aku suka itu.',
        choices: [
          { id: 'confirm_long', text: 'Aku ingin merasakan semuanya', nextScene: 'stomach_large' }
        ]
      },
      
      'permanent_choice': {
        character: 'Lawless',
        text: 'Oh? Kau ingin menjadi bagian dariku... selamanya? Kau yakin dengan keputusanmu?',
        choices: [
          { id: 'fully_commit', text: 'Ya, aku yakin', nextScene: 'permanent_merge' },
          { id: 'reconsider', text: 'Mungkin aku perlu memikirkannya lagi', nextScene: 'reconsideration' }
        ]
      },
      
      'permanent_merge': {
        character: 'Lawless',
        text: 'Kalau begitu, selamat datang di kehidupan barumu... sebagai bagian dari diriku.',
        choices: [
          { id: 'embrace_fate', text: 'Menutup mata dan menerima takdir', nextScene: 'merge_complete' }
        ],
        effect: () => {
          document.body.style.background = 'linear-gradient(to bottom, #300a50, #120450)';
          this.playSound('intense');
        }
      },
      
      'merge_complete': {
        text: 'Kau merasakan dirimu perlahan menyatu dengan Lawless. Kesadaranmu mulai berbaur dengan kesadarannya, menciptakan koneksi yang tak pernah kau bayangkan sebelumnya.',
        choices: [
          { id: 'new_perspective', text: 'Melihat dunia melalui mata Lawless', nextScene: 'shared_consciousness' }
        ],
        effect: () => {
          this.showBellyEnvironment(3);
          this.playSound('heartbeat');
        }
      },
      
      'shared_consciousness': {
        character: 'Lawless',
        text: 'Sekarang kita adalah satu. Kau bisa merasakan kekuatanku, dan aku bisa merasakan keunikanmu. Bersama, kita akan menjelajahi dunia dengan cara yang baru.',
        choices: [
          { id: 'end_journey', text: 'Menikmati petualangan baru', nextScene: 'epilogue' }
        ]
      },
      
      'epilogue': {
        text: 'Dan begitulah, kau dan Lawless menjadi satu entitas, berbagi pengalaman dan kenangan untuk selamanya...',
        choices: [
          { id: 'reflect', text: 'Merenungkan perjalananmu', nextScene: 'final_reflection' },
          { id: 'embrace_unity', text: 'Merangkul kesatuan baru', nextScene: 'unity_celebration' }
        ],
        effect: () => {
          this.playSound('heartbeat');
          this.changeBackgroundMusic('intense');
        }
      },
      
      'stomach_small': {
        text: 'Kau berada di dalam perut Lawless yang hangat. Ruangannya tidak terlalu besar, tapi cukup nyaman untuk sementara waktu.',
        choices: [
          { id: 'enjoy_small', text: 'Menikmati kehangatan', nextScene: 'small_enjoyment' },
          { id: 'explore_small', text: 'Mencoba menjelajah', nextScene: 'small_exploration' }
        ],
        effect: () => {
          this.showBellyEnvironment(1);
          this.playSound('stomach');
        }
      },
      
      'stomach_medium': {
        text: 'Perut Lawless terasa luas dan nyaman. Dinding -dindingnya berkilau dengan cahaya biru lembut, menciptakan suasana yang hampir magis.',
        choices: [
          { id: 'relax_medium', text: 'Bersantai dan menikmati pemandangan', nextScene: 'medium_relaxation' },
          { id: 'interact_medium', text: 'Berinteraksi dengan lingkungan sekitar', nextScene: 'medium_interaction' }
        ],
        effect: () => {
          this.showBellyEnvironment(2);
          this.playSound('stomach');
          this.playSound('fluid');
        }
      },
      
      'stomach_large': {
        text: 'Kau terkejut melihat betapa luasnya interior perut Lawless. Ruangan ini hampir seperti dunia tersendiri, dengan berbagai warna dan tekstur yang menakjubkan.',
        choices: [
          { id: 'adventure_large', text: 'Memulai petualangan', nextScene: 'large_adventure' },
          { id: 'communicate_large', text: 'Berkomunikasi dengan Lawless', nextScene: 'large_communication' }
        ],
        effect: () => {
          this.showBellyEnvironment(3);
          this.playSound('stomach');
          this.playSound('fluid');
          this.playSound('heartbeat');
        }
      },
      
      'continue_exploration': {
        text: 'Kau melanjutkan eksplorasimu di dalam perut Lawless. Semakin dalam kau menjelajah, semakin banyak keajaiban yang kau temukan.',
        choices: [
          { id: 'find_secret', text: 'Menemukan ruangan tersembunyi', nextScene: 'secret_chamber' },
          { id: 'return_main', text: 'Kembali ke area utama', nextScene: 'return_to_stomach' }
        ]
      },
      
      'secret_chamber': {
        text: 'Kau menemukan ruangan tersembunyi yang dipenuhi dengan kristal bercahaya. Ruangan ini tampak seperti tempat meditasi atau semacam altar.',
        choices: [
          { id: 'meditate_chamber', text: 'Bermeditasi di ruangan ini', nextScene: 'meditation_experience' },
          { id: 'examine_crystals', text: 'Memeriksa kristal-kristal', nextScene: 'crystal_discovery' }
        ]
      },
      
      'lawless_past_story': {
        character: 'Lawless',
        text: 'Aku sudah ada sejak ribuan tahun yang lalu. Awalnya aku adalah naga biasa, tapi sebuah ritual kuno memberiku kekuatan untuk menyerap esensi makhluk lain. Sejak itu, aku hidup dengan cara ini... mencari jiwa-jiwa yang menarik untuk menjadi bagian dariku.',
        choices: [
          { id: 'sympathize', text: 'Itu terdengar... kesepian', nextScene: 'loneliness_discussion' },
          { id: 'curious_more', text: 'Ceritakan lebih banyak tentang ritual itu', nextScene: 'ritual_explanation' }
        ]
      },
      
      'loneliness_discussion': {
        character: 'Lawless',
        text: 'Kesepian? Mungkin. Tapi aku tidak pernah benar-benar sendiri. Aku membawa semua jiwa yang pernah kutelan. Mereka semua masih ada di dalam diriku, dalam suatu bentuk.',
        choices: [
          { id: 'meet_others', text: 'Bisakah aku bertemu dengan mereka?', nextScene: 'meet_other_souls' },
          { id: 'be_special', text: 'Apakah aku spesial bagimu?', nextScene: 'special_connection' }
        ]
      },
      
      'meet_other_souls': {
        character: 'Lawless',
        text: 'Bertemu dengan jiwa-jiwa lain? Hmm... itu belum pernah terjadi sebelumnya. Tapi mungkin... karena kau berbeda.',
        choices: [
          { id: 'try_connection', text: 'Mari kita coba', nextScene: 'soul_meeting' },
          { id: 'too_risky', text: 'Mungkin terlalu berisiko', nextScene: 'respect_boundaries' }
        ]
      },
      
      'soul_meeting': {
        text: 'Lawless memejamkan mata, dan tiba-tiba kau merasakan kehadiran lain di sekitarmu. Bayangan-bayangan samar mulai muncul, membentuk sosok-sosok yang hampir transparan.',
        choices: [
          { id: 'greet_souls', text: 'Menyapa mereka', nextScene: 'soul_conversation' },
          { id: 'observe_quietly', text: 'Mengamati dalam diam', nextScene: 'soul_observation' }
        ],
        effect: () => {
          this.playSound('intro');
        }
      },
      
      'brave_response': {
        character: 'Lawless',
        text: 'Tidak takut? Hmm, keberanian atau kebodohan? Mari kita lihat seberapa lama keberanianmu bertahan...',
        choices: [
          { id: 'stand_ground', text: 'Aku tetap tidak takut padamu', nextScene: 'stand_ground_response' },
          { id: 'show_respect', text: 'Aku berani, tapi tetap menghormatimu', nextScene: 'respect_response' }
        ],
        effect: () => {
          this.changeBackgroundMusic('intense');
        }
      },
      
      'stand_ground_response': {
        character: 'Lawless',
        text: 'Kau benar-benar menarik. Jarang ada yang tetap berani di hadapanku. Aku suka tantangan...',
        choices: [
          { id: 'challenge', text: 'Apa yang bisa kau lakukan padaku?', nextScene: 'challenge_accepted' },
          { id: 'negotiate_brave', text: 'Mari kita bicarakan ini sebagai sesama yang setara', nextScene: 'equal_terms' }
        ]
      },
      
      'challenge_accepted': {
        character: 'Lawless',
        text: 'Apa yang bisa kulakukan? Oh, banyak sekali... Tapi mungkin yang paling menarik adalah membuatmu memohon.',
        choices: [
          { id: 'never_beg', text: 'Aku tidak akan pernah memohon', nextScene: 'never_beg_response' },
          { id: 'curious_how', text: 'Bagaimana caramu melakukannya?', nextScene: 'curious_methods' }
        ]
      },
      
      'tease_response': {
        character: 'Lawless',
        text: 'Oh? Menantangku? Kau punya nyali juga rupanya. Aku suka mangsa yang punya... kepribadian.',
        choices: [
          { id: 'continue_tease', text: 'Aku bukan mangsa. Aku tamu.', nextScene: 'guest_not_prey' },
          { id: 'flirt', text: 'Mungkin kita bisa bersenang-senang bersama', nextScene: 'flirtatious_path' }
        ]
      },
      
      'guest_not_prey': {
        character: 'Lawless',
        text: 'Tamu? Hmm, menarik sekali cara pandangmu. Baiklah, anggap saja ini... undangan makan malam.',
        choices: [
          { id: 'accept_dinner', text: 'Dengan senang hati, tapi aku yang menentukan menunya', nextScene: 'dinner_negotiation' },
          { id: 'decline_dinner', text: 'Aku lebih suka menjadi tuan rumah, bukan hidangan', nextScene: 'host_not_meal' }
        ]
      },
      
      'flirtatious_path': {
        character: 'Lawless',
        text: 'Bersenang-senang? Aku suka caramu berpikir. Katakan, kesenangan seperti apa yang kau bayangkan?',
        choices: [
          { id: 'playful_suggestion', text: 'Bagaimana kalau kita bermain petak umpet di dalam perutmu?', nextScene: 'playful_response' },
          { id: 'intimate_suggestion', text: 'Mungkin sesuatu yang lebih... intim', nextScene: 'intimate_response' }
        ]
      },
      
      'playful_response': {
        character: 'Lawless',
        text: 'Petak umpet di dalam perutku? Haha, kau benar-benar unik! Baiklah, tapi aku peringatkan, tidak ada yang pernah menang melawanku dalam permainan itu.',
        choices: [
          { id: 'accept_game', text: 'Tantangan diterima!', nextScene: 'stomach_game' },
          { id: 'suggest_other', text: 'Bagaimana dengan permainan lain?', nextScene: 'other_games' }
        ]
      },
      
      'stomach_game': {
        text: 'Lawless menelanmu dengan satu tegukan besar. Di dalam, kau menemukan ruangan yang jauh lebih luas dari yang kau bayangkan, dengan berbagai lorong dan ruang tersembunyi.',
        choices: [
          { id: 'hide', text: 'Bersembunyi di salah satu lorong', nextScene: 'hiding_spot' },
          { id: 'explore_game', text: 'Menjelajahi sambil mencari tempat sempurna', nextScene: 'exploration_game' }
        ],
        effect: () => {
          this.showBellyEnvironment(3);
          this.playSound('gulp');
        }
      },
      
      'respect_response': {
        character: 'Lawless',
        text: 'Berani tapi tetap menghormati... Kau bijaksana juga rupanya. Tapi tetap saja, kau akan menjadi sant apanku.',
        choices: [
          { id: 'accept_fate', text: 'Aku... menerima takdirku', nextScene: 'willing_prey' },
          { id: 'request_gentle', text: 'Tolong lakukan dengan lembut', nextScene: 'gentle_vore' }
        ],
        effect: () => {
          this.changeBackgroundMusic('intense');
        }
      },
      
      'willing_prey': {
        character: 'Lawless',
        text: 'Mmm~ Aku suka mangsa yang menerima takdirnya. Bersiaplah untuk pengalaman yang tak terlupakan...',
        choices: [
          { id: 'close_eyes', text: 'Menutup mata dan pasrah', nextScene: 'swallow_scene_willing' },
          { id: 'watch_process', text: 'Melihat proses penelanan', nextScene: 'swallow_scene_watching' }
        ],
        effect: () => {
          this.playSound('gulp');
        }
      },
      
      'swallow_scene_willing': {
        text: 'Kau menutup mata saat Lawless membuka mulutnya lebar. Kau merasakan lidahnya yang basah menyentuh kulitmu sebelum kegelapan menelanmu sepenuhnya.',
        choices: [
          { id: 'feel_throat', text: 'Merasakan sensasi di tenggorokannya', nextScene: 'throat_passage' }
        ],
        effect: () => {
          this.playSound('gulp');
          this.playSound('fluid');
        }
      },
      
      'throat_passage': {
        text: 'Kau merasakan dinding-dinding tenggorokan Lawless bergerak, mendorongmu semakin dalam. Sensasi hangat dan basah menyelimutimu saat kau meluncur ke bawah.',
        choices: [
          { id: 'struggle_lightly', text: 'Bergerak sedikit untuk merasakan sensasinya', nextScene: 'light_struggle_response' },
          { id: 'relax_completely', text: 'Rileks sepenuhnya dan menikmati perjalanan', nextScene: 'stomach_arrival_peaceful' }
        ],
        effect: () => {
          this.playSound('stomach');
        }
      },
      
      'light_struggle_response': {
        character: 'Lawless',
        text: 'Mmm~ Aku bisa merasakanmu bergerak di dalam tenggorokanku. Teruslah bergerak, itu membuatnya lebih... menyenangkan.',
        choices: [
          { id: 'continue_movement', text: 'Terus bergerak perlahan', nextScene: 'stomach_arrival_movement' }
        ],
        effect: () => {
          this.showBellyEnvironment(1);
        }
      },
      
      'stomach_arrival_movement': {
        text: 'Dengan satu dorongan terakhir, kau jatuh ke dalam perut Lawless. Dinding-dindingnya berkilau dengan cahaya aneh, dan suara detak jantungnya terdengar jelas.',
        choices: [
          { id: 'explore_stomach_walls', text: 'Menjelajahi dinding perut', nextScene: 'stomach_wall_exploration' },
          { id: 'feel_digestion', text: 'Merasakan sensasi cairan di sekitarmu', nextScene: 'digestion_sensation' }
        ],
        effect: () => {
          this.showBellyEnvironment(2);
          this.playSound('stomach');
          this.playSound('heartbeat');
        }
      },
      
      'stomach_wall_exploration': {
        text: 'Kau menyentuh dinding perut yang lembut dan elastis. Mereka bergerak dengan ritme pernapasan Lawless, dan kau bisa merasakan aliran darah di baliknya.',
        choices: [
          { id: 'press_walls', text: 'Menekan dinding untuk mendapat reaksi', nextScene: 'wall_pressing_reaction' },
          { id: 'trace_patterns', text: 'Menelusuri pola pada dinding', nextScene: 'wall_pattern_discovery' }
        ]
      },
      
      'wall_pressing_reaction': {
        character: 'Lawless',
        text: 'Ohh~ Aku bisa merasakanmu menekan perutku dari dalam. Itu... sensasi yang menarik.',
        choices: [
          { id: 'press_harder', text: 'Menekan lebih keras', nextScene: 'harder_press_response' },
          { id: 'gentle_massage', text: 'Memijat dinding dengan lembut', nextScene: 'massage_response' }
        ],
        effect: () => {
          this.playSound('fluid');
        }
      },
      
      'harder_press_response': {
        character: 'Lawless',
        text: 'Mmm! Kau cukup kuat untuk ukuran mangsaku. Aku suka itu... tapi jangan lupa siapa yang mengendalikan situasi di sini.',
        choices: [
          { id: 'apologize_pressing', text: 'Maaf, aku hanya penasaran', nextScene: 'apology_accepted' },
          { id: 'continue_resistance', text: 'Terus memberikan perlawanan ringan', nextScene: 'playful_struggle' }
        ],
        effect: () => {
          this.showBellyEnvironment(3);
        }
      },
      
      'playful_struggle': {
        character: 'Lawless',
        text: 'Hahaha! Kau benar-benar punya semangat! Teruslah berjuang, itu membuat perutku terasa... hidup.',
        choices: [
          { id: 'tire_out', text: 'Perlahan kelelahan dan menyerah', nextScene: 'exhaustion_surrender' },
          { id: 'find_weakness', text: 'Mencari titik lemah di dinding perut', nextScene: 'weakness_search' }
        ],
        effect: () => {
          this.playSound('laugh');
        }
      },
      
      'exhaustion_surrender': {
        text: 'Setelah beberapa saat berjuang, kau mulai merasa lelah. Kehangatan perut Lawless membuatmu mengantuk, dan kau perlahan menyerah pada sensasi nyaman yang menyelimutimu.',
        choices: [
          { id: 'curl_up', text: 'Meringkuk dan beristirahat', nextScene: 'peaceful_rest' },
          { id: 'final_words', text: 'Berbicara pada Lawless sebelum beristirahat', nextScene: 'final_conversation' }
        ],
        effect: () => {
          this.changeBackgroundMusic('playful');
        }
      },
      
      'peaceful_rest': {
        text: 'Kau meringkuk dalam kehangatan perut Lawless, detak jantungnya menjadi lagu pengantar tidur. Sensasi aneh tapi menenangkan menyelimutimu saat kau perlahan tertidur.',
        choices: [
          { id: 'dream_state', text: 'Masuk ke dalam mimpi', nextScene: 'vore_dream_sequence' }
        ],
        effect: () => {
          this.playSound('heartbeat');
        }
      },
      
      'vore_dream_sequence': {
        text: 'Dalam mimpimu, kau melihat dirimu dan Lawless dalam berbagai skenario vore yang berbeda. Kau merasakan koneksi aneh dengan predatormu, seolah kalian telah terhubung pada level yang lebih dalam.',
        choices: [
          { id: 'accept_connection', text: 'Menerima koneksi ini', nextScene: 'spiritual_bond' },
          { id: 'resist_connection', text: 'Mencoba mempertahankan identitasmu', nextScene: 'identity_preservation' }
        ]
      },
      
      'gentle_vore': {
        character: 'Lawless',
        text: 'Dengan lembut? Hmm... Aku bisa melakukannya. Kau adalah mangsa yang spesial, lagipula.',
        choices: [
          { id: 'thank_consideration', text: 'Terima kasih atas pengertianmu', nextScene: 'gentle_swallow' },
          { id: 'nervous_but_ready', text: 'Aku... sedikit gugup, tapi aku siap', nextScene: 'reassurance_before_swallow' }
        ]
      },
      
      'gentle_swallow': {
        text: 'Lawless membuka mulutnya perlahan, lidahnya menjulur dengan lembut untuk menyentuhmu. Dengan gerakan yang hampir seperti ciuman, ia mulai menelanmu.',
        choices: [
          { id: 'embrace_tongue', text: 'Memeluk lidahnya saat ia menelanmu', nextScene: 'intimate_swallow' }
        ],
        effect: () => {
          this.playSound('gulp');
        }
      },
      
      'intimate_swallow': {
        text: 'Kau merasakan kehangatan lidah Lawless saat ia dengan lembut mendorongmu ke dalam mulutnya. Proses penelanan terasa intim dan hampir seperti pelukan yang erat.',
        choices: [
          { id: 'slide_down', text: 'Membiarkan dirimu meluncur ke dalam kerongkongannya', nextScene: 'gentle_descent' }
        ],
        effect: () => {
          this.playSound('fluid');
        }
      },
      
      'gentle_descent': {
        text: 'Kau meluncur dengan lembut melalui kerongkongan Lawless, merasakan dinding-dindingnya bergerak dengan ritme yang menenangkan. Tidak ada rasa takut, hanya sens asi aneh yang menyenangkan.',
        choices: [
          { id: 'enjoy_journey', text: 'Menikmati perjalanan ke bawah', nextScene: 'peaceful_arrival' }
        ],
        effect: () => {
          this.showBellyEnvironment(1);
        }
      },
      
      'peaceful_arrival': {
        text: 'Dengan lembut, kau mendarat di dalam perut Lawless. Ruangan itu terasa hangat dan nyaman, dengan cahaya kebiruan yang menerangi interior yang lembab namun tidak menakutkan.',
        choices: [
          { id: 'look_around', text: 'Melihat sekeliling dengan takjub', nextScene: 'stomach_wonder' },
          { id: 'touch_walls', text: 'Menyentuh dinding perut dengan lembut', nextScene: 'wall_touching' }
        ],
        effect: () => {
          this.showBellyEnvironment(2);
          this.playSound('stomach');
        }
      },
      
      'stomach_wonder': {
        text: 'Interior perut Lawless jauh lebih indah dari yang kau bayangkan. Dinding-dindingnya berkilau dengan warna-warna yang berubah, menciptakan pemandangan yang hampir magis.',
        choices: [
          { id: 'compliment_beauty', text: 'Memuji keindahan interiornya', nextScene: 'beauty_compliment' },
          { id: 'explore_further', text: 'Menjelajah lebih jauh', nextScene: 'deeper_exploration' }
        ]
      },
      
      'beauty_compliment': {
        character: 'Lawless',
        text: 'Kau... menyukai interiorku? Itu... pujian yang tidak biasa. Tapi aku menghargainya.',
        choices: [
          { id: 'ask_how_works', text: 'Bagaimana semua ini bisa berfungsi?', nextScene: 'vore_explanation' },
          { id: 'just_enjoy', text: 'Aku hanya ingin menikmati momen ini', nextScene: 'enjoyment_moment' }
        ]
      },
      
      'vore_explanation': {
        character: 'Lawless',
        text: 'Tubuhku tidak seperti tubuh makhluk biasa. Aku bisa mengubah interior perutku untuk kenyamanan... atau ketidaknyamanan mangsaku. Untuk mangsa spesial sepertimu, aku memilih yang terbaik.',
        choices: [
          { id: 'feel_special', text: 'Aku merasa tersanjung', nextScene: 'special_prey_moment' },
          { id: 'ask_other_prey', text: 'Apa yang terjadi pada mangsa lainnya?', nextScene: 'other_prey_fate' }
        ]
      },
      
      'wall_touching': {
        text: 'Saat kau menyentuh dinding perut, kau merasakan mereka merespons sentuhanmu, bergerak sedikit seperti kulit yang sensitif. Sensasi aneh tapi menyenangkan menjalar di jari-jarimu.',
        choices: [
          { id: 'stroke_gently', text: 'Mengelus dinding dengan lembut', nextScene: 'stomach_acceptance' },
          { id: 'press_curiously', text: 'Menekan dengan penasaran', nextScene: 'stomach_struggle' }
        ]
      },
      
      'wall_stroking': {
        character: 'Lawless',
        text: 'Mmm~ Itu... terasa sangat menyenangkan. Jarang ada yang memperlakukan perutku dengan begitu lembut.',
        choices: [
          { id: 'continue_stroking', text: 'Melanjutkan mengelus dinding perut', nextScene: 'stomach_acceptance' },
          { id: 'ask_feeling', text: 'Apakah kau bisa merasakan semua yang kulakukan?', nextScene: 'stomach_passive' }
        ],
        effect: () => {
          this.playSound('laugh');
        }
      },
      
      'continued_stroking': {
        text: 'Kau terus mengelus dinding perut Lawless, merasakan mereka bergetar dengan senang di bawah sentuhanmu. Cairan di sekitarmu terasa lebih hangat, seperti merespons tindakanmu.',
        choices: [
          { id: 'belly_massage', text: 'Memberikan pijatan lembut', nextScene: 'belly_massage_scene' },
          { id: 'rest_against_wall', text: 'Bersandar pada dinding dan beristirahat', nextScene: 'resting_inside' }
        ],
        effect: () => {
          this.showBellyEnvironment(3);
        }
      },
      
      'belly_massage_scene': {
        character: 'Lawless',
        text: 'Ohh~ Itu... luar biasa. Kau memiliki sentuhan yang ajaib. Mungkin aku akan menahanmu lebih lama dari yang kurencanakan...',
        choices: [
          { id: 'pleased_to_help', text: 'Senang bisa membuatmu nyaman', nextScene: 'mutual_pleasure' },
          { id: 'ask_how_long', text: 'Berapa lama kau akan menahanku?', nextScene: 'duration_discussion' }
        ]
      },
      
      'mutual_pleasure': {
        character: 'Lawless',
        text: 'Kau mangsa yang sangat pengertian. Ini pengalaman vore yang paling menyenangkan yang pernah kualami.',
        choices: [
          { id: 'feel_honored', text: 'Aku merasa terhormat', nextScene: 'honored_prey' },
          { id: 'suggest_again', text: 'Kita harus melakukan ini lagi kapan-kapan', nextScene: 'repeat_suggestion' }
        ]
      },
      
      'honored_prey': {
        character: 'Lawless',
        text: 'Terhormat? Haha, kau benar-benar unik. Kebanyakan mangsa tidak akan menggunakan kata itu untuk situasi mereka.',
        choices: [
          { id: 'not_ordinary', text: 'Aku bukan mangsa biasa', nextScene: 'special_connection' },
          { id: 'ask_release', text: 'Kapan kau akan melepaskanku?', nextScene: 'release_discussion' }
        ]
      },
      
      'special_connection': {
        character: 'Lawless',
        text: 'Memang tidak. Kau... spesial. Aku merasakan koneksi yang tidak biasa denganmu. Seolah kita ditakdirkan untuk bertemu seperti ini.',
        choices: [
          { id: 'feel_same', text: 'Aku juga merasakannya', nextScene: 'mutual_connection' },
          { id: 'curious_meaning', text: 'Apa artinya itu?', nextScene: 'connection_meaning' },
          { id: 'deeper_bond', text: 'Mungkin kita bisa memperdalam ikatan ini', nextScene: 'intimate_connection' }
        ],
        effect: () => {
          this.playSound('heartbeat');
        }
      },
      
      'intimate_connection': {
        character: 'Lawless',
        text: 'Memperdalam ikatan kita? Mmm~ Aku sangat menyukai ide itu. Bagaimana menurutmu kita bisa melakukannya?',
        choices: [
          { id: 'physical_connection', text: 'Mungkin dengan sentuhan yang lebih... intim', nextScene: 'physical_intimacy' },
          { id: 'mental_connection', text: 'Dengan berbagi pikiran dan perasaan', nextScene: 'mental_intimacy' },
          { id: 'spiritual_bond', text: 'Melalui ikatan spiritual yang lebih dalam', nextScene: 'spiritual_intimacy' }
        ],
        effect: () => {
          this.changeBackgroundMusic('intense');
        }
      },
      
      'physical_intimacy': {
        character: 'Lawless',
        text: 'Sentuhan yang lebih intim? Aku suka caramu berpikir. Dinding perutku sangat sensitif, kau tahu... terutama di bagian tertentu.',
        choices: [
          { id: 'explore_sensitivity', text: 'Mencari area yang paling sensitif', nextScene: 'sensitivity_exploration' },
          { id: 'gentle_caress', text: 'Membelai dengan lembut dan perlahan', nextScene: 'slow_caressing' }
        ],
        effect: () => {
          this.playSound('stomach');
          this.showBellyEnvironment(3);
        }
      },
      
      'mutual_connection': {
        character: 'Lawless',
        text: 'Mungkin takdir mempertemukan kita. Predator dan mangsa, terhubung dalam pengalaman intim yang jarang terjadi. Aku bisa merasakan detak jantungmu yang berirama dengan detak jantungku.',
        choices: [
          { id: 'embrace_fate', text: 'Menerima takdir ini', nextScene: 'fate_acceptance' },
          { id: 'temporary_visit', text: 'Tapi ini hanya kunjungan sementara, bukan?', nextScene: 'visit_clarification' },
          { id: 'deeper_connection', text: 'Aku ingin merasakan koneksi yang lebih dalam', nextScene: 'deeper_bond' }
        ],
        effect: () => {
          this.playSound('heartbeat');
        }
      },
      
      'deeper_bond': {
        character: 'Lawless',
        text: 'Koneksi yang lebih dalam? Mmm~ Aku bisa merasakanmu dari setiap sudut perutku. Setiap gerakanmu, setiap napasmu... semua terasa begitu intim.',
        choices: [
          { id: 'synchronize_breathing', text: 'Menyesuaikan napas dengan detak jantungnya', nextScene: 'breath_synchronization' },
          { id: 'share_emotions', text: 'Berbagi emosi dan perasaan', nextScene: 'emotional_sharing' }
        ],
        effect: () => {
          this.playSound('stomach');
        }
      },
      
      'breath_synchronization': {
        text: 'Kau mulai menyesuaikan ritme napasmu dengan detak jantung Lawless. Perlahan, kau merasakan sensasi aneh seolah batas antara kalian mulai memudar.',
        choices: [
          { id: 'embrace_sensation', text: 'Memeluk sensasi menyatu ini', nextScene: 'unity_experience' },
          { id: 'maintain_self', text: 'Mempertahankan kesadaran diri', nextScene: 'self_preservation' }
        ],
        effect: () => {
          this.playSound('heartbeat');
          document.body.classList.add('pulse-effect');
          setTimeout(() => {
            document.body.classList.remove('pulse-effect');
          }, 3000);
        }
      },
      
      'unity_experience': {
        character: 'Lawless',
        text: 'Aku... bisa merasakanmu. Bukan hanya secara fisik, tapi lebih dari itu. Seolah kita mulai berbagi kesadaran. Ini... luar biasa.',
        choices: [
          { id: 'complete_surrender', text: 'Menyerahkan diri sepenuhnya pada pengalaman ini', nextScene: 'complete_unity' },
          { id: 'partial_connection', text: 'Menikmati koneksi sambil mempertahankan identitas', nextScene: 'balanced_connection' }
        ],
        effect: () => {
          this.changeBackgroundMusic('intense');
        }
      },
      
      'visit_promise': {
        character: 'Lawless',
        text: 'Aku akan menantikannya. Perutku akan selalu terbuka untukmu... secara harfiah.',
        effect: () => {
          this.playSound('exit');
          setTimeout(() => this.exitRoleplay(), 4000);
        }
      },
      
      // Ending scenes
      'final_reflection': {
        text: 'Kau merenungkan semua pengalaman yang telah kau lalui. Setiap pilihan yang kau buat membentuk dirimu menjadi lebih kuat dan bijaksana.',
        choices: [
          { id: 'reflect_on_choices', text: 'Aku merasa puas dengan semua ini.', nextScene: 'satisfied_ending' },
          { id: 'learn_from_mistakes', text: 'Aku merasa menyesal dengan beberapa pilihan.', nextScene: 'regret_ending' }
        ]
      },
      
      'satisfied_ending': {
        text: 'Kau tersenyum, merasakan kedamaian dalam pilihanmu. Semua pengalaman ini membentuk dirimu menjadi lebih kuat.',
        choices: [
          { id: 'end', text: 'Selesai', nextScene: 'exit' }
        ]
      },
      
      'regret_ending': {
        text: 'Kau merenungkan pilihanmu, belajar dari kesalahan yang telah dibuat. Ini adalah bagian dari perjalananmu.',
        choices: [
          { id: 'end', text: 'Selesai', nextScene: 'exit' }
        ]
      }
    };
  
    return scenes[sceneId] || {
      text: 'Maaf, scene tidak ditemukan. Kembali ke scene sebelumnya...',
      choices: [
        { id: 'go_back', text: 'Kembali', nextScene: this.previousScene || 'intro' }
      ]
    };
  },
  
  // Show belly environment based on size
  showBellyEnvironment(size) {
    this.bellySize = size;
    const roleplayContainer = document.querySelector('.roleplay-container');
    
    // Create belly container
    const bellyContainer = document.createElement('div');
    bellyContainer.className = 'belly-container';
    bellyContainer.style.height = `${300 + (size * 100)}px`;
    
    // Add belly walls
    const bellyWalls = document.createElement('div');
    bellyWalls.className = 'belly-walls';
    bellyContainer.appendChild(bellyWalls);
    
    // Add belly fluid
    const bellyFluid = document.createElement('div');
    bellyFluid.className = 'belly-fluid';
    bellyFluid.style.height = `${20 + (size * 10)}%`;
    bellyContainer.appendChild(bellyFluid);
    
    // Add heartbeat effect
    const heartbeat = document.createElement('div');
    heartbeat.className = 'heartbeat';
    bellyContainer.appendChild(heartbeat);
    
    // Insert belly container before the dialog box
    roleplayContainer.insertBefore(bellyContainer, roleplayContainer.firstChild);
    
    // Adjust sounds based on belly size
    const stomachVolume = 0.3 + (size * 0.2);
    this.audioElements['stomach'].volume = stomachVolume;
    
    if (size === 3) {
      // For large belly, add bubbling sounds
      this.audioElements['fluid'].volume = 0.5;
      this.audioElements['fluid'].loop = true;
      this.audioElements['fluid'].play();
    }
  },
  
  // Play a sound effect
  playSound(soundId) {
    // Only play sounds if the easter egg is active (except for click sound which works universally)
    if (this.audioElements[soundId]) {
      if (this.isActive || soundId === 'click') {
        // Clone the audio to allow overlapping sounds
        const sound = this.audioElements[soundId].cloneNode();
        sound.volume = 0.4;
        sound.play();
        
        // Set audio to stop playing flag when it ends
        sound.onended = () => {
          sound.playing = false;
        };
        sound.playing = true;
      }
    }
  },
  
  // Play background music
  playBackgroundMusic(musicId) {
    // Only play background music if the easter egg is active
    if (!this.isActive) return;
    
    if (this.backgroundMusic) {
      this.backgroundMusic.pause();
    }
    
    if (this.audioElements[musicId]) {
      this.backgroundMusic = this.audioElements[musicId];
      this.backgroundMusic.loop = true;
      this.backgroundMusic.volume = 0.2;
      this.backgroundMusic.play();
    }
  },
  
  // Change background music with proper transitions
  changeBackgroundMusic(musicId) {
    if (this.backgroundMusic) {
      // Fade out current music
      const fadeOut = setInterval(() => {
        if (this.backgroundMusic.volume > 0.05) {
          this.backgroundMusic.volume -= 0.05;
        } else {
          clearInterval(fadeOut);
          this.backgroundMusic.pause();
          this.playBackgroundMusic(musicId);
        }
      }, 100);
    } else {
      this.playBackgroundMusic(musicId);
    }
  },
  
  // Change background music
  changeBackgroundMusic(musicId) {
    if (this.backgroundMusic) {
      // Fade out current music
      const fadeOut = setInterval(() => {
        if (this.backgroundMusic.volume > 0.05) {
          this.backgroundMusic.volume -= 0.05;
        } else {
          clearInterval(fadeOut);
          this.backgroundMusic.pause();
          this.playBackgroundMusic(musicId);
        }
      }, 100);
    } else {
      this.playBackgroundMusic(musicId);
    }
  },
  
  // Exit the roleplay game
  exitRoleplay() {
    // Play exit sound
    this.playSound('exit');
    
    // Stop all Easter egg audio
    if (this.backgroundMusic) {
      this.backgroundMusic.pause();
      this.backgroundMusic.currentTime = 0;
      this.backgroundMusic = null;
    }
    
    // Stop all audio elements from the Easter egg
    Object.values(this.audioElements).forEach(audio => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    });
    
    // Remove glitch overlay
    const glitchOverlay = document.querySelector('.glitch-overlay');
    if (glitchOverlay) {
      glitchOverlay.remove();
    }
    
    // Remove CRT effect if it exists
    const crtEffect = document.querySelector('.crt-effect');
    if (crtEffect) {
      crtEffect.remove();
    }
    
    // Remove any fade overlays
    const fadeOverlay = document.querySelector('.fade-overlay');
    if (fadeOverlay) {
      fadeOverlay.remove();
    }
    
    // Remove exit button
    if (this.exitButton) {
      this.exitButton.remove();
    }
    
    // Restore original content
    if (this.originalContent) {
      document.querySelector('.lore-container').innerHTML = this.originalContent;
    }
    
    // Restore original cursor
    const cursor = document.querySelector('.custom-cursor');
    if (cursor) {
      cursor.classList.remove('vore-cursor');
      if (this.originalCursor) {
        cursor.style.cssText = this.originalCursor;
      }
    }
    
    // Reset state
    this.isActive = false;
    this.bellySize = 1;
    this.currentScene = 'intro';
    this.playerChoices = [];
    
    // Reset background and remove any filters or effects
    document.body.style.background = '';
    document.body.style.filter = '';
    document.body.style.transition = '';
    
    // Remove any classes that might affect the display
    document.body.classList.remove('screen-shake');
    document.body.classList.remove('intense-glitch');
    document.body.classList.remove('zoom-in');
    document.body.classList.remove('distortion');
    
    // Notify the audio system that Easter egg is deactivated
    if (window.audioSystem) {
      window.audioSystem.setEasterEggState(false);
    }
    
    // Remove any command listeners that might have been added
    if (this.commandListener) {
      document.removeEventListener('keydown', this.commandListener);
      this.commandListener = null;
    }
    
    // Restore page interactivity
    this.restorePageInteractivity();
    
    // Allow regular page audio to play again
    // The regular page scripts will handle restarting their audio
  },
  
  // Restore page interactivity after exiting Easter egg
  restorePageInteractivity() {
    // Re-initialize navigation functionality
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      // Clone and replace the element to remove any event listeners
      const newLink = link.cloneNode(true);
      link.parentNode.replaceChild(newLink, link);
    });
    
    // Re-initialize section navigation from script.js
    const sections = ['landing', 'about', 'gallery', 'lore', 'contact'];
    const refreshedNavLinks = document.querySelectorAll('.nav-link');
    
    refreshedNavLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();

        // Update active link
        refreshedNavLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');

        // Get section id
        const targetId = link.getAttribute('href').slice(1);

        // Hide all sections
        sections.forEach(section => {
          document.getElementById(section).style.display = 'none';
        });

        // Show target section
        const targetSection = document.getElementById(targetId);
        targetSection.style.display = 'flex';

        // Animate in
        if (window.gsap) {
          window.gsap.fromTo(
            targetSection,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
          );
        }
      });
    });
    
    // Re-initialize form input animations
    const formInputs = document.querySelectorAll('.form-input');
    formInputs.forEach(input => {
      // Remove existing listeners by cloning
      const newInput = input.cloneNode(true);
      input.parentNode.replaceChild(newInput, input);
      
      // Add fresh listeners
      newInput.addEventListener('focus', () => {
        newInput.parentElement.classList.add('focused');
      });

      newInput.addEventListener('blur', () => {
        if (newInput.value === '') {
          newInput.parentElement.classList.remove('focused');
        }
      });
    });
    
    // Ensure the story-game is properly initialized for the lore section
    if (window.storyGame && typeof window.storyGame.init === 'function') {
      setTimeout(() => {
        window.storyGame.init();
      }, 500);
    }
  }
};

// Initialize the easter egg when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  voreEasterEgg.init();
});