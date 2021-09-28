const express = require("express");
const router = express.Router();
const logDBMiddleware = require("../middlewares/logDBMiddleware");

//Importo el módulo de productosController
const usuariosController = require("../controllers/usuariosController");

/*** CREAR UN USUARIO ***/
router.get("/registro", logDBMiddleware, usuariosController.registro);
router.post("/registro", logDBMiddleware, usuariosController.crearUsuario);
router.get("/ingresar", logDBMiddleware, usuariosController.ingresar);

//exporto módulo router para hacerlo visible desde afuera
module.exports = router;