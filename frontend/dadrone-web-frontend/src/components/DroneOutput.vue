<template>
  <div class="md-layout md-alignment-top-center">
    <div class="md-layout-item" style="text-align: center;">
      <div style="max-width: 1280px; margin: 0 auto;">
        <video id="drone-video" ref="video" controls></video>
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
  methods: {
    initCameraStream: function() {
      var codecString = "video/mp4"; //'video/mp4; codecs="avc1.42001F"';
      /*
        Codec explanation: H.264 video is avc1
        Baseline profile is Hex: 42 = 66 (dec)
        E0 ?
        1F is the level and corresponds to 720p HD 
      */

      var video = this.videoElement;

      // set media source
      var mediaSource = new MediaSource();
      video.src = window.URL.createObjectURL(mediaSource);

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

        //buffer.addEventListener("update", function() {
        // Note: Have tried 'updateend'
        //console.log("update");
        _updateBuffer();
        //});

        buffer.addEventListener("updateend", function() {
          //console.log("updateend");
          _updateBuffer();
        });

        _initWebSocket();
      };

      mediaSource.addEventListener("sourceopen", _sourceBufferHandle);

      const _initWebSocket = () => {
        const webSocketPath = window.location.hostname + ":" + window.location.port + "/drone";
        var ws = new WebSocket("ws://" + webSocketPath, "echo-protocol");
        ws.binaryType = "arraybuffer";

        ws.onopen = function() {
          console.info("WebSocket connection initialized");
        };

        ws.onmessage = function(event) {
          //console.info("Recived WS message.", event);

          if (typeof event.data === "object") {
            if (buffer.updating || queue.length > 0) {
              queue.push(event.data);
            } else {
              buffer.appendBuffer(event.data);
              //video.play();
            }
          }
        };
      };
    },
  },
  mounted() {
    // runs on page load
    this.initCameraStream();
  },
  computed: {
    videoElement() {
      return this.$refs.video;
    },
  },
};
</script>

<style lang="scss">
#drone-output-img,
#drone-video {
  background-color: #0005;
  max-width: 1280px;
  max-height: 720px;
  width: 100%;
}
</style>
