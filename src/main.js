import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "@/plugins/vuetify"; // path to vuetify export
import LazyYoutubeVideo from "vue-lazy-youtube-video";
import VueMeta from "vue-meta";
import VueCurrencyFilter from "vue-currency-filter";

import "typeface-roboto-slab";

Vue.config.productionTip = false;
Vue.use(VueMeta);
Vue.component("LazyYoutubeVideo", LazyYoutubeVideo);
Vue.use(VueCurrencyFilter, {
  symbol: "$",
  thousandsSeparator: ",",
  fractionCount: 2,
  fractionSeparator: ".",
  symbolPosition: "front",
  symbolSpacing: true
});

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
