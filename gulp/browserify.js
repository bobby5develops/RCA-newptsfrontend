'use strict';

var gulp = require('gulp');
var source = require('vinyl-source-stream');
var exorcist = require('exorcist');
var browserify = require('browserify');
var watchify = require('watchify');
var tsify = require('tsify');
var uglifySaveLicense = require('uglify-save-license');
var gutil = require('gulp-util');
var lodash = require('lodash');
var tslint = require('gulp-tslint');

module.exports = function (options) {

    var vendorLibs = [
        "angular",
        "jquery",
        "lodash",
        "angular-animate",
        "angular-cookies",
        "angular-google-maps",
        "angular-sanitize",
        "angular-resource",
        "angular-ui-router",
        "angular-bootstrap-shim",
        "angular-google-maps-shim",
        "angular-translate",
        "angular-translate-loader-static-files",
        "angular-translate-shim",
        "sprintf-js",
        "sprintf-js-shim",
        "logging-enhancer",
        "angular-simple-logger",
        "angular-simple-logger-shim",
        "angular-logger",
        "angular-logger-shim",
        "moment",
        "angular-moment",
        "numeral",
        "angular-numeraljs",
        "angular-numeraljs-shim",
        "d3",
        "ui-router-extras-shim",
        "angular-awesome-slider",
        "angular-awesome-slider-shim",
        "angular-confirm",
        "angular-confirm-shim",
        "cd-node-utils"
    ];

    gulp.task('browserify:build:vendors', [], function () {
        var bundler = browserify({
            basedir: options.src + "/app", paths: [
                "../../node_modules/",
                "../../shims/"
            ]
        });

        bundler.transform({preserveComments: uglifySaveLicense}, 'uglifyify');

        lodash.forEach(vendorLibs, function (vendorLib) {
            bundler.require(vendorLib);
        });

        return bundler
            .bundle()
            .pipe(source('vendor.js'))
            .pipe(gulp.dest(options.tmp + '/serve/app'));
    });

    var getApplicationBundler = function () {
        var bundler = browserify({basedir: options.src + "/app", debug: true})
            .plugin(tsify, {target: 'ES5', module: 'commonjs'});

        lodash.forEach(vendorLibs, function (vendorLib) {
            bundler.external(vendorLib);
        });

        bundler.add('index.ts');

        return bundler;
    };

    var createAppBundle = function (bundler) {
        return bundler.bundle()
            .on('error', options.errorHandler('TypeScript'))
            .pipe(exorcist(options.tmp + '/serve/app/application.js.map'))
            .pipe(source('application.js'))
            .pipe(gulp.dest(options.tmp + '/serve/app'));
    };

    gulp.task('browserify:build:application', ["tslint"], function () {
        return createAppBundle(getApplicationBundler());
    });

    gulp.task("browserify:build", ["browserify:build:vendors", "browserify:build:application"], function () {
    });

    gulp.task('browserify:watch', ["browserify:build:vendors", "tslint"], function (callback) {
        var bundler = watchify(getApplicationBundler());

        bundler.on('update', function (ids) {
            for(var i = 0; i < ids.length; i++) {
                gutil.log("Modified: " + ids[i]);
            }
            gutil.log("Rebundling");

            gulp.src(ids)
                .pipe(tslint())
                .pipe(tslint.report('verbose', {emitError: false}));

            createAppBundle(bundler).on('end', function () {
                gutil.log("Rebundled");
            });
        });

        return createAppBundle(bundler);
    });

    gulp.task('browserify:build:test', function () {
        var bundler = browserify({basedir: options.test + "/", debug: true})
            .plugin(tsify, {target: 'ES5', module: 'commonjs'});

        lodash.forEach(vendorLibs, function (vendorLib) {
            bundler.external(vendorLib);
        });

        return bundler.bundle()
            .on('error', options.errorHandler('TypeScript'))
            .pipe(exorcist(options.tmp + '/serve/test/test.js.map'))
            .pipe(source('test.js'))
            .pipe(gulp.dest(options.tmp + '/serve/test'))
    });
};
