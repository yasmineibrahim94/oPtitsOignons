import React from 'react';
import { Link } from 'react-router-dom';

const BookStarter = () => (
  <div className="createProfilBookstarter">
    <Link to="/category/entrées" className="starterBook" type="button">Entrées</Link>
  </div>
);

export default BookStarter;
