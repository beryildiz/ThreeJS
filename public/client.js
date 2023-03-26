import * as THREE from 'three'
import {OrbitControls} from './jsm/controls/OrbitControls.js'
import Stats from './jsm/libs/stats.module.js'
import {ColladaLoader} from './jsm/loaders/ColladaLoader.js';




// Scene
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(106, window.innerWidth / window.innerHeight, 0.1, 100)
camera.position.z = 2

// Renderer
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

// Controls
const controls = new OrbitControls(camera, renderer.domElement)

/*
// Box Model
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({color: 0x00FF00});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);*/


// FPS Counter
const stats = Stats()
document.body.appendChild(stats.dom)


// Skybox
const cubeTextureLoader = new THREE.CubeTextureLoader();
const texture = cubeTextureLoader.load([
    'assets/skybox/humble_ft.jpg',
    'assets/skybox/humble_bk.jpg',
    'assets/skybox/humble_up.jpg',
    'assets/skybox/humble_dn.jpg',
    'assets/skybox/humble_rt.jpg',
    'assets/skybox/humble_lf.jpg'
])
scene.background = texture;

// Smogmog
const colladaLoader = new ColladaLoader();
let weezingModel;
colladaLoader.load('assets/models/Weezing/Weezing.dae', (model) => {
    weezingModel = model.scene;
    weezingModel.scale.set(0.5,0.5,0.5);
    scene.add(weezingModel);
})

// Light
const light = new THREE.AmbientLight(0xd3eff0);
scene.add(light);

window.addEventListener(
    'resize',
    () => {
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
        render()
    },
    false
)


function animate() {
    requestAnimationFrame(animate)
    weezingModel.rotation.z += 0.01
    controls.update()
    render()
    stats.update()
}

function render() {
    renderer.render(scene, camera)
}

animate()