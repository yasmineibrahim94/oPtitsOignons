import React from 'react';

import RecipeFlip from './RecipeFlip';
import RecipeFilpResponsiv from './RecipeFlipResponsiv';

const Recipe = () => (
  <div>
    <div className="RecipeFlip"><RecipeFlip /></div>
    <div className="RecipeFlipResponsiv"><RecipeFilpResponsiv /></div>
  </div>
);

export default Recipe;
