import React, { Component } from "react";
import * as THREE from "three";
import OrbitControls from "three-orbitcontrols";
import { Content, contentBox } from "./component/showroomcontent";
import WebVRPolyfill from "webvr-polyfill";
import {
  showroomsky,
  sphereAngle,
  sphereInside
} from "./component/ShowRoomSky";
import { circleframe, logo } from "./component/Showroomlogo";
import { config } from "./component/configWebVR";
import {
  contentIndex,
  NavigateButton,
  rightButton,
  leftButton
} from "./component/NavigateButton";
import { Toolbar } from "./component/toolbar";
import { WEBVR } from "./resources/controls/WebVR";
import { DeviceOrientationControls } from "./resources/controls/DeviceOrientationControls";
import { Interaction } from "three.interaction";
import { Recenter } from "./component/Recenter";
import { scene, camera, raycaster } from "./component/sceneSetting";
import { loadingCursor, crosshair } from "./component/crosshair";
import { contentList } from "./resources/productAPI/showroomContent";
var TWEEN = require("@tweenjs/tween.js");

class App extends Component {
  polyfill = new WebVRPolyfill(config);
  scene = new THREE.Scene();
  state = { controls: "", device: "" };
  INTERSECTEDRIGHT;
  INTERSECTEDLEFT;
  contentIndex = 0;

  componentDidMount() {
    this.checkScreenOrientation();
    this.sceneSetup();
    this.addCustomSceneObjects();
    window.addEventListener("resize", this.handleWindowResize);
  }

  componentDidUpdate() {
    // this.checkDevice();
    document.body.appendChild(
      Recenter(this.renderer, this.state.controls, this.state.device)
    );
    document.body.appendChild(
      WEBVR.createButton(this.renderer, this.state.controls)
    );
  }

  checkScreenOrientation = () => {
    if (window.innerHeight > window.innerWidth) {
      scene.add();
    }
  };

  sceneSetup = async () => {
    this.scene = scene;
    this.camera = camera;
    this.raycaster = raycaster;
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.domElement.style.display = "block";
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.mount.appendChild(this.renderer.domElement);

    this.interaction = new Interaction(this.renderer, this.scene, this.camera);
    this.checkDevice();
    this.renderer.setAnimationLoop(() => {
      this.renderer.render(this.scene, this.camera);
    });
  };

