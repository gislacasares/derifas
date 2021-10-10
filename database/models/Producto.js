module.exports = (sequelize, dataTypes) => {
    let alias = "Productos";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
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
        /*fecha_creacion: {
                type: dataTypes.DATE,
                allowNull: false,
            },*/
    };

    let config = {
        tableName: "Productos",
        timestamps: false,
    };

    const Producto = sequelize.define(alias, cols, config);

    return Producto;
};