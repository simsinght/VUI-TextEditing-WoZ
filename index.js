const express = require('express');
const path = require('path');

const http = require('http');
const socket = require('./socket');

const app = express();
const server = new http.Server(app);
socket(server);

app.use('/admin', express.static('admin'));
app.use(express.static('vui'));

const port = process.env.PORT || 5000;

server.listen(port, function(){
  console.log('Trouble API listening on *:' + port);
});

module.exports = server;