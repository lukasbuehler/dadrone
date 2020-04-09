<template>
  <div id="app">
    <md-app>
      <md-app-toolbar>
        <span class="md-title hacked">DA_DRONE</span>
      </md-app-toolbar>
      <md-app-content>
        <drone-output :drone="drone"></drone-output>
        <action-buttons :drone="drone"></action-buttons>
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
import DroneOutput from "./components/DroneOutput";
import ActionButtons from "./components/ActionButtons";

import axios from "axios";

export default {
  name: "App",
  components: {
    DroneOutput,
    ActionButtons,
  },
  data() {
    return {
      drone: {
        isOnline: true,
        battery: 0,
        isInTheAir: false,
        isMoving: false,
      },
      batteryIntervall: null,
    };
  },
  methods: {
    getBattery: function() {
      axios
        .get("/drone/battery")
        .then((response) => {
          this.drone.battery = response.data;
        })
        .catch(() => {
          //console.error(reason);
        });
    },
  },
  mounted() {
    this.getBattery();
    this.batteryIntervall = setInterval(() => {
      this.getBattery();
    }, 10000);
  },
};
</script>

<style lang="scss">
@font-face {
  font-family: Hacked;
  src: url("/fonts/HACKED.ttf");
}

@font-face {
  font-family: PixelOperatorBold;
  src: url("/fonts/PixelOperatorMono-Bold.ttf");
}

.hacked {
  font-family: Hacked !important;
}
.pixelop {
  font-family: PixelOperatorBold !important;
}

#app main {
  min-height: 100vh;
}
</style>
