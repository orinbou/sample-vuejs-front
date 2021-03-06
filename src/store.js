/* eslint-disable */

import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import * as session from '@/store/modules/session';
import * as form from '@/store/modules/form';
import * as master from '@/store/modules/master';

Vue.use(Vuex);

const SET_STACKTRACE = 'setStackTrace';

const store = new Vuex.Store({
  modules: {
    session,
    master,
    form,
  },

  state: {
    stackTrace: null,
    loading: false,
    mode: process.env.NODE_ENV,
  },

  mutations: {
    [SET_STACKTRACE](state, stackTrace) {
      state.stackTrace = stackTrace;
    },
    loadStart(state) { state.loading = true; },
    loadEnd(state) { state.loading = false; },
  },

  strict: process.env.NODE_ENV !== 'production',
  plugins: [createPersistedState({ storage: window.sessionStorage })],
});

export default store;
