require('dotenv').config();
const { expect } = require('chai');
const db = require('../app/database');
const RecipeMapper = require('../app/models/recipeMapper');
const Recipe = require('../app/models/recipe')
const { recipeSchema} = require('../app/schemas/recipe');

const theIds = {};
let recipeSchemaTest;

describe('recipe schema', function () {
    
    before(function () {

        recipeSchemaTest = {
            name: "la tarte citron ",
            prepare_time: "00:15:00",
            cooking_time: "00:10:00",
            image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.pratique.fr%2Fimages%2Funsized%2Fta%2Ftarte-citron.jpg&f=1&nofb=1",
            part_number: 1,
            part_type: "tarte",
            share: "true",
            category_id: 2,
            description: "ouvent complétée par une meringue et devient alors une tarte au citron meringuée.",
            difficulty_id: 2,
            label: ["citron", "creme", "piment"],
            mesure_unit: ["U", "ml", "kg"],
            allergy_id: [null, 7, null],
            quantity: [1, 250, 2]
        };
    });

    it('should validate a valid recipe', function () {

        expect(recipeSchema.validate(recipeSchemaTest)).not.to.have.property('error');

    });

    it('should not validate a user with no name', function () {

        recipeSchemaTest.name = null;

        const valid = recipeSchema.validate(recipeSchemaTest);

        recipeSchemaTest.name = "la tarte citron";

        expect(valid).to.have.property('error');
    });

    it('should not validate recipe part number as a string', function () {


        recipeSchemaTest.part_number = "vingt deux";

        const valid = recipeSchema.validate(recipeSchemaTest);

        recipeSchemaTest.part_number = 1;

        expect(valid).to.have.property('error');
        expect(valid.error.details[0].path[0]).to.equal('part_number')
    });

    it('should not validate a recipe with no difficulty_id', function () {


        recipeSchemaTest.difficulty_id = null;

        const valid = recipeSchema.validate(recipeSchemaTest);

        recipeSchemaTest.difficulty_id = 2;

        expect(valid).to.have.property('error');
        expect(valid.error.details[0].path[0]).to.equal('difficulty_id')
    });

    it('should not validate a recipe with share != boolean', function () {


        recipeSchemaTest.share = "public";

        const valid = recipeSchema.validate(recipeSchemaTest);

        recipeSchemaTest.share = true;

        expect(valid).to.have.property('error');
        expect(valid.error.details[0].path[0]).to.equal('share')
    });
});

let theUserId; 

describe('recipe mapper', function() {

    before(async function() {

        // create a new user just for the test
        {
            const {rows} = await db.query(`
            INSERT INTO "user" (email, password, image, pseudo)
            VALUES ($1, $2, $3, $4) 
            RETURNING id;`,
            ["testmsssochamail@gmail.fr"," pEaefsfs122zz" , "mocha.jpg", "testmochsssapseudo"]);

        theUserId = rows[0].id;
    };
            {
                const {rows} = await db.query(`
                INSERT INTO recipe (name, prepare_time, cooking_time, image, part_number, part_type, share, category_id, user_id, description, difficulty_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10 , $11)
                RETURNING id;`,
                ['mocha', '00:00:00','00:00:00',"une image", 4, "personne", true , 2 , theUserId , "description", 1 ]);

            theIds.recipe = rows[0].id;
        }

            {
                const {rows} = await db.query(`
                INSERT INTO ingredient (label, mesure_unit, allergy_id) 
                VALUES ($1,$2,$3) 
                RETURNING id;`,
                ['mocha', 'ml',2]);

            theIds.ingredient = rows[0].id;
        }

            {
                const {rows} = await db.query(`
                INSERT INTO quantity (recipe_id, ingredient_id, quantity) 
                VALUES ($1, $2, $3) 
                RETURNING id;`,
                [ theIds.recipe, theIds.ingredient,23]);

            theIds.quantity = rows[0].id;
        }

    });

    after(async function() {
        
        // delete the facke data

        {await db.query('DELETE FROM quantity WHERE id = $1;', [theIds.quantity])};
        {await db.query('DELETE FROM ingredient WHERE id = $1;', [theIds.ingredient])};
        {await db.query('DELETE FROM recipe WHERE id = $1;', [theIds.recipe])};
        {await db.query('DELETE FROM "user" WHERE id = $1;', [theUserId])};
    });

    describe('getRecipe()', function() {

        it('should fetch an instance of recipe', async function() {
            const theRecipe = await RecipeMapper.getRecipe(theIds.recipe);

            expect(theRecipe).not.to.have.property('error');
        });
    });
});