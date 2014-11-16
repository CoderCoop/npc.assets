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
//          '<%= config.dist %>/js/jquery.mobile.js': '<%= bower.directory %>/jquerymobile.js',
          '<%= config.dist %>/js/require.js': '<%= bower.directory %>/requirejs/require.js',
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
      './lib/dl/jquery.mobile.zip': 'http://jquerymobile.com/resources/download/jquery.mobile-1.4.5.zip'
    },
    unzip: {
      './lib/jquery-mobile/': './lib/dl/jquery.mobile.zip'
    },
    bower: {
      install: {
       //just run 'grunt bower:install' and you'll see files from your Bower packages in lib directory
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-curl');
  grunt.loadNpmTasks('grunt-zip');
  grunt.loadNpmTasks('grunt-bower-task');

  grunt.registerTask('default', [
    'bower',
    'curl',
    'unzip',
    'copy',
    'cssmin',
    'uglify'
  ]);
  
  grunt.registerTask('test', [
    'curl',
    'unzip'
  ]);
  
};
