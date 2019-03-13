import axios from 'axios';
// const axios = require('axios');


class PFDO_API {
  constructor() {
    this._origin = 'https://api-test.pfdo.ru';

    this.token = localStorage.getItem('access_token');

    axios.defaults.headers.common['Content-Type'] = `application/json`;
    if (this.token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
    }
  }
 
  _isExpired() {
    console.log(Date.now(), localStorage.getItem("expires_at"));
    
    return Date.now() >= localStorage.getItem("expires_at");
  }

  // _tryToken(fn, arg) {
  //   if (this._isExpired()) {
  //     this.refreshToken().then(() => {
  //       return fn(arg);
  //     });
  //   }
  //   return fn(arg);
  // }

  _reqSertificate(number) {
    return axios({
      method: 'GET',
      baseURL: `${this._origin}/v2/certificates/${number}`,
    })
  }

  _refreshToken() {
    return axios({
      method: 'POST',
      baseURL: `${this._origin}/oauth2/token`,
      data: {
        "grant_type": 'refresh_token',
        "refresh_token": localStorage.getItem('refresh_token'),
        "client_id": "candidate_app",
        "client_secret": "vuejsispower"
      }
    }).catch(() => console.log('Ошибка обновления токена'))
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
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
        return new Promise(resolve => {
          resolve(res)
        })
      })
    }
  }
  
  getSertificate(number) {

    return this._reqSertificate(number)

  }
  
}

const API = new PFDO_API();

export default API;