'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var wrench = require('wrench');
var conf = require('./gulp/conf')(); // Using this so Karma can access the paths (see conf for details).

var options = {
  src: conf.paths.src,
  test: conf.paths.test,
  dist: conf.paths.dist,
  tmp: conf.paths.tmp,
  e2e: conf.paths.e2e,
  errorHandler: function(title) {
    return function(err) {
      gutil.log(gutil.colors.red('[' + title + ']'), err.toString());
      this.emit('end');
    };
  },
  wiredep: {
    directory: 'bower_components',
    exclude: [/bootstrap-sass-official\/.*\.js/, /bootstrap\.css/]
  }
};

wrench.readdirSyncRecursive('./gulp').filter(function(file) {
  return (/\.(js|coffee)$/i).test(file);
}).map(function(file) {
  require('./gulp/' + file)(options);
});

gulp.task('default', ['clean'], function () {
    gulp.start('build');
});
