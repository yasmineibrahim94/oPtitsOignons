import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React, { useState } from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';

import Homepage from '../Homepage';
import ShoppingList from '../ShoppingList';
import StarterList from '../BooksOfRecipes/StarterList';
import DishList from '../BooksOfRecipes/DishList';
import DessertList from '../BooksOfRecipes/DessertsList';
import MyRecipes from '../BooksOfRecipes/MyRecipes';
import CreateProfil from '../CreateProfil';
import CreateRecipe from '../CreateRecipe';
import LoginForm from '../LoginForm';
import Recipe from '../Recipe';
import Search from '../Header/Search';
import { hasAthenticated } from '../../services/index';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(hasAthenticated());
  return (
    <div>
      <Switch>
        <Route path="/" exact component={Homepage} />
        <Route path="/category/entrées" component={StarterList} />
        <Route path="/category/desserts" component={DessertList} />
        <Route path="/category/plats" component={DishList} />

        <Route path="/create-profil" component={CreateProfil} />
        <Route path="/login" component={LoginForm} />
        <Route path="/recipe/:id" component={Recipe} />
        <Route path="/search" component={Search} />

        <Route path="/shop" component={ShoppingList} />
        <Route path="/user/recipes" component={MyRecipes} />
        <Route path="/user/new-recipe" component={CreateRecipe} />

      </Switch>
    </div>
  );
}

export default App;
