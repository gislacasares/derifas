const path = require("path");
const fs = require("fs");
const db = require("../../database/models");

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
    /*createCuponera: (payload, productoId) => {
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

                                              save();
                                          },*/

    createCuponera: async(producto_id, precio_producto, total_cupones) => {
        const precio_cupon = precio_producto / total_cupones;

        //Creo iterativamente los cupones
        for (let i = 1; i <= total_cupones; i++) {
            await db.Cuponera.create({
                producto_id: producto_id,
                numero_cupon: i,
                estado: true,
                vendido: false,
                usuario_comprador_id: null,
                precio_cupon: precio_cupon,
                fecha_compra: null,
            });
        }
    },

    //show muestra la cuponera para un producto
    buscarCuponeraPorIdDeProducto: (producto_id) => {
        const cuponera = db.Cuponera.findAll({
            where: {
                producto_id: producto_id,
            },
        });
        console.log(cuponera);
        return cuponera;

        //res.render("../views/partials/grilla-cupones");
    },
};

module.exports = cuponesService;