const Joi = require('joi');

const userSchema = Joi.object({
    email: Joi.string().pattern(new RegExp('^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$')).required(),
    password: Joi.string().pattern(new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?!.*?[#?!$ %^&@*-]).{8,}$')).required(),
    confirmPassword: Joi.ref('password'),
    image: Joi.string(),
    pseudo: Joi.string().min(3).max(25).required()
});

const updateUser = Joi.object({
    email: Joi.string().pattern(new RegExp('^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$')),
    password: Joi.string().pattern(new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?!.*?[#?!$ %^&@*-]).{8,}$')),
    confirmPassword: Joi.ref('password'),
    image: Joi.string(),
    pseudo: Joi.string().min(3).max(25)
});

const login = Joi.object({
    email: Joi.string().pattern(new RegExp('^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$')).required(),
    password: Joi.string().pattern(new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?!.*?[#?!$ %^&@*-]).{8,}$')).required()
});

module.exports = {userSchema, updateUser, login};