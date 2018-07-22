import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

import session from './modules/session'
import staff from './modules/staff'

const SET_STACKTRACE = 'setStackTrace'

const store = new Vuex.Store({
  modules: {
    session,
    staff,
  },
  state: {
    stackTrace: null,
    loading: false,
    mode: process.env.NODE_ENV,
  },
  mutations: {
    [SET_STACKTRACE] (state, stackTrace) {
      state.stackTrace = Object.assign({}, state.stackTrace, stackTrace)
    },
    loadStart(state) { state.loading = true },
    loadEnd(state) { state.loading = false },
  },
  actions: {
    [SET_STACKTRACE] ({commit}, stackTrace) { commit(SET_STACKTRACE, stackTrace) },
  },
  strict: process.env.NODE_ENV !== 'production',
  plugins: [createPersistedState({ storage: window.sessionStorage })]
})

export default store