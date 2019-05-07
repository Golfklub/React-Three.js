import React from "react";
import * as THREE from "three";
import { NearestFilter, LinearFilter } from "three";

const ee = [
  { x: -0.5, src: "https://i.imgur.com/IzIdIpm.png" },
  { x: -1.26, src: "https://i.imgur.com/EDn1jl4.png" },
  { x: -2.02, src: "https://i.imgur.com/ywT0mld.png" },
  { x: 0.5, src: "https://i.imgur.com/cENEGeL.jpg" },
  { x: 1.26, src: "https://i.imgur.com/GoJnd69.png" },
  { x: 2.02, src: "https://i.imgur.com/fMCofVb.png" }
];
const renderer = new THREE.WebGLRenderer({ antialias: true });

export const Content = ee.map(res => {
  const boxA = new THREE.BoxGeometry(1, 1, 1);

  boxA.scale(0.7, 0.7, 0);

  const vector = new THREE.Vector3(res.x, 0, 2);

  // boxA.lookAt(vector);

  const textureBox = new THREE.TextureLoader().load(res.src, textureBox => {
    textureBox.needsUpdate = true;
    textureBox.minFilter = LinearFilter;
    textureBox.magFilter = LinearFilter;
    // boxs.scale.set(1.0, textureBox.image.height / textureBox.image.width, 1.0);
  });
  // textureBox.generateMipmaps = false;
  textureBox.anisotropy = 16
  const mat = new THREE.MeshBasicMaterial({
    map: textureBox
  });

  mat.transparent = true;
  let boxs = new THREE.Mesh(boxA, mat);
  boxs.position.set(res.x, 0, 1.675);

  return boxs;
});
