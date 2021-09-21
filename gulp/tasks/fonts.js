const gulp = require('gulp');
const fontgen = require('gulp-fontgen');
const config = require('../config');

module.exports = function fonts() {
    return gulp.src(config.src + '/fonts/*.ttf').pipe(
        fontgen({
            dest: config.buildPath + '/fonts/'
        })
    );
};
