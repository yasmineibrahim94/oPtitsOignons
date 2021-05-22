/**
 * @typedef Ingredient
 * @model
 * @property {array.<ingredient>} ingredient -  the ingredients
 * @property {array.<mesure_unit>} mesure_unit -  the luser unit of the ingredients
 * @property {array.<allergy_id>} allergy_id -  the id of ingredient's allergy
 * @property {array.<quantity>} quantity -  the quantity of the ingredient
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