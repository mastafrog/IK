var gulp = require('gulp');
var handlebars = require('gulp-compile-handlebars');
var handlebars = require('gulp-handlebars');
var gulpFilter = require('gulp-filter');
var declare = require('gulp-declare');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var bower = require('gulp-bower');
var wrap = require('gulp-wrap');


gulp.task('run', function() {

});

var src = {
  bower: ['bower.json', '.bowerrc']
};

var publishdir = 'build';

var dist = {
  all: [publishdir + '/**/*'],
  css: publishdir + '/css/',
  js: publishdir + '/js/',
  vendor: publishdir + '/js/libs/'
};

gulp.task('bower', function() {
  var jsFilter = gulpFilter('**/*.js')
  var cssFilter = gulpFilter('**/*.css')
  
return bower()
    .pipe(jsFilter)
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest(dist.js))
    .pipe(jsFilter.restore())
    .pipe(cssFilter)
    .pipe(concat('vendor.css'))
    .pipe(gulp.dest(dist.css))
    .pipe(cssFilter.restore())
    .pipe(rename(function(path) {
      if (~path.dirname.indexOf('fonts')) {
        path.dirname = '/fonts'
      }
    }))
    .pipe(gulp.dest(dist.vendor))

/*
  return bower('./my_bower_components')
    .pipe(concat('lib.min.js'))
    .pipe(gulp.dest('build/js/libs/'))
    */
});


gulp.task('templates', function(){
  gulp.src('src/templates/*.html')
    .pipe(handlebars())
    .pipe(wrap('Handlebars.template(<%= contents %>)'))
    .pipe(declare({
      namespace: 'MyApp.templates',
      noRedeclare: true, // Avoid duplicate declarations 
    }))
    .pipe(concat('templates.js'))
    .pipe(gulp.dest('build/js/'));
});
