var express = require('express');
var router = express.Router();
var mongoose = require('mongoose-q')(require('mongoose'), {spread:true});

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
