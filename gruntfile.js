module.exports = function(grunt) {
  const sass = require('node-sass');

  require('load-grunt-tasks')(grunt);
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    ts: {
      default: {
        src: ['**/*.ts', '!node_modules/**'],
      },
    },
    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: ['src/**/*.js'],
        dest: 'dist/<%= pkg.name %>.js',
      },
    },
    uglify: {
      my_target: {
        files: [
          {
            expand: true,
            cwd: 'src/',
            src: '**/*.js',
            dest: 'dist/',
          },
        ],
      },
    },
    sass: {
      options: {
        implementation: sass,
        sourceMap: true,
      },
      dist: {
        files: [
          {
            expand: true,
            cwd: 'src',
            src: ['**/*.scss'],
            dest: './css',
            ext: '.css',
          },
        ],
      },
    },
    cssmin: {
      target: {
        files: [
          {
            expand: true,
            cwd: 'css',
            src: ['*.css', '!*.min.css'],
            dest: 'css',
            ext: '.min.css',
          },
        ],
      },
    },
    copy: {
      main: {
        files: [
          {
            cwd: 'src/', // set working folder / root to copy
            src: '**/*.html', // copy all files and subfolders
            dest: 'dist/', // destination folder
            expand: true, // required when using cwd
          },
          {
            cwd: 'css/',
            src: '*.min.css',
            dest: 'dist/',
            expand: true,
          },
        ],
      },
    },
    qunit: {
      files: ['test/**/*.html'],
    },
    jshint: {
      files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
      options: {
        esversion: 6,
        // options here to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true,
        },
      },
    },
    watch: {
      scripts: {
        files: ['src/**/*.ts', 'src/**/*.scss', 'src/**/*.html'],
        tasks: ['default'],
        options: {
          spawn: false,
          livereload: {
            base: 'dist/',
            hostname: 'localhost',
          },
        },
      },
    },
    connect: {
      server: {
        options: {
          port: 3000,
          base: 'dist/',
          livereload: true,
          hostname: 'localhost',
        },
      },
    },
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-ts');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.registerTask('test', ['jshint', 'qunit']);
  grunt.registerTask('serve', ['default', 'connect:server', 'watch']);

  grunt.registerTask('default', [
    'ts',
    'sass',
    'cssmin',
    'concat',
    'uglify',
    'copy',
  ]);
};
