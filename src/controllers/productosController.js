const path = require('path');

const controladorProducto = {
    //Dentro de este objeto literal va el listado de métodos donde se dará respuesta
    //index: mostrar listado de productos
    index: (req, res) => {
        res.send("Listado de productos");
    },
    create: function() {},
    //show: mostrar detalles del producto
    show: (req, res) => {
        res.send("bienvenidos al detalle del producto");
    },
    detalleComentario: function() {},

    //Funciones internas necesarias que no son para mostrar el producto pero si para procesarlos


};

module.exports = controladorProducto;