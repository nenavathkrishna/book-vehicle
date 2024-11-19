const express = require('express')
const db = require('../models/index')

const router = express.Router()

router.get('/', async(req, res)=>{
    const vehicleTypes = await db.VehicleType.findAll();
    res.send({msg:"Vehicle router", data:vehicleTypes})
})

router.get('/types', async(req, res)=>{
    try {
        const { wheels } = req.query;

        if (!wheels || (wheels !== '2' && wheels !== '4')) {
        return res.status(400).json({ error: 'Invalid or missing wheels parameter. Only 2 or 4 are allowed.' });
        }

        const vehicleTypes = await db.VehicleType.findAll({
        where: {
            wheels: parseInt(wheels), 
        }
        });

        console.log("Get hehicle based on wheels", vehicleTypes)

        res.json(vehicleTypes.map(vehicle => vehicle.dataValues));
        
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
        
    }
})

router.get('/models', async(req, res)=>{
    try {
        const { type } = req.query;
        console.log("what is type", type)

        if (!type) {
        return res.status(400).json({ error: 'Invalid or missing wheels parameter. Only 2 or 4 are allowed.' });
        }

        // const vehicleTypes = await db.VehicleType.findAll({
        // where: {
        //     id: parseInt(type), 
        // }
        // });

         // Find vehicles that match the VehicleType ID
        const vehicles = await db.Vehicle.findAll({
            where: { typeId: parseInt(type) }
        });

        console.log("Get model", vehicles)

        res.status(200).json(vehicles.map(vehicle => vehicle.dataValues));
        
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
        
    }
})




module.exports = router