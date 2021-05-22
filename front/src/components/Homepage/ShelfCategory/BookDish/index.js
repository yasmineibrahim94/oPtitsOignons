import React from 'react';
import { Link } from 'react-router-dom';

import './style.css';

const BookDish = () => (
  <div className="createProfilBookContainer">
   <Link to="/category/plats" className="dishBook" type="button">Plats</Link>
  </div>
);

export default BookDish;
