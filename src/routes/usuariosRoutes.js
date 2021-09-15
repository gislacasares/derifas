const express = require("express");
const router = express.Router();

//Importo el módulo de productosController
const usuariosController = require("../controllers/usuariosController");

/*** CREAR UN USUARIO ***/
router.get("/registro", usuariosController.registro);
router.post("/registro", usuariosController.crearUsuario);
router.get("/ingresar", usuariosController.ingresar);

//exporto módulo router para hacerlo visible desde afuera
module.exports = router;