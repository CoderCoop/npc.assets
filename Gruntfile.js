var pkgjson = require('./package.json');

var config = {
  pkg: pkgjson,
  app: 'src',
  dist: 'dist'
}

module.exports = function (grunt) {

  // Configuration
  grunt.initConfig({
    config: config,
    pkg: config.pkg,
    bower: grunt.file.readJSON('./.bowerrc'),
    copy: {
      dist: {
       files: [{
         expand: true,
         cwd: '<%= config.app %>',
         src: '*.html',
         dest: '<%= config.dist %>'
       },
       {
         expand: true,
         cwd: '<%= bower.directory %>/jquery-mobile',
         src: '*.min.css*',
         dest: '<%= config.dist %>/css/'
       },
       {
         expand: true,
         cwd: '<%= bower.directory %>/jquery-mobile/images',
         src: '*',
         dest: '<%= config.dist %>/css/images/'
       }]
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> lib - v<%= pkg.version %> -' +
          '<%= grunt.template.today("yyyy-mm-dd") %> */'
      },
      dist: {
        files: {
          '<%= config.dist %>/js/jquery.js': '<%= bower.directory %>/jquery/dist/jquery.js',
          '<%= config.dist %>/js/require.js': '<%= bower.directory %>/requirejs/require.js',
          '<%= config.dist %>/js/jquery.mobile.js': '<%= bower.directory %>/jquery-mobile/jquery.mobile-1.4.5.min.js',
          '<%= config.dist %>/js/main.js': '<%= config.app %>/js/main.js',
          '<%= config.dist %>/js/app.js': '<%= config.app %>/js/app.js',
          '<%= config.dist %>/js/npc.js': '<%= config.app %>/js/npc.js'
        }
      }
    },
    cssmin: {
      combine: {
        files: {
          '<%= config.dist %>/css/styles.css': ['<%= config.app %>/css/*.css']
        }
      }
    },
    curl: {
      jqm: {
        dest: "<%= bower.directory %>/tmp/jquery.mobile.zip",
        src: "http://jquerymobile.com/resources/download/jquery.mobile-1.4.5.zip"
      }
    },
    unzip: {
      '<%= bower.directory %>/jquery-mobile/': '<%= bower.directory %>/tmp/jquery.mobile.zip'
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-curl');
  grunt.loadNpmTasks('grunt-zip');
  grunt.loadNpmTasks('grunt-if-missing');

  grunt.registerTask('default', [
    'if-missing:curl:jqm',
    'unzip',
    'copy',
    'cssmin',
    'uglify'
  ]);
  
  grunt.registerTask('build', [
    'curl:jqm',
    'unzip',
    'copy',
    'cssmin',
    'uglify'
  ]);
  
};
