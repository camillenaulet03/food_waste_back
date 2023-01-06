const express = require('express');
const compression = require('compression');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const serverless = require('serverless-http')

const logger = require('./log/logger');
const cors = require('cors');

const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const userRoutes = require('./routes/user');
const wasteRoutes = require('./routes/waste');
const soapSubstractRoutes = require('./routes/soapSubstract');

const app = express();

app.use(cors());
app.use(helmet())
  .use(compression())
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization, UserID, Email');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

// Mongo Connection
mongoose.connect("mongodb+srv://"+process.env.DB_USER+":"+process.env.DB_PASSWORD+"@cluster0.n6g726d.mongodb.net/?retryWrites=true&w=majority")
  .then(() => logger.info('✅ Successfully connected to the database'))
  .catch((e) => logger.error(`⛔️ Error during database connection - ${e}`))

// Swagger config
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "WASTE API",
      version: "1.0.0",
      description: "Waste api documentation",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
    },
    servers: [
      {
        url: "http://localhost:8080",
      },
    ],
  },
  apis: ["./routes/waste.js", "./routes/user.js"],
  prefix : ["api/waste/"],
};

// Routes
app.use('/api/auth', userRoutes)
   .use('/api/wastes', wasteRoutes)
   .use('/soap', soapSubstractRoutes)
   .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(options), { explorer: true }));

module.exports = serverless(app);
