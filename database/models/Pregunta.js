module.exports = (sequelize, dataTypes) => {
    let alias = "Preguntas";
    let cols = {
        pregunta_id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        usuario_id: {
            type: dataTypes.INTEGER,
            foreignKey: true,
            allowNull: false,
        },
        estado_producto: {
            type: dataTypes.STRING(10),
            allowNull: false,
        },
        nombre: {
            type: dataTypes.STRING(250),
            allowNull: false,
        },
        precio: {
            type: dataTypes.FLOAT,
            allowNull: false,
        },
        tipo_publicacion: {
            type: dataTypes.INTEGER,
            allowNull: false,
        },

        fecha_hora_limite: {
            type: dataTypes.DATE,
            allowNull: false,
        },
        total_cupones: {
            type: dataTypes.INTEGER,
            allowNull: false,
        },
        cupones_disponibles: {
            type: dataTypes.INTEGER,
            allowNull: false,
        },
        descripcion: {
            type: dataTypes.TEXT,
            allowNull: true,
        },
        imagen: {
            type: dataTypes.STRING(250),
            allowNull: false,
        },
        novedad: {
            type: dataTypes.BOOLEAN,
            allowNull: false,
        },
        ultima_oportunidad: {
            type: dataTypes.BOOLEAN,
            allowNull: false,
        },
        activo: {
            type: dataTypes.BOOLEAN,
            allowNull: false,
        },
    };

    let config = {
        tableName: "Pregunta",
        timestamps: true,
    };

    let Pregunta = sequelize.define(alias, cols, config);

    //establezco relacion con Productos: tipo_publicacion tiene muchos productos
    /*
    Pregunta.associate = function(models) {
        //Models.Productos es el alias en Producto.js
        Pregunta.belongsTo(models.Tipo_Publicacion, {
            as: "tipoPublicacion",
            foreignKey: "id",
        });
    };
*/
    return Pregunta;
};