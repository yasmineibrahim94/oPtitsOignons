import React from 'react';

// composants import
import ListByFlipDessert from './ListByFlipDessert';
import ListByFlipDessertResponsiv from './ListByFlipDessertRespnsiv';

// style import
import '../style.scss';

const DessertList = () => (
  <div><div className="ListByFlipResponsiv"><ListByFlipDessertResponsiv /></div>
  <div className="ListByFlip"> <ListByFlipDessert /> </div>
  </div>
);

export default DessertList;
