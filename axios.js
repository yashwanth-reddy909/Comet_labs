const axios = require('axios');
// const path = require('path');
require('dotenv').config({path: __dirname + '/.env'})

const instance = axios.create({
    baseURL: "https://api.github.com",
    headers: {
        "Authorization" : "Bearer " + process.env.AUTH_TOKEN
    }
})

module.exports = instance;