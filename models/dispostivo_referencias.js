const { DataTypes } = require('sequelize');

module.exports = sequelize => {
    sequelize.define('ref_dispositive', {
        name:{
            type: DataTypes.STRING,
            allowNull: false
        },
        sistema:{
            type: DataTypes.STRING,
            allowNull: false
        },
        size:{
            type: DataTypes.STRING,
            allowNull:false
        },    
        color:{
            type: DataTypes.STRING,
            allowNull: false
        },
        botones:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        imgProducto: {
            type: DataTypes.STRING,
            allowNull:false
        },
        peso: {
            type: DataTypes.INTEGER,
            allowNull: false
        },   
        pProducion: {
            type: DataTypes.STRING,
            allowNull: false
        }, 
        pVenta: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
}