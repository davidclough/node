// Cary Landholt: https://www.youtube.com/watch?v=dwSLFai8ovQ

// npm install -g gulp      // for command line
// npm install gulp --save-dev
// npm install gulp-uglify --save-dev         // --save-dev for easy rebuilding if delete node_modules
// npm install gulp-coffee --save-dev

var gulp = require("gulp");
var uglify = require("gulp-uglify");
var concat = require("gulp-concat");
var coffee = require("gulp-coffee");
var es = require("event-stream");

gulp.task("scripts", function () {
  var jsFromCs = gulp.src("src/*.coffee")
   .pipe(coffee());

  var js = gulp.src("src/*.js");

  return es.merge(jsFromCs, js)
    .pipe(concat("all.js.min"))
    .pipe(uglify())
    .pipe(gulp.dest("dist"));
});

// Watching does not use a gulp package by default. It is a gulp command.
gulp.task("watch", function () {
  return gulp.watch("src/*.{js,coffee}", ["scripts"]);
});

gulp.task("coffee", function () {
  return gulp.src("src/*.coffee")
      .pipe(coffee())
      .pipe(gulp.dest("src"));
});


// gulp.task("coffee", function () {
//   return gulp.src("src/*.coffee")
//       .pipe(coffee())
//       .pipe(gulp.dest("src"));
// });
//
// gulp.task("scripts", ["coffee"], function () {
//   return gulp.src("src/*.js")
//       .pipe(concat("all.js.min"))
//       .pipe(uglify())
//       .pipe(gulp.dest("dist"));
// });


// gulp.task("scripts", function () {
//   gulp.src("src/*.js")
//       .pipe(concat("all.js.min"))
//       .pipe(uglify())
//       .pipe(gulp.dest("dist"));
// });
