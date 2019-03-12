import axios from 'axios';

const state = {
  origin: 'https://api-test.pfdo.ru',
  sertificate: null,
};

const mutations = {
  GET_SRTIFICATE(state, payload) {
    state.sertificate = payload;
  }
};

const actions = {

  getSertificate(context, payload) {

    axios({
      method: 'GET',
      baseURL: `${state.origin}/v2/certificates/${payload}`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
      }
    })
      .then(res => {
        context.commit('GET_SRTIFICATE', res.data.data);
      });
  },
  
};

const getters = {
  sertificate: state => state.sertificate
}

const dashboard = {
  state,
  mutations,
  actions,
  getters
}

export default dashboard;