// import
import React from 'react';
import { Button, Icon } from 'semantic-ui-react';
import './style.css';
import 'semantic-ui-css/semantic.min.css';

const Footer = () => (
  <div className="footer">
    <Button color='facebook' size="huge">
      <Icon name='facebook' size="medium" /> Facebook
    </Button>
    <Button color='instagram' size="huge">
      <Icon name='instagram' size="medium"/> Instagram
    </Button>
    <Button color='twitter' size="huge">
      <Icon name='twitter' size="medium"/> Twitter
    </Button>
  </div>
);

export default Footer;
 