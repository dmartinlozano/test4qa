// Generated on 2015-12-05 using generator-angular 0.14.0
'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var openURL = require('open');
var lazypipe = require('lazypipe');
var wiredep = require('wiredep').stream;
var runSequence = require('run-sequence');
var del = require('del');
var rename = require("gulp-rename");

var testingIt = {
  app: require('./bower.json').appPath || 'app',
  dist: 'dist'
};

var paths = {
  scripts: [testingIt.app + '/scripts/**/*.js'],
  styles: [testingIt.app + '/styles/**/*.css'],
  test: ['test/spec/**/*.js'],
  testRequire: [
    testingIt.app + '/bower_components/angular/angular.js',
    testingIt.app + '/bower_components/angular-animate/angular-animate.js',
    testingIt.app + '/bower_components/angular-mocks/angular-mocks.js',
    testingIt.app + '/bower_components/angular-resource/angular-resource.js',
    testingIt.app + '/bower_components/angular-cookies/angular-cookies.js',
    testingIt.app + '/bower_components/angular-sanitize/angular-sanitize.js',
    testingIt.app + '/bower_components/angular-ui-router/release/angular-ui-router.js',
    'test/mock/**/*.js',
    'test/spec/**/*.js'
  ],
  karma: 'karma.conf.js',
  views: {
    main: testingIt.app + '/index.html',
    files: [testingIt.app + '/components/**/*.html']
  }
};

////////////////////////
// Reusable pipelines //
////////////////////////

var lintScripts = lazypipe()
  .pipe($.jshint, '.jshintrc')
  .pipe($.jshint.reporter, 'jshint-stylish');

var styles = lazypipe()
  .pipe($.autoprefixer, 'last 1 version')
  .pipe(gulp.dest, '.tmp/styles');

///////////
// Tasks //
///////////

gulp.task('styles', function () {
  return gulp.src(paths.styles)
    .pipe(styles());
});

gulp.task('lint:scripts', function () {
  del([testingIt.dist + '/scripts/app.js'], function(err, paths) {
    console.log('Deleted files/folders:\n', paths.join('\n'));
  });
  gulp.src([testingIt.app + '/components/**/*.js'])
    .pipe($.jshint())
    .pipe($.jshint.reporter('default'))
    .pipe($.concat('app.js'))
    //.pipe(plugins.uglify())
    .pipe(gulp.dest(testingIt.dist + '/scripts'))
});

gulp.task('lint:vendorJS', function() {
  del([testingIt.dist + '/scripts/lib.js'], function(err, paths) {
    console.log('Deleted files/folders:\n', paths.join('\n'));
  });
  gulp.src(['./bower_components/jquery/dist/jquery.js',
            './bower_components/angular/angular.js',
            './bower_components/angular-animate/angular-animate.js',
            './bower_components/angular-cookies/angular-cookies.js',
            './bower_components/angular-environment/dist/angular-environment.js',
            './bower_components/angular-resource/angular-resource.js',
            './bower_components/angular-ui-router/release/angular-ui-router.js',
            './bower_components/angular-sanitize/angular-sanitize.js',
            './bower_components/angular-touch/angular-touch.js',
            './bower_components/restangular/dist/restangular.js',
            './bower_components/underscore/underscore.js',
            './bower_components/angular-ui-grid/ui-grid.js',
            './bower_components/bootstrap/dist/js/bootstrap.js',
            './bower_components/angular-bootstrap-nav-tree/dist/abn_tree_directive.js',
            ''
          ])
    .pipe($.concat('lib.js'))
    .pipe(gulp.dest(testingIt.dist + '/scripts'));
});

gulp.task('lint:css', function () {
    del([testingIt.dist + '/stylesheets/app.css'], function(err, paths) {
      console.log('Deleted files/folders:\n', paths.join('\n'));
    });
    gulp.src(testingIt.app + '/components/**/*.css')
       .pipe($.concat('app.css'))
        //.pipe(plugins.uglify())
        //.pipe($.minifyCss({cache: true}))
       .pipe(gulp.dest(testingIt.dist + '/stylesheets'));
});

