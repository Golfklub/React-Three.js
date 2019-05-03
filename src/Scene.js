import React, { Component } from "react";
import ReactDOM from "react-dom";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Content } from "./component/showroomcontent";
import WebVRPolyfill from "webvr-polyfill";
import { showroomsky } from "./component/ShowRoomSky";

class App extends Component {
  componentDidMount() {
    this.sceneSetup();
    this.addCustomSceneObjects();
    this.startAnimationLoop();
    window.addEventListener("resize", this.handleWindowResize);
  }

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
    this.controls = new OrbitControls(this.camera);
    this.controls.enableZoom = false;
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.mount.appendChild(this.renderer.domElement);
  };

  addCustomSceneObjects = () => {
    // this.sphere = new THREE.SphereGeometry(500, 60, 40);
    // this.texture = new THREE.TextureLoader().load(
    //   "https://i.imgur.com/SVMKD5z.jpg"
    // );
    // this.skytexture = new THREE.MeshBasicMaterial({ map: this.texture });
    // this.spheres = new THREE.Mesh(this.sphere, this.skytexture);
    // this.spheres.material.side = THREE.BackSide;

    //Loop for add multi object to scene
    Content.map(res => this.scene.add(res));
    console.log(showroomsky);
    this.scene.add(showroomsky);
    // this.scene.background = this.texture;
  };

  animate = () => {
    this.frameId = requestAnimationFrame(this.animate);

    // this.cube.rotation.x += 0.001;
    // this.cube.rotation.y += 0.001;

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
    // this.geometry.dispose();
    // this.material.dispose();
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
