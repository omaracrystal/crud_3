# CRUD APP STEPS

## Project Structure
- Terminal 
```
  yo galvanize-express
  npm install
  npm mongoose --save
  npm mongoose-q --save          < side note -(promises)
  npm dotenv --save
  touch .env
```
- go into app.js and put at the top = 
```
  var dotenv = require('dotenv');
  dotenv.load();
```
- place ``.env`` at the bottom of ``.gitignore`` file
- Just double check to make sure ``package.json`` has all those saved
```
{
  "name": "_example",
  "version": "0.0.0",
  "private": true,
  "scripts": {
    "start": "node ./server/bin/www"
  },
  "dependencies": {
    "body-parser": "~1.13.2",
    "cookie-parser": "~1.3.5",
    "debug": "~2.2.0",
    "dotenv": "^1.2.0",
    "express": "~4.13.1",
    "mongoose": "^4.1.7",
    "mongoose-promised": "^0.1.0",
    "mongoose-q": "^0.1.0",
    "morgan": "~1.6.1",
    "serve-favicon": "~2.3.0",
    "swig": "^1.4.2"
  }
}
```
- **Make sure all node_modules have updated along with the package.json file**
- If files are not there then you might have to place `sudo` in front of all `npm install`s
- In **all route folders** include this line on top:
    - We change our mongoose variable to use the module mongoose-q.
```
var mongoose = require('mongoose-q')(require('mongoose'), {spread:true});
```

**commit!**

## Create Schema and connect Mongoose to .env and models
- Create Schema in ``models`` folder under ``server`` directory... lets call it ``projects.js``

- On top of ``projects.js``:
```
  var mongoose = require('mongoose');
  var Schema = mongoose.Schema;
```

- Now set up schema and its structure in ``projects.js``:
```
  var project = new Schema({
      name: String,
      age: Number,
      spitter: Boolean
  });

  //pull info from .env file
  mongoose.connect(process.env.MONGO_URI); //|| 'mongodb://localhost/...'

  module.exports = mongoose.model("projects", Project)
```

- In the ``.env`` file place ``MONGO_URI=mongodb://localhost/projects`` on top... now grab it in ``projects.js`` file by using ``mongoose.connect`` to pull that saved URI by writing: ``process.env.MONGO_URI`` 

## Set up Routes
- create ``api.js`` within route folder

- add this to the ``api.js`` file (same as ``index.js``) starting point
```
  var express = require('express');
  var router = express.Router();

  router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
  });

  module.exports = router;
```

- Pull in **Schema** on top of ``api.js``
``var Projects = require('../models/projects.js')``

- Update ``api.js``
```
  var express = require('express');
  var router = express.Router();
  var project = require('../models/projects.js')

  //get all projects
  router.get('/projects', function(req, res, next) {
    res.send("hello");
  });

  //get one projects
  router.get('/project/:id', function(req, res, next) {
  });

  //post projects
  router.post('/projects', function(req, res, next) {
  });

  //update one project
  router.put('/project/:id', function(req, res, next) {
  });

  //delete one project
  router.delete('/project/:id', function(req, res, next) {
  });

  module.exports = router;
```

- Let's tell ``app.js`` that we need to connect to these routes (if all routes are in index then we don't need to add ``app.use('/api', projects)``)
Go into ``app.js`` and add to the routes sections:
  ```
  //** routes **//
  var routes = require('./routes/index.js');
  var llams = require('./routes/projects.js')

  // ** main routes ** //
  app.use('/', routes);
  app.use('/api/', projects)
  ```

## TESTING and updating Routes
- Test in terminal or go to local host url in browser
  ``sudo mongod`` in second terminal 
  ``nodemon`` in third terminal

- **Testing** in terminal the **GET router** ``http GET http://localhost:3000/api/projects``

- Set up **POST router** now:
 - add new instance of the Schema within the post router and save it function
```
   //post projects
  router.post('/projects', function(req, res, next) {
    new Project(req.body)
      .saveQ()
      .then(function (data) { res.json(data) })
      .catch(function (err) { res.send(err) })
      .done();
  });
```
**Testing POST router** in terminal:
```
  http POST http://localhost:3000/api/projects name="Crud_3" type="node-express-promises" url="http://"``
  or
  http POST -f http://localhost:3000/api/projects name="Crud_3" type="node-express-promises" url="http://``
  or
  http POST --form http://localhost:3000/api/projects name="Crud_3" type="node-express-promises" url="http://``
```

