import React from 'react';
import { Link } from 'react-router-dom';

import './style.css';

const BookEditProfil = () => (
  <div className="createProfilBookContainer">
     
      <Link to="/user/{id}/edit" className="editProfilBook" type="button">Mes infos</Link>

  </div>
);

export default BookEditProfil;
