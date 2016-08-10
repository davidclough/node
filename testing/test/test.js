// TODO: Put this in a separate file.
// if (!String.prototype.format) {
//     String.prototype.format = function () {
//         var args = arguments;
//         return this.replace(/{(\d+)}/g, function (match, number) {   // number is the value of the 1st capture.
//             return typeof args[number] != "undefined"
//                     ? args[number]
//                     : match;
//         });
//     };
// }

// TODO: Put this in a separate file.
// pub.htmlEncode = function (value) {
//   //create a in-memory div, set it's inner text(which jQuery automatically encodes)
//   //then grab the encoded contents back out.  The div never exists on the page.
//   return $('<div/>').text(value).html();
// }

// TEMP: Because we do not have access to jquery at the moment.
var htmlEncode = function (value) {
  // Not quite. Only replaces the first matches.
  //return value.replace("<", "&lt;").replace(">", "&gt;");
  // .replace(/foo/g, "bar")
  return value.replace(/\</g, "&lt;").replace(/\>/g, "&gt;");
}



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

// QUESTION: Can we
describe("htmlEncode(\"<script></script>\")", function () {
  it ("returns \"&lt;script&gt;&lt;/script&gt;\"", function () {
    var unencodedTest = "<script></script>";
    var encodedText = htmlEncode(unencodedTest);
    expect(encodedText).toBe("&lt;script&gt;&lt;/script&gt;");
  });
});





// TODO: Do some BROWSER tests.
