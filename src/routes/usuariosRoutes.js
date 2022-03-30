const express = require("express");
const router = express.Router();
const logDBMiddleware = require("../middlewares/logDBMiddleware");

//Importo el módulo de productosController
const usuariosController = require("../controllers/usuariosController");

/*** CREAR UN USUARIO ***/
router.get("/registro", logDBMiddleware, usuariosController.registro);
router.post("/registro", logDBMiddleware, usuariosController.crearUsuario);
router.get("/login", logDBMiddleware, usuariosController.login);
router.post("/login", logDBMiddleware,/*Falta validacion de chequear formato email y pass*/ usuariosController.procesarLogin);
router.get("/listar", logDBMiddleware, usuariosController.list);

//exporto módulo router para hacerlo visible desde afuera
module.exports = router;