const path = require("path");
const fs = require("fs");

//Importo los servicios
const productosService = require("../services/productos-service");

//Creo el controlador
const controladorProducto = {
    //Funciones internas necesarias que no son para mostrar el producto pero si para procesarlos
    //index: mostrar listado de productos

    mostrar: (req, res) => {
        const producto = productosService.buscarUnProductoPorId(req.params.id);

        res.render("producto-detalle", { producto: producto });
    },

    publicar: (req, res) => {
        res.render("crear-publicacion");
    },

    crearProducto: (req, res) => {
        //Obtengo el maximo id de productos
        let productoMaximoId = Math.max.apply(
            Math,
            productos.map(function(o) {
                return o.id;
            })
        );

        let nuevo_producto = {
            id: productoMaximoId + 1,
            nombre: req.body.titulo,
            precio: req.body.precio,
            fecha_y_hora_limite: req.body.fechaHoraLimite,
            total_cupones: req.body.totalCupones,
            cupones_disponibles: req.body.totalCupones,
            descripcion: req.body.descripcion,
            imagen: req.file.filename,
            novedad: true,
            ultima_oportunidad: false,
        };

        //Meto el nuevo producto en el array de productos
        productos.push(nuevo_producto);

        //Guardo el producto en el array de productos
        productosService.save();

        //Redirecciono a home
        res.redirect("/");
    },

    //Modificar un producto
    modificar: (req, res) => {
        const producto = productosService.buscarUnProductoPorId(req.params.id);

        res.render("editar-publicacion", { producto: producto });
    },

    actualizar: (req, res) => {
        productosService.editarUnProducto(req.params.id, req.body, req.file);

        //Redirecciono a home
        res.redirect("/producto/<%= req.params.id %>");
    },

    borrar: (req, res) => {
        res.send("a borrar a borrar...");
        //productosService.delete(req.params.id);
        res.redirect("/");
    },
};

module.exports = controladorProducto;