const gulp = require('gulp')
const sass = require('gulp-sass')
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const pump = require('pump');
 
gulp.task('js-compress',  (cb) => {
  pump([
        gulp.src('./assets/js/*.js'),
        uglify(),
        gulp.dest('./dist/js')
    ],
    cb
  );
});



gulp.task('image-optimize', () =>
    gulp.src('./assets/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/images'))
);


gulp.task('sass', () => {
 	return gulp.src('./assets/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/css/css/'));

});

gulp.task('sass-compress', () => {
 return gulp.src('./assets/sass/**/*.scss')
   .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
   .pipe(gulp.dest('./dist/css/minify'));
});

gulp.task('watch', () => {
   gulp.watch(['./assets/js/**/*.js'],['js-compress']); 
    gulp.watch(['./assets/images/*.*'],['image-optimize']);
	 gulp.watch(['./assets/sass/**/*.scss'], ['sass']);
      gulp.watch(['./assets/sass/**/*.scss'], ['sass-compress']);
})


gulp.task('default', () =>  {
	gulp.start('js-compress','image-optimize','sass','sass-compress','watch');
});
