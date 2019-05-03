import * as THREE from "three";

const renderer = new THREE.WebGLRenderer({ antialias: true });

const circle = new THREE.BoxGeometry(1, 1, 1);
circle.scale(0.196, 0.196, 0);
const image = new THREE.TextureLoader().load("https://i.imgur.com/gIjX5R4.png");
image.anisotropy = renderer.getMaxAnisotropy();

const texture = new THREE.MeshBasicMaterial({ map: image });

texture.transparent = true;
const mesh = new THREE.Mesh(circle, texture);
mesh.position.set(0, 0, 1.675);

export const circleframe = mesh;

const logos = new THREE.BoxGeometry(1, 1, 1);
logos.scale(0.162, 0.162, 0);

const logoimage = new THREE.TextureLoader().load(
  "https://i.imgur.com/lQbbCMn.png"
);
// logoimage.magFilter = THREE.LinearFilter;
// logoimage.wrapS = THREE.RepeatWrapping;
// logoimage.wrapT = THREE.RepeatWrapping;

const logotexture = new THREE.MeshBasicMaterial({ map: logoimage });
logotexture.transparent = true;
const logobox = new THREE.Mesh(logos, logotexture);
logobox.position.set(0, 0, 1.674);

export const logo = logobox;
