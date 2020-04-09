<template>
  <div class="md-layout md-alignment-top-center">
    <div class="md-layout-item" style="text-align: center;">
      <div class="droneStreamParent">
        <div id="droneStream"></div>
        <p id="status-text" style="text-align: left;" class="md-subheading pixelop">
          >> Drone:
          <span>
            <span v-if="!drone.isOnline" style="color: red;">Offline</span>
            <span v-if="drone.isOnline" style="color: lime;">Online</span>
          </span>
          <span v-if="drone.isOnline" style="float: right;"
            >Battery: <span style="color: lime">{{ drone.battery }}%</span></span
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "DroneOutput",
  components: {},
  props: ["drone"],
  data() {
    return {
      control: {
        forward: 0,
        backward: 0,
        left: 0,
        right: 0,
        up: 0,
        down: 0,
        rotL: 0,
        rotR: 0,
      },
      lastControl: {
        forward: 0,
        backward: 0,
        left: 0,
        right: 0,
        up: 0,
        down: 0,
        rotL: 0,
        rotR: 0,
      },
      controlSettings: {
        keyboardSpeed: 0.5,
      },
    };
  },
  methods: {
    _setupKeyboardControls: function() {
      document.addEventListener("keydown", (event) => {
        const key = event.key;

        const speed = this.controlSettings.keyboardSpeed;

        this._setControls(key, speed);
      });

      document.addEventListener("keyup", (event) => {
        const key = event.key;

        this._setControls(key, 0);
      });
    },
    _setControls: function(key, speed) {
      if (key.toLowerCase() === "w" || key === "ArrowUp") {
        this.control.forward = speed;
      } else if (key.toLowerCase() === "a" || key === "ArrowLeft") {
        this.control.left = speed;
      } else if (key.toLowerCase() === "d" || key === "ArrowRight") {
        this.control.right = speed;
      } else if (key.toLowerCase() === "s" || key === "ArrowDown") {
        this.control.backward = speed;
      } else if (key.toLowerCase() === "q") {
        this.control.rotL = speed;
      } else if (key.toLowerCase() === "e") {
        this.control.rotR = speed;
      } else if (key === "Shift") {
        this.control.up = speed;
      } else if (key === "Control") {
        this.control.down = speed;
      }
      if (JSON.stringify(this.control) !== JSON.stringify(this.lastControl)) {
        this.sendControlsToBackend(this.control);
        Object.assign(this.lastControl, this.control);
      }
    },
    sendControlsToBackend: function(ctrls) {
      axios
        .put("/drone/move", ctrls)
        .then(() => {
          console.log("Successful movement");
        })
        .catch((reason) => {
          console.error(reason);
        });
    },
  },
  mounted() {
    // runs on page load
    this._setupKeyboardControls();

    // eslint-disable-next-line
    new NodecopterStream(document.getElementById("droneStream"));
  },
};
</script>

<style lang="scss">
#drone-output-img,
#drone-video,
#droneStream {
  background-color: #0005;
  max-width: 640px;
  max-height: 360px;
  width: 100%;
  margin: 0 auto;
}

.droneStreamParent {
  max-width: 640px;
  margin: 0 auto;
}
</style>
