const CURRENT_PATH = 'src';
const HTML_SRC = CURRENT_PATH + '/html';
const STYLE_PATH = CURRENT_PATH + '/style';
const JS_PATH = CURRENT_PATH + '/js';

const BUILD_PATH = 'build';
const BUILD_CSS = BUILD_PATH + '/assets/css';
const BUILD_JS = BUILD_PATH + '/assets/js';

const { watch, series, src, dest, parallel } = require('gulp');

const pug = require('gulp-pug');

const sass = require('gulp-sass');
sass.compiler = require('node-sass');

const minifyCSS = require('gulp-csso');

// const uglify = require('gulp-uglify');
// const concat = require('gulp-concat');

function html() {
    return src(HTML_SRC + '/*.html')
        .pipe(pug())
        .pipe(dest(BUILD_PATH + '/'))
}

function scss() {
    return src(STYLE_PATH + '/scss/*.scss')
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(dest(BUILD_CSS))
}

function moveCss() {
    return src(STYLE_PATH + '/*.css')
        .pipe(minifyCSS())
        .pipe(dest(BUILD_CSS))
}


function js() {
    return src(JS_PATH + '/*.js')
        // .pipe(concat())
        .pipe(dest(BUILD_JS))
}

function clean(cb) {
    // body omitted
    cb();
}

exports.js = js;
exports.scss = scss;
exports.moveCss = moveCss;
exports.html = html;

exports.build = series(
    clean,
    parallel(
        html,
        scss,
        moveCss,
        js
    )
);

exports.watch = function () {
    watch(HTML_SRC + '/*.html', { queue: false }, html);
    watch(STYLE_PATH + '/scss/*.scss', { queue: false }, scss);
    watch(JS_PATH + '/*.js', { queue: false }, js);
};