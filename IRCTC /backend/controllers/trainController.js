const Train = require('../models/Train');

const addTrain = async (req, res) => {
  const { trainName, source, destination, availableSeats } = req.body;

  try {
    const train = await Train.create({ trainName, source, destination, availableSeats });
    res.status(201).json(train);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getTrains = async (req, res) => {
  const { source, destination } = req.query;

  try {
    const trains = await Train.findAll({ where: { source, destination } });
    res.json(trains);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { addTrain, getTrains };
