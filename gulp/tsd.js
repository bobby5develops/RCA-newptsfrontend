'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');

var path = require('path');
var tsd = require('tsd');
var Promise = require('bluebird');

var tsdJson = 'tsd.json';
var tsdApi = new tsd.getAPI(tsdJson);

module.exports = function () {

  gulp.task('tsd:install', function () {
    var options = new tsd.Options();
    options.resolveDependencies = true;
    options.overwriteFiles = true;
    options.saveBundle = true;

    //return new Promise(function(){return true;});

    return tsdApi.readConfig()
      .then(function () {
        return tsdApi.reinstall(options);
      })
      .then(function (installResult) {
        var written = Object.keys(installResult.written.dict);
        var removed = Object.keys(installResult.removed.dict);
        var skipped = Object.keys(installResult.skipped.dict);

        written.forEach(function (dts) {
          gutil.log('Definition file written: ' + dts);
        });

        removed.forEach(function (dts) {
          gutil.log('Definition file removed: ' + dts);
        });

        skipped.forEach(function (dts) {
          gutil.log('Definition file skipped: ' + dts);
        });
      })
      //This workaround is because there is a bug in TSD where the promise is returned before tsd.d.ts is created
      .then(function(){
        gutil.log('Waiting for TSD to finish');
        return new Promise(function(resolve, reject){
          setTimeout(function(){
            gutil.log('Waited for TSD to finish');
            resolve();
          }, 500)
        });
      });
  });

  gulp.task('tsd:purge', function () {
    return tsdApi.purge(true, true);
  });

  gulp.task('tsd', ['tsd:install']);
};
