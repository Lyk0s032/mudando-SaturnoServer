const {Sequelize,  DataTypes, INTEGER } = require('sequelize');
const { dispositivo, ref_dispositive, Op, db } = require('../db');


module.exports = {

    async getReferenceDispositive(req, res){
        try{
            const { id }  = req.params;
            const searchREF = await ref_dispositive.findByPk(id);
            if(!searchREF) return res.status(404).json({msg: 'Esta referencia no existe'});
            res.json(searchREF);
        }catch(err){
            console.log(err);
            res.send('Error al buscar referencia');
        }
    },
    async postReferenceDispositive(req, res){
        try{
            const { name, sistema, size, color, botones, imgProducto, peso, pProducion,pVenta} = req.body;
            if(!name || !sistema || !size || !color || !botones || !imgProducto || !peso || !pProducion || !pVenta) return res.status(404).json({msg: 'No es posible crear la referencia, faltan datos'});
            
            const searchREF = await ref_dispositive.findOne({ where: {
                name
            }});
            if(searchREF) return res.status(400).json({msg: 'Ya existe esta referencia'});

            const createREF = await ref_dispositive.create({
                name, 
                sistema,
                size,
                color, 
                botones,
                imgProducto,
                peso,
                pProducion,
                pVenta
            });
            res.status(200).json(createREF);
        }catch(err){
            res.send(err);
        }
    },
}