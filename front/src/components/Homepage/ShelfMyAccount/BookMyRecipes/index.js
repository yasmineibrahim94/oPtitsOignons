import React from 'react';
import { Link } from 'react-router-dom';

const BookMyRecipes = () => (
  <div className="createProfilBookContainer">
       <Link to="/user/recipes" className="myRecipesBook" type="button">Mes recettes</Link>
  </div>
);

export default BookMyRecipes;
