/* eslint-disable no-console */
import API from '../../../api';

const state = {
  data: {
    name: '',
    soname: '',
    phname: '',
    birthday: '',
    email: '',
  }
};

const mutations = {
  UPDATA_DATA(state, payload) {
    state.data = payload;
  }
};

const actions = {

  activateCertificate( _ , number) {
    API.activateCertificate(number);
  },

  editCertificate( _ , payload) {
    API.editCertificate(payload)
  },

  deleteCertificate( _ , payload) {
    API.deleteCertificate(payload)
  }

 
};

const getters = {
  data: state => state.data,
  name: state => state.data.name,
  soname: state => state.data.soname,
  phname: state => state.data.phname,
  birthday: state => state.data.birthday,
  email: state => state.data.email,
}

const dashboard = {
  state,
  mutations,
  actions,
  getters
}

export default dashboard;