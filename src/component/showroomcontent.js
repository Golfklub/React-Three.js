import React from "react";
import * as THREE from "three";
import { NearestFilter, LinearFilter } from "three";

const ee = [
  { x: -0.5, src: "https://i.imgur.com/IzIdIpm.png", z: 1.474, rotation: -85 },
  { x: -1.162, src: "https://i.imgur.com/EDn1jl4.png", z: 1.074, rotation: 15 },
  { x: -1.536, src: "https://i.imgur.com/ywT0mld.png", z: 0.414, rotation: -105 },
  { x: 1.536, src: "https://i.imgur.com/DQA2Y72.png", z: 0.414, rotation: 105 },
  { x: 1.168, src: "https://i.imgur.com/GoJnd69.png", z: 1.109, rotation: -15 },
  { x: 0.5, src: "https://i.imgur.com/fMCofVb.png", z: 1.474, rotation: 85 }
]; //แก้ไขlayout ปรับค่า z แล้วหมุนแกนเอา
// const renderer = new THREE.WebGLRenderer({ antialias: true });

export const Content = ee.map(res => {
  const boxA = new THREE.PlaneBufferGeometry(1, 1, 1);

  boxA.scale(0.7, 0.7, 1);

  const textureBox = new THREE.TextureLoader().load(res.src, textureBox => {
    textureBox.needsUpdate = true;
    textureBox.minFilter = LinearFilter;
    // textureBox.magFilter = LinearFilter;
  });
  textureBox.anisotropy = 16;
  const mat = new THREE.MeshBasicMaterial({
    map: textureBox
  });
  mat.side = THREE.DoubleSide;
  mat.transparent = true;
  let boxs = new THREE.Mesh(boxA, mat);
  boxs.position.set(res.x, 0, res.z);
  boxs.rotateY(res.rotation);

  return boxs;
});
