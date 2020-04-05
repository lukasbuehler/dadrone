<template>
  <div class="action-buttons md-layout md-alignment-top-center">
    <div class="button-container md-layout-item md-medium-size-25 md-small-size-33">
      <md-button v:on-click="takeoff" class="md-raised md-primary">Takeoff</md-button>
    </div>
    <div class="button-container md-layout-item md-medium-size-25 md-small-size-33">
      <md-button class="md-raised" disabled>Land</md-button>
    </div>
    <div class="button-container md-layout-item md-medium-size-25 md-small-size-33">
      <md-button class="md-raised">Stop</md-button>
    </div>
    <div class="button-container md-layout-item md-medium-size-25 md-small-size-33">
      <md-button class="md-raised md-accent">Kill</md-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ActionButtons",
  components: {},
};
</script>

<style lang="scss">
.action-buttons {
  font-family: PixelOperatorBold;
  font-size: 36pt;
  max-width: 959px; /* the max small view size */
  margin: 0 auto;
}
.action-buttons > div.button-container {
  padding: 5px;
}
.action-buttons > div.button-container > button {
  font-size: 0.5em;
  padding: 50%;
  height: 0px;
  width: 0px;
  margin: 0px;
}
.action-buttons > div.button-container > button > * {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
