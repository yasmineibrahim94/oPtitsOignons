require('dotenv').config();
const { expect } = require('chai');
const db = require('../app/database');
const userMapper = require('../app/models/userMapper');
const { userSchema } = require('../app/schemas/user');
let theUser= {};
let userSchemaTest;


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
        
        userSchemaTest.confirmPassword= "azo1Akdazo";

        expect(valid).to.have.property('error');
        expect(valid.error.details[0].path[0]).to.equal('confirmPassword');
    });

    it('should not validate a user with an unvalid password', function () {

        // password valid must have upercase, lowercase, number 
        // and have more than 8 character lenght 
        userSchemaTest.confirmPassword = "badpassword";
        userSchemaTest.password = "badpassword";

        const valid = userSchema.validate(userSchemaTest);

        userSchemaTest.password = "azo1Akdazo";
        userSchemaTest.confirmPassword = "azo1Akdazo";

        expect(valid).to.have.property('error');
        expect(valid.error.details[0].path[0]).to.equal('password');
    });

    it('should not validate a user with an unvalid email', function () {


        userSchemaTest.email = "bad_email";

        const valid = userSchema.validate(userSchemaTest);

        userSchemaTest.email = "coucou@gmail.com";
        
        expect(valid).to.have.property('error');
        expect(valid.error.details[0].path[0]).to.equal('email');
    });

    it('should not validate a user with no pseudo', function () {

        userSchemaTest.confirmPassword = "";

        const valid = userSchema.validate(userSchemaTest);

        userSchemaTest.confirmPassword = "azo1Akdazo",

        expect(valid).to.have.property('error');
        expect(valid.error.details[0].path[0]).to.equal('confirmPassword');
    });
});


describe('user mapper', function() {

    before(async function() {

            {
                const {rows} = await db.query(`
        
                INSERT INTO "user" (email, password, image, pseudo)
                VALUES ($1, $2, $3, $4) 
                RETURNING *;`,
                ["testmochgfamail@gmail.fr"," pEaefsfs122zz" , "mocha.jpg", "testmogfchapseudo"]);

            theUser.email = rows[0].email;
            theUser.password = rows[0].password;

            };
    });

    after(async function() {

        // delete the facke data
        {await db.query('DELETE FROM "user" WHERE email = $1;', [theUser.email])};

    });

    describe('getUser()', function() {

        it('should fetch an instance of user', async function() {
            const user = await userMapper.getUser(theUser);
            expect(user).not.to.have.property('error');
        });
    });
});