import * as THREE from "three";

const renderer = new THREE.WebGLRenderer({ antialias: true });

const sphere = new THREE.SphereGeometry(40, 60, 40);
const texture = new THREE.TextureLoader().load(
  "https://i.imgur.com/SVMKD5z.jpg"
);
texture.anisotropy = renderer.capabilities.getMaxAnisotropy();

const skytexture = new THREE.MeshBasicMaterial({ map: texture });
const spheres = new THREE.Mesh(sphere, skytexture);
spheres.material.side = THREE.DoubleSide;
spheres.position.set(0, 0, 0);
// spheres.rotation.set(0, 0, 0, "XYZ");
// spheres.rotate(1);

export const showroomsky = spheres;

const a = new THREE.SphereBufferGeometry(1, 60, 40);
const b = new THREE.TextureLoader().load("https://i.imgur.com/SVMKD5z.jpg");
const c = new THREE.MeshBasicMaterial({ map: b });
const d = new THREE.Mesh(a, c);
d.material.side = THREE.DoubleSide;
d.position.set(0, 1.6, -2);
var axis = new THREE.Vector3(1, 1, 0);
// d.rotateOnAxis(axis, 1);
var s = new THREE.Euler(THREE.Math.degToRad(1), 0, 0, "XYZ");
d.setRotationFromEuler(s);
export const e = d;
