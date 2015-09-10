// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var archive = require('../helpers/archive-helpers');
var http = require("http");
// var https = require("https");
var fs = require('fs');
var _ = require('underscore');

//make request to www.google.com
// var websites = ["www.google.com", "www.cnn.com"];
// var tempFunction = function(arr){
//   _.each(arr, function(val){
//     // var file = fs.createWriteStream(val + ".txt");
//     // val = "http://" + val;
//     // http.get(val, function(response){
//     //   response.pipe(file);
//     //   file.on('finish', function(){
//     //   }).on('error', function(err){
//     //     console.log(err);
//     //   })
//     // })
//   })
// }

// tempFunction(websites);

exports.fetchData = function(url, file){
  http.get(url, function(response){
    response.pipe(file);
    file.on('finish', function(){
      }).on('error', function(err){
        console.log(err);
      })
  })
};