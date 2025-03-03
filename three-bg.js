// Background Canvas with Three.js - IceWing & SeaWing Theme
let scene, camera, renderer;
let iceParticles, waterParticles;
let time = 0;

function initThreeJS() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('bgCanvas'), alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  
  // Create ice particles (IceWing theme)
  const iceGeometry = new THREE.BufferGeometry();
  const iceCount = 800;
  
  const icePosArray = new Float32Array(iceCount * 3);
  const iceScales = new Float32Array(iceCount);
  const iceColors = new Float32Array(iceCount * 3);
  
  for (let i = 0; i < iceCount * 3; i += 3) {
    // Position in upper part of screen (ice region)
    icePosArray[i] = (Math.random() - 0.5) * 12;     // x
    icePosArray[i+1] = (Math.random() * 0.5 + 0.5) * 8; // y (upper half)
    icePosArray[i+2] = (Math.random() - 0.5) * 10;    // z
    
    // Ice blue colors with slight variations
    iceColors[i] = 0.8 + Math.random() * 0.2;    // R (light blue)
    iceColors[i+1] = 0.9 + Math.random() * 0.1;  // G (almost white)
    iceColors[i+2] = 1.0;                        // B (full blue)
  }
  
  for (let i = 0; i < iceCount; i++) {
    iceScales[i] = Math.random() * 0.02 + 0.01;
  }
  
  iceGeometry.setAttribute('position', new THREE.BufferAttribute(icePosArray, 3));
  iceGeometry.setAttribute('scale', new THREE.BufferAttribute(iceScales, 1));
  iceGeometry.setAttribute('color', new THREE.BufferAttribute(iceColors, 3));
  
  // Ice particle material
  const iceMaterial = new THREE.PointsMaterial({
    size: 0.05,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending
  });
  
  // Create water particles (SeaWing theme)
  const waterGeometry = new THREE.BufferGeometry();
  const waterCount = 800;
  
  const waterPosArray = new Float32Array(waterCount * 3);
  const waterScales = new Float32Array(waterCount);
  const waterColors = new Float32Array(waterCount * 3);
  
  for (let i = 0; i < waterCount * 3; i += 3) {
    // Position in lower part of screen (water region)
    waterPosArray[i] = (Math.random() - 0.5) * 12;      // x
    waterPosArray[i+1] = (Math.random() * 0.5 - 1.0) * 8; // y (lower half)
    waterPosArray[i+2] = (Math.random() - 0.5) * 10;     // z
    
    // Sea blue/green colors with bioluminescent effect
    waterColors[i] = 0.0 + Math.random() * 0.2;      // R (low)
    waterColors[i+1] = 0.6 + Math.random() * 0.4;    // G (teal/cyan)
    waterColors[i+2] = 0.7 + Math.random() * 0.3;    // B (deep blue)
  }
  
  for (let i = 0; i < waterCount; i++) {
    waterScales[i] = Math.random() * 0.03 + 0.01;
  }
  
  waterGeometry.setAttribute('position', new THREE.BufferAttribute(waterPosArray, 3));
  waterGeometry.setAttribute('scale', new THREE.BufferAttribute(waterScales, 1));
  waterGeometry.setAttribute('color', new THREE.BufferAttribute(waterColors, 3));
  
  // Water particle material
  const waterMaterial = new THREE.PointsMaterial({
    size: 0.04,
    vertexColors: true,
    transparent: true,
    opacity: 0.7,
    blending: THREE.AdditiveBlending
  });
  
  // Create meshes
  iceParticles = new THREE.Points(iceGeometry, iceMaterial);
  waterParticles = new THREE.Points(waterGeometry, waterMaterial);
  
  scene.add(iceParticles);
  scene.add(waterParticles);
  
  camera.position.z = 3;
  
  window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  });
  
  animate();
}

function animate() {
  requestAnimationFrame(animate);
  time += 0.005;
  
  // Ice particles move slowly downward like snowflakes
  iceParticles.rotation.x += 0.0003;
  iceParticles.rotation.y += 0.0005;
  
  // Make ice particles gently float down
  const icePositions = iceParticles.geometry.attributes.position.array;
  for (let i = 1; i < icePositions.length; i += 3) {
    icePositions[i] -= 0.002;
    // Reset position when particles go too far down
    if (icePositions[i] < -5) {
      icePositions[i] = 8;
    }
  }
  iceParticles.geometry.attributes.position.needsUpdate = true;
  
  // Water particles move in a wave-like pattern
  waterParticles.rotation.x += 0.0004;
  waterParticles.rotation.z += 0.0002;
  
  // Create wave effect for water particles
  const waterPositions = waterParticles.geometry.attributes.position.array;
  for (let i = 0; i < waterPositions.length; i += 3) {
    // Add subtle wave motion
    waterPositions[i] += Math.sin(time + i * 0.1) * 0.003;
    waterPositions[i+1] += Math.cos(time + i * 0.05) * 0.002;
  }
  waterParticles.geometry.attributes.position.needsUpdate = true;
  
  renderer.render(scene, camera);
}

// Initialize Three.js background when window loads
window.addEventListener('load', initThreeJS);