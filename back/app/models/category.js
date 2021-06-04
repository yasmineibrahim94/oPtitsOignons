/**
 * @typedef Category
 * @class
 * @property {string} name.required - the name of the category 
 */
class Category {
    id;
    name;

    constructor(data) {
        for (const prop in data) {
            this[prop] = data[prop];
        }
    }
}

module.exports = Category;