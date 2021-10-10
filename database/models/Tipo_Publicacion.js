//Mapeo de Modelo a tabla Tipo_Publicacion

module.exports = (sequelize, dataTypes) => {
    let alias = "TipoPublicacion";

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

    const tipo_publicacion = sequelize.define(alias, cols, config);

    return tipo_publicacion;
};