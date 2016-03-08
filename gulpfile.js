var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var cleanCSS = require('gulp-clean-css');
var spriter = require('gulp-css-spriter');
var sourcemaps = require('gulp-sourcemaps');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
//var mainBowerFiles = require('main-bower-files');
var nodemon = require('gulp-nodemon');
var livereload = require('gulp-livereload');
var clean = require('gulp-clean');

//样式处理：将sass文件编译成css进行合并压缩
gulp.task('css', function() {
    return gulp.src('./static/src/sass/*.scss')
        //.pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./static/src/css/'))
        .pipe(concat('eux.all.css'))
        .pipe(gulp.dest('./static/src/css/'))
        .pipe(gulp.dest('./static/dist/css/'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(cleanCSS())
        //.pipe(sourcemaps.write())
        .pipe(gulp.dest('./static/dist/css/'))
        .pipe(livereload());
});

//图片处理：图片无损压缩，jpg有损，雪碧图在样式处理中已包含
gulp.task('img', function() {
    return gulp.src('./static/src/img/**/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('./static/dist/img/'))
        .pipe(livereload());
});

//js处理：语法检测、合并压缩
gulp.task('js', function() {
    return gulp.src('./static/src/js/**/*.js')
       // .pipe(jshint())
       // .pipe(jshint.reporter('default'))
        .pipe(sourcemaps.init())
        //.pipe(concat('eux.main.js'))  //无奈之举啊，这个concat不强大。。。
        //.pipe(gulp.dest('./static/dist/js'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest('./static/dist/js/'))
        .pipe(livereload());
});

gulp.task('js-concat',['js'], function() {
    return gulp.src('./static/src/js/common/*.js')
        .pipe(concat('eux.main.js'))
        .pipe(gulp.dest('./static/dist/js/common/'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest('./static/dist/js/common/'))
        .pipe(livereload());
});

//bower看来只能手动了，因为各个包的main不是很准确，而且不能统一地进行压缩处理。。。
////bower文件拷贝
//gulp.task('bower', function() {
//    console.log(mainBowerFiles());
//    return gulp.src(mainBowerFiles())
//        .pipe(rename({ suffix: '.min' }))
//        .pipe(uglify())
//        .pipe(gulp.dest('./static/dist/lib'))
//        .pipe(livereload());
//});

//启动node服务器
gulp.task('start', function () {
    nodemon({
        script: 'server.js'
        , ext: 'js html'
        , env: { 'NODE_ENV': 'development' }
    })
});

//监听任务
gulp.task('watch', function() {
    livereload.listen();

    gulp.watch('./static/src/sass/*.scss', function () {
        gulp.run('css');
        console.log('task css run...');
    });

    gulp.watch('./static/src/js/**/*.js', function () {
       // gulp.run('js');
        gulp.run('js-concat');
        console.log('task js run...');
    });

    gulp.watch('./static/src/img/**/*', function () {
        gulp.run('img');
        console.log('task img run...');
    });

    //gulp.watch('./static/lib/*', function () {
    //    gulp.run('bower');
    //    console.log('task bower run...');
    //});

});

// 清空图片、样式、js
gulp.task('clean', function() {
    gulp.src(['./static/dist/css', './static/dist/js', './static/dist/img'], {read: false})
        .pipe(clean());
});


gulp.task('default', ['clean'], function() {
    gulp.start('css','img','js-concat','start');
});

