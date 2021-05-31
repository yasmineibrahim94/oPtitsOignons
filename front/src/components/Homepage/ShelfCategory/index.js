import React from 'react';
import BookDessert from './BookDessert/index';
import BookDish from './BookDish/index';
import BookStarter from './BookStarter/index';

const ShelfCategory = () => (
  <div className="ShelfCategory">

    <BookStarter />
    <BookDish />
    <BookDessert />

  </div>
);

export default ShelfCategory;
