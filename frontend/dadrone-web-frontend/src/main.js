import Vue from "vue";

// Modules and components
import App from "./App.vue";
import "./registerServiceWorker";

// Vue material
import "vue-material/dist/vue-material.min.css";
import "vue-material/dist/theme/default-dark.css";

// Vue Material Components
import { MdApp, MdToolbar, MdContent, MdButton } from "vue-material/dist/components";

Vue.use(MdApp);
Vue.use(MdToolbar);
Vue.use(MdContent);
Vue.use(MdButton);

Vue.config.productionTip = false;

new Vue({
  // eslint-disable-next-line
  render: (h) => h(App),
}).$mount("#app");
