
const db = require('../database');

const userMapper = {

    /**
     * verify if user already exist in the BDD
     * @param {string} email - the email sending by the futur user 
     * @returns {Array} if the user exist
     * @returns {Error} if the user doesn't exist
     */
    verify: async (email) => {
        const query = ` 
            SELECT * 
            FROM "user" 
            WHERE "email" = $1;
            `;

        const data = [email];
        
        try {
            const { rows } = await db.query(query, data);
            const user = rows[0];

            if (!user) {
                return;
            } else {
                return user;
            }
        } catch (err) {
            throw new Error(err.message);
        }
    },
    /**
     * verify if an existing user has correct identification data and connect it
     * @param {object} theUser - the userModel in the req.body
     * @returns {Array} user - the recipeModel in request.body
    */
    getUser: async (theUser) => {

        const data = [
            theUser.email,
            theUser.password
        ];

        const qry = `
        SELECT * 
            FROM "user" 
            WHERE email = $1 
            AND password = $2;
            `;

        try {
            const { rows } = await db.query(qry, data);
            const user = rows[0];

            if (!user) {
                throw new Error("incorrectes values .");
            } else {
                return user;
            }

        } catch (err) {
            throw new Error(err.message);
        }

    },

    /**
     * add new user    
     * @param {Object} theUser - the userModel in request.body
    */
    save: async (theUser) => {

        // toutes les données en commun sont préparées
        const data = [
            theUser.email,
            theUser.password,
            theUser.image,
            theUser.pseudo
        ];

        const qry = `
        
                INSERT INTO "user" (email, password, image, pseudo)
                VALUES ($1, $2, $3, $4) 
                RETURNING id;
            `;

        try {
            // insert user and returning his id
            const { rows } = await db.query(qry, data);

            theUser.id = rows[0].id;

        } catch (err) {
            throw new Error(err);
        }

    },

    editUser: async (id, data) => {

        try {
            const newData = data
            for (const key in data) {

                const newKey = key;

                const query = `
                
                    UPDATE "user" set  
                    ${key} = $1
                    WHERE id = $2;
                `;
                await db.query(query, [newData[newKey], id]);
            };
            return userMapper.findOneUser(id);

        } catch (err) {
            throw new Error(err);
        }

    },

    /**
     * find one user
     * @param {number} id - the id of the user
     * @returns {Array} json
     */
    findOneUser: async (id) => {
        const query = `SELECT * 
            FROM "user"

            WHERE id = $1;`;

        const data = [id]

        try {
            const { rows } = await db.query(query, data);
            const user = rows[0];

            if (!user) {
                throw new Error(`no user for this id => ${id}`);
            } else {
                return user;
            }
        } catch (err) {
            throw new Error(err.message);
        }
    },

    /**
     * find all user
     * @returns {Array} json
     */
    findAllUser: async () => {
        const query = `SELECT * 
            FROM "user";`

        try {
            const { rows } = await db.query(query);
            user = rows;

            if (!user) {
                throw new Error("No user found");
            } else {
                return user;
            }
        } catch (err) {
            throw new Error(err.message);
        }
    },

    /**
     * find all user's resipes
     * @param {number} id - the id of the user
     * @returns {Array} json
     * ! ajouter les infos
     */
    recipeByUser: async (id) => {

        const data = [id]

        const query = ` SELECT DISTINCT 
                            recipe.*, 
                            difficulty.label as difficulty ,
                            array_agg(ingredient.label) as ingredient,
                            array_agg(ingredient.mesure_unit ) as mesure_unit,
                            array_agg(quantity.quantity ) as quantity, 
                            array_agg(allergy.label ) as allergie,
                            array_agg(allergy.id) as allergie_id
                        FROM recipe
                        LEFT OUTER JOIN quantity ON recipe.id = quantity.recipe_id
                        LEFT OUTER JOIN ingredient ON ingredient.id = quantity.ingredient_id
                        LEFT OUTER JOIN allergy ON allergy.id = ingredient.allergy_id
                        LEFT OUTER JOIN difficulty ON difficulty.id = recipe.difficulty_id
                        WHERE "user_id" = $1
                        GROUP BY recipe.id, difficulty.label;`;

        try {
            const { rows } = await db.query(query, data);
            usersRecipe = rows;

            if (!usersRecipe) {
                throw new Error("No user found");
            } else {
                return usersRecipe;
            }
        } catch (err) {
            throw new Error(err.message);
        }
    }
}

module.exports = userMapper;