const usuariosService = require("../services/usuarios-service");
const bcryptjs = require('bcryptjs');

const usuariosController = {
    //Dentro de este objeto literal va el listado de métodos donde se dará respuesta
    //index: mostrar listado de productos
    registro: (req, res) => {
        //res.send('formulario de registro');
        res.render("registro");
    },
    show: (req, res) => {
        //res.send("bienvenidos al perfil de usuario");
        //trae todos los usuarios de la tabla
        //db.Usuarios.findAll().then(function(usuarios) {
        //    res.render("listado-de-usuarios", { usuarios: usuarios });
        // });
    },

    login: (req, res) => {
        return res.render("login", {alert: false});
    },

    procesarLogin: async(req, res) =>{
       try {
           const usuario = req.body.email;
           const password = req.body.password;           

           //Si falta ingresar usuario o password
           if(!usuario || !password){
               return res.render('login', {
                   alert: true,
                   alertTitle: "Advertencia",
                   alertMessage: "Debe ingresar email y password",                
                   alertIcon: 'warning',
                   showConfirmButton: true,
                   confirmButtonText: "Aceptar",
                   timer: false,
                   ruta: 'usuarios/login'
               });
               //Verificar que el mail recibido exista en la DB y password correcta              
           }else{
               const usuarioEncontrado =  await usuariosService.searchByEmail(req.body.email);
               const passwordCorrecta = await bcryptjs.compare(req.body.password, usuarioEncontrado.password); 

               //Si encontró el usuario y passwordCorrecta existe es porque login ok
               if(usuarioEncontrado && passwordCorrecta){
                    req.session.userId = usuarioEncontrado.id;
                    res.render('login', {
                        alert: true,
                        alertTitle: "Bienvenido",
                        alertMessage: "Ingresó correctamente",
                        alertIcon: 'success',
                        showConfirmButton: false,
                        timer: 1500,
                        ruta: '',
                    });
                    //Caso contrario, mostrar errores de validación
                }else{
                    return res.render('login', {
                        alert: true,
                        alertTitle: "Error de Validación",
                        alertMessage: "Ingrese nuevamente email y password",                
                        alertIcon: 'error',
                        showConfirmButton: true,
                        confirmButtonText: "Aceptar",
                        timer: false,
                        ruta: 'usuarios/login'
                    });
                }           
             }
        } catch (error) {
            console.log("error");
        }                 
   
    },

    crearUsuario: (req, res) => {
        usuariosService.create(req.body);
        /*
        db.Usuarios.create({
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            password: req.body.password,
            fecha_nacimiento: req.body.fechaNacimiento,
            email: req.body.email,
            telefono: req.body.telefono,
        });
        */
        res.redirect("/");
    },
    list: (req, res) => {
        res.send("usuariosService.list");
    },
};

module.exports = usuariosController;