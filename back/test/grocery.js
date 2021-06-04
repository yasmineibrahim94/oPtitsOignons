require('dotenv').config();
const { expect } = require('chai');
const db = require('../app/database');
const groceryMapper = require('../app/models/groceryMapper');
const theIds = {};
const grocerySchema = require("../app/schemas/groceryList")
const groceryItemsSchema = require("../app/schemas/groceryItems")

let grocerySchemaTest;
let groceryItemsSchemaTest;

describe('grocery schema', function () {

    before(function () {

        grocerySchemaTest = {
            name: "ma super list"
        };
        groceryItemsSchemaTest = {
            name: "tomate"
        };

    });

    it('should validate a valid list', function () {

        expect(grocerySchema.validate(grocerySchemaTest)).not.to.have.property('error');

    });

    it('should validate a valid items', function () {

        expect(groceryItemsSchema.validate(groceryItemsSchemaTest)).not.to.have.property('error');

    });

    it('should not validate list with no name', function () {

        grocerySchemaTest.name = "";

        const valid = grocerySchema.validate(grocerySchemaTest);

        grocerySchemaTest.name = "ma liste";

        expect(valid).to.have.property('error');
        expect(valid.error.details[0].path[0]).to.equal('name');
    });

    it('should not validate items with no name', function () {

        groceryItemsSchemaTest.name = "";

        const valid = groceryItemsSchema.validate(groceryItemsSchemaTest);

        grocerySchemaTest.name = "tomate";

        expect(valid).to.have.property('error');
        expect(valid.error.details[0].path[0]).to.equal('name');
    });

    it('should not validate list name as a number', function () {

        grocerySchemaTest.name = 5;

        const valid = grocerySchema.validate(grocerySchemaTest);

        expect(valid).to.have.property('error');
        expect(valid.error.details[0].path[0]).to.equal('name');
    });

    it('should not validate items with no number', function () {

        groceryItemsSchemaTest.name = 5;

        const valid = groceryItemsSchema.validate(groceryItemsSchemaTest);

        expect(valid).to.have.property('error');
        expect(valid.error.details[0].path[0]).to.equal('name');
    });

});

let theUserId;

describe('grocery mapper', function () {

    before(async function () {

        // create a new user just for the test
        {
            const { rows } = await db.query(`
            INSERT INTO "user" (email, password, image, pseudo)
            VALUES ($1, $2, $3, $4) 
            RETURNING id;`, 
            ["mocha@gmail.fr", " pEaefsfs122zz", "mocha.jpg", "mocha"]);

            theUserId = rows[0].id;
        };

        {
            const { rows } = await db.query(`
            INSERT INTO grocery_list (user_id, name) 
            VALUES ($1, $2) RETURNING id;`, 
            [theUserId, "ma liste"])

            theIds.list = rows[0].id;
        };

        {
            const { rows } = await db.query(`
            INSERT INTO "grocery_item" (name, grocery_list_id)
            VALUES ($1, $2) RETURNING id;`, 
            ["tomate", theIds.list])

            theIds.item = rows[0].id;
        };

    });

    after(async function () {
        
        // delete the facke data

        {await db.query('DELETE FROM grocery_item WHERE id = $1;', [theIds.item])};
        {await db.query('DELETE FROM grocery_list WHERE id = $1;', [theIds.list])};
        {await db.query('DELETE FROM "user" WHERE id = $1;', [theUserId])};

    });

    describe('findList()', function () {

        it('should fetch an instance of grocery', async function () {
            const theList = await groceryMapper.findList(theUserId);
            expect(theList).not.to.have.property('error');
        });

        it('should fetch an item in grocery', async function () {
            const theList = await groceryMapper.findList(theUserId);
            expect(theList[0].items).to.have.property('tomate');
        });
    });
});