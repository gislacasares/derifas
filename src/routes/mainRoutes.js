const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');
const productosRoutes = require('./productosRoutes');

router.get('/', mainController.index);

router.use('/productos', productosRoutes);
router.get('/ingreso', mainController.ingreso);
router.get('/registro', mainController.registro);
router.post('/registro', mainController.crearUsuario);

module.exports = router;