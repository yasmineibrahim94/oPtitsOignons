const db = require('../database');


const categoryMapper = {
    /**
     * find all categories
     * @returns {Array} json
     */
    getAllCategories: async () => {

        const query = ` SELECT * 
            FROM "category";
            `

        try {
            const { rows } = await db.query(query);
            const categories = rows;

            if (!categories) {
                throw new Error("Aucune catégorie trouvée");
            } else {
                return categories;
            }
        }catch (err) {
            throw new Error(err.message);
        }

    },
    /**
     * find one category
     * @param {number} id - the id of the category
     * @returns {Array} json
     */
    getOneCategory: async (id) => {
        
        const query = ` SELECT * 
            FROM "category"
            WHERE id = $1;
            `;

        const data = [id]

        try {
            const { rows } = await db.query(query, data);
            const category = rows[0];

            if (!category) {
                throw new Error("Aucune catégorie trouvée pour cette id =>" , id);
            } else {
                return category;
            }
        }catch (err) {
            throw new Error(err.message);
        }
    },

    /**
     * find all recipes of the category
     * @param {number} id - the id of the category
     * @returns {Array} json
     */
    getRecipesByCategory: async (id) => {
        const query = ` SELECT * 
            FROM "recipe"
            WHERE category_id = $1;
            `;

        const data = [id]

        try {
            const { rows } = await db.query(query, data);
            const categoryRecipes = rows;

            if (!categoryRecipes) {
                return "Aucune recette pour cette catégorie id =>" , id;
            } else {
                return categoryRecipes;
            }
        }catch (err) {
            throw new Error(err.message);
        }
    },

    /**
     * find all categories of the user
     * @param {number} id - id of the user
     * @returns {Array} json
     */
    getCategoryByUser: async (id) => {
        const data = [id];

        const query = `
        SELECT DISTINCT category."name" 
        FROM "user"
        JOIN recipe ON "user_id" = "user".id
        JOIN category ON category.id = category_id
        WHERE "user".id = $1 ;
        `;

        try {
            const { rows } = await db.query(query, data);
            const categories = rows;

            if (!categories) {
                return "Aucune catégorie trouvée";
            } else {
                return categories;
            }
        }catch (err) {
            throw new Error(err.message);
        }
    },
    getAllDifficulty: async () => {
        const query = ` SELECT * 
            FROM "difficulty";
            `

        try {
            const { rows } = await db.query(query);
            const difficulty = rows;

            if (!difficulty) {
                throw new Error("Aucune difficulty trouvée");
            } else {
                return difficulty;
            }
        }catch (err) {
            throw new Error(err.message);
        }

    }
}

module.exports = categoryMapper;