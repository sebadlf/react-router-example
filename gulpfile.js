var gulp = require('gulp');
var LiveServer = require('gulp-live-server');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');

var server;

gulp.task('live-server', ['bundle'], function(){
	var server = new LiveServer('server/index.js');

	server.start();
});

gulp.task('bundle', ['copy'], function(){
	return browserify({
		entries: 'components/app.js',
		debug: true,

	})
	.transform(babelify)
	.bundle()
	.pipe(source('app.js'))
	.pipe(gulp.dest('./build'));
});

gulp.task('copy',function(){
	gulp.src(['./app/*.css'])
	.pipe(gulp.dest('./.tmp'));
});

gulp.task('default', ['live-server'], function(){
	console.log('started');
});