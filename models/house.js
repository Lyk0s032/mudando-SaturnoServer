const { DataTypes} = require('sequelize');

module.exports = sequelize => {
    sequelize.define('house', {
        // Dirección del hogar
        direccion: {
            type: DataTypes.STRING,
            allowNull: false
        },
        barrio: {
            type: DataTypes.STRING,
            allowNull: false
        },
        geoLocation: {
            type: DataTypes.STRING,
            allowNull: false
        },
        piso: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        detalles: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
}