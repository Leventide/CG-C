import * as THREE from 'three';
import { ParametricGeometry } from 'three/addons/geometries/ParametricGeometry.js';
import { VRButton } from 'three/addons/webxr/VRButton.js';

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
var spotLight1, spotLight2, spotLight3, spotLight4, spotLight5, spotLight6
var spotLight7, spotLight8, spotLight9, spotLight10, spotLight11, spotLight12
var spotLight13, spotLight14, spotLight15, spotLight16, spotLight17, spotLight18
var spotLight19, spotLight20, spotLight21, spotLight22, spotLight23, spotLight24
var spotLights = new Set();

var pointLight1, pointLight2, pointLight3, pointLight4
var pointLight5, pointLight6, pointLight7, pointLight8
var pointLights = new Set();


var buffer = new THREE.BufferGeometry();

var elipsoid1, elipsoid2, elipsoid3
var hyperboloid1, hyperboloid2, hyperboloid3
var cone1, cone2, cone3
var torus1, torus2, torus3
var helix1, helix2, helix3
var ripple1, ripple2, ripple3
var flatcircle1, flatcircle2, flatcircle3
var klein1, klein2, klein3
var mobius

var objects
var clock = new THREE.Clock();
var diffuse_material1, diffuse_material2, diffuse_material3, diffuse_material4, diffuse_material5, diffuse_material6
var phong_material1, phong_material2, phong_material3, phong_material4, phong_material5, phong_material6
var cartoon_material1, cartoon_material2, cartoon_material3, cartoon_material4, cartoon_material5, cartoon_material6
var normal_material
var lightless_material1, lightless_material2, lightless_material3, lightless_material4, lightless_material5, lightless_material6
var current_material
var material_lighting
/////////////////////
/* CREATE SCENE(S) */
/////////////////////
function createScene(){
    'use strict';

    scene = new THREE.Scene();
}

//////////////////////
/* CREATE CAMERA(S) */
//////////////////////
function createCameras(){
    'use strict';

    fixPerspectiveCamera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
    fixPerspectiveCamera.position.set(50, 70, 50);
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

    const ambientLight = new THREE.AmbientLight(0xffa500, 0.1);
    scene.add(ambientLight);
}

