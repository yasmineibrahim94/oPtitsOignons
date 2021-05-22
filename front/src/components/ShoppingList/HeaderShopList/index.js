import React from 'react';
import { Link } from 'react-router-dom';
import BookSearch from './BookSearch';
import './style.scss';

const HeaderShoppingList = () => (
  <div className="allheader">
    <div className="header">
      <Link to="/"><h1 className="title">O'ptits Oignons</h1></Link>
      <BookSearch />
    </div>
      <div className="HeaderShoppingList whitePlace"></div>
    </div>
);

export default HeaderShoppingList;
