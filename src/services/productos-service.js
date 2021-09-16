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
            return prod.novedad == true && prod.delete == false;
        });

        return productosNovedad;
    },

    filtradoPorUltimaOportunidad(categoria) {
        const productosUltimaOportunidad = productos.filter((prod) => {
            return prod.ultima_oportunidad == true && prod.delete == false;
        });

        return productosUltimaOportunidad;
    },

    buscarUnProductoPorId(id) {
        const producto = productos.find((prod) => {
            return prod.id == id;
        });
        return producto;
    },

    crearUnProducto(payload, imagen) {
        const productoMaximoId = Math.max.apply(
            Math,
            productos.map(function(o) {
                return o.id;
            })
        );
        let nuevo_producto = {
            id: productoMaximoId + 1,
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