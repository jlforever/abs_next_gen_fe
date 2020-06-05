import "@mdi/font/css/materialdesignicons.css"; // Ensure you are using css-loader
import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

const opts = {
  icons: {
    iconfont: "mdi"
  },
  theme: {
    themes: {
      light: {
        primary: {
          base: "#000080",
          lighten1: "#262693",
          lighten2: "#4D4DA6",
          lighten3: "#8080C0",
          lighten4: "#B3B3D9",
          lighten5: "#E0E0F0",
          darken1: "#000078",
          darken2: "#00006D",
          darken3: "#000063",
          darken4: "#000050"
        },
        secondary: {
          base: "#cf448c",
          lighten1: "#D6609D",
          lighten2: "#DD7CAF",
          lighten3: "#E7A2C6",
          lighten4: "#F1C7DD",
          lighten5: "#F9E9F1",
          darken1: "#CA3E84",
          darken2: "#C33579",
          darken3: "#BD2D6F",
          darken4: "#B21F5C"
        },
        accent: {
          base: "#e8e8e8"
        }
      }
    }
  }
};

export default new Vuetify(opts);
