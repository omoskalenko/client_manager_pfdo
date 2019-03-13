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
        for (let key in res.data) {
          localStorage.setItem(key, state.session[key]);
        }
      }).catch(error => {
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

  refreshToken({ commit }) {
    API.refreshToken()
      .then(res => {
        commit('AUTH_SUCCESS', res.data);
        localStorage.setItem('expires_at', state.expires_at);
        for (let key in res.data) {
          localStorage.setItem(key, state.session[key]);
        }
      })
  },

  sessionIsClosed() {
    return state.session === null;
  }

};

const getters = {
  status: state => state.status,
}

const login = {
  state,
  mutations,
  actions,
  getters
}

export default login;