var gulp = require('gulp'),
    gutil = require('gulp-util'),
    less = require('gulp-less'),
    connect = require('gulp-connect'),
    watch = require('gulp-watch'),
    plugins = require('gulp-load-plugins')({
      rename: {
        'gulp-jshint': 'jshint'
      }
    });

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

// Minify jQuery Plugins: Run manually with: "gulp squish-jquery"
gulp.task('squish-jquery', function () {
    return gulp.src('js/prefab/libs/**/*.js')
        .pipe(plugins.uglify({
            output: {
                'ascii_only': true
            }
        }))
        .pipe(plugins.concat('jquery.plugins.min.js'))
        .pipe(gulp.dest('js'));
});

// Minify Custom JS: Run manually with: "gulp build-js"
gulp.task('build-js', function () {
    return gulp.src('js/prefab/*.js')
        .pipe(plugins.jshint())
        .pipe(plugins.jshint.reporter('jshint-stylish'))
        .pipe(plugins.uglify({
            output: {
                'ascii_only': true
            }
        }))
        .pipe(plugins.concat('scripts.min.js'))
        .pipe(gulp.dest('js'));
});

gulp.task('less', function() {
  gulp.src('css/prefab/style.less')
    .pipe(less())
    .pipe(gulp.dest('css'));
});

gulp.task('watch', function() {
  gulp.watch('css/prefab/*.less', ['less']);
  gulp.watch('js/prefab/*.js', ['build-js']);
  gulp.watch('js/prefab/libs/**/*.js',['squish-jquery']);
})

gulp.task('default', ['less', 'build-js', 'squish-jquery', 'webserver', 'livereload', 'watch']);
