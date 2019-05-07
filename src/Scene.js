import React, { Component } from "react";
import ReactDOM from "react-dom";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Content } from "./component/showroomcontent";
import WebVRPolyfill from "webvr-polyfill";
import { showroomsky } from "./component/ShowRoomSky";
import { circleframe, logo } from "./component/Showroomlogo";
import { config } from "./component/configWebVR";
class App extends Component {
  componentDidMount() {
    const polyfill = new WebVRPolyfill(config);
    this.sceneSetup();
    this.addCustomSceneObjects();
    this.startAnimationLoop();
    window.addEventListener("resize", this.handleWindowResize);
  }

  componentDidUpdate() {}

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleWindowResize);
    this.stopAnimationLoop();
    this.removeCustomSceneObjects();
    this.sceneDestroy();
  }

  sceneSetup = () => {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.x = 0;
    this.camera.position.z = -0.001;
    this.detectVrDevice();
    // this.controls = new OrbitControls(this.camera);
    this.controls.enableZoom = false;
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    console.log(this.renderer.max);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.mount.appendChild(this.renderer.domElement);
  };

  detectVrDevice = () => {
    navigator.getVRDisplays().then(function(vrDisplays) {
      if (vrDisplays.length) {
        this.vrDisplay = vrDisplays[0];
        this.controls = new THREE.VRControls(this.camera);
        this.controls.enableZoom = false;

        this.vrDisplay.requestAnimationFrame(this.animate);
      } else {
        this.controls = new THREE.OrbitControls(this.camera);
        this.controls.enableZoom = false;
        this.controls.target.set(0, 0, -0.000000000000000000001);
        requestAnimationFrame(this.animate);
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
    //Add sky
    this.scene.add(showroomsky);
  };

  animate = () => {
    this.frameId = requestAnimationFrame(this.animate);
    this.renderer.render(this.scene, this.camera);
  };

  startAnimationLoop = () => !this.frameId && this.animate();

  stopAnimationLoop = () => {
    cancelAnimationFrame(this.frameId);
    this.frameId = null;
  };

  removeCustomSceneObjects = () => {
    while (this.scene.children.length > 0) {
      this.scene.remove(this.scene.children[0]);
    }
  };

  sceneDestroy = () => {
    // this.mount.removeChild(this.renderer.domElement);
  };

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
