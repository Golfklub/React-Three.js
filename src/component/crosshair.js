import * as THREE from "three";

export const crosshair = new THREE.Mesh(
  new THREE.RingBufferGeometry(0.002, 0.003, 32),
  new THREE.MeshBasicMaterial({
    color: 0xffffff,
    opacity: 0.5,
    transparent: true
  })
);

crosshair.position.z = -0.1;
crosshair.position.x = 0.03;
// crosshair.position.y = 1.6;

export const loadingCursor = new THREE.Mesh(
  new THREE.CircleBufferGeometry(0.0001, 32),
  new THREE.MeshBasicMaterial({
    color: 0xaf442,
    opacity: 0.5,
    transparent: true
  })
);



crosshair.add(loadingCursor);
