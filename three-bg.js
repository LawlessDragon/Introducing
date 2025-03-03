// Background Canvas with Three.js - IceWing & SeaWing Theme with refined particles
let scene, camera, renderer;
let iceParticles, waterParticles;
let time = 0;
let mouse = { x: 0, y: 0 };
let targetRotation = { x: 0, y: 0 };
let currentRotation = { x: 0, y: 0 };
const DAMPING = 0.05;
const MAX_ROTATION = 0.2;

// Create a custom texture for snowflake particles with random glow
function createSnowflakeTexture() {
  const canvas = document.createElement('canvas');
  const size = 64;
  canvas.width = size;
  canvas.height = size;
  
  const context = canvas.getContext('2d');
  // Make the background transparent instead of black
  context.clearRect(0, 0, size, size);
  
  // Draw a snowflake shape
  context.strokeStyle = 'white';
  context.lineWidth = 1.5;
  context.beginPath();
  
  // Draw six branches of a snowflake
  for (let i = 0; i < 6; i++) {
    context.save();
    context.translate(size/2, size/2);
    context.rotate(i * Math.PI / 3);
    
    // Main branch
    context.moveTo(0, 0);
    context.lineTo(0, size/2 - 4);
    
    // Add some smaller lines
    for (let j = 1; j < 5; j++) {
      const length = (size/8) * (1 - j/5);
      const pos = j * (size/10);
      
      // Right side branches
      context.moveTo(0, pos);
      context.lineTo(length, pos + length/2);
      
      // Left side branches
      context.moveTo(0, pos);
      context.lineTo(-length, pos + length/2);
    }
    
    context.restore();
  }
  context.stroke();
  
  // Add some radial gradient for a stronger glow
  const gradient = context.createRadialGradient(size/2, size/2, 0, size/2, size/2, size/2);
  gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
  gradient.addColorStop(0.4, 'rgba(210, 240, 255, 0.6)');
  gradient.addColorStop(1, 'rgba(210, 240, 255, 0)');
  
  context.globalCompositeOperation = 'lighten';
  context.fillStyle = gradient;
  context.fillRect(0, 0, size, size);
  
  const texture = new THREE.Texture(canvas);
  texture.needsUpdate = true;
  return texture;
}

