const path = require('path');
const fs = require("fs");

//importo el json de productos
const productosFilePath = path.join(__dirname, "../data/productosDataBase.json");
const productos = JSON.parse(fs.readFileSync(productosFilePath, "utf-8"));


const controller = {
    index: (req, res) => {
        //Creo 2 arrays:
        // Novedades y ultimas_oportunidades

        const novedadesProductos = productos.filter((prod) => {
            if (prod.novedad == false) {
                return prod;
            }

        });
        console.log(novedadesProductos);

        const ultimaOportunidadProductos = productos.filter((prod) => {
            return prod.ultima_oportunidad == true;
        });

        //renderizar la vista index con esos arrays
        //res.render('index', { novedadesProductos });
        res.render('index', { novedadesProductos, ultimaOportunidadProductos });
    },
    registro: (req, res) => {
        res.render('registro');
    },
    ingreso: (req, res) => {
        return res.send('Ingreso');
    },
    crearUsuario: (req, res) => {
        res.render(req.body);
    },
    publicar: (req, res) => {
        res.render('crear-publicacion');

    }
};

module.exports = controller;