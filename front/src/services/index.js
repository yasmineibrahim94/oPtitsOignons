import axios from 'axios';

import jwtDecode from 'jwt-decode';
import { getItem, addItem, removeItem } from './LocalStorage';

axios.defaults.withCredentials = true;

export function hasAthenticated() {
  const token = getItem('api-cuisine.herokuapp.comToken');
  const result = token ? tokenIsValid(token) : false;

  if (result === false) {
    removeItem('api-cuisine.herokuapp.comToken');
  }

  return result;
}


export function getCurrentUser () {
  return (localStorage.getItem('api-cuisine.herokuapp.comToken'));
};

export function login(credentials) {
  return axios
    .post('https://apicuisine.herokuapp.com/api/login', credentials)
    .then((response) => {
      console.log('response', response.data);
    })
    .then((token) => {
      localStorage.setItem('api-cuisine.herokuapp.comToken', token);
      return true;
    });
}

export function newRecipe(credentials) {
  return axios
    .post('https://apicuisine.herokuapp.com/api/user/newrecipe', credentials)
    .then((response) => {
      console.log('response', response.data);
    })
    .then((token) => {
      localStorage.setItem('api-cuisine.herokuapp.comToken', token);
      return true;
    });
}

export function logout() {
  // localStorage.clear();
  return axios
    .get('https://apicuisine.herokuapp.com/api/logout')
    .then((response) => {
      console.log('response', response.data);
    })
/*     .then(() => {
     removeItem('api-cuisine.herokuapp.comToken');
      return true;
    }); */
}

export function tokenIsValid(token) {
  const { exp } = jwtDecode(token);

  if (exp * 1000 > new Date().getTime()) {
    return true;
  }
  return false;
}
