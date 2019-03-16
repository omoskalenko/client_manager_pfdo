import API from '../../../api';

const state = {
  interval: 59,
  session: null,
  status: null,
  errorDetail: null,
  refreshTimer: null,
  isAutorized: false
};

const mutations = {
  AUTH_SUCCESS(state, payload) {
    state.status = 'success'
    state.session = payload;
    state.isAutorized = true;
    state.refreshTimer = setInterval(() => {
      return API.refreshToken();
    }, state.interval * 60 * 1000);
  },

  SET_STATUS(state, payload) {
    state.status = payload;
  },

  AUTH_ERROR(state, error) {
    state.status = 'error'
    state.errorDetail = error
  },

  LOGOUT(state, error) {
    state.expires_at = null,
      state.session = null,
      state.status = error ? "error" : null
      state.isAutorized = false;
  }

};

const actions = {
  //Метод login
  //Принимает объект контекста, объект данных для авторизации(точку входа, имя пользователя и пароль)
  // выполняется мутация AUTH_REQUEST - отправка запроса
  //Устанавливается точка входа и передаются маршруты для запросов экземляру класса API
  //При успешной авторизации выполняется мутация AUTH_SUCCESS
  //Если ошибка авторизации выполняется мутация AUTH_ERROR
  
  login({ commit }, { pointOfEntry, username, password }) {
    commit('SET_STATUS', 'loading');
    API.initPointOfEntry(pointOfEntry);
    return API.login({ username, password })
      .then(res => {
        commit('AUTH_SUCCESS', res.data);
      }).catch(error => {
        commit('AUTH_ERROR', error);
      })
  },

  logout({ commit }, payload) {
    return new Promise(resolve => {
      localStorage.clear();
      commit('LOGOUT', payload);
      resolve();
    })
  },

};

const getters = {
  status: state => state.status,
  errorDetail: state => state.errorDetail,
  isAutorized: state => state.isAutorized
}

const login = {
  state,
  mutations,
  actions,
  getters
}

export default login;