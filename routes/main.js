const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');

router.get('/', mainController.index);
router.get('/ingreso', mainController.ingreso);
router.get('/registro', mainController.registro);

module.exports = router;