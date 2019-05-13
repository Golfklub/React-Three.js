import React, { Component } from "react";
import * as THREE from "three";
import OrbitControls from "three-orbitcontrols";
import { Content } from "./component/showroomcontent";
import WebVRPolyfill from "webvr-polyfill";
import { showroomsky } from "./component/ShowRoomSky";
import { circleframe, logo } from "./component/Showroomlogo";
import { config } from "./component/configWebVR";
import { leftNavigate, rightNavigate } from "./component/NavigateButton";
import { Toolbar } from "./component/toolbar";
import { WEBVR } from "./resources/controls/WebVR";
import { DeviceOrientationControls } from "./resources/controls/DeviceOrientationControls";
import { Interaction } from "three.interaction";
var TWEEN = require("@tweenjs/tween.js");
// import { Easing, Tween, autoPlay } from "es6-tween";

class App extends Component {
  polyfill = new WebVRPolyfill(config);
  scene = new THREE.Scene();

  componentDidMount() {
    this.sceneSetup();
    this.addCustomSceneObjects();
    window.addEventListener("resize", this.handleWindowResize);
    this.mesh.position.set(0, 1.6, 0.914);
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

    // this.controls = new OrbitControls(this.camera);
    // this.controls.target.set(0, 1.6, -0.0001);
    this.camera.position.y = 1.6;
    this.camera.position.z = -0.0001;
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.domElement.style.display = "block";
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.mount.appendChild(this.renderer.domElement);
    document.body.appendChild(WEBVR.createButton(this.renderer));
    this.interaction = new Interaction(this.renderer, this.scene, this.camera);
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
        // this.camera.position.set(0, 1.6, -0.0001);
        controls.target.set(0, 1.6, -0.0001);
        requestAnimationFrame(this.animate);
        this.startAnimationLoop();
      }
    });
    this.renderer.setAnimationLoop(() => {
      this.renderer.render(this.scene, this.camera);
    });
  };

  geometry = new THREE.BoxGeometry(1, 1, 1);
  material = new THREE.MeshBasicMaterial({
    color: 0xffcc00,
    wireframe: true
  });

  mesh = new THREE.Mesh(this.geometry, this.material);

  addCustomSceneObjects = () => {
    this.scene.add(this.mesh);
    this.scene.add(showroomsky);
    // this.scene.add(this.box);
  };

  componentDidUpdate() {
    console.log(this.mesh.scale);
    var tween = new TWEEN.Tween(this.mesh.scale) // Create a new tween that modifies 'coords'.
      .to({ x: 1, y: 2, z: 3 }, 1000) // Move to (300, 200) in 1 second.
      .easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
      .onUpdate(function() {})
      .start(); // Start the tween immediately.
  }

  animate = time => {
    this.frameId = requestAnimationFrame(this.animate);
    this.renderer.render(this.scene, this.camera);
    this.state.controls.update();
    TWEEN.update(time);
  };

  onTick = () => {
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