gulp.task('lint:vendorCSS', function() {
    //concatenate vendor CSS files
    gulp.src(['./bower_components/bootstrap/dist/css/bootstrap.css',
              './bower_components/bootstrap/dist/css/bootstrap-theme.css',
              './bower_components/components-font-awesome/css/font-awesome.css',
              './bower_components/angular-bootstrap-nav-tree/dist/abn_tree.css',
              './app/sb-admin-2.css',
              './bower_components/angular-bootstrap/ui-bootstrap-csp.css',
              './bower_components/angular-ui-grid/ui-grid.css'
		          ])
        .pipe($.concat('lib.css'))
        .pipe(gulp.dest(testingIt.dist + '/stylesheets'));
});

gulp.task('clean:tmp', function (cb) {
  del(['./.tmp'], function(err, paths) {
    console.log('Deleted files/folders:\n', paths.join('\n'));
  });
});

gulp.task('start:client', ['start:server', 'styles'], function () {
  //openURL('http://localhost:8080');
});

gulp.task('start:server', function() {
  $.connect.server({
    root: [testingIt.app, '.tmp', testingIt.dist],
    livereload: true,
    // Change this to '0.0.0.0' to access the server from outside.
    port: 8080
  });
});

gulp.task('watch', function () {
  $.watch(paths.styles)
    .pipe($.plumber())
    .pipe(styles())
    .pipe($.connect.reload());

  $.watch(paths.views.files)
    .pipe($.plumber())
    .pipe($.connect.reload());

  $.watch(paths.scripts)
    .pipe($.plumber())
    .pipe(lintScripts())
    .pipe($.connect.reload());

  $.watch(paths.test)
    .pipe($.plumber())
    .pipe(lintScripts());

  gulp.watch('bower.json');
});

gulp.task('serve:prod', function() {
  $.connect.server({
    root: [testingIt.dist],
    livereload: true,
    port: 8080
  });
});

///////////
// Build //
///////////

gulp.task('clean:dist', function (cb) {
  return del(['./dist'], cb);
});

gulp.task('client:build', ['html', 'styles'], function () {
  var jsFilter = $.filter('**/*.js');
  var cssFilter = $.filter('**/*.css');

  return gulp.src(paths.views.main)
    .pipe($.useref.assets({searchPath: [testingIt.app, '.tmp']}))
    .pipe(jsFilter)
    .pipe($.ngAnnotate())
    .pipe($.uglify())
    .pipe(jsFilter.restore())
    .pipe(cssFilter)
    .pipe($.minifyCss({cache: true}))
    .pipe(cssFilter.restore())
    .pipe($.rev())
    .pipe($.useref.assets().restore())
    .pipe($.revReplace())
    .pipe($.useref())
    .pipe(gulp.dest(testingIt.dist));
});

gulp.task('html', function () {
  gulp.src(testingIt.app + '/components/**/*.html')
    .pipe(gulp.dest(testingIt.dist + '/views'));
});

gulp.task('images', function () {
  return gulp.src(testingIt.app + '/images/**/*')
    .pipe($.cache($.imagemin({
        optimizationLevel: 5,
        progressive: true,
        interlaced: true
    })))
    .pipe(gulp.dest(testingIt.dist + '/images'));
});

gulp.task('copy:extras', function () {
  return gulp.src(testingIt.app + '/*/.*', { dot: true })
    .pipe(gulp.dest(testingIt.dist));
});

gulp.task('copy:fonts', function () {
  gulp.src(testingIt.app + '/fonts/**/*')
    .pipe(gulp.dest(testingIt.dist + '/fonts'));
  gulp.src(['./bower_components/components-font-awesome/fonts/fontawesome-webfont.woff',
            './bower_components/components-font-awesome/fonts/fontawesome-webfont.woff2',
            './bower_components/components-font-awesome/fonts/fontawesome-webfont.ttf'
          ])
    .pipe(gulp.dest(testingIt.dist + '/fonts'));
  gulp.src(['./bower_components/angular-ui-grid/ui-grid.woff',
            './bower_components/angular-ui-grid/ui-grid.ttf'
            ])
    .pipe(gulp.dest(testingIt.dist + '/stylesheets'));
});

gulp.task('build', ['clean:dist'], function () {
  runSequence(['clean:tmp', 'images', 'copy:extras', 'copy:fonts', 'client:build', 'lint:scripts', 'lint:vendorJS', 'lint:css','lint:vendorCSS']);
});

gulp.task('serve', function (cb) {
  runSequence('build', 'start:client', 'watch', cb);
});

gulp.task('default', ['serve']);
