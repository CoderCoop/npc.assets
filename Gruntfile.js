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
       files: [{ // app html
         expand: true,
         cwd: '<%= config.app %>',
         src: '*.html',
         dest: '<%= config.dist %>'
       },
       { // jquery mobile css
         expand: true,
         cwd: 'lib/jquery-mobile',
         src: '*.min.css*',
         dest: '<%= config.dist %>/css/'
       },
       { // jquery mobile images
         expand: true,
         cwd: 'lib/jquery-mobile/images',
         src: '*',
         dest: '<%= config.dist %>/css/images/'
       }]
      }
    },
    cssmin: {
      combine: {
        files: { // app css
          '<%= config.dist %>/css/styles.css': ['<%= config.app %>/css/*.css']
        }
      }
    },
    'curl-dir': {
      jq: { //download jq 1.11.1 compressed minified + map file
        src: ['http://code.jquery.com/jquery-1.11.1.min.{js,map}'],
        dest: 'lib/jquery'
      },
      jqm: { // download jqm 1.4.5 zip file
        src: "http://jquerymobile.com/resources/download/jquery.mobile-1.4.5.zip",
        dest: "lib/tmp"
      }
    },
    unzip: { // unzip jqm
      'lib/jquery-mobile/': 'lib/tmp/jquery.mobile-1.4.5.zip'
    },
    watch: {
      scripts: {
        files: ['<%= config.app %>/**/*'],
        tasks: ['browserify','cssmin:combine'],
        options: {
          spawn: false,
        },
      },
    },
    clean: [
    "dist/*",
    "lib"
    ],
    qunit: {
      files: ['test/index.html']
    },
    browserify: {
      dist: {
        files: {
          'dist/bundle.js': 'src/js/main.js',
        }
      },
      debug: {
        files: {
          'dist/bundle.js': 'src/js/main.js',
        },
        options: { browserifyOptions : {debug: true} }
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
    'if-missing:curl-dir:jqm',
    'if-missing:curl-dir:jq',
    'unzip',
    'copy:dist',
    'cssmin',
    'browserify:dist'
  ]);
  
  grunt.registerTask('build', [
    'curl-dir:jqm',
    'unzip',
    'copy:dist',
    'cssmin',
    'uglify'
  ]);
  
  grunt.registerTask('app', [
    'uglify:app'
  ]);

  grunt.registerTask('debug', [
    'browserify:debug'
  ]);
  
  grunt.registerTask('test', 'qunit' );

};
