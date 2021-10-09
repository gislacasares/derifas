const express = require("express");
const path = require("path");
const app = express();

//Configuración para métodos override HTTP de PUT y DELETE
const methodOverride = require("method-override");

//agrego las rutas
const mainRoutes = require("./src/routes/mainRoutes");
const usuariosroutes = require("./src/routes/usuariosRoutes");
const productosRoutes = require("./src/routes/productosRoutes");

//Levanto la app localmente en el port 3000 o con el port que me asigne Heroku
app.listen(process.env.PORT || 3000, () => {
    console.log("Webserver levantado, corriendo y escuchando en el port 3000");
});

console.log(__dirname);
//Va a servir los archivos publicos desde /img (esta es su raíz)
app.use(express.static(path.join(__dirname, "/public")));

//Configuración del motor de vistas EJS
app.set("view engine", "ejs");

//Configuración de la carpeta donde se alojan las views
app.set("views", "src/views");

//Configuración para métodos override HTTP de PUT y DELETE, debe estar definido antes de definir las rutas
app.use(methodOverride("_method"));

//Configuración del entorno para capturar los datos de formulario como objeto literal y tambien transformarlo a JSON
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Seteos de endpoints
app.use("/", mainRoutes);
app.use("/usuarios", usuariosroutes);
app.use("/productos", productosRoutes);

//404 not found
app.use((req, res, next) => {
    res.status(404).render("404-pagina");
    next();
});