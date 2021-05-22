import React from 'react';

import Header from '/src/components/Header';
import ShelfLogin from '/src/components/Homepage/ShelfLogin';
import ShelfCategory from '/src/components/Homepage/ShelfCategory';
import ShelfMyAccount from '/src/components/Homepage/ShelfMyAccount';
import Footer from '/src/components/Footer';
import axios from 'axios';
axios.defaults.withCredentials = true;
import './style.scss';
import{getCurrentUser} from '../../services'


const Homepage = () => {
  return(
    <div className="myRecipe_container">
  <div className="librairy">
     <Header />
     {!getCurrentUser() ? <ShelfLogin /> : <ShelfMyAccount />}
     
    <ShelfCategory />
    <Footer />
  </div></div>)
};

  


export default Homepage;
