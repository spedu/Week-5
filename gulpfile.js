var gulp = require('gulp');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var connect = require('gulp-connect');

gulp.task('lint', function(){
  return gulp.src('./src/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('concat', function(){
  return gulp.src('./src/*.js')
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist'));
});

gulp.task('copy', function(){
  return gulp.src('./src/*.js').pipe(gulp.dest('./dist'));
});

gulp.task('connect', connect.server({
    root: ['src'],
    port: 9000,
    livereload: true
}));


gulp.task('default', ['concat', 'lint']);