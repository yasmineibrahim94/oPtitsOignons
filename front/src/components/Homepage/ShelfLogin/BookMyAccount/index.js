import React from 'react';
import { Link } from 'react-router-dom';

import './style.css';

const BookMyAccount = () => (
  <div className="createProfilBookContainer">
       <Link to="/login" className="myAccountBook" type="button">
          Mon compte
        </Link>
  </div>
);

export default BookMyAccount;

