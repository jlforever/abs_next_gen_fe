import actionTypes from "../actions";
const { success } = actionTypes;

const state = {
  snackMessage: null
};

const actions = {
  [success.snack]: async ({ commit }, msg) => {
    commit(success.snack, msg);
  }
};

const mutations = {
  [success.snack]: (state, msg) => {
    state.snackMessage = msg;
  }
};

export default {
  state,
  actions,
  mutations
};
