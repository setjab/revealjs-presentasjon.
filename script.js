import * as THREE from "https://cdnjs.cloudflare.com/ajax/libs/three.js/110/three.module.js";
import { FontLoader } from "https://cdnjs.cloudflare.com/ajax/libs/three.js/110/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "https://cdnjs.cloudflare.com/ajax/libs/three.js/110/examples/jsm/geometries/TextGeometry.js";

// Opprett scene, kamera og renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 30;

const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("scene") });
renderer.setSize(window.innerWidth, window.innerHeight);

// Saturn (stor sfære med ringer)
const saturnGeometry = new THREE.SphereGeometry(5, 32, 32);
const saturnMaterial = new THREE.MeshBasicMaterial({ color: 0xffd700 });
const saturn = new THREE.Mesh(saturnGeometry, saturnMaterial);
scene.add(saturn);

// Ringene til Saturn
const ringGeometry = new THREE.RingGeometry(6, 9, 64);
const ringMaterial = new THREE.MeshBasicMaterial({
  color: 0xffd700,
  side: THREE.DoubleSide,
});
const ring = new THREE.Mesh(ringGeometry, ringMaterial);
ring.rotation.x = Math.PI / 2;
scene.add(ring);

// Sfære som beveger seg rundt Saturn
const orbitSphereGeometry = new THREE.SphereGeometry(1, 32, 32);
const orbitSphereMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const orbitSphere = new THREE.Mesh(orbitSphereGeometry, orbitSphereMaterial);
scene.add(orbitSphere);

// Lys for effekten
const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(0, 0, 10);
scene.add(light);

// 3D-tekst
const fontLoader = new FontLoader();
let textMesh;

fontLoader.load(
  "https://threejs.org/examples/fonts/helvetiker_bold.typeface.json",
  (font) => {
    const textGeometry = new TextGeometry("Velkommen til Nav Land 2050", {
      font: font,
      size: 1,
      height: 0.5,
      curveSegments: 12,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.02,
      bevelSegments: 5,
    });

    const textMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
    textMesh = new THREE.Mesh(textGeometry, textMaterial);
    textMesh.position.set(-15, 10, 0);
    scene.add(textMesh);
  }
);

// Variabler for animasjon
let angle = 0;

// Animasjonsfunksjon
function animate() {
  requestAnimationFrame(animate);

  // Beveg sfæren rundt Saturn
  angle += 0.02;
  orbitSphere.position.x = 12 * Math.cos(angle);
  orbitSphere.position.z = 12 * Math.sin(angle);

  renderer.render(scene, camera);
}

// Håndter vinduendringer
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Start animasjonen
animate();
