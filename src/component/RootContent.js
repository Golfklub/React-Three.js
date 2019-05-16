import * as THREE from "three";

const Geometry = new THREE.SphereBufferGeometry(40, 60, 40);

export const rootContent = new THREE.Mesh(Geometry, THREE.Material);
rootContent.position.set(0, 0, 0);
