
const express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
const worker = require('../jobs/workers');
const Wishlist = require('../models/wishlist');
const Movie = require('../models/movie');
const omdb = require("../services/omdb");
const mongoDb = require("../services/mongoDb");
const send = require('../jobs/mailer');



// base model for code reflactor
router.post("/email", async (req, res) => {
  var queue = worker.queue;
  try{
    logger.debug("requesting email api ")
    logger.info("email api with params ",req.params)
    await queue.connect()
    var response = await queue.enqueue('emailQueue', 'add', [1, 2])
    console.log("emailsent",response)
  }
  catch(error){
    logger.error("error",error)
    return res.status(500).json({
      data:[],
      status: "failed"

    })
    
  }
  return res.status(200).json({
   data: response,
   status: "success"

    });
  });

router.post("/suggestions", async (req, res) => {
  var queue = worker.queue;
  try{
    logger.debug("requesting suggestions api ")
    logger.info("suggestions api with params ",req.params)
    await queue.connect()
    var response = await queue.enqueue('moviesuggestions', 'email', [{to:req.body.to,body:req.body.body,subject:req.body.subject}])
    console.log("suggestions sent",response)
  }
  catch(error){
    looger.error("error",error)
    return res.status(500).json({
      data:[],
      status: "failed"

    })
    
  }
  return res.status(200).json({
    data: response,
    status: "success"
    });
  });

  


 
  module.exports = router;