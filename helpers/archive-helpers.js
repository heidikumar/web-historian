var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var htmlfetcher = require('../workers/htmlfetcher');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

 var paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '.../archives/sites'),
  index: path.join(__dirname, '../web/public/index.html'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) { 
  var sitesArray = [];
  fs.readFile(paths.list, {encoding : 'utf8'} ,function(err, data){
    sitesArray = data.toString().split("\n");
    callback(sitesArray);
  });
}

exports.isUrlInList = function(url, callback) {
 var sitesArray = [];
 var hasValue = false; 
   exports.readListOfUrls(function(sitesArray){
    // sitesArray = data.split("\n");
    _.each(sitesArray, function(val){
      if (url===val) {
        hasValue = true;
      };
    })
   })
  if (callback){
    callback(hasValue);
  } else {
    return hasValue;
  }
};

var addUrlToList = function(url, callback) {
  fs.appendFile(paths.list, url + '\n', 'utf8', function(err, data){
    if (err){
      console.log(err);
    } 
    callback();
  });
};

exports.isUrlArchived = function(url, callback) {     //not really checking the thing we are supposed to check!
  addUrlToList(url, function(){
    callback();
  });
};

exports.downloadUrls = function(urlArray) {
  _.each(urlArray, function(url){
    var location = paths.archivedSites + "/" + url;
    fs.writeFile(location, "This file is awesome", function(err,data){
      if (err) {
        console.log('there was an error in your writeFile function');
      }
    });

    var file = fs.createWriteStream(paths.archivedSites + "/" + url);
    // console.log(file);
    url = "http://" + url;
    htmlfetcher.fetchData(url, file);
  })  
};

exports.paths = paths;
exports.addUrlToList = addUrlToList;
// exports.isUrlInList = isUrlInList;
// exports.readListOfUrls = readListOfUrls;
// exports.isUrlArchived = isUrlArchived;
// exports.downloadUrls = downloadUrls;