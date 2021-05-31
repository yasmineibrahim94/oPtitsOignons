import React from 'react';

import ListByFlipStarter from './ListByStarterFlip';
import ListByFlipStarterResponsiv from './ListByFlipStarterRespnsiv ';

// style import
import '../style.scss';

const StarterList = () => (
  <div><div className="ListByFlipResponsiv"><ListByFlipStarterResponsiv /></div>
  <div className="ListByFlip"> <ListByFlipStarter /> </div>
  </div>
);

export default StarterList;
