import Vue from 'vue'
import Vuex from 'vuex'

import users from './modules/userModule'
import auth from './modules/authModule'
import family from './modules/familyModule'
import courses from './modules/courseModule'
import payments from './modules/paymentModule'
import errors from './modules/errorModule'
import success from './modules/successModule'
import loading from './modules/loadingModule'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    modules: {
        users,
        auth,
        family,
        courses,
        payments,
        errors,
        success,
        loading,
    },
    strict: debug,
})
