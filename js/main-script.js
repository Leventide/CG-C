import * as THREE from 'three';
import { ParametricGeometry } from '../node_modules/three/examples/jsm/geometries/ParametricGeometry.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { VRButton } from 'three/addons/webxr/VRButton.js';
import * as Stats from 'three/addons/libs/stats.module.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

//////////////////////
/* GLOBAL VARIABLES */
//////////////////////

var fixPerspectiveCamera, stereoCamera
var scene, renderer
var main_cylinder, disc1, disc2, disc3
var up1, up2, up3
var delta
var active1, active2, active3
var press
const pressedKeys = new Set();

var directionalLight

var elipsoid1, elipsoid2, elipsoid3
var hyperboloid1, hyperboloid2, hyperboloid3
var cone1, cone2, cone3
var torus1, torus2, torus3
var helix1, helix2, helix3
var ripple1, ripple2, ripple3
var flatcircle1, flatcircle2, flatcircle3
var klein1, klein2, klein3

var clock = new THREE.Clock();
var temporary_material1, temporary_material2, temporary_material3, temporary_material4, temporary_material5

/////////////////////
/* CREATE SCENE(S) */
/////////////////////
function createScene(){
    'use strict';

    scene = new THREE.Scene();
    scene.add(new THREE.AxesHelper(10));
}

