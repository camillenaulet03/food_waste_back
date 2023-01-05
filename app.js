const express = require('express');
const compression = require('compression');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.use(helmet());
app.use(compression());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization, UserID, Email');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

mongoose.connect("mongodb+srv://"+process.env.DB_USER+":"+process.env.DB_PASSWORD+"@cluster0.n6g726d.mongodb.net/?retryWrites=true&w=majority")
  .then(() => console.log('✅ Successfully connected to the database'))
  .catch((e) => console.log(`⛔️ Error during database connection ${e}`))

app.use(bodyParser.json());

const userRoutes = require('./routes/user');
const wasteRoutes = require('./routes/waste');

app.use('/api/auth', userRoutes)
app.use('/api/waste', wasteRoutes);

module.exports = app;
