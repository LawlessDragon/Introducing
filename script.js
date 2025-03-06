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
  if (!typingText) return; // Ensure element exists
  
  // Set initial visibility
  typingText.style.visibility = 'visible';
  typingText.style.opacity = '1';
  
  const currentText = textToType[textIndex];

  if (!isDeleting && charIndex <= currentText.length) {
    typingText.textContent = currentText.slice(0, charIndex);
    typingText.style.color = '#fff'; // Set text color to white
    charIndex++;
    if (charIndex <= currentText.length) {
      setTimeout(typeText, typingDelay);
    } else {
      // When text is fully typed, wait for 2 seconds before deleting
      setTimeout(() => {
        isDeleting = true;
        typeText();
      }, 2000);
    }
  } else if (isDeleting && charIndex >= 0) {
    typingText.textContent = currentText.slice(0, charIndex);
    charIndex--;
    if (charIndex >= 0) {
      setTimeout(typeText, typingDelay / 2);
    } else {
      isDeleting = false;
      textIndex = (textIndex + 1) % textToType.length;
      charIndex = 0;
      setTimeout(typeText, 500); // Short pause before starting next text
    }
  }
}

// Start typing animation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  if (typingText) {
    setTimeout(typeText, 1000); // Start after a 1-second delay
    typingText.style.visibility = 'visible'; // Ensure text is visible
  }
});

// Sections navigation
const sections = ['landing', 'about', 'gallery', 'lore', 'contact'];
const navLinks = document.querySelectorAll('.nav-link');

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

// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const nav = document.querySelector('.nav');

  // Pastikan menu tertutup secara default
  nav.classList.remove('mobile-active');

  mobileMenuBtn.addEventListener('click', function(event) {
    event.stopPropagation();
    this.classList.toggle('active');
    nav.classList.toggle('mobile-active');
  });

  // Tutup menu jika link diklik (di mobile)
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function() {
      if (window.innerWidth < 768) {
        mobileMenuBtn.classList.remove('active');
        nav.classList.remove('mobile-active');
      }
    });
  });

  // Tutup menu jika klik di luar
  document.addEventListener('click', function(event) {
    if (!nav.contains(event.target) && !mobileMenuBtn.contains(event.target)) {
      mobileMenuBtn.classList.remove('active');
      nav.classList.remove('mobile-active');
    }
  });
  
  // Prevent menu from blocking scrolling
  // Remove scroll event listener
  window.removeEventListener('scroll', function() {
    if (window.innerWidth < 768 && nav.classList.contains('mobile-active')) {
      window.scrollTo(0, 0);
    }
  });

  // Remove overflow style setting
  window.addEventListener('DOMContentLoaded', () => {
    window.scrollTo(0, 0);
    document.documentElement.style.scrollBehavior = 'auto';
    requestAnimationFrame(() => {
      document.documentElement.style.scrollBehavior = '';
    });
  });
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

function createPowerParticle(container) {
  const particle = document.createElement('div');
  const size = Math.random() * 10 + 5;
  const startX = Math.random() * window.innerWidth;
  
  Object.assign(particle.style, {
    position: 'absolute',
    width: size + 'px',
    height: size + 'px',
    backgroundColor: `rgba(${Math.random() * 100}, ${150 + Math.random() * 105}, ${200 + Math.random() * 55}, 0.8)`,
    borderRadius: '50%',
    boxShadow: `
      0 0 10px rgba(0, 255, 255, 0.8),
      0 0 20px rgba(0, 255, 255, 0.6),
      0 0 30px rgba(0, 255, 255, 0.4),
      0 0 40px rgba(0, 200, 255, 0.2)
    `,
    filter: 'blur(1px)',
    left: startX + 'px',
    bottom: '-20px',
    opacity: '0.8',
    transition: 'transform 2s ease-out, opacity 2s ease-out',
    zIndex: '10000'
  });

  container.appendChild(particle);

  setTimeout(() => {
    particle.style.transform = `translateY(-${Math.random() * 200 + 400}px) translateX(${(Math.random() - 0.5) * 100}px)`;
    particle.style.opacity = '0';
  }, 50);

  setTimeout(() => {
    container.removeChild(particle);
  }, 2000);
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
    overflow: 'hidden'
  });

  // Create power-up particles
  const particleInterval = setInterval(() => {
    createPowerParticle(dragonRoar);
  }, 50);

  // Create vignette effects on right, left and bottom sides
  const vignettes = ['right', 'bottom', 'left'].map(side => {
    const vignette = document.createElement('div');
    Object.assign(vignette.style, {
      position: 'absolute',
      [side]: '0',
      top: side === 'bottom' ? 'auto' : '0',
      width: side === 'left' || side === 'right' ? '35%' : '100%',
      height: side === 'bottom' ? '35%' : '100%',
      background: `linear-gradient(${side === 'bottom' ? 'to top' : side === 'left' ? 'to right' : 'to left'}, 
        rgba(0, 251, 255, 0.6) 0%,
        rgba(0, 251, 255, 0.31) 20%,
        rgba(0, 251, 255, 0.1) 40%,
        transparent 100%
      )`,
      opacity: '0',
      transition: 'opacity 0.8s ease-in-out',
      pointerEvents: 'none',
      filter: 'blur(15px)'
    });
    dragonRoar.appendChild(vignette);
    return vignette;
  });

  // Create and play sound effect
  const roarSound = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
  roarSound.volume = 0.3;
  roarSound.play();

  // Add text elements with enhanced animation
  const roarText = document.createElement('div');
  roarText.innerHTML = 'RAWRRRRR!!! 🐉✨';
  Object.assign(roarText.style, {
    position: 'relative',
    zIndex: '10',
    textShadow: '0 0 20px var(--accent), 0 0 40px var(--primary)',
    opacity: '0',
    transform: 'scale(0.5) translateY(-50px)',
    transition: 'opacity 0.5s, transform 0.5s'
  });

  const powerText = document.createElement('div');
  powerText.innerHTML = 'Kekuatan IceWing & SeaWing telah aktif!';
  Object.assign(powerText.style, {
    position: 'relative',
    zIndex: '10',
    fontSize: '1.5rem',
    marginTop: '20px',
    textShadow: '0 0 15px var(--accent)',
    opacity: '0',
    transform: 'translateY(20px)',
    transition: 'opacity 0.5s, transform 0.5s'
  });

  dragonRoar.appendChild(roarText);
  dragonRoar.appendChild(powerText);
  document.body.appendChild(dragonRoar);

  // Animation sequence
  setTimeout(() => {
    vignettes.forEach(v => v.style.opacity = '1');
  }, 300);

  setTimeout(() => {
    roarText.style.opacity = '1';
    roarText.style.transform = 'scale(1) translateY(0)';
  }, 800);

  setTimeout(() => {
    powerText.style.opacity = '1';
    powerText.style.transform = 'translateY(0)';
  }, 1200);

  // Cleanup with fade out
  setTimeout(() => {
    dragonRoar.style.transition = 'opacity 0.8s ease-out';
    dragonRoar.style.opacity = '0';
    roarSound.pause();
    roarSound.currentTime = 0;
    setTimeout(() => {
      document.body.removeChild(dragonRoar);
      clearInterval(particleInterval);
    }, 800);
  }, 4000);
}

