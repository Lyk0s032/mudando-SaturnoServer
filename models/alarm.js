const { DataTypes} = require('sequelize');

module.exports = sequelize => {
    sequelize.define('alarm', {
        typeAlarm: { // Tipo de alarma, en string
            type: DataTypes.STRING,
            allowNull: false
        },
        type: { // Tipo de alarma en identificador
            type: DataTypes.INTEGER,
            allowNull: false
        },
        code: { // Código para recuperar la consulta
            type: DataTypes.STRING,
            allowNull: false,
        },
        fecha: { // Fecha de alarma
            type: DataTypes.DATE
        },
        time: { // Hora de la alarma
            type: DataTypes.STRING
        },
        state: {
            type: DataTypes.STRING,
            defaultValue: 'activo' 
        },
        response:{
            type: DataTypes.STRING,
            defaultValue: 'esperando'
        }
    }, { timestamps: false,})
}