//////////////////////
/* CREATE CAMERA(S) */
//////////////////////
function createCameras(){
    'use strict';

    fixPerspectiveCamera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
    fixPerspectiveCamera.position.set(40, 70, 40);
    fixPerspectiveCamera.lookAt(-20, 0, -20);

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

    const ambientLight = new THREE.AmbientLight(0xffa500, 0.5);
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
    temporary_material5.side = THREE.DoubleSide;

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

    var elipsoid_geometry = new ParametricGeometry(elipsoidParam, 25, 25);
    var hyperboloid_geometry = new ParametricGeometry(hyperboloidParam, 25, 25);
    var cone_geometry = new ParametricGeometry(coneParam, 25, 25);
    var torus_geometry = new ParametricGeometry(torusParam, 25, 25);
    var helix_geometry = new ParametricGeometry(helixParam, 100, 100);
    var ripple_geometry = new ParametricGeometry(rippleParam, 25, 25);
    var flatcircle_geometry = new ParametricGeometry(flatcircleParam, 25, 25);
    var klein_geometry = new ParametricGeometry(kleinParam, 25, 25);


    elipsoid1 = new THREE.Mesh(elipsoid_geometry, temporary_material5);
    elipsoid1.position.y = 8.5
    elipsoid1.position.z = -1.5
    disc1.add(elipsoid1)

    elipsoid2 = new THREE.Mesh(elipsoid_geometry, temporary_material5);
    elipsoid2.scale.set(1.2, 1.2, 1.2)
    elipsoid2.position.x = 11
    elipsoid2.position.y = -11
    elipsoid2.position.z = -3
    elipsoid2.rotation.y = Math.PI*0.5
    disc2.add(elipsoid2)

    elipsoid3 = new THREE.Mesh(elipsoid_geometry, temporary_material5);
    elipsoid3.scale.set(1.33, 1.33, 1.33)
    elipsoid3.position.x = -22
    elipsoid3.position.z = -2.5
    elipsoid3.rotation.y = Math.PI*0.25
    disc3.add(elipsoid3)

    hyperboloid1 = new THREE.Mesh(hyperboloid_geometry, temporary_material5);
    hyperboloid1.scale.set(0.5, 0.5, 0.5)
    hyperboloid1.position.x = 8.5
    hyperboloid1.position.z = -2.75
    disc1.add(hyperboloid1)

    hyperboloid2 = new THREE.Mesh(hyperboloid_geometry, temporary_material5);
    hyperboloid2.scale.set(0.55, 0.55, 0.55)
    hyperboloid2.position.y = 15.5
    hyperboloid2.position.z = -2.5
    hyperboloid2.rotation.x = Math.PI*0.5
    hyperboloid2.rotation.y = Math.PI*0.5
    disc2.add(hyperboloid2)

    hyperboloid3 = new THREE.Mesh(hyperboloid_geometry, temporary_material5);
    hyperboloid3.scale.set(0.6, 0.6, 0.6)
    hyperboloid3.position.x = 22
    hyperboloid3.position.z = -3.25
    hyperboloid3.rotation.y = Math.PI*0.5
    disc3.add(hyperboloid3)

    cone1 = new THREE.Mesh(cone_geometry, temporary_material5);
    cone1.scale.set(1.25, 1.25, 1.25)
    cone1.position.x = -6
    cone1.position.y = -6
    cone1.position.z = -2
    disc1.add(cone1)

    cone2 = new THREE.Mesh(cone_geometry, temporary_material5);
    cone2.scale.set(1.4, 1.4, 1.4)
    cone2.position.y = -15
    cone2.position.z = -2.25
    cone2.rotation.y = Math.PI*0.5
    disc2.add(cone2)

    cone3 = new THREE.Mesh(cone_geometry, temporary_material5);
    cone3.scale.set(1.55, 1.55, 1.55)
    cone3.position.x = -15.5
    cone3.position.y = -15.5
    cone3.position.z = -2.5
    cone3.rotation.y = Math.PI*0.75
    disc3.add(cone3)

    torus1 = new THREE.Mesh(torus_geometry, temporary_material5);
    torus1.position.x = -8.5
    torus1.position.z = -1.75
    torus1.rotation.y = Math.PI*0.5
    disc1.add(torus1)

    torus2 = new THREE.Mesh(torus_geometry, temporary_material5);
    torus2.scale.set(1.2, 1.2, 1.2)
    torus2.position.x = 15
    torus2.position.z = -2
    disc2.add(torus2)

    torus3 = new THREE.Mesh(torus_geometry, temporary_material5);
    torus3.scale.set(1.33, 1.33, 1.33)
    torus3.position.y = 22
    torus3.position.z = -2
    torus3.rotation.y = Math.PI*0.75
    disc3.add(torus3)

    helix1 = new THREE.Mesh(helix_geometry, temporary_material5);
    helix1.position.x = -1
    helix1.position.y = -8.5
    helix1.position.z = -1.25
    helix1.rotation.y = Math.PI*0.5
    disc1.add(helix1)

    helix2 = new THREE.Mesh(helix_geometry, temporary_material5);
    helix2.scale.set(1.2, 1.2, 1.2)
    helix2.position.x = 10.5
    helix2.position.y = 10.5
    helix2.position.z = -1.3
    helix2.rotation.y = Math.PI*0.75   
    disc2.add(helix2)

    helix3 = new THREE.Mesh(helix_geometry, temporary_material5);
    helix3.scale.set(1.33, 1.33, 1.33)
    helix3.position.y = -22
    helix3.position.z = -3.5
    disc3.add(helix3)

    ripple1 = new THREE.Mesh(ripple_geometry, temporary_material5);
    ripple1.scale.set(0.9, 0.9, 0.9)
    ripple1.position.x = 6
    ripple1.position.y = -6
    ripple1.position.z = -2.25
    disc1.add(ripple1)

    ripple2 = new THREE.Mesh(ripple_geometry, temporary_material5);
    ripple2.position.x = -11
    ripple2.position.y = 11
    ripple2.position.z = -2.5
    ripple2.rotation.y = Math.PI*0.75   
    disc2.add(ripple2)

    ripple3 = new THREE.Mesh(ripple_geometry, temporary_material5);
    ripple3.scale.set(1.1, 1.1, 1.1)
    ripple3.position.x = 15.5
    ripple3.position.y = 15.5
    ripple3.position.z = -2.5
    ripple3.rotation.y = Math.PI*0.5
    disc3.add(ripple3)

    flatcircle1 = new THREE.Mesh(flatcircle_geometry, temporary_material5);
    flatcircle1.position.x = 6
    flatcircle1.position.y = 6
    flatcircle1.position.z = -2.35
    flatcircle1.rotation.y = Math.PI*0.25
    disc1.add(flatcircle1)

    flatcircle2 = new THREE.Mesh(flatcircle_geometry, temporary_material5);
    flatcircle2.scale.set(1.1, 1.1, 1.1)
    flatcircle2.position.x = -11
    flatcircle2.position.y = -11
    flatcircle2.position.z = -2.6
    disc2.add(flatcircle2)

    flatcircle3 = new THREE.Mesh(flatcircle_geometry, temporary_material5);
    flatcircle3.scale.set(1.2, 1.2, 1.2)
    flatcircle3.position.x = -15.5
    flatcircle3.position.y = 15.5
    flatcircle3.position.z = -3
    flatcircle3.rotation.y = Math.PI*0.5
    disc3.add(flatcircle3)

    klein1 = new THREE.Mesh(klein_geometry, temporary_material5);
    klein1.scale.set(0.25, 0.25, 0.25)
    klein1.position.x = -6
    klein1.position.y = 6
    klein1.position.z = -2.5
    disc1.add(klein1)

    klein2 = new THREE.Mesh(klein_geometry, temporary_material5);
    klein2.scale.set(0.3, 0.3, 0.3)
    klein2.position.x = -15.25
    klein2.position.z = -2.5
    klein2.rotation.y = Math.PI*0.5
    disc2.add(klein2)

    klein3 = new THREE.Mesh(klein_geometry, temporary_material5);
    klein3.scale.set(0.33, 0.33, 0.33)
    klein3.position.x = 15.5
    klein3.position.y = -15.5
    klein3.position.z = -3.75
    klein3.rotation.y = Math.PI
    disc3.add(klein3)

    scene.add(main_cylinder);
}

function elipsoidParam(u, v, target) {
    target.x = 2*Math.sin(u * Math.PI) * Math.cos(v * 2 * Math.PI);
    target.y = Math.sin(u * Math.PI) * Math.sin(v * 2 * Math.PI);
    target.z = Math.cos(u * Math.PI);
}

