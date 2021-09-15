const express = require("express");
//Como multer me permite procesar la info del formulario de creacion, se lo agrega en el ruteador que ataja dicho formulario con multer
const multer = require("multer");
const router = express.Router();
const path = require("path");

//Importo Ruteadores
const productosRoutes = require("./productosRoutes");
const usuariosRoutes = require("./usuariosRoutes");

//Importo Controladores
const mainController = require("../controllers/mainController");

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

//Ruteo
router.get("/", mainController.index);
router.use("/producto", productosRoutes);
router.use("/usuarios", usuariosRoutes);

module.exports = router;