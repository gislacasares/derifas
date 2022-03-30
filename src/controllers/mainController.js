const productosService = require("../services/productos-service");

/*
//importo el json de productos
const productosFilePath = path.join(
    __dirname,
    "../data/productosDataBase.json"
);
const productos = JSON.parse(fs.readFileSync(productosFilePath, "utf-8"));
*/

const controller = {
    index: async(req, res) => {

        //Creo 2 arrays:
        // Productos Novedad
        const novedadesProductos = await productosService.filtradoPorNovedad();
        
        //Productos Ultima oportunidad
        const ultimaOportunidadProductos = await productosService.filtradoPorUltimaOportunidad();
        
        //renderizar la vista index con esos arrays
        res.render("index", { novedadesProductos, ultimaOportunidadProductos });
        
    },
};

module.exports = controller;