// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var archive = require('../helpers/archive-helpers');
var http = require("http");
var fs = require('fs');

//make request to www.google.com
// var file = fs.createWriteStream('file.jpg');
var request = function(){
  http.get("http://www.google.com", function(response){
    console.log(response);  //this should console log the html data
  
  });
};

request();


// exports.downloadUrls = function(urlArray) {
//   _.each(urlArray, function(url){  
//         fs.writeFile(paths.archivedSites + "/" + url);
//   })
// };