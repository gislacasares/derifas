const path = require("path");
const fs = require("fs");

//Importo los servicios
const productosService = require("../../services/productos-service");
const cuponeraService = require("../../services/cuponera-service");

//Importo las validaciones
const { body, validationResult } = require("express-validator");

//Creo el controlador
const controladorProducto = {
    //Funciones internas necesarias que no son para mostrar el producto pero si para procesarlos
    //index: mostrar listado de productos

    mostrar_un_producto: async(req, res) => {
        const producto = await productosService.findOneProduct(req.params.id);
        //const cuponera = await cuponeraService.buscarCuponeraPorIdDeProducto(producto.id);

        res.json(producto);
    },

    mostrar_todos_productos: async(req, res) => {
        const productosAll = await productosService.mostrar_productos();
        res.status(200).json({
            total: productosAll.length,
            data: productosAll,
            status: 200,
        });
    },

    mostrar_novedades: async(req, res) => {
        const novedadesProductos = await productosService.filtradoPorNovedad();
        //devuelvo el json
        res.status(200).json({
            total: novedadesProductos.length,
            data: novedadesProductos,
            status: 200,
        });
    },

    mostrar_ultimas_oportunidades: async(req, res) => {
        const ultimaOportunidadProductos = await productosService.filtradoPorUltimaOportunidad();
        //devuelvo el json
        res.status(200).json({
            total: ultimaOportunidadProductos.length,
            data: ultimaOportunidadProductos,
            status: 200,
        });
    },

    mostrar_productos_azar: async(req, res) => {
        const productosAll = await productosService.mostrar_productos();
        const TOTAL_PRODUCTOS = 10;
        let productosAzar = [];

        for (i = 0; i < TOTAL_PRODUCTOS; i++) {
            productosAzar.push(productosAll[Math.floor(Math.random() * productosAll.length)]);
        }

        res.status(200).json({
            total: productosAzar.length,
            data: productosAzar,
            status: 200,
        });
    },

    buscar: async(req, res) => {
        console.log(req.query);
        const productosEncontrados = await productosService.buscarPorPalabraClave(req.query.nombreProducto);
        res.status(200).json({
            total: productosEncontrados.length,
            data: productosEncontrados,
            status: 200,
        });
    },

    publicar: (req, res) => {
        res.render("crear-publicacion");
    },


    createOneProduct: async(req, res) => {
        //Obtengo el id del producto recien creado para crear su cuponera
        const producto_creado_id = await productosService.createOneProduct(
            req.body,
            req.file
        );

        await cuponeraService.createCuponera(
            producto_creado_id,
            req.body.precio,
            req.body.total_cupones
        );
        res.redirect("/");
    },

    //Modificar un producto
    editar: (req, res) => {
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