const path = require("path");
const usuariosService = require("../services/usuarios-service");

const usuariosController = {
    //Dentro de este objeto literal va el listado de métodos donde se dará respuesta
    //index: mostrar listado de productos
    registro: (req, res) => {
        //res.send('formulario de registro');
        res.render("registro");
    },
    show: (req, res) => {
        //res.send("bienvenidos al perfil de usuario");
        //trae todos los usuarios de la tabla
        //db.Usuarios.findAll().then(function(usuarios) {
        //    res.render("listado-de-usuarios", { usuarios: usuarios });
        // });
    },

    ingresar: (req, res) => {
        return res.send("View para ingreso de usuario");
    },
    crearUsuario: (req, res) => {
        usuariosService.create(req.body);
        /*
        db.Usuarios.create({
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            password: req.body.password,
            fecha_nacimiento: req.body.fechaNacimiento,
            email: req.body.email,
            telefono: req.body.telefono,
        });
        */
        res.redirect("/");
    },
    list: (req, res) => {
        res.send("usuariosService.list");
    },
};

module.exports = usuariosController;