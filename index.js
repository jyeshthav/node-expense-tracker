// var total = {
//     expense: (x, y) => (parseInt(x) + parseInt(y)),
//     saved: (x, y) => (x - y)
// };

// with external node module: 
var total = require('./total');

const http = require('http');
const express = require('express');
// const morgan = require('morgan');
// const fs = require('fs');
// const path = require('path');

const hostname = 'localhost';
const port = 8080;

const app = express();
var pigController = require('./controllers/controller');

app.set('view engine', 'ejs');
app.use('/assets', express.static('assets'));
pigController(app);

const server = http.createServer(app);
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });