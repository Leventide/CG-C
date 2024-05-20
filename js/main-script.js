import * as THREE from 'three';
import { ParametricGeometry } from '../node_modules/three/examples/jsm/geometries/ParametricGeometry.js';
import { ParametricGeometries } from '../node_modules/three/examples/jsm/geometries/ParametricGeometries.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { VRButton } from 'three/addons/webxr/VRButton.js';
import * as Stats from 'three/addons/libs/stats.module.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

//////////////////////
/* GLOBAL VARIABLES */
//////////////////////

var fixPerspectiveCamera, topCamera, stereoCamera
var scene, renderer
var main_cylinder, disc1, disc2, disc3
var up1, up2, up3
var delta
var active1, active2, active3
var press
const pressedKeys = new Set();

var directionalLight

var klein_obj1, klein_obj2, klein_obj3
var mobius_obj1, mobius_obj2, mobius_obj3

var clock = new THREE.Clock();
var temporary_material1, temporary_material2, temporary_material3, temporary_material4, temporary_material5

/////////////////////
/* CREATE SCENE(S) */
/////////////////////
function createScene(){
    'use strict';

    scene = new THREE.Scene();
    //scene.background = new THREE.Color(0xfedcba);
    scene.add(new THREE.AxesHelper(10));
}

//////////////////////
/* CREATE CAMERA(S) */
//////////////////////
function createCameras(){
    'use strict';
    
    topCamera = new THREE.OrthographicCamera(-70, 70, 70, -5, 1, 200);
    topCamera.position.set(0, 0, 100);
    topCamera.lookAt(scene.position);

    fixPerspectiveCamera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
    fixPerspectiveCamera.position.set(50, 80, 50);
    fixPerspectiveCamera.lookAt(scene.position);

    stereoCamera = new THREE.StereoCamera();
    stereoCamera.cameraL.position.copy(fixPerspectiveCamera.position);
    stereoCamera.cameraR.position.copy(fixPerspectiveCamera.position);
    stereoCamera.cameraL.lookAt(scene.position);
    stereoCamera.cameraR.lookAt(scene.position);
}

/////////////////////
/* CREATE LIGHT(S) */
/////////////////////
function createLights() {
    directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.set(5, 50, 15);
    scene.add(directionalLight);

    const ambientLight = new THREE.AmbientLight(0xffa500, 0.2);
    scene.add(ambientLight);
}

////////////////////////
/* CREATE OBJECT3D(S) */
////////////////////////
function createObjects(){
    'use strict';
    temporary_material1 = new THREE.MeshStandardMaterial({color: 'Gray'});
    temporary_material2 = new THREE.MeshStandardMaterial({color: 'Yellow'});
    temporary_material3 = new THREE.MeshStandardMaterial({color: 'Red'});
    temporary_material4 = new THREE.MeshStandardMaterial({color: 'Blue'});
    temporary_material5 = new THREE.MeshStandardMaterial({color: 'Purple'});

    var extrudesettings = {
        depth: 3,
        bevelEnabled: false
    };
    var main_cylinder_geometry = new THREE.CylinderGeometry(5, 5, 50, 32);
    main_cylinder = new THREE.Mesh(main_cylinder_geometry, temporary_material1);
    main_cylinder.position.set(0, 25, 0);
    main_cylinder.rotation.set(0, 0, 0);

    var disc1_shape = new THREE.Shape();
    disc1_shape.absarc(0, 0, 12, 0, Math.PI * 2, false);
    var holePath = new THREE.Path();
    holePath.absarc(0, 0, 5, 0, Math.PI * 2, true);
    disc1_shape.holes.push(holePath);
    var disc1_geometry = new THREE.ExtrudeGeometry(disc1_shape, extrudesettings);
    disc1 = new THREE.Mesh(disc1_geometry, temporary_material2);
    disc1.position.set(0, 10, 0);
    disc1.rotation.set(Math.PI*0.5, 0, 0);

    var disc2_shape = new THREE.Shape();
    disc2_shape.absarc(0, 0, 19, 0, Math.PI * 2, false);
    var holePath = new THREE.Path();
    holePath.absarc(0, 0, 12, 0, Math.PI * 2, true);
    disc2_shape.holes.push(holePath);
    var disc2_geometry = new THREE.ExtrudeGeometry(disc2_shape, extrudesettings);
    disc2 = new THREE.Mesh(disc2_geometry, temporary_material3);
    disc2.position.set(0, 0, 0);
    disc2.rotation.set(Math.PI*0.5, 0, 0);

    var disc3_shape = new THREE.Shape();
    disc3_shape.absarc(0, 0, 26, 0, Math.PI * 2, false);
    var holePath = new THREE.Path();
    holePath.absarc(0, 0, 19, 0, Math.PI * 2, true);
    disc3_shape.holes.push(holePath);
    var disc3_geometry = new THREE.ExtrudeGeometry(disc3_shape, extrudesettings);
    disc3 = new THREE.Mesh(disc3_geometry, temporary_material4);
    disc3.position.set(0, -10, 0);
    disc3.rotation.set(Math.PI*0.5, 0, 0);

    main_cylinder.add(disc1);
    main_cylinder.add(disc2);
    main_cylinder.add(disc3);

    var klein_geometry = new ParametricGeometry(ParametricGeometries.klein, 25, 25);
    var mobius_geometry = new ParametricGeometry(ParametricGeometries.mobius, 25, 25);

    klein_obj1 = new THREE.Mesh(klein_geometry, temporary_material5);
    klein_obj1.scale.set(0.25, 0.25, 0.25);
    disc1.add(klein_obj1);
    klein_obj1.position.x = 6;
    klein_obj1.position.y = -6;
    klein_obj1.position.z = -2.5;
    klein_obj1.rotation.x = -Math.PI

    mobius_obj1 = new THREE.Mesh(mobius_geometry, temporary_material5);
    mobius_obj1.scale.set(1.2, 1.2, 1.2);
    disc1.add(mobius_obj1);
    mobius_obj1.position.x = 6;
    mobius_obj1.position.y = 6;
    mobius_obj1.position.z = -0.65;
    mobius_obj1.rotation.x = -Math.PI

    
    klein_obj2 = new THREE.Mesh(klein_geometry, temporary_material5);
    klein_obj2.scale.set(0.2, 0.2, 0.2);
    disc2.add(klein_obj2);
    klein_obj2.position.x = -15.5;
    klein_obj2.position.z = -0.7;
    klein_obj2.rotation.x = Math.PI*0.5

    mobius_obj2 = new THREE.Mesh(mobius_geometry, temporary_material5);
    disc2.add(mobius_obj2);
    mobius_obj2.position.x = 10.5;
    mobius_obj2.position.y = -10.5;
    mobius_obj2.position.z = -1.9;
    mobius_obj2.rotation.x = -Math.PI*0.33

    klein_obj3 = new THREE.Mesh(klein_geometry, temporary_material5);
    klein_obj3.scale.set(0.33, 0.33, 0.33);
    disc3.add(klein_obj3);
    klein_obj3.position.y = 22.5;
    klein_obj3.position.z = -2.7;
    
    mobius_obj3 = new THREE.Mesh(mobius_geometry, temporary_material5);
    mobius_obj3.scale.set(1.33, 1.33, 1.33);
    disc3.add(mobius_obj3);
    mobius_obj3.position.y = -22.5;
    mobius_obj3.position.z = -3;
    mobius_obj3.rotation.x = Math.PI*0.33

    scene.add(main_cylinder);
}



