/* eslint-disable no-console */
import axios from 'axios';

class API {
  constructor(routes) {
    this._ORIGIN = localStorage.getItem('point_of_entry');
    this._ROUTES = routes;

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
        if (status === 401) {
          return this.refreshToken()
            .then(() => {
              originalRequest.headers['Authorization'] = `Bearer ${this.token}`
              return axios.request(originalRequest)
            })
        }
        if (status === 400) {
          throw error.response.data
        }
      });

  }

  refreshToken() {
    return axios({
      method: 'POST',
      baseURL: `${this._ORIGIN}${this._ROUTES.AUTH}`,
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

  initPointOfEntry(url) {
    this._ORIGIN = `https://${url}`;
  }

  login({ username, password }) {
    if (!localStorage.getItem('access_token')) {
      return axios({
        method: 'POST',
        baseURL: `${this._ORIGIN}${this._ROUTES.AUTH}`,
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
        localStorage.setItem('point_of_entry', this._ORIGIN);
        return new Promise(resolve => {
          resolve(res)
        })
      })
    }
  }

  getSertificate(number) {
    return axios({
      method: 'GET',
      baseURL: `${this._ORIGIN}${this._ROUTES.REQ_SERTIFICATE(number)}`,
    });
  }

  createSertificate(data) {
    return axios({
      method: 'POST',
      baseURL: `${this._ORIGIN}${this._ROUTES.CREATE_SERTIFICATE}`,
      data
    });
  }

  activateSertificate(number) {
    return axios({
      method: 'PUT',
      baseURL: `${this._ROUTES.ACTIVATE_SERTIFICATE(number)}`,
      data: {     
        "actual": 1
      }
    })
  }

  editSertificate({ number, data }) {
    return axios({
      method: 'PATCH',
      baseURL: `${this._ROUTES.EDITING_SERTIFICATE(number)}`,
      data
    }).catch(error => console.log(error)
    );
  }

  deleteSertificate(number) {
    return axios({
      method: 'DELETE',
      baseURL: `${this._ROUTES.REQ_SERTIFICATE(number)}`
    }).catch(error => console.error(error)
    );
  }

}

const PFDOapiRoutes = {
  AUTH: '/oauth2/token',
  CREATE_SERTIFICATE: '/v2/certificates',
  REQ_SERTIFICATE(number) {
    return `/v2/certificates/${number}`
  },
  ACTIVATE_SERTIFICATE(number) {
    return `${this.REQ_SERTIFICATE(number)}/actual`
  },
  EDITING_SERTIFICATE(number) {
    return `${this.REQ_SERTIFICATE(number)}/personal`
  }
}

const PFDO_API = new API(PFDOapiRoutes);

export default PFDO_API;