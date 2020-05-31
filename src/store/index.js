import Vue from "vue";
import Vuex from "vuex";

import users from "./modules/userModule";
import auth from "./modules/authModule";
import family from "./modules/familyModule";

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== "production";

export default new Vuex.Store({
  modules: {
    users,
    auth,
    family
  },
  strict: debug
});
