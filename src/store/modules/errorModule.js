import actionTypes from "../actions";
import { formatErrors } from "@/utils/errorUtils";

const { errors } = actionTypes;

const state = {
  snackMessage: null
};

const actions = {
  [errors.format]: async ({ dispatch }, err) => {
    const message = formatErrors(err.data.errors);
    dispatch(errors.snack, message);
  },
  [errors.snack]: async ({ commit }, msg) => {
    commit(errors.snack, msg);
  }
};

const mutations = {
  [errors.snack]: (state, msg) => {
    state.snackMessage = msg;
  }
};

export default {
  state,
  actions,
  mutations
};
