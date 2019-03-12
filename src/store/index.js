import Vue from 'vue';
import Vuex from 'vuex';

import dashboard from './modules/dashboard';
import auth from './modules/auth';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    dashboard,
  }
})