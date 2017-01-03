const
    gulp = require('gulp')
    , sass = require('gulp-sass');

gulp.task('sass', () => {
    return gulp.src('./sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./public/css'));
});

gulp.task('sass:watch', ['sass'], () => {
    gulp.watch('./sass/**/*.scss', ['sass']);
});