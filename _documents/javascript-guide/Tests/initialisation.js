var JSG = {};

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

JSG.utilities = (function ($) {

	"use strict";

	// NOTE: private and public are reserved words. They work now mut may break in futures.
	// NOTE: Originally but the declaration of pub AFTER had set all the properties of priv. However, want to follow the
	//       clarity practice of avoiding relying on hoisting (declare the variable where it will be moved to by the runtime).
	//       This also avoids reader becoming confused when they see pub declared after priv methods which reference its properties.
	var priv = {};
	var pub = {};

	// Private.

	priv.outputCallStackToConsole = function () {
		//alert(pub.greeting);
		console.trace();
	};

	// Public.

	pub.greeting = "Hello";

	pub.outputLine = function (text) {
		document.write("{0}<br />".format(text));
	};

	pub.outputCallStackToConsole = function () {
		priv.outputCallStackToConsole();
	};

	return pub;

}(jQuery));

