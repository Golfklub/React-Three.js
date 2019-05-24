import * as THREE from "three";
import { LinearFilter } from "three";
import { Interaction } from "three.interaction";
import { boxA, contentBox } from "./showroomcontent";
import { Content } from "./showroomcontent";
import { contentList } from "../resources/productAPI/showroomContent";
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

const userAgent = navigator.userAgent || navigator.vendor || window.opera;

rightNavigate.on("touchout", function(ev) {
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
  } else {
    rightNavigate.scale.set(1, 1, 1);
  }
});

rightNavigate.on("touchstart", function(ev) {
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
  } else {
    rightNavigate.scale.set(0.9, 0.9, 0.9);
    if (contentIndex < contentList.length - 1) {
      for (let index = 0; index < contentBox.children.length; ) {
        contentBox.remove(contentBox.children[0]);
      }
      contentIndex++;
      contentBox.remove(Content);
      Content(contentIndex).map(res => {
        contentBox.add(res);
      });
    }
  }
});

rightNavigate.on("touchend", function(ev) {
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
  } else {
    rightNavigate.scale.set(1.15, 1.15, 1.15);
  }
});

leftNavigate.on("touchout", function(ev) {
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
  } else {
    leftNavigate.scale.set(1, 1, 1);
  }
});

leftNavigate.on("touchstart", function(ev) {
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
  } else {
    leftNavigate.scale.set(0.9, 0.9, 0.9);

    if (contentIndex > 0) {
      for (let index = 0; index < contentBox.children.length; ) {
        contentBox.remove(contentBox.children[0]);
      }
      contentIndex--;
      Content(contentIndex).map(res => {
        contentBox.add(res);
      });
    }
  }
});

leftNavigate.on("touchend", function(ev) {
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
  } else {
    leftNavigate.scale.set(1.15, 1.15, 1.15);
  }
});

rightNavigate.on("mouseover", function(ev) {
  rightNavigate.scale.set(1.15, 1.15, 1);
});

rightNavigate.on("mouseout", function(ev) {
  rightNavigate.scale.set(1, 1, 1);
});

rightNavigate.on("mousedown", function(ev) {
  rightNavigate.scale.set(0.9, 0.9, 0.9);
  if (contentIndex < contentList.length - 1) {
    for (let index = 0; index < contentBox.children.length; ) {
      contentBox.remove(contentBox.children[0]);
    }
    contentIndex++;
    contentBox.remove(Content);
    Content(contentIndex).map(res => {
      contentBox.add(res);
    });
  }
});

rightNavigate.on("mouseup", function(ev) {
  rightNavigate.scale.set(1.15, 1.15, 1.15);
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
    for (let index = 0; index < contentBox.children.length; ) {
      contentBox.remove(contentBox.children[0]);
    }
    contentIndex--;
    Content(contentIndex).map(res => {
      contentBox.add(res);
    });
  }
});

leftNavigate.on("mouseup", function(ev) {
  leftNavigate.scale.set(1.15, 1.15, 1.15);
});
