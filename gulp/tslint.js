'use strict';

var gulp = require('gulp');
var tslint = require('gulp-tslint');

module.exports = function (options) {
  gulp.task('tslint', function (cb) {
    cb();

    //TODO: Enabled again when we have control over our lint
    //return gulp.src(options.src + '/app/**/*.ts')
    //  .pipe(tslint())
    //  .pipe(tslint.report('verbose', {emitError: false}))
  });
};
