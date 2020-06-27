import Vue from "vue";

import actionTypes from "@/store/actions";
import UserService from "@/service/userService";

const { auth, users, errors, success } = actionTypes;

const state = {
  status: {
    userLoading: null,
    userSuccess: null,
    userError: false
  },
  profile: {},
  errors: {}
};

const getters = {
  activeUser: state => state.profile,
  isProfileLoaded: state => !!state.profile.email,
  profileErrors: state => state.errors
};

const actions = {
  [users.request]: async ({ commit, dispatch }, email) => {
    commit(users.request);
    try {
      const res = await UserService.fetchProfile(email);
      commit(users.success, res);
    } catch (err) {
      if (err.hasRefreshedToken) dispatch(users.request, email);
      commit(users.error);
      dispatch(auth.logout);
    }
  },
  [users.update]: async ({ commit, dispatch }, user) => {
    commit(users.request);
    try {
      const res = await UserService.updateProfile(user);
      commit(users.success, res);
      dispatch(success.snack, "Changes have been successfully saved");
    } catch (err) {
      commit(users.error, err);
      dispatch(errors.format, err);
    }
  }
};

const mutations = {
  [users.request]: state => {
    state.status = {
      userLoading: true,
      userSuccess: false,
      userError: false
    };
  },
  [users.success]: (state, res) => {
    state.status = {
      ...state.status,
      userLoading: false,
      userSuccess: true
    };
    Vue.set(state, "profile", res.profile);
  },
  [users.error]: (state, err) => {
    state.status = {
      ...state.status,
      userLoading: false,
      userError: true
    };
    Vue.set(state, "errors", err?.data?.errors);
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
