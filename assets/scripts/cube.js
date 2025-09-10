import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById('bg'),
  alpha: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // softer shadows

// === Lights ===

// Ambient light for general fill
const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambientLight);

// Directional light (acts like sun)
const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(5, 10, 5);
dirLight.castShadow = true;

const hemiLight = new THREE.HemisphereLight(0xaaaaaa, 0x444444, 0.4);
scene.add(hemiLight);

// Shadow settings
dirLight.shadow.mapSize.set(1024, 1024);
dirLight.shadow.camera.near = 0.5;
dirLight.shadow.camera.far = 50;
dirLight.shadow.camera.left = -10;
dirLight.shadow.camera.right = 10;
dirLight.shadow.camera.top = 10;
dirLight.shadow.camera.bottom = -10;
dirLight.shadow.radius = 4; // blur
dirLight.shadow.bias = -0.0005; // reduce floating shadow gaps

scene.add(dirLight);

// === Cube ===
const loader = new THREE.TextureLoader();
function loadTexture(path) {
  const texture = loader.load(path);
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.minFilter = THREE.LinearFilter; // avoids mipmap blur
  return texture;
}

const materials = [
  new THREE.MeshStandardMaterial({ map: loadTexture('assets/images/github.jpg') }),
  new THREE.MeshStandardMaterial({ map: loadTexture('assets/images/linkedin.png') }),
  new THREE.MeshStandardMaterial({ map: loadTexture('assets/images/youtube.png') }),
  new THREE.MeshStandardMaterial({ map: loadTexture('assets/images/about.png') }),
  new THREE.MeshStandardMaterial({ map: loadTexture('assets/images/projects.png') }),
  new THREE.MeshStandardMaterial({ map: loadTexture('assets/images/contact.png') })
];

const geometry = new RoundedBoxGeometry(2.5, 2.5, 2.5, 5, 0.25);
const cube = new THREE.Mesh(geometry, materials);
cube.castShadow = true;
scene.add(cube);

// === Ground Plane for Shadow ===
const planeGeometry = new THREE.PlaneGeometry(20, 20);
const planeMaterial = new THREE.ShadowMaterial({ opacity: 0.3 });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 2;
plane.position.y = -2;
plane.receiveShadow = true;
scene.add(plane);

// === Camera & Controls ===
camera.position.z = 6;

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.enableZoom = true;
controls.enablePan = false;

// Limit zoom
controls.minDistance = 4;
controls.maxDistance = 10;

// === Keyboard Input for Cube Rotation ===
const keyState = {
  w: false,
  s: false,
  a: false,
  d: false
};

window.addEventListener('keydown', (event) => {
  if (event.key.toLowerCase() in keyState) {
    keyState[event.key.toLowerCase()] = true;
  }
});

window.addEventListener('keyup', (event) => {
  if (event.key.toLowerCase() in keyState) {
    keyState[event.key.toLowerCase()] = false;
  }
});

// === Animation Loop ===
function animate() {
  requestAnimationFrame(animate);

  // Apply cube rotation with WASD
  const rotationSpeed = 0.02;
  if (keyState.w) cube.rotation.x -= rotationSpeed; // tilt up
  if (keyState.s) cube.rotation.x += rotationSpeed; // tilt down
  if (keyState.a) cube.rotation.y -= rotationSpeed; // rotate left
  if (keyState.d) cube.rotation.y += rotationSpeed; // rotate right

  controls.update();
  renderer.render(scene, camera);
}
animate();

// === Resize Handling ===
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});


const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

const faceMappings = [
  { label: "GitHub", url: "https://github.com/nfacciola" },
  { label: "LinkedIn", url: "https://www.linkedin.com/in/nicholas-facciola-a27355205/" },
  { label: "YouTube", url: "https://youtube.com/@nicholas-facciola" },
  { label: "About", url: "pages/about.html" },
  { label: "Projects", url: "pages/projects.html" },
  { label: "Contact", url: "pages/contact.html" }
];

function onClick(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObject(cube);

  if (intersects.length > 0) {
    const faceIndex = Math.floor(intersects[0].face.materialIndex);
    const face = faceMappings[faceIndex];

    if (face) {
      console.log(`Clicked face: ${face.label}`);
      window.open(face.url, "_blank");
    }
  }
}

window.addEventListener("click", onClick);
