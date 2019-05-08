import * as THREE from "three";
import { LinearFilter } from "three";

const renderer = new THREE.WebGLRenderer({ antialias: true });

const left = new THREE.BoxBufferGeometry(1, 1, 1);
left.scale(0.08, 0.08, 0);
const leftImage = new THREE.TextureLoader().load(
  "https://i.imgur.com/IteMGV0.png",
  leftImage => {
    leftImage.minFilter = LinearFilter;
    leftImage.anisotropy = renderer.getMaxAnisotropy();
  }
);

const leftTexture = new THREE.MeshBasicMaterial({ map: leftImage });
leftTexture.transparent = true;
export const leftNavigate = new THREE.Mesh(left, leftTexture);
leftNavigate.position.set(0.1, -0.25, 0.675);

const right = new THREE.BoxBufferGeometry(1, 1, 1);
right.scale(0.08, 0.08, 0);
const rightImage = new THREE.TextureLoader().load(
  "https://i.imgur.com/RCSuY4o.png",
  rightImage => {
    rightImage.minFilter = LinearFilter;
    rightImage.anisotropy = renderer.getMaxAnisotropy();
  }
);
const rightTexture = new THREE.MeshBasicMaterial({ map: rightImage });
rightTexture.transparent = true;
export const rightNavigate = new THREE.Mesh(right, rightTexture);
rightNavigate.position.set(-0.1, -0.25  , 0.675);
