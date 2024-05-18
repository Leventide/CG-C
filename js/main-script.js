import * as THREE from 'three';
import { ParametricGeometries } from "../node_modules/three/examples/jsm/geometries/ParametricGeometries.js";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { VRButton } from 'three/addons/webxr/VRButton.js';
import * as Stats from 'three/addons/libs/stats.module.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

//////////////////////
/* GLOBAL VARIABLES */
//////////////////////

var fixPerspectiveCamera
var scene, renderer
var main_cylinder, disc1, disc2, disc3
var up1, up2, up3
var delta
var active1, active2, active3
var press
const pressedKeys = new Set();

var clock = new THREE.Clock();
var temporary_material1, temporary_material2, temporary_material3, temporary_material4

/////////////////////
/* CREATE SCENE(S) */
/////////////////////
function createScene(){
    'use strict';

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xfedcba);
    scene.add(new THREE.AxesHelper(10));
}

//////////////////////
/* CREATE CAMERA(S) */
//////////////////////
function createCameras(){
    'use strict';

    fixPerspectiveCamera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
    fixPerspectiveCamera.position.set(50, 80, 50);
    fixPerspectiveCamera.lookAt(scene.position);
}

/////////////////////
/* CREATE LIGHT(S) */
/////////////////////

////////////////////////
/* CREATE OBJECT3D(S) */
////////////////////////
function createObjects(){
    'use strict';
    temporary_material1 = new THREE.MeshBasicMaterial({color: 'Gray'});
    temporary_material1.wireframe = true;
    temporary_material2 = new THREE.MeshBasicMaterial({color: 'Yellow'});
    temporary_material3 = new THREE.MeshBasicMaterial({color: 'Red'});
    temporary_material4 = new THREE.MeshBasicMaterial({color: 'Blue'});
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
    scene.add(main_cylinder);

    var klein_geometry = new THREE.ParametricBufferGeometry(ParametricGeometries.klein, 25, 25);
    var klein_obj = new THREE.Mesh( klein_geometry, temporary_material2 );
    klein_obj.position.set(10, 10, 10);
    scene.add(klein_obj);


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
    renderer.render(scene, fixPerspectiveCamera);
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

    // Create scene and cameras
    createScene();
    createCameras();

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
        main_cylinder.rotation.y += Math.PI*0.01*delta*10;
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

    renderer.render(scene, fixPerspectiveCamera);
    requestAnimationFrame(animate);
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