////////////////////////
/* CREATE OBJECT3D(S) */
////////////////////////
function createObjects(){
    'use strict';

    createMaterials();

    var extrudesettings = {
        depth: 3,
        bevelEnabled: false
    };
    var main_cylinder_geometry = new THREE.CylinderGeometry(5, 5, 50, 32);
    main_cylinder = new THREE.Mesh(main_cylinder_geometry, diffuse_material1);
    main_cylinder.position.set(15, 30, 15);
    main_cylinder.rotation.set(0, 0, 0);

    var disc1_shape = new THREE.Shape();
    disc1_shape.absarc(0, 0, 12, 0, Math.PI * 2, false);
    var holePath = new THREE.Path();
    holePath.absarc(0, 0, 5, 0, Math.PI * 2, true);
    disc1_shape.holes.push(holePath);
    var disc1_geometry = new THREE.ExtrudeGeometry(disc1_shape, extrudesettings);
    disc1 = new THREE.Mesh(disc1_geometry, diffuse_material2);
    disc1.position.set(0, 10, 0);
    disc1.rotation.set(Math.PI*0.5, 0, 0);

    var disc2_shape = new THREE.Shape();
    disc2_shape.absarc(0, 0, 19, 0, Math.PI * 2, false);
    var holePath = new THREE.Path();
    holePath.absarc(0, 0, 12, 0, Math.PI * 2, true);
    disc2_shape.holes.push(holePath);
    var disc2_geometry = new THREE.ExtrudeGeometry(disc2_shape, extrudesettings);
    disc2 = new THREE.Mesh(disc2_geometry, diffuse_material3);
    disc2.position.set(0, 0, 0);
    disc2.rotation.set(Math.PI*0.5, 0, 0);

    var disc3_shape = new THREE.Shape();
    disc3_shape.absarc(0, 0, 26, 0, Math.PI * 2, false);
    var holePath = new THREE.Path();
    holePath.absarc(0, 0, 19, 0, Math.PI * 2, true);
    disc3_shape.holes.push(holePath);
    var disc3_geometry = new THREE.ExtrudeGeometry(disc3_shape, extrudesettings);
    disc3 = new THREE.Mesh(disc3_geometry, diffuse_material4);
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
    var mobius_geometry = createMobiusGeometry();

    elipsoid1 = new THREE.Mesh(elipsoid_geometry, diffuse_material5);
    elipsoid1.position.y = 8.5
    elipsoid1.position.z = -1.5
    disc1.add(elipsoid1)
    spotLight1 = new THREE.SpotLight(0xffffff, 10);
    spotLight1.position.set(0, 8.5, -1);
    spotLight1.target.position.set(0, -8.5, 0)
    spotLight1.angle = Math.PI*0.5
    spotLights.add(spotLight1)
    disc1.add(spotLight1)

    elipsoid2 = new THREE.Mesh(elipsoid_geometry, diffuse_material5);
    elipsoid2.scale.set(1.2, 1.2, 1.2)
    elipsoid2.position.x = 11
    elipsoid2.position.y = -11
    elipsoid2.position.z = -3
    elipsoid2.rotation.y = Math.PI*0.5
    disc2.add(elipsoid2)
    spotLight2 = new THREE.SpotLight(0xffffff, 10);
    spotLight2.position.set(11, -11, -1);
    spotLight2.target.position.set(0, -8.5, 0)
    spotLight2.angle = Math.PI*0.5
    spotLights.add(spotLight2)
    disc2.add(spotLight2)

    elipsoid3 = new THREE.Mesh(elipsoid_geometry, diffuse_material5);
    elipsoid3.scale.set(1.33, 1.33, 1.33)
    elipsoid3.position.x = -22
    elipsoid3.position.z = -2.5
    elipsoid3.rotation.y = Math.PI*0.25
    disc3.add(elipsoid3)
    spotLight3 = new THREE.SpotLight(0xffffff, 10);
    spotLight3.position.set(-22, 0, -1);
    spotLight3.target.position.set(0, -8.5, 0)
    spotLight3.angle = Math.PI*0.5
    spotLights.add(spotLight3)
    disc3.add(spotLight3)

    hyperboloid1 = new THREE.Mesh(hyperboloid_geometry, diffuse_material5);
    hyperboloid1.scale.set(0.5, 0.5, 0.5)
    hyperboloid1.position.x = 8.5
    hyperboloid1.position.z = -2.75
    disc1.add(hyperboloid1)
    spotLight4 = new THREE.SpotLight(0xffffff, 10);
    spotLight4.position.set(8.5, 0, -1);
    spotLight4.target.position.set(0, -8.5, 0)
    spotLight4.angle = Math.PI*0.5
    spotLights.add(spotLight4)
    disc1.add(spotLight4)

    hyperboloid2 = new THREE.Mesh(hyperboloid_geometry, diffuse_material5);
    hyperboloid2.scale.set(0.55, 0.55, 0.55)
    hyperboloid2.position.y = 15.5
    hyperboloid2.position.z = -2.5
    hyperboloid2.rotation.x = Math.PI*0.5
    hyperboloid2.rotation.y = Math.PI*0.5
    disc2.add(hyperboloid2)
    spotLight5 = new THREE.SpotLight(0xffffff, 10);
    spotLight5.position.set(0, 15.5, -1);
    spotLight5.target.position.set(0, -8.5, 0)
    spotLight5.angle = Math.PI*0.5
    spotLights.add(spotLight5)
    disc2.add(spotLight5)

    hyperboloid3 = new THREE.Mesh(hyperboloid_geometry, diffuse_material5);
    hyperboloid3.scale.set(0.6, 0.6, 0.6)
    hyperboloid3.position.x = 22
    hyperboloid3.position.z = -3.25
    hyperboloid3.rotation.y = Math.PI*0.5
    disc3.add(hyperboloid3)
    spotLight6 = new THREE.SpotLight(0xffffff, 10);
    spotLight6.position.set(22, 0, -1);
    spotLight6.target.position.set(0, -8.5, 0)
    spotLight6.angle = Math.PI*0.5
    spotLights.add(spotLight6)
    disc3.add(spotLight6)

    cone1 = new THREE.Mesh(cone_geometry, diffuse_material5);
    cone1.scale.set(1.25, 1.25, 1.25)
    cone1.position.x = -6
    cone1.position.y = -6
    cone1.position.z = -2
    disc1.add(cone1)
    spotLight7 = new THREE.SpotLight(0xffffff, 10);
    spotLight7.position.set(-6, -6, -1);
    spotLight7.target.position.set(0, -8.5, 0)
    spotLight7.angle = Math.PI*0.5
    spotLights.add(spotLight7)
    disc1.add(spotLight7)

    cone2 = new THREE.Mesh(cone_geometry, diffuse_material5);
    cone2.scale.set(1.4, 1.4, 1.4)
    cone2.position.y = -15
    cone2.position.z = -2.25
    cone2.rotation.y = Math.PI*0.5
    disc2.add(cone2)
    spotLight8 = new THREE.SpotLight(0xffffff, 10);
    spotLight8.position.set(0, -15, -1);
    spotLight8.target.position.set(0, -8.5, 0)
    spotLight8.angle = Math.PI*0.5
    spotLights.add(spotLight8)
    disc2.add(spotLight8)

    cone3 = new THREE.Mesh(cone_geometry, diffuse_material5);
    cone3.scale.set(1.55, 1.55, 1.55)
    cone3.position.x = -15.5
    cone3.position.y = -15.5
    cone3.position.z = -2.5
    cone3.rotation.y = Math.PI*0.75
    disc3.add(cone3)
    spotLight9 = new THREE.SpotLight(0xffffff, 10);
    spotLight9.position.set(-15.5, -15.5, -1);
    spotLight9.target.position.set(0, -8.5, 0)
    spotLight9.angle = Math.PI*0.5
    spotLights.add(spotLight9)
    disc3.add(spotLight9)

    torus1 = new THREE.Mesh(torus_geometry, diffuse_material5);
    torus1.position.x = -8.5
    torus1.position.z = -1.75
    torus1.rotation.y = Math.PI*0.5
    disc1.add(torus1)
    spotLight10 = new THREE.SpotLight(0xffffff, 10);
    spotLight10.position.set(-8.5, 0, -1);
    spotLight10.target.position.set(0, -8.5, 0)
    spotLight10.angle = Math.PI*0.5
    spotLights.add(spotLight10)
    disc1.add(spotLight10)

    torus2 = new THREE.Mesh(torus_geometry, diffuse_material5);
    torus2.scale.set(1.2, 1.2, 1.2)
    torus2.position.x = 15
    torus2.position.z = -2
    disc2.add(torus2)
    spotLight11 = new THREE.SpotLight(0xffffff, 10);
    spotLight11.position.set(15, 0, -1);
    spotLight11.target.position.set(0, -8.5, 0)
    spotLight11.angle = Math.PI*0.5
    spotLights.add(spotLight11)
    disc2.add(spotLight11)

    torus3 = new THREE.Mesh(torus_geometry, diffuse_material5);
    torus3.scale.set(1.33, 1.33, 1.33)
    torus3.position.y = 22
    torus3.position.z = -2
    torus3.rotation.y = Math.PI*0.75
    disc3.add(torus3)
    spotLight12 = new THREE.SpotLight(0xffffff, 10);
    spotLight12.position.set(0, 22, -1);
    spotLight12.target.position.set(0, -8.5, 0)
    spotLight12.angle = Math.PI*0.5
    spotLights.add(spotLight12)
    disc3.add(spotLight12)

    helix1 = new THREE.Mesh(helix_geometry, diffuse_material5);
    helix1.position.x = -1
    helix1.position.y = -8.5
    helix1.position.z = -1.25
    helix1.rotation.y = Math.PI*0.5
    disc1.add(helix1)
    spotLight13 = new THREE.SpotLight(0xffffff, 10);
    spotLight13.position.set(-1, -8.5, -1);
    spotLight13.target.position.set(0, -8.5, 0)
    spotLight13.angle = Math.PI*0.5
    spotLights.add(spotLight13)
    disc1.add(spotLight13)

    helix2 = new THREE.Mesh(helix_geometry, diffuse_material5);
    helix2.scale.set(1.2, 1.2, 1.2)
    helix2.position.x = 10.5
    helix2.position.y = 10.5
    helix2.position.z = -1.3
    helix2.rotation.y = Math.PI*0.75   
    disc2.add(helix2)
    spotLight14 = new THREE.SpotLight(0xffffff, 10);
    spotLight14.position.set(10.5, 10.5, -1);
    spotLight14.target.position.set(0, -8.5, 0)
    spotLight14.angle = Math.PI*0.5
    spotLights.add(spotLight14)
    disc2.add(spotLight14)

    helix3 = new THREE.Mesh(helix_geometry, diffuse_material5);
    helix3.scale.set(1.33, 1.33, 1.33)
    helix3.position.y = -22
    helix3.position.z = -3.5
    disc3.add(helix3)
    spotLight15 = new THREE.SpotLight(0xffffff, 10);
    spotLight15.position.set(0, -22, -1);
    spotLight15.target.position.set(0, -8.5, 0)
    spotLight15.angle = Math.PI*0.5
    spotLights.add(spotLight15)
    disc3.add(spotLight15)

    ripple1 = new THREE.Mesh(ripple_geometry, diffuse_material5);
    ripple1.scale.set(0.9, 0.9, 0.9)
    ripple1.position.x = 6
    ripple1.position.y = -6
    ripple1.position.z = -2.25
    disc1.add(ripple1)
    spotLight16 = new THREE.SpotLight(0xffffff, 10);
    spotLight16.position.set(6, -6, -1);
    spotLight16.target.position.set(0, -8.5, 0)
    spotLight16.angle = Math.PI*0.5
    spotLights.add(spotLight16)
    disc1.add(spotLight16)

    ripple2 = new THREE.Mesh(ripple_geometry, diffuse_material5);
    ripple2.position.x = -11
    ripple2.position.y = 11
    ripple2.position.z = -2.5
    ripple2.rotation.y = Math.PI*0.75   
    disc2.add(ripple2)
    spotLight17 = new THREE.SpotLight(0xffffff, 10);
    spotLight17.position.set(-11, 11, -1);
    spotLight17.target.position.set(0, -8.5, 0)
    spotLight17.angle = Math.PI*0.5
    spotLights.add(spotLight17)
    disc2.add(spotLight17)

    ripple3 = new THREE.Mesh(ripple_geometry, diffuse_material5);
    ripple3.scale.set(1.1, 1.1, 1.1)
    ripple3.position.x = 15.5
    ripple3.position.y = 15.5
    ripple3.position.z = -2.5
    ripple3.rotation.y = Math.PI*0.5
    disc3.add(ripple3)
    spotLight18 = new THREE.SpotLight(0xffffff, 10);
    spotLight18.position.set(15.5, 15.5, -1);
    spotLight18.target.position.set(0, -8.5, 0)
    spotLight18.angle = Math.PI*0.5
    spotLights.add(spotLight18)
    disc3.add(spotLight18)

    flatcircle1 = new THREE.Mesh(flatcircle_geometry, diffuse_material5);
    flatcircle1.position.x = 6
    flatcircle1.position.y = 6
    flatcircle1.position.z = -2.35
    flatcircle1.rotation.y = Math.PI*0.25
    disc1.add(flatcircle1)
    spotLight19 = new THREE.SpotLight(0xffffff, 10);
    spotLight19.position.set(6, 6, -1);
    spotLight19.target.position.set(0, -8.5, 0)
    spotLight19.angle = Math.PI*0.5
    spotLights.add(spotLight19)
    disc1.add(spotLight19)

    flatcircle2 = new THREE.Mesh(flatcircle_geometry, diffuse_material5);
    flatcircle2.scale.set(1.1, 1.1, 1.1)
    flatcircle2.position.x = -11
    flatcircle2.position.y = -11
    flatcircle2.position.z = -2.6
    disc2.add(flatcircle2)
    spotLight20 = new THREE.SpotLight(0xffffff, 10);
    spotLight20.position.set(-11, -11, -1);
    spotLight20.target.position.set(0, -8.5, 0)
    spotLight20.angle = Math.PI*0.5
    spotLights.add(spotLight20)
    disc2.add(spotLight20)

    flatcircle3 = new THREE.Mesh(flatcircle_geometry, diffuse_material5);
    flatcircle3.scale.set(1.2, 1.2, 1.2)
    flatcircle3.position.x = -15.5
    flatcircle3.position.y = 15.5
    flatcircle3.position.z = -3
    flatcircle3.rotation.y = Math.PI*0.5
    disc3.add(flatcircle3)
    spotLight21 = new THREE.SpotLight(0xffffff, 10);
    spotLight21.position.set(-15.5, 15.5, -1);
    spotLight21.target.position.set(0, -8.5, 0)
    spotLight21.angle = Math.PI*0.5
    spotLights.add(spotLight21)
    disc3.add(spotLight21)

    klein1 = new THREE.Mesh(klein_geometry, diffuse_material5);
    klein1.scale.set(0.25, 0.25, 0.25)
    klein1.position.x = -6
    klein1.position.y = 6
    klein1.position.z = -2.5
    disc1.add(klein1)
    spotLight22 = new THREE.SpotLight(0xffffff, 10);
    spotLight22.position.set(-6, 6, -1);
    spotLight22.target.position.set(0, -8.5, 0)
    spotLight22.angle = Math.PI*0.5
    spotLights.add(spotLight22)
    disc1.add(spotLight22)

    klein2 = new THREE.Mesh(klein_geometry, diffuse_material5);
    klein2.scale.set(0.3, 0.3, 0.3)
    klein2.position.x = -15.25
    klein2.position.z = -2.5
    klein2.rotation.y = Math.PI*0.5
    disc2.add(klein2)
    spotLight23 = new THREE.SpotLight(0xffffff, 10);
    spotLight23.position.set(-15.25, 0, -1);
    spotLight23.target.position.set(0, -8.5, 0)
    spotLight23.angle = Math.PI*0.5
    spotLights.add(spotLight23)
    disc2.add(spotLight23)

    klein3 = new THREE.Mesh(klein_geometry, diffuse_material5);
    klein3.scale.set(0.33, 0.33, 0.33)
    klein3.position.x = 15.5
    klein3.position.y = -15.5
    klein3.position.z = -3.75
    klein3.rotation.y = Math.PI
    disc3.add(klein3)
    spotLight24 = new THREE.SpotLight(0xffffff, 10);
    spotLight24.position.set(15.5, -15.5, -1);
    spotLight24.target.position.set(0, -8.5, 0)
    spotLight24.angle = Math.PI*0.5
    spotLights.add(spotLight24)
    disc3.add(spotLight24)

    mobius = new THREE.Mesh(mobius_geometry, diffuse_material6);
    mobius.scale.set(2.5, 2.5, 2.5)
    mobius.position.y = 30
    mobius.rotation.x = Math.PI*0.5
    
    createMobiusLights();

    main_cylinder.add(mobius)
    scene.add(main_cylinder);
}

