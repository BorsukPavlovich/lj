const gulp = require('gulp');
const babel = require('gulp-babel');

gulp.task('default', function(done) {
  gulp.src([
        "es6/**/*.js"
      ])
      .pipe(babel())
      .pipe(gulp.dest("dist"));

  gulp.src([
        "public/es6/**/*.js"
      ])
      .pipe(babel())
      .pipe(gulp.dest("public/dist"));

  done();
});