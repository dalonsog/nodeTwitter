var gulp = require('gulp'),
    babel = require('gulp-babel'),
    cleancss = require('gulp-clean-css'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    util = require('gulp-util'),
    pump = require('pump'),
    del = require('del');


const JS_FILES = [
  'public/libs/angular/angular.min.js',
  'public/libs/angular-ui-router/release/angular-ui-router.min.js',
  'public/libs/angular-resource/angular-resource.min.js',
  'public/libs/angular-elastic/elastic.js',
  'public/js/*.js', 
  'public/js/controllers/*.js'
];
const CSS_FILES = [
  'public/libs/font-awesome/css/font-awesome.css',
  'public/css/*.css',
  '!public/css/login.css'
];

var isEnvProduction = !!util.env.production;

gulp.task('clean', function () {
  return del(['dist']);
});

gulp.task('copyfonts', function () {
  return gulp.src('public/libs/font-awesome/fonts/*')
             .pipe(gulp.dest('dist/fonts'));
});

//CSS
gulp.task('css', ['copyfonts'], function () {
  gulp.src('public/css/login.css')
             .pipe(isEnvProduction ? cleancss({ compatibility: 'ie8' }) 
                                   : util.noop())
             .pipe(gulp.dest('dist/css'));  
  return gulp.src(CSS_FILES)
             .pipe(concat('main.css'))
             .pipe(isEnvProduction ? cleancss({ compatibility: 'ie8' }) 
                                   : util.noop())
             .pipe(gulp.dest('dist/css'));
});

//JS 
gulp.task('js', function (cb) {
  pump([
    gulp.src(JS_FILES), 
    babel({ presets: ['es2015'] }),
    concat('main.js'),
    isEnvProduction ? uglify() : util.noop(), 
    gulp.dest('dist/js')
  ], cb);
});

gulp.task('build', ['clean'], function () {
  gulp.start('css', 'js');
})

gulp.task('default', function () {
  gulp.start('build');
  
  if (!isEnvProduction) {
    gulp.watch(CSS_FILES.concat(JS_FILES), ['build']);
  }
});
