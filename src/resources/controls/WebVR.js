/* eslint-disable no-restricted-globals */
/**
 * @author mrdoob / http://mrdoob.com
 * @author Mugen87 / https://github.com/Mugen87
 *
 * Based on @tojiro's vr-samples-utils.js
 */

import { sphereInside, sphereAngle } from "../../component/ShowRoomSky";
import { camera } from "../../component/sceneSetting";
import { crosshair, loadingCursor } from "../../component/crosshair";

export const WEBVR = {
  createButton: function(renderer, controls, options) {
    if (options && options.frameOfReferenceType) {
      renderer.vr.setFrameOfReferenceType(options.frameOfReferenceType);
    }

    function showEnterVR(device) {
      button.style.display = "";

      button.style.cursor = "pointer";
      button.style.right = "1%";
      // button.style.width = "100px";

      button.textContent = "ENTER VR";

      button.onmouseenter = function() {
        button.style.opacity = "1.0";
      };
      button.onmouseleave = function() {
        button.style.opacity = "0.5";
      };

      button.onclick = function() {
        loadingCursor.scale.set(1, 1, 1);
        var userAgent = navigator.userAgent || navigator.vendor || window.opera;
        if (/android/i.test(userAgent)) {
          if (screen.orientation.type === "portrait-primary") {
            sphereInside.rotation.set(
              0,
              controls.object.rotation.y + 1.57,
              0,
              "XYZ"
            );
            sphereAngle.rotation.set(0, 0, 0, "XYZ");
          } else {
            sphereInside.rotation.set(
              0,
              controls.object.rotation.y + 1.57,
              0,
              "XYZ"
            );
            sphereAngle.rotation.set(0, 0, 0, "XYZ");
          }
        } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
          sphereInside.rotation.set(
            0,
            controls.object.rotation.y + 1.57,
            0,
            "XYZ"
          );
          sphereAngle.rotation.set(0, 0, 0, "XYZ");
        }

        device.isPresenting
          ? device.exitPresent()
          : device.requestPresent([{ source: renderer.domElement }]);
      };

      renderer.vr.setDevice(device);
    }

    function showEnterXR(device) {
      var currentSession = null;

      function onSessionStarted(session) {
        session.addEventListener("end", onSessionEnded);

        renderer.vr.setSession(session);
        button.textContent = "EXIT VR";

        currentSession = session;
      }

      function onSessionEnded(event) {
        currentSession.removeEventListener("end", onSessionEnded);

        renderer.vr.setSession(null);
        button.textContent = "ENTER VR";

        currentSession = null;
      }

      //

      button.style.display = "";

      button.style.cursor = "pointer";
      button.style.right = "1";
      button.style.bottom = "1%";

      // button.style.width = "5wh";

      button.textContent = "ENTER VR";

      button.onmouseenter = function() {
        button.style.opacity = "1.0";
      };
      button.onmouseleave = function() {
        button.style.opacity = "0.5";
      };

      button.onclick = function() {
        if (currentSession === null) {
          device
            .requestSession({
              immersive: true,
              exclusive: true /* DEPRECATED */
            })
            .then(onSessionStarted);
        } else {
          currentSession.end();
        }
      };

      renderer.vr.setDevice(device);
    }

    function showVRNotFound() {
      button.style.display = "";

      button.style.cursor = "auto";
      button.style.right = "1%";
      button.style.bottom = "1%";
      // button.style.width = "10%";
      button.textContent = "VR NOT FOUND";
      button.onmouseenter = null;
      button.onmouseleave = null;

      button.onclick = null;

      renderer.vr.setDevice(null);
    }

    function stylizeElement(element) {
      element.style.position = "absolute";
      element.style.bottom = "1%";
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

    if ("xr" in navigator) {
      var button = document.createElement("button");
      button.style.display = "none";

      stylizeElement(button);

      navigator.xr
        .requestDevice()
        .then(function(device) {
          device
            .supportsSession({
              immersive: true,
              exclusive: true /* DEPRECATED */
            })
            .then(function() {
              showEnterXR(device);
            })
            .catch(showVRNotFound);
        })
        .catch(showVRNotFound);

      return button;
    } else if ("getVRDisplays" in navigator) {
      var button = document.createElement("button");
      button.style.display = "none";

      stylizeElement(button);

      window.addEventListener(
        "vrdisplayconnect",
        function(event) {
          showEnterVR(event.display);
        },
        false
      );

      window.addEventListener(
        "vrdisplaydisconnect",
        function(event) {
          showVRNotFound();
        },
        false
      );

      window.addEventListener(
        "vrdisplaypresentchange",
        function(event) {
          var userAgent =
            navigator.userAgent || navigator.vendor || window.opera;
          if (event.detail.display.isPresenting === true) {
            camera.add(crosshair);
          } else {
            sphereInside.rotation.set(
              controls.object.rotation.x + 1.57,
              0,
              0,
              "XYZ"
            );
            sphereAngle.rotation.set(
              0,
              controls.object.rotation.y + 1.57,
              0,
              "XYZ"
            );
            camera.remove(camera.children[0]);
          }
        },
        false
      );

      window.addEventListener(
        "vrdisplayactivate",
        function(event) {
          event.display.requestPresent([{ source: renderer.domElement }]);
        },
        false
      );

      navigator
        .getVRDisplays()
        .then(function(displays) {
          if (displays.length > 0) {
            showEnterVR(displays[0]);
          } else {
            showVRNotFound();
          }
        })
        .catch(showVRNotFound);

      return button;
    } else {
      var message = document.createElement("a");
      message.href = "https://webvr.info";
      message.innerHTML = "WEBVR NOT SUPPORTED";

      message.style.right = "1%";
      // message.style.width = "180px";
      message.style.textDecoration = "none";

      stylizeElement(message);

      return message;
    }
  },

  // DEPRECATED

  checkAvailability: function() {
    console.warn("WEBVR.checkAvailability has been deprecated.");
    return new Promise(function() {});
  },

  getMessageContainer: function() {
    console.warn("WEBVR.getMessageContainer has been deprecated.");
    return document.createElement("div");
  },

  getButton: function() {
    console.warn("WEBVR.getButton has been deprecated.");
    return document.createElement("div");
  },

  getVRDisplay: function() {
    console.warn("WEBVR.getVRDisplay has been deprecated.");
  }
};
