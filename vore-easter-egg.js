// Easter Egg Feature - Vore Roleplay Game
// Triggered when user types "vore" on the Lore Page

const voreEasterEgg = {
  isActive: false,
  keySequence: [],
  targetSequence: "vore",
  bellySize: 1, // 1: small, 2: medium, 3: large
  currentScene: 'intro',
  playerChoices: [],
  playerName: '', // Store player's name for personalized dialog
  customCursor: null,
  originalContent: null,
  originalCursor: null,
  commandListener: null,
  exitButton: null,
  
  // Initialize the easter egg
  init() {
    // Only initialize on the lore page
    if (!document.getElementById('lore')) return;
    
    // Set up key listener
    this.setupKeyListener();
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
    
    // Notify audio system that easter egg is active
    if (window.audioSystem) {
      window.audioSystem.setEasterEggState(true);
    }
    
    // Apply glitch effect to the screen
    this.applyGlitchEffect();
    
    // Play intro sound
    this.playSound('intro');
    
    // Change navigation menu to pink
    this.changeNavToPink();
    
    // Block page navigation
    this.blockPageNavigation();
    
    // Start the roleplay game after the glitch effect
    setTimeout(() => {
      this.startRoleplay();
    }, 2000);
  },
  
  // Apply glitch effect to the screen - enhanced version for transition only
  applyGlitchEffect() {
    const loreContainer = document.querySelector('.lore-container');
    
    // Create fade overlay for initial smooth transition
    const fadeOverlay = document.createElement('div');
    fadeOverlay.className = 'fade-overlay';
    fadeOverlay.style.opacity = '0';
    fadeOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    fadeOverlay.style.transition = 'opacity 0.5s ease-in-out';
    document.body.appendChild(fadeOverlay);
    
    // Create glitch overlay with initial subtle effect
    const glitchOverlay = document.createElement('div');
    glitchOverlay.className = 'glitch-overlay';
    glitchOverlay.style.opacity = '0.3';
    glitchOverlay.style.animation = 'glitch-animation 0.2s ease-in-out infinite';
    document.body.appendChild(glitchOverlay);
    
    // Apply CRT distortion effect
    const crtEffect = document.createElement('div');
    crtEffect.className = 'crt-effect';
    crtEffect.style.opacity = '0.3';
    document.body.appendChild(crtEffect);
    
    // Create pink overlay for transition
    const pinkOverlay = document.createElement('div');
    pinkOverlay.style.position = 'fixed';
    pinkOverlay.style.top = '0';
    pinkOverlay.style.left = '0';
    pinkOverlay.style.width = '100%';
    pinkOverlay.style.height = '100%';
    pinkOverlay.style.backgroundColor = 'rgba(255, 0, 255, 0)';
    pinkOverlay.style.pointerEvents = 'none';
    pinkOverlay.style.zIndex = '9997';
    pinkOverlay.style.transition = 'background-color 3s ease-in-out';
    pinkOverlay.style.mixBlendMode = 'overlay';
    document.body.appendChild(pinkOverlay);
    
    // Create color shift overlay for enhanced glitch effect
    const colorShiftOverlay = document.createElement('div');
    colorShiftOverlay.className = 'color-shift-overlay';
    colorShiftOverlay.style.position = 'fixed';
    colorShiftOverlay.style.top = '0';
    colorShiftOverlay.style.left = '0';
    colorShiftOverlay.style.width = '100%';
    colorShiftOverlay.style.height = '100%';
    colorShiftOverlay.style.background = 'linear-gradient(45deg, rgba(255,0,255,0.2), rgba(0,255,255,0.2), rgba(255,0,128,0.2))';
    colorShiftOverlay.style.backgroundSize = '400% 400%';
    colorShiftOverlay.style.animation = 'gradient-shift 3s ease infinite';
    colorShiftOverlay.style.opacity = '0';
    colorShiftOverlay.style.pointerEvents = 'none';
    colorShiftOverlay.style.zIndex = '9996';
    colorShiftOverlay.style.mixBlendMode = 'color-dodge';
    document.body.appendChild(colorShiftOverlay);
    
    // Add keyframes for gradient shift animation if not already present
    if (!document.querySelector('#gradient-shift-keyframes')) {
      const keyframes = document.createElement('style');
      keyframes.id = 'gradient-shift-keyframes';
      keyframes.textContent = `
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; filter: hue-rotate(0deg); }
          50% { background-position: 100% 50%; filter: hue-rotate(180deg); }
          100% { background-position: 0% 50%; filter: hue-rotate(360deg); }
        }
        
        @keyframes glitch-color {
          0% { filter: hue-rotate(0deg) saturate(100%); }
          33% { filter: hue-rotate(120deg) saturate(200%); }
          66% { filter: hue-rotate(240deg) saturate(200%); }
          100% { filter: hue-rotate(360deg) saturate(100%); }
        }
      `;
      document.head.appendChild(keyframes);
    }
    
    // Play glitch sound effect (3 seconds duration)
    if (window.audioSystem && window.audioSystem.soundEffects['glitch']) {
      // Use the existing sound effect system
      const glitchSound = window.audioSystem.soundEffects['glitch'].cloneNode();
      glitchSound.volume = window.audioSystem.currentVolume;
      glitchSound.play()
        .catch(error => console.warn(`Error playing glitch sound: ${error.message}`));
    }
    
    // Synchronize visual effects with the 3-second glitch sound
    // Phase 1: Subtle initial glitch (0-0.5s)
    setTimeout(() => {
      fadeOverlay.style.opacity = '0.5';
      colorShiftOverlay.style.opacity = '0.3';
    }, 100);
    
    // Phase 2: Intensify glitch (0.5-1.5s)
    setTimeout(() => {
      glitchOverlay.style.opacity = '0.7';
      glitchOverlay.style.animation = 'glitch-animation 0.1s ease-in-out infinite';
      document.body.classList.add('screen-shake');
      crtEffect.style.opacity = '0.6';
      pinkOverlay.style.backgroundColor = 'rgba(255, 0, 255, 0.2)';
      colorShiftOverlay.style.opacity = '0.6';
      colorShiftOverlay.style.animation = 'gradient-shift 2s ease infinite, glitch-color 3s infinite';
    }, 500);
    
    // Phase 3: Peak glitch effect (1.5-2.5s)
    setTimeout(() => {
      glitchOverlay.style.opacity = '1';
      glitchOverlay.style.animation = 'glitch-animation 0.05s ease-in-out infinite';
      document.body.classList.add('intense-glitch');
      document.body.classList.add('distortion');
      crtEffect.style.opacity = '1';
      pinkOverlay.style.backgroundColor = 'rgba(255, 0, 255, 0.4)';
      colorShiftOverlay.style.opacity = '0.8';
      colorShiftOverlay.style.animation = 'gradient-shift 1s ease infinite, glitch-color 2s infinite';
    }, 1500);
    
    // Phase 4: Begin fade out (2.5-3s)
    setTimeout(() => {
      fadeOverlay.style.opacity = '0.8';
      document.body.classList.remove('screen-shake');
      document.body.classList.remove('intense-glitch');
      document.body.classList.remove('distortion');
    }, 2500);
    
    // Final cleanup after effect completes
    setTimeout(() => {
      // Fade out all effects
      glitchOverlay.style.opacity = '0';
      crtEffect.style.opacity = '0';
      fadeOverlay.style.opacity = '0';
      pinkOverlay.style.opacity = '0';
      colorShiftOverlay.style.opacity = '0';
      
      // Remove elements after fade out
      setTimeout(() => {
        [glitchOverlay, crtEffect, fadeOverlay, pinkOverlay, colorShiftOverlay].forEach(element => {
          if (element && element.parentNode) {
            element.parentNode.removeChild(element);
          }
        });
      }, 500);
    }, 3000);
  },
  
  // Change navigation menu to pink
  changeNavToPink() {
    // Store original nav styles for restoration later
    this.originalNavStyles = {};
    
    // Style the main navigation
    const navElements = document.querySelectorAll('.nav, .nav-link, .menu, .menu li a');
    navElements.forEach(nav => {
      // Store original styles
      this.originalNavStyles[nav.className] = nav.style.cssText;
      
      // Apply pink styles
      nav.style.backgroundColor = 'var(--vore-bg-dark)';
      nav.style.borderColor = 'var(--vore-accent)';
      nav.style.boxShadow = '0 0 15px var(--vore-accent)';
      nav.style.color = 'var(--vore-accent)';
      nav.style.transition = 'all 0.5s ease';
    });
    
    // Style specifically the nav links
    const navLinks = document.querySelectorAll('.nav-link, .menu li a');
    navLinks.forEach(link => {
      link.style.color = 'var(--vore-accent)';
      link.style.textShadow = '0 0 5px var(--vore-accent)';
      
      // Add hover effect with CSS
      link.addEventListener('mouseenter', () => {
        if (this.isActive) {
          link.style.backgroundColor = 'rgba(255, 0, 255, 0.3)';
          link.style.boxShadow = '0 0 10px var(--vore-accent)';
        }
      });
      
      link.addEventListener('mouseleave', () => {
        if (this.isActive) {
          link.style.backgroundColor = 'transparent';
          link.style.boxShadow = 'none';
        }
      });
    });
  },
  
  // Block page navigation during easter egg mode
  blockPageNavigation() {
    // Store original click handlers
    this.originalNavHandlers = [];
    
    // Get all navigation links
    const navLinks = document.querySelectorAll('.nav-link, .menu li a');
    
    // Disable all navigation links
    navLinks.forEach(link => {
      // Clone the link to remove event listeners
      const newLink = link.cloneNode(true);
      
      // Add a new click handler that prevents navigation
      newLink.addEventListener('click', (e) => {
        if (this.isActive) {
          e.preventDefault();
          e.stopPropagation();
          
          // Show a message that navigation is blocked
          this.showBlockedNavigationMessage();
          
          // Play a sound effect
          if (window.audioSystem) {
            window.audioSystem.playSound('gulp');
          }
          
          return false;
        }
      });
      
      // Replace the original link
      link.parentNode.replaceChild(newLink, link);
    });
    
    // Also block history navigation
    this.originalPopStateHandler = window.onpopstate;
    window.onpopstate = (e) => {
      if (this.isActive) {
        e.preventDefault();
        history.pushState(null, document.title, window.location.href);
        this.showBlockedNavigationMessage();
        return false;
      }
    };
    
    // Push a new history state to prevent back button
    history.pushState(null, document.title, window.location.href);
  },
  
  // Show a message that navigation is blocked
  showBlockedNavigationMessage() {
    // Create a message element if it doesn't exist
    if (!document.querySelector('.blocked-nav-message')) {
      const message = document.createElement('div');
      message.className = 'blocked-nav-message';
      message.textContent = 'You cannot escape the vore experience! 🐉';
      message.style.position = 'fixed';
      message.style.top = '20%';
      message.style.left = '50%';
      message.style.transform = 'translateX(-50%)';
      message.style.backgroundColor = 'rgba(255, 0, 255, 0.8)';
      message.style.color = 'white';
      message.style.padding = '15px 25px';
      message.style.borderRadius = '10px';
      message.style.fontFamily = 'Orbitron, sans-serif';
      message.style.zIndex = '10000';
      message.style.boxShadow = '0 0 20px var(--vore-accent)';
      message.style.opacity = '0';
      message.style.transition = 'opacity 0.3s ease-in-out';
      document.body.appendChild(message);
      
      // Show and hide the message
      setTimeout(() => {
        message.style.opacity = '1';
        setTimeout(() => {
          message.style.opacity = '0';
          setTimeout(() => {
            if (message.parentNode) {
              message.parentNode.removeChild(message);
            }
          }, 300);
        }, 2000);
      }, 10);
    }
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
    if (window.audioSystem) {
      window.audioSystem.playBackgroundMusic('playful');
    }
    
    // Show name input prompt before starting the dialog
    this.showNameInputPrompt();
  },
  
  // Show name input prompt
  showNameInputPrompt() {
    const roleplayContainer = document.querySelector('.roleplay-container');
    roleplayContainer.innerHTML = '';
    
    // Create name input container
    const nameInputContainer = document.createElement('div');
    nameInputContainer.className = 'name-input-container';
    nameInputContainer.style.display = 'flex';
    nameInputContainer.style.flexDirection = 'column';
    nameInputContainer.style.alignItems = 'center';
    nameInputContainer.style.justifyContent = 'center';
    nameInputContainer.style.padding = '20px';
    nameInputContainer.style.backgroundColor = 'rgba(255, 0, 255, 0.2)';
    nameInputContainer.style.borderRadius = '10px';
    nameInputContainer.style.boxShadow = '0 0 20px rgba(255, 0, 255, 0.5)';
    nameInputContainer.style.margin = '20px auto';
    nameInputContainer.style.maxWidth = '400px';
    
    // Create prompt text
    const promptText = document.createElement('div');
    promptText.textContent = 'Sebelum kita mulai... siapa namamu?';
    promptText.style.color = 'var(--vore-accent)';
    promptText.style.fontSize = '1.5rem';
    promptText.style.marginBottom = '20px';
    promptText.style.textAlign = 'center';
    promptText.style.fontFamily = 'Orbitron, sans-serif';
    promptText.style.textShadow = '0 0 10px var(--vore-accent)';
    
    // Create input field
    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.placeholder = 'Masukkan namamu...';
    nameInput.style.padding = '10px 15px';
    nameInput.style.fontSize = '1.2rem';
    nameInput.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    nameInput.style.color = 'white';
    nameInput.style.border = '2px solid var(--vore-accent)';
    nameInput.style.borderRadius = '5px';
    nameInput.style.outline = 'none';
    nameInput.style.width = '80%';
    nameInput.style.marginBottom = '20px';
    nameInput.style.boxShadow = '0 0 10px var(--vore-accent)';
    nameInput.style.textAlign = 'center';
    
    // Add focus effect
    nameInput.addEventListener('focus', () => {
      nameInput.style.boxShadow = '0 0 15px var(--vore-accent)';
    });
    
    nameInput.addEventListener('blur', () => {
      nameInput.style.boxShadow = '0 0 10px var(--vore-accent)';
    });
    
    // Create submit button
    const submitButton = document.createElement('button');
    submitButton.textContent = 'Lanjutkan';
    submitButton.style.padding = '10px 20px';
    submitButton.style.fontSize = '1.2rem';
    submitButton.style.backgroundColor = 'var(--vore-bg-dark)';
    submitButton.style.color = 'var(--vore-accent)';
    submitButton.style.border = '2px solid var(--vore-accent)';
    submitButton.style.borderRadius = '5px';
    submitButton.style.cursor = 'pointer';
    submitButton.style.boxShadow = '0 0 10px var(--vore-accent)';
    submitButton.style.transition = 'all 0.3s ease';
    
    // Add hover effect
    submitButton.addEventListener('mouseenter', () => {
      submitButton.style.backgroundColor = 'var(--vore-accent)';
      submitButton.style.color = 'var(--vore-bg-dark)';
      submitButton.style.boxShadow = '0 0 15px var(--vore-accent)';
    });
    
    submitButton.addEventListener('mouseleave', () => {
      submitButton.style.backgroundColor = 'var(--vore-bg-dark)';
      submitButton.style.color = 'var(--vore-accent)';
      submitButton.style.boxShadow = '0 0 10px var(--vore-accent)';
    });
    
    // Handle submit
    const handleSubmit = () => {
      // Get the name from input
      let name = nameInput.value.trim();
      
      // If name is empty, use a default name
      if (name === '') {
        name = 'Tamu';
      }
      
      // Store the name
      this.playerName = name;
      
      // Play sound effect
      this.playSound('gulp');
      
      // Show intro scene
      this.showScene('intro');
    };
    
    // Add event listeners for submit
    submitButton.addEventListener('click', handleSubmit);
    nameInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        handleSubmit();
      }
    });
    
    // Add elements to container
    nameInputContainer.appendChild(promptText);
    nameInputContainer.appendChild(nameInput);
    nameInputContainer.appendChild(submitButton);
    
    // Add container to roleplay container
    roleplayContainer.appendChild(nameInputContainer);
    
    // Focus on input field
    setTimeout(() => nameInput.focus(), 500);
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
    // Handle text that might be a function (for personalized dialog)
    let dialogContent = typeof scene.text === 'function' ? scene.text.call(this) : scene.text;
    this.typeText(dialogText, dialogContent, () => {
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
    
    // Adjust sounds based on belly size if audio system is available
    if (window.audioSystem && window.audioSystem.audioElements['stomach']) {
      const stomachVolume = 0.3 + (size * 0.2);
      window.audioSystem.audioElements['stomach'].volume = stomachVolume;
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
        text: function() {
          return `Oh? ${this.playerName}, kau benar-benar masih di sini?\nLucu sekali… seolah kau menginginkan ini terjadi. Atau mungkin kau hanya penasaran dengan apa yang bisa kulakukan padamu?`;
        },
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
        text: function() {
          return `Penasaran, hmm? Aku suka rasa ingin tahu yang berani, ${this.playerName}. Kau tahu, tidak banyak yang berani mengakui ketertarikan mereka padaku. Kebanyakan terlalu takut... atau terlalu malu.`;
        },
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
        text: function() {
          return `Mereka yang penasaran? Oh, mereka biasanya berakhir... di dalam diriku. Tapi pengalaman setiap orang berbeda. Ada yang melawan, ada yang menyerah, dan ada yang... menikmatinya. Aku penasaran bagaimana denganmu, ${this.playerName}.`;
        },
        choices: [
          { id: 'ask_experience', text: 'Bagaimana rasanya bagimu?', nextScene: 'lawless_experience' },
          { id: 'volunteer', text: 'Bagaimana jika... aku menawarkan diri?', nextScene: 'volunteer_response' },
          { id: 'reconsider', text: 'Kurasa aku perlu memikirkan ini lagi...', nextScene: 'capture' }
        ],
        effect: () => {
          this.playSound('heartbeat');
        }
      },

      'lawless_experience': {
        character: 'Lawless',
        text: function() {
          return `Rasanya? Mmm... setiap mangsa memberikan sensasi yang berbeda. Ada yang memberontak, membuat perutku bergejolak dengan menyenangkan. Ada yang pasrah, membiarkan dirinya dimanjakan oleh kehangatan tubuhku. Tapi yang paling kusukai... adalah mereka yang menikmati setiap detiknya. Aku bertanya-tanya, ${this.playerName}, apakah kau akan menikmatinya?`;
        },
        choices: [
          { id: 'intrigued', text: 'Bagaimana denganku? Apa yang akan kau rasakan?', nextScene: 'pre_swallow' },
          { id: 'hesitate', text: 'Itu... terdengar menakutkan...', nextScene: 'reassurance_dialogue' },
          { id: 'excited', text: 'Aku ingin merasakannya...', nextScene: 'volunteer_response' }
        ],
        effect: () => {
          this.playSound('stomach');
        }
      },

      'volunteer_response': {
        character: 'Lawless',
        text: function() {
          return `Oh? Menawarkan diri? ${this.playerName}, kau benar-benar menarik... Tidak banyak yang memiliki keberanian sepertimu. Aku akan memastikan ini menjadi pengalaman yang tak terlupakan.`;
        },
        choices: [
          { id: 'ready', text: 'Aku siap... tunjukkan padaku', nextScene: 'pre_swallow' },
          { id: 'nervous', text: 'Tunggu, aku perlu waktu...', nextScene: 'temporary_stay_offer' },
          { id: 'playful', text: 'Buktikan kalau kau bisa membuatku menikmatinya', nextScene: 'swallow_flirt' }
        ],
        effect: () => {
          this.changeBackgroundMusic('playful');
          this.playSound('heartbeat');
        }
      },

      'pre_swallow': {
        character: 'Lawless',
        text: function() {
          return `Kemarilah, ${this.playerName}... Biarkan aku membelai tubuhmu dengan lidahku terlebih dahulu. Rasakan bagaimana aku akan menikmati setiap inci dirimu sebelum menelanmu bulat-bulat...`;
        },
        choices: [
          { id: 'submit', text: 'Memejamkan mata, menyerahkan diri', nextScene: 'swallow_gentle' },
          { id: 'watch', text: 'Menatap dengan penuh antisipasi', nextScene: 'swallow_view' },
          { id: 'embrace', text: 'Memeluk lidahnya yang hangat', nextScene: 'tongue_exploration' }
        ],
        effect: () => {
          this.playSound('gulp');
          document.body.style.transition = 'filter 1.5s ease';
          document.body.style.filter = 'brightness(0.8) blur(2px)';
          setTimeout(() => {
            document.body.style.filter = '';
          }, 1500);
        }
      },
      
      // Scene 2: The Capture (Domination Begins)
      'capture': {
        character: 'Lawless',
        text: function() {
          return `Ahaha… sudah terlambat untuk kabur sekarang, ${this.playerName}.\nAku ingin melihat ekspresi terbaikmu saat aku menelanmu bulat-bulat. Kau bisa merasakan bagaimana lidahku akan menjilati seluruh tubuhmu sebelum mendorongmu ke dalam kerongkonganku yang hangat.`;
        },
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
        text: function() {
          return `Apa yang bisa kulakukan? Hmm... ${this.playerName}, kau benar-benar ingin tahu, ya?\nAku suka mangsa yang punya... nyali. Mungkin aku akan menikmati menelanmu... perlahan. Merasakan setiap inci tubuhmu meluncur di kerongkonganku.`;
        },
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
        text: function() {
          return `Mmm~ Pertanyaan yang menarik, ${this.playerName}. Di dalamku? Hangat, basah, dan sangat... intim. Kau akan merasakan dinding-dinding perutku bergerak di sekitarmu, detak jantungku yang menggetarkan seluruh tubuhmu, dan sensasi yang tak pernah kau rasakan sebelumnya.`;
        },
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
        text: function() {
          return `Gemetar seperti itu... sangat menggemaskan, ${this.playerName}.\nKau tahu apa yang akan terjadi, tapi tetap di sini. Kau memang menarik. Aku akan menikmati setiap inci tubuhmu di dalam perutku. Mungkin kau juga akan menikmatinya... banyak yang akhirnya menyukai sensasi hangat di dalamku.`;
        },
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
        text: function() {
          return `Di dalam sana? ${this.playerName}, kau akan merasakan kehangatan yang belum pernah kau rasakan sebelumnya. Dinding-dinding perutku akan memelukmu dengan lembut, detak jantungku akan menjadi musik pengantar tidurmu. Kau akan menjadi bagian dariku... untuk sementara atau selamanya, tergantung bagaimana kau menyikapinya.`;
        },
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
        text: function() {
          return `Sementara? Hmm... itu bisa diatur, ${this.playerName}. Aku bisa menjadikanmu tamuku untuk beberapa waktu, merasakan sensasi berada di dalam diriku tanpa menjadi bagian dariku selamanya. Bagaimana menurutmu?`;
        },
        choices: [
          { id: 'accept_temp', text: 'Ya, aku ingin mencobanya...', nextScene: 'swallow_gentle' },
          { id: 'negotiate_terms', text: 'Berapa lama... aku akan di dalam?', nextScene: 'negotiation' },
          { id: 'too_scared', text: 'Maaf, aku terlalu takut...', nextScene: 'respect_fear' }
        ],
        effect: () => {
          this.changeBackgroundMusic('playful');
        }
      },

      'negotiation': {
        character: 'Lawless',
        text: function() {
          return `Hmm... bagaimana dengan satu jam? Cukup lama untuk merasakan setiap sensasi, tapi tidak terlalu lama untuk membuatmu khawatir, ${this.playerName}. Aku akan sangat lembut, dan kau bisa merasakan bagaimana rasanya berada di dalam diriku...`;
        },
        choices: [
          { id: 'agree_time', text: 'Satu jam... terdengar pas', nextScene: 'temporary_swallow' },
          { id: 'want_shorter', text: 'Bisakah... lebih singkat?', nextScene: 'shorter_negotiation' },
          { id: 'want_longer', text: 'Mungkin... bisa lebih lama?', nextScene: 'longer_negotiation' }
        ],
        effect: () => {
          this.playSound('heartbeat');
        }
      },

      'shorter_negotiation': {
        character: 'Lawless',
        text: function() {
          return `Lebih singkat? Baiklah... tiga puluh menit, ${this.playerName}? Tapi kau mungkin akan menyesal tidak mengambil waktu lebih lama untuk menikmati setiap sensasinya...`;
        },
        choices: [
          { id: 'accept_shorter', text: 'Ya, itu lebih baik', nextScene: 'temporary_swallow' },
          { id: 'reconsider_time', text: 'Mungkin satu jam tidak buruk...', nextScene: 'negotiation' },
          { id: 'too_nervous', text: 'Maaf, aku masih ragu...', nextScene: 'respect_fear' }
        ],
        effect: () => {
          this.playSound('stomach');
        }
      },

      'longer_negotiation': {
        character: 'Lawless',
        text: function() {
          return `Mmm~ Kau ingin lebih lama, ${this.playerName}? Dua jam? Itu akan memberi kita banyak waktu untuk... bersenang-senang. Kau bisa benar-benar merasakan seperti apa menjadi bagian dariku...`;
        },
        choices: [
          { id: 'accept_longer', text: 'Ya... aku ingin merasakannya lebih lama', nextScene: 'temporary_swallow' },
          { id: 'stick_to_hour', text: 'Mungkin satu jam saja cukup', nextScene: 'negotiation' },
          { id: 'want_permanent', text: 'Bagaimana kalau... selamanya?', nextScene: 'volunteer_response' }
        ],
        effect: () => {
          this.changeBackgroundMusic('playful');
          this.playSound('stomach');
        }
      },

      'temporary_swallow': {
        character: 'Lawless',
        text: function() {
          return `Baiklah, ${this.playerName}, waktunya menikmati pengalaman spesialmu~ Bersiaplah merasakan lidahku yang hangat menjilati tubuhmu sebelum menelanmu dengan lembut...`;
        },
        choices: [
          { id: 'ready_temp', text: 'Aku siap... lakukan dengan lembut', nextScene: 'swallow_gentle' },
          { id: 'watch_process', text: 'Aku ingin melihat prosesnya', nextScene: 'swallow_view' },
          { id: 'last_request', text: 'Tunggu, satu permintaan terakhir...', nextScene: 'last_request' }
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
      
      'respect_fear': {
        character: 'Lawless',
        text: function() {
          return `Ketakutan adalah hal yang wajar, ${this.playerName}. Tapi kadang, pengalaman terbaik datang dari melangkah melewati ketakutanmu. Mungkin lain kali kau akan lebih... berani.`;
        },
        choices: [
          { id: 'reconsider', text: 'Tunggu... mungkin aku bisa mencoba', nextScene: 'swallow_gentle' },
          { id: 'firm_no', text: 'Tidak, aku tetap tidak bisa', nextScene: 'polite_exit' }
        ],
        effect: () => {
          this.playSound('heartbeat');
        }
      },

      'reassurance_dialogue': {
        character: 'Lawless',
        text: function() {
          return `Khawatir? Tenang saja, ${this.playerName}... Aku bisa sangat lembut pada mereka yang kusukai. Dan kau... ada sesuatu yang spesial darimu. Aku bisa merasakan getaran ketakutan dan ketertarikanmu yang bercampur menjadi satu.`;
        },
        choices: [
          { id: 'trust', text: 'Aku... aku percaya padamu', nextScene: 'swallow_gentle' },
          { id: 'still_scared', text: 'Tapi bagaimana jika...', nextScene: 'more_reassurance' },
          { id: 'admit_attraction', text: 'Ya... aku memang tertarik padamu', nextScene: 'volunteer_response' }
        ],
        effect: () => {
          this.changeBackgroundMusic('playful');
          this.playSound('heartbeat');
        }
      },

      'more_reassurance': {
        character: 'Lawless',
        text: function() {
          return `Sshhh... Tidak perlu takut, ${this.playerName}. Aku bisa memberimu pengalaman sementara jika kau mau. Merasakan kehangatan dan kenyamanan di dalam diriku, tanpa harus menjadi bagian dariku selamanya. Bagaimana?`;
        },
        choices: [
          { id: 'accept_temp', text: 'Baiklah... aku mau mencoba', nextScene: 'temporary_stay_offer' },
          { id: 'need_time', text: 'Aku masih perlu waktu...', nextScene: 'respect_fear' },
          { id: 'want_permanent', text: 'Bagaimana kalau... selamanya?', nextScene: 'volunteer_response' }
        ],
        effect: () => {
          this.playSound('stomach');
        }
      },
      
      // Scene 3: The Swallow (Vore Sequence)
      'swallow_negotiate': {
        character: 'Lawless',
        text: function() {
          return `Jadi, ${this.playerName}... kau ingin bernegosiasi? Menarik. Apa yang bisa ditawarkan oleh makanan kepada predatornya? Mungkin kita bisa mencapai... kesepakatan yang memuaskan kedua belah pihak.`;
        },
        choices: [
          { id: 'surrender', text: 'Aku menyerah padamu', nextScene: 'negotiated_surrender' },
          { id: 'last_wish', text: 'Aku punya permintaan terakhir', nextScene: 'last_request' }
        ]
      },
      
      'last_request': {
        character: 'Lawless',
        text: function() {
          return `Permintaan terakhir? Hmm, menarik, ${this.playerName}. Apa yang diinginkan oleh seseorang yang akan menjadi bagian dariku?`;
        },
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
        text: function() {
          return `Spesial? Oh, ${this.playerName}, kau pasti akan menjadi kenangan yang spesial. Tidak banyak yang memiliki keberanian untuk meminta hal seperti itu. Aku akan mengingatmu... bahkan saat kau menjadi bagian dariku.`;
        },
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
        text: function() {
          return `Menyerah dengan begitu anggun, ${this.playerName}... Aku menghargai itu. Kau akan menjadi pengalaman yang menyenangkan. Bersiaplah untuk sensasi yang belum pernah kau rasakan sebelumnya.`;
        },
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
          { id: 'observe_descent', text: 'Mengamati perjalananmu ke bawah', nextScene: 'throat_journey' },
          { id: 'savor_moment', text: 'Menikmati setiap sensasi', nextScene: 'sensory_experience' },
          { id: 'close_eyes', text: 'Memejamkan mata', nextScene: 'darkness_descent' }
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

      'sensory_experience': {
        text: 'Kau merasakan setiap detail sensasi saat Lawless menelanmu. Lidahnya yang hangat dan basah, otot-otot kerongkongannya yang bergerak ritmis, dan detak jantungnya yang semakin jelas terdengar saat kau semakin dalam.',
        choices: [
          { id: 'continue_descent', text: 'Melanjutkan perjalanan ke bawah', nextScene: 'throat_journey' },
          { id: 'embrace_warmth', text: 'Menikmati kehangatan', nextScene: 'stomach_gentle' }
        ],
        effect: () => {
          this.playSound('stomach');
          this.playSound('heartbeat');
        }
      },

      'darkness_descent': {
        text: 'Dalam kegelapan, inderamu menjadi lebih tajam. Kau bisa merasakan setiap gerakan, setiap kontraksi otot yang mendorongmu semakin dalam. Suara detak jantung Lawless menjadi panduan dalam kegelapan ini.',
        choices: [
          { id: 'trust_descent', text: 'Mempercayakan diri pada prosesnya', nextScene: 'stomach_gentle' },
          { id: 'open_eyes', text: 'Membuka mata kembali', nextScene: 'throat_journey' }
        ],
        effect: () => {
          this.playSound('gulp');
          this.changeBackgroundMusic('intense');
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
        text: function() {
          return `Menantangku? Berani sekali, ${this.playerName}...\nAku akan menikmati setiap detik saat kau berjuang di dalam perutku. Rasakan bagaimana dinding-dinding tenggorokanku meremas tubuhmu...`;
        },
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
        text: function() {
          return `Pasrah seperti itu... sangat manis, ${this.playerName}.\nKau akan menjadi pengalaman yang menyenangkan. Rasakan bagaimana lidahku menjilati seluruh tubuhmu sebelum menelanmu bulat-bulat...`;
        },
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
        text: function() {
          return `Bersenang-senang? Aku suka caramu berpikir, ${this.playerName}.\nMari kita lihat seberapa menyenangkan kau di dalam perutku. Aku akan menelanmu dengan penuh gairah, merasakan setiap lekuk tubuhmu...`;
        },
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
        text: function() {
          return `Menanganimu? Oh sayang... ${this.playerName}, kau tidak tahu apa yang kau hadapi. Lidahku sudah tidak sabar menjilati seluruh tubuhmu sebelum mendorongmu ke dalam kerongkonganku yang basah dan hangat...`;
        },
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
        text: function() {
          return `Menyerah begitu cepat, ${this.playerName}? Padahal aku baru mulai bersenang-senang. Rasakan bagaimana lidahku membelai tubuhmu... perlahan... menikmati setiap inci...`;
        },
        choices: [
          { id: 'shiver', text: 'Gemetar dalam antisipasi', nextScene: 'slow_teasing_swallow' }
        ],
        effect: () => {
          this.playSound('heartbeat');
        }
      },
      
      'slow_teasing_swallow': {
        character: 'Lawless',
        text: function() {
          return `Mmm~ ${this.playerName}, kau gemetar begitu manis. Aku bisa merasakan detak jantungmu yang cepat. Jangan khawatir, aku akan menelanmu dengan sangat... sangat... perlahan...`;
        },
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
        text: function() {
          return `Kau terasa sangat lezat, ${this.playerName}~ Sekarang... biarkan aku menelanmu perlahan. Rasakan bagaimana tenggorokanku meremas tubuhmu saat kau meluncur ke bawah...`;
        },
        choices: [
          { id: 'surrender_completely', text: 'Menyerahkan diri sepenuhnya pada sensasi', nextScene: 'stomach_playful' }
        ],
        effect: () => {
          this.playSound('gulp');
        }
      },
      
      'intense_swallow_scene': {
        character: 'Lawless',
        text: function() {
          return `Kau menantangku, ${this.playerName}? Baiklah... Bersiaplah untuk pengalaman yang tak akan pernah kau lupakan!`;
        },
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
        text: function() {
          return `Lembut? Baiklah... khusus untukmu, ${this.playerName}.\nTutup matamu dan rasakan... Lidahku akan membelai tubuhmu dengan lembut sebelum menelanmu perlahan-lahan...`;
        },
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
        text: function() {
          return `Penerimaan yang indah, ${this.playerName}... Kau akan menjadi bagian dariku sekarang. Rasakan bagaimana tubuhmu meluncur ke dalam tenggorokanku yang hangat dan basah...`;
        },
        choices: [
          { id: 'surrender', text: 'Menyerahkan diri sepenuhnya', nextScene: 'stomach_acceptance' }
        ],
        effect: () => {
          this.playSound('gulp');
        }
      },
      
      'swallow_curious': {
        character: 'Lawless',
        text: function() {
          return `Penasaran, ${this.playerName}? Aku akan memuaskan rasa ingin tahumu...\nDari dalam perutku. Rasakan bagaimana mulutku terbuka lebar, lidahku menjulur untuk menyambutmu...`;
        },
        choices: [
          { id: 'experience', text: 'Merasakan pengalaman baru', nextScene: 'stomach_exploration' }
        ],
        effect: () => {
          this.playSound('gulp');
        }
      },
      
      // Scene 4: The Aftermath (Stomach Scenes)
      'stomach_struggle': {
        text: function() {
          return `A-Aku tidak bisa bergerak...! Dinding-dinding perut Lawless bergerak dan meremas tubuh ${this.playerName} dari segala arah. Cairan asam lambung yang hangat mulai menyelimuti kakiku, dan suara detak jantungnya bergema di sekitarku!`;
        },
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
        text: function() {
          return `${this.playerName} memeluk tubuh sendiri, mencoba menenangkan diri. Kehangatan yang menyelimuti ${this.playerName} mulai terasa menenangkan, dan detak jantung Lawless menciptakan irama yang hampir seperti musik pengantar tidur.`;
        },
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

      'gentle_exploration': {
        text: function() {
          return `Dengan lembut, ${this.playerName} mulai menjelajahi ruang perut Lawless. Dinding-dindingnya bergerak dengan ritme yang teratur, dan ${this.playerName} menemukan berbagai tekstur yang menarik. Ada bagian yang lebih lembut, ada yang lebih kenyal, semua memberikan sensasi yang unik.`;
        },
        choices: [
          { id: 'continue_explore', text: 'Meneruskan eksplorasi', nextScene: 'deeper_areas' },
          { id: 'rest_spot', text: 'Menemukan tempat nyaman untuk beristirahat', nextScene: 'comfort_search' },
          { id: 'communicate', text: 'Mencoba berkomunikasi dengan Lawless', nextScene: 'conversation_inside' }
        ],
        effect: () => {
          this.playSound('stomach');
          this.showBellyEnvironment(2);
        }
      },

      'comfort_search': {
        text: function() {
          return `${this.playerName} menemukan sudut yang lebih nyaman di dalam perut Lawless, tempat di mana dinding-dindingnya membentuk semacam ceruk yang pas untuk tubuh ${this.playerName}. Kehangatan di sini terasa lebih intens, seperti pelukan yang menenangkan.`;
        },
        choices: [
          { id: 'rest', text: 'Beristirahat di ceruk nyaman ini', nextScene: 'peaceful_rest' },
          { id: 'snuggle', text: 'Meringkuk lebih dekat ke dinding perut', nextScene: 'intimate_moment' },
          { id: 'observe', text: 'Mengamati lingkungan sekitar', nextScene: 'gentle_exploration' }
        ],
        effect: () => {
          this.playSound('heartbeat');
          this.showBellyEnvironment(1);
        }
      },

      'conversation_inside': {
        character: 'Lawless',
        text: function() {
          return `Mmm~ Aku bisa merasakanmu bergerak di dalam sana, ${this.playerName}. Bagaimana rasanya? Apakah cukup nyaman? Aku bisa merasakan detak jantungmu yang mulai sinkron dengan detak jantungku...`;
        },
        choices: [
          { id: 'express_comfort', text: 'Ini... lebih nyaman dari yang kubayangkan', nextScene: 'peaceful_rest' },
          { id: 'ask_about_connection', text: 'Apakah kau selalu bisa merasakan yang di dalam?', nextScene: 'lawless_insight' },
          { id: 'share_experience', text: 'Menceritakan apa yang kau rasakan', nextScene: 'shared_experience' }
        ],
        effect: () => {
          this.playSound('stomach');
          this.changeBackgroundMusic('playful');
        }
      },

      'peaceful_rest': {
        text: function() {
          return `${this.playerName} mulai terbuai oleh kehangatan dan ritme yang menenangkan. Detak jantung Lawless terdengar seperti musik pengantar tidur, dan ${this.playerName} merasakan kedamaian yang aneh namun menyenangkan.`;
        },
        choices: [
          { id: 'drift_sleep', text: 'Membiarkan diri terlelap', nextScene: 'dream_sequence' },
          { id: 'stay_awake', text: 'Tetap terjaga untuk menikmati sensasi', nextScene: 'conscious_experience' }
        ],
        effect: () => {
          this.playSound('heartbeat');
          this.showBellyEnvironment(1);
        }
      },
      
      'stomach_fight': {
        text: function() {
          return `${this.playerName} berjuang dengan keras di dalam perut Lawless, mendorong dan memukul dinding-dindingnya.`;
        },
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
        text: function() {
          return `Hahaha... ${this.playerName}, kau masih berusaha? Lucu.\nTapi, aku suka yang seperti ini. Kita bisa bermain lebih lama.`;
        },
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
        text: function() {
          return `${this.playerName}, kau ternyata lebih baik dari yang kuduga.\nMungkin aku bisa mempertimbangkan menyimpanmu lebih lama.`;
        },
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
        text: function() {
          return `Dan begitulah, perjuangan ${this.playerName} berlanjut... Lawless menikmati setiap momen perlawanan ${this.playerName}, sementara ${this.playerName} terus mencari jalan keluar dari situasi yang tak terduga ini...`;
        },
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
        text: function() {
          return `${this.playerName} menemukan kedamaian yang aneh dalam situasi ini. Kehangatan perut Lawless dan detak jantungnya menjadi lagu pengantar tidur ${this.playerName} setiap hari. Sebuah hubungan simbiosis yang tak terduga...`;
        },
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
        text: function() {
          return `Hahaha... sayang sekali kau menyerah, ${this.playerName}. Tapi, aku suka yang seperti ini. Kita bisa bermain lebih lama.`;
        },
        choices: [
          { id: 'rest', text: 'Beristirahat dalam kegelapan...', nextScene: 'epilogue_exhaustion' }
        ],
        effect: () => {
          this.playSound('stomach');
        }
      },
      
      'epilogue_exhaustion': {
        text: function() {
          return `Kelelahan menguasai ${this.playerName}, dan ${this.playerName} akhirnya menyerah pada kehangatan yang menyelimuti tubuhnya. Mungkin ini bukan akhir yang buruk...`;
        },
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
      
      'too_late_challenge': {
        character: 'Lawless',
        text: function() {
          return `Tidak serius? Terlambat untuk itu, ${this.playerName} sayang~ Kau sudah menantangku, dan aku tidak pernah menolak tantangan.`;
        },
        choices: [
          { id: 'regret', text: 'M-maafkan aku!', nextScene: 'stomach_fight' },
          { id: 'accept_fate', text: 'Baiklah... aku menerima konsekuensinya', nextScene: 'swallow_resign' }
        ],
        effect: () => {
          this.playSound('gulp');
          document.body.classList.add('screen-shake');
          setTimeout(() => {
            document.body.classList.remove('screen-shake');
          }, 1500);
        }
      },
      
      'environment_analysis': {
        text: 'Kau mengamati sekitarmu dengan seksama. Dinding perut Lawless memiliki tekstur yang unik - lembut namun kenyal, dengan pembuluh-pembuluh yang berdenyut di baliknya. Cairan hangat di sekitarmu terasa menenangkan, dan kau bisa melihat kilau cahaya samar yang berasal dari dinding perut.',
        choices: [
          { id: 'touch_walls', text: 'Menyentuh dinding perut', nextScene: 'wall_touching' },
          { id: 'analyze_fluid', text: 'Menganalisa cairan di sekitarmu', nextScene: 'fluid_analysis' },
          { id: 'listen_sounds', text: 'Mendengarkan suara-suara di sekitar', nextScene: 'internal_sounds' }
        ],
        effect: () => {
          this.showBellyEnvironment(2);
          this.playSound('stomach');
        }
      },
      
      'stomach_movements': {
        text: 'Kau merasakan gerakan ritmis dari dinding-dinding perut Lawless. Mereka berkontraksi dan mengendur dengan irama yang hampir seperti detak jantung. Sensasi ini anehnya menenangkan, seperti berada dalam ayunan yang bergerak perlahan.',
        choices: [
          { id: 'follow_rhythm', text: 'Mengikuti irama gerakannya', nextScene: 'rhythm_sync' },
          { id: 'resist_movement', text: 'Mencoba melawan gerakan', nextScene: 'movement_resistance' },
          { id: 'relax_completely', text: 'Rileks dan menikmati sensasi', nextScene: 'peaceful_rest' }
        ],
        effect: () => {
          this.showBellyEnvironment(2);
          this.playSound('stomach');
          document.body.classList.add('gentle-sway');
          setTimeout(() => {
            document.body.classList.remove('gentle-sway');
          }, 3000);
        }
      },
      
      'intense_acceptance': {
        text: 'Kau menerima intensitas momen ini, membiarkan dirimu terbawa oleh kekuatan Lawless. Sensasi yang luar biasa menyelimutimu saat kau meluncur ke dalam kerongkongannya yang kuat dan bergerak cepat.',
        choices: [
          { id: 'embrace_intensity', text: 'Memeluk sensasi intens ini', nextScene: 'rapid_stomach_entry' }
        ],
        effect: () => {
          this.playSound('gulp');
          document.body.classList.add('intense-pulse');
          setTimeout(() => {
            document.body.classList.remove('intense-pulse');
          }, 2000);
        }
      },
      
      'final_resistance': {
        text: 'Kau memberikan perlawanan terakhir, mendorong dan meronta sekuat tenaga. Namun, lidah Lawless terlalu kuat, dan kau merasakan dirimu semakin terdorong ke dalam kerongkongannya yang kuat.',
        choices: [
          { id: 'last_struggle', text: 'Memberikan usaha terakhir', nextScene: 'futile_struggle' },
          { id: 'surrender_finally', text: 'Akhirnya menyerah', nextScene: 'rapid_stomach_entry' }
        ],
        effect: () => {
          this.playSound('stomach_struggle');
          document.body.classList.add('screen-shake');
          setTimeout(() => {
            document.body.classList.remove('screen-shake');
          }, 2000);
        }
      },
      
      'futile_struggle': {
        text: 'Usahamu sia-sia. Otot-otot kerongkongan Lawless terlalu kuat, dan setiap perlawananmu hanya membuat perjalananmu ke bawah semakin cepat. Dengan dorongan terakhir yang kuat, kau terjatuh ke dalam perutnya.',
        choices: [
          { id: 'catch_breath', text: 'Mencoba mengatur napas', nextScene: 'stomach_fight' }
        ],
        effect: () => {
          this.showBellyEnvironment(3);
          this.playSound('gulp');
          this.playSound('stomach');
        }
      },
      
      'gentle_gratitude': {
        character: 'Lawless',
        text: 'Mmm~ Kau sangat sopan. Aku menghargai itu. Sebagai balasannya, aku akan memastikan pengalamanmu di dalam diriku menjadi sesuatu yang tak terlupakan... dalam arti yang baik.',
        choices: [
          { id: 'thank_again', text: 'Terima kasih atas pengertianmu', nextScene: 'swallow_gentle' },
          { id: 'ready_now', text: 'Aku siap sekarang', nextScene: 'swallow_gentle' }
        ],
        effect: () => {
          this.changeBackgroundMusic('playful');
        }
      },
      
      'stomach_gentle': {
        text: function() {
          return `Kehangatan yang lembut menyelimuti ${this.playerName} saat berada di dalam perut Lawless. Dinding-dindingnya bergerak dengan ritme yang menenangkan, seperti pelukan yang nyaman. Detak jantungnya terdengar jelas, menciptakan irama yang hampir seperti lagu pengantar tidur.`;
        },
        choices: [
          { id: 'enjoy_warmth', text: 'Menikmati kehangatan', nextScene: 'peaceful_rest' },
          { id: 'explore_gently', text: 'Perlahan menjelajahi sekitar', nextScene: 'gentle_exploration' },
          { id: 'talk_to_lawless', text: 'Berbicara dengan Lawless', nextScene: 'conversation_inside' }
        ],
        effect: () => {
          this.showBellyEnvironment(2);
          this.playSound('heartbeat');
          this.playSound('stomach');
        }
      },
      
      'stomach_acceptance': {
        text: function() {
          return `${this.playerName} menerima situasinya sepenuhnya, membiarkan dirinya menjadi satu dengan interior perut Lawless. Sensasi aneh namun menyenangkan menyelimuti ${this.playerName} - kehangatan, detak jantung yang menenangkan, dan perasaan aman yang tak terduga.`;
        },
        choices: [
          { id: 'meditate', text: 'Bermeditasi dan menikmati momen ini', nextScene: 'meditation_moment' },
          { id: 'communicate', text: 'Berkomunikasi dengan Lawless', nextScene: 'conversation_inside' },
          { id: 'surrender_fully', text: 'Menyerahkan diri sepenuhnya', nextScene: 'complete_surrender' }
        ],
        effect: () => {
          this.showBellyEnvironment(2);
          this.playSound('heartbeat');
          document.body.classList.add('gentle-glow');
          setTimeout(() => {
            document.body.classList.remove('gentle-glow');
          }, 3000);
        }
      },
      
      'meditation_moment': {
        text: function() {
          return `${this.playerName} menutup mata dan bermeditasi, menyatu dengan ritme perut Lawless. Detak jantungnya menjadi fokus meditasi ${this.playerName}, dan ${this.playerName} merasakan kedamaian yang belum pernah dirasakan sebelumnya.`;
        },
        choices: [
          { id: 'continue_meditation', text: 'Melanjutkan meditasi', nextScene: 'deeper_meditation' },
          { id: 'share_experience', text: 'Berbagi pengalaman dengan Lawless', nextScene: 'shared_experience' }
        ],
        effect: () => {
          this.playSound('heartbeat');
          this.changeBackgroundMusic('playful');
        }
      },
      
      'complete_surrender': {
        text: function() {
          return `${this.playerName} menyerahkan dirinya sepenuhnya, membiarkan batas antara dirinya dan Lawless semakin memudar. Sensasi hangat menjalar ke seluruh tubuh ${this.playerName}, dan ${this.playerName} merasakan koneksi yang semakin dalam dengan predatornya.`;
        },
        choices: [
          { id: 'embrace_connection', text: 'Merangkul koneksi ini', nextScene: 'acceptance_ending' },
          { id: 'maintain_self', text: 'Mempertahankan identitas diri', nextScene: 'peaceful_rest' }
        ],
        effect: () => {
          this.showBellyEnvironment(3);
          this.playSound('heartbeat');
        }
      },
      
      'escape_attempt': {
        text: 'Kau mencoba menghemat energi sambil mencari jalan keluar. Dinding perut Lawless terasa kuat dan elastis, tapi kau menemukan beberapa area yang tampak lebih tipis dari yang lain.',
        choices: [
          { id: 'push_weak_spot', text: 'Mendorong area yang lemah', nextScene: 'push_attempt' },
          { id: 'look_other_exit', text: 'Mencari jalan keluar lain', nextScene: 'alternative_exit' },
          { id: 'give_up_escape', text: 'Menyerah dari upaya melarikan diri', nextScene: 'exhaustion_ending' }
        ],
        effect: () => {
          this.showBellyEnvironment(2);
          this.playSound('stomach_struggle');
        }
      },
      
      'push_attempt': {
        text: 'Kau mendorong area yang tampak lebih lemah dengan sekuat tenaga. Dinding perut Lawless meregang, tapi kemudian berkontraksi dengan kuat, mendorongmu kembali ke tengah.',
        choices: [
          { id: 'try_again', text: 'Mencoba lagi dengan lebih keras', nextScene: 'stronger_attempt' },
          { id: 'give_up', text: 'Menyerah dari upaya melarikan diri', nextScene: 'exhaustion_ending' }
        ],
        effect: () => {
          this.playSound('stomach_struggle');
          document.body.classList.add('screen-shake');
          setTimeout(() => {
            document.body.classList.remove('screen-shake');
          }, 1500);
        }
      },
      
      'stronger_attempt': {
        character: 'Lawless',
        text: function() {
          return `Mmm~ Aku bisa merasakanmu berjuang di dalam sana, ${this.playerName}. Itu... menggelitik. Tapi percuma saja, sayang. Tidak ada yang pernah bisa keluar kecuali aku mengizinkannya.`;
        },
        choices: [
          { id: 'plead_release', text: 'Memohon untuk dilepaskan', nextScene: 'negotiated_release' },
          { id: 'accept_defeat', text: 'Menerima kekalahan', nextScene: 'exhaustion_ending' },
          { id: 'continue_fight', text: 'Tetap melawan', nextScene: 'struggle_ending' }
        ],
        effect: () => {
          this.playSound('laugh');
          this.playSound('stomach_struggle');
        }
      },
      
      'alternative_exit': {
        text: 'Kau menjelajahi perut Lawless dengan lebih teliti, mencari kemungkinan jalan keluar lain. Kau menemukan sebuah saluran yang tampaknya mengarah ke atas, mungkin kembali ke kerongkongan.',
        choices: [
          { id: 'climb_up', text: 'Mencoba memanjat ke atas', nextScene: 'climbing_attempt' },
          { id: 'find_other_path', text: 'Mencari jalur lain', nextScene: 'push_attempt' }
        ],
        effect: () => {
          this.showBellyEnvironment(2);
          this.playSound('stomach');
        }
      },
      
      'climbing_attempt': {
        text: 'Kau mencoba memanjat ke atas melalui saluran yang licin. Dinding-dindingnya bergerak dan berkontraksi, membuatmu sulit mendapatkan pegangan yang baik.',
        choices: [
          { id: 'persist_climbing', text: 'Terus berusaha memanjat', nextScene: 'persistent_climb' },
          { id: 'slide_back', text: 'Tergelincir kembali ke perut', nextScene: 'push_attempt' }
        ],
        effect: () => {
          this.playSound('stomach_struggle');
        }
      },
      
      'persistent_climb': {
        character: 'Lawless',
        text: 'Oh? Kau mencoba memanjat keluar? Itu... menggelitik. Tapi aku bisa menghentikannya dengan mudah.',
        choices: [
          { id: 'beg_mercy', text: 'Kumohon, biarkan aku keluar!', nextScene: 'negotiated_release' },
          { id: 'slide_down', text: 'Tergelincir kembali ke perut', nextScene: 'exhaustion_ending' }
        ],
        effect: () => {
          this.playSound('gulp');
          document.body.classList.add('screen-shake');
          setTimeout(() => {
            document.body.classList.remove('screen-shake');
          }, 1500);
        }
      },
      
      'negotiated_release': {
        character: 'Lawless',
        text: function() {
          return `Memohon sekarang, ${this.playerName}? Hmm... Aku suka mendengar permohonan. Katakan padaku, mengapa aku harus melepaskanmu?`;
        },
        choices: [
          { id: 'promise_return', text: 'Aku berjanji akan kembali lagi', nextScene: 'promise_consideration' },
          { id: 'offer_friendship', text: 'Kita bisa menjadi teman, bukan predator dan mangsa', nextScene: 'friendship_offer' },
          { id: 'beg_mercy', text: 'Kumohon... aku belum siap untuk ini', nextScene: 'mercy_consideration' }
        ],
        effect: () => {
          this.changeBackgroundMusic('playful');
        }
      },
      
      'promise_consideration': {
        character: 'Lawless',
        text: function() {
          return `Kau berjanji akan kembali, ${this.playerName}? Hmm... menarik. Jarang ada yang menawarkan diri untuk kembali. Kau benar-benar mangsa yang unik.`;
        },
        choices: [
          { id: 'confirm_promise', text: 'Ya, aku berjanji. Aku akan kembali saat aku siap', nextScene: 'temporary_release' },
          { id: 'change_mind', text: 'Sebenarnya... mungkin aku bisa tinggal sebentar lagi', nextScene: 'stomach_acceptance' }
        ],
        effect: () => {
          this.playSound('heartbeat');
        }
      },
      
      'friendship_offer': {
        character: 'Lawless',
        text: function() {
          return `Teman, ${this.playerName}? Hmm... Konsep yang menarik. Aku tidak pernah memiliki teman sebelumnya. Biasanya hubunganku dengan manusia hanya sebatas... makanan.`;
        },
        choices: [
          { id: 'convince_friendship', text: 'Kita bisa mencoba sesuatu yang baru', nextScene: 'friendship_consideration' },
          { id: 'regret_offer', text: 'Lupakan saja... aku menyerah', nextScene: 'stomach_acceptance' }
        ],
        effect: () => {
          this.changeBackgroundMusic('playful');
        }
      },
      
      'mercy_consideration': {
        character: 'Lawless',
        text: function() {
          return `Belum siap, ${this.playerName}? Hmm... Aku bisa merasakan ketakutanmu yang tulus. Mungkin memang terlalu cepat untukmu menjadi bagian dariku selamanya.`;
        },
        choices: [
          { id: 'thank_mercy', text: 'Terima kasih atas pengertianmu', nextScene: 'temporary_release' },
          { id: 'reconsider_fear', text: 'Sebenarnya... mungkin aku bisa mencoba', nextScene: 'stomach_acceptance' }
        ],
        effect: () => {
          this.playSound('heartbeat');
        }
      },
      
      'friendship_consideration': {
        character: 'Lawless',
        text: function() {
          return `Sesuatu yang baru... Aku suka ide itu, ${this.playerName}. Baiklah, aku akan melepaskanmu kali ini. Tapi kau harus berjanji untuk kembali dan... menghabiskan waktu denganku.`;
        },
        choices: [
          { id: 'agree_terms', text: 'Aku berjanji akan kembali', nextScene: 'temporary_release' },
          { id: 'hesitate_promise', text: 'Aku... tidak yakin', nextScene: 'reconsideration' }
        ],
        effect: () => {
          this.changeBackgroundMusic('playful');
        }
      },
      
      'temporary_release': {
        character: 'Lawless',
        text: function() {
          return `Baiklah... aku akan melepaskanmu, ${this.playerName}. Tapi ingat janjimu. Aku akan menunggumu kembali. Dan saat kau kembali... pengalaman kita akan jauh lebih... intens.`;
        },
        choices: [
          { id: 'thank_release', text: 'Terima kasih... aku akan kembali', nextScene: 'release_scene' },
          { id: 'nervous_nod', text: 'Mengangguk dengan gugup', nextScene: 'release_scene' }
        ],
        effect: () => {
          this.playSound('gulp');
        }
      },
      
      'release_scene': {
        text: 'Kau merasakan dinding-dinding perut Lawless berkontraksi, mendorongmu ke atas melalui kerongkongannya. Sensasi aneh tapi tidak menyakitkan saat kau meluncur ke atas, hingga akhirnya kau terjatuh keluar dari mulutnya, basah namun tidak terluka.',
        choices: [
          { id: 'catch_breath', text: 'Mengatur napas', nextScene: 'post_release' }
        ],
        effect: () => {
          this.playSound('gulp');
          document.body.classList.add('screen-shake');
          setTimeout(() => {
            document.body.classList.remove('screen-shake');
          }, 2000);
        }
      },
      
      'post_release': {
        character: 'Lawless',
        text: function() {
          return `Pengalaman yang menarik, bukan, ${this.playerName}? Kau adalah yang pertama yang kulepaskan secara sukarela. Jangan lupa janjimu untuk kembali... Aku akan menunggumu.`;
        },
        choices: [
          { id: 'promise_return', text: 'Aku akan kembali... suatu hari nanti', nextScene: 'epilogue_release' }
        ],
        effect: () => {
          this.changeBackgroundMusic('playful');
        }
      },
      
      'epilogue_release': {
        text: 'Dan begitulah, kau berhasil keluar dari perut Lawless dengan sebuah janji untuk kembali. Pengalaman ini meninggalkan kesan yang tak terlupakan, dan meskipun ada ketakutan, ada juga rasa penasaran yang aneh untuk merasakannya lagi...',
        choices: [
          { id: 'end', text: 'Selesai', nextScene: 'exit' }
        ],
        effect: () => {
          this.playSound('heartbeat');
          setTimeout(() => {
            this.playSound('exit');
          }, 2000);
        }
      },
      
      'lawless_backstory': {
        character: 'Lawless',
        text: function() {
          return `Aku sudah ada sejak lama... sangat lama, ${this.playerName}. Aku adalah entitas yang hidup dari ketakutan dan keingintahuan manusia. Tapi kau... kau berbeda. Kau memanggilku dengan sengaja.`;
        },
        choices: [
          { id: 'volunteer', text: 'Aku ingin menjadi bagian dari pengalamanmu', nextScene: 'volunteer_response' },
          { id: 'regret', text: 'Mungkin ini kesalahan...', nextScene: 'regret_response' }
        ]
      },
      
      'lawless_experience': {
        character: 'Lawless',
        text: function() {
          return `Rasanya, ${this.playerName}? Hmm... Bagaimana menjelaskannya... Seperti kehangatan yang menyebar ke seluruh tubuhku. Merasakan seseorang di dalam, bergerak, ketakutan atau malah menikmatinya... itu sensasi yang tak terlukiskan.`;
        },
        choices: [
          { id: 'want_experience', text: 'Aku ingin merasakannya...', nextScene: 'pre_swallow' },
          { id: 'too_intimate', text: 'Itu terdengar terlalu... intim', nextScene: 'too_intimate_response' }
        ]
      },
      
      'too_intimate_response': {
        character: 'Lawless',
        text: function() {
          return `Terlalu intim, ${this.playerName}? Haha, mungkin memang begitu. Tapi bukankah itu yang kau cari saat memanggilku?`;
        },
        choices: [
          { id: 'admit_curious', text: 'Ya... aku memang penasaran', nextScene: 'swallow_curious' },
          { id: 'deny_interest', text: 'Tidak, aku hanya ingin berbicara', nextScene: 'just_talk_path' }
        ]
      },
      
      'just_talk_path': {
        character: 'Lawless',
        text: function() {
          return `Hmm, menarik, ${this.playerName}. Jarang ada yang hanya ingin berbicara denganku. Baiklah, apa yang ingin kau bicarakan?`;
        },
        choices: [
          { id: 'ask_others', text: 'Apakah ada orang lain yang pernah memanggilmu?', nextScene: 'others_called' },
          { id: 'ask_powers', text: 'Kekuatan apa lagi yang kau miliki?', nextScene: 'other_powers' },
          { id: 'leave_politely', text: 'Kurasa aku harus pergi sekarang', nextScene: 'polite_exit' }
        ]
      },
      
      'others_called': {
        character: 'Lawless',
        text: function() {
          return `Oh, tentu saja, ${this.playerName}. Banyak yang memanggilku, tapi sedikit yang benar-benar tahu apa yang mereka lakukan. Kebanyakan dari mereka... yah, mereka menjadi bagian dariku sekarang.`;
        },
        choices: [
          { id: 'reconsider', text: 'Mungkin aku juga ingin mencobanya...', nextScene: 'swallow_curious' },
          { id: 'leave_politely', text: 'Kurasa aku harus pergi sekarang', nextScene: 'polite_exit' }
        ]
      },
      
      'other_powers': {
        character: 'Lawless',
        text: function() {
          return `Kekuatanku? ${this.playerName}, aku bisa melakukan banyak hal... mengubah bentuk, membaca pikiran, dan tentu saja... menelan siapapun yang kuinginkan. Tapi kekuatan terbesar adalah memberikan pengalaman yang tak terlupakan.`;
        },
        choices: [
          { id: 'show_power', text: 'Bisakah kau tunjukkan padaku?', nextScene: 'swallow_curious' },
          { id: 'thank_conversation', text: 'Terima kasih atas percakapannya', nextScene: 'polite_exit' }
        ]
      },
      
      'polite_exit': {
        character: 'Lawless',
        text: function() {
          return `Pergi begitu saja, ${this.playerName}? Sayang sekali. Padahal kita baru mulai bersenang-senang. Mungkin lain kali kau akan lebih... berani.`;
        },
        choices: [
          { id: 'goodbye', text: 'Selamat tinggal...', nextScene: 'exit' }
        ],
        effect: () => {
          this.playSound('exit');
          setTimeout(() => this.exitRoleplay(), 3000);
        }
      },
      
      'pre_swallow': {
        character: 'Lawless',
        text: function() {
          return `Kau yakin, ${this.playerName}? Ini bukan keputusan yang bisa kau tarik kembali dengan mudah...`;
        },
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
        text: function() {
          return `Keraguan adalah hal yang wajar, ${this.playerName}. Tapi kadang, pengalaman terbaik datang dari melangkah melewati ketakutanmu...`;
        },
        choices: [
          { id: 'overcome_fear', text: 'Kau benar. Aku siap.', nextScene: 'swallow_gentle' },
          { id: 'still_unsure', text: 'Aku masih belum yakin', nextScene: 'second_hesitation' }
        ]
      },
      
      'second_hesitation': {
        character: 'Lawless',
        text: function() {
          return `Hmm, mungkin kau memang belum siap, ${this.playerName}. Tidak apa-apa, aku bisa menunggu...`;
        },
        choices: [
          { id: 'final_decision_yes', text: 'Tidak, aku siap sekarang!', nextScene: 'swallow_gentle' },
          { id: 'final_decision_no', text: 'Mungkin lain kali...', nextScene: 'polite_exit' }
        ]
      },
      
      'swallow_scene': {
        character: 'Lawless',
        text: function() {
          return `Pilihan yang berani, ${this.playerName}... Bersiaplah untuk pengalaman yang tak akan pernah kau lupakan.`;
        },
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
          { id: 'communicate_option', text: 'Mencoba berkomunikasi dengan Lawless', nextScene: 'conversation_inside' }
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
        text: function() {
          return `Apa yang kau lakukan, ${this.playerName}?! Kau... kau bisa melihat kenanganku?`;
        },
        choices: [
          { id: 'apologize_memories', text: 'Maaf, aku tidak sengaja', nextScene: 'stomach_passive' },
          { id: 'embrace_memories', text: 'Ini luar biasa! Aku bisa melihat masa lalumu!', nextScene: 'stomach_acceptance' }
        ]
      },
      
      'memory_forgiveness': {
        character: 'Lawless',
        text: function() {
          return `Hmm... tidak apa-apa, ${this.playerName}. Mungkin memang sudah waktunya seseorang mengetahui kisahku.`;
        },
        choices: [
          { id: 'ask_about_past', text: 'Ceritakan lebih banyak tentang masa lalumu', nextScene: 'lawless_past_story' },
          { id: 'respect_privacy', text: 'Aku akan menghormati privasimu', nextScene: 'privacy_respected' }
        ]
      },
      
      'memory_connection': {
        character: 'Lawless',
        text: function() {
          return `${this.playerName}... kau orang pertama yang bisa melakukan ini. Mungkin kita memiliki koneksi yang lebih dalam dari yang kukira.`;
        },
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
        text: 'Cahaya itu adalah inti dari kekuatan Lawless. Saat kau mendekati, kau merasakan energi yang luar biasa. Inti itu berdenyut dengan ritme yang hipnotis.',
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
        text: function() {
          return `Aku bisa mendengarmu, ${this.playerName}, kau tahu. Bagaimana rasanya berada di dalam diriku?`;
        },
        choices: [
          { id: 'enjoy_inside', text: 'Ini... lebih nyaman dari yang kubayangkan', nextScene: 'stomach_acceptance' },
          { id: 'ask_questions', text: 'Aku punya banyak pertanyaan', nextScene: 'conversation_inside' },
          { id: 'express_concern', text: 'Aku sedikit khawatir...', nextScene: 'stomach_struggle' }
        ],
        effect: () => {
          this.playSound('stomach');
          this.showBellyEnvironment(2);
        }
      },
      
      'beg_response': {
        character: 'Lawless',
        text: function() {
          return `Begitu manis~ Aku suka saat mangsaku tahu tempatnya, ${this.playerName}.`;
        },
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
        text: function() {
          return `Cara lain, ${this.playerName}? Hmm... Mungkin ada. Aku bisa menawarkan... pengalaman yang berbeda.`;
        },
        choices: [
          { id: 'accept_alternative', text: 'Apa tawaranmu?', nextScene: 'special_offer' },
          { id: 'reject_alternative', text: 'Tidak', nextScene: 'polite_exit' }
        ]
      },
      
      'special_offer': {
        character: 'Lawless',
        text: function() {
          return `Bagaimana kalau kita membuat... kesepakatan, ${this.playerName}? Kau bisa menjadi tamuku untuk sementara, bukan mangsaku selamanya.`;
        },
        choices: [
          { id: 'accept_deal', text: 'Aku tertarik dengan tawaranmu', nextScene: 'temporary_stay_offer' },
          { id: 'decline_deal', text: 'Aku lebih suka menjadi bagian darimu selamanya', nextScene: 'volunteer_response' }
        ],
        effect: () => {
          this.playSound('heartbeat');
        }
      },
      
      // Adding missing scenes that were referenced but not defined
      'intimate_moment': {
        text: function() {
          return `${this.playerName} meringkuk lebih dekat ke dinding perut Lawless, merasakan kehangatan yang intens. Dinding-dinding perutnya bergerak lembut, seperti memelukmu balik. Detak jantungnya terdengar lebih jelas, menciptakan momen keintiman yang tak terduga.`;
        },
        choices: [
          { id: 'enjoy_closeness', text: 'Menikmati kedekatan ini', nextScene: 'peaceful_rest' },
          { id: 'talk_about_feeling', text: 'Berbicara tentang perasaanmu', nextScene: 'conversation_inside' }
        ],
        effect: () => {
          this.playSound('heartbeat');
          this.showBellyEnvironment(1);
          document.body.classList.add('gentle-glow');
          setTimeout(() => {
            document.body.classList.remove('gentle-glow');
          }, 3000);
        }
      },
      
      'lawless_insight': {
        character: 'Lawless',
        text: function() {
          return `Tentu saja aku bisa merasakan setiap gerakan ${this.playerName} di dalam sana. Setiap getaran, setiap sentuhan... Itu seperti koneksi intim yang tidak bisa dijelaskan dengan kata-kata. Aku bisa merasakan detak jantungmu, bahkan emosimu.`;
        },
        choices: [
          { id: 'fascinated', text: 'Itu... menakjubkan', nextScene: 'shared_experience' },
          { id: 'bit_scared', text: 'Itu sedikit menakutkan...', nextScene: 'reassurance_dialogue' },
          { id: 'curious_more', text: 'Apa lagi yang bisa kau rasakan?', nextScene: 'deeper_connection' }
        ],
        effect: () => {
          this.playSound('heartbeat');
          this.showBellyEnvironment(2);
        }
      },
      
      'shared_experience': {
        character: 'Lawless',
        text: function() {
          return `Mmm~ Aku suka bagaimana ${this.playerName} berbagi pengalamanmu denganku. Setiap emosi yang kau rasakan, aku juga merasakannya. Kita terhubung dengan cara yang sangat istimewa sekarang.`;
        },
        choices: [
          { id: 'deepen_bond', text: 'Ingin memperdalam ikatan ini', nextScene: 'deeper_connection' },
          { id: 'enjoy_moment', text: 'Menikmati momen kebersamaan', nextScene: 'peaceful_rest' },
          { id: 'ask_more', text: 'Bagaimana dengan pengalamanmu?', nextScene: 'lawless_experience' }
        ],
        effect: () => {
          this.changeBackgroundMusic('playful');
          this.playSound('heartbeat');
        }
      },
      
      'conscious_experience': {
        text: function() {
          return `${this.playerName} memilih untuk tetap terjaga, menikmati setiap sensasi yang ditawarkan oleh interior perut Lawless. Kehangatan yang menyelimuti, gerakan ritmis dinding-dinding perutnya, dan detak jantungnya yang konstan menciptakan pengalaman yang hampir meditatif.`;
        },
        choices: [
          { id: 'observe_details', text: 'Mengamati detail sekitarmu', nextScene: 'environment_analysis' },
          { id: 'feel_connection', text: 'Merasakan koneksi dengan Lawless', nextScene: 'shared_experience' },
          { id: 'try_communicate', text: 'Mencoba berkomunikasi', nextScene: 'conversation_inside' }
        ],
        effect: () => {
          this.showBellyEnvironment(2);
          this.playSound('stomach');
        }
      },
      
      'deeper_meditation': {
        text: function() {
          return `${this.playerName} memperdalam meditasimu, membiarkan kesadaranmu melebur dengan ritme tubuh Lawless. Detak jantungnya menjadi pusat fokusmu, dan perlahan kau merasakan batas antara dirimu dan Lawless semakin kabur.`;
        },
        choices: [
          { id: 'embrace_oneness', text: 'Merangkul kesatuan ini', nextScene: 'complete_surrender' },
          { id: 'maintain_awareness', text: 'Mempertahankan kesadaran diri', nextScene: 'conscious_experience' },
          { id: 'share_insight', text: 'Berbagi wawasan dengan Lawless', nextScene: 'shared_experience' }
        ],
        effect: () => {
          this.playSound('heartbeat');
          this.showBellyEnvironment(2);
          document.body.classList.add('gentle-pulse');
          setTimeout(() => {
            document.body.classList.remove('gentle-pulse');
          }, 3000);
        }
      },
      
      'deeper_connection': {
        character: 'Lawless',
        text: function() {
          return `Koneksi kita... sangat spesial, ${this.playerName}. Jarang ada yang bisa mencapai tingkat keintiman seperti ini denganku. Kau bisa merasakan detak jantungku, dan aku bisa merasakan emosimu. Kita hampir seperti... satu entitas.`;
        },
        choices: [
          { id: 'embrace_connection', text: 'Merangkul koneksi ini sepenuhnya', nextScene: 'complete_surrender' },
          { id: 'maintain_boundary', text: 'Mempertahankan batas identitasmu', nextScene: 'conscious_experience' },
          { id: 'express_gratitude', text: 'Berterima kasih atas pengalaman ini', nextScene: 'shared_experience' }
        ],
        effect: () => {
          this.playSound('heartbeat');
          this.showBellyEnvironment(2);
        }
      },
      
      'inside_negotiation': {
        character: 'Lawless',
        text: function() {
          return `Bernegosiasi dari dalam perutku, ${this.playerName}? Menarik sekali. Apa yang ingin kau tawarkan padaku?`;
        },
        choices: [
          { id: 'offer_friendship', text: 'Kita bisa menjadi teman, bukan predator dan mangsa', nextScene: 'friendship_offer' },
          { id: 'offer_return', text: 'Aku akan kembali lagi jika kau melepaskanku', nextScene: 'promise_consideration' },
          { id: 'plead_mercy', text: 'Kumohon... beri aku kesempatan', nextScene: 'mercy_consideration' }
        ],
        effect: () => {
          this.playSound('stomach');
          this.showBellyEnvironment(2);
        }
      },
      
      'new_strategy': {
        text: 'Kau memutuskan untuk mengubah strategi perlawananmu. Alih-alih melawan secara fisik, kau mencoba mencari kelemahan atau titik sensitif di dinding perut Lawless.',
        choices: [
          { id: 'find_weak_point', text: 'Mencari titik lemah', nextScene: 'push_attempt' },
          { id: 'tickle_walls', text: 'Mencoba menggelitik dinding perut', nextScene: 'tickle_response' },
          { id: 'try_negotiation', text: 'Mencoba pendekatan negosiasi', nextScene: 'inside_negotiation' }
        ],
        effect: () => {
          this.playSound('stomach_struggle');
          this.showBellyEnvironment(2);
        }
      },
      
      'tickle_response': {
        character: 'Lawless',
        text: function() {
          return `Hahaha! Apa yang kau lakukan di dalam sana, ${this.playerName}? Itu... menggelitik! Tapi tidak akan membuatku melepaskanmu, kau tahu.`;
        },
        choices: [
          { id: 'continue_tickling', text: 'Terus menggelitik', nextScene: 'persistent_tickle' },
          { id: 'try_different', text: 'Mencoba strategi lain', nextScene: 'new_strategy' },
          { id: 'apologize_tickle', text: 'Meminta maaf dan berhenti', nextScene: 'stomach_passive' }
        ],
        effect: () => {
          this.playSound('laugh');
          document.body.classList.add('gentle-shake');
          setTimeout(() => {
            document.body.classList.remove('gentle-shake');
          }, 2000);
        }
      },
      
      'persistent_tickle': {
        character: 'Lawless',
        text: function() {
          return `Hahaha! Baiklah, baiklah! ${this.playerName}, kau sangat gigih, ya? Mungkin aku bisa mempertimbangkan untuk melepaskanmu... jika kau berjanji akan kembali lagi.`;
        },
        choices: [
          { id: 'promise_return', text: 'Aku berjanji akan kembali', nextScene: 'promise_consideration' },
          { id: 'refuse_promise', text: 'Aku tidak bisa berjanji', nextScene: 'continue_tickling' }
        ],
        effect: () => {
          this.playSound('laugh');
          document.body.classList.add('screen-shake');
          setTimeout(() => {
            document.body.classList.remove('screen-shake');
          }, 2000);
        }
      },
      
      'continue_tickling': {
        character: 'Lawless',
        text: function() {
          return `${this.playerName}, kau benar-benar keras kepala! Baiklah, aku akan melepaskanmu kali ini. Tapi ingat, aku akan menunggumu kembali... suatu hari nanti.`;
        },
        choices: [
          { id: 'thank_release', text: 'Terima kasih... aku akan mempertimbangkannya', nextScene: 'temporary_release' }
        ],
        effect: () => {
          this.playSound('laugh');
          this.playSound('gulp');
        }
      },
      
      'wall_touching': {
        text: 'Kau menyentuh dinding perut Lawless dengan lembut. Teksturnya kenyal dan hangat, dengan pembuluh-pembuluh yang berdenyut di bawah permukaannya. Dinding itu merespons sentuhanmu, bergerak sedikit seperti bernapas.',
        choices: [
          { id: 'continue_touching', text: 'Terus menjelajahi dengan sentuhan', nextScene: 'deeper_exploration' },
          { id: 'press_gently', text: 'Menekan dengan lembut', nextScene: 'press_response' },
          { id: 'stop_touching', text: 'Berhenti menyentuh', nextScene: 'stomach_passive' }
        ],
        effect: () => {
          this.playSound('stomach');
          this.showBellyEnvironment(2);
        }
      },
      
      'fluid_analysis': {
        text: 'Kau menganalisa cairan hangat yang menyelimutimu. Cairan itu memiliki konsistensi yang aneh - tidak terlalu kental, tidak terlalu encer, dan memiliki kilau samar yang menenangkan. Anehnya, cairan itu tidak terasa berbahaya bagi tubuhmu.',
        choices: [
          { id: 'taste_fluid', text: 'Mencoba mencicipi cairan', nextScene: 'taste_experience' },
          { id: 'observe_effect', text: 'Mengamati efeknya pada kulitmu', nextScene: 'skin_effect' },
          { id: 'ask_about_fluid', text: 'Bertanya pada Lawless tentang cairan ini', nextScene: 'fluid_explanation' }
        ],
        effect: () => {
          this.showBellyEnvironment(2);
          this.playSound('stomach');
        }
      },
      
      'fluid_explanation': {
        character: 'Lawless',
        text: function() {
          return `Cairan itu, ${this.playerName}? Itu adalah esensi khusus yang kuproduksi untuk tamuku. Bukan asam lambung biasa, tapi cairan yang dirancang untuk memberikan kenyamanan dan sensasi menyenangkan. Beberapa bahkan mengatakan cairan itu memiliki sifat... menenangkan.`;
        },
        choices: [
          { id: 'thank_explanation', text: 'Terima kasih atas penjelasannya', nextScene: 'conversation_inside' },
          { id: 'enjoy_fluid', text: 'Menikmati sensasi cairan', nextScene: 'peaceful_rest' },
          { id: 'curious_more', text: 'Penasaran dengan efek lainnya', nextScene: 'fluid_analysis' }
        ],
        effect: () => {
          this.changeBackgroundMusic('playful');
          this.playSound('stomach');
        }
      },
      
      'skin_effect': {
        text: 'Kau mengamati efek cairan pada kulitmu. Alih-alih merusak, cairan itu tampaknya memberikan sensasi hangat dan menenangkan. Kulitmu terasa lebih lembut dan sedikit berkilau setelah bersentuhan dengan cairan tersebut.',
        choices: [
          { id: 'enjoy_effect', text: 'Menikmati efek menenangkan ini', nextScene: 'peaceful_rest' },
          { id: 'ask_about_effect', text: 'Bertanya pada Lawless tentang efek ini', nextScene: 'fluid_explanation' },
          { id: 'examine_more', text: 'Mengamati lebih lanjut', nextScene: 'fluid_analysis' }
        ],
        effect: () => {
          this.showBellyEnvironment(2);
          this.playSound('stomach');
        }
      },
      
      'taste_experience': {
        text: 'Kau memberanikan diri mencicipi sedikit cairan di sekitarmu. Rasanya aneh namun tidak menyakitkan - sedikit manis dengan sentuhan rasa yang tak bisa kau jelaskan. Sensasi hangat menjalar ke seluruh tubuhmu setelah menelannya.',
        choices: [
          { id: 'enjoy_taste', text: 'Menikmati sensasi aneh ini', nextScene: 'peaceful_rest' },
          { id: 'ask_about_fluid', text: 'Bertanya pada Lawless tentang cairan ini', nextScene: 'fluid_explanation' },
          { id: 'stop_tasting', text: 'Berhenti mencicipi', nextScene: 'stomach_passive' }
        ],
        effect: () => {
          this.showBellyEnvironment(2);
          this.playSound('stomach');
        }
      },
      
      'internal_sounds': {
        text: 'Kau mendengarkan dengan seksama suara-suara di sekitarmu. Detak jantung Lawless terdengar jelas dan ritmis, menciptakan semacam musik latar. Ada juga suara gerakan cairan, kontraksi otot, dan aliran darah yang menciptakan simfoni internal yang unik.',
        choices: [
          { id: 'focus_heartbeat', text: 'Fokus pada detak jantung', nextScene: 'rhythm_sync' },
          { id: 'listen_deeper', text: 'Mendengarkan lebih dalam', nextScene: 'deeper_sounds' },
          { id: 'talk_about_sounds', text: 'Berbicara tentang suara-suara ini', nextScene: 'sound_conversation' }
        ],
        effect: () => {
          this.playSound('heartbeat');
          this.playSound('stomach');
          this.showBellyEnvironment(2);
        }
      },
      
      'rhythm_sync': {
        text: 'Kau mulai menyesuaikan ritme napas dan detak jantungmu dengan gerakan perut Lawless. Perlahan, kau merasakan sinkronisasi yang aneh namun menenangkan, seperti dua entitas yang bergerak dalam harmoni.',
        choices: [
          { id: 'deepen_sync', text: 'Memperdalam sinkronisasi', nextScene: 'deeper_meditation' },
          { id: 'share_feeling', text: 'Berbagi perasaan ini dengan Lawless', nextScene: 'shared_experience' },
          { id: 'maintain_rhythm', text: 'Mempertahankan ritme ini', nextScene: 'peaceful_rest' }
        ],
        effect: () => {
          this.playSound('heartbeat');
          this.showBellyEnvironment(1);
          document.body.classList.add('gentle-pulse');
          setTimeout(() => {
            document.body.classList.remove('gentle-pulse');
          }, 3000);
        }
      },
      
      'movement_resistance': {
        text: 'Kau mencoba melawan gerakan ritmis dinding perut Lawless, mendorong ke arah yang berlawanan. Dinding-dinding itu merespons dengan kontraksi yang lebih kuat, seperti mencoba menenangkanmu.',
        choices: [
          { id: 'continue_resist', text: 'Terus melawan gerakan', nextScene: 'stronger_resistance' },
          { id: 'give_up_resist', text: 'Menyerah dan mengikuti aliran', nextScene: 'rhythm_sync' },
          { id: 'try_different', text: 'Mencoba pendekatan berbeda', nextScene: 'new_strategy' }
        ],
        effect: () => {
          this.playSound('stomach_struggle');
          this.showBellyEnvironment(2);
          document.body.classList.add('screen-shake');
          setTimeout(() => {
            document.body.classList.remove('screen-shake');
          }, 2000);
        }
      },
      
      'stronger_resistance': {
        character: 'Lawless',
        text: function() {
          return `Mmm~ Aku bisa merasakan perlawananmu, ${this.playerName}. Itu... menarik. Tapi percuma saja, sayang. Semakin kau melawan, semakin kuat aku akan memelukmu.`;
        },
        choices: [
          { id: 'exhausted_resist', text: 'Kelelahan melawan', nextScene: 'exhaustion_ending' },
          { id: 'change_tactics', text: 'Mengubah taktik', nextScene: 'new_strategy' },
          { id: 'surrender_finally', text: 'Akhirnya menyerah', nextScene: 'stomach_acceptance' }
        ],
        effect: () => {
          this.playSound('stomach_struggle');
          this.showBellyEnvironment(3);
        }
      },
      
      'deeper_exploration': {
        text: 'Kau melanjutkan eksplorasi dengan jari-jarimu, merasakan berbagai tekstur dan kontur di dinding perut Lawless. Ada area yang lebih lembut, ada yang lebih kenyal, dan ada yang bergerak dengan ritme yang berbeda.',
        choices: [
          { id: 'focus_soft', text: 'Fokus pada area yang lembut', nextScene: 'soft_area' },
          { id: 'focus_rhythm', text: 'Fokus pada ritme gerakan', nextScene: 'rhythm_sync' },
          { id: 'communicate_touch', text: 'Bertanya pada Lawless tentang sentuhanmu', nextScene: 'touch_conversation' }
        ],
        effect: () => {
          this.playSound('stomach');
          this.showBellyEnvironment(2);
        }
      },
      
      'soft_area': {
        text: 'Kau menemukan area yang terasa lebih lembut dari sekitarnya. Saat kau menyentuhnya dengan lembut, area itu merespons dengan gerakan halus, seperti bergetar pelan di bawah jari-jarimu.',
        choices: [
          { id: 'continue_touch_soft', text: 'Terus menyentuh dengan lembut', nextScene: 'pleasant_response' },
          { id: 'press_soft_area', text: 'Menekan area lembut', nextScene: 'press_response' },
          { id: 'explore_elsewhere', text: 'Menjelajahi area lain', nextScene: 'deeper_exploration' }
        ],
        effect: () => {
          this.playSound('heartbeat');
          this.showBellyEnvironment(1);
        }
      },
      
      'pleasant_response': {
        character: 'Lawless',
        text: function() {
          return `Mmm~ Itu... terasa menyenangkan, ${this.playerName}. Kau memiliki sentuhan yang lembut. Jarang ada yang memperlakukan interior tubuhku dengan begitu... penuh perhatian.`;
        },
        choices: [
          { id: 'continue_gentle', text: 'Melanjutkan sentuhan lembut', nextScene: 'massage_walls' },
          { id: 'ask_about_feeling', text: 'Bertanya lebih lanjut tentang perasaannya', nextScene: 'touch_conversation' },
          { id: 'rest_after_touch', text: 'Beristirahat setelah eksplorasi', nextScene: 'peaceful_rest' }
        ],
        effect: () => {
          this.playSound('heartbeat');
          this.changeBackgroundMusic('playful');
        }
      },
      
      'press_response': {
        character: 'Lawless',
        text: function() {
          return `Mmm~ Aku bisa merasakan sentuhanmu dari dalam, ${this.playerName}. Itu... menyenangkan. Jarang ada yang mengeksplorasi interior tubuhku dengan begitu lembut.`;
        },
        choices: [
          { id: 'ask_sensation', text: 'Bagaimana rasanya bagiku menyentuhmu?', nextScene: 'touch_conversation' },
          { id: 'continue_press', text: 'Melanjutkan menekan dengan lembut', nextScene: 'massage_walls' },
          { id: 'stop_pressing', text: 'Berhenti dan beristirahat', nextScene: 'peaceful_rest' }
        ],
        effect: () => {
          this.playSound('heartbeat');
          this.showBellyEnvironment(1);
        }
      },
      
      'massage_walls': {
        text: 'Kau mulai memijat dinding perut Lawless dengan lembut, merasakan otot-otot di bawah permukaannya rileks di bawah sentuhanmu. Sensasi hangat menjalar dari jari-jarimu, menciptakan koneksi yang lebih dalam.',
        choices: [
          { id: 'continue_massage', text: 'Melanjutkan pijatan', nextScene: 'deeper_connection' },
          { id: 'rest_after_massage', text: 'Beristirahat setelah memijat', nextScene: 'peaceful_rest' },
          { id: 'talk_about_massage', text: 'Berbicara tentang sensasi ini', nextScene: 'touch_conversation' }
        ],
        effect: () => {
          this.playSound('heartbeat');
          this.showBellyEnvironment(1);
          document.body.classList.add('gentle-glow');
          setTimeout(() => {
            document.body.classList.remove('gentle-glow');
          }, 3000);
        }
      },
      
      'touch_conversation': {
        character: 'Lawless',
        text: function() {
          return `Sentuhanmu terasa... intim, ${this.playerName}. Seperti koneksi yang lebih dalam dari sekadar predator dan mangsa. Aku bisa merasakan setiap gerakan jarimu, setiap tekanan lembut yang kau berikan.`;
        },
        choices: [
          { id: 'express_connection', text: 'Aku juga merasakan koneksi itu', nextScene: 'deeper_connection' },
          { id: 'ask_more_feeling', text: 'Ceritakan lebih banyak tentang apa yang kau rasakan', nextScene: 'lawless_insight' },
          { id: 'continue_exploring', text: 'Melanjutkan eksplorasi', nextScene: 'deeper_exploration' }
        ],
        effect: () => {
          this.changeBackgroundMusic('playful');
          this.playSound('heartbeat');
        }
      },
      
      'deeper_sounds': {
        text: 'Kau mendengarkan lebih dalam, memusatkan seluruh perhatianmu pada suara-suara di sekitarmu. Kau mulai mendengar detail yang lebih halus - aliran darah melalui pembuluh, gerakan cairan lambung, bahkan suara samar dari dunia luar yang teredam.',
        choices: [
          { id: 'focus_internal', text: 'Fokus pada suara internal', nextScene: 'internal_rhythm' },
          { id: 'listen_external', text: 'Mencoba mendengar dunia luar', nextScene: 'external_world' },
          { id: 'share_sound_experience', text: 'Berbagi pengalaman mendengarmu', nextScene: 'sound_conversation' }
        ],
        effect: () => {
          this.playSound('heartbeat');
          this.playSound('stomach');
          this.showBellyEnvironment(2);
        }
      },
      
      'sound_conversation': {
        character: 'Lawless',
        text: function() {
          return `Kau bisa mendengar semua itu, ${this.playerName}? Menarik... Kebanyakan orang terlalu sibuk panik atau melawan untuk benar-benar mendengarkan. Kau memiliki pendengaran yang tajam... dan ketenangan yang jarang.`;
        },
        choices: [
          { id: 'ask_about_sounds', text: 'Apakah kau juga mendengar suara-suara ini?', nextScene: 'lawless_insight' },
          { id: 'share_experience', text: 'Berbagi pengalaman mendengarmu', nextScene: 'shared_experience' },
          { id: 'continue_listening', text: 'Melanjutkan mendengarkan', nextScene: 'deeper_sounds' }
        ],
        effect: () => {
          this.changeBackgroundMusic('playful');
          this.playSound('heartbeat');
        }
      },
      
      'internal_rhythm': {
        text: 'Kau fokus pada ritme internal tubuh Lawless - detak jantung, aliran darah, kontraksi otot. Semua bergerak dalam harmoni yang sempurna, menciptakan simfoni kehidupan yang kompleks namun teratur.',
        choices: [
          { id: 'sync_with_rhythm', text: 'Menyinkronkan diri dengan ritme ini', nextScene: 'rhythm_sync' },
          { id: 'appreciate_complexity', text: 'Mengagumi kompleksitas tubuh Lawless', nextScene: 'appreciation_moment' },
          { id: 'share_observation', text: 'Berbagi pengamatanmu', nextScene: 'sound_conversation' }
        ],
        effect: () => {
          this.playSound('heartbeat');
          this.showBellyEnvironment(1);
        }
      },
      
      'external_world': {
        text: 'Kau mencoba mendengarkan dunia luar, namun suara-suara tersebut sangat teredam. Kau hanya bisa menangkap gema samar, seperti mendengarkan dari dalam air. Dunia luar terasa sangat jauh dan tidak relevan.',
        choices: [
          { id: 'return_internal', text: 'Kembali fokus pada suara internal', nextScene: 'internal_rhythm' },
          { id: 'feel_isolation', text: 'Merasakan isolasi dari dunia luar', nextScene: 'isolation_reflection' },
          { id: 'talk_about_outside', text: 'Berbicara tentang dunia luar', nextScene: 'outside_conversation' }
        ],
        effect: () => {
          this.playSound('stomach');
          this.showBellyEnvironment(2);
        }
      },
      
      'isolation_reflection': {
        text: 'Kau merenungkan isolasimu dari dunia luar. Ada kedamaian aneh dalam isolasi ini - tidak ada tuntutan, tidak ada kebisingan, hanya kau dan ritme menenangkan dari tubuh Lawless yang menyelimutimu.',
        choices: [
          { id: 'embrace_isolation', text: 'Merangkul isolasi ini', nextScene: 'peaceful_rest' },
          { id: 'miss_outside', text: 'Merindukan dunia luar', nextScene: 'negotiated_release' },
          { id: 'share_thoughts', text: 'Berbagi pemikiranmu', nextScene: 'conversation_inside' }
        ],
        effect: () => {
          this.playSound('heartbeat');
          this.showBellyEnvironment(2);
        }
      },
      
      'outside_conversation': {
        character: 'Lawless',
        text: function() {
          return `Kau memikirkan dunia luar, ${this.playerName}? Menarik... Kebanyakan yang berada di dalam diriku terlalu terpesona dengan pengalaman internal untuk memikirkan apa yang terjadi di luar.`;
        },
        choices: [
          { id: 'miss_outside', text: 'Aku sedikit merindukan dunia luar', nextScene: 'negotiated_release' },
          { id: 'prefer_inside', text: 'Sebenarnya, aku lebih menyukai di dalam sini', nextScene: 'stomach_acceptance' },
          { id: 'curious_both', text: 'Aku penasaran dengan keduanya', nextScene: 'balanced_perspective' }
        ],
        effect: () => {
          this.changeBackgroundMusic('playful');
        }
      },
      
      'balanced_perspective': {
        character: 'Lawless',
        text: function() {
          return `Penasaran dengan keduanya, ${this.playerName}? Kau memang unik. Kebanyakan orang hanya bisa fokus pada satu hal - ketakutan mereka atau kenikmatan mereka. Tapi kau... kau bisa melihat keduanya.`;
        },
        choices: [
          { id: 'appreciate_comment', text: 'Terima kasih atas pengertianmu', nextScene: 'shared_experience' },
          { id: 'suggest_arrangement', text: 'Mungkin kita bisa membuat pengaturan khusus?', nextScene: 'negotiated_release' },
          { id: 'stay_longer', text: 'Aku ingin tinggal lebih lama', nextScene: 'stomach_acceptance' }
        ],
        effect: () => {
          this.playSound('heartbeat');
          this.changeBackgroundMusic('playful');
        }
      },
      
      'stomach_playful': {
        text: 'Kau merasakan sensasi hangat dan menyenangkan di dalam perut Lawless. Dinding-dindingnya bergerak dengan ritme yang playful, seperti menari di sekitarmu. Detak jantungnya terdengar seperti musik yang mengundang untuk bersenang-senang.',
        choices: [
          { id: 'dance_along', text: 'Bergerak mengikuti ritme perutnya', nextScene: 'rhythm_sync' },
          { id: 'tease_back', text: 'Menggoda balik dengan sentuhan lembut', nextScene: 'pleasant_response' },
          { id: 'talk_playfully', text: 'Berbicara dengan nada menggoda', nextScene: 'conversation_inside' }
        ],
        effect: () => {
          this.showBellyEnvironment(2);
          this.playSound('heartbeat');
          this.playSound('stomach');
          document.body.classList.add('gentle-sway');
          setTimeout(() => {
            document.body.classList.remove('gentle-sway');
          }, 3000);
        }
      },
      
      'stomach_exploration': {
        text: 'Kau mulai menjelajahi interior perut Lawless dengan penuh rasa ingin tahu. Dinding-dindingnya berkilau dengan cahaya lembut, dan kau menemukan berbagai tekstur dan bentuk yang menarik. Setiap bagian memberikan sensasi yang berbeda saat kau menyentuhnya.',
        choices: [
          { id: 'examine_walls', text: 'Memeriksa dinding perut lebih detail', nextScene: 'wall_touching' },
          { id: 'explore_fluid', text: 'Menjelajahi cairan di sekitarmu', nextScene: 'fluid_analysis' },
          { id: 'find_comfortable', text: 'Mencari tempat yang nyaman', nextScene: 'comfort_search' },
          { id: 'call_lawless', text: 'Memanggil Lawless', nextScene: 'conversation_inside' }
        ],
        effect: () => {
          this.showBellyEnvironment(2);
          this.playSound('stomach');
        }
      },
      
      'regret_response': {
        character: 'Lawless',
        text: function() {
          return `Kesalahan? Mungkin, ${this.playerName}... atau mungkin ini adalah takdirmu. Tidak semua yang tampak menakutkan pada awalnya berakhir buruk, kau tahu.`;
        },
        choices: [
          { id: 'reconsider', text: 'Mungkin kau benar...', nextScene: 'curious_response' },
          { id: 'stand_firm', text: 'Tidak, aku ingin pergi', nextScene: 'polite_exit' }
        ],
        effect: () => {
          this.playSound('heartbeat');
        }
      },
      
      'reconsideration': {
        character: 'Lawless',
        text: function() {
          return `Tidak yakin, ${this.playerName}? Hmm... Aku menghargai kejujuranmu. Mungkin kita bisa mencari kompromi yang lebih... nyaman bagimu.`;
        },
        choices: [
          { id: 'suggest_alternative', text: 'Mungkin kita bisa bertemu lagi nanti?', nextScene: 'temporary_release' },
          { id: 'change_mind', text: 'Sebenarnya... aku ingin mencoba', nextScene: 'temporary_stay_offer' }
        ],
        effect: () => {
          this.changeBackgroundMusic('playful');
        }
      },
      
      'outside_conversation': {
        character: 'Lawless',
        text: function() {
          return `Dunia luar? Apa yang menarik darinya? Di sini, di dalam diriku, ${this.playerName} terlindungi dari segala bahaya dan tuntutan dunia luar.`;
        },
        choices: [
          { id: 'miss_outside', text: 'Aku sedikit merindukan dunia luar', nextScene: 'negotiated_release' },
          { id: 'prefer_inside', text: 'Sebenarnya, aku lebih menyukai di dalam sini', nextScene: 'stomach_acceptance' }
        ],
        effect: () => {
          this.changeBackgroundMusic('playful');
        }
      },
      
      'stomach_small': {
        text: function() {
          return `${this.playerName} merasakan dirimu berada dalam ruang yang lebih kecil dan intim di dalam perut Lawless. Dinding-dindingnya memelukmu dengan lembut, memberikan sensasi hangat dan aman. Detak jantungnya terdengar lebih jelas dan dekat, seperti lullaby yang menenangkan.`;
        },
        choices: [
          { id: 'enjoy_small', text: 'Menikmati ruang yang intim ini', nextScene: 'peaceful_rest' },
          { id: 'explore_small', text: 'Menjelajahi ruang kecil ini', nextScene: 'gentle_exploration' },
          { id: 'talk_small', text: 'Berbicara dengan Lawless', nextScene: 'conversation_inside' }
        ],
        effect: () => {
          this.showBellyEnvironment(1);
          this.playSound('heartbeat');
          this.playSound('stomach');
        }
      },
      
      // Adding missing scenes that were referenced but not defined
      'intimate_moment': {
        text: function() {
          return `${this.playerName} meringkuk lebih dekat ke dinding perut Lawless, merasakan kehangatan yang intens. Dinding-dinding perutnya bergerak lembut, seperti memelukmu balik. Detak jantungnya terdengar lebih jelas, menciptakan momen keintiman yang tak terduga.`;
        },
        choices: [
          { id: 'enjoy_closeness', text: 'Menikmati kedekatan ini', nextScene: 'peaceful_rest' },
          { id: 'talk_about_feeling', text: 'Berbicara tentang perasaanmu', nextScene: 'conversation_inside' }
        ],
        effect: () => {
          this.playSound('heartbeat');
          this.showBellyEnvironment(1);
          document.body.classList.add('gentle-glow');
          setTimeout(() => {
            document.body.classList.remove('gentle-glow');
          }, 3000);
        }
      },
      
      'lawless_insight': {
        character: 'Lawless',
        text: function() {
          return `Tentu saja aku bisa merasakan setiap gerakan ${this.playerName} di dalam sana. Setiap getaran, setiap sentuhan... Itu seperti koneksi intim yang tidak bisa dijelaskan dengan kata-kata. Aku bisa merasakan detak jantungmu, bahkan emosimu.`;
        },
        choices: [
          { id: 'fascinated', text: 'Itu... menakjubkan', nextScene: 'shared_experience' },
          { id: 'bit_scared', text: 'Itu sedikit menakutkan...', nextScene: 'reassurance_dialogue' },
          { id: 'curious_more', text: 'Apa lagi yang bisa kau rasakan?', nextScene: 'deeper_connection' }
        ],
        effect: () => {
          this.playSound('heartbeat');
          this.showBellyEnvironment(2);
        }
      },
      
      'shared_experience': {
        character: 'Lawless',
        text: function() {
          return `Mmm~ Aku suka bagaimana ${this.playerName} berbagi pengalamanmu denganku. Setiap emosi yang kau rasakan, aku juga merasakannya. Kita terhubung dengan cara yang sangat istimewa sekarang.`;
        },
        choices: [
          { id: 'deepen_bond', text: 'Ingin memperdalam ikatan ini', nextScene: 'deeper_connection' },
          { id: 'enjoy_moment', text: 'Menikmati momen kebersamaan', nextScene: 'peaceful_rest' },
          { id: 'ask_more', text: 'Bagaimana dengan pengalamanmu?', nextScene: 'lawless_experience' }
        ],
        effect: () => {
          this.changeBackgroundMusic('playful');
          this.playSound('heartbeat');
        }
      },
      
      'conscious_experience': {
        text: function() {
          return `${this.playerName} memilih untuk tetap terjaga, menikmati setiap sensasi yang ditawarkan oleh interior perut Lawless. Kehangatan yang menyelimuti, gerakan ritmis dinding-dinding perutnya, dan detak jantungnya yang konstan menciptakan pengalaman yang hampir meditatif.`;
        },
        choices: [
          { id: 'observe_details', text: 'Mengamati detail sekitarmu', nextScene: 'environment_analysis' },
          { id: 'feel_connection', text: 'Merasakan koneksi dengan Lawless', nextScene: 'shared_experience' },
          { id: 'try_communicate', text: 'Mencoba berkomunikasi', nextScene: 'conversation_inside' }
        ],
        effect: () => {
          this.showBellyEnvironment(2);
          this.playSound('stomach');
        }
      },
      
      'deeper_meditation': {
        text: function() {
          return `${this.playerName} memperdalam meditasimu, membiarkan kesadaranmu melebur dengan ritme tubuh Lawless. Detak jantungnya menjadi pusat fokusmu, dan perlahan kau merasakan batas antara dirimu dan Lawless semakin kabur.`;
        },
        choices: [
          { id: 'embrace_oneness', text: 'Merangkul kesatuan ini', nextScene: 'complete_surrender' },
          { id: 'maintain_awareness', text: 'Mempertahankan kesadaran diri', nextScene: 'conscious_experience' },
          { id: 'share_insight', text: 'Berbagi wawasan dengan Lawless', nextScene: 'shared_experience' }
        ],
        effect: () => {
          this.playSound('heartbeat');
          this.showBellyEnvironment(2);
          document.body.classList.add('gentle-pulse');
          setTimeout(() => {
            document.body.classList.remove('gentle-pulse');
          }, 3000);
        }
      },
      
      'temporary_stay': {
        character: 'Lawless',
        text: function() {
          return `Pilihan bijak, ${this.playerName}. Kau akan merasakan sensasi luar biasa, dan aku akan melepaskanmu setelah... katakanlah, beberapa jam?`;
        },
        choices: [
          { id: 'agree_terms', text: 'Setuju dengan syaratmu', nextScene: 'stomach_medium' },
          { id: 'negotiate', text: 'Bisakah kita negosiasikan waktunya?', nextScene: 'negotiation' }
        ]
      },
      
      'negotiation': {
        character: 'Lawless',
        text: function() {
          return `Hmm, ${this.playerName} berani menegosiasikan dengan predator? Menarik... Berapa lama yang kau inginkan?`;
        },
        choices: [
          { id: 'short_time', text: 'Hanya setengah jam', nextScene: 'short_stay' },
          { id: 'medium_time', text: 'Satu jam penuh', nextScene: 'medium_stay' },
          { id: 'long_time', text: 'Dua jam, aku ingin menikmatinya', nextScene: 'long_stay' }
        ]
      },
      
      'short_stay': {
        character: 'Lawless',
        text: function() {
          return `Setengah jam? Baiklah, tapi ${this.playerName} mungkin tidak akan merasakan pengalaman penuhnya...`;
        },
        choices: [
          { id: 'confirm_short', text: 'Itu cukup untukku', nextScene: 'stomach_small' }
        ]
      },
      
      'medium_stay': {
        character: 'Lawless',
        text: function() {
          return `Satu jam... waktu yang cukup untuk kita berdua menikmati pengalaman ini, ${this.playerName}.`;
        },
        choices: [
          { id: 'confirm_medium', text: 'Sempurna', nextScene: 'stomach_medium' }
        ]
      },
      
      'long_stay': {
        character: 'Lawless',
        text: function() {
          return `Dua jam? ${this.playerName} benar-benar ingin menikmati waktumu di dalam diriku, ya? Aku suka itu.`;
        },
        choices: [
          { id: 'confirm_long', text: 'Aku ingin merasakan semuanya', nextScene: 'stomach_large' }
        ]
      },
      
      'permanent_choice': {
        character: 'Lawless',
        text: function() {
          return `Oh? ${this.playerName} ingin menjadi bagian dariku... selamanya? Kau yakin dengan keputusanmu?`;
        },
        choices: [
          { id: 'fully_commit', text: 'Ya, aku yakin', nextScene: 'permanent_merge' },
          { id: 'reconsider', text: 'Mungkin aku perlu memikirkannya lagi', nextScene: 'reconsideration' }
        ]
      },
      
      'permanent_merge': {
        character: 'Lawless',
        text: function() {
          return `Kalau begitu, selamat datang di kehidupan barumu, ${this.playerName}... sebagai bagian dari diriku.`;
        },
        choices: [
          { id: 'embrace_fate', text: 'Menutup mata dan menerima takdir', nextScene: 'merge_complete' }
        ],
        effect: () => {
          document.body.style.background = 'linear-gradient(to bottom, #300a50, #120450)';
          this.playSound('intense');
        }
      },
      
      'merge_complete': {
        text: function() {
          return `${this.playerName} merasakan dirimu perlahan menyatu dengan Lawless. Kesadaranmu mulai berbaur dengan kesadarannya, menciptakan koneksi yang tak pernah kau bayangkan sebelumnya.`;
        },
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
        text: function() {
          return `Sekarang kita adalah satu, ${this.playerName}. Kau bisa merasakan kekuatanku, dan aku bisa merasakan keunikanmu. Bersama, kita akan menjelajahi dunia dengan cara yang baru.`;
        },
        choices: [
          { id: 'end_journey', text: 'Menikmati petualangan baru', nextScene: 'epilogue' }
        ]
      },
      
      'epilogue': {
        text: function() {
          return `Dan begitulah, ${this.playerName} dan Lawless menjadi satu entitas, berbagi pengalaman dan kenangan untuk selamanya...`;
        },
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
        text: function() {
          return `${this.playerName} berada di dalam perut Lawless yang hangat. Ruangannya tidak terlalu besar, tapi cukup nyaman untuk sementara waktu.`;
        },
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
        text: function() {
          return `Perut Lawless terasa luas dan nyaman untuk ${this.playerName}. Dinding-dindingnya berkilau dengan cahaya biru lembut, menciptakan suasana yang hampir magis.`;
        },
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
        text: function() {
          return `${this.playerName} terkejut melihat betapa luasnya interior perut Lawless. Ruangan ini hampir seperti dunia tersendiri, dengan berbagai warna dan tekstur yang menakjubkan.`;
        },
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
        text: function() {
          return `${this.playerName} melanjutkan eksplorasimu di dalam perut Lawless. Semakin dalam kau menjelajah, semakin banyak keajaiban yang kau temukan.`;
        },
        choices: [
          { id: 'find_secret', text: 'Menemukan ruangan tersembunyi', nextScene: 'secret_chamber' },
          { id: 'return_main', text: 'Kembali ke area utama', nextScene: 'return_to_stomach' }
        ]
      },
      
      'secret_chamber': {
        text: function() {
          return `${this.playerName} menemukan ruangan tersembunyi yang dipenuhi dengan kristal bercahaya. Ruangan ini tampak seperti tempat meditasi atau semacam altar.`;
        },
        choices: [
          { id: 'meditate_chamber', text: 'Bermeditasi di ruangan ini', nextScene: 'meditation_experience' },
          { id: 'examine_crystals', text: 'Memeriksa kristal-kristal', nextScene: 'crystal_discovery' }
        ]
      },
      
      'lawless_past_story': {
        character: 'Lawless',
        text: function() {
          return `Aku sudah ada sejak ribuan tahun yang lalu, ${this.playerName}. Awalnya aku adalah naga biasa, tapi sebuah ritual kuno memberiku kekuatan untuk menyerap esensi makhluk lain. Sejak itu, aku hidup dengan cara ini... mencari jiwa-jiwa yang menarik untuk menjadi bagian dariku.`;
        },
        choices: [
          { id: 'sympathize', text: 'Itu terdengar... kesepian', nextScene: 'loneliness_discussion' },
          { id: 'curious_more', text: 'Ceritakan lebih banyak tentang ritual itu', nextScene: 'ritual_explanation' }
        ]
      },
      
      'loneliness_discussion': {
        character: 'Lawless',
        text: function() {
          return `Kesepian? Mungkin, ${this.playerName}. Tapi aku tidak pernah benar-benar sendiri. Aku membawa semua jiwa yang pernah kutelan. Mereka semua masih ada di dalam diriku, dalam suatu bentuk.`;
        },
        choices: [
          { id: 'meet_others', text: 'Bisakah aku bertemu dengan mereka?', nextScene: 'meet_other_souls' },
          { id: 'be_special', text: 'Apakah aku spesial bagimu?', nextScene: 'special_connection' }
        ]
      },
      
      'meet_other_souls': {
        character: 'Lawless',
        text: function() {
          return `Bertemu dengan jiwa-jiwa lain? Hmm... itu belum pernah terjadi sebelumnya. Tapi mungkin... karena ${this.playerName} berbeda.`;
        },
        choices: [
          { id: 'try_connection', text: 'Mari kita coba', nextScene: 'soul_meeting' },
          { id: 'too_risky', text: 'Mungkin terlalu berisiko', nextScene: 'respect_boundaries' }
        ]
      },
      
      'soul_meeting': {
        text: function() {
          return `Lawless memejamkan mata, dan tiba-tiba ${this.playerName} merasakan kehadiran lain di sekitarmu. Bayangan-bayangan samar mulai muncul, membentuk sosok-sosok yang hampir transparan.`;
        },
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
        text: function() {
          return `Tidak takut? Hmm, keberanian atau kebodohan? Mari kita lihat seberapa lama keberanian ${this.playerName} bertahan...`;
        },
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
        text: function() {
          return `${this.playerName} benar-benar menarik. Jarang ada yang tetap berani di hadapanku. Aku suka tantangan...`;
        },
        choices: [
          { id: 'challenge', text: 'Apa yang bisa kau lakukan padaku?', nextScene: 'challenge_accepted' },
          { id: 'negotiate_brave', text: 'Mari kita bicarakan ini sebagai sesama yang setara', nextScene: 'equal_terms' }
        ]
      },
      
      'challenge_accepted': {
        character: 'Lawless',
        text: function() {
          return `Apa yang bisa kulakukan? Oh, banyak sekali... Tapi mungkin yang paling menarik adalah membuat ${this.playerName} memohon.`;
        },
        choices: [
          { id: 'never_beg', text: 'Aku tidak akan pernah memohon', nextScene: 'never_beg_response' },
          { id: 'curious_how', text: 'Bagaimana caramu melakukannya?', nextScene: 'curious_methods' }
        ]
      },
      
      'tease_response': {
        character: 'Lawless',
        text: function() {
          return `Oh? Menantangku? ${this.playerName} punya nyali juga rupanya. Aku suka mangsa yang punya... kepribadian.`;
        },
        choices: [
          { id: 'continue_tease', text: 'Aku bukan mangsa. Aku tamu.', nextScene: 'guest_not_prey' },
          { id: 'flirt', text: 'Mungkin kita bisa bersenang-senang bersama', nextScene: 'flirtatious_path' }
        ]
      },
      
      'guest_not_prey': {
        character: 'Lawless',
        text: function() {
          return `Tamu? Hmm, menarik sekali cara pandang ${this.playerName}. Baiklah, anggap saja ini... undangan makan malam.`;
        },
        choices: [
          { id: 'accept_dinner', text: 'Dengan senang hati, tapi aku yang menentukan menunya', nextScene: 'dinner_negotiation' },
          { id: 'decline_dinner', text: 'Aku lebih suka menjadi tuan rumah, bukan hidangan', nextScene: 'host_not_meal' }
        ]
      },
      
      'flirtatious_path': {
        character: 'Lawless',
        text: function() {
          return `Bersenang-senang? Aku suka cara ${this.playerName} berpikir. Katakan, kesenangan seperti apa yang kau bayangkan?`;
        },
        choices: [
          { id: 'playful_suggestion', text: 'Bagaimana kalau kita bermain petak umpet di dalam perutmu?', nextScene: 'playful_response' },
          { id: 'intimate_suggestion', text: 'Mungkin sesuatu yang lebih... intim', nextScene: 'intimate_response' }
        ]
      },
      
      'playful_response': {
        character: 'Lawless',
        text: function() {
          return `Petak umpet di dalam perutku? Haha, ${this.playerName} benar-benar unik! Baiklah, tapi aku peringatkan, tidak ada yang pernah menang melawanku dalam permainan itu.`;
        },
        choices: [
          { id: 'accept_game', text: 'Tantangan diterima!', nextScene: 'stomach_game' },
          { id: 'suggest_other', text: 'Bagaimana dengan permainan lain?', nextScene: 'other_games' }
        ]
      },
      
      'stomach_game': {
        text: function() {
          return `Lawless menelan ${this.playerName} dengan satu tegukan besar. Di dalam, kau menemukan ruangan yang jauh lebih luas dari yang kau bayangkan, dengan berbagai lorong dan ruang tersembunyi.`;
        },
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
        text: function() {
          return `Berani tapi tetap menghormati... ${this.playerName} bijaksana juga rupanya. Tapi tetap saja, kau akan menjadi santapanku.`;
        },
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
        text: function() {
          return `Mmm~ Aku suka mangsa seperti ${this.playerName} yang menerima takdirnya. Bersiaplah untuk pengalaman yang tak terlupakan...`;
        },
        choices: [
          { id: 'close_eyes', text: 'Menutup mata dan pasrah', nextScene: 'swallow_scene_willing' },
          { id: 'watch_process', text: 'Melihat proses penelanan', nextScene: 'swallow_scene_watching' }
        ],
        effect: () => {
          this.playSound('gulp');
        }
      },
      
      'swallow_scene_willing': {
        text: function() {
          return `${this.playerName} menutup mata saat Lawless membuka mulutnya lebar. Kau merasakan lidahnya yang basah menyentuh kulitmu sebelum kegelapan menelanmu sepenuhnya.`;
        },
        choices: [
          { id: 'feel_throat', text: 'Merasakan sensasi di tenggorokannya', nextScene: 'throat_passage' }
        ],
        effect: () => {
          this.playSound('gulp');
          this.playSound('fluid');
        }
      },
      
      'throat_passage': {
        text: function() {
          return `${this.playerName} merasakan dinding-dinding tenggorokan Lawless bergerak, mendorongmu semakin dalam. Sensasi hangat dan basah menyelimutimu saat kau meluncur ke bawah.`;
        },
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
        text: function() {
          return `Mmm~ Aku bisa merasakan ${this.playerName} bergerak di dalam tenggorokanku. Teruslah bergerak, itu membuatnya lebih... menyenangkan.`;
        },
        choices: [
          { id: 'continue_movement', text: 'Terus bergerak perlahan', nextScene: 'stomach_arrival_movement' }
        ],
        effect: () => {
          this.showBellyEnvironment(1);
        }
      },
      
      'stomach_arrival_movement': {
        text: function() {
          return `Dengan satu dorongan terakhir, ${this.playerName} jatuh ke dalam perut Lawless. Dinding-dindingnya berkilau dengan cahaya aneh, dan suara detak jantungnya terdengar jelas.`;
        },
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
        text: function() {
          return `${this.playerName} menyentuh dinding perut yang lembut dan elastis. Mereka bergerak dengan ritme pernapasan Lawless, dan kau bisa merasakan aliran darah di baliknya.`;
        },
        choices: [
          { id: 'press_walls', text: 'Menekan dinding untuk mendapat reaksi', nextScene: 'wall_pressing_reaction' },
          { id: 'trace_patterns', text: 'Menelusuri pola pada dinding', nextScene: 'wall_pattern_discovery' }
        ]
      },
      
      'wall_pressing_reaction': {
        character: 'Lawless',
        text: function() {
          return `Ohh~ Aku bisa merasakan ${this.playerName} menekan perutku dari dalam. Itu... sensasi yang menarik.`;
        },
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
        text: function() {
          return `Mmm! ${this.playerName} cukup kuat untuk ukuran mangsaku. Aku suka itu... tapi jangan lupa siapa yang mengendalikan situasi di sini.`;
        },
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
        text: function() {
          return `Hahaha! ${this.playerName} benar-benar punya semangat! Teruslah berjuang, itu membuat perutku terasa... hidup.`;
        },
        choices: [
          { id: 'tire_out', text: 'Perlahan kelelahan dan menyerah', nextScene: 'exhaustion_surrender' },
          { id: 'find_weakness', text: 'Mencari titik lemah di dinding perut', nextScene: 'weakness_search' }
        ],
        effect: () => {
          this.playSound('laugh');
        }
      },
      
      'exhaustion_surrender': {
        text: function() {
          return `Setelah beberapa saat berjuang, ${this.playerName} mulai merasa lelah. Kehangatan perut Lawless membuatmu mengantuk, dan kau perlahan menyerah pada sensasi nyaman yang menyelimutimu.`;
        },
        choices: [
          { id: 'curl_up', text: 'Meringkuk dan beristirahat', nextScene: 'peaceful_rest' },
          { id: 'final_words', text: 'Berbicara pada Lawless sebelum beristirahat', nextScene: 'final_conversation' }
        ],
        effect: () => {
          this.changeBackgroundMusic('playful');
        }
      },
      
      'peaceful_rest': {
        text: function() {
          return `${this.playerName} meringkuk dalam kehangatan perut Lawless, detak jantungnya menjadi lagu pengantar tidur. Sensasi aneh tapi menenangkan menyelimutimu saat kau perlahan tertidur.`;
        },
        choices: [
          { id: 'dream_state', text: 'Masuk ke dalam mimpi', nextScene: 'vore_dream_sequence' }
        ],
        effect: () => {
          this.playSound('heartbeat');
        }
      },
      
      'vore_dream_sequence': {
        text: function() {
          return `Dalam mimpimu, ${this.playerName} melihat dirimu dan Lawless dalam berbagai skenario vore yang berbeda. Kau merasakan koneksi aneh dengan predatormu, seolah kalian telah terhubung pada level yang lebih dalam.`;
        },
        choices: [
          { id: 'accept_connection', text: 'Menerima koneksi ini', nextScene: 'spiritual_bond' },
          { id: 'resist_connection', text: 'Mencoba mempertahankan identitasmu', nextScene: 'identity_preservation' }
        ]
      },
      
      'gentle_vore': {
        character: 'Lawless',
        text: function() {
          return `Dengan lembut? Hmm... Aku bisa melakukannya. ${this.playerName} adalah mangsa yang spesial, lagipula.`;
        },
        choices: [
          { id: 'thank_consideration', text: 'Terima kasih atas pengertianmu', nextScene: 'gentle_swallow' },
          { id: 'nervous_but_ready', text: 'Aku... sedikit gugup, tapi aku siap', nextScene: 'reassurance_before_swallow' }
        ]
      },
      
      'gentle_swallow': {
        text: function() {
          return `Lawless membuka mulutnya perlahan, lidahnya menjulur dengan lembut untuk menyentuh ${this.playerName}. Dengan gerakan yang hampir seperti ciuman, ia mulai menelanmu.`;
        },
        choices: [
          { id: 'embrace_tongue', text: 'Memeluk lidahnya saat ia menelanmu', nextScene: 'intimate_swallow' }
        ],
        effect: () => {
          this.playSound('gulp');
        }
      },
      
      'intimate_swallow': {
        text: function() {
          return `${this.playerName} merasakan kehangatan lidah Lawless saat ia dengan lembut mendorongmu ke dalam mulutnya. Proses penelanan terasa intim dan hampir seperti pelukan yang erat.`;
        },
        choices: [
          { id: 'slide_down', text: 'Membiarkan dirimu meluncur ke dalam kerongkongannya', nextScene: 'gentle_descent' }
        ],
        effect: () => {
          this.playSound('fluid');
        }
      },
      
      'gentle_descent': {
        text: function() {
          return `${this.playerName} meluncur dengan lembut melalui kerongkongan Lawless, merasakan dinding-dindingnya bergerak dengan ritme yang menenangkan. Tidak ada rasa takut, hanya sensasi aneh yang menyenangkan.`;
        },
        choices: [
          { id: 'enjoy_journey', text: 'Menikmati perjalanan ke bawah', nextScene: 'peaceful_arrival' }
        ],
        effect: () => {
          this.showBellyEnvironment(1);
        }
      },
      
      'peaceful_arrival': {
        text: function() {
          return `Dengan lembut, ${this.playerName} mendarat di dalam perut Lawless. Ruangan itu terasa hangat dan nyaman, dengan cahaya kebiruan yang menerangi interior yang lembab namun tidak menakutkan.`;
        },
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
        text: function() {
          return `Interior perut Lawless jauh lebih indah dari yang ${this.playerName} bayangkan. Dinding-dindingnya berkilau dengan warna-warna yang berubah, menciptakan pemandangan yang hampir magis.`;
        },
        choices: [
          { id: 'compliment_beauty', text: 'Memuji keindahan interiornya', nextScene: 'beauty_compliment' },
          { id: 'explore_further', text: 'Menjelajah lebih jauh', nextScene: 'deeper_exploration' }
        ]
      },
      
      'beauty_compliment': {
        character: 'Lawless',
        text: function() {
          return `${this.playerName}... menyukai interiorku? Itu... pujian yang tidak biasa. Tapi aku menghargainya.`;
        },
        choices: [
          { id: 'ask_how_works', text: 'Bagaimana semua ini bisa berfungsi?', nextScene: 'vore_explanation' },
          { id: 'just_enjoy', text: 'Aku hanya ingin menikmati momen ini', nextScene: 'enjoyment_moment' }
        ]
      },
      
      'vore_explanation': {
        character: 'Lawless',
        text: function() {
          return `Tubuhku tidak seperti tubuh makhluk biasa, ${this.playerName}. Aku bisa mengubah interior perutku untuk kenyamanan... atau ketidaknyamanan mangsaku. Untuk mangsa spesial sepertimu, aku memilih yang terbaik.`;
        },
        choices: [
          { id: 'feel_special', text: 'Aku merasa tersanjung', nextScene: 'special_prey_moment' },
          { id: 'ask_other_prey', text: 'Apa yang terjadi pada mangsa lainnya?', nextScene: 'other_prey_fate' }
        ]
      },
      
      'wall_touching': {
        text: function() {
          return `Saat ${this.playerName} menyentuh dinding perut, kau merasakan mereka merespons sentuhanmu, bergerak sedikit seperti kulit yang sensitif. Sensasi aneh tapi menyenangkan menjalar di jari-jarimu.`;
        },
        choices: [
          { id: 'stroke_gently', text: 'Mengelus dinding dengan lembut', nextScene: 'stomach_acceptance' },
          { id: 'press_curiously', text: 'Menekan dengan penasaran', nextScene: 'stomach_struggle' }
        ]
      },
      
      'wall_stroking': {
        character: 'Lawless',
        text: function() {
          return `Mmm~ Itu... terasa sangat menyenangkan, ${this.playerName}. Jarang ada yang memperlakukan perutku dengan begitu lembut.`;
        },
        choices: [
          { id: 'continue_stroking', text: 'Melanjutkan mengelus dinding perut', nextScene: 'stomach_acceptance' },
          { id: 'ask_feeling', text: 'Apakah kau bisa merasakan semua yang kulakukan?', nextScene: 'stomach_passive' }
        ],
        effect: () => {
          this.playSound('laugh');
        }
      },
      
      'continued_stroking': {
        text: function() {
          return `${this.playerName} terus mengelus dinding perut Lawless, merasakan mereka bergetar dengan senang di bawah sentuhanmu. Cairan di sekitarmu terasa lebih hangat, seperti merespons tindakanmu.`;
        },
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
        text: function() {
          return `Ohh~ Itu... luar biasa. ${this.playerName} memiliki sentuhan yang ajaib. Mungkin aku akan menahanmu lebih lama dari yang kurencanakan...`;
        },
        choices: [
          { id: 'pleased_to_help', text: 'Senang bisa membuatmu nyaman', nextScene: 'mutual_pleasure' },
          { id: 'ask_how_long', text: 'Berapa lama kau akan menahanku?', nextScene: 'duration_discussion' }
        ]
      },
      
      'mutual_pleasure': {
        character: 'Lawless',
        text: function() {
          return `${this.playerName}, kau mangsa yang sangat pengertian. Ini pengalaman vore yang paling menyenangkan yang pernah kualami.`;
        },
        choices: [
          { id: 'feel_honored', text: 'Aku merasa terhormat', nextScene: 'honored_prey' },
          { id: 'suggest_again', text: 'Kita harus melakukan ini lagi kapan-kapan', nextScene: 'repeat_suggestion' }
        ]
      },
      
      'honored_prey': {
        character: 'Lawless',
        text: function() {
          return `Terhormat? Haha, ${this.playerName}, kau benar-benar unik. Kebanyakan mangsa tidak akan menggunakan kata itu untuk situasi mereka.`;
        },
        choices: [
          { id: 'not_ordinary', text: 'Aku bukan mangsa biasa', nextScene: 'special_connection' },
          { id: 'ask_release', text: 'Kapan kau akan melepaskanku?', nextScene: 'release_discussion' }
        ]
      },
      
      'special_connection': {
        character: 'Lawless',
        text: function() {
          return `Memang tidak. ${this.playerName}, kau... spesial. Aku merasakan koneksi yang tidak biasa denganmu. Seolah kita ditakdirkan untuk bertemu seperti ini.`;
        },
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
        text: function() {
          return `Memperdalam ikatan kita? Mmm~ ${this.playerName}, aku sangat menyukai ide itu. Bagaimana menurutmu kita bisa melakukannya?`;
        },
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
        text: function() {
          return `Sentuhan yang lebih intim? ${this.playerName}, aku suka caramu berpikir. Dinding perutku sangat sensitif, kau tahu... terutama di bagian tertentu.`;
        },
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
        text: function() {
          return `Mungkin takdir mempertemukan kita, ${this.playerName}. Predator dan mangsa, terhubung dalam pengalaman intim yang jarang terjadi. Aku bisa merasakan detak jantungmu yang berirama dengan detak jantungku.`;
        },
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
        text: function() {
          return `Koneksi yang lebih dalam? Mmm~ ${this.playerName}, aku bisa merasakanmu dari setiap sudut perutku. Setiap gerakanmu, setiap napasmu... semua terasa begitu intim.`;
        },
        choices: [
          { id: 'synchronize_breathing', text: 'Menyesuaikan napas dengan detak jantungnya', nextScene: 'breath_synchronization' },
          { id: 'share_emotions', text: 'Berbagi emosi dan perasaan', nextScene: 'emotional_sharing' }
        ],
        effect: () => {
          this.playSound('stomach');
        }
      },
      
      'breath_synchronization': {
        text: function() {
          return `${this.playerName} mulai menyesuaikan ritme napasmu dengan detak jantung Lawless. Perlahan, kau merasakan sensasi aneh seolah batas antara kalian mulai memudar.`;
        },
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
        text: function() {
          return `${this.playerName}... Aku bisa merasakanmu. Bukan hanya secara fisik, tapi lebih dari itu. Seolah kita mulai berbagi kesadaran. Ini... luar biasa.`;
        },
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
        text: function() {
          return `${this.playerName}, aku akan menantikannya. Perutku akan selalu terbuka untukmu... secara harfiah.`;
        },
        effect: () => {
          this.playSound('exit');
          setTimeout(() => this.exitRoleplay(), 4000);
        }
      },
      
      // Ending scenes
      'complete_unity': {
        character: 'Lawless',
        text: function() {
          return `${this.playerName}, kita telah mencapai tingkat koneksi yang jarang terjadi. Aku bisa merasakan jiwamu bersatu dengan jiwaku.`;
        },
        choices: [
          { id: 'reflect_journey', text: 'Merenungkan perjalanan ini', nextScene: 'final_reflection' },
          { id: 'embrace_unity', text: 'Merangkul kesatuan ini sepenuhnya', nextScene: 'unity_celebration' }
        ],
        effect: () => {
          this.playSound('heartbeat');
          this.changeBackgroundMusic('intense');
        }
      },
      
      'balanced_connection': {
        character: 'Lawless',
        text: function() {
          return `Keseimbangan yang bijaksana, ${this.playerName}. Kita bisa terhubung tanpa kehilangan diri kita masing-masing.`;
        },
        choices: [
          { id: 'reflect_journey', text: 'Merenungkan perjalanan ini', nextScene: 'final_reflection' },
          { id: 'continue_adventure', text: 'Melanjutkan petualangan bersama', nextScene: 'future_adventures' }
        ],
        effect: () => {
          this.playSound('heartbeat');
        }
      },
      
      'unity_celebration': {
        character: 'Lawless',
        text: function() {
          return `Kesatuan kita adalah sesuatu yang patut dirayakan, ${this.playerName}. Bersama, kita akan mengalami petualangan yang tak terbayangkan.`;
        },
        choices: [
          { id: 'reflect_journey', text: 'Merenungkan perjalanan sebelum melanjutkan', nextScene: 'final_reflection' }
        ],
        effect: () => {
          this.changeBackgroundMusic('playful');
        }
      },
      
      'final_reflection': {
        character: 'Lawless',
        text: function() {
          return `${this.playerName}, kau merenungkan semua pengalaman yang telah kau lalui. Setiap pilihan yang kau buat membentuk dirimu menjadi lebih kuat dan bijaksana.`;
        },
        choices: [
          { id: 'reflect_on_choices', text: 'Aku merasa puas dengan semua ini.', nextScene: 'satisfied_ending' },
          { id: 'learn_from_mistakes', text: 'Aku merasa menyesal dengan beberapa pilihan.', nextScene: 'regret_ending' }
        ],
        effect: () => {
          this.playSound('heartbeat');
          this.showBellyEnvironment(2);
        }
      },
      
      'satisfied_ending': {
        character: 'Lawless',
        text: function() {
          return `${this.playerName} tersenyum, merasakan kedamaian dalam pilihanmu. Semua pengalaman ini membentuk dirimu menjadi lebih kuat. Aku senang kau tidak menyesali waktu kita bersama.`;
        },
        choices: [
          { id: 'end', text: 'Selesai', nextScene: 'exit' }
        ],
        effect: () => {
          this.playSound('exit');
          setTimeout(() => this.exitRoleplay(), 4000);
        }
      },
      
      'regret_ending': {
        character: 'Lawless',
        text: function() {
          return `${this.playerName} merenungkan pilihanmu, belajar dari kesalahan yang telah dibuat. Ini adalah bagian dari perjalananmu. Bahkan penyesalan memiliki nilai pembelajaran tersendiri.`;
        },
        choices: [
          { id: 'end', text: 'Selesai', nextScene: 'exit' }
        ],
        effect: () => {
          this.playSound('exit');
          setTimeout(() => this.exitRoleplay(), 4000);
        }
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
    
    // Adjust sounds based on belly size if audio system is available
    if (window.audioSystem && window.audioSystem.audioElements['stomach']) {
      const stomachVolume = 0.3 + (size * 0.2);
      window.audioSystem.audioElements['stomach'].volume = stomachVolume;
    }
  },
  
  // Play a sound effect using the audio system
  playSound(soundId) {
    if (window.audioSystem) {
      window.audioSystem.playSound(soundId);
    }
  },
  
  // Play background music using the audio system
  playBackgroundMusic(musicId) {
    if (window.audioSystem) {
      window.audioSystem.playBackgroundMusic(musicId);
    }
  },
  
  // Change background music with proper transitions using the audio system
  changeBackgroundMusic(musicId) {
    if (window.audioSystem) {
      window.audioSystem.changeBackgroundMusic(musicId);
    }
  },
  
  // Exit the roleplay game
  exitRoleplay() {
    // Notify audio system that easter egg is no longer active
    if (window.audioSystem) {
      window.audioSystem.setEasterEggState(false);
    }
    
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
    
    // Remove color shift overlay
    const colorShiftOverlay = document.querySelector('.color-shift-overlay');
    if (colorShiftOverlay) {
      colorShiftOverlay.remove();
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
    
    // Restore original nav styles
    if (this.originalNavStyles) {
      Object.keys(this.originalNavStyles).forEach(className => {
        const elements = document.querySelectorAll('.' + className.split(' ')[0]);
        elements.forEach(element => {
          element.style.cssText = this.originalNavStyles[className] || '';
        });
      });
    }
    
    // Reset state
    this.isActive = false;
    this.bellySize = 1;
    this.currentScene = 'intro';
    this.playerChoices = [];
    this.playerName = ''; // Clear player name
    
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
    
    // Restore original popstate handler
    if (this.originalPopStateHandler) {
      window.onpopstate = this.originalPopStateHandler;
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
    if (typeof initGame === 'function') {
      setTimeout(() => {
        initGame();
      }, 500);
    } else if (window.initGame && typeof window.initGame === 'function') {
      setTimeout(() => {
        window.initGame();
      }, 500);
    }
  }
};

// Initialize the easter egg when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  voreEasterEgg.init();
});
