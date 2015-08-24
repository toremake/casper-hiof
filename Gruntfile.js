module.exports = function(grunt) {
  // Loads each task referenced in the packages.json file
  require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);
  require('time-grunt')(grunt);


  var mySecret = false;
  if (grunt.file.exists('secret.json')) {
    mySecret = grunt.file.readJSON('secret.json');
  }


  // Initiate grunt tasks
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Tasks
    lesslint:{
      src: ['app/assets/less/*.less'],
      options:{
        csslint:{
          'known-properties': false
        }
      }
    },
    less: {
      standard: {
        options: {

        },
        files: [{
          expand: true,
          cwd: 'app/assets/less/',
          src: ['*.less'],
          dest: 'tmp/css/',
          ext: '.css'
        }]
      }
    },
    autoprefixer: {
      options: {
        browsers: ['last 2 versions', 'ie 8', 'ie 9']
        //diff: 'build/config/*.diff'
      },
      prefix: {
        expand: true,
        //flatten: true,
        cwd: 'tmp/css/',
        src: '*.css',
        dest: 'build/casper-hiof'
      }
    },
    //cssmin: {
    //  main: {
    //    options: {
    //      keepSpecialComments: '*'
    //      //banner: '/*!  HiØ casper-stylesheet v<%= pkg.version %> by Kenneth Dahlstrøm<kenneth.dahlstrom@hiof.no> */'
    //    },
    //    expand: true,
    //    cwd: 'tmp/css/prefixed/',
    //    src: ['*.css', '!*.min.css'],
    //    dest: 'build/casper-hiof',
    //    ext: '.css'
    //  }
    //},
    copy: {
      php:{
        expand: true,
        cwd: 'app/php/',
        src: '**',
        dest: 'build/casper-hiof/',
        filter: 'isFile'
      },
      wpFiles:{
        expand: true,
        cwd: 'app/wp-files/',
        src: '**',
        dest: 'build/casper-hiof/',
        filter: 'isFile'
      },
      dist:{
        expand: true,
        cwd: 'build/',
        src: '**',
        dest: 'dist/',
        filter: 'isFile'
      }
    },

    clean: {
      dist: ['dist/**/*'],
      build: ['build/**/*']
    },




    secret: mySecret,
    sftp: {
      stage: {
        files: {
           "./": "deploy/assets/**"
        },
        options: {
          path: '<%= secret.prod.path %>',
          srcBasePath: "deploy/assets/",
          host: '<%= secret.stage.host %>',
          username: '<%= secret.stage.username %>',
          password: '<%= secret.stage.password %>',
          showProgress: true,
          createDirectories: true,
          directoryPermissions: parseInt(755, 8)
        }
      },
      prod: {
        files: {
           "./": "deploy/assets/**"
        },
        options: {
          path: '<%= secret.prod.path %>',
          srcBasePath: "deploy/assets/",
          host: '<%= secret.prod.host %>',
          username: '<%= secret.prod.username %>',
          password: '<%= secret.prod.password %>',
          showProgress: true,
          createDirectories: true,
          directoryPermissions: parseInt(755, 8)
        }
      }
    },

  });

  // ----------------------------------------------------------
  // Tasks

  // Register tasks
  grunt.registerTask('subtaskCss', ['less', 'autoprefixer']);
  grunt.registerTask('build', ['clean', 'subtaskCss', 'copy']);



  // grunt.registerTask('dist', ['clean:build', 'subtaskCss', 'subtaskJs', 'versioning:dist', 'subtaskCopy', 'subtaskViews', 'clean:dist', 'copy:dist']);



  // Deploy tasks
  //grunt.registerTask('deploy-stage', [
  //                                      'clean:build',
  //                                      'subtaskCss',
  //                                      'subtaskJs',
  //                                      'versioning:deploy',
  //                                      'subtaskCopyDeploy',
  //                                      'subtaskViews',
  //                                      'clean:deploy',
  //                                      'copy:deploy',
  //                                      'sftp:stage'
  //                                    ]);
  //
  //grunt.registerTask('deploy-prod', [
  //                                    'clean:build',
  //                                    'subtaskCss',
  //                                    'subtaskJs',
  //                                    'versioning:deploy',
  //                                    'subtaskCopyDeploy',
  //                                    'subtaskViews',
  //                                    'clean:deploy',
  //                                    'copy:deploy',
  //                                    'sftp:prod'
  //                                  ]);




};
