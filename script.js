import * as THREE from "https://cdnjs.cloudflare.com/ajax/libs/three.js/110/three.module.js";
import { FontLoader } from "https://cdnjs.cloudflare.com/ajax/libs/three.js/110/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "https://cdnjs.cloudflare.com/ajax/libs/three.js/110/examples/jsm/geometries/TextGeometry.js";

// Opprett scene, kamera og renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 30;

const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("scene") });
renderer.setSize(window.innerWidth, window.innerHeight);

// Saturn (stor sfære)
const saturnGeometry = new THREE.SphereGeometry(5, 32, 32);
const saturnMaterial = new THREE.MeshBasicMaterial({ color: 0xffd700 });
const saturn = new THREE.Mesh(saturnGeometry, saturnMaterial);
scene.add(saturn);

// Sfære som beveger seg rundt Saturn
const movingSphereGeometry = new THREE.SphereGeometry(1, 32, 32);
const movingSphereMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
const movingSphere = new THREE.Mesh(movingSphereGeometry, movingSphereMaterial);
scene.add(movingSphere);

// Lys for effekten
const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(0, 0, 10);
scene.add(light);

// Variabler for animasjon
let angle = 0;

// Last inn 3D-font og legg til tekst
const fontLoader = new FontLoader();
let textMesh;

fontLoader.load(
  "https://threejs.org/examples/fonts/helvetiker_bold.typeface.json",
  (font) => {
    const textGeometry = new TextGeometry("Velkommen til Nav Land", {
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
    scene.add(textMesh);
  }
);

// Animasjonsfunksjon
function animate() {
  requestAnimationFrame(animate);

  // Beveg sfæren rundt Saturn
  angle += 0.02;
  movingSphere.position.x = 12 * Math.cos(angle);
  movingSphere.position.z = 12 * Math.sin(angle);

  // Flytt teksten sammen med sfæren
  if (textMesh) {
    textMesh.position.x = movingSphere.position.x;
    textMesh.position.z = movingSphere.position.z;
    textMesh.position.y = movingSphere.position.y + 2; // Løft teksten litt over sfæren

    // Roter teksten mot kamera
    textMesh.lookAt(camera.position);

    // Stopp teksten foran Saturn
    if (Math.abs(movingSphere.position.z) < 0.5 && movingSphere.position.x > 0) {
      textMesh.position.x = 0;
      textMesh.position.z = 7; // Stopp teksten foran Saturn
    }
  }

  renderer.render(scene, camera);
}

// Håndter endring av vindusstørrelse
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Start animasjonen
animate();
