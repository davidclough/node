// Basic test tests.

describe("A test that will always pass", function () {
  it ("is true", function () {
    var test = true;
    expect(test).toBe(true);
  });
});

describe("Another that will always FAIL", function () {
  it ("is true", function () {
    var test = true;
    expect(test).toBe(false);
  });
});



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
describe("Clicking special button results in focusing on name textbox", function () {
  it ("is focused", function () {
    expect($('<input type="text" />').focus()).toBeFocused()
  });
});
