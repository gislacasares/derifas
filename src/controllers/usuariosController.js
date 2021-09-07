const path = require('path');



const usuariosController = {
    //Dentro de este objeto literal va el listado de métodos donde se dará respuesta
    //index: mostrar listado de productos
    registro: (req, res) => {
        //res.send('formulario de registro');
        res.render('registro');
    },
    show: (req, res) => {
        res.send("bienvenidos al perfil de usuario");
    }

};

module.exports = usuariosController;