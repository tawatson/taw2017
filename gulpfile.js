var gulp = require('gulp'),
  connect = require('gulp-connect'),
  watch = require('gulp-watch'),
  less = require('gulp-less');

gulp.task('webserver', function() {
  connect.server({
    livereload: true,
    root: ['.']
  });
});

gulp.task('livereload', function() {
  gulp.src(['css/*.css', 'js/*.js'])
    .pipe(watch(['css/*.css', 'js/*.js','index.html']))
    .pipe(connect.reload());
});

gulp.task('less', function() {
  gulp.src('css/prefab/style.less')
    .pipe(less())
    .pipe(gulp.dest('css'));
});

gulp.task('watch', function() {
  gulp.watch('css/prefab/*.less', ['less']);
})

gulp.task('default', ['less', 'webserver', 'livereload', 'watch']);
