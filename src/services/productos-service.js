const path = require("path");
const fs = require("fs");

//importo el json de productos
const productosFilePath = path.join(
    __dirname,
    "../data/productosDataBase.json"
);

//Transformo el String JSON a array de objetos
const productos = JSON.parse(fs.readFileSync(productosFilePath, "utf-8"));

const productosService = {
    filtradoPorNovedad() {
        const productosNovedad = productos.filter((prod) => {
            return prod.novedad == true;
        });

        return productosNovedad;
    },

    filtradoPorUltimaOportunidad(categoria) {
        const productosUltimaOportunidad = productos.filter((prod) => {
            return prod.ultima_oportunidad == true;
        });

        return productosUltimaOportunidad;
    },

    buscarUnProductoPorId(id) {
        const producto = productos.find((prod) => {
            return prod.id == id;
        });
        return producto;
    },

    save() {
        const jsonString = JSON.stringify(products, null, 4);
        fs.writeFileSync(productsFilePath, jsonString);
    },

    delete(id) {
        const producto = this.buscarUnProductoPorId(id);
        producto.delete = true;
        this.save();
    },
};

module.exports = productosService;