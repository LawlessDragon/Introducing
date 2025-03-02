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
  "Selamat datang di dunia digitalku.",
  "Aku adalah Lawless, naga biru yang penuh misteri.",
  "Siap untuk menjelajah?"
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

function activateEasterEgg() {
  const dragonRoar = document.createElement('div');
  dragonRoar.style.position = 'fixed';
  dragonRoar.style.top = '0';
  dragonRoar.style.left = '0';
  dragonRoar.style.width = '100%';
  dragonRoar.style.height = '100%';
  dragonRoar.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
  dragonRoar.style.display = 'flex';
  dragonRoar.style.alignItems = 'center';
  dragonRoar.style.justifyContent = 'center';
  dragonRoar.style.zIndex = '9999';
  dragonRoar.style.fontFamily = 'Orbitron, sans-serif';
  dragonRoar.style.fontSize = '3rem';
  dragonRoar.style.color = 'var(--accent)';
  dragonRoar.style.textShadow = '0 0 20px var(--accent)';
  dragonRoar.innerHTML = 'ROAAAARRR!!! 🐉✨';
  document.body.appendChild(dragonRoar);

  setTimeout(() => {
    document.body.removeChild(dragonRoar);
  }, 3000);
}

// Secret command
let typedCommand = '';

document.addEventListener('keypress', (e) => {
  typedCommand += e.key.toLowerCase();

  if (typedCommand.includes('roar')) {
    activateEasterEgg();
    typedCommand = '';
  }

  // Reset after 2 seconds of no typing
  setTimeout(() => {
    typedCommand = '';
  }, 2000);
});

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