import React from 'react';
import { Link } from 'react-router-dom';
import BookSearch from './BookSearch';
import './style.scss';

const Header = () => (
  <div className="allheader">
  <div className="header">
      <Link to="/"><h1 className='title'>O'ptits Oignons</h1></Link>
    
    <BookSearch />
  </div><div className="whitePlace"></div></div>
);

export default Header;
