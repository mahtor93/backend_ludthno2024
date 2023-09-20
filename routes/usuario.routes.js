const express = require('express');
const userService = require('../services/usuario.service.js')
const validatorHandler = require('./../middlewares/validator.handler.js')
const {createUserSchema, updateUserSchema, getUserSchema} = require('./../schemas/user.schema.js')
const router = express.Router();
const service = new userService();

router.get('/',async (req,res)=>{
    try{
        const users = await service.find();
        res.json(users)
    }catch(error){
        res.status(404).json({
            message: error.message
        });
    }
})

router.get('/:id',async (req,res, next)=>{
    try{
        const { id } = req.params;
        const users = await service.findOne(id);
        res.json( users )
    }catch(error){
        next(error);
    }
});

/*
router.get('/',(req,res)=>{
    try{
        const { limit, offset } = req.query;
        if(limit && offset){
            res.json({
                limit,offset
            });
        }else{
                res.send('No hay parametros')
            }
    }catch(error){
        res.status(404).json({
            message: error.message
        });
    }
});
*/

router.post('/',async (req,res)=>{
    try{
        const body = req.body;
        let {id} = req.body;
        
        if(id === '999'){
            res.status(404).json({
                message:'CONFLICTO'
            })
        }else{
            const usuario = await service.create(body);
            res.status(201).json({
                message:'CREADO',
                usuario
            })
        }
    }catch(error){
        res.status(404).json({
            message: error.message
        });
    }
})

router.patch('/:id',async (req,res)=>{
    try{
        const { id } = req.params;
        const body = req.body;
        const user = await service.update(id,body);
        res.json(user);
    }catch(error){
        res.status(404).json({
            message: error.message
        });
    }
})

router.delete('/:id',async (req,res)=>{
    try{
        const { id } = req.params;
        if(id === '999'){
            res.status(404).json({
                message:'no hay permisos'
            })
        }else{
            const user = await service.delete(id);
            res.status(200).json({
                message:`removed at id: ${id}`,
            })
        }
    }catch(error){
        res.status(404).json({
            message: error.message
        });
    }
})

module.exports = router;