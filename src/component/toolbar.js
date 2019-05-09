import * as THREE from "three";
import { LinearFilter } from "three";

const renderer = new THREE.WebGLRenderer({ antialias: true });

const toolbar = new THREE.BoxBufferGeometry(1, 1, 1);

const image = new THREE.TextureLoader().load(
  "https://i.imgur.com/Jg2v6Z2.png",
  image => {
    image.minFilter = LinearFilter;
    image.anisotropy = renderer.getMaxAnisotropy();
  }
);
const texture = new THREE.MeshBasicMaterial({ map: image });
texture.transparent = true;
export const Toolbar = new THREE.Mesh(toolbar, texture);
Toolbar.scale.set(1.5, 0.224, 0);
Toolbar.position.set(0, -0.985 + 1.6, 1.54);

const exploreImage = new THREE.TextureLoader().load(
  "https://i.imgur.com/J2vlRdc.png",
  exploreImage => {
    exploreImage.minFilter = LinearFilter;
    exploreImage.anisotropy = renderer.getMaxAnisotropy();
  }
);
const exploreTexture = new THREE.MeshBasicMaterial({ map: exploreImage });
exploreTexture.transparent = true;
export const exploreWolrdLogo = new THREE.Mesh(toolbar, exploreTexture);
exploreWolrdLogo.scale.set(0.13, 0.13, 0);
exploreWolrdLogo.position.set(0.5, -0.95, 1.53);

const yarvissImage = new THREE.TextureLoader().load(
  "https://i.imgur.com/0Ff8ZbJ.png",
  yarvissImage => {
    yarvissImage.minFilter = LinearFilter;
    yarvissImage.anisotropy = renderer.getMaxAnisotropy();
  }
);
const yarvissTexture = new THREE.MeshBasicMaterial({ map: yarvissImage });
yarvissTexture.transparent = true;
export const yarvissWolrdLogo = new THREE.Mesh(toolbar, yarvissTexture);
yarvissWolrdLogo.scale.set(0.13, 0.13, 0);
yarvissWolrdLogo.position.set(0, -0.95 + 1.6, 1.53);

const MyImage = new THREE.TextureLoader().load(
  "https://i.imgur.com/7t0t626.png",
  MyImage => {
    MyImage.minFilter = LinearFilter;
    MyImage.anisotropy = renderer.getMaxAnisotropy();
  }
);
const MyTexture = new THREE.MeshBasicMaterial({ map: MyImage });
MyTexture.transparent = true;
export const MyWorldLogo = new THREE.Mesh(toolbar, MyTexture);
MyWorldLogo.scale.set(0.13, 0.13, 0);
MyWorldLogo.position.set(-0.5, -0.95 + 1.6, 1.53);
