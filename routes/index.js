var express = require('express');
var router = express.Router();
const bodyParser=require('body-parser');
/* GET home page. */
const axios = require('axios');
var instance = require("../axios")
require('dotenv').config({path: __dirname + '../.env'})

const getGithubUsername = async () => {
  response = await instance.get("https://api.github.com/user")
  return response.data.login
}

function withoutProperty(obj, property) {  
  const { [property]: unused, ...rest } = obj
  return rest
}


function stargazers2_helpingFunction(respData,ViewerCount){
  ViewerCount = {};
  for(let i=0;i<respData.length;i++){
    instance.get('/repos/' + respData[i].full_name+ '/stargazers')
    .then(function (response) {
      for(let j=0;j<response.data.length;j++){
        if(response.data[j].login in ViewerCount){
          ViewerCount[response.data[j].login] ++;
          console.log(ViewerCount);
        }
        else{
          ViewerCount[response.data[j].login] = 1;
        }
      }
    })
    .catch(function (error) {
      res.send(error.message)
    });
  }
  return ViewerCount;
}

var Altervalues = (Respdata) =>{
  var k = Respdata;
  for (let [key, value] of Object.entries(Respdata)) {
    //Do stuff where key would be 0 and value would be the object
    if(value == null){
      continue;
    }
    if(typeof value == 'object'){
      k[key] = Altervalues(value);      
    }
    else{
      if(typeof value == 'string' && value.length>=22 && value.substring(0,22)=='https://api.github.com'){
        k = withoutProperty(k,key);
      }
    }
  }
  return k;
}

var getReposwith_5stars_5forks = (respData) => {
  ans = [];
  for(let i=0;i<respData.length;i++){
    if(respData[i].watchers_count > 5 && respData[i].forks_count > 5){
      ans.push(respData[i]);
    }
  }
  return ans;
}

router.get('/repos', function (req, res, next) {
  var username = req.query.username;
  console.log(username);
  if (username == null) {
    // get the repos of the logged in user
    instance.get('/user/repos').then(function (response) {
      res.send(Altervalues(response.data));
    }).catch(function (error) {
      res.send(error.message)
    });
  } else {
    instance.get('/users/' + req.query.username + '/repos')
      .then(function (response) {
        console.log(response);
        res.send(Altervalues(response.data));
      })
      .catch(function (error) {
        console.error(error);
        res.send(error.message)
      });
  }
})
// creating a new repo 
.post('/repos', function (req, res, next) {
  var repoName = req.body.repoName;
  var repoDescription = req.body.repoDescription;
  var visibility = !req.body.visibility;
  if (repoName == null) {
    res.send("Repo Name is required");
  } else {
    instance.post('/user/repos', {
      name: repoName,
      description: repoDescription,
      private: visibility
    }).then(function (response) {
      res.send(response.data);
    }).catch(function (error) {
      res.send(error.message)
    });
  }
});


router
//get the all topics information of a repo
.get('/topics', function (req, res, next) {
  var username = req.query.username;
  var repoName = req.query.reponame;
  if (username == null) {
    // get the topics of the authenticated user
    getGithubUsername().then(resp => {
      instance.get('/repos/' + resp + '/' + repoName + '/topics')
      .then(function (response) {
        res.send(response.data);
      })
      .catch(function (error) {
        res.send(error.message)
      });
    })
    // instance.get('/user/repos').then(function (response) {
    //   res.send(response.data);
    // }).catch(function (error) {
    //   console.log(error);
    // });
  } 
  else {
    instance.get('/repos/' + username + '/' + repoName + '/topics')
      .then(function (response) {
        res.send(response.data);
      })
      .catch(function (error) {
        res.send(error.message)
      });
  }
})

.post('/topics', function (req, res, next) {
  var username = req.body.username;
  var repoName = req.body.reponame;
  var topics = req.body.topics;
  if (repoName == null) {
    res.send("Repo Name is required");
  } else {
    instance.put('/repos/' + username + '/' + repoName + '/topics', {
      names: topics
    }).then(function (response) {
      res.send(response.data);
    }).catch(function (error) {
      res.send(error.message)
    });
  }
});


router.get('/stargazers', function (req, res, next) {
  var username = req.query.username;
  var reponame = req.query.reponame;
  if (username == null) {
    // get the repos of the logged in user
    getGithubUsername().then(resp => {
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
    getGithubUsername().then(resp => {
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
      res.send(getReposwith_5stars_5forks(Altervalues(response.data)));
    }).catch(function (error) {
      res.send(error.message)
    });
  } else {
    instance.get('/users/' + req.query.username + '/repos')
      .then(function (response) {
        res.send(getReposwith_5stars_5forks(Altervalues(response.data)));
      })
      .catch(function (error) {
        res.send(error.message)
      });
  }
});


router.get('/stargazers2', function (req, res, next) {
  var username = req.query.username;
  if (username == null) {
    // get the repos of the logged in user
    instance.get('/user/repos').then(function (response) {
      res.send(Altervalues(response.data));
    }).catch(function (error) {
      res.send(error.message)
    });
  } else {
    instance.get('/users/' + req.query.username + '/repos')
      .then(function (response) {
        stargazers2_helpingFunction(response.data,{});
      })
      .catch(function (error) {
        res.send(error.message)
      });
  }
})


module.exports = router;
