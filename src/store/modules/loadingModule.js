import actionTypes from '../actions'
const { loading } = actionTypes

const state = {
    status: false,
}

const actions = {
    [loading.status]: async ({ commit }, bool) => {
        commit(loading.status, bool)
    },
}

const mutations = {
    [loading.status]: (state, bool) => {
        if (bool !== state.status) {
            state.status = bool
        }
    },
}

export default {
    state,
    actions,
    mutations,
}
