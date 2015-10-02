'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var runSequence = require('run-sequence');

function isOnlyChange(event) {
    return event.type === 'changed';
}

module.exports = function (options) {
    gulp.task('watch:build', function (callback) {
        runSequence("bower", ["styles", "templates"], "tsd:install", "browserify:watch", callback);
    });

    gulp.task('watch', ['watch:build'], function () {
        gulp.watch([
            options.src + '/app/**/*.css',
            options.src + '/app/**/*.scss'
        ], function (event) {
            gutil.log("Triggered Styles Watcher");
            gulp.start('styles');
        });

        gulp.watch(options.src + '/app/**/*.html', function (event) {
            gutil.log("Triggered Templates Watcher");
            gulp.start('templates');
        });

        gulp.watch([
            options.src + '/app/**/*.html',
            options.src + '/app/**/*.ts',
            '!' + options.src + '/app/test/**',
            '!' + options.src + '/app/**/Templates.ts',
            '!' + options.src + '/app/config/Translate/Translations.ts'
        ], function (event) {
            gutil.log("Triggered Translations Watcher");
            gulp.start('translate');
        });
    });
};
