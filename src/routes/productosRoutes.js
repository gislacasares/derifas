const express = require('express');
const router = express.Router();

//Importo el módulo de productosController
const productosController = require('../controllers/productosController');

router.get('/', productosController.index);
router.get('/show', productosController.show);

//exporto módulo router para hacerlo visible desde afuera
module.exports = router;