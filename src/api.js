/* eslint-disable no-console */
import axios from 'axios';
// const axios = require('axios');


class PFDO_API {
  constructor() {
    this._origin = 'https://api-test.pfdo.ru';

    this.token = localStorage.getItem('access_token');

    this.refresh_token = localStorage.getItem('refresh_token');

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
        // console.log(error.response, error.config);

        if (status === 401) {
          return this.refreshToken()
            .then(() => {
              originalRequest.headers['Authorization'] = `Bearer ${this.token}`
              return axios.request(originalRequest)
            })
        }
        if (status === 400) {
          console.log('1', error.response.data);

          throw error.response.data
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
    })
  }

  refreshToken() {
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
    }).catch(error => { throw error });

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