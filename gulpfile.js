const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const uglify = require('gulp-uglify');
const obfuscate = require('gulp-obfuscate');
const imagemin = require('gulp-imagemin');

function compilaSass() {
    return gulp.src('./src/sass/**/*.scss')
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(gulp.dest('./dist/css'));
}
function compilaJs() {
    return gulp.src('./src/js/**/*.js')
        .pipe(uglify())
        .pipe(obfuscate())
        .pipe(gulp.dest('./dist/js'));
}
function compilaImg() {
    return gulp.src('./src/img/**/*', { encoding: false })
        .pipe(imagemin()) 
        .pipe(gulp.dest('./dist/img'));
}
function watchFiles() {
    gulp.watch('./src/sass/**/*.scss', compilaSass);
    gulp.watch('./src/js/**/*.js', compilaJs);
    gulp.watch('./src/img/**/*', compilaImg);
}

exports.default = gulp.series(compilaSass, compilaJs, compilaImg,watchFiles);