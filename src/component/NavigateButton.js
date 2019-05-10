import * as THREE from "three";
import { LinearFilter } from "three";
import { Interaction } from "three.interaction";

const renderer = new THREE.WebGLRenderer({ antialias: true });

const Geometry = new THREE.PlaneBufferGeometry(1, 1, 1);
Geometry.scale(0.08, 0.08, 0);
const rightImage = new THREE.TextureLoader().load(
  "https://i.imgur.com/IteMGV0.png",
  rightImage => {
    rightImage.minFilter = LinearFilter;
    rightImage.anisotropy = renderer.capabilities.getMaxAnisotropy();
  }
);
const leftImage = new THREE.TextureLoader().load(
  "https://i.imgur.com/RCSuY4o.png",
  leftImage => {
    leftImage.minFilter = LinearFilter;
    leftImage.anisotropy = renderer.capabilities.getMaxAnisotropy();
  }
);

const rightTexture = new THREE.MeshBasicMaterial({ map: rightImage });
rightTexture.transparent = true;
rightTexture.side = THREE.DoubleSide;

const leftTexture = new THREE.MeshBasicMaterial({ map: leftImage });
leftTexture.transparent = true;
leftTexture.side = THREE.DoubleSide;

export const rightNavigate = new THREE.Mesh(Geometry, rightTexture);
rightNavigate.position.set(-0.1, -0.25 + 1.6, 0.675);

export const leftNavigate = new THREE.Mesh(Geometry, leftTexture);
leftNavigate.position.set(0.1, -0.25 + 1.6, 0.675);

leftNavigate.on("mouseover", function(ev) {
  leftNavigate.scale.set(1.15, 1.15, 1);
});

leftNavigate.on("mouseout", function(ev) {
  leftNavigate.scale.set(1, 1, 1);
});

leftNavigate.on("mousedown", function(ev) {
  leftNavigate.scale.set(0.9, 0.9, 0.9);
});

leftNavigate.on("mouseup", function(ev) {
  leftNavigate.scale.set(1.15, 1.15, 1.15);
});

rightNavigate.on("mouseover", function(ev) {
  rightNavigate.scale.set(1.15, 1.15, 1);
});

rightNavigate.on("mouseout", function(ev) {
  rightNavigate.scale.set(1, 1, 1);
});

rightNavigate.on("mousedown", function(ev) {
  rightNavigate.scale.set(0.9, 0.9, 0.9);
});

rightNavigate.on("mouseup", function(ev) {
  rightNavigate.scale.set(1.15, 1.15, 1.15);
});