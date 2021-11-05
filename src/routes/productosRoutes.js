const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const logDBMiddleware = require("../middlewares/logDBMiddleware");

//uso destructuracion y solo pido la propiedad body
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

//Importo el módulo de productosController
const productosController = require("../controllers/productosController");

//Configuracion del storare para las imagenes con Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../../public/img/productos"));
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

/*** MOSTRAR UN PRODUCTO ***/
//router.get("/mostrar/:id", logDBMiddleware, productosController.mostrar); //version sin cuponera
router.get("/mostrar_v2/:id", logDBMiddleware, productosController.mostrar_v2);

/*** CREAR UN PRODUCTO ***/
router.get("/publicar", logDBMiddleware, productosController.publicar);
/*** Procesamiento del formulario de creación de producto ***/
router.post(
    "/publicar",
    upload.single("imagenProducto"),
    logDBMiddleware,
    validateCreacionProductoForm,
    //productosController.crearProducto
    productosController.createOneProduct
);

/*** EDITAR UN PRODUCTO ***/
router.get("/editar/:id", productosController.editar);

/*** Procesamiento del formulario de edición de producto ***/
router.put(
    "/actualizar/:id",
    upload.single("imagenProducto"),
    logDBMiddleware,
    productosController.actualizar
);

/*** ELIMINAR UN PRODUCTO ***/
router.delete("/borrar/:id", logDBMiddleware, productosController.borrar);

/*** APIS ***/
router.get("/mostrar_novedades_api", logDBMiddleware, productosController.mostrar_novedades_api);
router.get("/mostrar_ultimas_oportunidades_api", logDBMiddleware, productosController.mostrar_ultimas_oportunidades_api);
router.get("/mostrar_productos_azar_api", logDBMiddleware, productosController.mostrar_productos_azar_api);
router.get("/buscar", logDBMiddleware, productosController.buscar_por_palabra_clave);
//exporto módulo router para hacerlo visible desde afuera
module.exports = router;