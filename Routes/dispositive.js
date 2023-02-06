const {Sequelize,  DataTypes, INTEGER } = require('sequelize');
const { dispositivo, ref_dispositive, house, Op, db } = require('../db');


module.exports = {
    async getAllDispositives(req, res){
        try{
            res.send('Funciona la ruta.');
        }catch(err){
            res.send(err);
        }
    }, // Obtiene un dispositivo especifico
    async getDispositive(req, res){
        try{
            const { id }  = req.params; // Recibe el parametro de id
            const searchD = await dispositivo.findByPk(id,{  // Buscar el registro sql a través del id
            include: [{
                model: house,
                attributes: ['direccion', 'barrio', 'geoLocation', 'piso', 'detalles', 'dispositivoId']
     
            },{
                model: ref_dispositive,
                attributes: ['name', 'sistema', 'size', 'color', 'botones', 'imgProducto', 'peso', 'pProducion','pVenta']
            }],
                attributes: ['id', 'name', 'location']
            });
            
            // Si no existe, muestra esto
            if(!searchD) return res.status(404).json({msg: 'No existe este dispositivo'}); 
            res.json(searchD); // Si existe, muestra el registro.
        }catch(err){ // En caso de error has esto:
            console.log(err);
            res.send('error');
        }
    },
    // POST 
    async postDispositive(req, res){ // Crear dispositivo
        try{
            const { name, location, state, referenciaId } = req.body; // Recibe los valores por body
            if(!name || !location || !referenciaId) return res.status(404).json({msg: 'No se puede registrar el dispositivo'});
            const searchD = await dispositivo.findOne({ where: { // Si los valores son validos, busca por name y location
                name,
                location
            }});
            if(!searchD){ // Si no existe un registro, crealo.
                const createD = await dispositivo.create({
                    name,
                    location,
                    state,
                    refDispositiveId: referenciaId
                }); 
                res.status(200).json(createD); // Y lo retornas
            }else{
                res.status(404).json({msg: 'Ya existe un dispositivo con estas indicaciones.'}); // Caso contrario, devuelves este mensaje.
            }
        }catch(err){
            res.status(400).send('Error al registrar dispositivo'); // Error de try catch
        }
    }
}