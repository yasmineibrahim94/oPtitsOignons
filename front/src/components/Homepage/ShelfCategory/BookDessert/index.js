import React from 'react';
import { Link } from 'react-router-dom';

import './style.css';

const BookDessert = () => (
  <div className="createProfilBookContainer">
    <Link to="/category/desserts" className="dessertBook" type="button">Desserts</Link>
  </div>
);

export default BookDessert;
