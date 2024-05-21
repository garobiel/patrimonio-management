const express = require('express')
const routes = express.Router();
const server = require('./server')
routes.get('/index', ('./index.html'));

module.exports = routes