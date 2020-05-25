import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "@/plugins/vuetify"; // path to vuetify export
import LazyYoutubeVideo from "vue-lazy-youtube-video";

Vue.config.productionTip = false;
Vue.component("LazyYoutubeVideo", LazyYoutubeVideo);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
