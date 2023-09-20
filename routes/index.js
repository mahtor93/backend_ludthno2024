const express = require('express');

const userRoutes= require('./usuario.routes.js');
const misionesRoutes=require('./misiones.routes.js');

function routerApi(app){
    const router = express.Router();
    app.use('/api/v1/',router);
    router.use('/usuarios', userRoutes);
    router.use('/misiones', misionesRoutes);
}

module.exports = routerApi;