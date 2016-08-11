// OK the namespace would normally be declared as an empty object. Code only small here.
if (!String.prototype.format) {
    String.prototype.format = function () {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function (match, number) {   // number is the value of the 1st capture.
            return typeof args[number] != "undefined"
                    ? args[number]
                    : match;
        });
    };
}

var UTILS = (function () {
  var pub = {};

  // Copied from Stack Overflow: http://stackoverflow.com/questions/1219860/html-encoding-in-javascript-jquery
  pub.htmlEncode = function (value) {
    //create a in-memory div, set it's inner text(which jQuery automatically encodes)
    //then grab the encoded contents back out.  The div never exists on the page.
    return $('<div/>').text(value).html();
  }

  pub.htmlDecode = function (value) {
    return $('<div/>').html(value).text();
  }

  return pub;
}());
