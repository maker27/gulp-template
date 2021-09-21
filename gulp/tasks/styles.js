const gulp = require('gulp');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const shorthand = require('gulp-shorthand');
const autoprefixer = require('gulp-autoprefixer');
const gulpStylelint = require('gulp-stylelint');
const rename = require('gulp-rename');
const config = require('../config');

sass.compiler = require('node-sass');

module.exports = function styles() {
    return gulp
        .src(config.src + '/styles/style.scss')
        .pipe(plumber())
        .pipe(
            gulpStylelint({
                failAfterError: false,
                reporters: [
                    {
                        formatter: 'string',
                        console: true
                    }
                ]
            })
        )
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(
            autoprefixer({
                cascade: false
            })
        )
        .pipe(shorthand())
        .pipe(
            cleanCSS(
                {
                    debug: true,
                    compatibility: '*'
                },
                details => {
                    // noinspection JSUnresolvedVariable
                    console.log(
                        `${details.name}: Original size:${details.stats.originalSize} - Minified size: ${details.stats.minifiedSize}`
                    );
                }
            )
        )
        .pipe(sourcemaps.write())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(config.buildPath + '/css'));
};
