import * as THREE from "three";
import { LinearFilter, DoubleSide } from "three";

const renderer = new THREE.WebGLRenderer({ antialias: true });

const circle = new THREE.PlaneBufferGeometry(1, 1, 1);
circle.scale(0.192, 0.192, 0);
const image = new THREE.TextureLoader().load(
  "https://i.imgur.com/gIjX5R4.png",
  image => {
    image.minFilter = LinearFilter;
  }
);
image.anisotropy = renderer.capabilities.getMaxAnisotropy();

const texture = new THREE.MeshBasicMaterial({ map: image });
texture.side = DoubleSide;

texture.transparent = true;
const mesh = new THREE.Mesh(circle, texture);
mesh.position.set(0, 1.6, -1.54);

export const circleframe = mesh;

const logos = new THREE.PlaneBufferGeometry(1, 1, 1);
logos.scale(0.162, 0.162, 1);

const logoimage = new THREE.TextureLoader().load(
  "https://i.imgur.com/lQbbCMn.png",
  logoimage => {
    logoimage.minFilter = LinearFilter;
  }
);
logoimage.anisotropy = renderer.capabilities.getMaxAnisotropy();

const logotexture = new THREE.MeshBasicMaterial({ map: logoimage });
logotexture.transparent = true;
const logobox = new THREE.Mesh(logos, logotexture);
logobox.position.set(0, 1.6, -1.53);

export const logo = logobox;
