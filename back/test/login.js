require('dotenv').config();
const { expect } = require('chai');
const db = require('../app/database');
const userController = require('../app/controllers/userController');


const theIds = {};

describe('', function() {

    before(async function() {

            {
                const {rows} = await db.query(``, ['', '']);

            theIds.user = rows[0].id;
            }

    });

    after(async function() {
        // avant les tests, on insère des données de test
        // donc après, on nettoie
        
    });

    describe('getRecipe()', function() {

        it('should fetch ', async function() {
            
            expect().not.to.have.property('error');
        });
    });
});