function initThreeJS() {
  // Detect mobile devices and adjust particle counts accordingly
  const isMobile = window.innerWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    isMobile ? 65 : 75, // Wider field of view on mobile
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById('bgCanvas'),
    alpha: true,
    antialias: !isMobile // Disable antialiasing on mobile for better performance
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(isMobile ? 1 : Math.min(window.devicePixelRatio, 2));
  
  // Create custom textures for prettier particles
  const iceTexture = createSnowflakeTexture();
  const glowTexture = createGlowTexture();
  
  // Create ice particles (IceWing theme) - snowflake-like
  const iceGeometry = new THREE.BufferGeometry();
  // Adjust particle counts based on device
  const iceCount = isMobile ? 300 : 700;
  const waterCount = isMobile ? 250 : 550;
  
  const icePosArray = new Float32Array(iceCount * 3);
  const iceScales = new Float32Array(iceCount);
  const iceColors = new Float32Array(iceCount * 3);
  const iceVelocities = new Float32Array(iceCount);
  const iceRotations = new Float32Array(iceCount);
  
  for (let i = 0; i < iceCount * 3; i += 3) {
    // Distribute particles throughout the entire screen height for continuous flow
    icePosArray[i] = (Math.random() - 0.5) * (isMobile ? 10 : 12);     // x - smaller range on mobile
    icePosArray[i+1] = (Math.random() - 0.5) * (isMobile ? 14 : 16);   // y - smaller range on mobile
    icePosArray[i+2] = (Math.random() - 0.5) * (isMobile ? 8 : 10);    // z - smaller range on mobile
    
    // Ice blue colors with slight variations
    iceColors[i] = 0.8 + Math.random() * 0.2;    // R (light blue)
    iceColors[i+1] = 0.9 + Math.random() * 0.1;  // G (almost white)
    iceColors[i+2] = 1.0;                        // B (full blue)
  }
  
  for (let i = 0; i < iceCount; i++) {
    // More moderate sized particles - slightly larger on mobile for visibility
    iceScales[i] = Math.random() * (isMobile ? 0.045 : 0.035) + (isMobile ? 0.02 : 0.015);
    
    // Random falling speeds - slightly slower on mobile for better performance
    iceVelocities[i] = Math.random() * (isMobile ? 0.006 : 0.008) + (isMobile ? 0.003 : 0.004);
    
    // Random rotation speeds
    iceRotations[i] = (Math.random() - 0.5) * (isMobile ? 0.015 : 0.02);
  }
  
  iceGeometry.setAttribute('position', new THREE.BufferAttribute(icePosArray, 3));
  iceGeometry.setAttribute('scale', new THREE.BufferAttribute(iceScales, 1));
  iceGeometry.setAttribute('color', new THREE.BufferAttribute(iceColors, 3));
  iceGeometry.userData.velocities = iceVelocities;
  iceGeometry.userData.rotations = iceRotations;
  
  // Ice particle material with custom texture
  const iceMaterial = new THREE.PointsMaterial({
    size: isMobile ? 0.15 : 0.12,  // Slightly larger on mobile for better visibility
    map: iceTexture,
    vertexColors: true,
    transparent: true,
    opacity: 0.85,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });
  
  // Create water particles (SeaWing theme)
  const waterGeometry = new THREE.BufferGeometry();
  // Remove this line since waterCount is already declared above
  // const waterCount = 550;  <- Remove this line
  
  const waterPosArray = new Float32Array(waterCount * 3);
  const waterScales = new Float32Array(waterCount);
  const waterColors = new Float32Array(waterCount * 3);
  const waterPulsePhases = new Float32Array(waterCount);
  
  for (let i = 0; i < waterCount * 3; i += 3) {
    // Position throughout the screen
    waterPosArray[i] = (Math.random() - 0.5) * 12;      // x
    waterPosArray[i+1] = (Math.random() - 0.5) * 16;    // y (full screen)
    waterPosArray[i+2] = (Math.random() - 0.5) * 10;    // z
    
    // Brighter colors for firefly effect
    waterColors[i] = 0.1 + Math.random() * 0.3;      // R (low)
    waterColors[i+1] = 0.7 + Math.random() * 0.3;    // G (teal/cyan)
    waterColors[i+2] = 0.8 + Math.random() * 0.2;    // B (deep blue)
  }
  
  for (let i = 0; i < waterCount; i++) {
    // More moderate size for firefly effect
    waterScales[i] = Math.random() * 0.025 + 0.01;
    
    // Random phase for glowing effect
    waterPulsePhases[i] = Math.random() * Math.PI * 2;
  }
  
  waterGeometry.setAttribute('position', new THREE.BufferAttribute(waterPosArray, 3));
  waterGeometry.setAttribute('scale', new THREE.BufferAttribute(waterScales, 1));
  waterGeometry.setAttribute('color', new THREE.BufferAttribute(waterColors, 3));
  waterGeometry.userData.pulsePhases = waterPulsePhases;
  
  // Water particle material with glow texture
  const waterMaterial = new THREE.PointsMaterial({
    size: 0.1,
    map: glowTexture,
    vertexColors: true,
    transparent: true,
    opacity: 0.9,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });
  
  // Create meshes
  iceParticles = new THREE.Points(iceGeometry, iceMaterial);
  waterParticles = new THREE.Points(waterGeometry, waterMaterial);
  
  scene.add(iceParticles);
  scene.add(waterParticles);
  
  camera.position.z = 3;
  
  // Handle window resize
  window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  });

  // Track mouse movement
  window.addEventListener('mousemove', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    
    targetRotation.x = mouse.y * MAX_ROTATION;
    targetRotation.y = mouse.x * MAX_ROTATION;
  });

  // Handle touch events for mobile
  window.addEventListener('touchmove', (event) => {
  if (event.target.tagName === "CANVAS") {
    event.preventDefault(); // Hanya jika menyentuh canvas
  }
  mouse.x = (event.touches[0].clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.touches[0].clientY / window.innerHeight) * 2 + 1;
}, { passive: true });
  animate();
}

