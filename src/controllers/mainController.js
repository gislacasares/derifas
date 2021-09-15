const path = require("path");
const fs = require("fs");
const productosService = require("../services/productos-service");

//importo el json de productos
const productosFilePath = path.join(
    __dirname,
    "../data/productosDataBase.json"
);
const productos = JSON.parse(fs.readFileSync(productosFilePath, "utf-8"));

const controller = {
    index: (req, res) => {
        //Creo 2 arrays:

        // Productos Novedad
        const novedadesProductos = productosService.filtradoPorNovedad();
        /*const novedadesProductos = productos.filter((prod) => {
                        if (prod.novedad == true) {
                            return prod;
                        }
                    });
                    */

        //Productos Ultima oportunidad
        const ultimaOportunidadProductos =
            productosService.filtradoPorUltimaOportunidad();

        /*const ultimaOportunidadProductos = productos.filter((prod) => {
                    return prod.ultima_oportunidad == true;
                });*/

        //renderizar la vista index con esos arrays
        res.render("index", { novedadesProductos, ultimaOportunidadProductos });
    },
};

module.exports = controller;