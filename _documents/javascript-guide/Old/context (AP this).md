## Context and the this keyword ##

When using JavaScript and you come across the **this** keyword it is important to know in what context you are in. 

In JavaScript this always refers to the **owner** of the function being executing, or rather, to the object that a function is a method of.

For example if you call this in your object it will normally return the actual object but if you call the this keyword inside a jQuery each loop you will find that you don't get the object you are in but the JQuery selector element that you are looping through. This make sense as the each function change the context and makes it the item you are looping through.

```
$(document).ready(function() {
	var contextExample = new ThreeSquared.Examples.Context().initialize();
	contextExample.testThisKeywordInJQueryEachLoop();
});

var ThreeSquared = ThreeSquared || {};

ThreeSquared.Examples = ThreeSquared.Examples || {};

ThreeSquared.Examples.Context = function(name, age) {
	
	var self = this;
	
	this.initialize = function() {
		var item1 = $("<div class='test-item'>item 1</div>");
		var item2 = $("<div class='test-item'>item 2</div>");
		var item3 = $("<div class='test-item'>item 3</div>");
		$("body").append(item1).append(item2).append(item3);
		return this;
	};

	this.getObjectValue = function() {
		return "Hello this was from the Context object";
	};
	
	this.testThisKeywordInJQueryEachLoop = function() {
		$("body").append("<p>Even though we specify the <b>this</b> keyword we get each item in the loop and not the containing object; if we wanted to access the containing object then we would use the self variable name</p>");
		$(".test-item").each(function(index) {
			// This is the important line, note that this now is in the context of the each loop so doesnt reference the object
			var item = $(this);
			$("body").append("<p>Found " + item.text() + "</p>");
			// This is how we can then access the containing object using the self keyword
			$("body").append("<p>" + self.getObjectValue() + "</p>");
		});
		
	};
	
};
```

If you use the this keyword without being inside an object or context it will reference the global context.

The solution to **this** is to start declaring and using a self variable as shown above. Then when you ever feel the need to call **this** for the object, instead call **self** instead and you will know you are calling the correct functions.