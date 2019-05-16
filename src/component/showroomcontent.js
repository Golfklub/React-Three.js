import * as THREE from "three";
import { LinearFilter } from "three";
import { contentList } from "../resources/productAPI/showroomContent";
import { contentIndex } from "./NavigateButton";

export const boxA = new THREE.PlaneBufferGeometry(1, 1, 1);
boxA.scale(0.7, 0.7, 1);
export const Content = index => {
  return contentList[index].map(res => {
    const textureBox = new THREE.TextureLoader().load(res.src, textureBox => {
      textureBox.needsUpdate = true;
      textureBox.minFilter = LinearFilter;
    });
    textureBox.anisotropy = 16;
    const mat = new THREE.MeshBasicMaterial({
      map: textureBox
    });
    mat.side = THREE.DoubleSide;
    mat.transparent = true;
    let boxs = new THREE.Mesh(boxA, mat);
    boxs.position.set(res.x, 1.6, res.z);
    boxs.rotation.set(0, THREE.Math.degToRad(res.rotation), 0);
    return boxs;
  });
};
