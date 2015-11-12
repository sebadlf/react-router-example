var gulp = require('gulp');
var LiveServer = require('gulp-live-server');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');

var server;

gulp.task('live-server', ['bundle', 'copy'], function(){

	server = new LiveServer('server/index.js');

	server.start();

});

gulp.task('bundle', function(){
	return browserify({
		entries: 'components/app.js',
		debug: true,

	})
	// return browserify({
	// 	entries: 'app/login.js',
	// 	debug: true,

	// })
	.transform(babelify)
	.bundle()
	.on('error', console.error.bind(console))
	.pipe(source('app.js'))
	.pipe(gulp.dest('./build'));
});

gulp.task('copy',function(){
	gulp.src(['./app/*.css'])
	.pipe(gulp.dest('./build/'));
});

gulp.task('default', ['live-server'], function(){
	console.log('started');

	gulp.watch(['components/**/*.*'], ['bundle']);
	gulp.watch(['build/app.js'], function (file) {
		console.log('Server Notify', file);
		server.notify(file);
	});
	gulp.watch(['server/*.*'], function(){
		console.log('Server Restart');
		server.start.bind(server);
	});
});

