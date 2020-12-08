import Vue from 'vue'
import _ from 'lodash'
import actionTypes from '@/store/actions'
import PaymentService from '@/service/paymentService'

const { payments, auth, errors } = actionTypes

const INITIAL_STATUS = {
    fetchLoading: true,
    fetchError: false,
    fetchSuccess: false,
    createLoading: false,
    createError: false,
    createSuccess: false,
    deleteLoading: false,
    deleteError: false,
    deleteSuccess: true,
}

const state = {
    status: INITIAL_STATUS,
    cards: {},
}

const getters = {
    currentCards: (state) => state.cards,
    hasCards: (state) => {
        return !!Object.entries(state.cards).length
    },
    loadingCardFetch: (state) => {
        return state.status.fetchLoading
    },
}

const actions = {
    [payments.card.request]: async ({ commit, dispatch }, email) => {
        commit(payments.card.request, 'fetch')
        try {
            const res = await PaymentService.fetchCards(email)
            commit(payments.card.success, res.credit_cards)
        } catch (err) {
            if (err.hasRefreshedToken) dispatch(payments.card.request, email)
            commit(payments.card.error)
        }
    },
    [payments.card.create]: async ({ commit, dispatch }, params) => {
        commit(payments.card.request, 'create')
        try {
            const res = await PaymentService.createCard(params)
            commit(payments.card.create, res.credit_card)
        } catch (err) {
            commit(payments.card.error, err)
            dispatch(errors.format, err)
        }
    },
}

const mutations = {
    [payments.card.request]: (state, type) => {
        switch (type) {
            case 'fetch':
                state.status.fetchLoading = true
                break
            case 'create':
                state.status.createLoading = true
                break
            case 'delete':
                state.status.deleteLoading = true
                break
            default:
                state.status = { ...state.status }
        }
    },
    [payments.card.success]: (state, res) => {
        state.status.fetchLoading = false
        state.status.fetchSuccess = true
        Vue.set(state, 'cards', _.mapKeys(res, 'id'))
    },
    [payments.card.create]: (state, card) => {
        state.status.createLoading = false
        state.status.createSuccess = true
        Vue.set(state, 'cards', { ...state.cards, [card.id]: card })
    },
    [payments.card.error]: (state, err) => {
        state.status.errorLoading = false
        state.status.errorSuccess = true
        console.error(err)
    },
    [auth.logout]: (state) => {
        state.status = INITIAL_STATUS
        state.members = {}
    },
}

export default {
    state,
    getters,
    actions,
    mutations,
}
