
const User = require('../models/user');
const userMapper = require("../models/userMapper");
const categoryMapper = require("../models/categoryMapper");
const groceryMapper = require("../models/groceryMapper");
const emailValidator = require('email-validator');
const bcrypt = require('bcrypt');

const userController = {


    /**
     * user's inscription
     * @param {Express.Response} response
     * @param {Express.Request} request
     * @async
     */
    signIn: async (request, response) => {
        try {
            console.log(request.body)
            const thePassword = request.body.password
            const regex = new RegExp ("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?!.*?[#?!$ %^&@*-]).{8,}$");
            //console.log(thePassword)

            const message = "le mot de passe doit contenir une MAJ, une chiffre, une minuscule et contenir minimum 8 caractère; les caratère spéciaux ne sont pas autorisés"

            // regex verification for valid password
            if(!regex.test(thePassword)){
                return response.status(400).json(message);
            }
            console.log("password valid")
            const user = await userMapper.verify(request.body.email);
            if (user) {
                return response.status(403).json("Cet email est déjà utilisé par un utilisateur.")
            };
            // - 2: format d'email valide
            if (!emailValidator.validate(request.body.email)) {
                return response.status(400).json("Cet email n'est pas valide.")
            }
            // - 3: le mdp et la confirmation ne correspondent pas
            if (thePassword !== request.body.confirmPassword) {
                return response.status(400).json("La confirmation du mot de passe ne correspond pas.")
            }
            
            // 5 - On crypt
            const salt = await bcrypt.genSalt(10);
            const encryptedPsw = await bcrypt.hash(thePassword, salt);
            //on crée le User !
            const theUser = new User({
                email: request.body.email,
                image: request.body.image,
                password: encryptedPsw,
                pseudo: request.body.pseudo
            });

            console.log('theUser', theUser)

            await userMapper.save(theUser);
            console.log("the user ", theUser);

            const titleList = "Ma liste de couse";
            
            const groceryList = await groceryMapper.createList(theUser.id, titleList );
            response.json({theUser, groceryList});

        } catch (err) {
            response.status(404).json(err.message);
        }
    },
    /**
     * user's connection
     * @param {Express.Response} response
     * @param {Express.Request} request
     * @async
     */
    // Permet de se connecter
    login: async (request, response) => {
        try {
            // on tente de récupérer l'utilisateur qui possède l'email donné
            const user = await userMapper.verify(request.body.email);

            if (!user) {
                return response.status(403).json("Cet email n'existe pas.")

            }
            // Si on a un utilisateur, on teste si le mot de passe est valide
            const validPwd = await bcrypt.compare(request.body.password, user.password);
            if (!validPwd) {
                return response.status(403).json("mauvais mot de passe")
            }
            // si tout va bien, on met l'utilisateur en session...
            request.session.user = user;
            //... mais on supprime son mdp !
            delete request.session.user.password;
            // console.log("loginC",user)
            // console.log('request.session.user', request.session.user)
            const message = "vous etes connecté"
            return response.json({user, message, cookie: JSON.stringify(request.cookies)});

        } catch (err) {
            console.trace(err);
            res.status(500).send(err);
        }
        const theUser = request.body;
        //console.log(theUser);

        try {

            const user = await userMapper.getUser(theUser);
            response.json(user);

        } catch (err) {
            response.status(404).json(err.message);
        }
    },
    /**
     * disconnect user
     */
    disconnect: (request, response) => {
        if (!request.session.user){
            return response.json("vous n'avez pas de session active, merci de vous logger");
        } 
        const user = request.session.user.pseudo;
        request.session.user = false;
        const message = `merci et à bientôt ${user}`;
        response.json(message);
    },

    /**
     * all user
     * @param {Express.Response} response
     * @async
     */
    findAll: async (request, response) => {
        try {

            const user = await userMapper.findAllUser();
            response.json(user);

        } catch (err) {
            response.status(404).json(err.message);
        }
    },

    /**
     * one user
     * @param {Express.Response} response
     * @param {Express.Request} request
     * @async
     */
    findOne: async (request, response) => {
        const { id } = request.params;
    
        try {

            const user = await userMapper.findOneUser(id);
            response.json(user);

        } catch (err) {
            response.status(404).json(err.message);
        }
    },

    /**
     * user's recipe
     * @param {Express.Response} response
     * @param {Express.Request} request
     * @async
     */
    usersRecipe: async (request, response) => {
        //const { id } = request.params;
        if (!request.session.user){
            return response.json("pour accéder à vos recettes merci de vous logger");
        } 
        const {id} = request.session.user;

        try {
            const user = await userMapper.recipeByUser(id);
            response.json(user);
        } catch (err) {
            response.status(404).json(err.message);
        }
    },

    /**
     * user's category
     * @param {Express.Response} response
     * @param {Express.Request} request
     * @async
     */
    recipesByCategory: async (request, response) => {
        if (!request.session.user){
            return response.json("pour accéder à vos category merci de vous logger");
        }
        const { id } = request.session.user;
        try {
            const userCategories = await categoryMapper.getCategoryByUser(id);
            response.json(userCategories);
        } catch (err) {
            response.status(404).json(err.message);
        }
    },
    updateUser: async (request, response) => {
        //const { id } = request.params;
        if (!request.session.user){
            return response.json("pour accéder à vos informations merci de vous logger");
        }
        const {id} = request.session.user
        
        if (!emailValidator.validate(request.body.email)) {
            return response.status(400).json("Cet email n'est pas valide.")
        }
        const salt = await bcrypt.genSalt(10);
            const encryptedPsw = await bcrypt.hash(request.body.password, salt);
        
            const data = {
            email: request.body.email,
            password: encryptedPsw,
            pseudo: request.body.pseudo,
            image: request.body.image
        };
        
        try {

            const modifyUser = await userMapper.editUser(id, data);
            response.json(modifyUser);

        } catch (err) {
            response.status(404).json(err.message);
        }
    },


};

module.exports = userController;