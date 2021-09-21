const gulp = require('gulp');
const svgStore = require('gulp-svgstore');
const rename = require('gulp-rename');
const config = require('../config');

module.exports = function svgSprite() {
    return gulp
        .src(config.src + '/img/sprite/*.svg')
        .pipe(
            svgStore({
                inlineSvg: true
            })
        )
        .pipe(rename('sprite.svg'))
        .pipe(gulp.dest(config.buildPath + '/img'));
};
