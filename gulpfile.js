const { src, dest, series, parallel, watch } = require("gulp");
const concat = require("gulp-concat");
const terser = require("gulp-terser");
const cleanCSS = require("gulp-clean-css");
const imageMin = require("gulp-imagemin");
const browserSync = require("browser-sync").create();

const files = { // object containing source file directories
    htmlPath: "src/*.html",
    cssPath: "src/css/*.css",
    jsPath: "src/js/*.js",
    imgPath: "src/img/*"
}

function copyHTML() {
    return src(files.htmlPath)
        .pipe(dest('pub') // copy source html files to publishing folder
    );
}

function cssTask() {
    return src(files.cssPath)
        .pipe(concat('styles.css')) // concatenate all css files into styles.css
        .pipe(cleanCSS()) // minify css
        .pipe(dest('pub/css') // send concatenated file to publishing css folder
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
            baseDir: "pub/" // serve files from pub folder
        },
        injectChanges: false // fixes browsersync reload for css
    });
}

function watchTask() {
    watch(
        [files.htmlPath, files.cssPath, files.jsPath, files.imgPath], // watch for modifications in html, css and javascript files
        parallel(copyHTML, cssTask, jsTask, imgTask) // run tasks in event of modification 
    ).on('change', browserSync.reload); // reload browser after tasks
}

exports.default = series(
    parallel( // export file modification tasks in parallel
        copyHTML,
        cssTask,
        jsTask,
        imgTask
    ),
    parallel (
        startServer, // export server starting task
        watchTask // export watch task
    )
);