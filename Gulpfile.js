const { src, dest, series, watch } = require('gulp');

// styles
const sass = require('gulp-sass')(require('sass'));
const autoPrefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const cache = require('gulp-cached');
const dependents = require('gulp-dependents');
const size = require('gulp-size');

function stylesTask() {
  const stylesSource = './sass/**/*.scss';
  // const stylesDest1 = './css/';
  const stylesDest2 = './docs/_includes/';

  // const sizefull = size({ showFiles: true, uncompressed: true });
  const sizegzip = size({ showFiles: true, gzip: true });

  return src(stylesSource)
    .pipe(cache('sasscache'))
    .pipe(dependents())
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(autoPrefixer({ grid: false }))
    .pipe(cleanCSS({ format: 'compress' }))
    .pipe(sizegzip)
    // .pipe(sizefull)
    .pipe(sourcemaps.write())
    // .pipe(dest(stylesDest1))
    .pipe(dest(stylesDest2));
}

// watch
function watchTask() {
  watch(['./sass/**/*.scss'], series(stylesTask))
}

exports.default = series(stylesTask, watchTask);