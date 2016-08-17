// Basic test tests.

describe("A test that will always pass", function () {
  it ("is true", function () {
    var test = true;
    expect(test).toBe(true);
  });
});

// describe("Another that will always FAIL", function () {
//   it ("is true", function () {
//     var test = true;
//     expect(test).toBe(false);
//   });
// });



// NOTE: After changing the "files" property in karma.conf.js we can now test Code
//      that is in a different file.
// QUESTION: The "<script...>" and "&lt;script..." strings are used twice below (surrounded by quotes in describe and it).
//           What is the cleanest way to avoid manually repeating them twice?
describe("UTILS.htmlEncode(\"<script></script>\")", function () {
  it ("returns \"&lt;script&gt;&lt;/script&gt;\"", function () {
    var unencodedTest = "<script></script>";
    var encodedText = UTILS.htmlEncode(unencodedTest);
    expect(encodedText).toBe("&lt;script&gt;&lt;/script&gt;");
  });
});

describe("UTILS.htmlDecode(\"&lt;script&gt;&lt;/script&gt;\")", function () {
  it ("returns \"<script></script>\"", function () {
    var unencodedTest = "&lt;script&gt;&lt;/script&gt;";
    var encodedText = UTILS.htmlDecode(unencodedTest);
    expect(encodedText).toBe("<script></script>");
  });
});





// TODO: Do some BROWSER tests, testing manipulation of the DOM.

// Copied from npm jasmine=jquery.
// OBSERVATION: This manually-inserted DOM content could be seen in the brower when debugged.
//              The content loaded from fixtures via jasmine-jquery was not visible.
// describe("Clicking special button results in focusing on name textbox", function () {
//   it ("is focused", function () {
//     $('<div id="toddler"><input type="text" /><input type="text" /></div>').appendTo('body');
//     expect($("input[type=text]")[1]).toBeInDOM();
//
//
//     var $firstInput = $("input[type=text]")[0];
//     $firstInput.focus();
//     expect($firstInput).toBeFocused()
//   });
// });

// https://github.com/velesin/jasmine-jquery :
//By default, fixtures are loaded from spec/javascripts/fixtures. You can configure this path:
// DC: Looks like the "base/" is a special syntax as, it is necessary, although I did not add it myself.
//     The "base" can also be seen within the F12 Sources tab in browswer.
jasmine.getFixtures().fixturesPath = "base/test/fixture";

// https://testdrivenwebsites.com/2010/07/29/html-fixtures-in-jasmine-using-jasmine-jquery/
describe("test with jasmine-jquery", function () {
  // it("should load many fixtures into DOM", function () {
  //   loadFixtures("my-fixture-1.html", "my_fixture_2.html");
  //   expect($("#jasmine-fixtures")).toSomething();
  // });

  it("should only return fixture", function () {
    // WORKS.
    //setFixtures('<div id="toddler"><input type="text" /><input type="text" /><input type="text" /></div>');

    // Loads fixture(s) from one or more files but instead of appending them to the DOM returns them as a string
    // (useful if you want to process fixture's content directly in your test).
    // DC: may want to use this for testing some encoding/decoding function.
    // var fixture = readFixtures("my-fixture-1.html");
    // loadFixtures(fixture);

    loadFixtures("my-fixture-1.html");

    expect($("input[type=text]")[2]).toBeInDOM();
  });
});

describe("test with jasmine-jquery", function () {
  it("should only return fixture", function () {
    loadFixtures("my-fixture-1.html");

    $("input[type=text]").first().addClass("my-class");

    expect($("input[type=text]")[0]).toHaveClass("fruit-juice");
  });
});

describe("event test with jasmine-jquery", function () {
  it("click event should be fired", function () {
    loadFixtures("my-fixture-1.html");
    var $firstInput = $("input[type=text]").first();
    // String or jQuery object will do for first parameter.
    var spyEvent = spyOnEvent($firstInput, "keypress");

    $firstInput.keypress();

    expect("keypress").toHaveBeenTriggeredOn($firstInput);
    expect(spyEvent).toHaveBeenTriggered();
  });
});