function hyperboloidParam(u, v, target) {
    target.x = Math.cosh(4 * v - 2) * Math.cos(u * 2 * Math.PI);
    target.y = Math.cosh(4 * v - 2) * Math.sin(u * 2 * Math.PI);
    target.z = Math.sinh(4 * v - 2);
}

function coneParam(u, v, target) {
    target.x = (1 - u) * Math.cos(v * 2 * Math.PI);
    target.y = (1 - u) * Math.sin(v * 2 * Math.PI);
    target.z = 2*u - 1;
}

function torusParam(u, v, target) {
    target.x = (1 + 0.4 * Math.cos(v * 2 * Math.PI)) * Math.cos(u * 2 * Math.PI);
    target.y = (1 + 0.4 * Math.cos(v * 2 * Math.PI)) * Math.sin(u * 2 * Math.PI);
    target.z = 0.4 * Math.sin(v * 2 * Math.PI);
}

function helixParam(u, v, target) {
    target.x = u * Math.cos(v * 6 * Math.PI);
    target.y = u * Math.sin(v * 6 * Math.PI);
    target.z = 2 * v;
}

function rippleParam(u, v, target) {
    target.x = 2*Math.sin(u * Math.PI) * Math.cos(v * 2 * Math.PI);
    target.y = 2*Math.sin(u * Math.PI) * Math.sin(v * 2 * Math.PI);
    var distance = Math.sqrt(target.x * target.x + target.y * target.y);
    target.z = Math.cos(distance * 3) * 0.5;
}

function flatcircleParam(u, v, target) {
    target.x = 2*Math.sin(u * Math.PI) * Math.cos(v * 2 * Math.PI);
    target.y = 2*Math.sin(u * Math.PI) * Math.sin(v * 2 * Math.PI);
    target.z = 0.5*Math.cos(u * Math.PI);
}

function kleinParam(u, v, target) {
    u *= Math.PI;
    v *= 2 * Math.PI;
    u = u * 2;
    if (u < Math.PI) {
        target.x = 3 * Math.cos(u) * (1 + Math.sin(u)) + (2 * (1 - Math.cos(u)/2)) * Math.cos(u) * Math.cos(v);
        target.z = -8 * Math.sin(u) - 2 * ( 1 - Math.cos(u)/2) * Math.sin(u) * Math.cos(v);
    } else {
        target.x = 3 * Math.cos(u) * (1 + Math.sin(u)) + (2 * (1 - Math.cos(u)/2)) * Math.cos(v + Math.PI);
        target.z = -8 * Math.sin(u);
    }
    target.y = -2 * (1 - Math.cos(u)/2) * Math.sin(v);
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

function rotateAll(delta_time){
    main_cylinder.rotation.y += Math.PI*0.01*delta*10;

    elipsoid1.rotation.z += Math.PI*0.1*delta*10;
    hyperboloid1.rotation.x += Math.PI*0.05*delta*10;
    cone1.rotation.y += Math.PI*0.07*delta*10;
    torus1.rotation.x += Math.PI*0.1*delta*10;
    torus1.rotation.y += Math.PI*0.01*delta*10;
    helix1.rotation.x += Math.PI*0.2*delta*10;
    ripple1.rotation.x -= Math.PI*0.05*delta*10;
    flatcircle1.rotation.x -= Math.PI*0.05*delta*10;
    klein1.rotation.z -= Math.PI*0.1*delta*10;

    elipsoid2.rotation.z += Math.PI*0.05*delta*10;
    hyperboloid2.rotation.y += Math.PI*0.1*delta*10;
    cone2.rotation.x += Math.PI*0.05*delta*10;
    cone2.rotation.y += Math.PI*0.05*delta*10;
    torus2.rotation.y += Math.PI*0.1*delta*10;
    helix2.rotation.z += Math.PI*0.1*delta*10;
    ripple2.rotation.x -= Math.PI*0.05*delta*10;
    flatcircle2.rotation.x += Math.PI*0.05*delta*10;
    klein2.rotation.x += Math.PI*0.1*delta*10;
    
    elipsoid3.rotation.z += Math.PI*0.09*delta*10;
    hyperboloid3.rotation.x += Math.PI*0.05*delta*10;
    hyperboloid3.rotation.y += Math.PI*0.05*delta*10;
    cone3.rotation.x += Math.PI*0.1*delta*10;
    torus3.rotation.x += Math.PI*0.1*delta*10;
    helix3.rotation.z += Math.PI*0.3*delta*10;
    ripple3.rotation.y += Math.PI*0.1*delta*10;
    ripple3.rotation.x += Math.PI*0.1*delta*10;
    flatcircle3.rotation.x += Math.PI*0.1*delta*10;
    flatcircle3.rotation.y += Math.PI*0.1*delta*10;
    klein3.rotation.y += Math.PI*0.1*delta*10;
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
        rotateAll(delta);
    }

    renderer.render(scene, fixPerspectiveCamera);
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
        if (pressedKeys.has('d')) {
            directionalLight.visible = !directionalLight.visible;
        }
    }
}

init();
animate();