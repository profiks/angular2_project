var gulp  	= require('gulp'),
    ts	  	= require('gulp-typescript'),
	connect = require('gulp-connect');


var paths = {
	appTypescript: ['./app/ts/**/*ts']
}

var tsProject = ts.createProject('tsconfig.json'); // loads configuration

gulp.task('ts', function () {
   var tsResult = tsProject.src(paths.appTypescript) // load files
        .pipe(ts(tsProject)); // transpile the files into .js
    
    return tsResult.js.pipe(gulp.dest('./app/js')) // save the .js 
		.pipe(connect.reload())
});


gulp.task('html', function() {
  gulp.src('app/*.html')
    .pipe(connect.reload())
});



gulp.task('watch', function() {
  gulp.watch(['./app/ts/**/*.ts'], ['ts']);
  gulp.watch(['./app/**/*.html'], ['html']);
});


gulp.task('connect', function() {
  connect.server({
    root: 'app',
    livereload: true
  });
});


gulp.task('default', ['watch', 'html', 'ts', 'connect']);