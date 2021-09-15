import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r119/build/three.module.js';
import {OrbitControls} from 'https://threejsfundamentals.org/threejs/resources/threejs/r119/examples/jsm/controls/OrbitControls.js';
import {GLTFLoader} from 'https://threejsfundamentals.org/threejs/resources/threejs/r119/examples/jsm/loaders/GLTFLoader.js';

//model loader
let loader = new GLTFLoader()

let size = (window.innerHeight/100)*30


//computer model
const canvas = document.getElementById('computerModel');
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, 1, 0.1, 1000 );
camera.position.z = 7;

const renderer = new THREE.WebGLRenderer({canvas, antialias: true, alpha: true});
renderer.setSize(size, size);

//light source
let color = '#e0ded3'
let intenstiy = 2
//let light = new THREE.DirectionalLight(color, intenstiy)
let light = new THREE.AmbientLight('#e0ded3')
light.position.set(2, 4, 1)

scene.add(light)

let compModel

loader.load('./assets/models/comp.gltf', (gltf)=>{
    const root = gltf.scene
    root.position.set(-1,0, -1)
    light.target = root
    compModel = root
    scene.add(root)
})

const animate = function(){
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
};
animate();


//file model
const fileCanvas = document.getElementById('fileModel')
const fileScene = new THREE.Scene()
const fileCamera = new THREE.PerspectiveCamera( 75, 1, 0.1, 1000)
fileCamera.position.z = 5;

const fileRenderer = new THREE.WebGLRenderer({canvas: fileCanvas, antialias: true, alpha: true});
fileRenderer.setSize(size, size);


//let fileSceneLight = new THREE.DirectionalLight('#e0ded3', 1)
let fileSceneLight = new THREE.AmbientLight('#e0ded3')
fileSceneLight.position.set(5, 3, 6)
fileScene.add(fileSceneLight)

let fileModel

loader.load('./assets/models/folder.gltf', (gltf)=>{
    const root = gltf.scene
    root.position.set(0, 0, 0)
    root.rotation.set(0, -0.2 ,0)
    fileSceneLight.target = root
    fileModel = root
    fileScene.add(root)
})

const fileAnimation = function(){
    requestAnimationFrame(fileAnimation);
    fileRenderer.render(fileScene, fileCamera);
}
fileAnimation()

//me model
const personCanvas = document.getElementById('personModel')
const personScene = new THREE.Scene()
const personCamera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000 )
personCamera.position.z = 5


const personRenderer = new THREE.WebGLRenderer({canvas: personCanvas, antialias: true, alpha: true})
personRenderer.setSize(size, size);


//let personLight = new THREE.DirectionalLight('#e0ded3', 1)
let personLight = new THREE.AmbientLight('#e0ded3')
personLight.position.set(3, 2, 10)
personScene.add(personLight)

let personModel

loader.load('./assets/models/octocat.gltf', (gltf)=>{
    const root = gltf.scene
    root.position.set(0, 0, 0)
    personLight.target = root
    personModel = root
    personScene.add(root)
})

const personAnimation = function(){
    requestAnimationFrame(personAnimation);
    personRenderer.render(personScene, personCamera);
}
personAnimation()

let previousX = 0
let previousY = 0

window.addEventListener('mousemove', (e)=>{
    if(e.clientX > previousX && compModel && fileModel && personModel){
        compModel.rotation.y += 0.003
        fileModel.rotation.y += 0.003
        personModel.rotation.y += 0.003
    }else if(e.clientX < previousX && compModel && fileModel && personModel){
        compModel.rotation.y -= 0.003
        fileModel.rotation.y -= 0.003
        personModel.rotation.y -= 0.003
    }
    
    if(e.clientY > previousY && compModel && fileModel && personModel){
        compModel.rotation.x += 0.003
        fileModel.rotation.x += 0.003
        personModel.rotation.x += 0.003
    }else if(e.clientY < previousY && compModel && fileModel && personModel){
        compModel.rotation.x -= 0.003
        fileModel.rotation.x -= 0.003
        personModel.rotation.x -= 0.003
    }
    previousX = e.clientX
    previousY = e.clientY
    
})



//background scene in contacts section
let bgCanvas = document.getElementById('bgCanvas')
bgCanvas.style.height = window.innerHeight + 'px'
bgCanvas.style.width = window.innerWidth + 'px'
let bgRenderer = new THREE.WebGLRenderer({canvas: bgCanvas, antialias: true,  alpha: true })
bgRenderer.setSize(parseInt(bgCanvas.style.width), parseInt(bgCanvas.style.height))

let bgCamera = new THREE.PerspectiveCamera(30, window.innerWidth/window.innerHeight, 0.1, 1000)
bgCamera.position.z = 10
bgCamera.position.y = 15
bgCamera.position.x = -10

let bgScene = new THREE.Scene()

const bgControls = new OrbitControls(bgCamera, bgCanvas)
bgControls.target.set(0, 0, 0)
bgControls.update()

let bgLight1 = new THREE.DirectionalLight('#e0ded3', 1)
bgScene.add(bgLight1)
bgLight1.position.set(5, 20, 0)

let bgLight2 = new THREE.DirectionalLight('#e0ded3', 1)
bgScene.add(bgLight2)
bgLight2.position.set(0, -20, 0)


let mixer
let bg 

loader.load('./assets/models/contactsbg.gltf', (gltf)=>{
    const root = gltf.scene
    bg = root
    mixer = new THREE.AnimationMixer(root)
    var action = mixer.clipAction(gltf.animations[7])
    action.play()
    bgScene.add(root)
    mixer.update(1)
})



function bgRender(){
    requestAnimationFrame(bgRender)
    if(mixer){
      mixer.update(0.01)   
    }
    bg.rotation.y += 0.001
    bgRenderer.render(bgScene, bgCamera)
}
bgRender()

