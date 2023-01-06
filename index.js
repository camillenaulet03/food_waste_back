const http = require('http');
const port = process.env.PORT || 8080;
const app = require('./app');

const index = http.createServer(app);

index.listen(port);

console.log('Server created');
console.log('Listen on port ', port);
