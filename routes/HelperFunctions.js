var express = require('express');
var router = express.Router();
const bodyParser=require('body-parser');
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


const stargazers2_helpingFunction = async (respData,ViewerCount) => {
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
  while(ViewerCount != {}){
    return ViewerCount;
  }
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

  module.exports = {getGithubUsername,
    withoutProperty,
    stargazers2_helpingFunction,
    Altervalues,
    getReposwith_5stars_5forks}