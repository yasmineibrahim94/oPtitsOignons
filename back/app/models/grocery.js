/**
 * @typedef Grocery
 * @class
 * @property {string} name.required - the name of the list 
 */
class Grocery {
    id;
    name;

    constructor(data) {
        for (const prop in data) {
            this[prop] = data[prop];
        }
    }
}

module.exports = Grocery;