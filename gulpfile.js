var browserSync = require('browser-sync');
var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('browserSync', function () {
    browserSync.init({
        server: { baseDir: './' },
        port: 5000,
        ui: { port: 5001 },
        ghostMode: { links: false }
    });
});

gulp.task('watch', ['browserSync'], function () {
    gulp.watch(['./*.css']).on('change', function (e) {
        console.log('File ' + e.path + ' has been changed. Updating..');
        browserSync.stream()
    });
    gulp.watch(['./app/**/*', './script.js', './*.html']).on('change', function (e) {
        console.log('File ' + e.path + ' has been changed. Updating..');
        browserSync.reload()
    })
});
gulp.task('serve' , function (cb) {
    runSequence('browserSync', 'watch', cb);
});