// Create a custom texture for snowflake particles with random glow
function createSnowflakeTexture() {
  const canvas = document.createElement('canvas');
  const size = 64;
  canvas.width = size;
  canvas.height = size;
  
  const context = canvas.getContext('2d');
  // Make the background transparent instead of black
  context.clearRect(0, 0, size, size);
  
  // Draw a snowflake shape
  context.strokeStyle = 'white';
  context.lineWidth = 1.5;
  context.beginPath();
  
  // Draw six branches of a snowflake
  for (let i = 0; i < 6; i++) {
    context.save();
    context.translate(size/2, size/2);
    context.rotate(i * Math.PI / 3);
    
    // Main branch
    context.moveTo(0, 0);
    context.lineTo(0, size/2 - 4);
    
    // Add some smaller lines
    for (let j = 1; j < 5; j++) {
      const length = (size/8) * (1 - j/5);
      const pos = j * (size/10);
      
      // Right side branches
      context.moveTo(0, pos);
      context.lineTo(length, pos + length/2);
      
      // Left side branches
      context.moveTo(0, pos);
      context.lineTo(-length, pos + length/2);
    }
    
    context.restore();
  }
  context.stroke();
  
  // Add some radial gradient for a stronger glow
  const gradient = context.createRadialGradient(size/2, size/2, 0, size/2, size/2, size/2);
  gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
  gradient.addColorStop(0.4, 'rgba(210, 240, 255, 0.6)');
  gradient.addColorStop(1, 'rgba(210, 240, 255, 0)');
  
  context.globalCompositeOperation = 'lighten';
  context.fillStyle = gradient;
  context.fillRect(0, 0, size, size);
  
  const texture = new THREE.Texture(canvas);
  texture.needsUpdate = true;
  return texture;
}

// Create a custom texture for glowing particles
function createGlowTexture() {
  const canvas = document.createElement('canvas');
  const size = 64;
  canvas.width = size;
  canvas.height = size;
  
  const context = canvas.getContext('2d');
  // Remove black background - make it transparent instead
  context.clearRect(0, 0, size, size);
  
  // Create a soft glow with radial gradient
  const gradient = context.createRadialGradient(size/2, size/2, 0, size/2, size/2, size/2);
  gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
  gradient.addColorStop(0.3, 'rgba(160, 220, 255, 0.5)');
  gradient.addColorStop(0.7, 'rgba(120, 180, 255, 0.2)');
  gradient.addColorStop(1, 'rgba(100, 150, 255, 0)');
  
  // We're drawing on a transparent background so no need to change composite operation
  context.fillStyle = gradient;
  context.beginPath();
  context.arc(size/2, size/2, size/2, 0, Math.PI * 2);
  context.fill();
  
  // Add a subtle star pattern
  context.strokeStyle = 'rgba(255, 255, 255, 0.8)';
  context.lineWidth = 1;
  
  // Draw a simple star
  context.beginPath();
  for (let i = 0; i < 6; i++) {
    const angle = i * Math.PI / 3;
    const x1 = size/2 + Math.cos(angle) * (size/5);
    const y1 = size/2 + Math.sin(angle) * (size/5);
    const x2 = size/2 + Math.cos(angle) * (size/3);
    const y2 = size/2 + Math.sin(angle) * (size/3);
    
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
  }
  context.stroke();
  
  const texture = new THREE.Texture(canvas);
  texture.needsUpdate = true;
  return texture;
}

