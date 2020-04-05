<template>
  <div class="md-layout md-alignment-top-center">
    <div class="md-layout-item" style="text-align: center;">
      <div style="max-width: 1280px; margin: 0 auto;">
        <img id="drone-output-img" class="drone-img front-camera" v-bind:src="drone_img" />
        <p id="status-text" style="text-align: left;" class="md-subheading pixelop">
          >> Drone:
          <span style="color: red;">Offline</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
// Vue Material Components
//import {  } from "vue-material/dist/components";

//Vue.use();

export default {
  name: "DroneOutput",
  components: {},
  data() {
    return {
      drone_img: "img/720p_black.png"
    };
  }
};
</script>

<style lang="scss">
#drone-output-img {
  max-width: 1280px;
  max-height: 720px;
  width: 100%;
  background-color: black;
}
</style>
