'use strict'
const gulp = require('gulp');
const babel = require('gulp-babel');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const combine = require('gulp-scss-combine');
const autoprefixer = require('gulp-autoprefixer');
const cssImport = require('gulp-cssimport');
const browserSync = require('browser-sync').create();

sass.compiler = require('node-sass');

gulp.task('scss', function () {
  return gulp.src('./scss/**/*.scss')
        .pipe(cssImport())
        .pipe(combine())
        .pipe(concat('style.scss'))
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(autoprefixer({
          browsers: ['last 3 versions'],
        }))
        .pipe(gulp.dest('./css'))
        .pipe(browserSync.reload({
          stream: true
        }))
});


gulp.task('js', function () {
    return gulp.src('./es6/**/*.js')
        .pipe(babel())
        .pipe(gulp.dest("js"))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('default', function(done) {
  browserSync.init({
    server: {
        baseDir: './'
    }
  });

  gulp.watch('./scss/**/*.scss', gulp.series('scss'));
  gulp.watch('./es6/**/*.js', gulp.series('js'));
  gulp.watch('./*.html').on('change', browserSync.reload);
    done();
});