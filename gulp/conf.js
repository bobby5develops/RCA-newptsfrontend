/**
 *  This file contains the variables used in other gulp files
 *  which defines tasks
 *  By design, we only put there very generic config values
 *  which are used in several places to keep good readability
 *  of the tasks
 *
 *  JB - It seems other Gulp Generators have started using this as a method
 *  of passing path variables around rather than via function(options) call. E.g,:
 *  https://github.com/Swiip/generator-gulp-angular/blob/master/app/templates/gulp/_conf.js
 */
'use strict';

var gutil = require('gulp-util');

var build = false;

module.exports = function (options) {
    return {
        /**
         *  The main paths of your project handle these with care
         */
        paths: {
            src: 'src',
            test: 'src/app/test',
            dist: 'dist',
            tmp: '.tmp',
            e2e: 'e2e'
        },
        isBuild: function() {
            return build;
        },
        setBuild: function(isBuild) {
            build = isBuild;
        },
        /**
         *  Common implementation for an error handler of a Gulp plugin
         */
        errorHandler: function (title) {

            return function (err) {
                gutil.log(gutil.colors.red('[' + title + ']'), err.toString());
                this.emit('end');
            }
        }
    }
};
