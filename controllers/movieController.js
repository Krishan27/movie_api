const express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

const wishlist = require("../index");
const Movie = require('../models/movie');
const omdb = require("../services/omdb");
const mongoDb = require("../services/mongoDb");




router.get('/omdb', async function (req, res,)  {
    var searchTest = req.query.name;
    var searchId = req.query.id;
    if (searchTest != undefined){
         var out = await omdb.getMovies(searchTest);
 
         
            return res.status(200).json({
                data: out
              });

    }
    else if (searchId != undefined){
        var out = await omdb.getMovie(searchId);
        return res.status(200).json({
            data: out
        });
   }

  else{
          return res.status(400).send('No record with given name or id');
  }


});

router.get('/', async function (req, res,)  {
    var searchTest = req.query.name;
    var searchId = req.query.id;
    if (searchTest != undefined){
        try {
            const response = await Movie.find({'title':searchTest});
            return res.status(200).json({
                data: response
            });
          } catch (error) {
            console.log(error.response.body);
            
          }

    }
    else if (searchId != undefined){
        try {
            const response = await Movie.find({'_id':searchId});
                return res.status(200).json({
                    data: response
                });
            
          } catch (error) {
            console.log(error.response.body);
            
          }

   }
   return res.status(400).json({
    data: []
});


});

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

router.get('/:id', async function (req, res,)  {
    var id = req.params.id;
    
    
    if (wishlist != undefined){

         var out = await wishlist.getMovies(wishlist);
 
         
            return res.status(200).json({
                data: out
              });

    }
   

  else{
          return res.status(400).send('No record with given name or id');
  }


});

router.post('/wishlist/update', async function (req, res,)  {
    var wishlist = req.query.id;
    
    if (wishlist != undefined){
         var out = await wishlist.getMovies(wishlist);
 
         
            return res.status(200).json({
                data: out
              });

    }
   

  else{
          return res.status(400).send('No record with given name or id');
  }


});

router.delete('/wishlist', async function (req, res,)  {
    var wishlist = req.query.id;
    
    if (wishlist != undefined){
         var out = await wishlist.getMovies(wishlist);
 
         
            return res.status(200).json({
                data: out
              });

    }
   

  else{
          return res.status(400).send('No record with given name or id');
  }


});

module.exports = router;