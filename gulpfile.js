const gulp = require('gulp');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const sync = require('browser-sync').create();
const pug = require('gulp-pug');   
const concatCss = require('gulp-concat-css');                                                  

// gulp.task('write', function(cb){
//     console.log('Hola');
//     cb();
// });

// gulp.task('sass', function(cb) {
//     gulp.src('./sass/style.sass')
//     .pipe(sourcemaps.init())
//     .pipe(sass({outputStyle: 'compressed'}).on('error', function(error) {
//         console.log('error')
//     }))
//     .pipe(autoprefixer({
//         cascade: false
//     }))
//     .pipe(rename({suffix: '.min'}))
//     .pipe(sourcemaps.write('./'))
//     .pipe(gulp.dest('./css'))

//     cb();
// });

gulp.task('watchSass', function(){
    gulp.watch('sass/**/*.sass', function(cb){  
        gulp.src('sass/**/*.sass')
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', function(error) {
            console.log('error')
        }))
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('common.blocks'))
    
        cb();
    })
});

gulp.task('watchPug', function(){
    gulp.watch('pug/*.pug', function(){
        return gulp.src('pug/*.pug')
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('./'))
    })
});

gulp.task('watchAndConcatCss', function () {
    gulp.watch('common.blocks/**/*.css', function(){
        return gulp.src('common.blocks/**/*.css')
        .pipe(concatCss("style.min.css"))
        .pipe(gulp.dest('css/'));
    })
  });

gulp.task('browserSync', function(){
    sync.init({
        server: {
            baseDir: './'
        }
    });
    sync.watch('**/*', sync.reload)
});

gulp.task('default', gulp.parallel('watchSass', 'watchPug', 'watchAndConcatCss', 'browserSync'))

