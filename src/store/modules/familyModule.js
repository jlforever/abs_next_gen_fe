import Vue from "vue";
import _ from "lodash";
import actionTypes from "@/store/actions";
import FamilyService from "@/service/familyService";

const { family, auth, errors } = actionTypes;

const INITIAL_STATUS = {
  fetchLoading: true,
  fetchError: false,
  fetchSuccess: false,
  createLoading: false,
  createError: false,
  createSuccess: false,
  deleteLoading: false,
  deleteError: false,
  deleteSuccess: true
};

const state = {
  status: INITIAL_STATUS,
  members: {}
};

const getters = {
  currentFamilyMembers: state => state.members,
  hasFamilyMembers: state => {
    return Object.entries(state.members).length;
  },
  loadingFamilyMemberFetch: state => {
    return state.status.fetchLoading;
  }
};

const actions = {
  [family.request]: async ({ commit, dispatch }, email) => {
    commit(family.request, "fetch");
    try {
      const res = await FamilyService.fetchMembers(email);
      commit(family.success, res.family_members);
    } catch (err) {
      if (err.hasRefreshedToken) dispatch(family.request, email);
      commit(family.error);
    }
  },
  [family.create]: async ({ commit, dispatch }, student) => {
    commit(family.request, "create");
    try {
      const res = await FamilyService.createMember(student);
      commit(family.create, res.family_member);
    } catch (err) {
      commit(family.error, err);
      dispatch(errors.format, err);
    }
  },
  [family.delete]: async ({ commit, dispatch }, id, params) => {
    commit(family.request, "delete");
    try {
      const res = await FamilyService.deleteMember(id, params);
      commit(family.delete, res.family_member);
    } catch (err) {
      commit(family.error, err);
      dispatch(errors.format, err);
    }
  }
};

const mutations = {
  [family.request]: (state, type) => {
    switch (type) {
      case "fetch":
        state.status.fetchLoading = true;
        break;
      case "create":
        state.status.createLoading = true;
        break;
      case "delete":
        state.status.deleteLoading = true;
        break;
      default:
        state.status = { ...state.status };
    }
  },
  [family.success]: (state, res) => {
    state.status.fetchLoading = false;
    state.status.fetchSuccess = true;
    Vue.set(state, "members", _.mapKeys(res, "id"));
  },
  [family.create]: (state, member) => {
    state.status.createLoading = false;
    state.status.createSuccess = true;
    Vue.set(state, "members", { ...state.members, [member.id]: member });
  },
  [family.delete]: (state, member) => {
    state.status.deleteLoading = false;
    state.status.deleteSuccess = true;
    Vue.delete(state.members, member.id);
  },
  [family.error]: (state, err) => {
    state.status.errorLoading = false;
    state.status.errorSuccess = true;
    console.error(err);
  },
  [auth.logout]: state => {
    state.status = INITIAL_STATUS;
    state.members = {};
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
