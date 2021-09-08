const express = require('express');
//Como multer me permite procesar la info del formulario de creacion, se lo agrega en el ruteador que ataja dicho formulario con multer
const multer = require('multer');
const router = express.Router();
const path = require('path');
const mainController = require('../controllers/mainController');
const productosRoutes = require('./productosRoutes');

//Configuracion del storare para las imagenes con Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../public/img/productos'));
    },
    //Filename genera y guarda el nombre del archivo
    filename: (req, file, cb) => {
        const nuevoNombreArchivo = Date.now() + '_producto' + path.extname(file.originalname);
        cb(null, nuevoNombreArchivo);
    }
});

//Ejecución de Multer
const upload = multer({ storage: storage });


router.get('/', mainController.index);
router.use('/producto', productosRoutes);
router.get('/ingreso', mainController.ingreso);
router.get('/registro', mainController.registro);
router.post('/registro', mainController.crearUsuario);
router.get('/publicar', mainController.publicar);
router.post('/publicar', upload.single('imagenProducto'), mainController.crearProducto);

module.exports = router;