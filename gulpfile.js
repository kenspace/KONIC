var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    del = require('del'),
    cleancss = require('gulp-clean-css'),
    imagemin = require('gulp-imagemin'),
    pngcrush = require('imagemin-pngcrush'),
    gulpSequence = require('gulp-sequence'),
    rev = require('gulp-rev'),
    revCollector = require('gulp-rev-collector'),
    jshint = require('gulp-jshint');

// 清除文件
gulp.task('clean', function () {
    return del([
        'dest'
    ])
});

// JS代码校验
gulp.task('lint', function () {
    gulp.src('www/js/**/*.js')  // 检查文件：js目录下所有的js文件
        .pipe(jshint())       // 进行检查
        .pipe(jshint.reporter('default'));  // 对代码进行报错提示
});

// 复制字体文件
gulp.task('copy-fonts', function () {
    return gulp.src('www/lib/ionic/fonts/**/*')
        .pipe(gulp.dest('dest/fonts'))
});

// 复制模板文件
gulp.task('copy-templates', function () {
    return gulp.src('www/templates/**/*')
        .pipe(gulp.dest('dest/templates'))
});

// 复制压缩index
gulp.task('copy-static', function () {
    return gulp.src('static/**/*')
        .pipe(gulp.dest('dest/'))
});

// 复制图片文件
gulp.task('copy-images', function () {
    return gulp.src('www/img/**/*')
        .pipe(gulp.dest('dest/img'))
});

// 压缩图片
gulp.task('minify-img', function () {
    return gulp.src('www/img/**/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngcrush()]
        }))
        .pipe(gulp.dest('./dest/img'));
});

// 合并、压缩、重命名css
gulp.task('minify-css', function () {
    return gulp.src(['www/lib/**/*.min.css', 'www/css/*.css'])
        .pipe(concat('style.css'))
        .pipe(cleancss())
        .pipe(rename({suffix: '.min'}))
        .pipe(rev())
        .pipe(gulp.dest('dest/css'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('rev/css'));
});

// 压缩、重命名手写js
gulp.task('minify-js', function () {
    return gulp.src([
        'www/js/**/*.js'
    ])
        .pipe(concat('script.js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('dest/js'));
});

// 连接手写js跟模板js
gulp.task('concat-js', function () {
    return gulp.src([
        'www/lib/ionic/js/ionic.bundle.min.js',
        'dest/js/script.min.js'
    ])
        .pipe(concat('script.js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(rev())
        .pipe(gulp.dest('dest/js'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('rev/js'));
});

gulp.task('rev', function () {
    return gulp.src(['rev/**/*.json', 'dest/index.html'])
        .pipe(revCollector({
            replaceReved: true,
            /*
             dirReplacements: {
             'css': 'css',
             '/js/': 'js'
             }
             */
        }))
        .pipe(gulp.dest('dest'));
});

// 清除文件
gulp.task('clean-temp', function () {
    return del([
        'rev',
        'dest/js/script.min.js'
    ])
});


// 默认任务
gulp.task('build', function (callback) {
    gulpSequence(
        'clean',
        'lint',
        [
            'copy-fonts',
            'copy-templates',
            'copy-static'
        ],
        [
            'minify-img',
            'minify-css',
            'minify-js'
        ],
        'concat-js',
        'rev',
        'clean-temp',
        callback
    );
});

gulp.task('default', function (callback) {
    gulpSequence(
        'clean',
        'lint',
        [
            'copy-fonts',
            'copy-templates',
            'copy-images',
            'copy-static'
        ],
        [
            'minify-css',
            'minify-js'
        ],
        'concat-js',
        'rev',
        'clean-temp',
        callback
    );
});
