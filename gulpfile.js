var gulp = require('gulp');
var jshint = require('gulp-jshint');

gulp.task('lint', function(){
  return gulp.src('./src/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('copy', function(){
  return gulp.src('./src/*.js').pipe(gulp.dest('./dist'));
});

gulp.task('default', ['copy', 'lint']);