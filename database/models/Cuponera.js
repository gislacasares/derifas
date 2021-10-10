//Mapeo de Modelo a tabla Cuponera

module.exports = (sequelize, dataTypes) => {
    let alias = "Cuponera";

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        producto_id: {
            type: dataTypes.INTEGER,
            foreignKey: true,
            allowNull: false,
        },
        numero_cupon: {
            type: dataTypes.INTEGER,
            allowNull: false,
        },

        usuario_comprador_id: {
            type: dataTypes.INTEGER,
            foreignKey: true,
            allowNull: true,
        },
        estado: {
            type: dataTypes.BOOLEAN,
            allowNull: false,
        },
        vendido: {
            type: dataTypes.BOOLEAN,
            allowNull: false,
        },
        precio_cupon: {
            type: dataTypes.FLOAT,
            allowNull: false,
        },
        fecha_compra: {
            type: dataTypes.DATE,
            allowNull: true,
        },
    };

    let config = {
        tableName: "Cuponera",
        timestamps: false,
        createdAt: "fecha_creacion",
        updatedAt: "fecha_modificacion",
    };

    const cuponera = sequelize.define(alias, cols, config);

    return cuponera;
};