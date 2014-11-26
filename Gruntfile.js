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
//    bower: grunt.file.readJSON('./.bowerrc'),
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
         cwd: 'lib/jquery-mobile',
         src: '*.min.css*',
         dest: '<%= config.dist %>/css/'
       },
       {
         expand: true,
         cwd: 'lib/jquery-mobile/images',
         src: '*',
         dest: '<%= config.dist %>/css/images/'
       },
       {
         expand: true,
         cwd: 'node_modules/jquery/dist',
         src: '*.min.*',
         dest: '<%= config.dist %>/js'
       }       
       ]
      },
      debug: {
        files: [{
         expand: true,
         cwd: '<%= config.app %>/js',
         src: '*.js',
         dest: '<%= config.dist %>/js'
       }]
      }
    },
    uglify: {
      options: {
        banner: '/*! grunt <%= grunt.template.today("yyyy-mm-dd") %> */'
      },
      lib: {
        files: [{
          '<%= config.dist %>/js/jquery.mobile.js': 'lib/jquery-mobile/jquery.mobile-1.4.5.min.js',
        }]
      },
      app: {
        files: [{
          expand: true,
          src: '*.js',
          dest: '<%= config.dist %>/js',
          cwd: '<%= config.app %>/js',
        }]
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
        dest: "lib/tmp/jquery.mobile.zip",
        src: "http://jquerymobile.com/resources/download/jquery.mobile-1.4.5.zip"
      }
    },
    unzip: {
      'lib/jquery-mobile/': 'lib/tmp/jquery.mobile.zip'
    },
    watch: {
      scripts: {
        files: ['<%= config.app %>/**/*'],
        tasks: ['copy:debug','cssmin:combine'],
        options: {
          spawn: false,
        },
      },
    },
    clean: ["dist/*"],
    qunit: {
      files: ['test/index.html']
    },
    browserify: {
      dist: {
        files: {
          'dist/bundle.js': 'src/js/main.js',
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-curl');
  grunt.loadNpmTasks('grunt-zip');
  grunt.loadNpmTasks('grunt-if-missing');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-browserify');

  grunt.registerTask('default', [
    'if-missing:curl:jqm',
    'unzip',
    'copy:dist',
    'cssmin',
    'uglify'
  ]);
  
  grunt.registerTask('build', [
    'curl:jqm',
    'unzip',
    'copy:dist',
    'cssmin',
    'uglify'
  ]);
  
  grunt.registerTask('app', [
    'uglify:app'
  ]);

  grunt.registerTask('debug', [
    'copy:debug'
  ]);
  
  grunt.registerTask('test', 'qunit' );

};
