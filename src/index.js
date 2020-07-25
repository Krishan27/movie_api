const config = require('./config');
// const swagger = require('./swagger.yaml')
const express = require('express');
const bodyParser = require('body-parser');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require("swagger-ui-express");



const worker = require('./jobs/workers');
const cors = require('cors');
const pino = require('pino');
const expressPino = require('express-pino-logger');

const logger = pino({ level: process.env.LOG_LEVEL || 'info' });
const expressLogger = expressPino({ logger });
const PORT = process.env.PORT || 5000;

var app = express();

app.use(expressLogger);

app.use(bodyParser.json());
// const path = require('path');
// console.log(">>>",path.resolve(__dirname))
// const YAML = require('yamljs');
// const swaggerDocument = YAML.load(swagger);
 
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));



var employeeController = require('./controllers/employeeController.js');
var movieController = require('./controllers/movieController.js');
var authController = require('./controllers/authController.js');
var healthController = require('./controllers/health.js');
var emailController = require('./controllers/emailController.js');

// var app = express();

// app.use(expressLogger);

// app.use(bodyParser.json());






app.use(cors({ origin: config.getserver_host }));

// app.listen(5000, () => console.log('Server started at port : 5000'));

app.listen(PORT, () => {
    logger.info('Server running on port %d', 5000);
   });


app.use('/employees', employeeController);
app.use('/api/movies', movieController);
app.use('/api/wishlist', movieController);
app.use('/api/auth', authController);
app.use('/api/ping', healthController);
app.use('/api/send', emailController);



//worker.boot();

module.exports = app;

