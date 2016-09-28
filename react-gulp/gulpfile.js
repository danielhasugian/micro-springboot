var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');

//config as a function
var config = JSON.parse(require('fs').readFileSync('./package.json'));

var del = require('del');
//clean dist folder
gulp.task('clean', function() {
	console.log('Clean task running');
	return del([config.buildDestination+'/**/*'])
});

var webpack = require('webpack-stream');
var cleanDest = require('gulp-clean-dest');
//Pack react js files into index.min.js
gulp.task('webpack', function() {
  return gulp.src(config.buildSource+'/'+config.mainJs)
	.pipe(cleanDest(config.buildDestination))
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(gulp.dest(config.buildDestination));
});

var sass = require('gulp-sass');
//Convert scss files to css
gulp.task('sass', function(){
  return gulp.src(config.buildSource+'/scss/**/*.scss)')
    .pipe(sass()) // Converts Sass to CSS with gulp-sass
    .pipe(gulp.dest(config.buildSource+'/css/'))
});

var lazypipe = require('lazypipe');
var uglify = require('gulp-uglify');
var cssnano = require('gulp-cssnano');
var gulpif = require('gulp-if');
// compressTasks is a sub process used by useRef (below) 
// that compresses (takes out white space etc) the 
// javascript and css files
var compressTasks = lazypipe()
    .pipe(sourcemaps.init, { loadMaps: true })
	.pipe(function () { 
		console.log('Uglify for JS applied');
		return gulpif('*.js', uglify()); })
    .pipe(function() {
		console.log('CSSnano applied');
        return gulpif('*.css', cssnano({
                zindex: false }));
    });
	
//Copy fonts
gulp.task('copyFonts', function(){
	
	var fontsSrc = config.fontsSource;
	var srcs = [];
	fontsSrc.map(function(src){
		  var s = src+'/'+config.fontsDirName;
	      srcs.push(s+'/**/*.eot');
	      srcs.push(s+'/**/*.svg');
	      srcs.push(s+'/**/*.ttf');
	      srcs.push(s+'/**/*.woff');
	      srcs.push(s+'/**/*.woff2');
	      srcs.push(s+'/**/*.otf');
	      return src;
		});
	
	var fontsDest = config.buildDestination+"/"+config.fontsDirName;
	console.log('copy fonts from: '+JSON.stringify(srcs)+" to: "+fontsDest);
	return gulp.src(srcs)
		.pipe(gulp.dest(fontsDest));
});

var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
// useRef looks at markers in index.debug.html and 
// combines all of the files into one file.  once the 
// files are combined the compressTasks process 
// is called and then the files are all written out to 
// the index directory.
gulp.task('useRef', ['copyFonts','sass','webpack'],function() {
	var userefExec = config.mode == 'dev' ? useref() : useref({}, 
            lazypipe()
            .pipe(compressTasks)            
            );
    return gulp.src(config.buildSource+'/*.html')
        .pipe(userefExec)
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(config.buildDestination))
});


var cacheBust = require('gulp-cache-bust');
// cacheBust looks at the css and js files and appends a hash to the
// request to cause the file to get reloaded when the file changes.
gulp.task('cacheBust', ['useRef'], function () {
    return gulp.src(config.buildDestination+'/'+config.main)
        .pipe(cacheBust())
        .pipe(gulp.dest(config.buildDestination));
});

var htmlmin = require('gulp-htmlmin');
// minIndex takes all of the whitespace out of the 
// main index file
gulp.task('minIndex', ['cacheBust'], function() {
    var pipeable = gulp.src(config.buildDestination+'/index.html')
        .pipe(htmlmin({ collapseWhitespace: true,
             removeComments: true }))
        .pipe(gulp.dest(config.buildDestination))
		.pipe(browserSync.reload({stream: true}));
});

//Watch for changes and show in browser instantly
gulp.task('reload', ['minIndex'], function(){
	browserSync.reload({stream: false});
});
gulp.task('reloadDebug', ['cacheBust'], function(){
	browserSync.reload({stream: false});
});
gulp.task('browserSync', [(config.mode == 'dev' ? 'cacheBust':'minIndex')], function() {
  browserSync.init({
    server: {
      baseDir: config.buildDestination
    },
  })
});
gulp.task('watch', ['browserSync'], function(){
	var reloadType = config.mode == 'dev' ? 'reloadDebug' : 'reload';
	console.log('watch reload type is... '+reloadType)
	gulp.watch(config.buildSource+'/**/*.js', [reloadType]);
	gulp.watch(config.buildSource+'/**/*.css', [reloadType]);
	gulp.watch(config.buildSource+'/*.html', [reloadType]);
});

/* DEFAULT TASK */
gulp.task('default', [(config.mode == 'dev' ? 'watch':'minIndex')])