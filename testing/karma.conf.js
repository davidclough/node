// Karma configuration
// Generated on Tue Aug 09 2016 19:20:13 GMT+0100 (GMT Summer Time)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      'http://code.jquery.com/jquery-latest.min.js',

      // DC: I definitely need to make the fixtures availabl in the browser, just like the tests.
      //     Maybe I wouldn't if I manually fetched via AJAX but I do not want that.
      'test/fixture/**/*.html',

      'app/**/*.js',
      // Ensure this file is included before the other test files.
      'test/jasmine-jquery.js',
      'test/**/*.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    //reporters: ['progress', 'coverage'],
    //reporters: ['dots', 'coverage'],

    // Changed after added karma-htmlfile-reporter.
    reporters: ['progress', 'html'],



    // DC: Added after added karma-htmlfile-reporter.
    //     NOT SURE at moment if the "html" above conventionally matches to the "htmlReporter" property below.
    htmlReporter: {
      outputFile: 'tests/units.html',

      // Optional
      pageTitle: 'Unit Tests',
      subPageTitle: 'A sample project description',
      groupSuites: true,
      useCompactStyle: true,
      useLegacyStyle: true
    },




    // NOTE: https://www.npmjs.com/package/karma-coverage
    //       Needed to add this (as well as 'coverage' above) for code coverage reporter.
    //       Open the "index.html" in "node\testing\coverage\Chrome 52.0.2743 (Windows 10 0.0.0)" to view results.
    preprocessors: {
      // source files, that you wanna generate coverage for
      // do not include tests or libraries
      // (these files will be instrumented by Istanbul)
      'app/**/*.js': ['coverage']
    },

    // DC: I noticed that the app js was compacted and I could not view it properly in the browser to debug.
    //     Documentation says this line prevents istanbul from compacting the code.
    // OBSERVATION: It was still minified for me.
    // OBSERVATION: Comment out the "preprocessors" property above and the app code will no longer be minimized.
    coverageReporter: {
      instrumenterOptions: {
        istanbul: { noCompact: true }
      }
    },




    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome', 'PhantomJS'],
    //browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
