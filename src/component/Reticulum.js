import { Reticulum } from "../resources/reticulum";
import { camera } from "./sceneSetting/index";

Reticulum.init(camera, {
  proximity: false,
  clickevents: true,
  near: null, //near factor of the raycaster (shouldn't be negative and should be smaller than the far property)
  far: null, //far factor of the raycaster (shouldn't be negative and should be larger than the near property)
  reticle: {
    visible: true,
    restPoint: 1000, //Defines the reticle's resting point when no object has been targeted
    color: 0xcc0000,
    innerRadius: 0.0001,
    outerRadius: 0.003,
    hover: {
      color: 0xcc0000,
      innerRadius: 0.02,
      outerRadius: 0.024,
      speed: 5,
      vibrate: 50 //Set to 0 or [] to disable
    }
  },
  fuse: {
    visible: true,
    duration: 2.5,
    color: 0x00fff6,
    innerRadius: 0.045,
    outerRadius: 0.06,
    vibrate: 100, //Set to 0 or [] to disable
    clickCancelFuse: false //If users clicks on targeted object fuse is canceled
  }
});
