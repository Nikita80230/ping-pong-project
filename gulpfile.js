var gulp = require('gulp');

var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var sourcemaps = require('gulp-sourcemaps');

var browserSync = require('browser-sync').create();
var browserify = require('browserify');
var watchify = require('watchify');


function buildHTML() {
	return gulp.src('index.html')
	.pipe(gulp.dest('dist/'));
}

function createBundler() {
	return browserify({
		entries: ['sources/main.js'],
		debug: true
	})
}

function destJS(bundler) {
  return bundler
	.bundle()
  .on('error', console.log)
  .pipe(source('bundle.js'))
  .pipe(buffer())
  .pipe(sourcemaps.init({loadMaps: true}))
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest('dist/'));
}

function buildJS() {
	return destJS(createBundler());
};

function runServer(done) {
	const watchedBrowserify = watchify(createBundler());
	const build = () => destJS(watchedBrowserify);

	browserSync.init({
    server: {
			baseDir: "./dist/",
		},
		ui: false,
		notify: false,
		logFileChanges: true,
		ghostMode: false
  });

	watchedBrowserify
	.on('log', console.log)
	.on('update', async(files) => {
		console.log(files[0]);
    await build();
    browserSync.reload();
	});

	return build();
}

function run2Server(done) {
	const watchedBrowserify = watchify(createBundler());
	const build = () => destJS(watchedBrowserify);
	let isChange = false;
	const request = (req, res, next) => {
		if (!isChange) {
			return next();
		}

		isChange = false;
		const response = async () => next();
		gulp.series(build, response)();
	}

	browserSync.init({
    server: {
			baseDir: "./dist/",
			middleware: [request]
		},
		ui: false,
		notify: false,
		logFileChanges: true,
		ghostMode: false
  });

	watchedBrowserify
	.on('log', console.log)
	.on('update', (files) => {
		isChange = true;
		console.log(files[0]);
	});

	return build();
}

exports.run = gulp.series(buildHTML, runServer);
exports.run2 = gulp.series(buildHTML, run2Server);
