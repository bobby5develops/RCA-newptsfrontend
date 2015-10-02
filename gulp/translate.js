"use strict";

var gulp = require("gulp");
require("gulp-grunt")(gulp);
var path = require('path');
var debug = require('gulp-debug');
var insert = require('gulp-insert');
var foreach = require('gulp-foreach');
var concat = require('gulp-concat');
var runSequence = require('run-sequence');

module.exports = function (options) {
  gulp.task('translate', [], function (callback) {
    runSequence("grunt-i18nextract:compile", "translate:build", callback);
  });

  gulp.task('translate:build', [], function () {
    var processLanguageFile = function (stream, file) {

      var language = path.basename(file.path, path.extname(file.path));

      var prepend = "export var " + language + ": {[index: string]: string} = ";
      var append = ";\r\n";

      return stream
          .pipe(insert.prepend(prepend))
          .pipe(insert.append(append));
    };

    return gulp.src([options.src + '/app/i18n/*.json'])
        .pipe(foreach(processLanguageFile))
        .pipe(concat("Translations.ts"))
        .pipe(gulp.dest(options.src + "/app/config/Translate"));
  });

  gulp.task('translate:watch', [], function () {
    gulp.watch([options.src + '/i18n/*.json'], function (event) {
      gulp.start('translate:build');
    });
  });
};
