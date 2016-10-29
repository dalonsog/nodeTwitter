var gulp = require('gulp'),
    babel = require('gulp-babel'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
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


gulp.task('clean', function () {
  return del(['dist']);
})

//JS 
gulp.task('js', function (cb) {
  pump([
    gulp.src(JS_FILES), 
    babel({ presets: ['es2015'] }),
    concat('main.js'),
    uglify(), 
    gulp.dest('dist')
  ], cb);
});

gulp.task('build', ['clean'], function () {
  gulp.start('js');
})

gulp.task('build-dev', ['build'], function () {
  gulp.watch(JS_FILES, ['build']);
});

gulp.task('default', function () {
  gulp.start('build');
});
