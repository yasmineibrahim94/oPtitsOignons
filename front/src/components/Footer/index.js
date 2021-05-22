import React from 'react';
import { Button, Icon } from 'semantic-ui-react';
import './style.scss';
import 'semantic-ui-css/semantic.min.css';

const Footer = () => (
  <div className="footer">
    <Button color='facebook'>
      <Icon name='facebook' /> Facebook
    </Button>
    <Button color='instagram'>
      <Icon name='instagram' /> Instagram
    </Button>
    <Button color='twitter'>
      <Icon name='twitter' /> Twitter
    </Button>
  </div>
);

export default Footer;
 