const db = require('../database');
const Grocery  = require('../models/grocery');

const groceryMapper = {

    createList: async (id, name) => {

        const query = `
        INSERT INTO "grocery_list" (user_id, name)
        VALUES ($1, $2) RETURNING *;
        
        `;
        try {
            const { rows } = await db.query(query, [id, name]);
            list = rows[0];
            return list;

        } catch (err) {
            throw new Error(err.message);
        }
    },

    findList: async (id) => {
        console.log(id)
        try {
            
        const query = `
        SELECT DISTINCT grocery_list.id as list_id, 
        grocery_list."name",
        jsonb_object_agg(grocery_item.name, grocery_item.id) as items
        /* array_agg(grocery_item.name) as item */
        FROM grocery_list
        LEFT OUTER JOIN grocery_item ON grocery_item.grocery_list_id = grocery_list.id
        WHERE grocery_list.user_id = $1
        AND grocery_item.name IS NOT NULL
        GROUP BY grocery_list.name, grocery_list.id;
        `;

        

            const { rows } = await db.query(query, [id]);
            const list = rows;

            if (rows[0] === undefined) {

                const query = `
                    SELECT DISTINCT grocery_list.id as list_id, 
                    grocery_list."name",
                    array_agg(grocery_item.name) as items
                    FROM grocery_list
                    LEFT OUTER JOIN grocery_item ON grocery_item.grocery_list_id = grocery_list.id
                    WHERE grocery_list.user_id = $1
                    GROUP BY grocery_list.name, grocery_list.id;
                    `;
                const { rows } = await db.query(query, [id]);
                const list = rows;
                return new Grocery(list);
                // return list;
            } else {
                return new Grocery(list);
                // return list;
            }
        } catch (err) {
            throw new Error(err.message);
        }
    },

    /**
     * del one list with his items
     * @param {number} id - the id of the list
     */
    delOneList: async (id) => {
        const data = [id]; // list id
        try {
            // first del the list's items
            const delitem = `DELETE FROM grocery_item WHERE grocery_list_id = $1;`;
            await db.query(delitem, data);

            // and del the list
            const delList = `DELETE FROM grocery_list WHERE id = $1;`;
            await db.query(delList, data);


        } catch (error) {
            throw new Error(err.message);
        }
    },

    delAllList: async (userId) => {
        const data = [userId]; //user id
        try {
            // first del the lists's items
            const delitem = `DELETE FROM grocery_item 
                            WHERE grocery_list_id IN (
                                    SELECT id 
                                    FROM grocery_list
                                    WHERE user_id = $1);`;
            await db.query(delitem, data);

            // and del the lists
            const delList = `DELETE FROM grocery_list
                            WHERE user_id = $1;`;
            await db.query(delList, data);

        } catch (error) {
            throw new Error(err.message);
        }
    },

    addItemTolist: async (id, name, userId) => {
        const data = [name, id]
        try {
            const qry = `
            INSERT INTO "grocery_item" (name, grocery_list_id)
            VALUES ($1, $2);
                `;

            await db.query(qry, data);

            return groceryMapper.findList(userId);

        } catch (err) {
            throw new Error(err);
        }

    },

    items: async (id, userId) => {

        const data = [id];
        console.log('data', data)
        try {
            const query = `
            DELETE FROM grocery_item 
            WHERE id = $1;`;

            await db.query(query, data);

            // return groceryMapper.findList(userId);

        } catch (err) {
            throw new Error(err);
        };
    }


}

module.exports = groceryMapper;