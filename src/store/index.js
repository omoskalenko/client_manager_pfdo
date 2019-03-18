import Vue from 'vue';
import Vuex from 'vuex';


import auth from './modules/auth';
import searchBox from './modules/searchBox';
import certificateCard from './modules/certificateCard';
import createCertificate from './modules/createCertificate';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    searchBox,
    certificateCard,
    createCertificate
  }
})