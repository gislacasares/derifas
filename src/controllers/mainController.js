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
            if (prod.novedad == true) {
                return prod;
            }
        });

        const ultimaOportunidadProductos = productos.filter((prod) => {
            return prod.ultima_oportunidad == true;
        });

        //renderizar la vista index con esos arrays
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
        //console.log(req.body);
        res.render('crear-publicacion');
    },
    crearProducto: (req, res) => {
        //Obtengo el maximo id de productos
        let productoMaximoId = Math.max.apply(Math, productos.map(function(o) {
            return o.id;
        }));

        let nuevo_producto = {
            "id": productoMaximoId + 1,
            "nombre": req.body.titulo,
            "precio": req.body.precio,
            "fecha_y_hora_limite": req.body.fechaHoraLimite,
            "total_cupones": req.body.totalCupones,
            "cupones_disponibles": req.body.totalCupones,
            "description": req.body.descripcion,
            "imagen": req.file.filename,
            "novedad": true,
            "ultima_oportunidad": false
        };

        //Meto el nuevo producto en el array de productos
        productos.push(nuevo_producto);

        //transformo el array de productos a JSON
        productosJSON = JSON.stringify(productos);

        //Guardar el nuevo producto escribiendo el archivo de productos con el array JSON
        fs.writeFileSync(productosFilePath, productosJSON);

        //Redirecciono a home
        res.redirect('/');
    },
};

module.exports = controller;