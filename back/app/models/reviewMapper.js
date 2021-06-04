
const db = require('../database');

const reviewMapper = {
    /**
         * find all reviews of the recipe
         * @param {number} theRecipe - the id of the recipe
         * @returns {Array} json
         */
    getReviewsByRecipe: async (theRecipe) => {

        const data = [theRecipe];

        const qry = ` SELECT * 
            FROM "review" 
            WHERE "recipe_id" = $1
            `;

        try {
            const { rows } = await db.query(qry, data);
            reviews = rows;

            if (!reviews[0]) {
                throw new Error(`no review for this recipe`);
            } else {
                return reviews;
            }

        } catch (err) {
            throw new Error(err.message);
        }
    },

    getReviewsByUser:async (theUser) => {
        const data = [theUser];

        const qry = ` SELECT * 
            FROM "review" 
            WHERE "user_id" = $1
            `;

        try {
            const { rows } = await db.query(qry, data);
            reviews = rows;
            if (!reviews[0]) {
                throw new Error(`no review for this user`);
            } else {
                return reviews;
            }
        } catch (err) {
            throw new Error(err.message);
        }
    },

    /**
     * add new recipe     
     * @param {Object} theReview - the reviewModel in request.body
    */
    save: async (theReview) => {

        // prepare all user's data
        const data = [
            theReview.content,
            theReview.rate,
            theReview.user_id,
            theReview.recipe_id
        ];

        const query = `  
        INSERT INTO "review" (content, rate, "user_id", "recipe_id" )
        VALUES ($1, $2, $3, $4) 
        RETURNING *;
        `;

        try {
            // insérer la review 
            const { rows } = await db.query(query, data);

            theReview = rows[0];

        } catch (err) {
            throw new Error(err);
        }
    },

}

module.exports = reviewMapper;