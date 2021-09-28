const path = require("path");
const fs = require("fs");

//importo el json de cupones
const cuponesFilePath = path.join(__dirname, "../data/cuponesDataBase.json");

//Transformo el String JSON a array de objetos
const cupones = JSON.parse(fs.readFileSync(cuponesFilePath, "utf-8"));

const cuponesService = {
    //Guardar cuponera
    save() {
        const jsonString = JSON.stringify(cupones, null, 4);
        fs.writeFileSync(cuponesFilePath, jsonString);
    },

    //create
    crearCuponera: (payload, productoId) => {
        //creo el array de cupones
        const cupones = [];
        for (let i = 1; i <= payload.total_cupones; i++) {
            const cupon = {
                cuponId: i,
                usuarioId: null,
            };
            cupones.push(cupon);
        }
        const cuponera = [{
            productoId: productoId,
            usuariosIdCompraCupones: cupones,
        }, ];

        cupones.push(cuponera);
        console.log(cupones);
        save();
    },

    //show muestra la cuponera para un producto
    buscarCuponeraPorIdDeProducto: (id) => {
        const cuponera = cupones.find((cup) => {
            return cup.productoId == id;
        });

        //console.log(cuponera);
        return cuponera;

        //res.render("../views/partials/grilla-cupones");
    },
};

module.exports = cuponesService;