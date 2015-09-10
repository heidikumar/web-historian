var path = require('path');
var archive = require('../helpers/archive-helpers');
var helpers = require('./http-helpers.js');
var fs = require('fs');
var http = require('http');
var getter = require('http-get')
var querystring = require('querystring');
// require more modules/folders here!

var handleRequest = function (req, res) {
var statusCode;

  if (req.method === "GET") {
    // var url = req.url;
    // var request = require('request');
    // request.get(req.url, function(err, response, body){

    //TODO: Return the content of the actual website from the archive.    
       
    // })
      if (req.url === "/") {
        fs.readFile(path.join(__dirname, '../web/public/index.html'), function(err, data){
          if(err){
            throw err;
          }
          res.writeHead(200, helpers.headers);
          res.end(data)
        })
      } else {
        res.writeHeader(404);
        res.end('404, file not found')
      // }
    }
  }

  if (req.method === "POST") {
    // if (req.url === "/") {
      var url = "";
      req.on('data', function(data){      //data giving back NOTHING!.
        // console.log(JSON.stringify(data));
        url += data;
        console.log(url);

      });

      req.on('end', function(){
        statusCode = 302;
        url = querystring.parse(url);
        //var url //parse the data, and then get the url property of the resulting object
        archive.addUrlToList(url.url, function(){
          res.writeHead(statusCode, helpers.headers);
          res.end();
        });
      })

    // }

    //TODO: this should call the "addURLtoList" helper function. 
    // isUrlInList(req.url)

    // fs.readFile(req.url, function(err, data){
    //   console.log(req.url);
    //   fs.writeFile(path.join(__dirname, './', 'sites.txt'), data, encoding='utf8', function(err, data){
    //     if(err){
    //       throw err;
    //     }
    //   })
    // })
    }
};

exports.handleRequest = handleRequest;
//exports.getPage = getPage;

// exports.paths = {
//   siteAssets: path.join(__dirname, '../web/public'),
//   archivedSites: path.join(__dirname, '../archives/sites'),
//   //index: path.join(__dirname, '../web/public/index.html')
//   list: path.join(__dirname, '../archives/sites.txt')
// };