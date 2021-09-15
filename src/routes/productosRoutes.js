const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

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

/*** CREAR UN PRODUCTO ***/
router.get("/:id", productosController.index);
router.get("/publicar", productosController.publicar);
router.post(
    "/publicar",
    upload.single("imagenProducto"),
    productosController.crearProducto
);

/*** EDITAR UN PRODUCTO ***/
router.get("/modificar/:id", productosController.modificar);
router.put(
    "/actualizar/:id",
    upload.single("imagenProducto"),
    productosController.actualizar
);

//exporto módulo router para hacerlo visible desde afuera
module.exports = router;