'use strict';

// Modules
var gulp = require('gulp'),
    source = require('vinyl-source-stream'),
    browserify = require('browserify'),
    hbsfy = require('hbsfy').configure({
      extensions: ['html', 'hbs']
    }),
    // watchify = require('gulp-watchify'),
    rename = require('gulp-rename'),
    hint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    less = require('gulp-less'),
    manifest = require('gulp-manifest'),
    server = require('gulp-server-livereload');

var debug = process.env.NODE_ENV !== 'production';

var conf = {
  common: {
  },
  client: {
    SRC: './client/',
    DEST: './client/build/',
    ASSETS: './client/assets/',
    TEST: './client/test/',
    browserify: {
      debug: debug
    },
  },
  server: {
  },
};

gulp.task('hint', function() {
  return gulp.src('./client/**/*.js')
    .pipe(hint());
});

gulp.task('browserify', function() {
  return browserify(conf.client.SRC + 'index.js', conf.client.browserify)
    .transform(hbsfy)
    .bundle()
    .on('error', function(err){ console.log(err.message); })
    .pipe(source('app.js'))
    .pipe(gulp.dest(conf.client.DEST + 'js'));
});

gulp.task('uglified', ['browserify'], function() {
  return gulp.src(conf.client.DEST + 'js/app.js')
    .pipe(uglify())
    .pipe(gulp.dest(conf.client.DEST + 'js'));
});

gulp.task('less', function() {
  return gulp.src(conf.client.SRC + 'index.less')
    .pipe(less())
    .on('error', function(err){ console.log(err.message); })
    .pipe(rename('style.css'))
    .pipe(gulp.dest(conf.client.DEST + 'css'));
});

gulp.task('copy', function() {
  return gulp.src(conf.client.SRC + 'index.html')
    .pipe(gulp.dest(conf.client.DEST));
});

gulp.task('assets', function() {
  return gulp.src([
      conf.client.ASSETS + '**/*.*',
      '!' + conf.client.ASSETS + 'css/*',
    ])
    .pipe(gulp.dest(conf.client.DEST + 'assets'));
});

gulp.task('manifest', ['uglified', 'less', 'copy', 'assets'], function() {
  return gulp.src([conf.client.DEST + '**/*'])
    .pipe(manifest({
      hash: true,
      preferOnline: true,
      network: ['http://*', 'https://*', '*'],
      filename: 'app.manifest',
      exclude: 'app.manifest'
    }))
    .pipe(gulp.dest(conf.client.DEST));
});

// Creating only usable build file for now
gulp.task('test', function() {
  return browserify(conf.client.TEST + 'index.js')
    .transform(hbsfy())
    .bundle()
    .pipe(source(conf.client.TEST + 'build/runner.js'))
    .pipe(gulp.dest(conf.client.TEST));
});

gulp.task('webserver', function() {
  return gulp.src(conf.client.DEST)
    .pipe(server({
      livereload: true,
      defaultFile: 'index.html',
      open: true
    }));
});

// gulp.task('watchify', watchify(function(watchify) {
//   return gulp.src([
//       conf.client.SRC + '**/*.js',
//       conf.client.SRC + '**/*.hbs',
//       conf.client.SRC + '**/*.html',
//       '!' + conf.client.DEST + '**.*.js',
//     ])
//     .pipe(watchify({
//       watch: true
//     }))
//     .pipe(gulp.dest(conf.client.DEST + 'js'));
// }));

gulp.task('release', ['manifest'], function() {
  return;
});

gulp.task('watch', ['webserver'], function() {
  gulp.watch([
      conf.client.SRC + '**/*.js',
      conf.client.SRC + '**/*.hbs',
      conf.client.SRC + '**/*.html',
      '!' + conf.client.DEST + '**/*.js',
    ],
    ['browserify'])
    .on('change', function(ev) {
      console.log('File ' + ev.path + ' was ' + ev.type + ', running tasks...');
    });
  gulp.watch(conf.client.SRC + '**/*.less', ['less']);
  gulp.watch(conf.client.SRC + 'index.html', ['copy']);
});


gulp.task('default', ['hint', 'browserify', 'less', 'copy', 'assets'], function() {
  return;
});
