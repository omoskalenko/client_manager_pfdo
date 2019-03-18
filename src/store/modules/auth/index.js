import API from '../../../api';

const state = {
  interval: 30,
  status: null,
  errorDetail: null,
  refreshTimer: null,
  isAutorized: false
};

const mutations = {
  AUTH_SUCCESS(state) {    
    state.status = 'success'

    state.refreshTimer = setInterval(() => {
      return API.refreshToken();
    }, state.interval * 60 * 1000);
  },

  AUTH_ERROR(state, error) {
    state.status = 'error'
    state.errorDetail = error
  },
  
  SET_STATUS(state, payload) {
    state.status = payload;
  },

  LOGOUT(state, error) {
    state.status = error ? "error" : null
      
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
      commit('DELETE_CERTIFICATE', 'success')
      resolve();
    })
  },

};

const getters = {

  status: state => state.status,
  errorDetail: state => state.errorDetail,
}

const login = {
  state,
  mutations,
  actions,
  getters
}

export default login;