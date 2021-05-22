import React from 'react';
import BookDessert from './BookDessert/index';
import BookDish from './BookDish/index';
import BookStarter from './BookStarter/index';

import './style.css';

const ShelfCategory = () => (
  <div className="ShelfCategory">

    <BookStarter />
    <BookDish />
    <BookDessert />

  </div>
);

export default ShelfCategory;
