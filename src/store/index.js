import Vue from 'vue';
import Vuex from 'vuex';


import auth from './modules/auth';
import searchBox from './modules/searchBox';
import sertificateCard from './modules/sertificateCard';
import createSertificate from './modules/createSertificate';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    searchBox,
    sertificateCard,
    createSertificate
  }
})