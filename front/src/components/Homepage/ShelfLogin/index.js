import React from 'react';

// == Import
import BookMyAccount from '/src/components/Homepage/ShelfLogin/BookMyAccount';
import BookCreateProfil from '/src/components/Homepage/ShelfLogin/BookCreateProfil';
import '/src/components/Homepage/ShelfLogin/style.css'

// == Composant

const ShelfLogin = () => (
  <div className="ShelfSignIn">
    <BookMyAccount /> 
    <BookCreateProfil />
  </div>
 
 
);

// == Export
export default ShelfLogin;
