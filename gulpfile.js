const gulp = require('gulp');
const babel = require('gulp-babel');
const eslint = require('gulp-eslint');
const uglify = require('gulp-uglify');
const browserify = require("browserify");
const babelify = require("babelify");

gulp.task('lint', () => {
  return gulp.src(['src/*.js','!node_modules/**'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('build', () => {
  browserify({ debug: true })
    .transform(babelify.configure({ presets: ["es2015", "stage-0"] }))
    .require("./src/viewability-helper.js", { entry: true })
    .bundle()
    .pipe(gulp.dest);
});

gulp.task('default', ['lint','build']);