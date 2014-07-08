'use strict';
var gulp            = require('gulp'),
    browserSync     = require('browser-sync'),
    wiredep         = require('wiredep').stream,
    prefix          = require('gulp-autoprefixer'),
    sass            = require('gulp-ruby-sass'),
    spritesmith     = require('gulp.spritesmith'),
    rename          = require('gulp-rename'),
    imagemin        = require('gulp-imagemin');

gulp.task('sprite', function() {
    var spriteData = gulp.src('app/img/sprites/*.png').pipe(spritesmith({
        imgName: 'sprites.png',
        padding: 15,
        algorithm: 'binary-tree',
        cssName: '_sprite.scss',
        cssFormat: 'scss'
        
    }));
    spriteData.img.pipe(gulp.dest('app/img'));
    spriteData.css.pipe(gulp.dest('app/sass/core'));
    
});

gulp.task('browser-sync', function() {
    browserSync.init(['app/*html', 'app/css/*.css', 'app/js/main.js'], {
        server: {
            baseDir: 'app/'
        }
    });
});

gulp.task('sass', function() {
    gulp.src('app/sass/main.scss')
        .pipe(sass({
            style: 'expended',
            sourcemap: true
        }).on('error', function(er){
                console.log(er.message);
            }))
        .pipe(gulp.dest('app/css'));
});

gulp.task('wiredep', function() {
    gulp.src('app/*.html')
        .pipe(wiredep({
            directory: 'app/js/vendor',
        }))
        .pipe(gulp.dest('app'));
});

gulp.task('autoprefixer', function() {
    gulp.src('app/css/main.css')
        .pipe(prefix('last 2 version', 'ie >= 8', {
            cascade: true
        }))
        .pipe(gulp.dest('app/css'));
});

gulp.task('imagemin', function() {
    return gulp.src('app/img/*')
        .pipe(imagemin({
            progressive: true
        }))
        .pipe(gulp.dest('app/img'));
});

gulp.task('default', ['sass', 'browser-sync'], function() {
    gulp.watch('app/sass/**/*.scss', ['sass']);
    
});