function createMaterials(){
    diffuse_material1 = new THREE.MeshLambertMaterial({color: 'Gray'});
    diffuse_material2 = new THREE.MeshLambertMaterial({color: 'Yellow'});
    diffuse_material3 = new THREE.MeshLambertMaterial({color: 'Red'});
    diffuse_material4 = new THREE.MeshLambertMaterial({color: 'Blue'});
    diffuse_material5 = new THREE.MeshLambertMaterial({color: 'Purple'});
    diffuse_material6 = new THREE.MeshLambertMaterial({color: 'Lime'});
    diffuse_material1.side = THREE.DoubleSide;
    diffuse_material2.side = THREE.DoubleSide;
    diffuse_material3.side = THREE.DoubleSide;
    diffuse_material4.side = THREE.DoubleSide;
    diffuse_material5.side = THREE.DoubleSide;
    diffuse_material6.side = THREE.DoubleSide;

    phong_material1 = new THREE.MeshPhongMaterial({color: 'Gray'});
    phong_material2 = new THREE.MeshPhongMaterial({color: 'Yellow'});
    phong_material3 = new THREE.MeshPhongMaterial({color: 'Red'});
    phong_material4 = new THREE.MeshPhongMaterial({color: 'Blue'});
    phong_material5 = new THREE.MeshPhongMaterial({color: 'Purple'});
    phong_material6 = new THREE.MeshPhongMaterial({color: 'Lime'});
    phong_material1.side = THREE.DoubleSide;
    phong_material2.side = THREE.DoubleSide;
    phong_material3.side = THREE.DoubleSide;
    phong_material4.side = THREE.DoubleSide;
    phong_material5.side = THREE.DoubleSide;
    phong_material6.side = THREE.DoubleSide;

    cartoon_material1 = new THREE.MeshToonMaterial({color: 'Gray'});
    cartoon_material2 = new THREE.MeshToonMaterial({color: 'Yellow'});
    cartoon_material3 = new THREE.MeshToonMaterial({color: 'Red'});
    cartoon_material4 = new THREE.MeshToonMaterial({color: 'Blue'});
    cartoon_material5 = new THREE.MeshToonMaterial({color: 'Purple'});
    cartoon_material6 = new THREE.MeshToonMaterial({color: 'Lime'});
    cartoon_material1.side = THREE.DoubleSide;
    cartoon_material2.side = THREE.DoubleSide;
    cartoon_material3.side = THREE.DoubleSide;
    cartoon_material4.side = THREE.DoubleSide;
    cartoon_material5.side = THREE.DoubleSide;
    cartoon_material6.side = THREE.DoubleSide;

    normal_material = new THREE.MeshNormalMaterial();
    normal_material.side = THREE.DoubleSide;

    lightless_material1 = new THREE.MeshBasicMaterial({color: 'Gray'});
    lightless_material2 = new THREE.MeshBasicMaterial({color: 'Yellow'});
    lightless_material3 = new THREE.MeshBasicMaterial({color: 'Red'});
    lightless_material4 = new THREE.MeshBasicMaterial({color: 'Blue'});
    lightless_material5 = new THREE.MeshBasicMaterial({color: 'Purple'});
    lightless_material6 = new THREE.MeshBasicMaterial({color: 'Lime'});
    lightless_material1.side = THREE.DoubleSide;
    lightless_material2.side = THREE.DoubleSide;
    lightless_material3.side = THREE.DoubleSide;
    lightless_material4.side = THREE.DoubleSide;
    lightless_material5.side = THREE.DoubleSide;
    lightless_material6.side = THREE.DoubleSide;

}

