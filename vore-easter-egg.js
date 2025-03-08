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
      'intro': 'audio/vore_easter_egg/intro.mp3',
      'gulp': 'audio/vore_easter_egg/gulp.mp3',
      'stomach': 'audio/vore_easter_egg/stomach.mp3',
      'laugh': 'audio/vore_easter_egg/laugh.mp3',
      'heartbeat': 'audio/vore_easter_egg/heartbeat.mp3',
      'fluid': 'audio/vore_easter_egg/fluid.mp3',
      'exit': 'audio/vore_easter_egg/exit.mp3',
      'playful': 'audio/vore_easter_egg/playful.mp3',
      'intense': 'audio/vore_easter_egg/intense.mp3'
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
    
    // Stop any currently playing normal lore music
    const normalLoreMusic = document.querySelectorAll('audio');
    normalLoreMusic.forEach(audio => {
      if (!this.audioElements[audio.id]) {
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
  
  // Apply glitch effect to the screen
  applyGlitchEffect() {
    const loreContainer = document.querySelector('.lore-container');
    
    // Create glitch overlay
    const glitchOverlay = document.createElement('div');
    glitchOverlay.className = 'glitch-overlay';
    document.body.appendChild(glitchOverlay);
    
    // Apply screen shake
    document.body.classList.add('screen-shake');
    setTimeout(() => {
      document.body.classList.remove('screen-shake');
    }, 500);
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
  
  // Get content for a specific scene
getSceneContent(sceneId) {
  const scenes = {
    // Additional scenes for more variety and completeness
    'intro': {
      character: 'Lawless',
      text: 'Oh? Kau yang memanggilku? Aku rasa kau tahu apa yang akan terjadi selanjutnya...',
      choices: [
        { id: 'beg', text: 'T-Tolong, aku tidak ingin ini terjadi!', nextScene: 'beg_response' },
        { id: 'brave', text: 'Aku tidak takut padamu!', nextScene: 'brave_response' },
        { id: 'tease', text: 'Hah, aku ingin melihat seberapa jauh kau bisa pergi.', nextScene: 'tease_response' },
        { id: 'curious', text: 'Aku... penasaran tentangmu.', nextScene: 'curious_response' }
      ],
      effect: () => {
        // Change background to a more mysterious one
        document.body.style.background = 'linear-gradient(to bottom, #300a24, #120424)';
        // Play laugh sound
        this.playSound('laugh');
        }
      },
      'curious_response': {
        character: 'Lawless',
        text: 'Penasaran? Hmm... Jarang sekali ada yang berani mengakui ketertarikannya padaku. Aku suka itu.',
        choices: [
          { id: 'ask_about', text: 'Ceritakan tentang dirimu', nextScene: 'lawless_backstory' },
          { id: 'ask_experience', text: 'Bagaimana rasanya... menelan seseorang?', nextScene: 'lawless_experience' }
        ],
        effect: () => {
          // Change background music to something more mysterious
          this.changeBackgroundMusic('playful');
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
          { id: 'admit_curious', text: 'Ya... aku memang penasaran', nextScene: 'pre_swallow' },
          { id: 'deny_interest', text: 'Tidak, aku hanya ingin berbicara', nextScene: 'just_talk_path' }
        ]
      },
      'just_talk_path': {
        character: 'Lawless',
        text: 'Hmm, menarik. Jarang ada yang hanya ingin berbicara denganku. Baiklah, apa yang ingin kau bicarakan?',
        choices: [
          { id: 'ask_others', text: 'Apakah ada orang lain yang pernah memanggilmu?', nextScene: 'others_called' },
          { id: 'ask_powers', text: 'Kekuatan apa lagi yang kau miliki?', nextScene: 'other_powers' }
        ]
      },
      'others_called': {
        character: 'Lawless',
        text: 'Oh, tentu saja. Banyak yang memanggilku, tapi sedikit yang benar-benar tahu apa yang mereka lakukan. Kebanyakan dari mereka... yah, mereka menjadi bagian dariku sekarang.',
        choices: [
          { id: 'reconsider', text: 'Mungkin aku juga ingin mencobanya...', nextScene: 'pre_swallow' },
          { id: 'leave_politely', text: 'Kurasa aku harus pergi sekarang', nextScene: 'polite_exit' }
        ]
      },
      'other_powers': {
        character: 'Lawless',
        text: 'Kekuatanku? Aku bisa melakukan banyak hal... mengubah bentuk, membaca pikiran, dan tentu saja... menelan siapapun yang kuinginkan. Tapi kekuatan terbesar adalah memberikan pengalaman yang tak terlupakan.',
        choices: [
          { id: 'show_power', text: 'Bisakah kau tunjukkan padaku?', nextScene: 'pre_swallow' },
          { id: 'thank_conversation', text: 'Terima kasih atas percakapannya', nextScene: 'polite_exit' }
        ]
      },
      'polite_exit': {
        character: 'Lawless',
        text: 'Pergi begitu saja? Sayang sekali. Padahal kita baru mulai bersenang-senang. Mungkin lain kali kau akan lebih... berani.',
        effect: () => {
          // Play exit sound
          this.playSound('exit');
          // Exit after delay
          setTimeout(() => this.exitRoleplay(), 3000);
        }
      },
      'pre_swallow': {
        character: 'Lawless',
        text: 'Kau yakin? Ini bukan keputusan yang bisa kau tarik kembali dengan mudah...',
        choices: [
          { id: 'fully_commit', text: 'Aku yakin. Aku siap.', nextScene: 'swallow_scene' },
          { id: 'hesitate', text: 'Aku... tidak yakin...', nextScene: 'hesitation_response' }
        ],
        effect: () => {
          // Change background music to more intense
          this.changeBackgroundMusic('intense');
        }
      },
      'hesitation_response': {
        character: 'Lawless',
        text: 'Keraguan adalah hal yang wajar. Tapi kadang, pengalaman terbaik datang dari melangkah melewati ketakutanmu...',
        choices: [
          { id: 'overcome_fear', text: 'Kau benar. Aku siap.', nextScene: 'swallow_scene' },
          { id: 'still_unsure', text: 'Aku masih belum yakin', nextScene: 'second_hesitation' }
        ]
      },
      'second_hesitation': {
        character: 'Lawless',
        text: 'Hmm, mungkin kau memang belum siap. Tidak apa-apa, aku bisa menunggu...',
        choices: [
          { id: 'final_decision_yes', text: 'Tidak, aku siap sekarang!', nextScene: 'swallow_scene' },
          { id: 'final_decision_no', text: 'Mungkin lain kali...', nextScene: 'polite_exit' }
        ]
      },
      'swallow_scene': {
        character: 'Lawless',
        text: 'Pilihan yang berani... Bersiaplah untuk pengalaman yang tak akan pernah kau lupakan.',
        choices: [
          { id: 'close_eyes', text: 'Menutup mata dan pasrah', nextScene: 'stomach_choice' }
        ],
        effect: () => {
          // Play gulp sound
          this.playSound('gulp');
        }
      },
      'stomach_choice': {
        text: 'Kau merasakan sensasi hangat saat Lawless menelanmu. Kegelapan menyelimutimu, dan kau bisa merasakan dinding-dinding perutnya bergerak di sekitarmu.',
        choices: [
          { id: 'explore_option', text: 'Menjelajahi ruang perut', nextScene: 'explore_stomach' },
          { id: 'relax_option', text: 'Bersantai dan menikmati sensasinya', nextScene: 'relax_stomach' },
          { id: 'communicate_option', text: 'Mencoba berkomunikasi dengan Lawless', nextScene: 'communicate_stomach' }
        ],
        effect: () => {
          // Show belly environment with random size (1-3)
          const size = Math.floor(Math.random() * 3) + 1;
          this.showBellyEnvironment(size);
          // Play stomach sounds
          this.playSound('stomach');
          this.playSound('heartbeat');
        }
      },
      'explore_stomach': {
        text: 'Kau mulai menjelajahi interior perut Lawless. Dinding-dindingnya berkilau dengan cahaya aneh, dan kau menemukan berbagai bentuk dan tekstur yang tidak biasa.',
        choices: [
          { id: 'find_artifact', text: 'Memeriksa benda berkilau di sudut', nextScene: 'artifact_discovery' },
          { id: 'find_passage', text: 'Menemukan semacam lorong', nextScene: 'passage_discovery' }
        ]
      },
      'artifact_discovery': {
        text: 'Kau menemukan sebuah kristal kecil yang bercahaya. Saat kau menyentuhnya, kristal itu memancarkan energi aneh yang membuatmu bisa melihat kenangan-kenangan Lawless.',
        choices: [
          { id: 'view_memories', text: 'Melihat kenangan Lawless', nextScene: 'lawless_memories' },
          { id: 'ignore_crystal', text: 'Meletakkan kristal dan melanjutkan eksplorasi', nextScene: 'continue_exploration' }
        ]
      },
      'lawless_memories': {
        character: 'Lawless',
        text: 'Apa yang kau lakukan?! Kau... kau bisa melihat kenanganku?',
        choices: [
          { id: 'apologize_memories', text: 'Maaf, aku tidak sengaja', nextScene: 'memory_forgiveness' },
          { id: 'embrace_memories', text: 'Ini luar biasa! Aku bisa melihat masa lalumu!', nextScene: 'memory_connection' }
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
          { id: 'follow_passage', text: 'Mengikuti lorong', nextScene: 'deeper_areas' },
          { id: 'stay_stomach', text: 'Tetap di perut', nextScene: 'return_to_stomach' }
        ]
      },
      'deeper_areas': {
        text: 'Kau menemukan dirimu di ruangan yang lebih luas, dengan dinding yang berdetak seperti jantung. Di tengah ruangan ada sesuatu yang bersinar terang.',
        choices: [
          { id: 'approach_light', text: 'Mendekati cahaya', nextScene: 'core_discovery' },
          { id: 'observe_distance', text: 'Mengamati dari kejauhan', nextScene: 'distant_observation' }
        ]
      },
      'core_discovery': {
        text: 'Cahaya itu adalah inti dari kekuatan Lawless. Saat kau mendekatinya, kau merasakan energi yang luar biasa. Inti itu berdenyut dengan ritme yang hipnotis.',
        choices: [
          { id: 'touch_core', text: 'Menyentuh inti', nextScene: 'core_connection' },
          { id: 'study_core', text: 'Mempelajari inti dari dekat', nextScene: 'core_study' },
          { id: 'respect_core', text: 'Menghormati dan tidak menyentuh', nextScene: 'core_respected' },
          { id: 'sync_heartbeat', text: 'Menyesuaikan detak jantungmu', nextScene: 'heart_sync' }
        ],
        effect: () => {
          this.playSound('heartbeat');
          this.changeBackgroundMusic('intense');
        }
      },
      'relax_stomach': {
        text: 'Kau memutuskan untuk bersantai dan menikmati sensasi berada di dalam perut Lawless. Kehangatan menyelimutimu, dan kau merasakan detak jantungnya yang menenangkan.',
        choices: [
          { id: 'fall_asleep', text: 'Tertidur karena nyaman', nextScene: 'dream_sequence' },
          { id: 'meditate', text: 'Bermeditasi dan menyatu dengan energi', nextScene: 'energy_connection' }
        ]
      },
      'dream_sequence': {
        text: 'Dalam mimpimu, kau melihat dunia dari perspektif Lawless. Kau merasakan kekuatannya, keabadiannya, dan juga... kesepiannya.',
        choices: [
          { id: 'embrace_dream', text: 'Menerima visi dan menyatu dengannya', nextScene: 'dream_fusion' },
          { id: 'resist_dream', text: 'Melawan mimpi dan mempertahankan identitas', nextScene: 'dream_resistance' }
        ]
      },
      'communicate_stomach': {
        character: 'Lawless',
        text: 'Aku bisa mendengarmu, kau tahu. Bagaimana rasanya berada di dalam diriku?',
        choices: [
          { id: 'enjoy_inside', text: 'Ini... lebih nyaman dari yang kubayangkan', nextScene: 'enjoyment_response' },
          { id: 'ask_questions', text: 'Aku punya banyak pertanyaan', nextScene: 'question_session' },
          { id: 'express_concern', text: 'Aku sedikit khawatir...', nextScene: 'reassurance_dialogue' }
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
          // Play gulp sound
          this.playSound('gulp');
          // Change background music to more intense
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
    
    // Additional scenes for more variety
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
        text: 'Hmm, kau berani menegosiasikan dengan predator? Menarik... Berapa lama yang kau inginkan?',
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
          // Change background to deep purple
          document.body.style.background = 'linear-gradient(to bottom, #300a50, #120450)';
          // Play intense sound
          this.playSound('intense');
        }
      },
      'merge_complete': {
        text: 'Kau merasakan dirimu perlahan menyatu dengan Lawless. Kesadaranmu mulai berbaur dengan kesadarannya, menciptakan koneksi yang tak pernah kau bayangkan sebelumnya.',
        choices: [
          { id: 'new_perspective', text: 'Melihat dunia melalui mata Lawless', nextScene: 'shared_consciousness' }
        ],
        effect: () => {
          // Show largest belly environment
          this.showBellyEnvironment(3);
          // Play heartbeat sound
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
          // Show small belly environment
          this.showBellyEnvironment(1);
          // Play stomach sounds
          this.playSound('stomach');
        }
      },
      'stomach_medium': {
        text: 'Perut Lawless terasa luas dan nyaman. Dinding-dindingnya berkilau dengan cahaya biru lembut, menciptakan suasana yang hampir magis.',
        choices: [
          { id: 'relax_medium', text: 'Bersantai dan menikmati pemandangan', nextScene: 'medium_relaxation' },
          { id: 'interact_medium', text: 'Berinteraksi dengan lingkungan sekitar', nextScene: 'medium_interaction' }
        ],
        effect: () => {
          // Show medium belly environment
          this.showBellyEnvironment(2);
          // Play stomach and fluid sounds
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
          // Show large belly environment
          this.showBellyEnvironment(3);
          // Play all ambient sounds
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
          // Play mysterious sound
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
          // Change background music to more intense
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
          // Show large belly environment
          this.showBellyEnvironment(3);
          // Play gulp sound
          this.playSound('gulp');
        }
      },
      'respect_response': {
        character: 'Lawless',
        text: 'Berani tapi tetap menghormati... Kau bijaksana juga rupanya. Tapi tetap saja, kau akan menjadi santapanku.',
        choices: [
          { id: 'accept_fate', text: 'Aku... menerima takdirku', nextScene: 'willing_prey' },
          { id: 'request_gentle', text: 'Tolong lakukan dengan lembut', nextScene: 'gentle_vore' }
        ],
        effect: () => {
          // Change background music to more intense
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
          // Play gulp sound
          this.playSound('gulp');
        }
      },
      'swallow_scene_willing': {
        text: 'Kau menutup mata saat Lawless membuka mulutnya lebar. Kau merasakan lidahnya yang basah menyentuh kulitmu sebelum kegelapan menelanmu sepenuhnya.',
        choices: [
          { id: 'feel_throat', text: 'Merasakan sensasi di tenggorokannya', nextScene: 'throat_passage' }
        ],
        effect: () => {
          // Play gulp and fluid sounds
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
          // Play stomach sounds
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
          // Show small belly environment
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
          // Show medium belly environment
          this.showBellyEnvironment(2);
          // Play stomach and heartbeat sounds
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
          // Play fluid sound
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
          // Show larger belly environment
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
          // Play laugh sound
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
          // Change background music to calmer
          this.changeBackgroundMusic('playful');
        }
      },
      'peaceful_rest': {
        text: 'Kau meringkuk dalam kehangatan perut Lawless, detak jantungnya menjadi lagu pengantar tidur. Sensasi aneh tapi menenangkan menyelimutimu saat kau perlahan tertidur.',
        choices: [
          { id: 'dream_state', text: 'Masuk ke dalam mimpi', nextScene: 'vore_dream_sequence' }
        ],
        effect: () => {
          // Play heartbeat sound
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
          // Play gentle gulp sound
          this.playSound('gulp');
        }
      },
      'intimate_swallow': {
        text: 'Kau merasakan kehangatan lidah Lawless saat ia dengan lembut mendorongmu ke dalam mulutnya. Proses penelanan terasa intim dan hampir seperti pelukan yang erat.',
        choices: [
          { id: 'slide_down', text: 'Membiarkan dirimu meluncur ke dalam kerongkongannya', nextScene: 'gentle_descent' }
        ],
        effect: () => {
          // Play fluid sound
          this.playSound('fluid');
        }
      },
      'gentle_descent': {
        text: 'Kau meluncur dengan lembut melalui kerongkongan Lawless, merasakan dinding-dindingnya bergerak dengan ritme yang menenangkan. Tidak ada rasa takut, hanya sensasi aneh yang menyenangkan.',
        choices: [
          { id: 'enjoy_journey', text: 'Menikmati perjalanan ke bawah', nextScene: 'peaceful_arrival' }
        ],
        effect: () => {
          // Show small belly environment
          this.showBellyEnvironment(1);
        }
      },
      'peaceful_arrival': {
        text: 'Dengan lembut, kau mendarat di dalam perut Lawless. Ruangan itu terasa hangat dan nyaman, dengan cahaya kebiruan yang menerangi interior yang lembab namun tidak tidak menakutkan.',
        choices: [
          { id: 'look_around', text: 'Melihat sekeliling dengan takjub', nextScene: 'stomach_wonder' },
          { id: 'touch_walls', text: 'Menyentuh dinding perut dengan lembut', nextScene: 'wall_touching' }
        ],
        effect: () => {
          // Show medium belly environment
          this.showBellyEnvironment(2);
          // Play stomach sounds
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
          { id: 'stroke_gently', text: 'Mengelus dinding dengan lembut', nextScene: 'wall_stroking' },
          { id: 'press_curiously', text: 'Menekan dengan penasaran', nextScene: 'curious_pressing' }
        ]
      },
      'wall_stroking': {
        character: 'Lawless',
        text: 'Mmm~ Itu... terasa sangat menyenangkan. Jarang ada yang memperlakukan perutku dengan begitu lembut.',
        choices: [
          { id: 'continue_stroking', text: 'Melanjutkan mengelus dinding perut', nextScene: 'continued_stroking' },
          { id: 'ask_feeling', text: 'Apakah kau bisa merasakan semua yang kulakukan?', nextScene: 'sensation_explanation' }
        ],
        effect: () => {
          // Play pleased sound
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
          // Show larger belly environment
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
        text: 'Memang tidak. Kau... spesial. Aku merasakan koneksi yang tidak biasa denganmu.',
        choices: [
          { id: 'feel_same', text: 'Aku juga merasakannya', nextScene: 'mutual_connection' },
          { id: 'curious_meaning', text: 'Apa artinya itu?', nextScene: 'connection_meaning' }
        ],
        effect: () => {
          // Play heartbeat sound
          this.playSound('heartbeat');
        }
      },
      'mutual_connection': {
        character: 'Lawless',
        text: 'Mungkin takdir mempertemukan kita. Predator dan mangsa, terhubung dalam pengalaman intim yang jarang terjadi.',
        choices: [
          { id: 'embrace_fate', text: 'Menerima takdir ini', nextScene: 'fate_acceptance' },
          { id: 'temporary_visit', text: 'Tapi ini hanya kunjungan sementara, bukan?', nextScene: 'visit_clarification' }
        ]
      },
      'visit_promise': {
        character: 'Lawless',
        text: 'Aku akan menantikannya. Perutku akan selalu terbuka untukmu... secara harfiah.',
        effect: () => {
          // Play exit sound
          this.playSound('exit');
          // Exit after delay
          setTimeout(() => this.exitRoleplay(), 4000);
        }
      }
    };
    
    // Add new scenes and fallback scenes
    const newScenes = {
      'purpose_answer': {
        character: 'Lawless',
        text: 'Tujuanku? Hmm... Aku mencari jiwa-jiwa yang unik, yang bisa memahami dan mungkin... berbagi eksistensiku. Keabadian bisa sangat kesepian, kau tahu?',
        choices: [
          { id: 'empathize', text: 'Aku mengerti kesepianmu', nextScene: 'emotional_bond' },
          { id: 'question_motives', text: 'Mengapa memilihku?', nextScene: 'chosen_one' },
          { id: 'offer_company', text: 'Aku bisa menemanimu', nextScene: 'companionship' },
          { id: 'continue_questions', text: 'Aku masih punya pertanyaan lain', nextScene: 'more_questions' }
        ]
      },
      'more_questions': {
        character: 'Lawless',
        text: 'Masih penasaran? Tanyakan saja. Aku menikmati keingintahuanmu.',
        choices: [
          { id: 'ask_future', text: 'Apa yang akan terjadi padaku?', nextScene: 'future_revelation' },
          { id: 'ask_experience', text: 'Bagaimana dengan yang lain sebelumku?', nextScene: 'past_experiences' },
          { id: 'ask_feelings', text: 'Apa yang kau rasakan sekarang?', nextScene: 'current_feelings' },
          { id: 'ask_connection', text: 'Mengapa kita bisa terhubung?', nextScene: 'connection_explanation' }
        ]
      },
      'future_revelation': {
        character: 'Lawless',
        text: 'Masa depanmu? Itu tergantung pada pilihanmu sendiri. Kau bisa menjadi bagian dariku selamanya, atau hanya sebentar saja. Atau mungkin... sesuatu di antaranya?',
        choices: [
          { id: 'permanent_choice', text: 'Aku ingin menjadi bagian darimu selamanya', nextScene: 'eternal_bond' },
          { id: 'temporary_stay', text: 'Aku ingin mencobanya sebentar saja', nextScene: 'brief_experience' },
          { id: 'negotiate_terms', text: 'Bisakah kita mendiskusikan opsi lain?', nextScene: 'terms_discussion' },
          { id: 'accept_fate', text: 'Aku siap menerima apapun takdirku', nextScene: 'fate_acceptance' }
        ]
      },
    };
    
    // Add fallback scenes for missing scene references
    const fallbackScenes = {
      'fate_acceptance': {
        character: 'Lawless',
        text: 'Takdir memang kadang mengejutkan. Tapi aku senang takdir membawamu ke perutku.',
        choices: [
          { id: 'stay_longer', text: 'Bisakah aku tinggal lebih lama?', nextScene: 'extended_stay' },
          { id: 'prepare_leave', text: 'Mungkin sudah waktunya pergi', nextScene: 'visit_promise' }
        ]
      },
      'extended_stay': {
        character: 'Lawless',
        text: 'Tentu saja! Aku senang kau menikmati waktumu di dalam sini. Kita bisa menghabiskan waktu lebih lama bersama.',
        choices: [
          { id: 'tell_stories', text: 'Ceritakan tentang dirimu', nextScene: 'lawless_stories' },
          { id: 'cuddle_inside', text: 'Meringkuk nyaman di dalam', nextScene: 'comfort_cuddling' }
        ]
      },
      'lawless_stories': {
        character: 'Lawless',
        text: 'Ah, kau ingin mendengar ceritaku? Baiklah... Aku sudah hidup sangat lama, dan memiliki banyak pengalaman menarik...',
        choices: [
          { id: 'listen_more', text: 'Mendengarkan dengan penuh minat', nextScene: 'story_continuation' },
          { id: 'share_thoughts', text: 'Berbagi pendapat tentang ceritanya', nextScene: 'story_discussion' }
        ]
      },
      'comfort_cuddling': {
        text: 'Kau meringkuk nyaman di dalam perut Lawless, merasakan kehangatan dan kelembutan yang menyelimutimu. Dinding perutnya bergerak lembut mengikuti napasnya.',
        choices: [
          { id: 'drift_sleep', text: 'Terlelap dalam kehangatan', nextScene: 'peaceful_sleep' },
          { id: 'gentle_rub', text: 'Mengelus dinding perut dengan lembut', nextScene: 'wall_stroking' }
        ]
      },
      'peaceful_sleep': {
        text: 'Dalam tidurmu yang nyenyak, kau merasakan koneksi yang semakin dalam dengan Lawless. Detak jantungnya menjadi irama yang menenangkan.',
        choices: [
          { id: 'wake_later', text: 'Terbangun setelah beberapa saat', nextScene: 'wake_up_inside' },
          { id: 'continue_rest', text: 'Melanjutkan istirahat', nextScene: 'extended_rest' }
        ]
      }
    };
    
    return scenes[sceneId] || fallbackScenes[sceneId] || {
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
    if (this.audioElements[soundId]) {
      // Clone the audio to allow overlapping sounds
      const sound = this.audioElements[soundId].cloneNode();
      sound.volume = 0.4;
      sound.play();
    }
  },
  
  // Play background music
  playBackgroundMusic(musicId) {
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
    
    // Stop all audio
    if (this.backgroundMusic) {
      this.backgroundMusic.pause();
    }
    
    Object.values(this.audioElements).forEach(audio => {
      audio.pause();
      audio.currentTime = 0;
    });
    
    // Remove glitch overlay
    const glitchOverlay = document.querySelector('.glitch-overlay');
    if (glitchOverlay) {
      glitchOverlay.remove();
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
    
    // Reset background
    document.body.style.background = '';
  }
};

// Initialize the easter egg when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  voreEasterEgg.init();
});