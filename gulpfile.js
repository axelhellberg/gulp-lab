const { src, dest, series, parallel, watch } = require('gulp');
const concat = require('gulp-concat');
const terser = require('gulp-terser');
const cleanCSS = require('gulp-clean-css');
const imageMin = require('gulp-imagemin');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');

sass.compiler = require('node-sass');

const files = { // object containing source file directories
    htmlPath: 'src/*.html',
    sassPath: 'src/css/*.scss',
    jsPath: 'src/js/*.js',
    imgPath: 'src/img/*'
}

function copyHTML() {
    return src(files.htmlPath)
        .pipe(dest('pub') // copy source html files to publishing folder
    );
}

function sassTask() {
    return src(files.sassPath)
        .pipe(sass().on('error', sass.logError)) // convert sass to css and show error
        .pipe(concat('styles.css')) // concatenate css files
        .pipe(cleanCSS()) // minify css
        .pipe(dest('pub/css') // send css file to publishing folder
    );
}

function jsTask() {
    return src(files.jsPath)
        .pipe(concat('main.js')) // concatenate all js files into main.js
        .pipe(terser()) // minify javascript
        .pipe(dest('pub/js') // send concatenated file to publishing js folder
    );
}

function imgTask() {
    return src(files.imgPath)
        .pipe(imageMin()) // minify images
        .pipe(dest('pub/img') // send images to publishing image folder
    );
}

function startServer() {
    browserSync.init({
        server: {
            baseDir: 'pub/' // serve files from pub folder
        },
        injectChanges: false // fixes browsersync reload for css
    });
}

function watchTask() {
    watch(
        [files.htmlPath, files.sassPath, files.jsPath, files.imgPath], // watch for modifications in html, css and javascript files
        parallel(copyHTML, jsTask, imgTask, sassTask) // run tasks in event of modification 
    ).on('change', browserSync.reload); // reload browser after tasks
}

exports.default = series(
    parallel( // export file modification tasks in parallel
        copyHTML,
        jsTask,
        imgTask,
        sassTask
    ),
    parallel (
        startServer, // export server starting task
        watchTask // export watch task
    )
);