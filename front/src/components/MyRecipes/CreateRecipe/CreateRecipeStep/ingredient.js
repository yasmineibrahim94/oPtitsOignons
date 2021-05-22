import React from "react";
import axiosRequest from "../axiosRecipe/axiosRequest";

const allergies = [];
(async () => {
  const response = await axiosRequest.getAllergies(); 
  return allergies.push(response);
})();

let counterIngredient = 1;

allergies.forEach(element => {
    
    <div className="CreateRecipe_Bottom">
      <div className="ingredientsListContainer">
        <div className="ingredientsList">
          <div className="CreateRecipe_ingredients_container">
            <div id="CreateRecipe_ingredient_li"> </div>
            <div>
              <button type="submit" className="CreateRecipe_ingredient_Button" onClick={addIngredient}>
                ajouter un ingredient
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    counterIngredient += 1;
});
addIngredient=() => {
    
 
};


export default addIngredient;