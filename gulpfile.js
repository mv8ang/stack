var
  gulp = require('gulp'),
  uglify = require('gulp-uglify'),
  prefix = require('gulp-autoprefixer'),
  htmlmin = require('gulp-htmlmin'),
  imagemin = require('gulp-imagemin'),
  livereload = require('gulp-livereload'),
  sass = require('gulp-sass'),
  plumber = require('gulp-plumber');

gulp.task('scripts', function(){
  gulp.src('dev/js/*.js')
    .pipe(plumber())
    .pipe(uglify())
    .pipe(gulp.dest('pub/js'))
});

gulp.task('styles', function(){
  gulp.src('dev/sass/*.{scss, sass}')
    .pipe(plumber())
    .pipe(sass({outputStyle: "expanded"}))
    .pipe(prefix())
    .pipe(gulp.dest('pub/css'))
    .pipe(livereload())
});

gulp.task('images', function(){
  gulp.src('dev/images/*.jpg')
    .pipe(imagemin())
    .pipe(gulp.dest('pub/img'))
});

gulp.task('html', function(){
  gulp.src('*.{html, htm}')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('pub'))
});

gulp.task('watch', function(){
  livereload.listen();
  gulp.watch('dev/js/*.js', ['scripts']);
  gulp.watch('dev/sass/*.{scss, sass}', ['styles']);
  gulp.watch('*.{html, htm}', ['html']);
  gulp.watch('dev/images/*.{png, jpg}', ['images']);
});

gulp.task('default', ['scripts', 'styles', 'images', 'html', 'watch']);
