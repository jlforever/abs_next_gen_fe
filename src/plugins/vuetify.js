import Vue from "vue";
import Vuetify from "vuetify/lib";
import "material-design-icons-iconfont/dist/material-design-icons.css"; // Ensure you are using css-loader

Vue.use(Vuetify);

const opts = {
  icons: {
    iconfont: "md"
  },
  theme: {
    themes: {
      light: {
        primary: "#000080",
        secondary: "#800000",
        accent: "#cf448c"
      }
    }
  }
};

export default new Vuetify(opts);
