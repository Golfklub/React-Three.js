import React, { Component } from "react";
import ReactDOM from "react-dom";
import * as THREE from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import OrbitControls from "three-orbitcontrols";
import VRControls from "three-vrcontrols-module";
// import { VRControls } from "./resources/controls/VRControls";
import { Content } from "./component/showroomcontent";
import WebVRPolyfill from "webvr-polyfill";
import { showroomsky } from "./component/ShowRoomSky";
import { circleframe, logo } from "./component/Showroomlogo";
import { config } from "./component/configWebVR";
import { leftNavigate, rightNavigate } from "./component/NavigateButton";
import { Toolbar } from "./component/toolbar";
import { WEBVR } from "./resources/controls/WebVR";
import { DeviceOrientationControls } from "./resources/controls/DeviceOrientationControls";
class App extends Component {
  polyfill = new WebVRPolyfill(config);
  scene = new THREE.Scene();

  componentDidMount() {
    this.sceneSetup();
    this.addCustomSceneObjects();
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

    this.camera.position.z = -0.0001;
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);

    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.mount.appendChild(this.renderer.domElement);
    document.body.appendChild(WEBVR.createButton(this.renderer));

    navigator.getVRDisplays().then(VRDisplay => {
      if (VRDisplay.length) {
        let vrDisplay = VRDisplay[0];
        this.renderer.vr.enabled = true;
        let controls = new DeviceOrientationControls(this.camera);
        this.setState({ controls: controls });
        vrDisplay.requestAnimationFrame(this.animate);
        this.startAnimationLoop();
        console.log("VR!");
        this.camera.position.set(0, 0, -0.0001);
        this.renderer.vr.enabled = true;
      } else {
        console.log("DeskTop!");
        let controls = new OrbitControls(this.camera);
        this.setState({ controls: controls });
        controls.enableZoom = false;
        // controls.target.set(0, 0, -0.0001);
        requestAnimationFrame(this.animate);
        this.startAnimationLoop();
      }
    });
    this.renderer.setAnimationLoop(() => {
      this.renderer.render(this.scene, this.camera);
    });
  };

  addCustomSceneObjects = () => {
    //Add content
    Content.map(res => this.scene.add(res));
    // this.scene.add(this.camera);
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
    this.state.controls.update();
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
