import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

import API from './api.js';

// const session = new API();

Vue.use(Vuex)

export default new Vuex.Store({
  // ${localStorage.getItem('token')}
  state: {
    origin: 'https://api-test.pfdo.ru',
    expires_at: null,
    session: null,
    sertificate: null,   
  },
  mutations: {
    GET_ACCESS_DATA(state, payload) {
      //"candidate_api_manager"
      //"Us3oUs3M5M"  
      if(!state.session) {
        state.session = payload;
        state.session.startTime = Date.now();
        state.expires_at = state.session.startTime + state.session.expires_in;
        console.log(state.session);
      }       
    },

    GET_SRTIFICATE(state, payload) {
      this.state.sertificate = payload;
    }

  },
  actions: {
    authorization(context, {username, password})  {

      if(!localStorage.getItem('access_token')) {
        axios({
          method: 'POST',
          baseURL: `${this.state.origin}/oauth2/token`,
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
        })
        .then(res => {
          context.commit('GET_ACCESS_DATA', res.data);

          localStorage.setItem('expires_at', this.state.expires_at);
          localStorage.setItem('access_token', this.state.session.access_token);
          localStorage.setItem('expires_in', this.state.session.expires_in);
          localStorage.setItem('token_type', this.state.session.token_type);
          localStorage.setItem('scope', this.state.session.scope);
          localStorage.setItem('refresh_token', this.state.session.refresh_token);
        })  
      }
    },
    
    getSertificate(context, payload) {      
      axios({
        method: 'GET',
        baseURL: `${this.state.origin}/v2/certificates/${payload}`,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        }
      })
      .then(res => {
        context.commit('GET_SRTIFICATE', res);
      });
    }
      
    },

  getters: {
    sertificate: state => state.sertificate
  }
})
