<template>
  <div>
    <div class="action-buttons md-layout md-alignment-top-center">
      <div class="button-container md-layout-item md-medium-size-25 md-small-size-33">
        <md-button v-on:click="takeoff" class="md-raised md-primary" :disabled="drone.isInTheAir">Takeoff</md-button>
      </div>
      <div class="button-container md-layout-item md-medium-size-25 md-small-size-33">
        <md-button v-on:click="land" class="md-raised" :disabled="!drone.isInTheAir">Land</md-button>
      </div>
      <div class="button-container md-layout-item md-medium-size-25 md-small-size-33 md-small-hide">
        <md-button v-on:click="stop" class="md-raised" :disabled="!(drone.isInTheAir && drone.isMoving)"
          >Stop</md-button
        >
      </div>
      <div class="button-container md-layout-item md-medium-size-25 md-small-size-33">
        <md-button v-on:click="askKill" class="md-raised md-accent">Kill</md-button>
      </div>
    </div>
    <div>
      <md-dialog :md-active.sync="askKillDialogActive">
        <md-dialog-title>Confirm kill</md-dialog-title>
        <md-dialog-content>
          Do you really want to kill the drone? If it is in the air it will fall out of the sky.
        </md-dialog-content>
        <md-dialog-actions>
          <md-button class="md-default" @click="askKillDialogActive = false">
            Cancel
          </md-button>
          <md-button class="md-accent" @click="onKillConfirm">
            KILL
          </md-button>
        </md-dialog-actions>
      </md-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: "ActionButtons",
  components: {},
  methods: {
    takeoff: function() {
      console.log("Takeoff");
      this.drone.isInTheAir = true;
    },
    land: function() {
      console.log("Land");
      this.drone.isInTheAir = false;
    },
    stop: function() {
      console.log("Stop");
    },
    askKill: function() {
      this.askKillDialogActive = true;
    },
    onKillConfirm() {
      this.askKillDialogActive = false;
      console.log("Kill");
      this.drone.isInTheAir = false;
      this.drone.isMoving = false;
    },
  },
  data() {
    return {
      drone: {
        isInTheAir: false,
        isMoving: false,
      },
      askKillDialogActive: false,
    };
  },
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
