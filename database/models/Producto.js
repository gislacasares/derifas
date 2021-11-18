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
        tableName: "Productos",
        timestamps: false,
    };

    let Producto = sequelize.define(alias, cols, config);

    //establezco relacion con Productos: tipo_publicacion tiene muchos productos
    Producto.associate = function(models) {
        //Models.Productos es el alias en Producto.js

        Producto.belongsTo(models.Tipo_Publicacion, {
            as: "tipoPublicacion",
            foreignKey: "tipo_publicacion",
        });

        Producto.hasMany(models.Preguntas, {
            as: 'preguntas',
            //Acá va el id de la otra tabla que me relaciona a esta tabla de Producto
            foreignKey: "id_publicacion",
        });

        Producto.hasMany(models.Cuponera, {
            as: 'cuponera',
            foreignKey: 'producto_id',
        });
    };

    return Producto;
};