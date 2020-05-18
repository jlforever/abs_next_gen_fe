import actionTypes from "../actions";
import AuthService from "@/service/authService";

const { auth, users } = actionTypes;

const state = {
  token: localStorage.getItem("authData") || "",
  status: "",
  hasLoadedOnce: false
};

const getters = {
  isAuthenticated: state => !!state.token,
  authStatus: state => state.status
};

const actions = {
  [auth.request]: async ({ commit, dispatch }, params) => {
    commit(auth.request);
    try {
      const res = await AuthService.connect(params.url, params.data);
      commit(auth.success, res);
      dispatch(users.request, params.data.user.email);
    } catch (err) {
      commit(auth.error, err);
      localStorage.removeItem("authData");
    }
  },
  [auth.logout]: ({ commit }) => {
    commit(auth.logout);
    localStorage.removeItem("authData");
  }
};

const mutations = {
  [auth.request]: state => {
    state.status = "loading";
  },
  [auth.success]: (state, res) => {
    state.status = "success";
    state.token = res.access;
    state.hasLoadedOnce = true;
  },
  [auth.error]: state => {
    state.status = "error";
    state.hasLoadedOnce = true;
  },
  [auth.logout]: state => {
    state.access = "";
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
