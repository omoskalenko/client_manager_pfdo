import API from '../../../api';

const state = {
  session: null,
  status: null,
  errorDetail: null
};

const mutations = {
  AUTH_SUCCESS(state, payload) {
    state.status = 'success'
    state.session = payload;
  },

  AUTH_REQUEST(state) {
    state.status = 'loading'
  },
  
  AUTH_ERROR(state, error) {
    state.status = 'error'
    state.errorDetail = error
  },

  LOGOUT(state, error) {
    state.expires_at = null,
    state.session = null,
    state.status = error ? "error" : null
  }

};

const actions = {

  login({ commit }, { username, password }) {
    commit('AUTH_REQUEST');
    return API.login({ username, password })
      .then(res => {
        commit('AUTH_SUCCESS', res.data);
        localStorage.setItem('expires_at', state.expires_at);
      }).catch(error => { 
        commit('AUTH_ERROR', error);
      })
  },

  logout({ commit }, payload) {
    return new Promise(resolve => {
      localStorage.clear();
      commit('LOGOUT', payload);
      resolve();
    })
  },

  // autorefreshToken(context, time) {
  //   return setInterval(() => {
  //     return API.refreshToken()
  //      });
  //   }, time * 1000);
  // }

};

const getters = {
  status: state => state.status,
  errorDetail: state => state.errorDetail,
}

const login = {
  state,
  mutations,
  actions,
  getters
}

export default login;