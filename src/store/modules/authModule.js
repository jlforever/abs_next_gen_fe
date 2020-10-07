import actionTypes from "../actions";
import AuthService from "@/service/authService";

const { auth, users, errors } = actionTypes;

const state = {
  token: JSON.parse(localStorage.getItem("authData"))?.token || "",
  authLoading: null,
  authSuccess: null,
  authError: false,
  hasLoadedOnce: false
};

const getters = {
  isAuthenticated: state => !!state.token,
  authStatus: state => state.authSuccess
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
      dispatch(errors.format, err);
      AuthService.logout();
    }
  },
  [auth.retry]: async ({ commit, dispatch }, email) => {
    commit(auth.request);
    try {
      console.log("is this retrying???");
      const res = await AuthService.retry(email);
      commit(auth.success, res);
      dispatch(users.request, email);
      return res;
    } catch (err) {
      commit(auth.error, err);
      AuthService.logout();
      return err;
    }
  },
  [auth.success]: ({ commit }) => {
    commit(auth.success);
  },
  [auth.logout]: ({ commit }) => {
    commit(auth.logout);
    AuthService.logout();
  }
};

const mutations = {
  [auth.request]: state => {
    state.authLoading = true;
  },
  [auth.success]: (state, res) => {
    state.authLoading = false;
    state.authSuccess = true;
    state.token =
      res?.access ?? JSON.parse(localStorage.getItem("authData"))?.token;
    state.hasLoadedOnce = true;
  },
  [auth.error]: (state, err) => {
    state.authLoading = false;
    state.authSuccess = false;
    state.authError = true;
    state.hasLoadedOnce = true;
    console.error(err);
  },
  [auth.logout]: state => {
    state.token = "";
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
