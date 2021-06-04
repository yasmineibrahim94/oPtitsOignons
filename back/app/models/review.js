/**
 * @typedef Review
 * @class
 * @property {number} user_id.required - the creator of the recipe
 * @property {number} recipe_id.required - the creator of the recipe
 * @property {string} content - the description of the recipe
 * @property {string} date.required - date de creation
 * @property {number} rate - the rate of the recipe
 */
class Review {
    id;
    content;
    rate;
    date;
    userId;
    recipeId;

    set user_id(val){
        this.userId = val
    };
    set recipe_id(val){
        this.recipeId = val
    };

    constructor(data) {
        for (const prop in data) {
            this[prop] = data[prop];
        }
    }
}

module.exports = Review;
