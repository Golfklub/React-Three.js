import * as THREE from "three";
import { rotationY } from "./../RotationY";

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
spheres.rotation.set(0, 0, 0);

export const showroomsky = spheres;
