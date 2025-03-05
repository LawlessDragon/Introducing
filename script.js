// Custom cursor
const cursor = document.querySelector('.custom-cursor');

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});

document.addEventListener('mousedown', () => {
  cursor.classList.add('active');
});

document.addEventListener('mouseup', () => {
  cursor.classList.remove('active');
});

// Text typing effect
const typingText = document.getElementById('typing-text');
const textToType = [
  "Aku Lawless, seekor hibrida IceWing & SeaWing...",
  "Tercipta dari es abadi dan lautan tak berujung...",
  "Siapkah kau menyelami kisahku?"
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingDelay = 100;

function typeText() {
  const currentText = textToType[textIndex];

  if (!isDeleting && charIndex <= currentText.length) {
    typingText.textContent = currentText.slice(0, charIndex);
    charIndex++;
    setTimeout(typeText, typingDelay);
  } else if (isDeleting && charIndex >= 0) {
    typingText.textContent = currentText.slice(0, charIndex);
    charIndex--;
    setTimeout(typeText, typingDelay / 2);
  } else {
    isDeleting = !isDeleting;

    if (!isDeleting) {
      textIndex = (textIndex + 1) % textToType.length;
    }

    setTimeout(typeText, isDeleting ? 1000 : 500);
  }
}

// Sections navigation
const sections = ['landing', 'about', 'gallery', 'lore', 'contact'];

navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();

    // Update active link
    navLinks.forEach(l => l.classList.remove('active'));
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
    gsap.fromTo(
      targetSection,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
    );
  });
});

// Mobile Menu Functionality
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const nav = document.querySelector('.nav');

mobileMenuBtn.addEventListener('click', () => {
  mobileMenuBtn.classList.toggle('active');
  nav.classList.toggle('mobile-active');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (!nav.contains(e.target) && !mobileMenuBtn.contains(e.target) && nav.classList.contains('mobile-active')) {
    mobileMenuBtn.classList.remove('active');
    nav.classList.remove('mobile-active');
  }
});

// Close menu when clicking nav links
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenuBtn.classList.remove('active');
    nav.classList.remove('mobile-active');
  });
});

// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const nav = document.querySelector('.nav');
  const overlay = document.createElement('div');
  
  // Create overlay for mobile menu
  overlay.className = 'mobile-menu-overlay';
  document.body.appendChild(overlay);
  
  // Toggle menu and overlay
  mobileMenuBtn.addEventListener('click', function(event) {
    event.stopPropagation();
    this.classList.toggle('active');
    nav.classList.toggle('mobile-active');
    overlay.classList.toggle('active');
    document.body.style.overflow = nav.classList.contains('mobile-active') ? 'hidden' : 'auto';
  });
  
  // Close menu when clicking overlay
  overlay.addEventListener('click', function() {
    mobileMenuBtn.classList.remove('active');
    nav.classList.remove('mobile-active');
    overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
  });
  
  // Close menu when clicking links
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function() {
      mobileMenuBtn.classList.remove('active');
      nav.classList.remove('mobile-active');
      overlay.classList.remove('active');
      document.body.style.overflow = 'auto';
    });
  });
  
  // Handle resize events
  window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
      mobileMenuBtn.classList.remove('active');
      nav.classList.remove('mobile-active');
      overlay.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  });
});

window.addEventListener('DOMContentLoaded', () => {
  document.body.style.overflow = 'auto';
});


// Enter button click
const enterButton = document.querySelector('.enter-btn');

enterButton.addEventListener('click', () => {
  // Hide landing, show about
  document.getElementById('landing').style.display = 'none';
  document.getElementById('about').style.display = 'flex';

  // Update active nav link
  navLinks.forEach(l => l.classList.remove('active'));
  document.querySelector('a[href="#about"]').classList.add('active');

  // Animate about section
  gsap.fromTo(
    '.about',
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
  );

  // Animate chat bubbles
  gsap.fromTo(
    '.chat-bubble',
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.6, stagger: 0.3, ease: 'power2.out' }
  );

  // Animate timeline items
  gsap.fromTo(
    '.timeline-item',
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.6, stagger: 0.2, ease: 'power2.out', delay: 0.5 }
  );
});

// Map regions
const mapRegions = document.querySelectorAll('.map-region');
const regionStories = document.querySelectorAll('.lore-story');

mapRegions.forEach(region => {
  region.addEventListener('click', () => {
    const regionId = region.getAttribute('data-region');

    // Hide all stories first
    regionStories.forEach(story => {
      gsap.to(story, { opacity: 0, y: 20, duration: 0.3 });
    });

    // Show the selected region story
    const targetStory = document.getElementById(`region-${regionId}`);
    gsap.fromTo(
      targetStory,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, delay: 0.3 }
    );

    // Animate the cinematic text
    gsap.fromTo(
      targetStory.querySelectorAll('.cinematic-text'),
      { opacity: 0 },
      { opacity: 1, duration: 0.8, stagger: 0.5, delay: 0.5 }
    );
  });
});