function createMobiusGeometry() {
    var indices = [];
    var vertices = [];
    var p0 = new THREE.Vector3()
    var stacks = 8;
    var slices = 8;
    var sliceCount = slices + 1;

    for (var i = 0; i <= stacks; i++) {
        var v = i / stacks;

        for (var j = 0; j <= slices; j++) {

            var u = j / slices;

            mobius3dParam(u, v, p0);
            vertices.push(p0.x, p0.y, p0.z);
        }
    }

    for (var i = 0; i < stacks; i++) {
        for (var j = 0; j < slices; j++) {

            var a = i * sliceCount + j;
            var b = i * sliceCount + j + 1;
            var c = (i + 1) * sliceCount + j + 1;
            var d = (i + 1) * sliceCount + j;

            indices.push(a, b, d);
            indices.push(b, c, d);
        }
    }
    buffer.setIndex(indices);
    buffer.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    return buffer;
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

function mobius3dParam (u, t, target) {
    u *= Math.PI;
    t *= 2 * Math.PI;
    u = u * 2;
    const phi = u / 2;

    var x = 0.125 * Math.cos(t) * Math.cos(phi) - 0.65 * Math.sin(t) * Math.sin(phi);
    var z = 0.125 * Math.cos(t) * Math.sin(phi) + 0.65 * Math.sin(t) * Math.cos(phi);
    var y = (2.25 + x) * Math.sin(u);
    x = (2.25 + x) * Math.cos(u);

    target.set(x, y, z);
}

function createMobiusLights() {
    pointLight1 = new THREE.PointLight(0xffffff, 10);
    pointLight1.position.z = 0.5
    pointLight1.position.y = 3
    pointLights.add(pointLight1)
    mobius.add(pointLight1)
    
    pointLight2 = new THREE.PointLight(0xffffff, 10);
    pointLight2.position.z = 0.5
    pointLight2.position.y = -3
    pointLights.add(pointLight2)
    mobius.add(pointLight2)

    pointLight3 = new THREE.PointLight(0xffffff, 10);
    pointLight3.position.z = 0.5
    pointLight3.position.x = 3
    pointLights.add(pointLight3)
    mobius.add(pointLight3)

    pointLight4 = new THREE.PointLight(0xffffff, 10);
    pointLight4.position.z = 0.5
    pointLight4.position.x = -3
    pointLights.add(pointLight4)
    mobius.add(pointLight4)

    pointLight5 = new THREE.PointLight(0xffffff, 10);
    pointLight5.position.z = 0.5
    pointLight5.position.x = 2
    pointLight5.position.y = 2
    pointLights.add(pointLight5)
    mobius.add(pointLight5)

    pointLight6 = new THREE.PointLight(0xffffff, 10);
    pointLight6.position.z = 0.5
    pointLight6.position.x = -2
    pointLight6.position.y = 2
    pointLights.add(pointLight6)
    mobius.add(pointLight6)

    pointLight7 = new THREE.PointLight(0xffffff, 10);
    pointLight7.position.z = 0.5
    pointLight7.position.x = 2
    pointLight7.position.y = -2
    pointLights.add(pointLight7)
    mobius.add(pointLight7)

    pointLight8 = new THREE.PointLight(0xffffff, 10);
    pointLight8.position.z = 0.5
    pointLight8.position.x = -2
    pointLight8.position.y = -2
    pointLights.add(pointLight8)
    mobius.add(pointLight8)
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

/////////////
/* SKYDOME */
/////////////
function createSkydome(){
    var radius = 86;
    var widthSegments = 60; 
    var heightSegments = 20; 
    var phiStart = 0; 
    var phiLength = 6.32; 
    var thetaStart = 0;
    var thetaLength = 1.6;//ajustar o tamanho da meia esfera
    //var geometry = new THREE.SphereGeometry(1000/2,60,20);
    var geometry = new THREE.SphereGeometry( radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength);
    var texture = new THREE.TextureLoader().load('poema.png');
    var material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.BackSide });
    var skydome = new THREE.Mesh(geometry, material);
    scene.add(skydome);
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
/////////////////////
/* MATERIAL CHANGE */
/////////////////////
function changeMaterials(type){
    'use strict';

    if (type == "diffuse") {
        if (material_lighting) {
            main_cylinder.material = diffuse_material1;
            disc1.material = diffuse_material2;
            disc2.material = diffuse_material3;
            disc3.material = diffuse_material4;
            for (var j = 0; j < objects.length; j++) {
                objects[j].material = diffuse_material5;
            }
            mobius.material = diffuse_material6;
        }
        current_material = "diffuse";
    } else if (type == "phong") {
        if (material_lighting) {
            main_cylinder.material = phong_material1;
            disc1.material = phong_material2;
            disc2.material = phong_material3;
            disc3.material = phong_material4;
            for (var j = 0; j < objects.length; j++) {
                objects[j].material = phong_material5;
            }
            mobius.material = phong_material6;
        }
        current_material = "phong";
    } else if (type == "toon") {
        if (material_lighting) {
            main_cylinder.material = cartoon_material1;
            disc1.material = cartoon_material2;
            disc2.material = cartoon_material3;
            disc3.material = cartoon_material4;
            for (var j = 0; j < objects.length; j++) {
                objects[j].material = cartoon_material5;
            }
            mobius.material = cartoon_material6;
        }
        current_material = "toon";
    } else if (type == "normal") {
        if (material_lighting) {
            main_cylinder.material = normal_material;
            disc1.material = normal_material;
            disc2.material = normal_material;
            disc3.material = normal_material;
            for (var j = 0; j < objects.length; j++) {
                objects[j].material = normal_material;
            }
            mobius.material = normal_material;
        }
        current_material = "normal";
    }

}

function changeMaterialLighting() {
    if(material_lighting){
        main_cylinder.material = lightless_material1;
        disc1.material = lightless_material2;
        disc2.material = lightless_material3;
        disc3.material = lightless_material4;
        for (var j = 0; j < objects.length; j++) {
            objects[j].material = lightless_material5;
        }
        mobius.material = lightless_material6;
        material_lighting = !material_lighting;
    } else {
        material_lighting = !material_lighting;
        changeMaterials(current_material);
    }
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
    createObjects();
    createLights();
    createSkydome();
    render()
    active1 = true;
    active2 = true;
    active3 = true;
    up1 = 0;
    up2 = 0;
    up3 = 0;
    press = true;
    current_material = "diffuse";
    material_lighting = true;
    objects = [elipsoid1, elipsoid2, elipsoid3, hyperboloid1,
        hyperboloid2, hyperboloid3, cone1, cone2, cone3, torus1, 
        torus2, torus3, helix1, helix2, helix3, ripple1, ripple2,
        ripple3, flatcircle1, flatcircle2, flatcircle3, klein1, klein2, klein3]

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
        if (pressedKeys.has('p')) {
            pointLights.forEach(pointlight => {
                pointlight.visible = !pointlight.visible;
            });
        }
        if (pressedKeys.has('s')) {
            spotLights.forEach(spotlight => {
                spotlight.visible = !spotlight.visible;
            });
        }
        if (pressedKeys.has('q')) {
            changeMaterials("diffuse");
        }
        if (pressedKeys.has('w')) {
            changeMaterials("phong");
        }
        if (pressedKeys.has('e')) {
            changeMaterials("toon");
        }
        if (pressedKeys.has('r')) {
            changeMaterials("normal");
        }
        if (pressedKeys.has('t')) {
            changeMaterialLighting();
        }
    }
}

init();
animate();