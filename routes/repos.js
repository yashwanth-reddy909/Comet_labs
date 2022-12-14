var express = require('express');
var router = express.Router();
const bodyParser=require('body-parser');

const HelperFunctions = require('./HelperFunctions');
/* GET home page. */
const axios = require('axios');
var instance = require("../axios")
require('dotenv').config({path: __dirname + '../.env'})



router.get('/', function (req, res, next) {
  // gets the repos information of the particular person user
  // is not menitioned it will default users
  var username = req.query.username;
  if (username == null) {
    // get the repos of the logged in user
    instance.get('/user/repos').then(function (response) {
      res.send(HelperFunctions.Altervalues(response.data));
    }).catch(function (error) {
      res.send(error.message)
    });
  } else {
    instance.get('/users/' + req.query.username + '/repos')
      .then(function (response) {
        console.log(response);
        res.send(HelperFunctions.Altervalues(response.data));
      })
      .catch(function (error) {
        console.error(error);
        res.send(error.message)
      });
  }
})
// creating a new repo for the default user
.post('/', function (req, res, next) {
  var reponame = req.body.reponame;
  var repodescription = req.body.repodescription;
  var visibility = !req.body.visibility;
  if (reponame == null) {
    res.send("Repo Name is required");
  } else {
    instance.post('/user/repos', {
      name: reponame,
      description: repodescription,
      private: visibility
    }).then(function (response) {
      res.send(response.data);
    }).catch(function (error) {
      res.send(error.message)
    });
  }
});

module.exports =router;