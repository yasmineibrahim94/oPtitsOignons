import React from 'react';
import { Popup } from 'semantic-ui-react';

const PopupExample = () => (
  <Popup content='ajouter a la liste de course' trigger={<button className="ButtonPopUp">+</button>} />
);

export default PopupExample;
