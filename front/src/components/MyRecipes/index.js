import React from 'react';

// import local

import MyRecipesFlip from './MyRecipesFlip';
import MyRecipesFlipResponsiv from './MyRecipesFlipResponsiv';

const MyRecipes = () => (
  <div>
      <div className="ListByFlip"><MyRecipesFlip /></div>
      <div className="ListByFlipResponsiv"> <MyRecipesFlipResponsiv /></div>
  </div>
);

export default MyRecipes;
