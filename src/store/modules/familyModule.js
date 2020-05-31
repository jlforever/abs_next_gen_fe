import Vue from "vue";
import _ from "lodash";
import actionTypes from "@/store/actions";
import FamilyService from "@/service/familyService";

const { family } = actionTypes;

const state = { status: "", members: {} };

const getters = {
  currentFamilyMembers: state => state.members,
  hasFamilyMembers: state => {
    return Object.entries(state.members).length;
  }
};

const actions = {
  [family.request]: async ({ commit }, email) => {
    commit(family.request);
    try {
      const res = await FamilyService.fetchMembers(email);
      commit(family.success, res.family_members);
    } catch (err) {
      commit(family.error);
    }
  },
  [family.create]: async ({ commit }, student) => {
    try {
      const res = await FamilyService.createMember(student);
      commit(family.create, res.family_member);
    } catch (err) {
      commit(family.error, err);
    }
  }
};

const mutations = {
  [family.request]: state => {
    state.status = "loading";
  },
  [family.success]: (state, res) => {
    state.status = "success";
    Vue.set(state, "members", _.mapKeys(res, "id"));
  },
  [family.create]: (state, member) => {
    Vue.set(state, "members", { ...state.members, [member.id]: member });
  },
  [family.error]: (state, err) => {
    state.status = "error";
    console.log(err);
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
