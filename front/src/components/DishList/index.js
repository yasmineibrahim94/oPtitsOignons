import React from 'react';

import ListByFlipDish from './ListByFlipDish';
import ListByFlipDishResponsiv from './ListByFlipDishRespnsiv ';

const DishList = () => (
  <div><div className="ListByFlipResponsiv"><ListByFlipDishResponsiv /></div>
  <div className="ListByFlip"> <ListByFlipDish /> </div>
  </div>
);

export default DishList;