  checkDevice = () => {
    navigator.getVRDisplays().then(VRDisplay => {
      if (VRDisplay.length) {
        let vrDisplay = VRDisplay[0];
        let controls = new DeviceOrientationControls(this.camera);
        this.renderer.vr.enabled = true;
        this.setState({ controls: controls, device: "vr" });
        vrDisplay.requestAnimationFrame(this.animate);
        this.startAnimationLoop();
        var userAgent = navigator.userAgent || navigator.vendor || window.opera;
        if (/android/i.test(userAgent)) {
          if (window.innerHeight > window.innerWidth) {
            sphereInside.rotation.set(0, 1.57, 0, "XYZ");
          } else {
            sphereInside.rotation.set(0, controls.object.rotation.y, 0, "XYZ");
          }
        } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
          sphereInside.rotation.set(0, controls.object.rotation.y, 0, "XYZ");
        }
      } else {
        let controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.setState({ controls: controls, device: "desktop" });
        controls.enableZoom = false;
        controls.target.set(0, 1.6, -0.0001);
        requestAnimationFrame(this.animate);
        this.startAnimationLoop();
      }
    });
  };

  addCustomSceneObjects = () => {
    // camera.add(crosshair);
    this.scene.add(camera);
    this.scene.add(sphereAngle.add(showroomsky, sphereInside));
    sphereInside.add(circleframe, Toolbar, logo, NavigateButton, contentBox);
    sphereAngle.position.set(0, 1.6, 0);

    Content(contentIndex).map(res => contentBox.add(res));
  };

  animate = time => {
    raycaster.setFromCamera({ x: 0, y: 0 }, this.camera);
    let intersectsRight = raycaster.intersectObjects(rightButton.children);
    if (intersectsRight.length > 0) {
      if (this.INTERSECTEDRIGHT != intersectsRight[0].object) {
        if (this.INTERSECTEDRIGHT)
          this.INTERSECTEDRIGHT = intersectsRight[0].object;
        this.INTERSECTEDRIGHT = intersectsRight[0].object;
        this.objX = intersectsRight[0].object.scale.x;
        this.objY = intersectsRight[0].object.scale.y;
        this.objZ = intersectsRight[0].object.scale.z;
        intersectsRight[0].object.scale.set(1.2, 1.2, 1.2);
        if (this.contentIndex < contentList.length - 1) {
          var right = new TWEEN.Tween(loadingCursor.scale)
            .to({ x: 20, y: 20, z: 1 }, 1500)
            .easing(TWEEN.Easing.Quadratic.Out)
            .start();
          this.longClick = setTimeout(() => {
            for (let index = 0; index < contentBox.children.length; ) {
              contentBox.remove(contentBox.children[0]);
            }
            this.contentIndex++;
            Content(this.contentIndex).map(res => contentBox.add(res));
          }, 1500);
        }
      }
    } else {
      if (this.INTERSECTEDRIGHT) {
        clearTimeout(this.longClick);
        TWEEN.removeAll();
        loadingCursor.scale.set(1, 1, 1);
        this.INTERSECTEDRIGHT.scale.set(this.objX, this.objY, this.objZ);
        this.INTERSECTEDRIGHT = undefined;
      }
    }

    let intersectsLeft = raycaster.intersectObjects(leftButton.children);
    if (intersectsLeft.length > 0) {
      if (this.INTERSECTEDLEFT != intersectsLeft[0].object) {
        if (this.INTERSECTEDLEFT)
          this.INTERSECTEDLEFT = intersectsLeft[0].object;
        this.INTERSECTEDLEFT = intersectsLeft[0].object;
        this.objX = intersectsLeft[0].object.scale.x;
        this.objY = intersectsLeft[0].object.scale.y;
        this.objZ = intersectsLeft[0].object.scale.z;
        intersectsLeft[0].object.scale.set(1.2, 1.2, 1.2);
        if (
          this.contentIndex < contentList.length + 1 &&
          this.contentIndex > 0
        ) {
          const tween = new TWEEN.Tween(loadingCursor.scale)
            .to({ x: 20, y: 20, z: 1 }, 1500)
            .easing(TWEEN.Easing.Quadratic.Out)
            .start();
          this.longClick = setTimeout(() => {
            for (let index = 0; index < contentBox.children.length; ) {
              contentBox.remove(contentBox.children[0]);
            }
            this.contentIndex--;
            Content(this.contentIndex).map(res => contentBox.add(res));
          }, 1500);
        }
      }
    } else {
      if (this.INTERSECTEDLEFT) {
        clearTimeout(this.longClick);
        TWEEN.removeAll();
        loadingCursor.scale.set(1, 1, 1);
        this.INTERSECTEDLEFT.scale.set(this.objX, this.objY, this.objZ);
        this.INTERSECTEDLEFT = undefined;
      }
    }

    this.frameId = requestAnimationFrame(this.animate);
    this.renderer.render(this.scene, this.camera);
    this.state.controls.update();
    TWEEN.update(time); //ใส่ update เพื่อให้ tween animation แสดงผล
    window.addEventListener("resize", this.handleWindowResize);
  };

  startAnimationLoop = () => !this.frameId && this.animate();

  handleWindowResize = () => {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.render(this.scene, this.camera);
  };

  render() {
    const css = { color: "red", display: "block", position: "absolute" };
    return (
      <div ref={ref => (this.mount = ref)}>
        <div style={{ ...css, top: "0px" }}>{this.state.rotationx}</div>
        <div style={{ ...css, top: "15px" }}>{this.state.rotationy}</div>
        <div style={{ ...css, top: "30px" }}>{this.state.rotationz}</div>
        <div style={{ ...css, top: "45px" }}>{this.state.skyX}</div>
        <div style={{ ...css, top: "60px" }}>{this.state.skyy}</div>
        <div style={{ ...css, top: "75px" }}>{this.state.skyz}</div>
      </div>
    );
  }
}

export default App;
