var path = require('path');
var archive = require('../helpers/archive-helpers');
var helpers = require('./http-helpers.js');
var fs = require('fs');
var http = require('http');
var getter = require('http-get')
// require more modules/folders here!

var handleRequest = function (req, res) {
  if (req.url === "/") {
    fs.readFile(path.join(__dirname, '../web/public/index.html'), function(err, data){
      if(err){
        throw err;
      }
      res.writeHeader(200, helpers.headers);
      res.end(data)
    })
  } else {
    res.writeHeader(404);
    res.end('404, file not found')
  }
  
}

exports.handleRequest = handleRequest;
//exports.getPage = getPage;