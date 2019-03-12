import axios from 'axios';

const state = {
  origin: 'https://api-test.pfdo.ru',
  expires_at: null,
  session: null,
};

const mutations = {
  SET_ACCESS_DATA(state, payload) {
      state.session = payload;
      if(state.session !== null) {
        state.session.startTime = Date.now();
        state.expires_at = state.session.startTime + state.session.expires_in;
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
          this.writeToLocalStorage(res.data);
          // localStorage.setItem('access_token', state.session.access_token);
          // localStorage.setItem('expires_in', state.session.expires_in);
          // localStorage.setItem('token_type', state.session.token_type);
          // localStorage.setItem('scope', state.session.scope);
          // localStorage.setItem('refresh_token', state.session.refresh_token);
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
    axios({
      method: 'POST',
      baseURL: `${state.origin}/oauth2/token`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        "grant_type": localStorage.getItem('grant_type'),
        "refresh_token": localStorage.getItem('refresh_token'),
        "client_id": "candidate_app",
        "client_secret": "vuejsispower"
      }
    })
    .then(res => {
          commit('SET_ACCESS_DATA', res.data);
          this.writeToLocalStorage(res.data)
          // localStorage.setItem('expires_at', state.expires_at);
          // localStorage.setItem('access_token', state.session.access_token);
          // localStorage.setItem('expires_in', state.session.expires_in);
          // localStorage.setItem('token_type', state.session.token_type);
          // localStorage.setItem('scope', state.session.scope);
          // localStorage.setItem('refresh_token', state.session.refresh_token);
    })
  },

  writeToLocalStorage(data) {
    for (let key of data) {
      localStorage.setItem(key, state.session[key]);
    }
  }
};

const getters = {
}

const login = {
  state,
  mutations,
  actions,
  getters
}

export default login;
