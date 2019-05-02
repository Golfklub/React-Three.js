import React, { Component } from "react";
import ReactDOM from "react-dom";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Content } from "./component/showroomcontent";

class App extends Component {
  ee = [
    { x: -1, src: "https://i.imgur.com/IzIdIpm.png" },
    { x: -2, src: "https://i.imgur.com/EDn1jl4.png" },
    { x: 0, src: "https://i.imgur.com/EgEuIHK.png" },
    { x: 1, src: "https://i.imgur.com/GoJnd69.png" },
    { x: 2, src: "https://i.imgur.com/fMCofVb.png" }
  ];

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
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.mount.appendChild(this.renderer.domElement);
  };

  addCustomSceneObjects = () => {
    this.geometry = new THREE.BoxGeometry(4, 4, 0);
    this.material = new THREE.MeshPhongMaterial({
      color: 0x156289,
      emissive: 0x072534,
      side: THREE.DoubleSide,
      flatShading: true
    });
    this.image = new THREE.TextureLoader().load(
      "https://i.imgur.com/fMCofVb.png"
    );
    this.boxtexture = new THREE.MeshBasicMaterial({ map: this.image });
    this.cube = new THREE.Mesh(this.geometry, this.boxtexture);
    // this.cube.material.side = THREE.BackSide;
    this.cube.position.set(0, 0, 5);
    this.cube.visible = true;
    // this.scene.add(this.cube);

    this.ee.map(res => {
      this.boxA = new THREE.BoxGeometry(1, 1, 1);
      this.boxA.scale(0.78, 0.78, 0);
      this.textureBox = new THREE.TextureLoader().load(res.src);
      this.mat = new THREE.MeshBasicMaterial({ map: this.textureBox });
      this.boxs = new THREE.Mesh(this.boxA, this.mat);
      this.boxs.position.set(res.x, 0, 2);
      return this.scene.add(this.boxs);
    });

    this.sphere = new THREE.SphereGeometry(500, 60, 40);
    this.texture = new THREE.TextureLoader().load(
      "https://i.imgur.com/SVMKD5z.jpg"
    );
    this.skytexture = new THREE.MeshBasicMaterial({ map: this.texture });
    this.spheres = new THREE.Mesh(this.sphere, this.skytexture);
    this.spheres.material.side = THREE.BackSide;

    this.scene.add(this.spheres);
    this.scene.background = this.texture;

    this.lights = [];
    this.lights[0] = new THREE.PointLight(0xffffff, 1, 0);
    this.lights[1] = new THREE.PointLight(0xffffff, 1, 0);
    this.lights[2] = new THREE.PointLight(0xffffff, 1, 0);

    this.lights[0].position.set(0, 200, 0);
    this.lights[1].position.set(100, 200, 100);
    this.lights[2].position.set(-100, -200, -100);

    this.scene.add(this.lights[0]);
    this.scene.add(this.lights[1]);
    this.scene.add(this.lights[2]);
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
