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
    API.getSertificate(payload)
      .then(res => {
        console.log('Сертификат получен');
        
        context.commit('SET_SRTIFICATE', res.data.data);
      }).catch(error => console.log('Сертификат не получен'));
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