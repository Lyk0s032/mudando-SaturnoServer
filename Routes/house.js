const { dispositivo, house, db, Op} = require('../db');


module.exports = {
    async postHouse(req, res){
        try{
            const { direccion, barrio, geoLocation, piso, detalles, dispositivoId } = req.body;

            if(!direccion || !barrio || !geoLocation || !piso || !detalles || !dispositivoId) return res.status(400).json({msg: 'Error al ingresar los dato'});
            const searchH = await house.findOne({ where: {
                direccion,
                geoLocation
            }});
            if(searchH) return res.status(400).json({msg: `Ya existe una casa regístrada`});
            const createH = await house.create({
                direccion,
                barrio,
                geoLocation,
                piso,
                detalles,
                dispositivoId
            });
            res.status(202).json(createH);
            
        }catch(err){
            res.status(404).json({msg: 'Hay un error'});
        }
    }
}