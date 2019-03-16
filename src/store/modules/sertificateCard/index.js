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

  activateSertificate( _ , number) {
    API.activateSertificate(number);
  },

  editSertificate( _ , payload) {
    API.editSertificate(payload)
  },

  deleteSertificate( _ , payload) {
    API.deleteSertificate(payload).then(res => console.log(res)
    );
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