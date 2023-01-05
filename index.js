// const http = require('http');
const port = process.env.PORT || 8080;
// const app = require('./app');
const express = require('express');
const wasteRoutes = require("./routes/waste");
const app = express();
app.use(express.json({extended: false}));

app.use('/api/wastes', wasteRoutes);
app.use(express.static('public'))

// const server = http.createServer(app);

app.listen(port, () => console.log("server started"));

console.log('Server created');
console.log('Listen on port ', port);
