
const express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
const worker = require('../jobs/workers');


const Wishlist = require('../models/wishlist');
const Movie = require('../models/movie');
const omdb = require("../services/omdb");
const mongoDb = require("../services/mongoDb");
const send = require('../jobs/mailer');

router.post("/email", async (req, res) => {
  var queue = worker.queue;
  try{
    await queue.connect()
    var o = await queue.enqueue('emailQueue', 'add', [1, 2])
    console.log("o",o)
  }
  catch(error){
    console.log("error",error)
  }
  
    return res.json({
      response: o
    });
  });
router.post("/email", async (req, res) => {
  var queue = worker.queue;
  try{
    await queue.connect()
    var o = await queue.enqueue('emailQueue', 'add', [1, 2])
    console.log("o",o)
  }
  catch(error){
    console.log("error",error)
  }
  
    return res.json({
      response: o
    });
  });
router.post("/suggestions", async (req, res) => {
  var queue = worker.queue;
  try{
    await queue.connect()
    var o = await queue.enqueue('moviesuggestions', 'email', [{to:req.body.to,body:req.body.body,subject:req.body.subject}])
    console.log("o",o)
  }
  catch(error){
    console.log("error",error)
  }
   
    return res.json({
      response: o
    });
  });

  


 
  module.exports = router;