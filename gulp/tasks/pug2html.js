const gulp = require('gulp');
const gulpIf = require('gulp-if');
const plumber = require('gulp-plumber');
const pug = require('gulp-pug');
const pugLinter = require('gulp-pug-linter');
const { htmlValidator } = require('gulp-w3c-html-validator');
const bemValidator = require('gulp-html-bem-validator');
const config = require('../config');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = function pug2html() {
    return gulp
        .src(config.src + '/pages/*.pug')
        .pipe(plumber())
        .pipe(pugLinter({ reporter: 'default' }))
        .pipe(pug({ pretty: config.pug2html.beautifyHtml }))
        .pipe(gulpIf(isProduction, htmlValidator.analyzer({ ignoreMessages: /^Duplicate ID/ })))
        .pipe(gulpIf(isProduction, htmlValidator.reporter()))
        .pipe(bemValidator())
        .pipe(gulp.dest(config.buildPath));
};
