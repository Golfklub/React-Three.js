import React from "react";
import * as THREE from "three";

const sphere = new THREE.SphereGeometry(500, 60, 40);
const texture = new THREE.TextureLoader().load(
  "https://i.imgur.com/SVMKD5z.jpg"
);
const skytexture = new THREE.MeshBasicMaterial({ map: texture });
const spheres = new THREE.Mesh(sphere, skytexture);
spheres.material.side = THREE.BackSide;

export const showroomsky = spheres;
