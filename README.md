# eux
eux study project, welcome to join us!

gulpbug修复
```
// 在clean的task回调函数中加一个return，返回数据流对象
gulp.task('clean', function() {
    return gulp.src(['./static/dist/css', './static/dist/js', './static/dist/img'], {read: false})
        .pipe(clean());
});
```
