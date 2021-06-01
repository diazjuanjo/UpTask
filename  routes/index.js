const express = require('express');
const router = express.Router();

// importar el controller
const proyectosController = require ('../controllers/proyectosController');


module.exports = function(){

    // rutas para el home
    router.get('/', proyectosController.proyectosHome);
    router.get('/nosotros', (req, res) => {
        res.send('Nosotros');
    });
    return router;
}

