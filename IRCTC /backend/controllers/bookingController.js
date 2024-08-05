const Booking = require('../models/Booking');
const Train = require('../models/Train');

const bookSeat = async (req, res) => {
  const { trainId, seats } = req.body;
  const userId = req.user.id;

  try {
    const train = await Train.findByPk(trainId);
    if (!train || train.availableSeats < seats) {
      return res.status(400).json({ message: 'Not enough seats available' });
    }

    await Booking.create({ trainId, userId, seats });
    train.availableSeats -= seats;
    await train.save();

    res.status(201).json({ message: 'Booking successful' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getBookingDetails = async (req, res) => {
  const { id } = req.params;

  try {
    const booking = await Booking.findByPk(id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { bookSeat, getBookingDetails };
