import * as THREE from "three";

const width = 100,
  height = 100,
  width_segments = 1,
  height_segments = 100;
const plane = new THREE.PlaneGeometry(
  width,
  height,
  width_segments,
  height_segments
);

for (var i = 0; i < plane.vertices.length / 2; i++) {
  plane.vertices[2 * i].position.z = Math.pow(2, i / 20);
  plane.vertices[2 * i + 1].position.z = Math.pow(2, i / 20);
}

const mesh = new THREE.Mesh(
  plane,
  new THREE.MeshLambertMaterial({ color: 0x888888 })
);
mesh.doubleSided = true;
mesh.rotation.y = Math.PI / 2 - 0.5;

export const curvedplane = mesh;
