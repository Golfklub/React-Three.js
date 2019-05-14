export const Recenter = (renderer, controls, camera) => {
  function showRecenter(device) {
    button.style.display = "";

    button.style.cursor = "pointer";
    button.style.left = "calc(1%)";
    button.style.width = "100px";

    button.textContent = "RECENTER";

    button.onmouseenter = function() {
      button.style.opacity = "1.0";
    };
    button.onmouseleave = function() {
      button.style.opacity = "0.5";
    };

    button.onclick = async () => {
      //   controls.target.set(0, 1.6, -0.0001);
      //   console.log(controls.target);
      camera.position.set(1.2246467992175396e-20, 1.6, -0.00010000000002024652);

      controls.object.position.set(
        1.2246467992175396e-20,
        1.6,
        -0.00010000000002024652
      );
      // console.log(camera.position);
      controls.object.quaternion.set(
        0.00021319847924755608,
        -0.9997868015207526,
        0.014599761150644397,
        -0.014599761150644399
      );
      controls.object.rotation.set(
        0.029203673205103454,
        3.1123889803846896,
        2.7452862802809213e-1
      );
      console.log(controls.object);
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
