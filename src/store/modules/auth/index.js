import API from '../../../api';

const state = {
  expires_at: null,
  session: null,
  status: null,
  errorDetail: null
};

const mutations = {
  AUTH_SUCCESS(state, payload) {
    state.status = 'success'
    state.session = payload;
    if (!actions.sessionIsClosed()) {
      state.expires_at = Date.now() + 10 * 1000;
    }
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
    state.status = null,
    state.errorDetail = error    
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
    });
  },

  // refreshToken({ commit }) {
  //   API.refreshToken()
  //     .then(res => {
  //       commit('AUTH_SUCCESS', res.data);
  //       localStorage.setItem('expires_at', state.expires_at);
        
  //     })
  // },

  sessionIsClosed() {
    return state.session === null;
  }

};

const getters = {
  status: state => state.status,
  error: state => state.error,
}

const login = {
  state,
  mutations,
  actions,
  getters
}

export default login;