

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jsdoc : {
        dist : {
            src: ['./js/*.js'],
            jsdoc: './node_modules/jsdoc/.bin/jsdoc',
            options: {
                destination: './doc',
                configure: './node_modules/jsdoc/conf.json',
                template: './node_modules/ink-docstrap/template'
            }
        }
    },
    ngdocs:{
      all:['./js/*.js']
    }
  });
  


  grunt.loadNpmTasks('grunt-jsdoc');
  grunt.loadNpmTasks('grunt-ngdocs');

  grunt.registerTask('default','Default Task Alias', ['build']);
  grunt.registerTask('build','Default Task Alias', ['ngdocs']);

};

