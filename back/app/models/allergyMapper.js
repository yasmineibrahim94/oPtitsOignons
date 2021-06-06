
const db = require('../database');


const allergyMapper = {

getAllAllergies: async () => {

    const query = ` SELECT * 
        FROM "allergy";
        `

    try {
        const { rows } = await db.query(query);
        const allergies = rows;

        if (!allergies) {
            throw new Error("Aucune allergies trouvée");
        } else {
            return allergies;
        }
    }catch (err) {
        throw new Error(err.message);
    }

},

};

module.exports = allergyMapper ;