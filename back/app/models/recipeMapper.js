
const db = require('../database');
const Recipe = require('../models/recipe');

const recipeMapper = {
    /**
         * find one recipe
         * @param {number} id - the id of the recipe
         * @returns {Array} json
         */
    getRecipe: async (id) => {

        const data = [id];
        const qry = ` SELECT DISTINCT 
                        recipe.*, 
                        difficulty.label as difficulty ,
                        array_agg(ingredient.label  ) as ingredient,
                        array_agg(ingredient.id) as ingredient_id,
                        array_agg(ingredient.mesure_unit) as mesure_unit,
                        array_agg(quantity.quantity ) as quantity, 
                        array_agg(allergy.label ) as allergie ,
                        array_agg(allergy.id) as allergie_id,
                        ROUND(AVG(review.rate)) as rate
                    FROM recipe
                    LEFT OUTER JOIN quantity ON recipe.id = quantity.recipe_id
                    LEFT OUTER JOIN ingredient ON ingredient.id = quantity.ingredient_id
                    LEFT OUTER JOIN allergy ON allergy.id = ingredient.allergy_id
                    LEFT OUTER JOIN difficulty ON difficulty.id = recipe.difficulty_id
                    LEFT OUTER JOIN review ON recipe.id = review.recipe_id
                    WHERE recipe.id = $1
                    GROUP BY recipe.id, difficulty.label;`;

        const query = `SELECT * FROM review WHERE recipe_id = $1;`;

        try {
            
            let { rows } = await db.query(qry, data);
            recipe = rows[0];
            // console.log(recipe)

            if (!recipe) {
                throw new Error(`No recipe for the id => ${id}`);
            }

            const reviews = await db.query(query, data);

            if (reviews[0]) {
                recipe.reviews = reviews.rows
            } else {
                recipe.reviews = "no reviews"
            };

            if (!rows[0].rate) {
                recipe.rate = "no rate"
            };

            return new Recipe(recipe);
            // return recipe;

        } catch (err) {
            throw new Error(err.message);
        }
    },
    /**
         * find all recipes
         * @returns {Array} json
         */
    getAllRecipes: async (where) => {

        if (!where) {
            where = " ";
        } else {
            where = 'WHERE share = true'
        };

        const qry = ` SELECT DISTINCT 
                            recipe.*, 
                            difficulty.label as difficulty ,
                            array_agg(ingredient.label) as ingredient,
                            array_agg(ingredient.mesure_unit) as mesure_unit,
                            array_agg(quantity.quantity) as quantity, 
                            array_agg(allergy.label) as allergie,
                            array_agg(allergy.id) as allergie_id,
                            ROUND(AVG(review.rate)) as rate
                        FROM recipe
                        LEFT OUTER JOIN quantity ON recipe.id = quantity.recipe_id
                        LEFT OUTER JOIN ingredient ON ingredient.id = quantity.ingredient_id
                        LEFT OUTER JOIN allergy ON allergy.id = ingredient.allergy_id
                        LEFT OUTER JOIN difficulty ON difficulty.id = recipe.difficulty_id
                        LEFT OUTER JOIN review ON recipe.id = review.recipe_id
                        ${where}
                        GROUP BY recipe.id, difficulty.label;
                    `;

        try {
            const { rows } = await db.query(qry);
            const recipes = rows;

            if (!recipes) {
                throw new Error("pas encore de recette sur ce site");
            } else {

                return recipes.map(recipe => new Recipe(recipe));
            }

        } catch (err) {
            throw new Error(err.message);
        }
    },

    /**
     * find the public recipes
     */
    getAllPublicRecipes: async () => {

        let isSharing = true;

        try {
            // chose dynamically the public recipes
            const recipes = await recipeMapper.getAllRecipes(isSharing);
            //console.log(recipes)
            if (!recipes) {
                throw new Error("no public recipes");
            } else {
                return new Recipe(recipe);
                // return recipes;
            }
        } catch (err) {
            throw new Error(err.message);
        }
    },

    /**
     * add new recipe     
     * @param {Object} theRecipe - the recipeModel in request.body
     * @param {Array} ingredient - the ingredients of the recipe
    */
    save: async (theRecipe, ingredient) => {
        // therecipe = all recipe info for the db table
        const data = [
            theRecipe.name,
            theRecipe.prepare_time,
            theRecipe.cooking_time,
            theRecipe.image,
            theRecipe.part_number,
            theRecipe.part_type,
            theRecipe.share,
            theRecipe.category_id,
            theRecipe.user_id,
            theRecipe.description,
            theRecipe.difficulty_id,
        ];
        const ingredients = [];
        // on boucle sur les ingredients
        for (let i = 0; i < ingredient[0].length; i++) {
            ingredients.push([ingredient[0][i], ingredient[1][i], ingredient[2][i], ingredient[3][i]]);
        }

        try {
            const qry = ` 
                INSERT INTO recipe (name, prepare_time, cooking_time, image, part_number, part_type, share, category_id, user_id, description, difficulty_id)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10 , $11) 
                RETURNING id;
                `;
            // insére la recette et récupérer son id
            const { rows } = await db.query(qry, data);
            theRecipe.id = rows[0].id;

            const ingredientId = [];
            const quantity = [];

            for (let y = 0; y < ingredients.length; y++) {
                const data = [ingredients[y][0], ingredients[y][1], ingredients[y][2]];
                quantity.push(ingredients[y][3]);

                const query =
                    `
                INSERT INTO ingredient (label, mesure_unit, allergy_id)
                VALUES ($1,$2,$3)
                RETURNING id;`;
                const { rows } = await db.query(query, data)
                ingredientId.push(rows[0].id)
            };
            // add quantity

            for (let z = 0; z < ingredientId.length; z++) {
                const query = `INSERT INTO quantity (recipe_id, ingredient_id, quantity)
                VALUES ($1, $2, $3);`
                const data = [theRecipe.id, ingredientId[z], quantity[z]]
                await db.query(query, data)

            }

            return recipeMapper.getRecipe(theRecipe.id);

        } catch (err) {
            throw new Error(err);
        }

    },
    /**
     * copy the recipe from an other user
     * @param {Number} recipeId 
     * @param {Number} userid 
     */
    copyRecipe: async (recipeId, userid) => {

        // id = id de la recette
        // data = les ingredients
        let originalRecipe = await recipeMapper.getRecipe(recipeId);

        console.log(originalRecipe.user_id)
        const userId = parseInt(userid, 10);
        console.log(originalRecipe)
        const recipe = {
            name: originalRecipe.name,
            prepare_time: originalRecipe.prepare_time,
            cooking_time: originalRecipe.cooking_time,
            image: originalRecipe.image,
            part_number: originalRecipe.part_number,
            part_type: originalRecipe.part_type,
            share: originalRecipe.share,
            category_id: originalRecipe.category_id,
            user_id: userId,
            description: originalRecipe.description,
            difficulty_id: originalRecipe.difficulty_id
        };
        console.log(recipe)
        const ingredient = [];
        ingredient.push(originalRecipe.ingredient, originalRecipe.mesure_unit, originalRecipe.allergie_id, originalRecipe.quantity);
        console.log(ingredient)
        await recipeMapper.save(recipe, ingredient);

    },
    /**
     * update the public visibility of the recipe
     * @param {Number} id - the is of the recipe
     * @param {Boolean} share - the visibility of the recipe
     */
    update: async (id, share) => {

        const query = `
        UPDATE recipe set  
        share = $2
        WHERE id = $1;
        `;

        const data = [id, share];

        try {
            await db.query(query, data);

        } catch (err) {
            throw new Error(err);
        }

    },

    /**
     * update the recipe dynamically
     * @param {Number} id - the id of the recipe
     * @param {Object} data - the recipe's items to modify
     * @returns {Array} the new recipe
     */
    updateRecipe: async (id, data) => {

        try {
            const newData = data
            for (const key in data) {

                const newKey = key;

                const query = `
                    UPDATE recipe set  
                    ${key} = $1
                    WHERE id = $2; 
                    `;
                await db.query(query, [newData[newKey], id]);
            };

            return recipeMapper.getRecipe(id);

        } catch (err) {
            throw new Error(err);
        }
    },
    /**
     * delete one recipe only if it's the user's recipe
     * @param {number} id - the recipe id
     * @param {number} userId - the user id 
     */
    delete: async (id, userId) => {

        // verify if the user is the recipe's owner
        const recipe = await recipeMapper.getRecipe(id);
        if (recipe.user_id != userId) {
            return 'cette recette ne vous appartient pas, vous ne pouvez pas la suprimer'
        }
        const data = id;
        //console.log('recipe del', recipe)
        //console.log('recipe.ingredient_id', recipe.ingredient_id)
        try {
            // quantity del
            await db.query(`DELETE FROM quantity 
                                WHERE recipe_id = $1;`, [data]);

            // ingredient del
            recipe.ingredient_id.forEach(async element => {
                await db.query(`DELETE FROM ingredient 
                WHERE id = $1;`, [element])
            });

            // recipe del
            await db.query(` 
                DELETE FROM recipe
                WHERE id = $1;
                `, [data]);

            return `la recette id ${id} a été suprimée`

        } catch (err) {
            throw new Error(err);
        }
    },

    patch: async (recipeId, userId, data) => {

        try {

            // Old values of the recipe
            let originalRecipe = await recipeMapper.getRecipe(recipeId);

            console.log(originalRecipe.user_id, userId);

            if (originalRecipe.user_id != userId) {

                return 'Vous n\'êtes pas le propiétaire de cette recette';
            }

            // New values of the recipe          
            const { ingredient, mesure_unit, allergie_id, quantity } = data;

            // remove quantity
            await db.query(`DELETE FROM quantity  WHERE recipe_id = $1;`, [recipeId]);

            const ingredientId = [];

            for (let i = 0; i < ingredient.length; i++) {

                // remove ingredients
                await db.query(`DELETE FROM ingredient 
            WHERE id = $1;`, [originalRecipe.ingredient_id[i]]);

                let data = [ingredient[i], mesure_unit[i], allergie_id[i]]
                let query =
                    `
                INSERT INTO ingredient (label, mesure_unit, allergy_id)
                VALUES ($1,$2,$3)
                RETURNING id;`;
                const { rows } = await db.query(query, data)
                ingredientId.push(rows[0].id);
            };

            for (let i = 0; i < ingredientId.length; i++) {
                const query = `INSERT INTO quantity (ingredient_id, recipe_id , quantity)
                VALUES ($1, $2, $3);`
                const data = [ingredientId[i], recipeId, quantity[i]]
                await db.query(query, data);
            }

        } catch (err) {
            throw new Error(err);
        }
        return recipeMapper.getRecipe(recipeId);
    }

}

module.exports = recipeMapper;