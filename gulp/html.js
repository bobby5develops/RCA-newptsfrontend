'use strict';

var gulp = require('gulp');

module.exports = function (options) {
    gulp.task('html', function() {
        return gulp.src([options.src + '/index.html'])
            .pipe(gulp.dest(options.tmp + "/serve"));
    });
};