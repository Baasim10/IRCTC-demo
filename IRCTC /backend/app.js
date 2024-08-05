const express = require('express');
const sequelize = require('./config/database');
const userRoutes = require('./routes/user');
const trainRoutes = require('./routes/train');
const app = express();

app.use(express.json());
app.use('/api', userRoutes);
app.use('/api', trainRoutes);

sequelize.sync().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});