///////////////////////
/* MOVEMENT FUNCTONS */
///////////////////////
function disc_move(disc, delta_time, up) {
    if (up == 0) {
        disc.position.y += 0.1*delta_time*100;
    } else if (up == 1) {
        disc.position.y -= 0.1*delta_time*100;
    }
}

function check_up (disc, up) {
    if (disc.position.y >= 25 && up == 0) {
        up = 1;
    }
    if (disc.position.y <= -22 && up == 1) {
        up = 0;
    }
    return up;
}

////////////
/* UPDATE */
////////////
function update(){
    'use strict';

}

/////////////
/* DISPLAY */
/////////////
function render() {
    'use strict';
    renderer.render(scene, topCamera);
}

////////////////////////////////
/* INITIALIZE ANIMATION CYCLE */
////////////////////////////////
function init() {
    'use strict';

    // Initialize renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    document.body.appendChild(VRButton.createButton(renderer));
    renderer.xr.enabled = true;

    // Create scene and cameras
    createScene();
    createCameras();
    createLights();

    createObjects();


    render()
    active1 = false;
    active2 = false;
    active3 = false;
    up1 = 0;
    up2 = 0;
    up3 = 0;
    press = true;
    // Event listeners for keyboard input and window resize
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("resize", onResize);
}

/////////////////////
/* ANIMATION CYCLE */
/////////////////////
function animate() {
    'use strict';
    
    delta = clock.getDelta();
    if (delta < 0.5) {
        //main_cylinder.rotation.y += Math.PI*0.01*delta*10;
        if (active1) {
            up1 = check_up(disc1, up1);
            disc_move(disc1, delta, up1);
        }
        if (active2) {
            up2 = check_up(disc2, up2);
            disc_move(disc2, delta, up2);
        }
        if (active3) {
            up3 = check_up(disc3, up3);
            disc_move(disc3, delta, up3);
        }
    }

    renderer.render(scene, topCamera);
    //requestAnimationFrame(animate);
    renderer.setAnimationLoop(animate);
}

////////////////////////////
/* RESIZE WINDOW CALLBACK */
////////////////////////////
function onResize() { 
    'use strict';
    
    renderer.setSize(window.innerWidth, window.innerHeight);

    if (window.innerHeight > 0 && window.innerWidth > 0) {
        fixPerspectiveCamera.aspect = window.innerWidth / window.innerHeight;
        fixPerspectiveCamera.updateProjectionMatrix();
    }
}

///////////////////////
/* KEY DOWN CALLBACK */
///////////////////////
function onKeyDown(e) {
    'use strict';

    pressedKeys.add(e.key);
    press = true;

    if (e.key === 'D' || e.key === 'd') {
        directionalLight.visible = !directionalLight.visible;
    }
}

///////////////////////
/* KEY UP CALLBACK */
///////////////////////
function onKeyUp(e){
    'use strict';

    checkPressedKeys();
    press = false;
    pressedKeys.delete(e.key);
}

////////////////
/* CHECK KEYS */
////////////////
function checkPressedKeys() {

    if (press) {
        if (pressedKeys.has('1')) {
            active1 = !active1;
        }
        if (pressedKeys.has('2')) {
            active2 = !active2;
        }
        if (pressedKeys.has('3')) {
            active3 = !active3;
        }
    }
}

init();
animate();