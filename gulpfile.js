var gulp = require('gulp');

var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var nodemon = require('gulp-nodemon');

// LINT JS
gulp.task('lint', function() {
  return gulp.src('public/js/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// COMPILE & CONCAT SASS
gulp.task('sass', function() {
  return gulp.src('public/scss/**/*.scss')
    .pipe(sass({ sourceComments: 'map' }))
    .pipe(concat('styles.css'))
    .pipe(gulp.dest('public/dist/css'));
});

// CONCAT & MINIFY FRONT-END JS
gulp.task('scripts', function() {
  return gulp.src('public/js/**/*.js')
    .pipe(concat('all.js'))
    .pipe(gulp.dest('public/dist/js'))
    .pipe(rename('all.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('public/dist/js'));
});

// LINT & RESTART BACK-END JS
gulp.task('server', function() {
  nodemon({
    script: 'app.js',
    ext: 'js',
    ignore: ['public/**/*', './gulpfile.js', './node_modules/**/*']
  });
});

// WATCH
gulp.task('watch', function() {
  gulp.watch('public/js/**/*.js', ['lint', 'scripts']);
  gulp.watch('public/scss/**/*.scss', ['sass']);
});

// DEFAULT
gulp.task('default', ['lint', 'sass', 'scripts', 'server', 'watch']);