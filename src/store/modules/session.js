
import api from '@/module/api'
import Type from '@/store/mutation-types'

const SET_SESSION = 'setSession'
const SET_ROLE = 'setRole'
const SET_MENU = 'setMenu'
const LOGOUTED = 'logouted'

const session = {
  namespaced: true,
  state: {
    session: null,
    roleList: [],
    menuList: [],
    logouted: false,
  },
  mutations: {
    [SET_SESSION] (state, { session }) {
      state.session = session
    },
    [SET_ROLE] (state, { data }) {
      state.roleList = Object.assign([], data)
    },
    [SET_MENU] (state, { data }) {
      state.menuList = Object.assign([], data)
    },
    [Type.UNSET_ALL] (state) {
      state.session = null
      state.roleList = []
      state.menuList = []
      state.logouted = false
    },
    [LOGOUTED] (state, { logouted }) {
      state.logouted = logouted
    },
  },
  actions: {
    async login ({ dispatch, commit }, loginInfo) {
      dispatch(Type.UNSET_ALL)
      const response = await api.auth.doAuth(loginInfo)
      commit(SET_SESSION, { session: response.data.data[0] })
    },
    async [SET_ROLE] ({ dispatch, commit, state }) {
      //TODO
    },
    async [SET_MENU] ({ dispatch, commit, state }) {
      //TODO
    },
    async checkSession ({ dispatch, commit, state }) {
      const response = await api.auth.checkSession()
      commit(SET_SESSION, { session: response.data.data[0] })
    },
    async logout ({ dispatch, commit, state }) {
      await api.auth.logout()
      commit(LOGOUTED, { logouted: true })
    },
    [Type.UNSET_ALL] ({commit}) { commit(Type.UNSET_ALL) },
  }
}

export default session