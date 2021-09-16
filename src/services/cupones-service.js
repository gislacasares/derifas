const path = require("path");
const fs = require("fs");

//importo el json de cupones
const cuponesFilePath = path.join(__dirname, "../data/cuponesDataBase.json");

//Transformo el String JSON a array de objetos
const cupones = JSON.parse(fs.readFileSync(cuponesFilePath, "utf-8"));

const cuponesService = {
    //show muestra la cuponera para un producto
    buscarCuponeraPorIdDeProducto: (id) => {
        console.log(id);
        const cuponera = cupones.find((cup) => {
            return cup.productoId == id;
        });

        return cuponera;

        //res.render("../views/partials/grilla-cupones");
    },
};

module.exports = cuponesService;