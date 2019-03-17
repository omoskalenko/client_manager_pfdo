/* eslint-disable no-console */
import API from '../../../api';

const state = {
  certificate: null,
};

const mutations = {
  UPDATE_SRTIFICATE(state, payload) {
    state.certificate = payload;
  },
  
  ACTIVATE(state) {
    state.certificate.actual = 1;
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
        commit('UPDATE_SRTIFICATE', res.data.data);
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

  setLocalActivateStatus({ commit }) {
    commit('ACTIVATE');
  }

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