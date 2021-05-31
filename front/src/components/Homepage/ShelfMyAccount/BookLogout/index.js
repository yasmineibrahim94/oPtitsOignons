import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';
axios.defaults.withCredentials = true;

const handleLogout = () => {
  axios.get('https://apicuisine.herokuapp.com/api/logout')
  .then((response) => {console.log(response)})
  .then(() => location.href = '/')
};

function BookLogout() {
  return (
      <div className="createProfilBookContainer">
         
         <Link to="/logout" className="logoutBook" onClick={handleLogout}>Se deconnecter</Link>
              
      </div>
  );
}



export default BookLogout;
