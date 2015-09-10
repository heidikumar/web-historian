var path = require('path');
var archive = require('../helpers/archive-helpers');
var helpers = require('./http-helpers.js');
var fs = require('fs');
var http = require('http');
var getter = require('http-get')
var querystring = require('querystring');
var htmlfetcher = require('../workers/htmlfetcher');
// require more modules/folders here!

var handleRequest = function (req, res) {
var statusCode;

  if (req.method === "GET") {

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
      var url = "";
      req.on('data', function(data){ 
        url += data;
      });

      req.on('end', function(){
        statusCode = 302;
        url = querystring.parse(url);

        //check if URL is in the list
        var urlKnown = archive.isUrlInList(url.url);      //returning false
        //if it is, get the data
        if (urlKnown) {
          //get the data from the file
          //return the data to the user! via res.on('end', function(){})

        //if it is not, 
        } else if (!urlKnown) {
          // var statusCode = 404;
          //add to list
          archive.addUrlToList(url.url, function(){
            res.writeHead(statusCode, helpers.headers);
            //// res.end();
          });
          var urls = [url.url];
          //get the data and make the file
          archive.downloadUrls(urls);
          //return 404 status code
          res.writeHeader(statusCode);
          res.end('404, file not found');
        }
      });
    }

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
};

exports.handleRequest = handleRequest;
//exports.getPage = getPage;

// exports.paths = {
//   siteAssets: path.join(__dirname, '../web/public'),
//   archivedSites: path.join(__dirname, '../archives/sites'),
//   //index: path.join(__dirname, '../web/public/index.html')
//   list: path.join(__dirname, '../archives/sites.txt')
// };