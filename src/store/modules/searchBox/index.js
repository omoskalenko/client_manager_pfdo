/* eslint-disable no-console */
import API from '../../../api';

const state = {
  sertificate: null,
};

const mutations = {
  UPDATE_SRTIFICATE(state, payload) {
    state.sertificate = payload;
  },
  ACTIVATE(state) {
    state.sertificate.actual = 1;
  },
  
  DELETE_SERTIFICATE(state) {
    state.sertificate = null;
  }

};

const actions = {

  getSertificate({ commit }, payload) {
    commit('SET_STATUS', 'loading');
    return API.getSertificate(payload)
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
  sertificate: state => state.sertificate
}

const dashboard = {
  state,
  mutations,
  actions,
  getters
}

export default dashboard;