// Form input animation
const formInputs = document.querySelectorAll('.form-input');

formInputs.forEach(input => {
  input.addEventListener('focus', () => {
    input.parentElement.classList.add('focused');
  });

  input.addEventListener('blur', () => {
    if (input.value === '') {
      input.parentElement.classList.remove('focused');
    }
  });
});

// Easter egg - konami code sequence
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
  if (e.key === konamiCode[konamiIndex]) {
    konamiIndex++;

    if (konamiIndex === konamiCode.length) {
      activateEasterEgg();
      konamiIndex = 0;
    }
  } else {
    konamiIndex = 0;
  }
});

function createParticle(container, config) {
  const particle = document.createElement('div');
  Object.assign(particle.style, config.style);
  container.appendChild(particle);

  setTimeout(() => {
    particle.style.opacity = config.finalOpacity || '1';
    particle.style.transform = config.finalTransform;
  }, config.delay || 0);

  return particle;
}

function activateEasterEgg() {
  // Create overlay container
  const dragonRoar = document.createElement('div');
  Object.assign(dragonRoar.style, {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: '9999',
    fontFamily: 'Orbitron, sans-serif',
    fontSize: '3rem',
    color: 'var(--accent)',
    textShadow: '0 0 20px var(--accent)',
    flexDirection: 'column',
    overflow: 'hidden',
    opacity: '0',
    transition: 'opacity 0.5s ease-in-out'
  });

  // Create enhanced blue vignette effect
  const vignette = document.createElement('div');
  Object.assign(vignette.style, {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0, 150, 255, 0.05) 30%, rgba(0, 150, 255, 0.2) 60%, rgba(0, 150, 255, 0.4) 80%, rgba(0, 150, 255, 0.6) 100%)',
    opacity: '0',
    transition: 'opacity 0.5s',
    pointerEvents: 'none'
  });
  dragonRoar.appendChild(vignette);

  // Create lightning effects
  const createLightning = () => {
    const lightning = document.createElement('div');
    const side = Math.random() < 0.5 ? 'left' : 'right';
    const startY = Math.random() * 100;
    
    Object.assign(lightning.style, {
      position: 'absolute',
      [side]: '0',
      top: `${startY}%`,
      width: '150px',
      height: '3px',
      background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 50%, rgba(0,150,255,1) 100%)',
      filter: 'blur(2px)',
      opacity: '0',
      transform: `rotate(${side === 'left' ? '20deg' : '-20deg'})`
    });

    dragonRoar.appendChild(lightning);

    // Animate lightning
    setTimeout(() => {
      lightning.style.opacity = '1';
      lightning.style.transition = 'opacity 0.1s';
      setTimeout(() => {
        lightning.style.opacity = '0';
        setTimeout(() => dragonRoar.removeChild(lightning), 100);
      }, 100);
    }, Math.random() * 2000);
  };

  // Create power-up particles
  for (let i = 0; i < 100; i++) {
    const particle = document.createElement('div');
    const size = Math.random() * 8 + 4;
    const startX = Math.random() * 100;
    const startDelay = Math.random() * 2000;
    
    Object.assign(particle.style, {
      position: 'absolute',
      width: `${size}px`,
      height: `${size}px`,
      borderRadius: '50%',
      backgroundColor: `rgba(${Math.random() * 100}, ${150 + Math.random() * 105}, ${200 + Math.random() * 55}, 0.8)`,
      boxShadow: '0 0 10px rgba(0, 255, 255, 0.8)',
      left: `${startX}%`,
      bottom: '-20px',
      opacity: '0',
      transform: 'translateY(0)',
      transition: 'opacity 0.5s, transform 2s ease-out'
    });

    dragonRoar.appendChild(particle);

    // Animate particles
    setTimeout(() => {
      particle.style.opacity = '1';
      particle.style.transform = `translateY(-${Math.random() * 400 + 200}px) translateX(${(Math.random() - 0.5) * 100}px)`;
    }, startDelay);
  }

  // Add text elements
  const roarText = document.createElement('div');
  roarText.innerHTML = 'ROARRRRR!!! 🐉✨';
  Object.assign(roarText.style, {
    position: 'relative',
    zIndex: '10',
    textShadow: '0 0 20px var(--accent), 0 0 40px var(--primary)',
    opacity: '0',
    transform: 'scale(0.5)',
    transition: 'opacity 0.5s, transform 0.5s'
  });

  const descText = document.createElement('div');
  descText.innerHTML = 'Kekuatan IceWing & SeaWing telah aktif!';
  Object.assign(descText.style, {
    fontSize: '1.5rem',
    marginTop: '20px',
    opacity: '0',
    transition: 'opacity 0.5s'
  });

  dragonRoar.appendChild(roarText);
  dragonRoar.appendChild(descText);

  // Add sound effects
  const sounds = {
    roar: new Audio('https://freesound.org/data/previews/566/566435_13123807-lq.mp3'),
    thunder: new Audio('https://freesound.org/data/previews/102/102724_1721044-lq.mp3'),
    powerUp: new Audio('https://freesound.org/data/previews/321/321104_5123851-lq.mp3')
  };

  document.body.appendChild(dragonRoar);
  
  // Show overlay with fade in
  requestAnimationFrame(() => {
    dragonRoar.style.opacity = '1';
  });

  // Animation sequence
  const playSound = (sound) => {
    try { sound.play(); } catch(e) { console.log('Sound play failed:', e); }
  };

  // Start vignette effect
  setTimeout(() => {
    vignette.style.opacity = '1';
  }, 300);

  // Start lightning effects
  for (let i = 0; i < 8; i++) {
    setTimeout(createLightning, 500 + i * 300);
    if (i % 2 === 0) {
      setTimeout(() => playSound(sounds.thunder), 500 + i * 300);
    }
  }

  // Play power-up sound
  setTimeout(() => {
    playSound(sounds.powerUp);
  }, 800);

  // Show text
  setTimeout(() => {
    roarText.style.opacity = '1';
    roarText.style.transform = 'scale(1)';
    playSound(sounds.roar);
  }, 1200);

  setTimeout(() => {
    descText.style.opacity = '1';
  }, 1800);

  // Cleanup with fade out
  setTimeout(() => {
    dragonRoar.style.opacity = '0';
    setTimeout(() => {
      document.body.removeChild(dragonRoar);
    }, 500);
  }, 4500);
}

