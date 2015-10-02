'use strict';

var gulp = require('gulp');

var fs = require("fs");
var path = require("path");
var es = require("event-stream");
var changeCase = require('change-case');
var gulpif = require('gulp-if');
var glob = require('glob');
var templateCache = require('gulp-angular-templatecache');
var minifyHTML = require('gulp-minify-html');

module.exports = function (options) {
  //http://www.jamescrowley.co.uk/2014/02/17/using-gulp-packaging-files-by-folder/
  function getFolders(dir) {
    return fs.readdirSync(dir)
      .filter(function (file) {
        return fs.statSync(path.join(dir, file)).isDirectory();
      });
  }

  gulp.task('templates', function () {
    var templateFolders = ["./src/app/components/", "./src/app/shared/"]
      .map(function (folder) {
        return getFolders(folder)
          .map(function (subFolder) {
            return path.join(folder, subFolder)
          });
      }).reduce(function (previousValue, currentValue, index, array) {
        return previousValue.concat(currentValue);
      }, []);

    var TEMPLATE_HEADER = '/// <reference path="../../tsd.d.ts" />\r\nangular.module("<%= module %>"<%= standalone %>).run(["$templateCache", function($templateCache) {';
    var TEMPLATE_FOOTER = '}]);var moduleName = "<%= module %>";export = moduleName;';

    var tasks = templateFolders.map(function (folder) {
      var moduleName = folder.split(path.sep).slice(2)
        .map(function (part) {
          return changeCase.ucFirst(part);
        })
        .concat(["Templates"])
        .join(".");


      var moduleSearchFolder = path.join(folder, "*.html");
      var fileCount = glob.sync(moduleSearchFolder).length;

      return gulp.src([moduleSearchFolder])
          .pipe(minifyHTML({empty: true}))
          .pipe(gulpif(fileCount  > 0, templateCache("Templates.ts", {
            root: moduleName + ".",
            module: moduleName,
            standalone: true,
            templateHeader: TEMPLATE_HEADER,
            templateFooter: TEMPLATE_FOOTER,
            transformUrl: function (url) {
              return url.replace(new RegExp("^" + moduleName + "\.(\\\\|/)"), moduleName + ".").replace(/.html$/, "");
            }
          })))
        .pipe(gulpif(fileCount > 0, gulp.dest(folder)));
    });

    return es.concat.apply(null, tasks);
  });
};
