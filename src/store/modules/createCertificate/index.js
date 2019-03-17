/* eslint-disable no-console */
import API from '../../../api';

const state = {
  history: []
};

const mutations = {
  SAVE_NUMBER(state, payload) {
    state.history.push(payload);
  }
};

const actions = {

  createCertificate({ commit }, payload) {
    commit('SET_STATUS', 'loading');
    return API.createCertificate(payload)
      .then(res => {
      
       if (!res.data.data.actual) {
         return new Promise((resolve, reject) => {
          reject(res.data.data.number[0]);
        })
       }    
        commit('SAVE_NUMBER', res.data.data.number);   
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

};

const getters = {
  history: state => state.history
}

const dashboard = {
  state,
  mutations,
  actions,
  getters
}

export default dashboard;