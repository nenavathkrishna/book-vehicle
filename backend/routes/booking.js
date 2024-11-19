const express = require('express')
const db = require('../models/index')
const { Op } = require('sequelize');


const router = express.Router()


router.post('/', async(req, res) => {
  console.log("what is request for booking", req.body);
  const { firstName, lastName, selectedModel, startDate, endDate } = req.body;

  if (!firstName || !lastName || !selectedModel) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Combine first and last name to form `bookedBy`
  const bookedBy = `${firstName} ${lastName}`.trim();

  try {
    // Check if the vehicle is already booked in the given date range
    const conflictingBooking = await db.Booking.findOne({
      where: {
        vehicleId: parseInt(selectedModel),
        [Op.or]: [
          { startDate: { [Op.between]: [startDate, endDate] } },
          { endDate: { [Op.between]: [startDate, endDate] } },
          {
            [Op.and]: [
              { startDate: { [Op.lte]: startDate } },
              { endDate: { [Op.gte]: endDate } },
            ],
          },
        ],
      },
    });

    if (conflictingBooking) {
      return res.status(400).json({ error: `Sorry, Vehicle is already booked for the given date range.` });
    }

    const booking = await db.Booking.create({
      vehicleId: parseInt(selectedModel),
      startDate: startDate,
      endDate: endDate,
      bookedBy: bookedBy,
    });

   
    return res.status(201).json({ message: 'Booking successful!', booking });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred while booking the vehicle.' });
  }
});



module.exports = router