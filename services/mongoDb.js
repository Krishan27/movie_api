const config = require('../config');
const mongoose = require('mongoose');

mongoose.connect(config.connect_mongoclient,{ useUnifiedTopology: true,useNewUrlParser: true  } , (err,db) => {
    if (!err)

    console.log('MongoDB connection succeeded.');

        
    
    else
        console.log('Error in DB connection : ' + JSON.stringify(err, undefined, 2));
        
});


module.exports = mongoose;


//MongoClient.connect(url, function(err, db) {
 //   if (err) throw err;
   // var dbo = db.db("mydb");
    //dbo.createCollection("customers", function(err, res) {
     // if (err) throw err;
     // console.log("Collection created!");
     // db.close();
   // });
 // });