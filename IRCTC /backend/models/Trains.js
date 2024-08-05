const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Train = sequelize.define('Train', {
    trainName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    source: {
        type: DataTypes.STRING,
        allowNull: false
    },
    destination: {
        type: DataTypes.STRING,
        allowNull: false
    },
    availableSeats: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = Train;
