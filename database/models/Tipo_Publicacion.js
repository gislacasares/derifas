//Mapeo de Modelo a tabla Tipo_Publicacion
module.exports = (sequelize, dataTypes) => {
    let alias = "Tipo_Publicacion";

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        tipo: {
            type: dataTypes.STRING(25),
            foreignKey: false,
            allowNull: false,
        },
        estado: {
            type: dataTypes.BOOLEAN,
            allowNull: false,
        },
    };

    let config = {
        tableName: "tipo_publicacion",
        timestamps: false,
    };

    let Tipo_Publicacion = sequelize.define(alias, cols, config);

    //establezco relacion con Productos: tipo_publicacion tiene muchos productos
    Tipo_Publicacion.associate = function(models) {
        //Models.Productos es el alias en Producto.js
        Tipo_Publicacion.hasMany(models.Productos, {
            as: "producto",
            foreignKey: "id",
        });
    };

    return Tipo_Publicacion;
};