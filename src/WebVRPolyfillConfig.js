import * as THREE from "three";

navigator.getVRDisplays().then(displays => {
  // If we have a native VRDisplay, or if the polyfill
  // provided us with a CardboardVRDisplay, use it
  if (displays.length) {
    vrDisplay = displays[0];
    controls = new THREE.VRControls(camera);
    vrDisplay.requestAnimationFrame(animate);
  } else {
    // If we don't have a VRDisplay, we're probably on
    // a desktop environment, so set up desktop-oriented controls
    controls = new THREE.OrbitControls(camera);
    requestAnimationFrame(animate);
  }
});
