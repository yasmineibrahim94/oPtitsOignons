require('dotenv').config();
const { expect } = require('chai');
const db = require('../app/database');
const reviewsSchema = require('../app/schemas/reviews');
const ReviewMapper = require('../app/models/reviewMapper');
const theIds = {};

let reviewsSchemaTest;

describe('review schema', function () {

    before(function () {

        reviewsSchemaTest = {
            rate: 2,
            content: "une recette null"
        };
    });

    it('should validate a valid review', function () {

        expect(reviewsSchema.validate(reviewsSchemaTest)).not.to.have.property('error');

    });

    it('should not validate review with no rate', function () {

        reviewsSchemaTest.rate = "";

        const valid = reviewsSchema.validate(reviewsSchemaTest);


        expect(valid).to.have.property('error');
        expect(valid.error.details[0].path[0]).to.equal('rate');
    });

    it('should not validate review rate as a string', function () {

        reviewsSchemaTest.rate = "trois";

        const valid = reviewsSchema.validate(reviewsSchemaTest);

        expect(valid).to.have.property('error');
        expect(valid.error.details[0].path[0]).to.equal('rate');
    });

});

let theUserId; 
let theRecipeId;

describe('review mapper', function () {

    before(async function () {

        // create a new user just for the test
        {
            const { rows } = await db.query(`
            INSERT INTO "user" (email, password, image, pseudo)
            VALUES ($1, $2, $3, $4) 
            RETURNING id;`, 
            ["mochamail@gmail.fr", " pEaefsfs122zz", "mocha.jpg", "mochapseudo"]);

            theUserId = rows[0].id;
        };

        // create new recipe just for test
        {
            const {rows} = await db.query(`
            INSERT INTO recipe (name, prepare_time, cooking_time, image, part_number, part_type, share, category_id, user_id, description, difficulty_id) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10 , $11)  
            RETURNING id;`, 
            ['mocha', '00:00:00','00:00:00',"une image", 4, "personne", true , 2 , theUserId , "description", 1 ]);

            theRecipeId = rows[0].id;
        };

        {
            const { rows } = await db.query(`  
                INSERT INTO "review" (content, rate, "user_id", "recipe_id" )
                VALUES ($1, $2, $3, $4) 
                RETURNING *;`, 
                ["super", 5, theUserId, theRecipeId]);

            theIds.review = rows[0].id;
        }
    });

    after(async function () {

        // delete the facke data

        { await db.query('DELETE FROM review WHERE id = $1;', [theIds.review]) };
        {await db.query('DELETE FROM recipe WHERE id = $1;', [theRecipeId])};
        { await db.query('DELETE FROM "user" WHERE id = $1;', [theUserId]) };
    });

    describe('getReviewsByRecipe()', function () {

        it('should fetch an instance of review', async function () {
            const review = await ReviewMapper.getReviewsByRecipe(theRecipeId);
            expect(review[0].recipe_id).not.to.have.property(theRecipeId);
            expect(review[0].id).not.to.have.property(theIds.review);
        });
    });
});

