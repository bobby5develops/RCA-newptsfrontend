'use strict';

var gulp = require('gulp');
var filter = require('gulp-filter');
var rimraf = require('rimraf');
var runSequence = require('run-sequence');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var rev = require('gulp-rev');
var csso = require('gulp-csso');
var minifyHtml = require('gulp-minify-html');
var revReplace = require('gulp-rev-replace');
var webserver = require('gulp-webserver');
var debug = require('gulp-debug');
var merge = require('merge-stream');

module.exports = function (options) {

  gulp.task("build:clean", function (cb) {
    rimraf(options.tmp, cb);
  });

  gulp.task("build", ["build:clean"], function (callback) {
    runSequence("bower", ["html", "styles", "templates", "tsd:install"], "browserify:build", callback);
  });

  gulp.task("dist:build", function () {
    var assets = gulp.src([options.src + '/assets/**'])
        .pipe(gulp.dest(options.dist+ '/assets'));

    var fonts = gulp.src(['node_modules/bootstrap-sass/assets/fonts/bootstrap/**'], {
      baseDir: "node_modules/bootstrap-sass/assets"
    }).pipe(gulp.dest(options.dist + "/fonts/bootstrap"));

    var assets;

    var htmlFilter = filter('*.html');
    var jsFilter = filter('**/*.js');
    var cssFilter = filter('**/*.css');

    var build = gulp.src([
      options.tmp + '/serve/index.html',
    ]).pipe(assets = useref.assets())
        .pipe(rev())
        .pipe(jsFilter)
        .pipe(uglify())
        .on('error', options.errorHandler('Uglify'))
        .pipe(jsFilter.restore())
        .pipe(cssFilter)
        .pipe(csso())
        .pipe(cssFilter.restore())
        .pipe(assets.restore())
        .pipe(useref())
        .pipe(revReplace())
        .pipe(htmlFilter)
        .pipe(minifyHtml({
          conditionals: true
        }))
        .pipe(htmlFilter.restore())
        .pipe(gulp.dest(options.dist));

    return merge(assets, fonts, build);
  });

  gulp.task("dist:clean", function (cb) {
    rimraf(options.dist, cb);
  });

  gulp.task("dist", [], function (callback) {
    runSequence("dist:clean", "build", "test", "dist:build", callback);
  });

  gulp.task("dist:serve", ["dist"], function () {
    return gulp.src(options.dist, {base: options.dist})
        .pipe(webserver({
          open: true
        }));
  });
};