function animate() {
  requestAnimationFrame(animate);
  time += 0.005;

  // Smooth camera rotation based on mouse position
  currentRotation.x += (targetRotation.x - currentRotation.x) * DAMPING;
  currentRotation.y += (targetRotation.y - currentRotation.y) * DAMPING;

  camera.rotation.x = currentRotation.x;
  camera.rotation.y = currentRotation.y;

  // Rotate snowflake particles for prettier effect
  iceParticles.rotation.z += 0.0005;
  
  // Ice particles falling like snow - seamless looping
  const icePositions = iceParticles.geometry.attributes.position.array;
  const iceVelocities = iceParticles.geometry.userData.velocities;
  const iceRotations = iceParticles.geometry.userData.rotations;
  const iceScales = iceParticles.geometry.attributes.scale.array;

  for (let i = 0; i < icePositions.length; i += 3) {
    // Apply individual falling velocities
    icePositions[i+1] -= iceVelocities[i/3];
    
    // Add natural swaying motion like real snowflakes
    icePositions[i] += Math.sin(time * 2 + i/3) * 0.002;
    
    // Rotate individual particles
    iceParticles.geometry.userData.rotations[i/3] += 0.0001;
    
    // Seamless looping - when particle drops below view, reposition at top
    if (icePositions[i+1] < -8) {
      icePositions[i+1] = 8; // Reset to top
      icePositions[i] = (Math.random() - 0.5) * 12;
      icePositions[i+2] = (Math.random() - 0.5) * 10;
      
      // Vary the size slightly for next loop
      iceScales[i/3] = Math.random() * 0.035 + 0.015;
    }
  }

  iceParticles.geometry.attributes.position.needsUpdate = true;
  iceParticles.geometry.attributes.scale.needsUpdate = true;

  // Water particles move like fireflies - hovering with pulsing light
  const waterPositions = waterParticles.geometry.attributes.position.array;
  const waterPulsePhases = waterParticles.geometry.userData.pulsePhases;
  const waterScales = waterParticles.geometry.attributes.scale.array;
  const waterColors = waterParticles.geometry.attributes.color.array;

  for (let i = 0; i < waterPositions.length; i += 3) {
    // Gentle hovering motion 
    waterPositions[i] += Math.sin(time + waterPulsePhases[i/3]) * 0.002;
    waterPositions[i+1] += Math.cos(time + waterPulsePhases[i/3]) * 0.0015;
    waterPositions[i+2] += Math.sin(time * 0.7 + waterPulsePhases[i/3]) * 0.001;
    
    // Glowing/pulsing effect
    const pulseFactor = Math.sin(time * 2 + waterPulsePhases[i/3]) * 0.3 + 0.7;
    waterScales[i/3] = (Math.random() * 0.025 + 0.01) * pulseFactor;
    
    // Some particles slowly drift downward
    if (i % 9 === 0) {
      waterPositions[i+1] -= 0.0008;
      
      // Loop when they go out of view
      if (waterPositions[i+1] < -8) {
        waterPositions[i+1] = 8;
        waterPositions[i] = (Math.random() - 0.5) * 12;
        waterPositions[i+2] = (Math.random() - 0.5) * 10;
      }
    }
    
    // Occasionally change color intensity for twinkling effect
    if (Math.random() < 0.01) {
      waterColors[i+1] = 0.7 + Math.random() * 0.3; // Vary green component
      waterColors[i+2] = 0.8 + Math.random() * 0.2; // Vary blue component
    }
  }

  waterParticles.geometry.attributes.position.needsUpdate = true;
  waterParticles.geometry.attributes.scale.needsUpdate = true;
  waterParticles.geometry.attributes.color.needsUpdate = true;

  renderer.render(scene, camera);
}

// Initialize Three.js background when window loads
window.addEventListener('load', initThreeJS);
