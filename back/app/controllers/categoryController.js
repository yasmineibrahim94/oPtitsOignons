const categories = require('../models/category');
const categoryMapper = require("../models/categoryMapper");

const categoryController = {

    // Permet de s'enregistrer
    categories: async (request, response) => {

        try {

            const categories = await categoryMapper.getAllCategories();
            response.json(categories);

        } catch (err) {
            response.status(404).json(err.message);
        }
    },
    category: async (request, response) => {

        const { id } = request.params;
        //console.log(id)
        try {
            const categories = await categoryMapper.getOneCategory(id);
            response.json(categories);

        } catch (err) {
            response.status(404).json(err.message);
        }
    },
    recipesByCategory: async (request, response) => {
        const { id } = request.params;
        try {
            const userCategories = await categoryMapper.getRecipesByCategory(id);
            response.json(userCategories);
        } catch (err) {
            response.status(404).json(err.message);
        }
    },
    difficulty: async (request, response) => {
        try {

            const difficulty = await categoryMapper.getAllDifficulty();
            response.json(difficulty);

        } catch (err) {
            response.status(404).json(err.message);
        }
    }

    
};

module.exports = categoryController;