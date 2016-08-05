## General Standards
```
TODO: look through Crockford spreadsheets and several standards documents on web for more ideas.
```
DC just currently throwing down rough notes related more to standards we should maintain. Needs plenty of tidying and reviewing.

### General Syntax
* === and !== not == and !=
The first pair will also equate the types of the items being compared
With the second pair javascript may coerce the values, e.g.
```
'' == '0'           // false
0 == ''             // true
0 == '0'            // true
false == 'false'    // false
false == '0'        // true
false == undefined  // false
false == null       // false
null == undefined   // true
' \t\r\n ' == 0     // true
```
* ...Also explain falsey (false, 0, -0, "", '', null, undefined, NaN) and truthy (all other values, I think). Even then it is not straightforward, e.g. two NaN values are both falsey but NaN != NaN
* hanging opening braces
The style is not as nice (in my opinion) as opening brace on a separate line but it is the convention throughout the community and being used to it helps to understand, for example, code samples on the web.
* always use braces, even when only one line in block.
* commenting, probably no need to state a preference for // as /*...*/ can be useful in environments with limited editing functionality
Explain how (as in other languages) code can be made more self documenting via (1) use of well named tokens, (2) reduction of reasonably large functions (e.g. more than 10 lines) into smaller, well-named functions. Achieving total self-documenting code is highly unlikely so only stupid people will avoid comments altogether (TODO: rephrase)
* always end lines with semicolons
Code may still work perfectly well. However, whatever engine is running the javascript will try to guess where lines end and sometimes will guess wrongly. This hypothetical example will result in the function always returning `undefined` but may well happen when lines become long and need to be broken:
```
function() { return 
  1; }
``` 
ALSO for the same reason... put operators before the break, rather than at the start of the next line (CONFIRM):
```
// Yes.
a = b +
    c;
```
```
// No.
a = b
    + c;
```
* Camel case for variables, parameters, methods, objects... (just about everything). Maybe not constants??
* Camel case functions EXCEPT where the function needs to be called using the "new" keyword. In that case it is a community-wide standard to name ONLY those functions using Pascal case (not to indicate, say, that the function generates and returns a class).
* 
* 
* 
* 
* 
* 

### Structure
* Separate files. Avoid plastering JS inside `<script>` tags in markup files. Sometimes may need to put some things in, e.g. to take advantage of special tags in Web Forms or MVC Razor.
* Namespaces (I certainly liked a short, upper-case value, at least for the top-level namespace. Gives a clear but unobtrusive indication that the code is "our code". This method is adopted by other people, e.g. Douglas Crockford, but I don't think there is an agreed, community-wide convention.
* Modules or classes - never have free-standing variables and functions
* Comments - plenty. As in other languages you can reduce need for comments by using highly descriptive variable and function names and by breaking functions that are longer than a few lines into smaller functions but, although you may the code jumps out of the screen and talks to you, it is unlikely this is completely the case
(MERGE THIS WITH ONE FURTHER UP)
* So as to prepare for unit testing and UI behahiour testing it is in our interests not to mix logic with UI manipulation. Not sure how easy this is to do without ending up with convoluted code (may be very easy with a bit of practice) but should at least give it a go
* 
* 
* 

### Other
* Don't use eval()
* Use {} to create an object, not "new Object()". Same with things like Bools... Use {} instead of new Object(). Use [] instead of new Array().
* Use of "with" keyword is generally intensely disapproved of
* "for...in" loops are not as nice as they are in C#...variable will not contain some nice object...generally use for iterating through properties of an object. Otherwise use a traditional "for" loop with a counter or can use jQuery's $.each()
```
for (variable in object) {...
}
```
* Don't use IE conditional comments
* Hoisting of scope - declaring variables within a block (below function level) will not mean that they are only available in that block
* Where to break long lines, e.g. end line with an operator. Some parsers will try to put in their own error correcting and predict where a logical line actually ends:
```
var sum = a + b
            + c;
```
* Objects evaluate to true
    Undefined evaluates to false
    Null evaluates to false
    Booleans evaluate to the value of the boolean
    Numbers evaluate to false if +0, -0, or NaN, otherwise true
    Strings evaluate to false if an empty string '', otherwise true
(MERGE THIS WITH truthy and falsey above)

* jQuery binding - bind events via a container, not directly to the object. This means that the events will work even on new objects that have been added to the container via AJAX (need to confirm still the case)
```
// Binding directly will not work on new widgets added via AJAX.
$( ".widget" ).on( "click", function() {
  console.log( $( this ).text() );
});
```
```
// Will work...
$( ".widget-container" ).on( "click", ".widget", function() {
  console.log( $( this ).text() );
});
```
* https://github.com/airbnb/javascript/tree/master/es5 has quite a lot of links to other guides...
* 
* 



```
if (a === b) {
}
```

