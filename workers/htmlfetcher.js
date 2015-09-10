// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var archive = require('../helpers/archive-helpers');
var http = require("http");
var https = require("https");
var fs = require('fs');
var _ = require('underscore');

//make request to www.google.com
var websites = ["www.google.com", "www.cnn.com"];
var tempFunction = function(arr){
  _.each(arr, function(val){
    var file = fs.createWriteStream(val + ".txt");
    val = "http://" + val;
    http.get(val, function(response){
      response.pipe(file);
      file.on('finish', function(){
      }).on('error', function(err){
        console.log(err);
      })
    })
  })
}

tempFunction(websites);
// var file = fs.createWriteStream('file.txt');
// var request = function(){
//   // var sampleArray = ["http://www.google.com"];
//   http.get("http://www.google.com", function(response){
//     //working: console.log(response);  //this should console log the html data
//     response.pipe(file);


//     // archive.downloadUrls(sampleArray, response, 'utf8', function(){
//     //   console.log("infowritten");
//     // });
//   });
// };

// request();


// exports.downloadUrls = function(urlArray) {
//   _.each(urlArray, function(url){  
//         fs.writeFile(paths.archivedSites + "/" + url, callback);
//          
//   })
// };

//for each file in urlArray
  //createWriteStream at correct address
  //get from url
  //pipe response to file in createWriteStream