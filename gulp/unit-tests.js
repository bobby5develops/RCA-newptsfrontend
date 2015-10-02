'use strict';

var path = require('path');
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

var conf = require('./conf')();

var browserify = require('browserify');
var watchify = require('watchify');
var tsify = require('tsify');

var source = require('vinyl-source-stream');

var karma = require('karma');

module.exports = function (options) {

    /**
     * Runs the Testfiles and Source in Karma using the Browserify plugin.
     */
    function runTests(singleRun, done) {
        conf.setBuild(true); // Sets the flag so we can ignore dev files in the gulp task. Passing extra options to
                             // Karma does not work at this time.
        karma.server.start({
            configFile: path.join(__dirname, '/../karma.conf.js'),
            singleRun: singleRun,
            autoWatch: !singleRun,
            options: options
        }, function () {
            done();
        });
    }

    /**
     * Single Run Task
     */
    gulp.task('test', function (done) {
        runTests(true, done);
    });

    /**
     * Multiple Run Task - Watches the files for changes and re-executes if unit test changes are found.
     */
    gulp.task('test:auto', function (done) {
        runTests(false, done);
    });

    /**
     * Creates a test bundle (not in use atm).
     */
    gulp.task('test:build', [], function (done) {
        var bundler = browserify({
            basedir: options.src + "/app",
            debug: true,
            standalone: 'Test',
            files:["angular-mocks"]
        }).plugin(tsify, {target: 'ES5', module: 'commonjs'});

        bundler.add('index.ts');

        return bundler.bundle()
            .pipe(source('test.js'))
            .pipe(gulp.dest(options.tmp + '/serve/test'));
    });
};
