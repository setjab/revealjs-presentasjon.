import * as THREE from "https://cdnjs.cloudflare.com/ajax/libs/three.js/110/three.module.js";

// Opprett scene, kamera og renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 20;

const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("scene") });
renderer.setSize(window.innerWidth, window.innerHeight);

// Saturn (stor sfære)
const saturnGeometry = new THREE.SphereGeometry(5, 32, 32);
const saturnMaterial = new THREE.MeshBasicMaterial({ color: 0xffd700 });
const saturn = new THREE.Mesh(saturnGeometry, saturnMaterial);
scene.add(saturn);

// Sfære med regnbuefarger
const rainbowGeometry = new THREE.SphereGeometry(1, 32, 32);
const rainbowMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
const rainbowSphere = new THREE.Mesh(rainbowGeometry, rainbowMaterial);
scene.add(rainbowSphere);

// Lys for regnbuefarger
const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(0, 0, 10);
scene.add(light);

// Variabler for bevegelse
let angle = 0;

// Animasjonsfunksjon
function animate() {
  requestAnimationFrame(animate);

  // Oppdater posisjon for regnbuesfæren
  angle += 0.02;
  rainbowSphere.position.x = 10 * Math.cos(angle);
  rainbowSphere.position.z = 10 * Math.sin(angle);

  // Oppdater farge for regnbuesfæren
  rainbowSphere.material.color.setHSL((angle % 1) * 360, 1, 0.5);

  renderer.render(scene, camera);
}

// Håndtere vindusstørrelse
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Start animasjonen
animate();
