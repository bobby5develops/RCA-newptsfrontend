module.exports = function (grunt) {
  "use strict";
  grunt.initConfig({
    i18nextract: {
      compile: {
        src: [
          "src/app/*.ts", "src/app/*.html",
          "src/app/**/*.ts", "src/app/**/*.html",
          "!src/app/i18n"
        ],
        lang: ["en", "fr", "de", "es"],
        dest: "src/app/i18n"
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks("grunt-angular-translate");
};
