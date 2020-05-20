const express = require('express');
var router = express.Router();
var mongoose = require('mongoose');


const Movie = require('../models/movie');
const omdb = require("../services/omdb");




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
        out = omdb.getMovie(searchTest);
        return res.status(200).json({
            data: out
          });
   }

  else{
          return res.status(400).send('No record with given name or id');
  }


});

router.get('/', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Movie.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Retriving Movie :' + JSON.stringify(err, undefined, 2)); }
    });
});
// search in mongo 
// found to return or  queary omdb 
//save in mongo 
// return object 


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

 

module.exports = router;