import React from 'react';
import BookLogout from './BookLogout';
import BookMyRecipes from './BookMyRecipes';
import BookShoppingList from './BookShoppingList';

const ShelfMyAccount = () => (
  <div className="ShelfMyAccount">
    <BookLogout />
    <BookMyRecipes />
    <BookShoppingList />
  </div>
);

export default ShelfMyAccount;
