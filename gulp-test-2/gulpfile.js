// Cary Landholt: https://www.youtube.com/watch?v=dwSLFai8ovQ

// npm install -g gulp      // for command line
// npm install gulp --save-dev
// npm install gulp-uglify --save-dev         // --save-dev for easy rebuilding if delete node_modules
// npm install gulp-coffee --save-dev

var gulp = require("gulp");
var uglify = require("gulp-uglify");
var concat = require("gulp-concat");
var coffee = require("gulp-coffee");
// npm install --save-dev gulp-babel babel-preset-es2015        (according to documentation) (took quite a while)
// If you're attempting to use features such as generators, you'll need to add transform-runtime as a plugin...
var babel = require("gulp-babel");
var typescript = require("gulp-typescript");
var traceur = require("gulp-traceur");
var es = require("event-stream");

// Super quick 100ms.
// HOWEVER: traceur output not as nice as babel or typescript.
// TODO: The files that are output still contain ".es2015". Want that to be removed.
gulp.task("traceur", function () {
  return gulp.src("src/*.es2015.js")
      .pipe(traceur())
      .pipe(gulp.dest("dist"));
});

// Much faster than gulp-babel (around 3s).
// The output is impressively simple, albeit the source is quite simple.
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

// LATER: The speed was vastly improved by installing npm3 (the default that cam with node 4 was version 2):
//        done using "npm3".
//        npm install -g npm3
//        Commands can still be run using "npm", as it is still installed. Howerver, the same can now be
//        Then uninstall the two babel-related gulp packeages then resinstall using npm3. Now 0.5-1s.
// SLOW. 13s. "npm dedupe" made a difference once but not after that.
// May be a known issue: https://phabricator.babeljs.io/T3067
// One suggestion: Most likely because you are running npm2. npm3 does a
//   better job of flattening dependencies and it results in a massive performance
//   difference.
gulp.task("babel-convert", function () {
  return gulp.src("src/*.es2015.js")
      .pipe(babel({
        presets: ['es2015']
      }))
      .pipe(gulp.dest("dist"));
});
