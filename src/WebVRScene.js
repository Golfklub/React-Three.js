import React, { Component } from "react";
import ReactDOM from "react-dom";
import * as THREE from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import OrbitControls from "three-orbitcontrols";
// import VRControls from "three-vrcontrols-module";
import { VRControls } from "./resources/controls/VRControls";
import { Content } from "./component/showroomcontent";
import WebVRPolyfill from "webvr-polyfill";
import { showroomsky } from "./component/ShowRoomSky";
import { circleframe, logo } from "./component/Showroomlogo";
import { config } from "./component/configWebVR";
import { leftNavigate, rightNavigate } from "./component/NavigateButton";
import {
  Toolbar,
  exploreWolrdLogo,
  yarvissWolrdLogo,
  MyWorldLogo
} from "./component/toolbar";
class App extends Component {
  polyfill = new WebVRPolyfill(config);

  componentDidMount() {
    this.sceneSetup();
    this.addCustomSceneObjects();
    this.startAnimationLoop();
    window.addEventListener("resize", this.handleWindowResize);
  }

  sceneSetup = async () => {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      80,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.raycaster = new THREE.Raycaster();
    this.raycaster.setFromCamera({ x: 0, y: 0 }, this.camera);
    this.camera.position.x = 0;
    this.camera.position.z = -0.001;
    this.controls = new OrbitControls(this.camera);
    this.controls.enableZoom = false;
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio = 1;
    console.log(this.renderer.setPixelRatio);
    // await this.detectVrDevice(this.camera, this.renderer, this.animate);
    // console.log(this.renderer.max);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.mount.appendChild(this.renderer.domElement);
  };

  detectVrDevice = (camera, renderer, animate) => {
    navigator.getVRDisplays().then(function(vrDisplays) {
      if (vrDisplays.length) {
        let vrDisplay = vrDisplays[0];
        renderer.vr.enable = true;
        let controls = new VRControls(camera);
        controls.enableZoom = false;
        vrDisplay.requestAnimationFrame(animate);
        console.log("VR!");
      } else {
        console.log("DeskTop!");
        let controls = new OrbitControls(camera);
        // controls.enableZoom = false;
        controls.target.set(0, 0, -0.0001);
        requestAnimationFrame(animate);
      }
    });
  };

  addCustomSceneObjects = () => {
    //Add content
    Content.map(res => this.scene.add(res));
    //Add logo button
    this.scene.add(logo);
    //Add circle showroom button // this.scene.add(curvedplane); //Add curved plane
    this.scene.add(circleframe);
    //Add navigate button
    this.scene.add(leftNavigate, rightNavigate);
    //Add Toolsbar
    this.scene.add(Toolbar);
    //Add sky
    this.scene.add(showroomsky);
  };

  animate = () => {
    this.frameId = requestAnimationFrame(this.animate);
    this.renderer.render(this.scene, this.camera);
  };

  startAnimationLoop = () => !this.frameId && this.animate();

  handleWindowResize = () => {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.render(this.scene, this.camera);
  };

  render() {
    return <div ref={ref => (this.mount = ref)} />;
  }
}

export default App;
