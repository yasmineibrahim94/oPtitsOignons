/**
 * user module
 * @typedef User
 * @class
 * @property {string} image - the image's url
 * @property {string} email.required - the user's email
 * @property {string} password.required - user's password
 * @property {string} confirmPassword.required - user's password
 * @property {string} pseudo.required - user's pseudo
 */
class User {
    id;
    email;
    password;
    confirmPassword;
    image;
    pseudo;
    groceryListId;

    set grocery_list_id(val){
        this.groceryListId = val;
    };
    
    constructor(data) {
        for (const prop in data) {
            this[prop] = data[prop];
        }
    }
}

module.exports = User;