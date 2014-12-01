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
      },
      app: {
        files: [
          { // app js
            expand: true,
            cwd: '<%= config.app %>/js',
            src: '*.js',
            dest: '<%= config.dist %>/js'
          },
          { // app js
            expand: true,
            cwd: '<%= config.app %>',
            src: '*.js',
            dest: '<%= config.dist %>'
          }
        ]
      },
      lib: {
        files: [
          {
            src: './lib/jquery/jquery-1.11.1.min.js',
            dest: '<%= config.dist %>/js/jquery.js'
          },
          {
            src: './lib/requirejs/require.js',
            dest: '<%= config.dist %>/js/require.js'
          },
          {
            src: './lib/jquery-mobile/jquery.mobile-1.4.5.min.js',
            dest: '<%= config.dist %>/js/jquery.mobile.js'
          },
          {
            src: './lib/jquery-mobile/jquery.mobile-1.4.5.min.map',
            dest: '<%= config.dist %>/js/jquery.mobile-1.4.5.min.map'
          }          
        ]
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
      },
      rjs: {
        src: "http://requirejs.org/docs/release/2.1.15/minified/require.js",
        dest: "lib/requirejs"
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
    clean: {
      dist: ["dist/*"],
      lib: ["lib"]
    },
    qunit: {
      files: ['test/index.html']
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

  grunt.registerTask('default', [

  ]);
  
  grunt.registerTask('build', [
    'if-missing:curl-dir:jqm',  //TODO curl-dir does not respect if-missing https://github.com/twolfson/grunt-curl/issues/27
    'if-missing:curl-dir:jq',
    'if-missing:curl-dir:rjs',
    'if-missing:unzip',
    'copy:dist',
    'copy:lib',
    'copy:app',
    'cssmin'
  ]);
  
  grunt.registerTask('app', [
    'uglify:app'
  ]);

  grunt.registerTask('debug', [
    'browserify:debug'
  ]);
  
  grunt.registerTask('test', 'qunit' );

};
