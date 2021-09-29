const path = require("path");
//Importo para usar la DB
const db = require("../../database/models");

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
        //console.log(db);

        db.Usuarios.create({
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            password: req.body.password,
            fecha_nacimiento: req.body.fechaNacimiento,
            email: req.body.email,
            telefono: req.body.telefono,
        });

        res.redirect("/");
    },
};

module.exports = usuariosController;