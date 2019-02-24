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
            src: ['*.scss'],
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
      files: ['src/*.ts', 'src/*.html', '*.scss'],
      tasks: ['default'],
    },
    connect: {
      server: {
        options: {
          port: 3000,
          base: 'dist',
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

  grunt.registerTask('default', [
    'ts',
    'sass',
    'cssmin',
    'concat',
    'uglify',
    'copy',
    'connect',
    'watch',
  ]);
};
