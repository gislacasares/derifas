const path = require('path');
const fs = require("fs");

//importo el json de productos
const productosFilePath = path.join(__dirname, "../data/productosDataBase.json");
const productos = JSON.parse(fs.readFileSync(productosFilePath, "utf-8"));


const controladorProducto = {
    //Dentro de este objeto literal va el listado de métodos donde se dará respuesta
    //index: mostrar listado de productos
    index: (req, res) => {
        const producto = productos.filter((prod) => {
            if (prod.id == req.params.id) {
                return prod;
            }

        });
        //console.log(producto[0].id);
        res.render('producto-detalle', { producto: producto });


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