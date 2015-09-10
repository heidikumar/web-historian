// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var archive = require('../helpers/archive-helpers');
var http = require("http");
// var https = require("https");
var fs = require('fs');
var _ = require('underscore');

exports.fetchData = function(url, file){
  http.get(url, function(response){
    response.pipe(file);
    file.on('finish', function(){
      }).on('error', function(err){
        console.log(err);
      })
  })
};