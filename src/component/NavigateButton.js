import * as THREE from "three";
import { LinearFilter } from "three";
import { Interaction } from "three.interaction";
import { boxA } from "./showroomcontent";
import { Content } from "./showroomcontent";
import { contentList } from "../resources/productAPI/showroomContent";
import { showroomsky } from "../component/ShowRoomSky";
import { scene } from "./sceneSetting";
var TWEEN = require("@tweenjs/tween.js");

export let contentIndex = 0;

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

 const leftNavigate = new THREE.Mesh(Geometry, rightTexture);
leftNavigate.position.set(-0.1, -0.25, -0.675);

 const rightNavigate = new THREE.Mesh(Geometry, leftTexture);
rightNavigate.position.set(0.1, -0.25, -0.675);

export const rightButton = new THREE.Object3D();
rightButton.add(rightNavigate);

export const leftButton = new THREE.Object3D();
leftButton.add(leftNavigate);

export const NavigateButton = new THREE.Object3D();
NavigateButton.add(rightButton, leftButton);

const time = new THREE.Clock();

rightNavigate.on("mouseover", function(ev) {
  rightNavigate.scale.set(1.15, 1.15, 1);
});

rightNavigate.on("mouseout", function(ev) {
  rightNavigate.scale.set(1, 1, 1);
});

rightNavigate.on("mousedown", function(ev) {
  rightNavigate.scale.set(0.9, 0.9, 0.9);
  if (contentIndex < contentList.length - 1) {
    contentIndex++;
    showroomsky.remove(Content);
    Content(contentIndex).map(res => {
      showroomsky.add(res);
    });
  }
  // Content.map(res => {
  //   var tween = new TWEEN.Tween(res.scale) // Create a new tween that modifies 'coords'.
  //     .to({ x: 0, y: 0, z: 0 }, 1000) // Move to (300, 200) in 1 second.
  //     .easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
  //     .onUpdate(function() {
  //       console.log(res.scale);
  //     })
  //     .start(); // Start the tween immediately.
  // });
});

rightNavigate.on("mouseup", function(ev) {
  rightNavigate.scale.set(1.15, 1.15, 1.15);

  // Content.map(res => {
  //   var tween = new TWEEN.Tween(res.scale) // ใส่ค่าที่ต้องการจะเปลี่ยนในนี้
  //     .to({ x: 1, y: 1, z: 1 }, 1000) // ใส่ค่าที่ต้องการให้เป็นตามด้วยเวลาในหน่อยมิลลิวินาทีเช่น .to({x:1,y:1,z:1},1000) คือการเปลี่ยนค่า x,y,z เป็น 1 ในระยะเวลา 1 วินาที
  //     .easing(TWEEN.Easing.Quadratic.Out) // เลือกรูปแบบอนิเมชั่นที่ต้องการดูได้ใน https://www.createjs.com/demos/tweenjs/tween_sparktable
  //     .onUpdate(function() {
  //       console.log(res.scale);
  //     })
  //     .start(); // Start the tween immediately.
  // });
});

leftNavigate.on("mouseover", function(ev) {
  leftNavigate.scale.set(1.15, 1.15, 1);
});

leftNavigate.on("mouseout", function(ev) {
  leftNavigate.scale.set(1, 1, 1);
});

leftNavigate.on("mousedown", function(ev) {
  leftNavigate.scale.set(0.9, 0.9, 0.9);

  if (contentIndex > 0) {
    contentIndex--;
    showroomsky.remove(Content);
    Content(contentIndex).map(res => {
      showroomsky.add(res);
    });
  }
});

leftNavigate.on("mouseup", function(ev) {
  leftNavigate.scale.set(1.15, 1.15, 1.15);
});
