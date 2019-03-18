/* eslint-disable no-console */
import API from '../../../api';

const state = {
  certificate:  null,
};

const mutations = {
  SAVE_CERTIFICATE(state, payload) {
    state.certificate = payload;  
  },

  UPDATE_CERTIFICATE(state, payload) {
    for (let key in payload) {
      state.certificate[key] = payload[key];
    }
  },
  
  DELETE_CERTIFICATE(state) {
    state.certificate = null;
  }

};

const actions = {

  getCertificate({ commit }, payload) {
    commit('SET_STATUS', 'loading');
    return API.getCertificate(payload)
      .then(res => {
        commit('SET_STATUS', 'success');
        commit('SAVE_CERTIFICATE', {...res.data.data });
        return new Promise((resolve) => {
          resolve(res.data);
        })
      })
      .catch(error => {
        commit('SET_STATUS', 'error');
        commit('AUTH_ERROR', error);
        return new Promise((resolve, reject) => {
          reject(error);
        })
      });
  },
};

const getters = {
  certificate: state => state.certificate
}

const dashboard = {
  state,
  mutations,
  actions,
  getters
}

export default dashboard;