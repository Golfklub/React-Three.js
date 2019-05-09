import * as THREE from "three";
import { LinearFilter } from "three";

const renderer = new THREE.WebGLRenderer({ antialias: true });

const Geometry = new THREE.PlaneBufferGeometry(1, 1, 1);
Geometry.scale(0.08, 0.08, 0);
const rightImage = new THREE.TextureLoader().load(
  "https://i.imgur.com/IteMGV0.png",
  rightImage => {
    rightImage.minFilter = LinearFilter;
    rightImage.anisotropy = renderer.getMaxAnisotropy();
  }
);
const leftImage = new THREE.TextureLoader().load(
  "https://i.imgur.com/RCSuY4o.png",
  leftImage => {
    leftImage.minFilter = LinearFilter;
    leftImage.anisotropy = renderer.getMaxAnisotropy();
  }
);

const rightTexture = new THREE.MeshBasicMaterial({ map: rightImage });
rightTexture.transparent = true;
rightTexture.side = THREE.DoubleSide;

const leftTexture = new THREE.MeshBasicMaterial({ map: leftImage });
leftTexture.transparent = true;
leftTexture.side = THREE.DoubleSide;

export const rightNavigate = new THREE.Mesh(Geometry, rightTexture);
rightNavigate.position.set(-0.1, -0.25+1.6, 0.675);

export const leftNavigate = new THREE.Mesh(Geometry, leftTexture);
leftNavigate.position.set(0.1, -0.25+1.6, 0.675);
