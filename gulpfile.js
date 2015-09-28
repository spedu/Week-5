var gulp = require('gulp');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var Server = require('karma').Server;
var connect = require('gulp-connect');

gulp.task('jshint', function(){
  return gulp.src('./js/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('buildApp', function(){
  return gulp.src('./js/app/*.js')
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist'));
});

gulp.task('buildVendor', function(){
  return gulp.src('./js/vendors/*.js')
    .pipe(concat('lib.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist'));
});

gulp.task('build', ['buildApp', 'buildVendor']);

gulp.task('copy', function(){
  return gulp.src('./js/**/*.js').pipe(gulp.dest('./dist'));
});

gulp.task('karma', function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});

gulp.task('test', ['jshint', 'karma']);

gulp.task('tdd', function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js'
  }, done).start();
});

gulp.task('watch', function(){
  gulp.watch('js/app/**/*.js', ['test', 'build']);
  gulp.watch('js/tests/**/*.js', ['test']);
});

gulp.task('default', ['test', 'build', 'watch']);
