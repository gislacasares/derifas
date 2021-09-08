const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');
const productosRoutes = require('./productosRoutes');

router.get('/', mainController.index);

router.use('/producto', productosRoutes);
router.get('/ingreso', mainController.ingreso);
router.get('/registro', mainController.registro);
router.post('/registro', mainController.crearUsuario);
router.get('/publicar', mainController.publicar);
router.post('/publicar', mainController.crearProducto);

module.exports = router;