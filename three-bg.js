// Background Canvas with Three.js
let scene, camera, renderer;
let particles;

function initThreeJS() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('bgCanvas'), alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  // Create particles
  const particlesGeometry = new THREE.BufferGeometry();
  const particlesCount = 1000;

  const posArray = new Float32Array(particlesCount * 3);
  const scales = new Float32Array(particlesCount);

  for (let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 10;
  }

  for (let i = 0; i < particlesCount; i++) {
    scales[i] = Math.random();
  }

  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
  particlesGeometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1));

  // Material
  const particlesMaterial = new THREE.PointsMaterial({
    size: 0.03,
    color: 0x00ffff,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending
  });

  // Mesh
  particles = new THREE.Points(particlesGeometry, particlesMaterial);
  scene.add(particles);

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

  particles.rotation.x += 0.0005;
  particles.rotation.y += 0.0003;

  renderer.render(scene, camera);
}

// Initialize Three.js background when window loads
window.addEventListener('load', initThreeJS);