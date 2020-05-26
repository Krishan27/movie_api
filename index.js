const config = require('./config');
const express = require('express');
const bodyParser = require('body-parser');

const worker = require('./jobs/workers');
const cors = require('cors');


var employeeController = require('./controllers/employeeController.js');
var movieController = require('./controllers/movieController.js');
var authController = require('./controllers/authController.js');
var healthController = require('./controllers/health.js');
var emailController = require('./controllers/emailController.js');

var app = express();
app.use(bodyParser.json());

app.use(cors({ origin: config.getserver_host }));

app.listen(5000, () => console.log('Server started at port : 5000'));


app.use('/employees', employeeController);
app.use('/api/movies', movieController);
app.use('/api/wishlist', movieController);
app.use('/api/auth', authController);
app.use('/api/ping', healthController);
app.use('/api/send', emailController);


worker.boot();

module.exports = app;

