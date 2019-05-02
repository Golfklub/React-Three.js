import React from "react";
import * as THREE from "three";

export const Content = () => {
  const scene = new THREE.Scene();
  const geometry = new THREE.BoxGeometry(4, 4, 0);
  const material = new THREE.MeshPhongMaterial({
    color: 0x156289,
    emissive: 0x072534,
    side: THREE.DoubleSide,
    flatShading: true
  });
  const image = new THREE.TextureLoader().load(
    "https://i.imgur.com/fMCofVb.png"
  );
  const boxtexture = new THREE.MeshBasicMaterial({ map: image });
  const cube = new THREE.Mesh(geometry, boxtexture);
  // this.cube.material.side = THREE.BackSide;
  cube.position.set(0, 0, 5);

  return cube;
};
