import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const container = document.getElementById('door2_container');

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setClearColor(0xffffff);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
container.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  45,
  container.clientWidth / container.clientHeight,
  1,
  100
);
camera.position.set(0, 2, 6);
camera.aspect = container.clientWidth / container.clientHeight;
camera.lookAt(0, 1, 0);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enablePan = false;
controls.minDistance = 5;
controls.maxDistance = 20;
controls.minPolarAngle = 0.5;
controls.maxPolarAngle = 1.5;
controls.autoRotate = false;
controls.target = new THREE.Vector3(0, 0, 0);
controls.update();

const groundGeometry = new THREE.PlaneGeometry(20, 20, 32, 32);
groundGeometry.rotateX(-Math.PI / 2);

const groundMaterial = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  side: THREE.DoubleSide
});

const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
groundMesh.position.y = -.5;
groundMesh.receiveShadow = true;
scene.add(groundMesh);


const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(-5, 10, 7);
directionalLight.castShadow = true;
scene.add(directionalLight);

const isLocalhost = location.hostname === 'localhost' || location.hostname.startsWith('127.');
const assetPath = isLocalhost ? '/assets/3Dmodel/' : '../assets/3Dmodel/';
const loader = new GLTFLoader().setPath(assetPath);
loader.load('doc.glb', (gltf) => {
  console.log('loading model');
  const mesh = gltf.scene;

  mesh.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });


  mesh.scale.set(30, 30, 30);           
  mesh.position.set(0, -0.5, 0);
  mesh.rotation.y =  0.8;       
  scene.add(mesh);
});

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();

// Reaktion auf Fenstergröße
window.addEventListener('resize', () => {
  const width = container.clientWidth;
  const height = container.clientHeight;
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
});

document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.querySelector('.nav-links');
  const dropdowns = document.querySelectorAll('.dropdown');

  // Hamburger Menü toggeln
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active'); // Optional, falls du Animation möchtest
  });

  // Dropdowns per Klick öffnen/schließen (für mobile)
  dropdowns.forEach(dropdown => {
    const trigger = dropdown.querySelector('a');

    trigger.addEventListener('click', e => {
      e.preventDefault(); // verhindert Link-Navigation
      dropdown.classList.toggle('active');
    });
  });
});