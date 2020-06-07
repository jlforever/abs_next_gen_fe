import Vue from "vue";
import _ from "lodash";
import actionTypes from "@/store/actions";
import FamilyService from "@/service/familyService";

const { family } = actionTypes;

const state = {
  status: {
    fetchLoading: true,
    fetchError: false,
    fetchSuccess: false,
    createLoading: false,
    createError: false,
    createSuccess: false,
    deleteLoading: false,
    deleteError: false,
    deleteSuccess: true
  },
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
  [family.request]: async ({ commit }, email) => {
    commit(family.request, "fetch");
    try {
      const res = await FamilyService.fetchMembers(email);
      commit(family.success, res.family_members);
    } catch (err) {
      commit(family.error);
    }
  },
  [family.create]: async ({ commit }, student) => {
    commit(family.request, "create");
    try {
      const res = await FamilyService.createMember(student);
      commit(family.create, res.family_member);
    } catch (err) {
      commit(family.error, err);
    }
  },
  [family.delete]: async ({ commit }, id, params, familyMemberId) => {
    commit(family.request, "delete");
    try {
      const res = await FamilyService.deleteMember(id, params);
      commit(family.delete, res.family_member, familyMemberId);
    } catch (err) {
      commit(family.error, err);
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
  [family.error]: (state, err) => {
    state.status.errorLoading = false;
    state.status.errorSuccess = true;
    console.log(err);
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
