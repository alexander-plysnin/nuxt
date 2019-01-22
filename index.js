import {httpf} from '~/plugins/micro.js'

import createPersistedState from 'vuex-persistedstate';



export const state = () => ({
  auth: false,
  user_id:null,
  token: null,
  ava:null,
  role:null,
  user_name:null,
  apiUrl: 'http://micro/'
})
export const plugins = [
  createPersistedState(),
];
export const mutations = {
  SET_AUTH: function (state, auth) {
    state.auth = auth
  },
  SET_TOKEN: function (state, token) {
    state.token = token
  },
  SET_USERID: function (state, user_id) {
    state.user_id = user_id
  },
  SET_ROLE: function (state, role) {
    state.role = role
  },
  SET_AVA: function (state, ava) {
    state.ava = ava
  },
  SET_USERNAME: function (state, user_name) {
    state.user_name = user_name
  }
}

export const actions = {
  // nuxtServerInit is called by Nuxt.js before server-rendering every page

  async login({ commit }, { email, password }) {
    try {
  const { data } = await httpf.post('auth', { email, password })
   commit('SET_TOKEN', data.token)
   commit('SET_USERID', data.user_id)
   commit('SET_AUTH', true)

//localStorage.token = data
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error('Bad credentials')
      }
      throw error
    }
  },
  async role({ commit }, { token }) {
    try {
  const { data } = await httpf.get('profiles/role')
   commit('SET_ROLE', data)
//localStorage.token = data
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error('Bad credentials')
      }
      throw error
    }
  },
  async ava({ commit }, { ava }) {
    try {
   commit('SET_AVA', ava)
//localStorage.token = data
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error('Bad credentials')
      }
      throw error
    }
  },
  async user_name({ commit }, { user_name }) {
   commit('SET_USERNAME', user_name)
  },
  async logout({ commit }) {
  //  await axios.post('/api/logout')
    commit('SET_AUTH', false)
    commit('SET_TOKEN', null)
    commit('SET_ROLE', null)
    commit('SET_AVA', null)
    commit('SET_USERNAME', null)
  },


}