- Now update **GET aLL router** 
    - mongoose find function
  ```
  router.get('/projects', function(req, res, next) {
    Project.findQ()
      .then(function (data) { res.json(data) })
      .catch(function (err) { res.send(err) })
      .done();
  });
  ```
**TESTING GET all router** in terminal:
  ``http GET http://localhost:3000/api/projects``

>Helpful resource : [mongoosejs.com/docs/api.html](mongoosejs.com/docs/api.html)

- Set up **GET one router** 
```
  //get one project
  router.get('/project/:id', function(req, res, next) {
    Project.findByIdQ(req.params.id)
      .then(function (data) { res.json(data) })
      .catch(function (err) { res.send(err) })
      .done();
  });
```
**TESTING GET one router** in terminal:
  ``http GET http://localhost:3000/api/project/id#``

- Set up **PUT router** 
```
  //update one project
  router.put('/project/:id', function(req, res, next) {
    var update = (req.body);
    var options = {new: true};
    Project.findByIdAndUpdateQ(req.params.id, update, options)
      .then(function (data) { res.json(data) })
      .catch(function (err) { res.send(err) })
      .done();
  });
```
**TESTING PUT router** in terminal:
  ``http PUT http://localhost:3000/api/project/id# changes=change``

- Setting up **DELETE router**
```
  //delete one project
  router.delete('/project/:id', function(req, res, next) {
    Project.findByIdAndRemoveQ(req.params.id)
      .then(function (data) { res.json(data) })
      .catch(function (err) { res.send(err) })
      .done();
  });
```
**TESTING DELETE router** in terminal:
  ``http DELETE http://localhost:3000/api/project/id#``

# Set up View
- Create Form, Table, whatever in ``index.html`` (or create a new html file) under ``views`` on the server side
- Set up **ids** to each area of the form so that it points to each property of the **schema**
- We are going to use **JSON** to auto populate all projects below the form and so we attach the ``id="all-projects"`` to a seperate div, table, whatever below the input form
- Under client side in the ``main.js`` file add a ``payload`` to the "submit" form function. Then run tests throughout...
```
  $('form').on('submit', function(e){
      e.preventDefault();
      var payload = {
          name: $('#name').val(),
          type: $('#type').val(),
          url: $('#url').val()
      };

      console.log(payload) //test here or httpie

      $.post('/api/projects', payload, function(data){
          $('.message-section').show(); //bootstrap alert alert-success, and on client side, set css display: none
          console.log(data); //test here or httpie < should have Id now
          $('#message').html('project has been added!');

          //populate the table from function below
          getProjects();
      });
  })
```

  + Define a function outside of submit so that it will append the projects
      + don't forget to call function in **document.ready** to pre-load the data
```
  function getProjects(){
      //target table and clear out fields
      $('#all-projects').html('');

      //inside ajax and iterate over all the data (all the projects)
      $.get('/api/projects', function(data) {
          //test = console.log(data)-- don't forget to call function
          for (var i=0; i < data.length; i++) {
              $('#all-projects').append(
                    '<tr><td>' + data[i].name + '</td><td>' + data[i].type + '</td><td>' + data[i].url + '</td></tr>'
              );
          }
          //clear out form
          $('form input').val('');
      });
  }
```

# THE END (of server side)!

**Quick Reference for testing routes in terminal**
```
  http GET http://localhost:3000/api/projects
  http GET http://localhost:3000/api/project/id#
  http POST http://localhost:3000/api/projects name="CRUD_3" type="node-express-promises" url="http://..."
  http PUT http://localhost:3000/api/project/id# changes=change
  http DELETE http://localhost:3000/api/project/id#
```

# Front End
- Create new folder `views` and file `index.html` under `client` folder
- Create new files under `js` client side for `app, controllers, directives, filters, and services` and delete `main.js`
- Then insert script tags at the end of the html page
```
 <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.5/angular.min.js"></script>
  <script src="./js/app.js" type="text/javascript"></script>
  <script src="./js/controllers.js" type="text/javascript"></script>
  <script src="./js/directives.js" type="text/javascript"></script>
  <script src="./js/filters.js" type="text/javascript"></script>
  <script src="./js/services.js" type="text/javascript"></script>
```
- on top of `index.html` place `<html ng-app="myApp">` then in app.js add `var app = angular.module("myApp", []);`
- create controller link in `index.html` -- `<body ng-controller="projectController">`
- 






