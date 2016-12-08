const gulp = require('gulp')
const sass = require('gulp-sass')
const imagemin = require('gulp-imagemin');

gulp.task('image-optimize', () =>
    gulp.src('./assets/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/images'))
);


gulp.task('sass', () => {
 	return gulp.src('./assets/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    //Compress Sass
    // .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('./dist/css/'));

});

gulp.task('sass-compress', function () {
 return gulp.src('./assets/sass/**/*.scss')
   .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
   .pipe(gulp.dest('./dist/compress'));
});

gulp.task('watch', () => {
    gulp.watch(['./assets/images/*'],['image-optimize'])
	 gulp.watch(['./assets/sass/**/*.scss'], ['sass']);
      gulp.watch(['./assets/sass/**/*.scss'], ['sass-compress']);
})


gulp.task('default', () =>  {
	gulp.start('watch');
});