const express = require('express');
const { Train } = require('../models/Train');
const { Booking } = require('../models/Booking');
const { authenticateToken, authenticateAdmin } = require('../middleware/auth');
const checkApiKey = require('../middleware/apiKeyAuth');
const router = express.Router();

router.post('/trains', checkApiKey, authenticateAdmin, async (req, res) => {
    try {
        const { trainName, source, destination, availableSeats } = req.body;
        const train = await Train.create({ trainName, source, destination, availableSeats });
        res.status(201).json(train);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.get('/trains', authenticateToken, async (req, res) => {
    try {
        const { source, destination } = req.query;
        const trains = await Train.findAll({ where: { source, destination } });
        res.json(trains);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/book', authenticateToken, async (req, res) => {
    try {
        const { trainId, seats } = req.body;
        const train = await Train.findByPk(trainId);
        if (train.availableSeats < seats) {
            return res.status(400).json({ error: 'Not enough seats available' });
        }
        const booking = await Booking.create({ userId: req.user.id, trainId, seatsBooked: seats });
        await train.update({ availableSeats: train.availableSeats - seats });
        res.status(201).json(booking);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/bookings/:id', authenticateToken, async (req, res) => {
    try {
        const booking = await Booking.findOne({ where: { id: req.params.id, userId: req.user.id } });
        if (!booking) {
            return res.status(404).json({ error: 'Booking not found' });
        }
        res.json(booking);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
