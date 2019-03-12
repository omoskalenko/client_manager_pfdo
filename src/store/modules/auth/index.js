import axios from 'axios';

const state = {
  origin: 'https://api-test.pfdo.ru',
  expires_at: null,
  session: null,
};

const mutations = {
  SET_ACCESS_DATA(state, payload) {
    state.session = payload;
    if (!actions.sessionIsClosed()) {
      state.expires_at = Date.now() + state.session.expires_in * 1000;
    }

  },

};

const actions = {

  login({ commit }, { username, password }) {
    if (!localStorage.getItem('access_token')) {
      return axios({
          method: 'POST',
          baseURL: `${state.origin}/oauth2/token`,
          headers: {
            'Content-Type': 'application/json',
          },
          data: {
            "grant_type": "password",
            "username": username,
            "password": password,
            "client_id": "candidate_app",
            "client_secret": "vuejsispower"
          }
        })
        .then(res => {
          commit('SET_ACCESS_DATA', res.data);
          localStorage.setItem('expires_at', state.expires_at);

          for (let key in res.data) {
            localStorage.setItem(key, state.session[key]);
          }

        })
    }
  },

  logout({ commit }) {
    return new Promise(resolve => {
      localStorage.clear();
      commit('SET_ACCESS_DATA', null);
      resolve();
    });
  },

  refreshToken({ commit }) {
    return axios({
        method: 'POST',
        baseURL: `${state.origin}/oauth2/token`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          "grant_type": 'refresh_token',
          "refresh_token": localStorage.getItem('refresh_token'),
          "client_id": "candidate_app",
          "client_secret": "vuejsispower"
        }
      })
      .then(res => {
        commit('SET_ACCESS_DATA', res.data);

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

const getters = {}

const login = {
  state,
  mutations,
  actions,
  getters
}

export default login;