const { Sequelize, Op} = require('sequelize');
// Llamada de los modelos 
const modelDispostivo = require('./models/Dispositivos');
const modelHouse = require('./models/house');
const modelRefDispositive = require('./models/dispostivo_referencias');
const modelAlarm = require('./models/alarm');


const sequelize = new Sequelize(`postgres:postgres:123@localhost:5432/saturno`, {
    logging: false,
    native: false,

    // CONFIGURACIÓN ADICIONAL
    // dialectOptions: {
    //     ssl: {
    //         require: true,
    //         rejectUnauthorized:false
    //     },
    // }
});


modelDispostivo(sequelize);
modelHouse(sequelize);
modelRefDispositive(sequelize);
modelAlarm(sequelize);

const { dispositivo, house, ref_dispositive, alarm } = sequelize.models;

// Relación 1 - 1 entre el dispositivo, y el hogar. 
dispositivo.hasOne(house); // Esto añade una clave foranea, del tipo de dispositivoID a la tabla House
house.belongsTo(dispositivo);

// Relación 1 - 1 entre el dispositivo y su referencia 
ref_dispositive.hasOne(dispositivo);
dispositivo.belongsTo(ref_dispositive);

// Relación 1 - M entre el dispositivo y la alarma. 
dispositivo.hasMany(alarm, {as: "alarmas", foreignKey:"dispositivoId"});
alarm.belongsTo(dispositivo, {as: "dispositivo"});  

module.exports = {
    ...sequelize.models,
    db: sequelize,
    Op
}