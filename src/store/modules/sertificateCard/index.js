/* eslint-disable no-console */
import API from '../../../api';

const state = {

};

const mutations = {

};

const actions = {

  activateSertificate({ commit }, payload) {
    API.activateSertificate(payload);
  },

  editSertificate({ commit }, payload) {
    API.editSertificate(payload);
  }
 
};

const getters = {

}

const dashboard = {
  state,
  mutations,
  actions,
  getters
}

export default dashboard;