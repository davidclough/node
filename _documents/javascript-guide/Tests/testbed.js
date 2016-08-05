(function ($) {

	"use strict";

	console.clear();

	//const a = 3;		// (IE > 10)   Therefore leav const out
	//let aa = 4;			// (IE > 10)   Therefore leav let out
	
	var b = 6;
	b = 5;		// Can reassign if use without let
	JSG.utilities.outputLine(b);
	JSG.utilities.outputLine(b);

	//
	// console.trace() - Works in IE10. IT DOES NOT BREAK in earlier versions - the call simply has no effect and JS execution continues.
	//

	var testOutputCallStackToConsole = function () {
		JSG.utilities.outputCallStackToConsole();
	};
	testOutputCallStackToConsole();

	//debugger;

	//
	// Poor choice of line break.
	//

	var functionWithoutLineBreak = function () {
		return 1;
	};
	//alert(functionBrokenByPoorChoiceOfLineBreak.toString());
	JSG.utilities.outputLine(functionWithoutLineBreak().toString());

	var functionBrokenByPoorChoiceOfLineBreak = function () {
		return 
	  		1;
	};
	//JSG.utilities.outputLine(functionBrokenByPoorChoiceOfLineBreak().toString());

	//
	// try/catch/finally - Works in IE5.
	//

	var anotherFunctionBrokenByPoorChoiceOfLineBreak = function () {
		return 
	  	{
	  		val: 1;
	  	};
	};
	try {
		JSG.utilities.outputLine(anotherFunctionBrokenByPoorChoiceOfLineBreak().toString());
	}
	catch (exc) {
		JSG.utilities.outputLine(exc.toString());
		JSG.utilities.outputCallStackToConsole();
	}
	finally {
		JSG.utilities.outputLine("Crisis over.");
	}

	// If don't declare with var first (no strict mode) then these become properties of window.
	// freeStandingVariable = "freeStandingVariableValue";
	// JSG.utilities.outputLine(window.freeStandingVariable);
	// one = 1;
	// JSG.utilities.outputLine(window.one === one); // true



	//
	// Nested functions.
	//

    var addSquaresOfNumbers = function (x1, x2) {

	    var calculateSquare = function (x) {
	        return x * x;
		};

        return calculateSquare(x1) + calculateSquare(x2);
	};

    console.log(addSquaresOfNumbers(3, 4));
    JSG.utilities.outputLine(addSquaresOfNumbers(3, 4));

	//
	// Closure example.
	//

    var createIndicateHowManyTimesCalledFunction = function () {
        var counter = 0;

		var indicateHowManyTimesCalledFunction = function () {
            counter += 1;
            return counter;
        };

        // Note that there are no brackets after the function. This is because we are returning the function itself.
        return indicateHowManyTimesCalledFunction;
	};

    var indicateHowManyTimesCalled = createIndicateHowManyTimesCalledFunction();
    JSG.utilities.outputLine(indicateHowManyTimesCalled());			// outputs 1
    JSG.utilities.outputLine(indicateHowManyTimesCalled());			// outputs 2
    JSG.utilities.outputLine(indicateHowManyTimesCalled());			// outputs 3

    //
    // Calling functions with different arguments.
    //

    var academicExample = function (optionalArg) {
        // More about undefined later.
		if (typeof optionalArg === "undefined") {
			optionalArg = "default value";
		}

        console.log(optionalArg);
	};

    academicExample("Broccoli");
    // The following line outputs "default value" to the console.
    academicExample();
    academicExample(666);



	function sum() {
	    var s = 0;
	    for (var i=0; i < arguments.length; i++) {
	        s += arguments[i];
	    }
	    return s;
	}
	 
	console.log(sum(2, 3));         // 5
	console.log(sum(-10, 1));       // -9
	console.log(sum(1, 1, 1, 1));   // 4
	console.log(sum());             // 0



	function sum() {
	    var result = 0;
	    for (var i = 0; i < arguments.length; i++) {
	        result += arguments[i];
	    }
	    return result;
	}
	 
	console.log(sum(1, 2, 3));              // 6
	console.log(sum(-10, 1, 1, 1, 1, 1));   // -5
	console.log(sum());                     // 0

	//
	// Add format method to String prototype.
	//

	if (!String.prototype.format) {
	    String.prototype.format = function () {
	        var args = arguments;
	      console.log(arguments);
	        return this.replace(/{(\d+)}/g, function (match, number) {   // number is the capture, starting from 0.
	            return typeof args[number] != "undefined" ?
	                          args[number] :
	                          match;
	        });
	    };
	}

	var message = "{0}, {1}, {0}".format("one", "two");
	console.log(message);

	// Alternative definition is like a static method.
	if (!String.format) {
	  String.format = function (formatString) {
	    var args = Array.prototype.slice.call(arguments).slice(1);
	    return formatString.replace(/{(\d+)}/g, function(match, number) { 
	      return typeof args[number] != "undefined" ?
	             args[number] : 
	             match;
	    });
	  };
	}

	var message2 = String.format("{0}, {1}", "three", "four");
	console.log(message2);


	//
	// $.Deferred() and Promises
	//

	// pg 379
	var deferred = $.Deferred();
	deferred
		.then(function (value) { return value + 1; })
		.then(function (value) { return value + 2; })
		.done(function (value) { console.log(value); return value + 5; })
		.done(function (value) { console.log(value); });
	deferred.resolve(10);

	// var threadHang = function (seconds) {
	// 	var e = new Date().getTime() + (seconds * 1000);
	// 	while (new Date().getTime() <= e) {}
	// }

	// var deferred = $.Deferred();
	// deferred
	// 	.then(function (value) { console.log("Entering then1"); threadHang(3); })
	// 	.then(function (value) { console.log("Entering then2"); threadHang(3); })
	// 	.done(function (value) { console.log("Done"); })
	// deferred.resolve(10);

	var d1 = $.Deferred();
	var d2 = $.Deferred();
	var d3 = $.Deferred();
	 
	$.when( d1, d2, d3 ).done(function ( v1, v2, v3 ) {
	    console.log( v1 ); // v1 is undefined
	    console.log( v2 ); // v2 is "abc"
	    console.log( v3 ); // v3 is an array [ 1, 2, 3, 4, 5 ]
	});
	 
	d1.resolve();
	d2.resolve("abc");
	d3.resolve(1, 2, 3, 4, 5);

	// NOTE: You need the files to be hosted on a server, e.g. localhost, for the AJAX calls to work.

	// $.get("Meat.txt", function (data) {
	// 	alert("Load was performed.");
	// }).fail(function() {
    //     alert("error");
    // });

	// $.when($.ajax("https://gateway-medcdev.axappphealthcare.co.uk/windows/confirm.aspx"),
	// 	   $.ajax("https://gateway-medcdev.axappphealthcare.co.uk/windows/confirm.aspx?message=Are%20you%20ready")).done(function (a1, a2) {
	// 	var data = a1 + a2;
	// 	alert(data);
	// });	

	$.when($.ajax("Meat.txt"), $.ajax("Veg.txt")).done(function (a1, a2) {
	    // a1 and a2 are arguments resolved for the page1 and page2 ajax requests, respectively.
	    // Each argument is an array with the following structure: [ data, statusText, jqXHR ]
	    console.timeStamp();
	    console.trace();
		var data = a1[0] + " " + a2[0];
		console.log(data);
	});


/*
	$(".my-draggable").each(function( index, element ){
	    //$(this).text("a");

	    // For random hex code article: http://www.paulirish.com/2009/random-hex-color-code-snippets/
	    $(this).css("background-color", '#'+Math.floor(Math.random()*16777215).toString(16));

	    if (Math.random() * 2 > 1) {
	    	$(this).addClass("can-drop1");
	    }
	});

    $( ".my-draggable" ).draggable({
	    opacity: 0.35,
	    zIndex: 1000,
		stack: false,
	    snap: true,
	    //axis: "x",
		snapMode: "outer",
		grid: [1, 1],
		//helper: "clone",
		//appendTo: ".my-dropable",

		//cursorAt: { right: 0, bottom: 0 },

		//revert: true,
		//revertDuration: 200,

		//containment: "parent",

		////refreshPositions: true,

		// drag: function( event, ui ) {
		//     // Keep the left edge of the element at least 100 pixels from the container.
		//     ui.position.left = Math.min( 100, ui.position.left );
		// },

	    drag: function(event, ui) {
		    $(ui).addClass("badgeonkey");
		    $(ui).css("background-color", "#a00");
		},

		cursor: "move"
	});

	$( ".my-draggable" ).on( "drag", function( event, ui ) {
	    //$(ui).addClass("being-dragged");
	    ui.helper.addClass("being-dragged");
	});

    // Looks like "drag" is just the same as this. Would probably prefer this due to terminology.
	$( ".my-draggable" ).on( "dragstart", function( event, ui ) {
	    //$(ui).addClass("being-dragged");
	    // ui.helper.addClass("being-dragged");
	    // var aaa = $(ui);
	    // debugger;
	    // $(ui).css("background-color", "#a00");
	});

	$( ".my-draggable" ).on("dragstop", function( event, ui ) {
	    ui.helper.removeClass("being-dragged");
	});

    $( ".my-sortable" ).sortable();
    $( ".my-sortable" ).disableSelection();


    $(".my-droppable").droppable({
    	accept: ".can-drop1",
    	activeClass: "droppable-available",
    	hoverClass: "droppable-hover",
    	tolerance: "touch"

    	////disabled: true
    }).draggable().sortable();

    $(".droppable-container").on("drop", ".my-droppable", function (event, ui) {
		//alert( "dropped" );
    });

    $(".droppable-container").on("drop", ".my-droppable", function (event, ui) {
    	// Also see     http://jsfiddle.net/UD_B/Geupm/1/
		//$(ui.draggable).css("position", "static");
		$(ui.draggable).css("top", "0");
		$(ui.draggable).css("left", "0");
		$(ui.draggable).appendTo($(this));
    });

    $(".my-accordion").accordion();

    $(".unselectable-text").disableSelection();

  //   $("body").on("click", ".droppable-container", function (event, ui) {
		// $(".my-droppable:first").toggle("puff");
  //   });
*/
}(jQuery));

/*
var x = 16;
for (var i = 2; i <= 17; i++) {
	document.write("Base " + i + ": " + x.toString(i) + "<br />");
}
*/

