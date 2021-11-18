module.exports = (sequelize, dataTypes) => {
    let alias = "Preguntas";
    let cols = {
        pregunta_id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        id_usuario: {
            type: dataTypes.INTEGER,
            foreignKey: true,
            allowNull: false,
        },
        id_publicacion: {
            type: dataTypes.INTEGER,
            foreignKey: true,
            allowNull: false,
        },
        estado: {
            type: dataTypes.STRING(10),
            allowNull: false,
        },
        pregunta_descripcion: {
            type: dataTypes.TEXT,
            allowNull: false,
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
        tableName: "pregunta",
        timestamp: true,
        createdAt: "fecha_creacion",
        updatedAt: "fecha_modificacion",
    };

    let Pregunta = sequelize.define(alias, cols, config);

    //establezco relacion con Productos: Productos tiene 0 a N preguntas

    Pregunta.associate = function(models) {
        //Models.Preguntas es el alias en Pregunta.js
        Pregunta.belongsTo(models.Productos, {
            as: "productos",
            foreignKey: "id_publicacion",
        });

        Pregunta.belongsTo(models.Respuestas, {
            as: "respuesta",
            foreignKey: "id_pregunta",
        });
    };

    return Pregunta;
};