describe("event test with jasmine-jquery: addClass(), class does not exist on element", function () {
  it("cssClassChanged event should be fired", function () {
    loadFixtures("my-fixture-1.html");
    var $firstInput = $("input[type=text]").first();
    // String or jQuery object will do for first parameter.
    var spyEvent = spyOnEvent($firstInput, "cssClassChanged");

    $firstInput.addClass("my-class");

    expect("cssClassChanged").toHaveBeenTriggeredOn($firstInput);
    //expect(spyEvent).toHaveBeenTriggered();
  });
});

describe("event test with jasmine-jquery: addClass(), class ALREADY EXISTS on element", function () {
  it("cssClassChanged event should NOT be fired", function () {
    loadFixtures("my-fixture-1.html");
    var $firstInput = $("input[type=text].existing-class").first();
    // String or jQuery object will do for first parameter.
    var spyEvent = spyOnEvent($firstInput, "cssClassChanged");

    $firstInput.addClass("existing-class");

    expect("cssClassChanged").not.toHaveBeenTriggeredOn($firstInput);
    //expect(spyEvent).toHaveBeenTriggered();
  });
});

// Simpler version (without the commented out lines). Arange, Act, Assert.
describe("222 event test with jasmine-jquery: addClass(), class ALREADY EXISTS on element", function () {
  it("cssClassChanged event should NOT be fired", function () {
    loadFixtures("my-fixture-1.html");
    var $firstInput = $("input[type=text].existing-class").first();

    $firstInput.addClass("existing-class");

    expect("cssClassChanged").not.toHaveBeenTriggeredOn($firstInput);
  });
});




// Added extra test for removeClass() to increase code coverage of custom-jquery-plugins.js from 38.64% to 45.45%.
// NOTE: It only required ONE test to give "approved code coverage" of the method.
//       The next test to ensure event is not fired if no class was removed had no effect.
// QUESTION: Will that only come into play when we add code to the function being tested to
//           deal with the secondary case?
// OBSERVATION: app scripts seem to be minified since I enabled code coverage.
describe("event test with jasmine-jquery: removeClass(), class exists on an element", function () {
  it("cssClassChanged event should be fired", function () {
    loadFixtures("my-fixture-1.html");
    var $firstInput = $("input[type=text].existing-class").first();
    // String or jQuery object will do for first parameter.
    var spyEvent = spyOnEvent($firstInput, "cssClassChanged");

    $firstInput.removeClass("existing-class");

    expect("cssClassChanged").toHaveBeenTriggeredOn($firstInput);
    //expect(spyEvent).toHaveBeenTriggered();
  });
});

// QUESTION: Is the whole idea of code coverage that you only need to test each code path once?
// THOUGHT:  I would onnly think that is all very well if you have explicit conditional statements.
//           I don't think this would be acceptable for testing, say, boundary conditions, where the
//           same code path is executed. If the same code path executed but with some different integer
//           variable value, code coverage is not necessarily a good indicator.
describe("event test with jasmine-jquery: removeClass(), class does NOT exist on an element", function () {
  it("cssClassChanged event is NOT fired", function () {
    loadFixtures("my-fixture-1.html");
    var $firstInput = $("input[type=text].existing-class").first();
    var spyEvent = spyOnEvent($firstInput, "cssClassChanged");

    $firstInput.removeClass("non-existant-class");

    expect("cssClassChanged").not.toHaveBeenTriggeredOn($firstInput);
    //expect(spyEvent).not.toHaveBeenTriggered();
  });
});

// Simpler version (without the commented out lines). Arange, Act, Assert.
describe("222 event test with jasmine-jquery: removeClass(), class does NOT exist on an element", function () {
  it("cssClassChanged event is NOT fired", function () {
    loadFixtures("my-fixture-1.html");
    var $firstInput = $("input[type=text].existing-class").first();

    $firstInput.removeClass("non-existant-class");

    expect("cssClassChanged").not.toHaveBeenTriggeredOn($firstInput);
  });
});




//
// TODO: Can a nicer reporter of tests passing/failing be produced?
//
