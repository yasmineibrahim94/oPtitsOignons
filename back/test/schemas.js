const { expect } = require('chai');


const { userSchema } = require('../app/schemas/user');
const { recipeSchema} = require('../app/schemas/recipe');
const reviewsSchema = require('../app/schemas/reviews');

let userSchemaTest;

let recipeSchemaTest;

let reviewsSchemaTest;


// USER
describe('user schema', function () {

    // préparer un contexte favorable à l'exécution des TU
    before(function () {

        // l'objet à valider
        userSchemaTest = {
            email: "coucou@gmail.com",
            password: "azo1Akdazo",
            confirmPassword: "azo1Akdazo",
            image: "aozkdoiajzdoiajd",
            pseudo: "test"
        };
    });

    

    it('should validate a valid user', function () {

        expect(userSchema.validate(userSchemaTest)).not.to.have.property('error');

    });

    it('should not validate a user with an password != confirmPassword', function () {

        userSchemaTest.confirmPassword = "badpassword";

        const valid = userSchema.validate(userSchemaTest);


        expect(valid).to.have.property('error');
    });

    it('should not validate a user with an unvalid password', function () {


        userSchemaTest.confirmPassword = "badpassword";
        userSchemaTest.password = "badpassword";

        const valid = userSchema.validate(userSchemaTest);


        expect(valid).to.have.property('error');
    });

    it('should not validate a user with an unvalid email', function () {


        userSchemaTest.email = "badeamil";

        const valid = userSchema.validate(userSchemaTest);

        expect(valid).to.have.property('error');
    });

    it('should not validate a user with no pseudo', function () {


        userSchemaTest.confirmPassword = "";
        const valid = userSchema.validate(userSchemaTest);
        expect(valid).to.have.property('error');
    });



});

// RECIPE
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


        expect(valid).to.have.property('error');
    });

    it('should not validate recipe part number as a string', function () {


        recipeSchemaTest.part_number = "vingt deux";

        const valid = recipeSchema.validate(recipeSchemaTest);


        expect(valid).to.have.property('error');
    });

    it('should not validate a recipe with no difficulty_id', function () {


        recipeSchemaTest.difficulty_id = null;

        const valid = recipeSchema.validate(recipeSchemaTest);

        expect(valid).to.have.property('error');
    });

    it('should not validate a recipe with share != boolean', function () {


        recipeSchemaTest.share = "public";
        const valid = recipeSchema.validate(recipeSchemaTest);
        expect(valid).to.have.property('error');
    });
});

// review
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

    });

    it('should not validate review rate as a string', function () {


        recipeSchemaTest.part_number = "trois";

        const valid = reviewsSchema.validate(recipeSchemaTest);


        expect(valid).to.have.property('error');
    });

});