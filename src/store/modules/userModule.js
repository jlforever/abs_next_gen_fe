import Vue from "vue";

import actionTypes from "@/store/actions";
import UserService from "@/service/userService";

const { auth, users } = actionTypes;

const state = { status: "", profile: {} };

const getters = {
  activeUser: state => state.profile,
  isProfileLoaded: state => !!state.profile.email
};

const actions = {
  [users.request]: async ({ commit, dispatch }, email) => {
    commit(users.request);
    try {
      const res = await UserService.fetchProfile(email);
      commit(users.success, res);
    } catch (err) {
      commit(users.error);
      dispatch(auth.logout);
    }
  },
  [users.update]: async ({ commit }, user) => {
    commit(users.request);
    try {
      const res = await UserService.updateProfile(user);
      commit(users.success, res);
    } catch (err) {
      commit(users.error, err);
    }
  }
};

const mutations = {
  [users.request]: state => {
    state.status = "loading";
  },
  [users.success]: (state, res) => {
    state.status = "success";
    Vue.set(state, "profile", res.profile);
  },
  [users.error]: (state, err) => {
    state.status = "error";
    console.log(err);
  },
  [auth.logout]: state => {
    state.profile = {};
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
