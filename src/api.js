/* eslint-disable no-console */
import axios from 'axios';
// const axios = require('axios');


class PFDO_API {
  constructor() {
    this._origin = 'https://api-test.pfdo.ru';

    this.token = localStorage.getItem('access_token');
    // this.token = 'b2ee86c55b01ded14087b950aaa7c1c924e0a152' // old
    // this.token = '99d69dbadd248572dba4ae939e2fec5b63504092' // old 2
    this.refresh_token = localStorage.getItem('refresh_token');
    // this.refresh_token = '7c528954832910063d7129f4afdd8638d13e0817'; // old
    // this.refresh_token = '16dc567a484aa7d4a93fcd73efec0abcf790f3e0'; // old 2

    this._initAxios();
  }

  _initAxios() {
    axios.defaults.headers.common['Content-Type'] = `application/json`;
    if (this.token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;

    }

    axios.interceptors.response.use(
      response => response,
      (error) => {
          const status = error.response ? error.response.status : null
          const originalRequest = error.config
          console.log('Axios перехватил ошибку', error.response, error.config);
          
          if (status === 401) {
            console.log('Выполняется обновление токена');
            return this._refreshToken()
              .then(() => {
                originalRequest.headers['Authorization'] = `Bearer ${this.token}`
                console.log('Токен обновлен, заголовок в запросе обновлен, выполняется новый запрос', error.response, error.config);
                return axios.request(originalRequest)
              });
          }
          if (status === 400) {
            '400: Токен не обновлен, ошибка запроса',
            console.log(error.response, error.config);
            throw error.response.data;
          }
        });

      }

  _isExpired() {
    return Date.now() >= localStorage.getItem("expires_at");
  }


  _reqSertificate(number) {
    return axios({
      method: 'GET',
      baseURL: `${this._origin}/v2/certificates/${number}`,
    }).catch(error => console.error(error));
  }

  _refreshToken() {
    return axios({
      method: 'POST',
      baseURL: `https://api-test.pfdo.ru/oauth2/token`,
      data: {
        "grant_type": 'refresh_token',
        "refresh_token": this.refresh_token,
        "client_id": "candidate_app",
        "client_secret": "vuejsispower"
      }
    }).then(res => {
      this.token = res.data.access_token;
      this.refresh_token = res.data.refresh_token;
      for (let key in res.data) {
        localStorage.setItem(key, res.data[key]);
      }
      axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
      return new Promise(resolve => {
        resolve(res)
      })
    })

  }

  login({ username, password }) {
    if (!localStorage.getItem('access_token')) {
      return axios({
        method: 'POST',
        baseURL: `${this._origin}/oauth2/token`,
        data: {
          "grant_type": "password",
          "username": username,
          "password": password,
          "client_id": "candidate_app",
          "client_secret": "vuejsispower"
        }
      }).then(res => {
        this.token = res.data.access_token;
        this.refresh_token = res.data.refresh_token;
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
        for (let key in res.data) {
          localStorage.setItem(key, res.data[key]);
        }
        return new Promise(resolve => {
          resolve(res)
        })
      })
    }
  }

  getSertificate(number) {
    // this._refreshToken();
    return this._reqSertificate(number);
  }

}

const API = new PFDO_API();

export default API;