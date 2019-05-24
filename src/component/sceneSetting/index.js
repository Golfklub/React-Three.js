import * as THREE from "three";
import { crosshair } from "../crosshair";

export const scene = new THREE.Scene();

export const camera = new THREE.PerspectiveCamera(
  80,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 1.6, 0.0001);

export const raycaster = new THREE.Raycaster();
raycaster.setFromCamera({ x: 0, y: 0 }, camera);
// raycaster.set(crosshair,camera)
