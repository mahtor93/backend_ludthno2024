const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(5).max(30);
const email = Joi.string().email();
const image = Joi.string().uri();


const createUserSchema = Joi.object({
    name: name.required(),
    email: email.required(),
    image:image.required(),
})

const updateUserSchema = Joi.object({
    //para una petición patch se validan los valores ingresados 
    name:name,
    email: email,
    image:image,
})
const getUserSchema = Joi.object({
    //para una petición get se requiere un ID
    id:id.required()
})


module.exports = {createUserSchema,updateUserSchema,getUserSchema }