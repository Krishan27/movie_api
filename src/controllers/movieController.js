const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Wishlist = require('../models/wishlist');
const Movie = require('../models/movie');
const omdb = require("../services/omdb");
const mongoDb = require("../services/mongoDb");
const expressPino = require('express-pino-logger');
const pino = require('pino');
const logger = pino({ level: process.env.LOG_LEVEL || 'info' });
const expressLogger = expressPino({ logger });




// Search movie in omdb database 
router.get('/omdb', async function (req, res,)  {
    var searchTest = req.query.name;
    var searchId = req.query.id;
      
      if (searchTest != undefined){
        try{
          logger.debug("requesting movies from omdb ")
          logger.info("get movies from omdb by name ",req.params)
          var response = await omdb.getMovies(searchTest);
          return res.status(200).json({
           data: response
          });
        }
        catch(error){
          logger.error("error",error)
          return res.status(500).json({
            data:[],
            status: "failed"
          })
          }
        }
      else if (searchId != undefined){
        try{
         logger.debug("requesting movies from omdb ")
         logger.info("get movies from omdb by movieId ",req.params)
         var response = await omdb.getMovie(searchId);
         return res.status(200).json({
          data: response
        })
      }
        catch(error){
          logger.error("error",error)
          return res.status(500).json({
            data:[],
            status: "failed"
          })
        }
      }

      else{
          return res.status(400).send('No record with given name or id')}


});


      

    

// Search movie in mongodb database 

router.get('/', async function (req, res,)  {
    var searchTest = req.query.name;
    var searchId = req.query.id;
    if (searchTest != undefined){
        try {
          logger.debug("requesting movies from mongodb ")
          logger.info("get movies from mongodb by name ",req.params)
          const response = await Movie.find({'title':searchTest});
          
            return res.status(200).json({
                data: response
              });
          } 
          
          catch (error) {
            logger.error("error",error)
            return res.status(500).json({
              data:[],
              status: "failed"
            })
            
          }

    }
    else if (searchId != undefined){
        try {
          logger.debug("requesting movies from mongodb ")
          logger.info("get movies from mongodb by movieId ",req.params)
          const response = await Movie.find({'_id':searchId});
            return res.status(200).json({
                  data: response
                });
            
          } 
          catch (error) {
            logger.error("error",error)
            return res.status(500).json({
              data:[],
              status: "failed"
            })
            
          }

   }
   return res.status(200).json({
    data: response,
    status: "success"
});


});


//Searched movie from the omdb to mongodb database

router.post('/', (req, res) => {
    
    const mov = new Movie({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        year: req.body.year,
        rating: req.body.rating,
        genre: req.body.genre,
        director: req.body.director,
        actors: req.body.actors,
        language : req.body.language,
        poster : req.body.poster
    });
    mov.save((err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Movie Save :' + JSON.stringify(err, undefined, 2)); }
    });
});

// Search movie for the user from its wishlist
router.get('/wishlist/:user', async function (req, res,)  {
    var userid = req.params.user;
    
    
    if (userid != undefined){
      try {
        logger.debug("requesting wishlist of the user ")
        logger.info("get movies for user ",req.params)
        const response = await Wishlist.find({'_id':userid});
        return res.status(200).json({
            data: response
        });
      } catch (error) {
        logger.error("error",error)
        return res.status(500).json({
          data:[],
          status: "failed"
        })
        
      
        
      }
    }
    return res.status(200).json({
      data: [], 
      status: "success"
    })
});

// Update the movie in the user wishlist 

router.put('/wishlist/:user', async function(req, res) {
    var query = {'_id': req.params.user};
    var data = { mywislist: req.body.wishlist };
     try {
       logger.debug(" updating wishlist of the user ")
       logger.info(" update movies for user ",req.params)
        const response = await Wishlist.findOneAndUpdate(query, data, {new: true});
        return res.status(200).json({
            status: 'updated',
            data:response
        });
      } 
      catch (error) {
        logger.error("error",error)
        return res.status(400).json({
          data: [],
          status: 'failed'
        })
      }
    
      
    
    
  });



module.exports = router;