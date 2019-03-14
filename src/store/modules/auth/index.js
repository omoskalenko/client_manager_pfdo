import API from '../../../api';

const state = {
  expires_at: null,
  session: null,
  status: null,
  error: null
};

const mutations = {
  AUTH_SUCCESS(state, payload) {
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
    state.error = error
  },

  LOGOUT(state) {
    state.expires_at = null,
    state.session = null,
    state.status = null
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
        // console.log(error);
        // error.message === 'Unable to retrieve user information'      
        commit('AUTH_ERROR', error);
      })
  },

  logout({ commit }) {
    return new Promise(resolve => {
      localStorage.clear();
      commit('LOGOUT');
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