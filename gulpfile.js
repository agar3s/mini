/**
*  @author       Giovanny Beltran <@Agar3s>
*/

var gulp      = require('gulp'),
    clean     = require('gulp-clean'),
    concat    = require('gulp-concat'),
    uglify    = require('gulp-uglify'),
    webserver = require('gulp-webserver'),
    zip       = require('gulp-zip'),
    filesize  = require('gulp-filesize');


gulp.task('clean', function(){
  return gulp.src(['dist/*'], {read:false})
  .pipe(clean());
});

gulp.task('copy', ['clean'], function(){
  gulp.src('./index.html')
  .pipe(gulp.dest('dist/'));
});


gulp.task('concat-scripts', ['copy'], function() {
  gulp.src(
    ['./app/js/intro.js',
     './app/js/setup.js',
     './app/js/events/keys.js',   // optional-remove it for click/touch games
     './app/js/events/click.js', // optional-remove it for key games
     './app/js/generatedSprites.js',
     './app/js/sprite.js',
     './app/js/gameLoop.js',
     './app/js/outro.js'
  ])
    .pipe(concat('a.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/'))
});


gulp.task('default', ['concat-scripts'], function() {
  gulp.watch('app/js/*.js', ['concat-scripts']);

  gulp.src('./dist')
    .pipe(webserver({
      host:'0.0.0.0',
      livereload: true
    }));

});

// compress tasks
gulp.task('compress', function() {
  gulp.src('./dist/**')
  .pipe(zip('app.zip'))
  .pipe(gulp.dest('./'))
});

gulp.task('report', ['compress'], function(){
  gulp.src(['./app.zip'])
  .pipe(filesize())
});
