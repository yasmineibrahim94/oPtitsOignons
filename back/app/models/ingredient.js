/**
 * @typedef Ingredient
 * @model
 * @property {array.<ingredient>} ingredient.required -  the ingredients
 * @property {array.<mesure_unit>} mesure_unit.required -  the luser unit of the ingredients
 * @property {array.<allergy_id>} allergy_id.required -  the id of ingredient's allergy
 * @property {array.<quantity>} quantity.required -  the quantity of the ingredient
 */
class Ingredient {
    ingredient;
    mesure_unit;
    allergy_id;
    quantity;

    constructor(data) {
        for (const prop in data) {
            this[prop] = data[prop];
        }
    }
}

module.exports = Ingredient;