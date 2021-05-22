import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

const BookShoppingList = () => (
  <div className="createProfilBookContainer">
    <Link to="/shop" className="shoppingListBook" type="button>">liste de courses</Link>
  </div>
);

export default BookShoppingList;
