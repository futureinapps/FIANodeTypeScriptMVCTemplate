const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const plumber = require('gulp-plumber');
const livereload = require('gulp-livereload');
const sass = require('gulp-ruby-sass');
const exec = require('child_process').exec;

gulp.task('sass', () => {
  return sass('./public/css/**/*.scss')
    .pipe(gulp.dest('./public/css'))
    .pipe(livereload());
});

gulp.task('watch', () => {
  gulp.watch('./public/css/**/*.scss', ['sass']);
});

gulp.task('develop', () => {
  livereload.listen();
  nodemon({
    script: 'app.js',
    ext: 'ts js coffee jade',
    stdout: false
  }).on('readable', function () {
    this.stdout.on('data', (chunk) => {
      if (/^Express server listening on port/.test(chunk)) {
        livereload.changed(__dirname);
      }
    });
    this.stdout.pipe(process.stdout);
    this.stderr.pipe(process.stderr);
  });
});

gulp.task('tsc', function (cb) {
  logCommand('tsc --watch -p ./tsconfig.json')
})

gulp.task('webpack', function (cb) {
  logCommand('webpack -w')
})

function logCommand(c){
  let command = exec(c)
  command.stdout.pipe(process.stdout)
  command.stderr.pipe(process.stderr);
}

gulp.task('default', [
  'sass',
  'develop',
  'watch',
  'tsc',
  'webpack'
]);
