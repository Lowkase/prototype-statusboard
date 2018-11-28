// PACKAGES
// --------------------------------------------------------------------------------
var browserSync = require('browser-sync').create();
var del = require('del');
var gulp  = require('gulp');
var imagemin = require('gulp-imagemin');
var livereload = require('gulp-livereload');
var minifycss = require('gulp-minify-css');
var sass = require('gulp-sass');
var runSequence = require('run-sequence');
var util = require('gulp-util');




// WATCH
// --------------------------------------------------------------------------------

// Sass
gulp.task('sass', function () {
  util.log('-- Sass precompiling');
  return gulp.src('./assets/styles/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./assets/styles'));
});


// Data
gulp.task('data', function () {
  util.log('-- Data changed');
});


// Scripts
gulp.task('scripts', function () {
  util.log('-- Scripts changed');
});


// Html
gulp.task('html', function () {
  util.log('-- Html changed');
});


// Gulp watch - With browser-sync
gulp.task('watch', ['sass'], function () {
    util.log('-- Init browser-sync');
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    util.log('-- Init watchers');

    // Sass / Css
    gulp.watch('./assets/styles/**/*.scss', ['sass']);
    gulp.watch("./assets/styles/style.css").on('change', browserSync.reload);
    
    // Data
    gulp.watch("./assets/data/**/*.js", ['data']).on('change', browserSync.reload);

    // Scripts
    gulp.watch("./assets/scripts/**/*.js", ['scripts']).on('change', browserSync.reload);

    // Html
    gulp.watch("index.html", ['html']).on('change', browserSync.reload);

});




// BUILD
// --------------------------------------------------------------------------------
gulp.task('buildClean', function () {
    util.log('-- Build - Cleaning');
    return del(['../dist/**/*'], {force:true});
});

// Data
gulp.task('buildData', function () {
    util.log('-- Build - Data');
    return gulp.src('./assets/data/**/*')
        .pipe(gulp.dest('../dist/assets/data'));
});

// Fonts
gulp.task('buildFonts', function () {
    util.log('-- Build - Fonts');
    return gulp.src('./assets/fonts/**/*')
        .pipe(gulp.dest('../dist/assets/fonts'));
});

// Images
gulp.task('buildImages', function () {
    util.log('-- Build - Images');
    return gulp.src('./assets/images/**/*')
        .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
        .pipe(gulp.dest('../dist/assets/images'));
});

// Libraries
gulp.task('buildLibraries', function () {
    util.log('-- Build - Libraries');
    return gulp.src('./assets/libraries/**/*')
        .pipe(gulp.dest('../dist/assets/libraries'));
});

// Scripts
gulp.task('buildScripts', function () {
    util.log('-- Build - Scripts');
    return gulp.src('./assets/scripts/**/*')
        .pipe(gulp.dest('../dist/assets/scripts'));
});

// Styles
gulp.task('buildStyles', function() {
    util.log('-- Build - Styles');
   return gulp.src('./assets/styles/style.css')
        .pipe(minifycss())
        .pipe(gulp.dest('../dist/assets/styles'));
});

// Index + Server + Support
gulp.task('buildRoot', function() {
    util.log('-- Build - Index');
    return gulp.src(['./index.html', './package.json', '/readme.md', './server.js'])
        .pipe(gulp.dest('../dist'));
});


// Gulp build
gulp.task('build', function(callback){
    util.log('-- Build - Starting'); 
    runSequence(['buildClean'], 'buildData', 'buildFonts', 'buildImages', 'buildLibraries', 'buildScripts', 'buildStyles', 'buildRoot', callback);
});




// WATCH - LIVERELOAD + SASS
// --------------------------------------------------------------------------------

// Sass - With livereload
//gulp.task('sass', function () {
//  util.log('-- Sass precompiling');
//  return gulp.src('./assets/styles/**/*.scss')
//    .pipe(sass().on('error', sass.logError))
//    .pipe(gulp.dest('./assets/styles'))
//    .pipe(livereload());
//});

// Gulp watch - With livereload
//gulp.task('watch', function(){ 
//    util.log('-- Init watchers');
//    livereload.listen();
//    gulp.watch('./assets/styles/**/*.scss', ['sass']);
//});