
const groceryMapper = require("../models/groceryMapper");

const groceryController = {

    createNewList: async (request, response) => {
        
        if (!request.session.user){
            return response.json("pour créé une liste merci de vous logger");
        }

        const {id} = request.session.user;

        
        //const { id } = request.params;
        const {name }= request.body;

        try {

            const list = await groceryMapper.createList(id, name);
            response.json(list);

        }catch (err) {
            response.status(404).json(err.message);
        }
    },

    findOneList: async (request, response) => {
        console.log("coucou")
        console.log('request.session.user', request.session.user.id)
        if (!request.session.user){
            return response.json("pour voir une liste merci de vous logger");
        }
        const id = request.session.user.id;
        //const {id} = request.params;
        try {

            const list = await groceryMapper.findList(id);
            response.json(list);

        } catch (err) {
            response.status(404).json(err.message);
        }
    },

    addItem: async (request, response) => {
    if (!request.session.user){
        return response.json("merci de vous logger");
    }
        const { id } = request.params;
        const  { name } = request.body;
        const userId = request.session.user.id
        try {

            const list = await groceryMapper.addItemTolist(id, name, userId);
            response.json(list);

        }catch (err) {
            response.status(404).json(err.message);
        }
    },
    /**
     * use this function for two things del one or all user list
     * if id in request.params => del this id list
     * else use the user session' id for del all his list
     * 
     */
    delteList: async (request, response) => {
        if (!request.session.user){
            return response.json("merci de vous logger");
        };

        if (request.params.id){
        const {id} = request.params;
            try {

                await groceryMapper.delOneList(id);
                return response.json(`la liste id ${id} à été suprimer`);

            }catch (err) {
                response.status(404).json(err.message);
            }
        } else {
                try {
                    const userId = request.session.user.id
                    await groceryMapper.delAllList(userId);
                    response.json(`toutes vos listes ont étées suprimer pour l'user ${userId}`);
        
                }catch (err) {
                    response.status(404).json(err.message);
                };
            };
    },

    removeItem: async (request, response) => {
        if (!request.session.user){
            return response.json("merci de vous logger");
        };
        const userId = request.session.user.id
        const { id } = request.params;
        try {
            await groceryMapper.items(id, userId);
            response.json(`l'ingredient a bien été suprimer`);

        }catch (err) {
            response.status(404).json(err.message);
        }
    },
    
}
module.exports = groceryController;