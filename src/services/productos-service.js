const path = require("path");
const fs = require("fs");

//Importo para usar la DB
const db = require("../../database/models");

//importo el json de productos
const productosFilePath = path.join(
    __dirname,
    "../data/productosDataBase.json"
);

//Transformo el String JSON a array de objetos
const productos = JSON.parse(fs.readFileSync(productosFilePath, "utf-8"));

const productosService = {
    filtradoPorNovedad: async() => {
        const productosNovedad = await db.Productos.findAll({
            where: {
                novedad: 1,
                activo: 1,
            },
            order: [
                ["id", "DESC"]
            ],
        });
        //console.log(productosNovedad);
        return productosNovedad;
    },

    filtradoPorUltimaOportunidad: async() => {
        const productosUltimaOportunidad = await db.Productos.findAll({
            where: {
                ultima_oportunidad: 1,
                activo: 1,
            },
            order: [
                ["id", "DESC"]
            ],
        });

        return productosUltimaOportunidad;
    },

    createOneProduct: async(payload, imagen) => {
        const prod = await db.Productos.create({
            usuario_id: 5,
            estado_producto: payload.estado_producto,
            nombre: payload.titulo,
            precio: payload.precio,
            tipo_publicacion: payload.tipo_publicacion,
            fecha_hora_limite: payload.fechaHoraLimite,
            total_cupones: payload.total_cupones,
            cupones_disponibles: payload.total_cupones,
            descripcion: payload.descripcion,
            imagen: imagen ? imagen.filename : "default-image.png",
            novedad: 1,
            ultima_oportunidad: 0,
            activo: 1,
            fecha_creacion: Date.now(),
        });

        return prod.id;
    },

    findOneProduct: async(id_producto) => {
        const producto = await db.Productos.findByPk(
            id_producto
            /*, {
                                               //Aca le digo que me traiga el tipoPublicacion del Producto para mostrarlo en la vista
                                               include: [{ associate: "tipoPublicacion" }],
                                           }*/
        );
        //const tipo_publicacion =

        return producto;
    },

    buscarUnProductoPorId(id) {
        const producto = productos.find((prod) => {
            return prod.id == id;
        });
        return producto;
    },
    productoMaximoId() {
        const productoMaximoId = Math.max.apply(
            Math,
            productos.map(function(o) {
                return o.id;
            })
        );
        return productoMaximoId;
    },

    crearUnProducto(payload, imagen) {
        let nuevo_producto = {
            id: this.productoMaximoId() + 1,
            nombre: payload.titulo,
            precio: parseFloat(payload.precio),
            fecha_y_hora_limite: payload.fechaHoraLimite,
            total_cupones: parseInt(payload.total_cupones),
            cupones_disponibles: parseInt(payload.total_cupones),
            descripcion: payload.descripcion,
            imagen: imagen ? imagen.filename : "default-image.png",
            novedad: true,
            ultima_oportunidad: false,
            delete: false,
        };

        //Meto el nuevo producto en el array de productos
        productos.push(nuevo_producto);

        this.save();
        return nuevo_producto.id;
    },

    editarUnProducto(id, payload, imagen) {
        const producto = this.buscarUnProductoPorId(id);
        //producto.id = req.params.id;
        producto.nombre = payload.titulo;
        producto.precio = payload.precio;
        producto.fecha_y_hora_limite = payload.fecha_y_hora_limite;
        producto.total_cupones = payload.totalCupones;
        producto.descripcion = payload.descripcion;
        producto.imagen = imagen ? imagen.filename : producto.imagen;

        this.save();
    },

    save() {
        const jsonString = JSON.stringify(productos, null, 4);
        fs.writeFileSync(productosFilePath, jsonString);
    },

    delete(id) {
        const producto = this.buscarUnProductoPorId(id);
        producto.delete = true;
        this.save();
    },
};

module.exports = productosService;