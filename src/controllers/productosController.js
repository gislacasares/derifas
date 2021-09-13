const path = require("path");
const fs = require("fs");

//importo el json de productos
const productosFilePath = path.join(
    __dirname,
    "../data/productosDataBase.json"
);
const productos = JSON.parse(fs.readFileSync(productosFilePath, "utf-8"));

const controladorProducto = {
    //Dentro de este objeto literal va el listado de métodos donde se dará respuesta
    //index: mostrar listado de productos
    index: (req, res) => {
        const producto = productos.find((prod) => {
            if (prod.id == req.params.id) {
                return prod;
            }
        });

        res.render("producto-detalle", { producto: producto });
    },
    create: function() {},

    //show: mostrar detalles del producto
    show: (req, res) => {
        res.send("bienvenidos al detalle del producto");
    },

    //Modificar un producto
    modificar: (req, res) => {
        //busco el producto a modificar
        const producto = productos.find((prod) => {
            if (prod.id == req.params.id) {
                return prod;
            }
        });
        res.render("editar-publicacion", { producto: producto });
    },

    actualizar: (req, res) => {
        const productoAActualizar = productos.find((prod) => {
            return prod.id == req.params.id;
        });

        //edito
        productoAActualizar.id = req.params.id;
        productoAActualizar.nombre = req.body.titulo;
        productoAActualizar.precio = req.body.precio;
        productoAActualizar.fecha_y_hora_limite = req.body.fecha_y_hora_limite;
        productoAActualizar.total_cupones = req.body.totalCupones;
        productoAActualizar.descripcion = req.body.descripcion;
        productoAActualizar.imagen = req.file ?
            req.file.filename :
            productoAActualizar.imagen;

        //Meto el nuevo producto en el array de productos
        productos.push(productoAActualizar);

        //transformo el array de productos a JSON
        productosJSON = JSON.stringify(productos);

        //Guardar el nuevo producto escribiendo el archivo de productos con el array JSON
        fs.writeFileSync(productosFilePath, productosJSON);

        //Redirecciono a home
        res.redirect("/producto/<%= req.params.id %>");
    },
    detalleComentario: function() {},

    //Funciones internas necesarias que no son para mostrar el producto pero si para procesarlos
};

module.exports = controladorProducto;