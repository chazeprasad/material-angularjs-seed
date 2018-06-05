var browserSync = require('browser-sync');
var gulp = require('gulp');
var runSequence = require('run-sequence');
var del = require('del');

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
gulp.task('serve', ['clean'], function (cb) {
    runSequence('browserSync', 'watch', cb);
});

gulp.task('build', ['clean'], function (cb) {
    gulp.src('./app/**/*')
        .pipe(gulp.dest('./dist/app'));
    gulp.src('./script.js')
        .pipe(gulp.dest('./dist'));
    gulp.src('./style.css')
        .pipe(gulp.dest('./dist'));
    gulp.src('./index.html')
        .pipe(gulp.dest('./dist'));
    gulp.src('./vendor/**/*')
        .pipe(gulp.dest('./dist/vendor'));
        
});

gulp.task('clean', function () {
    return del(['./dist']);
});

