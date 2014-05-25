var gulp = require('gulp');
var cssmin = require('gulp-cssmin');

gulp.task('default', function () {
    gulp.src('build/**/*.css')
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('build/css'));
});
