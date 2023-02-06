const { dispositivo, alarm, house, db, Op} = require('../db');

module.exports = {
    /**
     * -------------------------------------------------------------------------
     * -------------------------------------------------------------------------
     * -------------------------------------------------------------------------
     *  */

    // GET ALL -------------------------------------------------------
    async getAlarms(req, res){
        try{
            const searchAlarm = await alarm.findAll({
                where: {
                    state: 'activo'
                },
                include:[{
                    model:dispositivo,
                    as: 'dispositivo',                   
                    include:[{
                        model: house,
                    }],
                    attributes: ['id', 'name', 'location'],
                }],
                
            })
            if(searchAlarm.length > 0){
                res.json(searchAlarm);
            }else{
                res.status(404).json({msg: 'No hay alertas por el momento'});
            }
        }catch(err){
            console.log(err);
            res.status(400).json({msg: 'Lo siento, pero no se pueden visualizar por algún motivo'});
        }
    },
    /**
     * -------------------------------------------------------------------------
     * -------------------------------------------------------------------------
     * -------------------------------------------------------------------------
     *  */



    /**
     * -------------------------------------------------------------------------
     * -------------------------------------------------------------------------
     * -------------------------------------------------------------------------
     *  */
    // GET POLICE       --------------------------------------------------------
    async getAlarmsPolice(req, res){
        try{
            const searchAlarm = await alarm.findAll({
                where: {
                    state: 'activo',
                    type: 1 // Tipo de emergencia, policia
                },
                include:[{
                    model:dispositivo,
                    as: 'dispositivo',                   
                    include:[{
                        model: house,
                    }],
                    attributes: ['id', 'name', 'location'],
                }],
                
            })
            if(searchAlarm.length > 0){
                res.json(searchAlarm);
            }else{
                res.status(404).json({msg: 'No hay alertas por el momento'});
            }
        }catch(err){
            console.log(err);
            res.status(400).json({msg: 'Lo siento, pero no se pueden visualizar por algún motivo'});
        }
    },
    /**
     * -------------------------------------------------------------------------
     * -------------------------------------------------------------------------
     * -------------------------------------------------------------------------
     *  */



    /**
     * -------------------------------------------------------------------------
     * -------------------------------------------------------------------------
     * -------------------------------------------------------------------------
     *  */ 
    // GET AMBULANCE    --------------------------------------------------------
    async getAlarmsAmbulance(req, res){
        try{
            const searchAlarm = await alarm.findAll({
                where: {
                    state: 'activo',
                    type: 2 // Tipo de emergencia, ambulancia
                },
                include:[{
                    model:dispositivo,
                    as: 'dispositivo',                   
                    include:[{
                        model: house,
                    }],
                    attributes: ['id', 'name', 'location'],
                }],
                
            })
            if(searchAlarm.length > 0){
                res.json(searchAlarm);
            }else{
                res.status(404).json({msg: 'No hay alertas por el momento'});
            }
        }catch(err){
            console.log(err);
            res.status(400).json({msg: 'Lo siento, pero no se pueden visualizar por algún motivo'});
        }
    },
    /**
     * -------------------------------------------------------------------------
     * -------------------------------------------------------------------------
     * -------------------------------------------------------------------------
     *  */



    /**
     * -------------------------------------------------------------------------
     * -------------------------------------------------------------------------
     * -------------------------------------------------------------------------
     *  */
    // POST -------------------------------------------------------
    async createAlarm(req, res){
        try{
            const { id, type } = req.params; // Obtenemos id a través del url.
            const searchD = await dispositivo.findByPk(id); // Buscamos el dispositivo por id
            // Si no existe el dispositivo, arrojar mensaje
            if(!searchD) return res.status(404).json({msg: 'No hemos reconocido dispositivo'});
            // Si el estado del dispositivo es diferente de "activo", arrojar mensaje
            if(searchD.state !== 'activo') return res.status(503).json({msg: 'Lo siento, el dispositivo no es disponible'})
            // Si, el type es menor o mayor que los valores habiles, arrojar mensaje
            if(type <= 0 || type > 3) return res.json({msg: 'Tipo de alerta no disponible.'});


            // Buscamos en la base de datos, si existe una llamada realizada antes que aun este en proceso.
            const searchA = await alarm.findOne({where: {
                dispositivoId:id,
                type,
                state: 'activo' 
            }});
            // Si existe, evitamos la consulta para evitar saturación.
            if(searchA) return res.status(400).json({msg: 'Calma, ya estamos procesando tu llamada.'});


            const time = new Date(); // Obtenemos la fecha
            const code = `${id}%${Date.parse(time)}%${type}`; // Desarrollamos código con id, la fecha, y el type
            const divideTime = String(time).split(' ')[4]; // Dividimos el time para obtener la hora.
            // Si todo se cumple, creamos la alarma.
            const createA = await alarm.create({
                typeAlarm: 'Servicio de policia',
                type, 
                code,
                fecha: time,
                time: divideTime,
                dispositivoId: id 
            });
            // Devolvemos el objeto.
            res.json(createA);
        }catch(err){
            console.log(err);
            res.status(400).json({msg: 'Error al ejecutar esta ruta de función'});
        }
    },
    /**
     * -------------------------------------------------------------------------
     * -------------------------------------------------------------------------
     * -------------------------------------------------------------------------
     *  */

    /**
     * -------------------------------------------------------------------------
     * -------------------------------------------------------------------------
     * -------------------------------------------------------------------------
     *  */
    // PUT -------------------------------------------------------
    // Actualizar a llamado
    async updateToCall(req, res){
        try{

        }catch(err){
            console.log(err);
            res.status(404).json({msg: 'Error al intentar confirmar la llamada'});
        }
    }
}