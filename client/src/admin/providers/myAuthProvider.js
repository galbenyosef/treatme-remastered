import { AUTH_LOGIN, AUTH_LOGOUT,AUTH_CHECK,AUTH_ERROR  } from 'react-admin';
import config from '../../config/urls';

const API_URL = process.env.NODE_ENV === 'development' ? config.devServer : config.server

export default (type, params) => {
  if (type === AUTH_LOGIN) {
    const { username, password } = params;
    const request = new Request(`${API_URL}/login`, {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    })
    return (
      fetch(request)
        .then(response => {
          if (response.status < 200 || response.status >= 300) {
            Promise.reject(response.statusText);
          }
          return response.json();
        })
        .catch(err => {
          Promise.reject(err)
        })
        .then(response => {
          const {token} = response[0]
          localStorage.setItem('treatmeAdmin', token);
        })
    )
  }
  if (type === AUTH_LOGOUT) {
    localStorage.removeItem('treatmeAdmin');
    return Promise.resolve();
  }
  if (type === AUTH_CHECK) {
    return localStorage.getItem('treatmeUser') ? Promise.resolve() : Promise.reject();
  }
  if (type === AUTH_ERROR) {
  }
  return Promise.resolve();
}