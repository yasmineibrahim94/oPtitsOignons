import React from 'react';
import { Link } from 'react-router-dom';

const Booksearch = () => (
  <div className="BookSearch">
    <Link to="/search" className="searchButton" type="button">Rechercher</Link>
  </div>
);

export default Booksearch;
