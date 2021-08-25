const controlador = {
    //Dentro de este objeto literal va el listado de métodos donde se dará respuesta
    listado: function() {},
    crear: function() {},
    detalle: function(req, res) => {
        res.send("bienvenidos al detalle del producto");
    },
    detalleComentario: function() {},

    //Funciones internas necesarias que no son para mostrar el producto pero si para procesarlos


};

module.exports = controlador;