// Secret commands
let typedCommand = '';

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

function showTrivia() {
  const triviaOverlay = document.createElement('div');
  Object.assign(triviaOverlay.style, {
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
    opacity: '0',
    transition: 'opacity 0.5s'
  });

  const triviaList = [
    "Lawless memiliki sisik yang berkilau seperti kristal es di bawah sinar matahari",
    "Suhu tubuh Lawless bisa beradaptasi dengan lingkungan sekitarnya",
    "Lawless bisa bernafas di air dan membekukan air di sekitarnya",
    "Sayap Lawless memiliki corak unik yang menyerupai aurora",
    "Lawless sangat menyukai seafood, terutama salmon"
  ];

  const randomTrivia = triviaList[Math.floor(Math.random() * triviaList.length)];
  
  const triviaContent = document.createElement('div');
  Object.assign(triviaContent.style, {
    textAlign: 'center',
    color: 'var(--accent)',
    padding: '2rem',
    maxWidth: '600px',
    transform: 'translateY(30px)',
    transition: 'transform 0.5s'
  });

  const triviaTitle = document.createElement('div');
  triviaTitle.textContent = 'Tahukah kamu?';
  Object.assign(triviaTitle.style, {
    fontSize: '2rem',
    marginBottom: '1rem',
    textShadow: '0 0 15px var(--accent)'
  });

  const triviaText = document.createElement('div');
  triviaText.textContent = randomTrivia;
  Object.assign(triviaText.style, {
    fontSize: '1.2rem',
    lineHeight: '1.6',
    textShadow: '0 0 10px var(--primary)'
  });

  triviaContent.appendChild(triviaTitle);
  triviaContent.appendChild(triviaText);
  triviaOverlay.appendChild(triviaContent);
  document.body.appendChild(triviaOverlay);

  // Animation sequence
  requestAnimationFrame(() => {
    triviaOverlay.style.opacity = '1';
    triviaContent.style.transform = 'translateY(0)';
  });

  // Cleanup
  setTimeout(() => {
    triviaOverlay.style.opacity = '0';
    triviaContent.style.transform = 'translateY(30px)';
    setTimeout(() => document.body.removeChild(triviaOverlay), 500);
  }, 4000);
}

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
  gsap.fromTo('.landing h1', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.8 });
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

document.querySelector(".send-button").addEventListener("click", function (e) {
  e.preventDefault(); // Cegah refresh halaman

  let form = document.querySelector("form");
  let popup = document.getElementById("success-popup");
  let overlay = document.getElementById("overlay");

  fetch(form.action, {
      method: form.method,
      body: new FormData(form),
      headers: { "Accept": "application/json" }
  }).then(response => {
      if (response.ok) {
          this.innerText = "Terkirim!";
          this.style.background = "#00ff00"; // Warna hijau sukses
          form.reset(); // Kosongkan form setelah terkirim

          // Munculkan popup dan overlay
          popup.classList.add("show");
          overlay.classList.add("show");

          setTimeout(() => {
              this.innerText = "Kirim Pesan";
              this.style.background = "linear-gradient(90deg, #00ffff, #007bff)";

              // Tambahkan efek fade-out sebelum popup menghilang
              popup.classList.add("hide");
              overlay.classList.remove("show");

              // Hapus kelas show setelah animasi selesai
              setTimeout(() => {
                  popup.classList.remove("show", "hide");
              }, 300);

          }, 3000); // Popup menghilang setelah 3 detik

      } else {
          throw new Error("Gagal mengirim pesan.");
      }
  }).catch(error => {
      alert("Terjadi kesalahan, coba lagi.");
      console.error("Error:", error);
  });
});
