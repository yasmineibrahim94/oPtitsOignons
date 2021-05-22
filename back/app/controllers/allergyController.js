const allergyMapper = require("../models/allergyMapper");

const allergyController = {

    allergies: async (request, response) => {

        try {

            const allergies = await allergyMapper.getAllAllergies();
            response.json(allergies);

        } catch (err) {
            response.status(404).json(err.message);
        }
    },
}
module.exports  = allergyController;