//Importo para usar la DB
const db = require("../../database/models");

const usuariosService = {
    create(payload) {
        db.Usuarios.create({
            nombre: payload.nombre,
            apellido: payload.apellido,
            password: payload.password,
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
    list() {
        const users = db.Usuarios.findAll().then((listaUsuarios) => {
            return listaUsuarios;
        });
        return users;
    },
};

module.exports = usuariosService;