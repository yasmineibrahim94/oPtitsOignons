
/**
 * @typedef Recipe
 * @model
 * @property {string} name.required.required - the name of the recipe
 * @property {string} prepare_time - time to prepare 00:00:00
 * @property {string} cooking_time - time to cook 00:00:00
 * @property {string} image - url image of the recipe 
 * @property {number} part_number.required - number of parts
 * @property {string} part_type.required  - unit or per personne
 * @property {boolean} share.required - public or private (true or false) 
 * @property {number} category_id.required - the category of the recipe
 * @property {number} user_id.required - the creator of the recipe
 * @property {string} description - the description of the recipe
 * @property {number} difficulty_id.required - the difficulty of the recipe
 * @property {array.<label>} label.required -  the ingredients
 * @property {array.<mesure_unit>} mesure_unit.required -  the luser unit of the ingredients
 * @property {array.<allergy_id>} allergy_id.required -  the id of ingredient's allergy
 * @property {array.<quantity>} quantity.required -  the quantity of the ingredient
 * @property {array.<reviews>} reviews - the reviews of the recipe
 */
class Recipe {
    id;
    name;
    prepare_time;
    cooking_time;
    image;
    part_number;
    part_type;
    share;
    category_id;
    user_id;
    description;
    difficulty_id;
    difficulty;
    ingredient;
    ingredient_id;
    mesure_unit;
    allergy_id;
    allergie;
    quantity;
    reviews;

    constructor(data) {
        for (const prop in data) {
            this[prop] = data[prop];
        }
    }
}

module.exports = Recipe;
