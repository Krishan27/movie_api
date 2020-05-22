const config = require('./config');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { mongoose } = require('./services/mongoDb.js');

var employeeController = require('./controllers/employeeController.js');
var movieController = require('./controllers/movieController.js');
var authController = require('./controllers/authController.js');
var healthController = require('./controllers/health.js');

var app = express();
app.use(bodyParser.json());
// app.use(app.router);

app.use(cors({ origin: config.getserver_host }));

app.listen(5000, () => console.log('Server started at port : 5000'));


app.use('/employees', employeeController);

app.use('/api/movies', movieController);
app.use('/api/wishlist', movieController);
app.use('/api/auth', authController);
app.use('/api/ping', healthController);


//app.use((req, res, next) => {
  //  const error = new Error("Not found");
    //error.status = 404;
    //next(error);
  //});
  
 // app.use((error, req, res, next) => {
   // res.status(error.status || 500);
   // res.json({
     // error: {
     //   message: error.message
    //  }
  //  });
//  });
  
  module.exports = app;

