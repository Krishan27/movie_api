const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Sucess'
    });
});
module.exports = router;