// Secret commands and trivia
let typedCommand = '';
const dragonTrivia = [
  "Lawless dapat mengendalikan es dan air sekaligus!",
  "Sisik Lawless berkilau kebiruan di kegelapan",
  "Lawless memiliki kemampuan bernafas di air dan darat",
  "Sayap Lawless dihiasi kristal es yang tak pernah mencair",
  "Lawless dapat mengubah suhu tubuhnya sesuai lingkungan",
  "Taring Lawless sekuat berlian dan sedingin es",
  "Lawless dapat melihat dalam gelap berkat warisan SeaWing",
  "Ekor Lawless dapat memancarkan cahaya bioluminesen"
];

function showTrivia() {
  const triviaOverlay = document.createElement('div');
  const randomTrivia = dragonTrivia[Math.floor(Math.random() * dragonTrivia.length)];
  
  Object.assign(triviaOverlay.style, {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    background: 'rgba(0, 20, 40, 0.9)',
    padding: '2rem',
    borderRadius: '15px',
    boxShadow: '0 0 30px rgba(0, 150, 255, 0.5)',
    color: '#fff',
    fontFamily: 'Orbitron, sans-serif',
    fontSize: '1.5rem',
    textAlign: 'center',
    maxWidth: '80%',
    zIndex: '9999',
    opacity: '0',
    transition: 'opacity 0.3s'
  });
  
  triviaOverlay.textContent = randomTrivia;
  document.body.appendChild(triviaOverlay);
  
  setTimeout(() => {
    triviaOverlay.style.opacity = '1';
  }, 100);
  
  setTimeout(() => {
    triviaOverlay.style.opacity = '0';
    setTimeout(() => document.body.removeChild(triviaOverlay), 300);
  }, 3000);
}

document.addEventListener('keypress', (e) => {
  typedCommand += e.key.toLowerCase();

  if (typedCommand.includes('rawr')) {
    activateEasterEgg();
    typedCommand = '';
  } else if (typedCommand.includes('lawless')) {
    showTrivia();
    typedCommand = '';
  }

  // Reset after 2 seconds of no typing
  setTimeout(() => {
    typedCommand = '';
  }, 2000);
});

