var express = require('express');
var router = express.Router();
const bodyParser=require('body-parser');

const HelperFunctions = require('./HelperFunctions');
/* GET home page. */
const axios = require('axios');
var instance = require("../axios")
require('dotenv').config({path: __dirname + '../.env'})





// get the stargazers for a repo 
router.get('/stargazers', function (req, res, next) {
  var username = req.query.username;
  var reponame = req.query.reponame;
  if (username == null) {
    // get the repos of the logged in user
    HelperFunctions.getGithubUsername().then(resp => {
      instance.get('/repos/' + resp + '/' + reponame + '/stargazers')
      .then(function (response) {
        res.send(response.data);
      })
      .catch(function (error) {
        res.send(error.message)
      });
    })
  }else{
    instance.get('/repos/' + username + '/' + reponame + '/stargazers')
    .then(function (response) {
      res.send(response.data);
    })
    .catch(function (error) {
      res.send(error.message)
    });
  }
  
});

router.get('/collaborators', function (req, res, next) {
  var username = req.query.username;
  var reponame = req.query.reponame;
  if (username == null) {
    // get the repos of the logged in user
    HelperFunctions.getGithubUsername().then(resp => {
      instance.get('/repos/' + resp + '/' + reponame + '/collaborators')
      .then(function (response) {
        res.send(response.data);
      })
      .catch(function (error) {
        res.send(error.message);
      });
    })
  }else{
    instance.get('/repos/' + username + '/' + reponame + '/collaborators')
      .then(function (response) {
        res.send(response.data);
      })
      .catch(function (error) {
        res.send(error.message);
      });
  }
    
  
});


router.get('/repos5stars5forks', function (req, res, next) {
  var username = req.query.username;
  if (username == null) {
    // get the repos of the logged in user
    instance.get('/user/repos').then(function (response) {
      res.send(HelperFunctions.getReposwith_5stars_5forks(HelperFunctions.Altervalues(response.data)));
    }).catch(function (error) {
      res.send(error.message)
    });
  } else {
    instance.get('/users/' + req.query.username + '/repos')
      .then(function (response) {
        res.send(HelperFunctions.getReposwith_5stars_5forks(HelperFunctions.Altervalues(response.data)));
      })
      .catch(function (error) {
        res.send(error.message)
      });
  }
});


router.get('/stargazers2', function (req, res, next) {
  var username = req.query.username;
  var RepoInfo = {};
  var ViewerCount = {};
  if (username == null) {
    // get the repos of the logged in user
    instance.get('/user/repos').then(function (response) {
      RepoInfo=Altervalues(response.data);
    }).catch(function (error) {
      res.send(error.message);
      return null;
    });
  } else {
    instance.get('/users/' + req.query.username + '/repos')
      .then(function (response) {
        RepoInfo=Altervalues(response.data);
      })
      .catch(function (error) {
        res.send(error.message)
      });
  }
  HelperFunctions.stargazers2_helpingFunction(RepoInfo,ViewerCount)
  .then(resp => {
    console.log(resp);
    res.send(resp);
  })
  .catch(err=>next(err));
});


module.exports = router;
