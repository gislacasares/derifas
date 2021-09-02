const path = require('path');

//Listado de productos a modo de prueba
const productos = [{
        id: 1,
        titulo: 'Cafetera Moulinex',
        precio_producto: 5500,
        precio_cupon: 55,
        cupones_disponibles: 12,
        fecha_hora_limite: '15/10/2021'
    },
    {
        id: 2,
        titulo: 'Macbook Pro 16" touch bar',
        precio_producto: 450000,
        precio_cupon: 900,
        cupones_disponibles: 148,
        fecha_hora_limite: '22/11/2021'
    },
    {
        id: 3,
        titulo: 'Celular Motorola Moto M ',
        precio_producto: 48000,
        precio_cupon: 15,
        cupones_disponibles: 2940,
        fecha_hora_limite: '5/12/2021'
    },
    {
        id: 4,
        titulo: 'Smart Tv Samsung 43"',
        precio_producto: 30000,
        precio_cupon: 100,
        cupones_disponibles: 34,
        fecha_hora_limite: '1/11/2021'
    }
];


const controladorProducto = {
    //Dentro de este objeto literal va el listado de métodos donde se dará respuesta
    //index: mostrar listado de productos
    index: (req, res) => {
        res.render('/', { productos: productos });
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