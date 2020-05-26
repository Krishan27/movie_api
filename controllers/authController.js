const express = require('express');
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const config = require('../config');
const router = express.Router();
const jwt = require("jsonwebtoken");

const checkAuth = require("../middleware/checkAuth");
const User = require("../models/user");
const Wishlist = require("../models/wishlist");


router.post("/signup", (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "User exists"
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err
            });
          } else {
            var id = new mongoose.Types.ObjectId()
            const user = new User({
              _id:id ,
              email: req.body.email,
              password: hash
            });
            user
              .save()
              .then(result => {
                const wl = new Wishlist({
                  _id:id 
                });
                wl
                  .save()
                  .then(result =>{
                    res.status(201).json({
                      message: "User created"
                    });
                  })
                  .catch(err => {
                    console.log(err);
                    res.status(500).json({
                      error: err
                    });
                  });
                console.log(result);


               // user._id create wishlist
   
              })
              .catch(err => {
                console.log(err);
                res.status(500).json({
                  error: err
                });
              });
          }
        });
      }
    });
});

router.post("/login", (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Auth failed"
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              email: user[0].email,
              userId: user[0]._id
            },
            config.jwt_key,
            {
                expiresIn: "1h"
            }
          );
          return res.status(200).json({ 
            message: "Auth successful",
            token: token,
            user: user[0]._id
          });
        }
        res.status(401).json({
          message: "Auth failed"
        });
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});


router.delete("/:userId", (req, res, next) => {
  User.remove({ _id: req.params.userId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "User deleted"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.post("/logout", checkAuth ,(req, res, next) =>{
  return res.status(200).json({ 
    message: "Logout Succesful",
    token: ''
});
});

  
  
  module.exports = router;