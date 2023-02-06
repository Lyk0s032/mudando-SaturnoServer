const { DataTypes } = require('sequelize');

module.exports = sequelize => {
sequelize.define('dispositivo', {
    //  Nombre del dispositivo
    name:{
        type: DataTypes.STRING,
        defaultValue: 'RSH' // Red Segurity Hose
    },
    location:{
        type: DataTypes.STRING,
        allowNull: false
    },
    state: {
        type:DataTypes.STRING,
        defaultValue: 'inactivo',
        allowNull: false
    }
})
}