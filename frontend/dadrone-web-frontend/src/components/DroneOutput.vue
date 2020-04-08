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
export default {
  name: "DroneOutput",
  components: {},
  props: ["drone"],
  data() {
    return {};
  },
  methods: {},
  mounted() {
    // runs on page load

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
