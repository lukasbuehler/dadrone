<template>
  <div class="md-layout md-alignment-top-center">
    <div class="md-layout-item" style="text-align: center;">
      <div style="max-width: 1280px; margin: 0 auto;">
        <!--<img id="drone-output-img" class="drone-img front-camera" v-bind:src="drone.img" />-->
        <video id="drone-video" ref="video" controls v-bind:src="drone.videoSrc"></video>
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
  data() {
    return {
      drone: {
        img: "img/720p_black.png",
        isOnline: false,
        battery: 0,
        videoSrc: "",
      },
    };
  },
  methods: {
    initCameraStream: function() {
      var codecString = "";
      /**
       *  Set to whatever codec you are using
       */

      // codecString = 'video/mp4; codecs="avc1.42C028"';
      codecString = 'video/webm; codecs="vp8"';
      // codecString = 'video/webm; codecs="vp9"';

      var mediaSource = new MediaSource();
      this.drone.mediaSource = window.URL.createObjectURL(mediaSource);

      var buffer = null;
      var queue = [];

      const _updateBuffer = () => {
        if (queue.length > 0 && !buffer.updating) {
          buffer.appendBuffer(queue.shift());
        }
      };

      const _sourceBufferHandle = () => {
        buffer = mediaSource.addSourceBuffer(codecString);
        buffer.mode = "sequence";

        buffer.addEventListener("update", function() {
          // Note: Have tried 'updateend'
          console.log("update");
          _updateBuffer();
        });

        buffer.addEventListener("updateend", function() {
          console.log("updateend");
          _updateBuffer();
        });

        _initWebSocket();
      };

      mediaSource.addEventListener("sourceopen", _sourceBufferHandle);

      const _initWebSocket = () => {
        var ws = new WebSocket("ws://" + window.location.hostname + ":" + window.location.port, "echo-protocol");
        ws.binaryType = "arraybuffer";

        ws.onopen = function() {
          console.info("WebSocket connection initialized");
        };

        ws.onmessage = function(event) {
          console.info("Recived WS message.", event);

          if (typeof event.data === "object") {
            if (buffer.updating || queue.length > 0) {
              queue.push(event.data);
            } else {
              buffer.appendBuffer(event.data);
              this.$refs.video[0].play();
            }
          }
        };
      };
    },
  },
  created() {
    console.log("Created");
    this.initCameraStream();
  },
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
