const gulp = require('gulp');

const imageMinify = require('./imageMinify');
const svgSprite = require('./svgSprite');
const styles = require('./styles');
const pug2html = require('./pug2html');
const script = require('./script');
const config = require('../config');

const server = require('browser-sync').create();

function readyReload(cb) {
    server.reload();
    cb();
}

module.exports = function serve(cb) {
    server.init({
        server: config.buildPath,
        notify: false,
        open: true,
        cors: true
    });

    gulp.watch(config.src + '/img/*.{gif,png,jpg,svg,webp}', gulp.series(imageMinify, readyReload));
    gulp.watch(config.src + '/img/sprite/*.svg', gulp.series(svgSprite, readyReload));
    gulp.watch(
        config.src + '/styles/**/*.scss',
        gulp.series(styles, cb =>
            gulp
                .src(config.buildPath + '/css')
                .pipe(server.stream())
                .on('end', cb)
        )
    );
    gulp.watch(config.src + '/js/**/*.js', gulp.series(script, readyReload));
    gulp.watch(config.src + '/pages/**/*.pug', gulp.series(pug2html, readyReload));

    return cb();
};