// Gallery day/night mode toggle
function setupGalleryModeToggle() {
  // Create toggle button
  const gallerySection = document.getElementById('gallery');
  const modeToggle = document.createElement('button');
  modeToggle.className = 'gallery-mode-toggle';
  modeToggle.textContent = '🌙 Night Mode';
  gallerySection.appendChild(modeToggle);
  
  // Toggle functionality
  modeToggle.addEventListener('click', () => {
    gallerySection.classList.toggle('night-mode');
    
    if (gallerySection.classList.contains('night-mode')) {
      modeToggle.textContent = '☀️ Day Mode';
      
      // Add bioluminescent effect to gallery items in night mode
      document.querySelectorAll('.gallery-item').forEach(item => {
        // Create glow effect
        const glowEffect = document.createElement('div');
        glowEffect.className = 'bioluminescent-glow';
        glowEffect.style.position = 'absolute';
        glowEffect.style.top = '0';
        glowEffect.style.left = '0';
        glowEffect.style.width = '100%';
        glowEffect.style.height = '100%';
        glowEffect.style.borderRadius = '15px';
        glowEffect.style.boxShadow = 'inset 0 0 30px rgba(0, 200, 255, 0.5)';
        glowEffect.style.opacity = '0';
        glowEffect.style.transition = 'opacity 0.5s';
        glowEffect.style.zIndex = '2';
        glowEffect.style.pointerEvents = 'none';
        
        item.appendChild(glowEffect);
        
        // Animate glow
        setTimeout(() => {
          glowEffect.style.opacity = '1';
        }, 100);
      });
    } else {
      modeToggle.textContent = '🌙 Night Mode';
      
      // Remove bioluminescent effect
      document.querySelectorAll('.bioluminescent-glow').forEach(glow => {
        glow.style.opacity = '0';
        setTimeout(() => {
          glow.parentNode.removeChild(glow);
        }, 500);
      });
    }
  });
}

// Create bioluminescent dots for avatar
function createBioluminescentDots() {
  const dotsContainer = document.querySelector('.bioluminescent-dots');
  if (!dotsContainer) return;
  
  // Clear existing dots
  dotsContainer.innerHTML = '';
  
  // Create new dots
  for (let i = 0; i < 30; i++) {
    const dot = document.createElement('div');
    dot.className = 'bio-dot';
    dot.style.position = 'absolute';
    dot.style.width = Math.random() * 6 + 2 + 'px';
    dot.style.height = dot.style.width;
    dot.style.borderRadius = '50%';
    dot.style.backgroundColor = `rgba(${Math.random() * 50}, ${150 + Math.random() * 105}, ${200 + Math.random() * 55}, 0.8)`;
    dot.style.boxShadow = '0 0 8px rgba(0, 255, 255, 0.8)';
    dot.style.left = Math.random() * 100 + '%';
    dot.style.top = Math.random() * 100 + '%';
    dot.style.opacity = '0';
    dot.style.transition = 'opacity 0.5s, transform 3s';
    dotsContainer.appendChild(dot);
    
    // Add animation
    const delay = Math.random() * 2;
    dot.style.animationDelay = delay + 's';
    dot.style.animationDuration = 3 + Math.random() * 4 + 's';
  }
  
  // Add hover event to avatar container
  const avatarContainer = document.querySelector('.avatar-container');
  avatarContainer.addEventListener('mouseenter', () => {
    document.querySelectorAll('.bio-dot').forEach((dot, index) => {
      setTimeout(() => {
        dot.style.opacity = '1';
        dot.style.animation = 'float-up ' + (3 + Math.random() * 4) + 's infinite';
      }, index * 50);
    });
  });
  
  avatarContainer.addEventListener('mouseleave', () => {
    document.querySelectorAll('.bio-dot').forEach(dot => {
      dot.style.opacity = '0';
      setTimeout(() => {
        dot.style.animation = 'none';
      }, 500);
    });
  });
}

// Init
window.addEventListener('load', () => {

  // Show navigation
  gsap.to('.nav', { opacity: 1, y: 0, duration: 1, delay: 0.5 });

  // Animate landing page elements
  gsap.fromTo('.landing h1', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1 });
  gsap.fromTo('.typing-container', { opacity: 0 }, { opacity: 1, duration: 1, delay: 0.5 });
  gsap.fromTo('.enter-btn', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, delay: 1.5 });

  // Start typing animation
  setTimeout(typeText, 1000);
  
  // Setup gallery mode toggle
  setupGalleryModeToggle();
  
  // Create bioluminescent dots for avatar
  createBioluminescentDots();

  // Preload gallery images
  const galleryItems = document.querySelectorAll('.gallery-item');
  gsap.fromTo(galleryItems, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, paused: true });

  // Region map animation
  gsap.fromTo('.map-region',
    { scale: 0.5, opacity: 0 },
    { scale: 1, opacity: 1, duration: 1, stagger: 0.3, ease: 'elastic.out(1, 0.5)', paused: true }
  );

  // Animation for each section when visible
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (entry.target.id === 'gallery') {
          gsap.fromTo(
            '.gallery-item',
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, stagger: 0.2 }
          );
        }

        if (entry.target.id === 'lore') {
          gsap.fromTo(
            '.map-region',
            { scale: 0.5, opacity: 0 },
            { scale: 1, opacity: 1, duration: 1, stagger: 0.3, ease: 'elastic.out(1, 0.5)' }
          );

          gsap.fromTo(
            '.lore-story',
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.8, stagger: 0.3 }
          );
        }
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
  });
});
