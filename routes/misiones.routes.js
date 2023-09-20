const express = require('express');

const misionServices = require('../services/mision.service.js');
const router = express.Router();

const service = new misionServices();

//Todo lo que es específico va primero misiones/filter
//todo lo que es dinámico va después  misiones/:id
router.get('/:id', async (req,res)=>{
    const { id } = req.params;
    const missions = await service.findOne(id);
    if(missions){
        res.status(201).json(missions)
    }else{
        res.status(404).json({
            message:'not found'
        })
    }
    
})

router.get('/', async (req,res)=>{
    try{
        const misiones = await service.find();
        res.json(misiones)
    }catch(error){
        res.status(404).json({
            message: error.message
        });
    }
})

router.post('/',(req,res)=>{
    try{
        const body = req.body;
        res.status(201).json({
            message:'CREADO',
            data:body
        })
    }catch(error){
        res.status(404).json({
            message: error.message
        });
    }
})

router.patch('/:id', async (req,res)=>{
    try{
        const {id} = req.params;
        const body = req.body;
        const mision = await misionServices.update(id,body);
        res.status(200).json(mision);
    }catch(error){
        res.status(404).json({
            message: error.message
        });
    }
})

router.delete('/:id', async (req,res)=>{
    try{
        const {id} = req.params;
        const mision = await misionServices.delete(id);
        res.status(200).json({
            message:`Removed at id: ${id}`
        })
    }catch(error){
        res.status(404).json({
            message: error.message
    });
}
})


module.exports = router;