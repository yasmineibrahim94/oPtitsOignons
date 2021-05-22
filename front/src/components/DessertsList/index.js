import React from 'react';

import ListByFlipDessert from './ListByFlipDessert';
import ListByFlipDessertResponsiv from './ListByFlipDessertRespnsiv';

const DessertList = () => (
  <div><div className="ListByFlipResponsiv"><ListByFlipDessertResponsiv /></div>
  <div className="ListByFlip"> <ListByFlipDessert /> </div>
  </div>
);

export default DessertList;
