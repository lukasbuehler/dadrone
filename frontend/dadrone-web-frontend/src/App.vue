<template>
  <div id="app">
    <md-app>
      <md-app-toolbar>
        <span class="md-title hacked">DA_DRONE</span>
      </md-app-toolbar>
      <md-app-content>
        <drone-output></drone-output>
        <action-buttons></action-buttons>
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
import DroneOutput from "./components/DroneOutput";
import ActionButtons from "./components/ActionButtons";

export default {
  name: "App",
  components: {
    DroneOutput,
    ActionButtons,
  },
};
</script>

<style lang="scss">
@font-face {
  font-family: Hacked;
  src: url(https://hackedfont.com/HACKED.ttf);
}

@font-face {
  font-family: PixelOperatorBold;
  src: url(https://watchdogsfont.com/font/PixelOperatorMono-Bold.ttf);
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
