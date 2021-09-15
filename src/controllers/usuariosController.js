const path = require("path");

const usuariosController = {
    //Dentro de este objeto literal va el listado de métodos donde se dará respuesta
    //index: mostrar listado de productos
    registro: (req, res) => {
        //res.send('formulario de registro');
        res.render("registro");
    },
    show: (req, res) => {
        res.send("bienvenidos al perfil de usuario");
    },
    registro: (req, res) => {
        res.render("registro");
    },

    ingresar: (req, res) => {
        return res.send("View para ingreso de usuario");
    },
    crearUsuario: (req, res) => {
        res.render(req.body);
    },
};

module.exports = usuariosController;