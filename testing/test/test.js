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

describe("event test with jasmine-jquery", function () {
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

//
// TEST COVERAGE  is the final thing.
//
