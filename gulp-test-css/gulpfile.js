// Cary Landholt: https://www.youtube.com/watch?v=dwSLFai8ovQ

// npm install -g gulp      // for command line
// npm install gulp --save-dev
// npm install gulp-uglify --save-dev         // --save-dev for easy rebuilding if delete node_modules
// npm install gulp-coffee --save-dev

var gulp = require("gulp");
var uglify = require("gulp-uglify");
var concat = require("gulp-concat");
var coffee = require("gulp-coffee");
var typescript = require("gulp-typescript");
var less = require("gulp-less");
var sass = require("gulp-sass");
var es = require("event-stream");

gulp.task("sass", function () {
  return gulp.src("src/*.sass")
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest("dist"));
});

gulp.task("less", function () {
  return gulp.src("src/*.less")
      .pipe(less())
      .pipe(gulp.dest("dist"));
});

gulp.task("typescript-convert", function () {
  return gulp.src("src/*.ts")
      .pipe(typescript())
      .pipe(gulp.dest("dist"));
});

gulp.task("scripts", function () {
  var uglifyOptions = {
    mangle: true,                       // Reduced variable name, not function names.
    //preserveComments: "all"
    compress: {
      dead_code: false                  // Default is to remove unreachable code
    }
  };

  var jsFromCs = gulp.src("src/*.coffee")
   .pipe(coffee());

  //var js = gulp.src("src/*.js");
  // Excludes the *.es2015.js files.
  var js = gulp.src(["src/*.js", "!src/*.es2015.js"]);

  return es.merge(jsFromCs, js)
    .pipe(concat("all.js.min"))
    .pipe(uglify(uglifyOptions))
    .pipe(gulp.dest("dist"));
});

gulp.task("watch", function () {
  return gulp.watch("src/*.{js,coffee}", ["scripts"]);
});
