var path = require('path');
var archive = require('../helpers/archive-helpers');
var helpers = require('./http-helpers.js');
var fs = require('fs');
var http = require('http');
var getter = require('http-get')
// require more modules/folders here!

var handleRequest = function (req, res) {
  if (req.method === "GET") {

    // var url = req.url;
    // var request = require('request');
    // request.get(req.url, function(err, response, body){
       
    // })
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
    // }
  }

  if (req.method === "POST") {

    // fs.readFile(req.url, function(err, data){
    //   console.log(req.url);
    //   fs.writeFile(path.join(__dirname, './', 'sites.txt'), data, encoding='utf8', function(err, data){
    //     if(err){
    //       throw err;
    //     }
    //   })
    // })


  }
  
}}

exports.handleRequest = handleRequest;
//exports.getPage = getPage;

// exports.paths = {
//   siteAssets: path.join(__dirname, '../web/public'),
//   archivedSites: path.join(__dirname, '../archives/sites'),
//   //index: path.join(__dirname, '../web/public/index.html')
//   list: path.join(__dirname, '../archives/sites.txt')
// };