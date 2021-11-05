const path = require("path");
const fs = require("fs");

//Importo los servicios
const productosService = require("../services/productos-service");
const cuponeraService = require("../services/cuponera-service");

//Importo las validaciones
const { body, validationResult } = require("express-validator");
const usuariosService = require("../services/usuarios-service");

//Creo el controlador
const controladorProducto = {
    //Funciones internas necesarias que no son para mostrar el producto pero si para procesarlos
    //index: mostrar listado de productos

    mostrar_v2: async(req, res) => {
        const producto = await productosService.findOneProduct(req.params.id);
        const cuponera = await cuponeraService.buscarCuponeraPorIdDeProducto(
            producto.id
        );
        console.log(cuponera);

        res.render("producto-detalle-v2", {
            producto: producto,
            cuponera: cuponera,
        });
    },

    mostrar_v2_api: async(req, res) => {
        const producto = await productosService.findOneProduct(req.params.id);
        const cuponera = await cuponeraService.buscarCuponeraPorIdDeProducto(
            producto.id
        );
        console.log(cuponera);

        res.json(producto);
    },

    mostrar_novedades_api: async(req, res) => {
        //Creo 2 arrays:
        // Productos Novedad
        const novedadesProductos = await productosService.filtradoPorNovedad();

        //devuelvo el json
        res.json(novedadesProductos);
    },

    mostrar_productos_azar_api: async(req, res) => {
        const productosAll = await productosService.mostrar_productos_azar();
        const TOTAL_PRODUCTOS = 10;

        let productosAzar = [];

        for (i = 0; i < TOTAL_PRODUCTOS; i++) {
            productosAzar.push(productosAll[Math.floor(Math.random() * productosAll.length)]);
        }

        res.json(productosAzar);


    },

    mostrar_ultimas_oportunidades_api: async(req, res) => {
        //Creo 2 arrays:
        // Productos Novedad
        const ultimaOportunidadProductos = await productosService.filtradoPorUltimaOportunidad();

        //devuelvo el json
        res.json(ultimaOportunidadProductos);
    },

    buscar_por_palabra_clave: async(req, res) => {
        console.log(req.query);
        const productosEncontrados = await productosService.buscarPorPalabraClave(req.query.nombreProducto);
        res.json(productosEncontrados);
    },

    publicar: (req, res) => {
        res.render("crear-publicacion");
    },

    /*
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
                          */

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