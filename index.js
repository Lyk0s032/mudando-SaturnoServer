const express = require('express');
const {Sequelize,  DataTypes, INTEGER } = require('sequelize');
const { dispostivo, db, Op } = require('./db');


// RUTAS ---------------------------------------------------------------

// Dispositivos
const { 
    getAllDispositives, 
    getDispositive,
    postDispositive } = require('./Routes/dispositive');

// Referencias de dispositivo.
const {
    getReferenceDispositive, // Obtener una referencia de dispositivo
    postReferenceDispositive // Crear referencia
} = require('./Routes/referenceDis');

// Casas
const {
    postHouse // Crear la casa
} = require('./Routes/house');

// Alarmas
const {
    getAlarms, // Obtener las alarmas
    getAlarmsPolice, // Obtenemos las alarmas de policia
    getAlarmsAmbulance, // Obtenemos las alarmas de ambulancia
    createAlarm, // Crear alarma
    updateToCall, // Actualizar a LLAMADO.
} = require('./Routes/alarm');

// ----------------------------------------------------------------------
const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Building de server...');
});

// Dispositivos
app.get('/dispositivos/g', getAllDispositives); // Obtener la lista de todos los dispotivos.
app.get('/dispositivos/g/:id', getDispositive); // Obtener un dispositivo especifico
app.post('/dispositivos/p/', postDispositive); // Crear dispositivo

// Referencias
app.get('/refDispositive/g/:id', getReferenceDispositive) // Obtener una referencia
app.post('/refDispositive/p/', postReferenceDispositive) // Crear una referencia

// Houses
app.post('/houses/p/', postHouse);


// Alarm
app.get('/alarm/g/', getAlarms); // Obtener las alarmas precionadas. --- SIN CÓDIGO ---
app.get('/alarm/g/police', getAlarmsPolice); // Obtener las alarmas precionadas. --- CÓDIGO 1 ---
app.get('/alarm/g/ambulance', getAlarmsAmbulance); // Obtener las alarmas precionadas. --- CÓDIGO 2 ---

app.post('/alarm/p/:id/:type', createAlarm); // Crear la alarma, id:'Dispositivo', type: 'Tipo de emergencia'.

app.put('/alarm/up', updateToCall);


// Escuchando en el puerto 3001
app.listen(3001, () => {
    db.sync();
    console.log(`Server On PORT ${3000}`);
})