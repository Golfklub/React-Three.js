import * as THREE from "three";

const circle = new THREE.BoxGeometry(1, 1, 1);
circle.scale(0.2, 0.2, 0);
const image = new THREE.TextureLoader().load("https://i.imgur.com/gIjX5R4.png");
const texture = new THREE.MeshBasicMaterial({ map: image });
texture.transparent = true;
const mesh = new THREE.Mesh(circle, texture);
mesh.position.set(0, 0, 2);

export const circleframe = mesh;
