module.exports = (sequelize, dataTypes) => {
    let alias = "Respuestas";
    let cols = {
        id_respuesta: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        id_pregunta: {
            type: dataTypes.INTEGER,
            foreignKey: true,
            allowNull: false,
        },
        id_usuario: {
            type: dataTypes.INTEGER,
            foreignKey: true,
            allowNull: false,
        },
        respuesta_descripcion: {
            type: dataTypes.TEXT,
            allowNull: false,
        },
        tiempo_demora: {
            type: dataTypes.BIGINT,
            allowNull: false
        },
        usuario_creacion: {
            type: dataTypes.INTEGER,
            allowNull: false,
        },
        usuario_modificacion: {
            type: dataTypes.INTEGER,
            allowNull: false,
        },
        fecha_creacion: {
            type: dataTypes.DATE,
            allowNull: false
        },
        fecha_modificacion: {
            type: dataTypes.DATE,
            allowNull: false
        },
    };

    let config = {
        tableName: "Respuesta",
        timestamps: true,
        createdAt: "fecha_creacion",
        updatedAt: "fecha_modificacion",
    };

    let Respuesta = sequelize.define(alias, cols, config);

    //establezco relacion con Productos: tipo_publicacion tiene muchos productos
    Respuesta.associate = function(models) {
        //Models.Productos es el alias en Producto.js
        Respuesta.belongsTo(models.Preguntas, {
            as: "pregunta",
            foreignKey: "id_pregunta",
        });
    };

    return Respuesta;
};