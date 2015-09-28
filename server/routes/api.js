var express = require('express');
var router = express.Router();
var mongoose = require('mongoose-q')(require('mongoose'), {spread:true});
var Project = require('../models/projects.js')


// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });


//get all projects
router.get('/projects', function(req, res, next) {
  Project.findQ()
    .then(function (data) { res.json(data) })
    .catch(function (err) { res.send(err) })
    .done();
});

//post all projects
router.post('/projects', function(req, res, next) {
 new Project(req.body)
    .saveQ()
    .then(function (data) { res.json(data) })
    .catch(function (err) { res.send(err) })
    .done();
});

//get one projects
router.get('/project/:id', function(req, res, next) {
  Project.findByIdQ(req.params.id)
    .then(function (data) { res.json(data) })
    .catch(function (err) { res.send(err) })
    .done();
});

//update one project
router.put('/project/:id', function(req, res, next) {
  var update = (req.body);
  var options = {new: true};
  Project.findByIdAndUpdateQ(req.params.id, update, options)
    .then(function (data) { res.json(data) })
    .catch(function (err) { res.send(err) })
    .done();
});

//delete one project
router.delete('/project/:id', function(req, res, next) {
  Project.findByIdAndRemoveQ(req.params.id)
    .then(function (data) { res.json(data) })
    .catch(function (err) { res.send(err) })
    .done();
});


module.exports = router;
