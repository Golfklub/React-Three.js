import * as THREE from "three";
import { LinearFilter, DoubleSide } from "three";

const renderer = new THREE.WebGLRenderer({ antialias: true });

const toolbar = new THREE.PlaneBufferGeometry(1, 1, 1);

const image = new THREE.TextureLoader().load(
  "https://i.imgur.com/Jg2v6Z2.png",
  image => {
    image.minFilter = LinearFilter;
    image.anisotropy = renderer.capabilities.getMaxAnisotropy();
  }
);
const texture = new THREE.MeshBasicMaterial({ map: image });
texture.side = DoubleSide;
texture.transparent = true;
export const Toolbar = new THREE.Mesh(toolbar, texture);
Toolbar.scale.set(1.5, 0.224, 1);
Toolbar.position.set(0, -0.985 + 1.6, 1.54);
Toolbar.rotation.set(0, 84.825, 0);
