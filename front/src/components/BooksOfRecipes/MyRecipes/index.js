import React from 'react';

// composants import
import MyRecipesFlip from './MyRecipesFlip';
import MyRecipesFlipResponsiv from './MyRecipesFlipResponsiv';

// style import
import '../style.scss';

const MyRecipes = () => (
  <div>
      <div className="ListByFlip"><MyRecipesFlip /></div>
      <div className="ListByFlipResponsiv"> <MyRecipesFlipResponsiv /></div>
  </div>
);

export default MyRecipes;
