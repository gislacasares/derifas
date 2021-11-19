const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const logDBMiddleware = require("../../middlewares/logDBMiddleware");

//uso destructuracion y solo pido la propiedad body
/*
const { body } = require("express-validator");

//Validaciones del formulario
const validateCreacionProductoForm = [
    body("titulo")
    .notEmpty()
    .withMessage("Debes completar el campo de título")
    .bail(),
    body("precio")
    .notEmpty()
    .withMessage("Debes completar el campo de precio")
    .bail(),
    body("fechaHoraLimite")
    .notEmpty()
    .withMessage("Debes completar el campo de fecha límite")
    .bail(),
    body("descripcion")
    .notEmpty()
    .withMessage("Debes completar el campo de descripción")
    .bail(),
];
*/
//Importo el módulo de productosController
const productosController = require("../../controllers/api/api-productos-controller");

//Configuracion del storare para las imagenes con Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../../../public/img/productos"));
    },
    //Filename genera y guarda el nombre del archivo
    filename: (req, file, cb) => {
        const nuevoNombreArchivo =
            Date.now() + "_producto" + path.extname(file.originalname);
        cb(null, nuevoNombreArchivo);
    },
});

//Ejecución de Multer
const upload = multer({ storage: storage });

/*** APIS ***/
/*** MOSTRAR UN PRODUCTO ***/
router.get("/show/:id", logDBMiddleware, productosController.mostrar_un_producto);
router.get("/all_products", logDBMiddleware, productosController.mostrar_todos_productos);
router.get("/show_news", logDBMiddleware, productosController.mostrar_novedades);
router.get("/show_last_oportunities", logDBMiddleware, productosController.mostrar_ultimas_oportunidades);
router.get("/show_random_products", logDBMiddleware, productosController.mostrar_productos_azar);
router.get("/search", logDBMiddleware, productosController.buscar);

/*** CREAR UN PRODUCTO ***/
//router.get("/post", logDBMiddleware, productosController.publicar);
/*** Procesamiento del formulario de creación de producto ***/
/*
router.post(
    "/publicar",
    upload.single("imagenProducto"),
    logDBMiddleware,
    validateCreacionProductoForm,
    //productosController.crearProducto
    productosController.createOneProduct
);

/*** EDITAR UN PRODUCTO ***/
//router.get("/editar/:id", productosController.editar);

/*** Procesamiento del formulario de edición de producto ***/
/*router.put(
    "/actualizar/:id",
    upload.single("imagenProducto"),
    logDBMiddleware,
    productosController.actualizar
);

/*** ELIMINAR UN PRODUCTO ***/
//router.delete("/borrar/:id", logDBMiddleware, productosController.borrar);


//exporto módulo router para hacerlo visible desde afuera
module.exports = router;