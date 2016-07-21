'use strict';

var gulp=require('gulp');
var autoprefixer=require('gulp-autoprefixer');
var csslint = require('gulp-csslint');
var jslint = require('gulp-jslint');
//var imagemin = require('gulp-imagemin');
var concat=require('gulp-concat');
var sourcemaps=require('gulp-sourcemaps');
var gulpIf=require('gulp-if');
var newer=require('gulp-newer');

var isDevelopment=process.env.NODE_ENV || process.env.NODE_ENV == 'development';

gulp.task('styles',function () {
    return gulp.src('public/stylesheets/style.css',{base: 'public'})
        .pipe(gulpIf(isDevelopment,sourcemaps.init()))
        .pipe(autoprefixer({browsers:['last 3 versions', 'iOS >=7', 'last 3 safari versions']}))
        .pipe(gulpIf(isDevelopment,sourcemaps.write('.')))
        .pipe(gulp.dest('public'));
});

//javascripts
gulp.task('javascripts',function () {
    var processors=[
    ];
    return gulp.src('dev/js/main.js',{base: 'dev'})
        // .pipe(postcss(processors))
        .pipe(gulp.dest('public'));
});
// images
// gulp.task('images', function() {
//     return gulp.src('dev/i/**/*')
//         .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
//         .pipe(gulp.dest('dist/images'))
//         .pipe(notify({ message: 'Images task complete' }));
// });

gulp.task('assets',function () {
   return gulp.src('dev/assets/**')
       .pipe(newer('dev'))
       .pipe(gulp.dest('public'));
});

gulp.task('watch', function() {
    gulp.watch('dev/styles/style.css',function () {
        gulp.run('styles')
    });
});

// Отслеживание
gulp.task('watch', function() {

    // Отслеживание файлов .css
    gulp.watch('public/stylesheets/**/*.css', ['styles']);

    // Отслеживание файлов .js
    gulp.watch(['dev/js/**/*.js','main.js'], ['javascripts']);

    // Отслеживание файлов assets
    gulp.watch('dev/assets/**', ['assets']);

    // Отслеживание всех файлов в папке dev/, перезагрузка при изменении
    gulp.watch("dev/*.html");

});

gulp.task('default', ['styles', /*'images',*/ 'javascripts', 'assets', 'watch']);
//gulp.task('build', gulp.series(gulp.parallel('styles','assets')));