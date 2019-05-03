import React from "react";
import * as THREE from "three";

const ee = [
  { x: -1, src: "https://i.imgur.com/IzIdIpm.png" },
  { x: -2, src: "https://i.imgur.com/EDn1jl4.png" },
  { x: -3, src: "https://i.imgur.com/ywT0mld.png" },
  { x: 1, src: "https://i.imgur.com/EgEuIHK.png" },
  { x: 2, src: "https://i.imgur.com/GoJnd69.png" },
  { x: 3, src: "https://i.imgur.com/fMCofVb.png" }
];

export const Content = ee.map(res => {
  const boxA = new THREE.BoxGeometry(1, 1, 1);
  boxA.scale(0.78, 0.78, 0);
  const textureBox = new THREE.TextureLoader().load(res.src);
  const mat = new THREE.MeshBasicMaterial({ map: textureBox });
  let boxs = new THREE.Mesh(boxA, mat);
  boxs.position.set(res.x, 0, 2);

  return boxs;
});
