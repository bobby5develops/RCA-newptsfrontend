'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var browserSyncSpa = require('browser-sync-spa');
var runSequence = require('run-sequence');

var util = require('util');

module.exports = function(options) {

  function browserSyncInit(baseDir, browser) {
    browser = browser === undefined ? 'default' : browser;

    var routes = null;
    if(baseDir === options.src || (util.isArray(baseDir) && baseDir.indexOf(options.src) !== -1)) {
      routes = {
        '/fonts/bootstrap': 'node_modules/bootstrap-sass/assets/fonts/bootstrap'
      };
    }

    var server = {
      baseDir: baseDir,
      routes: routes
    };

    browserSync.instance = browserSync.init({
      startPath: '/',
      server: server,
      browser: browser,
      https: true
    });
  }

  browserSync.use(browserSyncSpa({
    selector: '[ng-app]'// Only needed for angular apps
  }));

  gulp.task('serve', ['watch'], function () {
    browserSyncInit([options.tmp + '/serve', options.src]);
    // Note: This test watch breaks serving if as a gulp dependency so we run it after the serve.
    runSequence('test:auto');
  });

  /**
   * Needed for
   */
  gulp.task('serve:e2e', ['watch'], function () {
    browserSyncInit([options.tmp + '/serve', options.src], []);
  });
};
