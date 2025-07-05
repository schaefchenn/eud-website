import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xffffff);
renderer.setPixelRatio(window.devicePixelRatio);

// ✅ Enable shadow map
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.set(4, 5, 11);
camera.lookAt(0, 0, 0);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enablePan = false;
controls.minDistance = 5;
controls.maxDistance = 20;
controls.minPolarAngle = 0.5;
controls.maxPolarAngle = 1.5;
controls.autoRotate = false;
controls.target = new THREE.Vector3(2, 1, 0);
controls.update();

const groundGeometry = new THREE.PlaneGeometry(20, 20, 32, 32);
groundGeometry.rotateX(-Math.PI / 2);

const groundMaterial = new THREE.MeshStandardMaterial({
  color: 0x555555,
  side: THREE.DoubleSide
});

const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
groundMesh.position.y = 0.;

// ✅ Let ground receive shadows
groundMesh.receiveShadow = true;

scene.add(groundMesh);

// Soft general light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// Directional light (like sunlight)
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 10, 7);
directionalLight.castShadow = true;
scene.add(directionalLight);

const loader = new GLTFLoader().setPath('public/3d_model/');
loader.load('door.glb', (gltf) => {
  console.log('loading model');
  const mesh = gltf.scene;

  // ✅ Correct syntax: .traverse
  mesh.traverse((child) => {
    if (child.isMesh) {
      // ✅ Correct spelling: receiveShadow
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  // ✅ Add mesh to scene
  mesh.scale.set(2, 2, 2);           // Optional: enlarge model
  mesh.position.set(0, 0, 0);        // Optional: reposition
  scene.add(mesh);
});

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();