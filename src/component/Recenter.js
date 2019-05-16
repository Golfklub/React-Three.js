import * as THREE from "three";
import { showroomsky, sphereAngle } from "./ShowRoomSky";
import { rootContent } from "./RootContent";

export const Recenter = (renderer, controls, type) => {
  function showRecenter(device) {
    button.style.display = "";

    button.style.cursor = "pointer";
    button.style.left = "1%";
    // button.style.width = "100px";

    button.textContent = "RECENTER";

    button.onmouseenter = function() {
      button.style.opacity = "1.0";
    };
    button.onmouseleave = function() {
      button.style.opacity = "0.5";
    };

    button.onclick = function() {
      if (type === "desktop") {
        // controls.object.position.set(0, 0, 0);
        // controls.object.position.x = 0;

        controls.object.position.y = 0;
        // controls.object.position.z = 0;
      } else if (type === "vr") {
        showroomsky.rotation.set(controls.object.rotation.x, 0, 0, "XYZ");
        sphereAngle.rotation.set(0, controls.object.rotation.y, 0, "XYZ");
        // showroomsky.rotateY(controls.object.rotation.y);
        // showroomsky.rotateZ(controls.object.rotation.z);
      }
    };
    renderer.vr.setDevice(device);
  }

  function stylizeElement(element) {
    element.style.position = "absolute";
    element.style.bottom = "20px";
    element.style.padding = "12px 6px";
    element.style.border = "1px solid #fff";
    element.style.borderRadius = "4px";
    element.style.background = "rgba(0,0,0,0.1)";
    element.style.color = "#fff";
    element.style.font = "normal 13px sans-serif";
    element.style.textAlign = "center";
    element.style.opacity = "0.5";
    element.style.outline = "none";
    element.style.zIndex = "999";
  }

  var button = document.createElement("button");
  button.style.display = "none";

  stylizeElement(button);

  showRecenter();

  return button;
};
