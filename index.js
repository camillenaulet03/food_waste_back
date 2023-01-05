// const http = require('http');
const port = process.env.PORT || 8083;
// const app = require('./app');
const express = require('express');
const wasteRoutes = require("./api/waste");
const app = express();
app.use(express.json({extended: false}));

app.use('/api/wastes', wasteRoutes);

// const server = http.createServer(app);

app.listen(port, () => console.log("server started"));

console.log('Server created');
console.log('Listen on port ', port);
