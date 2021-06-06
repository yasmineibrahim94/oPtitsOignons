require('dotenv').config();
const { expect } = require('chai');
const db = require('../app/database');
const RecipeMapper = require('../app/models/recipeMapper');
const theIds = {};

describe('recipe mapper', function() {

    before(async function() {

            {
                const {rows} = await db.query('INSERT INTO recipe (name, prepare_time, cooking_time, image, part_number, part_type, share, category_id, user_id, description, difficulty_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10 , $11)  RETURNING id;', ['mocha', '00:00:00','00:00:00',"une image", 4, "personne", true , 2 , 13 , "description", 1 ]);

            theIds.recipe = rows[0].id;
        }

            {
                const {rows} = await db.query(' INSERT INTO ingredient (label, mesure_unit, allergy_id) VALUES ($1,$2,$3) RETURNING id;', ['mocha', 'ml',2]);

            theIds.ingredient = rows[0].id;
        }

            {
                const {rows} = await db.query('INSERT INTO quantity (recipe_id, ingredient_id, quantity) VALUES ($1, $2, $3) RETURNING id;',[ theIds.recipe, theIds.ingredient,23]);

            theIds.quantity = rows[0].id;
        }

    });

    after(async function() {
        // avant les tests, on insère des données de test
        // donc après, on nettoie

        {await db.query('DELETE FROM quantity WHERE id = $1;', [theIds.quantity])};

        {await db.query('DELETE FROM ingredient WHERE id = $1;', [theIds.ingredient])};

        {await db.query('DELETE FROM recipe WHERE id = $1;', [theIds.recipe])};

    });

    describe('getRecipe()', function() {

        it('should fetch an instance of recipe', async function() {
            const theRecipe = await RecipeMapper.getRecipe(theIds.recipe);
            expect(theRecipe).not.to.have.property('error');
        });
    });
});