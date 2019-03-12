import axios from 'axios';
// const axios = require('axios');

export default class API {
  constructor() {
    this._username = null;
    this._password = null;
    this._origin = 'https://api-test.pfdo.ru'
    this.expires_at = null;
    // this._ACCESS_DATA = {
    //   access_token: localStorage.getItem('access_token'),
    //   expires_in: localStorage.getItem('expires_in'),
    //   token_type: localStorage.getItem('token_type'),
    //   scope: localStorage.getItem('scope'),
    //   refresh_token: localStorage.getItem('access_token')
    // }

    this._REQUEST_PARAMS = {
      AUTORIZED: {
        method: 'POST',
        baseURL: `${this._origin}/oauth2/token`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          "grant_type": "password",
          "username": this._username,
          "password": this._password,
          "client_id": "candidate_app",
          "client_secret": "vuejsispower"
        }
      },
      GET_CERTIFICATE: {
        method: 'GET',
        baseURL: `${this._origin}/v2/certificates/${this.number}`,
        headers: this._HEADERS
      }

    }
  }
  get ACCESS_DATA() {
    return this._ACCESS_DATA;
  }

  set ACCESS_DATA(data) {
    this._ACCESS_DATA = data
  }

  _isExpire() {
    return Date.now === this.expires_at
  }

  _refreshToken() {
  
  }

  _init(data) {

    this.ACCESS_DATA = data;
    this.expires_at = Date.now() + this.ACCESS_DATA.expires_in;
    this._REQUEST_PARAMS._HEADERS = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
      }
  }

  autorized({ username, password }) {
    if(!this.ACCESS_DATA) {
      return axios({
        method: 'POST',
        baseURL: `${this._origin}/oauth2/token`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          "grant_type": "password",
          "username": username,
          "password": password,
          "client_id": "candidate_app",
          "client_secret": "vuejsispower"
        }
      });
    }
  }

  getSertificate(number) {

    return axios({
      method: 'GET',
      baseURL: `${this._origin}/v2/certificates/${number}`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this._ACCESS_DATA.access_token}`,
      }
    })
  }
}

