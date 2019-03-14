/* eslint-disable no-console */
import API from '../../../api';

const state = {
  origin: 'https://api-test.pfdo.ru',
  sertificate: null,
};

const mutations = {
  SET_SRTIFICATE(state, payload) {
    state.sertificate = payload;
  }
};

const actions = {

  getSertificate(context, payload) {
    return API.getSertificate(payload)
      .then(res => {
        context.commit('SET_SRTIFICATE', res.data.data);
      })
      .catch(error => { 
        context.commit('AUTH_ERROR', error);
        return new Promise((resolve, reject) => {
          reject(error);
        })
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