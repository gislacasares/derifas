const express = require('express');
const router = express.Router();

//Importo el módulo de productosController
const usuariosController = require('../controllers/usuariosController');

router.get('/registro', usuariosController.registro);
router.get('/show', usuariosController.show);

//exporto módulo router para hacerlo visible desde afuera
module.exports = router;