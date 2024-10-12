import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Stats from 'three/examples/jsm/libs/stats.module.js'
import { World } from './world.js';
import { createUI } from './ui.js';

// Ajout d'un compteur de fps
const stats = new Stats();
document.body.appendChild(stats.dom);

// Initialisation du renderer
const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x80a0e0)
document.body.appendChild(renderer.domElement);

// Initialisation de la camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(-32, 16, -32);
camera.lookAt(0, 0, 0);

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(16, 0, 16)
controls.update();

// Initialisation de la scene
const scene = new THREE.Scene();
const world = new World();
world.generate();
scene.add(world);
// Initialisation de la lumière sur la scène
function setupLight() { 
    // Lumière du "soleil"
    const light1 = new THREE.DirectionalLight();
    light1.position.set(1, 1, 1);
    scene.add(light1);

    const light2 = new THREE.DirectionalLight();
    light2.position.set(-1, -1, -0.5);
    scene.add(light2);

    // Lumière ambiante
    const ambient = new THREE.AmbientLight();
    ambient.intensity = 0.1;
    scene.add(ambient);
}


// Renderer loop
function animate() {
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
    stats.update()
}

// Modifie le ratio de la caméra quand la page est redimensionné, pour s'adapter à toutes les tailles
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
})


setupLight();
createUI(world)
animate();