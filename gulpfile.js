const gulp = require('gulp');
const babel = require('gulp-babel');
const eslint = require('gulp-eslint');
const uglify = require('gulp-uglify');

gulp.task('lint', () => {
  return gulp.src(['src/*.js','!node_modules/**'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('build', () => {
  return gulp.src('src/viewability-helper.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(uglify({preserveComments:'license'}))
    .pipe(gulp.dest('dist'));
});

gulp.task('default', ['lint','build']);