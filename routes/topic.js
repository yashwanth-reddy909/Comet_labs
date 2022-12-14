var express = require('express');
var router = express.Router();
const bodyParser=require('body-parser');

const HelperFunctions = require('./HelperFunctions');
/* GET home page. */
const axios = require('axios');
var instance = require("../axios")
require('dotenv').config({path: __dirname + '../.env'})


router
//get the all topics information of a repo  
// '/topics' get
.get('/', function (req, res, next) {
  var username = req.query.username;
  var reponame = req.query.reponame;
  if (username == null) {
    // get the topics of the authenticated user
    HelperFunctions.getGithubUsername().then(resp => {
      instance.get('/repos/' + resp + '/' + reponame + '/topics')
      .then(function (response) {
        res.send(response.data);
      })
      .catch(function (error) {
        res.send(error.message)
      });
    })
  } 
  else {
    instance.get('/repos/' + username + '/' + reponame + '/topics')
      .then(function (response) {
        res.send(response.data);
      })
      .catch(function (error) {
        res.send(error.message)
      });
  }
})

// post a topic tag in to users repo for default user
// URL is   /topic POST
.post('/', function (req, res, next) {
  var reponame = req.body.reponame;
  var topics = req.body.topics;
  if (reponame == null ) {
    res.send("Repo Name is required");
  }
  else {
    HelperFunctions.getGithubUsername().then(resp => {
      instance.put('/repos/' + resp + '/' + reponame + '/topics', {
        names: topics
      }).then(function (response) {
        res.send(response.data);
      }).catch(function (error) {
        res.send(error.message)
      });
    })
    .catch(err=>next(err));
  }
});


module.exports = router;
