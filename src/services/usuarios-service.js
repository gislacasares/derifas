//Importo para usar la DB
const db = require("../../database/models");
const {Op} = require("sequelize");
const bcryptjs = require('bcryptjs');
const SAL_HASH = 12;

const usuariosService = {
    create(payload) {
        db.Usuarios.create({
            nombre: payload.nombre,
            apellido: payload.apellido,
            password: bcryptjs.hashSync(payload.password, SAL_HASH),
            fecha_nacimiento: payload.fechaNacimiento,
            email: payload.email,
            telefono: payload.telefono,
            activo: 1,
            fecha_creacion: Date.now(),
        });
    },
    modify(payload) {},
    delete(id) {},
    show() {},

    searchByEmail: async(emailString) => {
                
        const emailEncontrado = await db.Usuarios.findOne({
            where: {
                email:{
                    [Op.like]: `%${emailString}%`,
                }
            }
        });
        return emailEncontrado;
        
    },

    list() {
        const users = db.Usuarios.findAll().then((listaUsuarios) => {
            return listaUsuarios;
        });
        return users;
    },
};

module.exports = usuariosService;