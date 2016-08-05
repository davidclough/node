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

