import React from 'react';

// composants import
import ListByFlipDish from './ListByFlipDish';
import ListByFlipDishResponsiv from './ListByFlipDishRespnsiv ';

// style import
import '../style.scss';

const DishList = () => (
  <div><div className="ListByFlipResponsiv"><ListByFlipDishResponsiv /></div>
  <div className="ListByFlip"> <ListByFlipDish /> </div>
  </div>
);

export default DishList;
