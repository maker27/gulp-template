const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const config = require('../config');

module.exports = function imageMinify() {
    return gulp
        .src(config.src + '/img/*.{gif,png,jpg,svg,webp}')
        .pipe(
            imagemin([
                imagemin.gifsicle({ interlaced: true }),
                imagemin.mozjpeg({
                    quality: 75,
                    progressive: true
                }),
                imagemin.optipng({ optimizationLevel: 5 }),
                imagemin.svgo({
                    plugins: [{ removeViewBox: true }, { cleanupIDs: false }]
                })
            ])
        )
        .pipe(gulp.dest(config.buildPath + '/img'));
};
