//START GULP
//Diretorio DEV  : ./src
//Diretorio PROD : /assets

'use strict';
var gulp, path, sass, cssnano, sourcemaps, concat, uglify, browserSync, browsersup, gutil, imagemin, spritesmith, changed, gulpif, sprity, svgo, svgstore, rename;

//Diretorios
path = {
    dev: './_src',
    prod: './assets',
    proxy: 'http://projetos.franqueados'
}

var buildpath = './assets';

//Carregamento de modulos
gulp = require('gulp');
gutil = require('gulp-util');
browserSync = require('browser-sync').create();
sass = require('gulp-sass');
uglify = require('gulp-uglify');
imagemin = require('gulp-imagemin');
svgstore = require('gulp-svgstore');
rename = require('gulp-rename');
svgo = require('gulp-svgo');
sprity = require('sprity');
spritesmith = require("gulp-spritesmith");
changed = require('gulp-changed');
gulpif = require("gulp-if");
sourcemaps = require('gulp-sourcemaps');
concat = require('gulp-concat');
cssnano = require('gulp-cssnano');
browsersup = [
    'Android >= 2.3',
    'BlackBerry >= 7',
    'Chrome >= 9',
    'Firefox >= 4',
    'Explorer >= 9',
    'iOS >= 5',
    'Opera >= 11',
    'Safari >= 5',
    'ChromeAndroid >= 9',
    'FirefoxAndroid >= 4',
    'ExplorerMobile >= 9'
];

// ================================================
// TASKS
// ================================================

//BrowserSync
gulp.task('sinc', function() {
    browserSync.init({
        //server: {
        //baseDir: "./"
        //},
        proxy: path.proxy,
        options: {
            reloadDelay: 250
        },
        notify: true,
    });
});

//Compila arquivos scss/sass para css
gulp.task('sass', function() {
    return setTimeout(function() {
        return gulp.src(path.dev + '/scss/main.scss')
            //local do arquivo SCSS do ambiente de desenvolvimento e suas subpastas
            .pipe(sass({
                sourcemap: true,
                outputStyle: 'expanded',
                includePaths: [
                    path.dev + '/scss/**/*'
                ]

            }))
            .pipe(cssnano({ autoprefixer: { browsers: browsersup, add: true } }))
            .pipe(sourcemaps.write())
            //nome do arquivo css finalizado
            .pipe(concat('main.min.css'))
            //local para salvar o CSS final
            .pipe(gulp.dest(path.prod + '/css'))
            //notifica o browserSync para atualizar
            .pipe(browserSync.reload({ stream: true }));

    }, 500);
    //Arquivo SCSS principal que deve importar todos os outros
});

gulp.task('svgo', function() {
    return gulp.src(path.dev + '/icons/*.svg')
        .pipe(svgo())
        .pipe(gulp.dest(path.prod + '/icons'));
});

gulp.task('svgstore', ['svgo'], function() {
    return gulp
        .src(path.dev + '/icons/*.svg')
        .pipe(rename({
            prefix: 'icon-'
        }))
        .pipe(svgstore())
        .pipe(gulp.dest(path.prod + '/icons'));
});

//compiling our Javascripts
gulp.task('scripts', function() {
    //this is where our dev JS scripts are
    return gulp.src(['!' + path.dev + '/js/_excludes/**/*.js', path.dev + '/js/_includes/**/*.js', path.dev + '/js/*.js'])
        //this is the filename of the compressed version of our JS
        .pipe(concat('main.min.js'))
        //compress :D
        .pipe(uglify())
        //where we will store our finalized, compressed script
        .pipe(gulp.dest(path.prod + '/js'))
        //notify browserSync to refresh
        .pipe(browserSync.reload({ stream: true }));
});

//Gerador de Sprites
gulp.task('sprites', function() {
    return gulp.src(path.dev + '/sprites/*')
        .pipe(spritesmith({
            imgName: 'sprite.png',
            styleName: '_sprite.scss',
            imgPath: '../images/sprite.png',
        }))
        .pipe(gulpif('*.png', gulp.dest(path.prod + '/images')))
        .pipe(gulpif('_sprite.scss', gulp.dest(path.dev + '/scss/modulos')));
});

//Imagens minificadas
gulp.task('images', function() {
    return gulp.src(path.dev + '/images/*')
        .pipe(changed(path.prod + '/images')).pipe(
            imagemin({
                optimizationLevel: 5,
                progressive: true,
                interlaced: true,
                svgoPlugins: [{ removeViewBox: false }]
            }))
        .pipe(gulp.dest(path.prod + '/images'));
});


//Copia as fonts para o diretorio prod
gulp.task('fonts', function() {
    return gulp.src(path.dev + '/fonts/**/*')
        .pipe(gulp.dest(path.prod + '/fonts'));
});

//Task default
gulp.task('default', ['sinc', 'scripts', 'images', 'sass'], function() {
    gulp.watch(path.dev + '/scss/**/*.scss', ['sass']);
    gulp.watch(path.dev + '/js/*.js', ['scripts']);
    gulp.watch(path.dev + '/icons/*.svg', ['svgstore']);
    gulp.watch(path.dev + '/images/*', ['images']);
    gulp.watch('*.php').on('change', browserSync.reload);
});