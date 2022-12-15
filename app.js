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
const db = 'mongodb+srv://camille:1H8F8xIDgG0qPbpw@cluster0.n6g726d.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(db)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => {
        console.log('MongoDB ERROR CONNECT', err)
});

app.use(bodyParser.json());

const userRoutes = require('./routes/user');

app.use('/api/auth', userRoutes);

module.exports = app;
