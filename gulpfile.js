var Server = require('karma').Server;

var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');
var minifyCss = require('gulp-minify-css');

var gulp = require('gulp');

gulp.task('jshint', function() {
  gulp.src('./js/app/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

gulp.task('karma', function(done) {
  new Server({
    configFile: __dirname + '/karma.conf.js'/*, 
    singleRun: true*/
  }, done).start();
});

gulp.task('test', ['jshint', 'karma']);

gulp.task('buildVendor', function() {
  gulp.src(['./js/vendors/jquery.min.js', './js/vendors/bootstrap.min.js'])
    .pipe(concat('vendor.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/'));
});

gulp.task('buildApp', function() {
  gulp.src('./js/app/**/*.js')
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/'));
});

gulp.task('buildCss', function() {
  gulp.src('./css/**/*.css')
    .pipe(concat('styles.css'))
    .pipe(minifyCss())
    .pipe(gulp.dest('./dist/'));
});

gulp.task('build', ['buildCss', 'buildVendor', 'buildApp']);

gulp.task('watch', function() {
  gulp.watch(['./js/app/**/*.js', './js/tests/**/*.js', './css/**/*.css'], ['test', 'build']);
});

gulp.task('default', ['test', 'build', 'watch']);