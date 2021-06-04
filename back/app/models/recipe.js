
/**
 * @typedef Recipe
 * @model
 * @property {string} name.required.required - the name of the recipe
 * @property {string} prepareTime - time to prepare 00:00:00
 * @property {string} cookingTime - time to cook 00:00:00
 * @property {string} image - url image of the recipe 
 * @property {number} partNumber.required - number of parts
 * @property {string} partType.required  - unit or per personne
 * @property {boolean} share.required - public or private (true or false) 
 * @property {number} categoryId.required - the category of the recipe
 * @property {number} userId.required - the creator of the recipe
 * @property {string} description - the description of the recipe
 * @property {number} difficultyId.required - the difficulty of the recipe
 * @property {array.<ingredient>} ingredient.required -  the ingredients
 * @property {array.<mesure_unit>} mesureUnit.required -  the luser unit of the ingredients
 * @property {array.<allergy_id>} allergyieId.required -  the id of ingredient's allergy
 * @property {array.<quantity>} quantity.required -  the quantity of the ingredient
 * @property {array.<reviews>} reviews - the reviews of the recipe
 */
class Recipe {
    id;
    name;
    prepareTime;
    cookingTime;
    image;
    partNumber;
    partType;
    share;
    categoryId;
    userId;
    description;
    difficultyId;
    difficulty;
    ingredient;
    ingredientId;
    mesureUnit;
    quantity;
    allergie;
    allergyieId;
    reviews;

    set prepare_time(val){
        this.prepareTime = val;
    };
    set cooking_time(val){
        this.cookingTime = val;
    };
    set part_number(val){
        this.partNumber = val;
    };
    set part_type(val){
        this.partType = val;
    };
    set category_id(val){
        this.categoryId = val;
    };
    set user_id(val){
        this.userId = val;
    };
    set difficulty_id(val){
        this.difficultyId = val;
    };
    set ingredient_id(val){
        this.ingredientId = val;
    };
    set mesure_unit(val){
        this.mesureUnit = val;
    };
    set allergie_id(val){
        this.allergyieId = val;
    };

    constructor(data) {
        for (const prop in data) {
            this[prop] = data[prop];
        }
    }
}

module.exports = Recipe;
