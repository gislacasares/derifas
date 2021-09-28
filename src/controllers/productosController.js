const path = require("path");
const fs = require("fs");

//Importo los servicios
const productosService = require("../services/productos-service");
const cuponerasService = require("../services/cupones-service");
const cuponesService = require("../services/cupones-service");

//Importo las validaciones
const { body, validationResult } = require("express-validator");

//Creo el controlador
const controladorProducto = {
    //Funciones internas necesarias que no son para mostrar el producto pero si para procesarlos
    //index: mostrar listado de productos

    mostrar: (req, res) => {
        const producto = productosService.buscarUnProductoPorId(req.params.id);

        const cuponera = cuponesService.buscarCuponeraPorIdDeProducto(
            req.params.id
        );

        console.log(cuponera);

        res.render("producto-detalle", { producto: producto });
    },
    mostrar_v2: (req, res) => {
        const producto = productosService.buscarUnProductoPorId(req.params.id);
        const cuponera = cuponesService.buscarCuponeraPorIdDeProducto(producto.id);

        console.log(cuponera);

        res.render("producto-detalle-v2", {
            producto: producto,
            cuponera: cuponera,
        });
    },
    publicar: (req, res) => {
        res.render("crear-publicacion");
    },

    crearProducto: (req, res) => {
        //En el request llega el resultado de la validación del formulario
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            const productoId = productosService.crearUnProducto(req.body, req.file);
            //cuponesService.crearCuponera(req.body, productoId);
            //Redirecciono a home
            res.redirect("/");
        } else {
            //return res.status(400).json({ errors: errors.array() });
            res.redirect("crear-publicacion", { errors: errors.array() });
        }
    },

    //Modificar un producto
    modificar: (req, res) => {
        const producto = productosService.buscarUnProductoPorId(req.params.id);

        res.render("editar-publicacion", { producto: producto });
    },

    actualizar: (req, res) => {
        productosService.editarUnProducto(req.params.id, req.body, req.file);

        //Redirecciono a home
        res.redirect("/producto/mostrar/" + req.params.id);
    },

    borrar: (req, res) => {
        productosService.delete(req.params.id);
        res.redirect("/");
    },
};

module.exports = controladorProducto;