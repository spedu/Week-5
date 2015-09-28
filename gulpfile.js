var gulp = require('gulp');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('lint', function(){
  return gulp.src('./js/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('concat', function(){
  return gulp.src('./js/app/*.js')
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist'));
});

gulp.task('copy', function(){
  return gulp.src('./js/**/*.js').pipe(gulp.dest('./dist'));
});


gulp.task('default', ['concat']);
