var gulp = require('gulp'),
    handlebars = require('gulp-compile-handlebars'),
    mainBowerFiles = require('main-bower-files'),
    handlebars = require('gulp-handlebars'),
    gulpFilter = require('gulp-filter'),
    declare = require('gulp-declare'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    bower = require('gulp-bower'),
   server = require('gulp-server-livereload'),
    wrap = require('gulp-wrap');


var publishdir = 'build';
var dist = {
  all: publishdir + '/**/*',
  css: publishdir + '/css/',
  js: publishdir + '/js/',
  vendor: publishdir + '/js/libs/'
};

gulp.task('bower', function() {
  return gulp.src(mainBowerFiles())
        .pipe(gulp.dest(dist.vendor))
});


// TODO: Dynamic script list to push in handlebare 
gulp.task('jsfiles', function(){
  var scripts = gulp.src([dist.vendor+'/**/*.js']); 
  for (key in scripts) {
    console.log(scripts)
  }
});




gulp.task('templates', function(){
  gulp.src('src/templates/*.html')
    .pipe(handlebars())
    .pipe(wrap('Handlebars.template(<%= contents %>)'))
    .pipe(declare({
      namespace: 'IK.templates',
      noRedeclare: true, // Avoid duplicate declarations 
    }))
    .pipe(concat('templates.js'))
    .pipe(gulp.dest(dist.js));
});

gulp.task('default', function () {
  // TODO: compile haldelbars to html
 //   var templateData = gulp.src(gulp.dest(dist.js)),
 /*
    options = {
    }
    return gulp.src('src/templates/IK.html')
        .pipe(handlebars(templateData, options))
        .pipe(rename('index.html'))
        .pipe(gulp.dest(publishdir));
*/
  gulp.src('/src/templates/IK.html').pipe(rename('index.html'))
        .pipe(gulp.dest(publishdir));

  gulp.src('build')
    .pipe(server({
      livereload: true,
      defaultFile: 'build/index.html',
      directoryListing: true,
      open: true
    }));
});
