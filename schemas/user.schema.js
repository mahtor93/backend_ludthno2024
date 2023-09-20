const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().alphanum().min(5).max(30);
const email = Joi.string().email();
const image = Joi.string();


const createUserSchema = Joi.object({
    id: id.required(),
    name: name.required(),
    email: email.required(),
})

const updateUserSchema = Joi.object({
    name:name,
    email: email,
    image:image,
})
const getUserSchema = Joi.object({
    id:id.required()
})


module.exports = {createUserSchema,updateUserSchema,getUserSchema }