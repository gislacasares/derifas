module.exports = (sequelize, dataTypes) => {
    let alias = "Usuarios";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nombre: {
            type: dataTypes.STRING(100),
        },
        apellido: {
            type: dataTypes.STRING(100),
        },
        password: {
            type: dataTypes.STRING(50),
        },
        fecha_nacimiento: {
            type: dataTypes.DATE,
        },
        email: {
            type: dataTypes.STRING(100),
        },
        telefono: {
            type: dataTypes.STRING(50),
        },
    };
    let config = {
        tableName: "Usuarios",
        timestamps: false,
    };

    const Usuario = sequelize.define(alias, cols, config);

    return Usuario;
};