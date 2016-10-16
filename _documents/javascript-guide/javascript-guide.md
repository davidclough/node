# JavaScript Guide
## Sections

1. [JavaScript Language (ECMAScript 5)](#language-contents)
1. [Coding Rules and Style](#style-contents)
1. [Code Organisation](#organisation-contents)
1. [Patterns, Tips and Tricks](#tips-contents)

2. ?? Associated Tools and Libraries (only brief - with links)

<hr />

<a name="language-contents"></a>[JavaScript Language (ECMAScript 5)](#language)

*  [Document Scope](#language-document-scope)    DONE
*  [Language Overview](#language-overview)    DONE
*  [Global Namespace](#language-global-namespace)    DONE
*  [Variables](#language-variables)           DONE
*  [Variable Hoisting](#language-hoisting)    DONE
*  [Top-down Evaluation](#language-sequential)    DONE
*  [Functions](#language-functions)    DONE    where closures?
*  [Calling Functions](#language-calling-functions)    DONE
-  [Immediately Invoked Function Expressions](#language-immediately-invoked-function-expressions) NOT DONE
-  [Objects](#language-objects)
-  [The this Keyword](#language-this-keyword)
-  [Types](#language-types)  		DONE ALL DOWN TO Object
	* [Primitive Types (string, number, boolean, undefined, null)](#language-types-primitive)
		* [string](#language-types-string)
		* [number](#language-types-number)
		* [boolean](#language-types-boolean)
		* [undefined](#language-types-undefined)
		* [null](#language-types-null)
	* [Array](#language-types-array)
	* [Date](#language-types-date)
	* [RegExp](#language-types-regexp)
	- [Object](#language-types-object)
	- [Function](#language-types-function)
		* [arguments Property](#language-types-arguments-property)		DONE
*  [JavaScript Keywords](#language-javascript-keywords)   DONE (apart from object-related ones)
*  [Reserved Words](#language-reserved-words)						DONE
*  [Truthy and Falsy](#language-truthy-and-falsy)        DONE
*  [Operators](#language-operators)  										DONE (apart from object ones, which will probably appear in the objects section)
*  [Commonly Used Built-in Object Methods](#language-built-in-objects)   TODO most object methods
	* [Window](#language-built-in-objects-window)
	* [Document](#language-built-in-objects-document)
	* [Math](#language-built-in-objects-math)
	* [JSON](#language-built-in-objects-json)
	* [Console](#language-built-in-objects-console)
*  [Built-in Global Properties and Functions](#language-built-in-global-functions)   DONE

This is by far the biggest section of the document.

USEFUL LINKS
[http://hsablonniere.github.io/markleft/prezas/javascript-101.html#1.0](http://hsablonniere.github.io/markleft/prezas/javascript-101.html#1.0)
[http://www.w3schools.com/js](http://www.w3schools.com/js)


## <a name="language"></a>JavaScript Language (ECMAScript 5)

### <a name="language-document-scope"></a>Document Scope
This document focuses on ECMAScript 5 (ES5) which works in IE8 and above, Chrome and Firefox. Only occasionally will there be references ES2015/ES6. It is not intended to argue for or against the use of JavaScript but to help you learn the language and techniques that can help tame it.

In interests of this document not becoming too bloated explanations may be quite short. It will be intended to cover more essential areas that are different from other languages and avoid going over things that will be more obvious to an experienced programmer. Some code samples may be over-simplified for the sake of more clearly explaining a concept.

It is intended to get you started, to explain many of the concepts that do not become immediately obvious when trying to google it as you go along, and will not be a complete reference. There are other more established sources from which you can obtain more detail.

If you have a desire to learn JavaScript properly, you would helping yourself if you avoid continually trying to think in terms of C#. Although many of the standard instructions, like the flow of control keywords, operate in a very similar way to other C-based languages some, like the `new` and `this` keywords operate in a fundamentally different manner and it would be beneficial not to assume that, just because something looks the same as in C#, it is.

> Note: The word **property** will be used throughout the document. It is actually referring to what in C# would be considered a field and not to something that has getter and setter methods. With functions being first-class objects in JavaScript (see next section), the word **properties** may also refer to an object's fields and methods. This is standard terminology in JavaScript.

> Note: Code samples will often use `console.log()` to display results in the console. You can access this via the developer tools in your browser of choice (press F12) and go to the `Console` tab. In this tab you should also be able to paste an entire example into the command line, usually the bottom line of the Console tab with a `>` symbol at the start of it. Chrome is particularly reliable for doing this.<br />Perhaps a better place to paste a sample would be to paste it into the JAVASCRIPT window of a [JSFiddle](https://jsfiddle.net/) page (you will still need the console window open to see the results) and click "Run". Here you can easily play about with the code.
An alternative is [JS Bin](https://jsbin.com/?js,console,output).

### <a name="language-overview"></a>Language Overview
JavaScript is a prototype-based language. This means that it has objects but no concept of classes. Instead each object has a `prototype` property which governs which parent-like object it will inherit members from. The prototypes can form a chain.

It has first-class functions, which means you can make variables equal to them and pass them as parameters in the same way as you might with string or a number.
JavaScript makes extensive use of functions and closures.

It uses dynamic typing, meaning that variables do not have to remain assigned to values of a particular type. Many fans see this as a very powerful feature, providing lots of flexibility and smaller code size. However, we all know there are downsides that go with it, particularly if the code base starts to grow, brittleness of code being the main one, performance being another. There is also less ability to restrict other programmers and prevent people who are less proficient in the language and/or have a lesser experience of a particular system from inadvertently doing bad things.

<br /><a href="http://c2.com/cgi/wiki?BenefitsOfDynamicTyping">http://c2.com/cgi/wiki?BenefitsOfDynamicTyping</a>
<br /><a href="http://programmers.stackexchange.com/questions/122205/what-is-the-supposed-productivity-gain-of-dynamic-typing" target="_blank" dummy="_">http://programmers.stackexchange.com/questions/122205/what-is-the-supposed-productivity-gain-of-dynamic-typing</a>

These features make it a very flexible, multi-paradigm language. For example, it supports both object-oriented and functional programming, although it is not necessarily as good in any given paradigm as certain other languages.

Even the biggest proponents of the language accept that it has many fundamental flaws. It contains significant bad features, some utterly awful, which came about through a poor initial design, e.g. global variables. However, there are many really good features, like closures, not all of which were originally intended. LINK TO BOTTOM.

Needless to say, the more good bits you harness and the less bad, the better your user experience will be.

### <a name="language-global-namespace"></a>Global Namespace
In JavaScript everything belongs to a containing object apart from the `global namespace` (or `global scope`).

If you declare free-standing variables or functions, that are not contained within anything else, they will then belong to the global namespace. This means that they are publicly available from anywhere in your code This lack of encapsulation is generally a very bad practice.

In browser programming the global namespace is the **window** object. Any free-standing variables (functions are variables) you declare will be **directly** contained within the window object. Since all your JavaScript code is automatically nested within the window object those free-standing variables will be available everywhere in the code. Declaring variables in this manner is known as *polluting the global namespace*. Also, these variables will only go out of scope and be destroyed when the window object itself is destroyed.

If you just refer to a global variable that has not been declared using `var` (strict mode will be explained later) it would actually become a property of the window object.

Running this example in [JSFiddle](https://jsfiddle.net/) below highlights how not declaring `freeStandingVariable` using the `var` keyword means that it becomes a property of the `window` object. Also, here, the `this` keyword refers to the global namespace.

	freeStandingVariable = 666;
	console.log(window.freeStandingVariable);
	console.log(this.freeStandingVariable);

If you had used `var freeStandingVariable = 666;` it would have become a "private variable" of the global namespace, which is, in effect, the very opposite of private. Whereas this is better than the example, it is still nasty.


MUCH OF THIS STUFF CAN BE EXPLAINED IN LATER SECTIONS

The `global namespace` (or `global scope`) refers to the **object** to which those free-standing variables are attached as properties. NEED AMENDING for VAR
In browser development that object is the `window` object
Variables declared in the GN will not go out of scope until the GN and will therefore not be destroyed. Declaring more than a few ... is referred to a s polluting the global namespace. is very bad practice and can lead to  "hard to debug" errors caused by unintentional side effects.

"use strict" BUT EVEN MORE SO:
* Modules or classes - never have free-standing variables and functions

### <a name="language-variables"></a>Variables
Variables are declared in JavaScript using the `var` keyword.

    var myLocalVariable = 0;

>Note: We are not referring to properties of objects here.

>Note: This section only concerns itself with variables which you explicitly declare. Usage of variables which haven't been declared and of `strict mode` will be dealt with later.

Their type can be changed without any form of type declaration. For example, one variable can be set to a string at some point, a number at a later point, a custom object even later and so on. We cannot do anything about that unless we just use another language (see TypeScript). As previously stated, this can can bring great flexibility but JavaScript, especially that which has not been written in a rigorous and strict manner, can easily become fragile.

You can declare multiple variables on one line using one `var` with multiple declarations and assignments separated by commas, e.g. `var x = 3, y = 7, z = 8;`, just as you can in C#. Often you will see this style in JavaScript snippets on the web. Some will even tout declaring all your local variables for a particular scope in one big, comma-separated declaration statement as a recommended good practice. However, there is nothing at all to be gained by using this syntax.

#### Using Variables that You Have Not Declared


#### Scope
In many C-based languages variable scope is much richer than in JavaScript. For example, in C#, almost any declaration of a variable within a particular block statement will mean that it can only be accessed from within that same block, or nested blocks, after it has been declared, e.g. a method, an if statement condition or any form of loop. In C we can even introduce a scope just by wrapping a group of lines within an extra set of braces.

In JavaScript, there are effectively only two scopes, `global` and `function`.

If you declare a variable that is not inside a function it becomes part of the global scope, is available anywhere and, if it has already been declared, in your code or a third party library, will wipe it out and re-initialise it.

> AVOID declaring variables within the global scope. Only outer `namespace`s (generally just the one), which act as containers for all your code, should be declared in the global scope. More on these later.

Any variable declared inside a function will be visible within that function and all nested functions and objects. As will be explained later, this is your ticket to encapsulation in JavaScript. That said, we are not pretending that it will match up to the encapsulation available in other languages.

MOVED FROM global-namespace
If you declare a variable using the `var` keyword it will be a variable that is private to the object in which it was declared, e.g. a function.
If you do not use the `var` keyword it will become a property of the object and will be accessible from outside the object.




### <a name="language-hoisting"></a>Variable Hoisting
In many modern languages it is considered good practice to declare variables at the point, or as near as possible, where they are used.

They also allow variables to be declared within finer grained scopes which mean that it cannot be accessed from outside the block in which it has been declared.

As explained above, JavaScript only allows variables to be declared at the level of the containing function (if we dismiss global scope).

It also has a nasty feature called `hoisting` which means that, although you can also declare variables (with the `var` keyword) at the point where they are first used, those declarations are moved at runtime to the top of the closest parent function that contains them. This means that, although JavaScript lets you declare variables at their first point of use and within non-function blocks, you should not be deceived into thinking you achieved any form of encapsulation. The only way to achieve this would be to introduce nested functions.

Note that, if you declare a variable and assign a value to it, the variable declaration will be hoisted at runtime but the assignment will remain where it is.

With functions also being variables, hoisting also applies to functions.

> Note: For these reasons it is universally recommended that you depart from the C# mentality and declare all your variables and nested functions (not methods) at the start of the immediate parent function.

> Avoiding writing code based on your expert knowledge of hoisting will avoid confusing less experience JavaScript programmers and, as will be seen in the next section, will make your code clearer.

TODO: Subtle difference between function declarations and function expressions.
Include in sample but point reader to further down.

CODE SAMPLES: declaration, type changing (all samples in the one code block initially). Also do function examples.

> NOTE: In later versions of JavaScript the `let` keyword is introduced as an improved alternative to `var`. This has main effects. The first is to prevent hoisting. `let` will also ensure that the variable is scoped to the containing `block`, rather than the containing function, and cannot be referenced before it has been declared. This is more like the behaviour you would expect in most C-based languages.

> NOTE: Later versions of JavaScript also introduce the `const` keyword which is similar to `let` but also ensures that a variable's value must be set in the declaration and cannot be modified later. This does _not_ mean that its value has to be set to a literal, e.g. 3.14 - it can still be the result of an expression.

You can see recommended coding styles related to this issue later in <a href="#style-declarations">Declarations</a>.

### <a name="language-sequential"></a>Top-down Evaluation
#### Variables
JavaScript is run using `top-down evaluation`. Put simply, variables must have been declared before they are used.

TO MOVE (to function section): Whilst the above statement is true you have to bear in mind the effects of hoisting. In particular functions which have been declared below where they are called, using `function declaration syntax`, will still work because hoisting moves both the declaration of the function variable and its assignment to the top of the nearest parent function. Whilst this may look highly convenient it can lead to sloppiness.

WRITE YOUR CODE WITH THE INTENTION OF IT BEING EVALUATED LIKE THIS, do not rely on hoisting tricks to "make your life easier".

> Note that although functions need to be declared before they are called execution order will not affect methods, i.e. properties of objects that are functions, unless they are called as part of the construction process.

> You should stick with the idea of declaring functions before they are called. Using function expression syntax helps...

> If you are not using `strict mode` (<a href="#style-strict-mode">more</a> about this later) the runtime will implicitly create the variable for you, a situation can cause "hard to find" errors and which sensible people want to avoid.

#### File Organisation
Generally you will separate the JavaScript you write into separate files. In a web page, the contents of JavaScript files will be evaluated in the order in which they have been referenced, e.g. via <a href="#style-script-tag">&lt;script&gt; tags</a> or by including bundles using .NET `Scripts.Render` calls.

It is as though the contents of all the files have been concatenated into one big file which is then evaluated using in the top-down manner mentioned earlier.

### <a name="language-functions"></a>Functions
<p>    Functions</p>
<p>        Declarations and expressions (FtU D12) http://stackoverflow.com/questions/1013385/what-is-the-difference-between-a-function-expression-vs-declaration-in-javascrip</p>
<p>        Use declaration syntax if define inside a loop (http://helephant.com/2012/07/14/javascript-function-declaration-vs-expression/)</p>
<p>        Space to avoid it looking like you have declared a function called "function".</p>
<p>        "arguments" property (it's not a true array but there is a trick to convert it to one)</p>
<p>        Keep small and single resp, e.g. split longer ones into separate functions.</p>
<p>        Try to keep non-UI logic in separate funtions from ones that manipulate the UI.</p>
Functions can nested within other functions. This is one of the backbone...

Function overloading - there is none - last definition with same name wins. However, one property of the function object is `arguments'. **Array-like** object (which can easily converted to an Array) from which all argument values can be accessed...
`https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/arguments`

EXAMPLES NOW
Isolated declarations here. However, in reality, you will not just declare standalone functions within the global namespace (HAS THIS BEEN EXPLAINED). but will declared plenty of nested functions in manner of 1 or 2.

#### Ways of Declaring Functions

##### Function Declaration Syntax
    function addNumbers(x1, x2) {
        return x1 + x2;
	};

This does *not* result in the function being defined in some one-off, optimised manner behind the scenes. It is actually shorthand for the function expression explained next. `addNumbers` is really a variable declaration that is made equal to the function you define. You should therefore be careful about where you define a function (see Nested Functions).

Every time this line of code is encountered by the JavaScript engine a new variable will be created and assigned to a newly defined function.

EXPLAIN that `hoisting` will ensure that BOTH the function variable AND its assignment will be hoisted to the top of the current scope.

##### Function Expression
    var addNumbers = function (x1, x2) {
        return x1 + x2;
	};

The space after the function keyword is deliberate. It clearly distinguishes that the `function` keyword has been used as part of an expression, rather than a declaration.

> Note: JavaScript practices involve a significant number of "visual" clues where, to compensate for deficiencies, we write the code according to a particular style purely to aid reader understanding and not so that the code runs differently.

EXPLAIN that, unlike with FDS, only the variable declaration will be hoisted. The point it is assigned to the function will remain where it is.
1) Use of this syntax will more likely lead to indication of it being used before it is declared. FDS could be used as standards so can slap definitions out of order and they will be corrected...
2) Highlights the fact that we are in fact defining a variable.

> Strict coding practices are valuable practices in all languages. However, this is even more so in JavaScript, with its deficiencies and lack of super-advanced coding environments.

SPLIT TO ABOVE PARAGRAPHS.
> Note: Expression syntax has been preferred over declaration syntax in this due to a combination of `top-down Evaluation` and `hoisting` (explained earlier). It helps to keep you inline with the practice of always declaring something before you use it. If you haven't then hoisting will move the declaration of the function to the top of its scope but it will remain undefined until the point where _you_ actually defined it and you will get an exception if you call it before that point. Keeping to strict practices when writing JavaScript is an extra aid to helping you write robust code.<br />Technically, and often you will see this, you could prefer to use function declaration syntax. This will allow you to slap your function definitions anywhere within scope and both...

##### Function as a Method
This is exactly like a function expression but the function is assigned to a property of an object.

    var myObject = {};
    myObject.addNumbers = function (x1, x2) {
        return x1 + x2;
	};

#### Anonymous Functions
There are situations where you may want to define a function _without_ explicitly assigning it to a variable. For example, just the right hand side of the above example may be directly supplied as a parameter in a function call, e.g. specifying a callback method or assigning an event handler.

CALLBACK EXAMPLE

IIFEs ARE COMING UP SOON SO NO NEED TO MENTION HERE

#### Nested Functions
This example demonstrates a nested function. `calculateSquare` is effectively a private function that is only available within `addSquaresOfNumbers`. The choice of functions in this example is purely for demonstration

    var addSquaresOfNumbers = function (x1, x2) {

	    var calculateSquare = function (x) {
	        return x * x;
		};

        return calculateSquare(x1) + calculateSquare(x2);
	};

    // This line outputs 25.
    console.log(addSquaresOfNumbers(3, 4));

Here `calculateSquare` is too general to be available only available within the containing function but are plenty of situations where nested functions are of great value.

A more important thing to note is that the function it is assigned to is **recreated** every time `addSquaresOfNumbers` is called and destroyed when the `addSquaresOfNumbers` exits.

> Note: For the above reason, it is imperative that you do not define nest functions within within functions within any form of loop or iterator. This mistake could easily be made from within the callback parameter of a call to a jQuery `each()` method, e.g. `$("li").each(function { ... })`. Here, if you decided you wanted to encapsulate a piece of UI manipulation logic into a function which stated what it was doing, instead of just a series of jQuery calls, you should make sure it is define outside the `each` statement.

#### Closures
Technically, a closure is a function held together with captured parts of the environment in which it was created.

They are nested functions that reference variables that were defined in an enclosing scope. These functions "remember" the environment/context in which they were created.

Function parameters and variables, either declared inside or outside the function, which would normally go out of scope and get destroyed are "held on to" if they are referenced by a nested function.

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
    console.log(indicateHowManyTimesCalled());			// outputs 1
    console.log(indicateHowManyTimesCalled());			// outputs 2
    console.log(indicateHowManyTimesCalled());			// outputs 3

`counter` is a private variable within the `createIndicateHowManyTimesCalledFunction` function. Normally, when that function has returned, the variable will go out of scope and be destroyed. However, because the nested `indicateHowManyTimesCalledFunction` function refers to it, it is implicitly held on to and its value can later be modified.

> Note that a closure would have been created even if the `counter` variable was not modified within `indicateHowManyTimesCalledFunction`, merely referenced.

> Note: The variable being referenced by the closure here was in the immediate parent function. However, it is not restricted to just one level up.

> Note: As well as well as in the above example, the closure may also refer to `parameters` of its ancestor functions. This will be seen later. It allows us to initially supply the values referenced by the closure from an external source.

Closures are very powerful and one of the few supreme features of JavaScript.

#### Handling a Variable Number of Parameters
In reality a function is an object. (LEAVE THIS UNTIL MENTION STANDARD OBJECTS, otherwise will confuse)

The looseness of JavaScript manifests itself not only via the dynamic typing of variables but but the fact that, although you define a function with a particular number of parameters, it can be called with **any number** of parameters without causing an error.

Much of the time you would intend a function to be called with the same parameter set as is in its definition. However, this is not always the case. You can supply any number of parameters. However, a function would certainly need to have been written in such a manner as to be able to handle this situation.

If you call a function supplying **fewer** parameters than is in its definition the values of the surplus parameters will be `undefined`. One use of this concept is to provide optional parameters for which a default value may be used within the function if the parameter is not supplied. This document does not recommend wide usage of this technique since there are other ways to achieve this behaviour without having a varying number of parameters, e.g. a function accepting one object parameter whose properties will be set to certain defaults if undefined.

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

You can also supply **more** parameters to simulate the equivalent of a C# _params_ argument. For this you will need to access the `arguments` property of the function, which will allow you to access each parameter via an array. Strictly speaking, it is not an exact array but more about this later.

	var sum = function () {
	    var result = 0;
	    for (var i = 0; i < arguments.length; i++) {
	        result += arguments[i];
	    }
	    return result;
	}

	console.log(sum(1, 2, 3));              // 6
	console.log(sum(-10, 1, 1, 1, 1, 1));   // -5
	console.log(sum());                     // 0

### <a name="language-calling-functions"></a>Calling Functions
Below are brief explanations of the different ways that a function can actually be called. We will not go into too much detail as, other than for the first method, we will need to understand about objects in JavaScript and the `this` keyword.

<p>        D81 - D97</p>
#### Ordinary Call
This is the most common way and the method used so far in the examples above. Remember that you don't necessarily have to supply the same number of parameters as is in the function definition. However, unless the function has been specifically written to handle a varying number of arguments, unwanted side effects are likely to occur at some point.

#### Preceded by the `new` Keyword
Call `object constructor` functions by preceding the call with the `new` keyword. Specifically, it instructs the runtime that, within that function, the `this` keyword will refer to the object being created and returned by that constructor function.

	function Person(first, last) {
	    this.firstName = first;
	    this.lastName = last;
	}

	var myFather = new Person("Michael", "Jackson");

> Generally functions are named using camelCase. However, object constructor functions are conventionally named using Pascal case strictly as a visual instruction that calls to them should be preceded by `new`. More on those later.<br />
> It is important that you stick to the above convention. It should override any notions of consistency. For example, later you will see patterns where a function is _effectively_ a constructor, in that its purpose is to create a particular object, but it is not in the form of object constructor above and a call to it should not be preceded by the `new` keyword. In this case it should have a camelCase name.

TOMOVE?: The above should maybe be moved to section 2 (style requirements). First > maybe above and repeated, prob move second >.

#### Via `call` or `apply` Keywords
Both these **methods of the function prototype** allow you to call the function by specifying what `this` will be referring to within that function.
For both of these, the object which represents `this` is supplied as the first parameter. The difference is that `apply` accepts an array containing all the arguments to be supplied to the function call as its only other parameter whereas `call` accepts each parameter individually...

    myFunction.apply(thisArg, [argsArray])
    myFunction.call(thisArg[, arg1[, arg2[, ...]]])

USEFUL EXAMPLE USAGE


CAN LEAVE THIS ONE OUT AS IT IS NOT STRICTLY FOR calling a function.
#### Via `eval()`
This is actually...


TO MOVE: Put the IIFE section here.


### <a name="language-immediately-invoked-function-expressions"></a>Immediately Invoked Function Expressions
<p>    Closures.</p>
<a target="_blank" dummy="_" href="http://jibbering.com/faq/faq_notes/closures.html">http://jibbering.com/faq/faq_notes/closures.html</a>
<p>        http://javascript.crockford.com/private.html</p>
<p>        Golden parentheses</p>

### <a name="language-objects"></a>Objects

LEAVE THIS SECTION TILL LATER (just add notes to it).

<p>    Objects</p>
<p>        1: declaration</p>
<p>        myCar["make"]                   D16</p>
<p>        http://www.w3schools.com/js/js_properties.asp</p>
<p>        Prototype</p>
<p>        toString() and other members in the Object prototype</p>
<p>        Augmenting with additional methods</p>
<p>        Adjusting existing methods</p>
<p>    Arrays</p>
<p>        1: declaration</p>
<p>            adding properties after declaration</p>
<p>    Strings</p>

Hashtable - can access properties via two notations .aaa    ["aaa"]. Can even put spaces in properties via second notation.

Constructors instead of classes.

In order to become proficient in JavaScript, a firm understanding of `objects` and `prototypes`, as well as its functional programming concepts, is essential.

>Note: Objects may be a crucial part but there is **no such thing as classes** in this language so do not rely on your understanding of C# classes and objects.

TODO: Need to explain enough in this section and WILL therefore need one or more code samples (maybe prefer proper object syntax as that will introduce reader to `this` and `new`).

Objects in JavaScript are mutable keyed collections. In JavaScript, arrays are objects, functions are objects,
regular expressions are objects, and, of course, objects are objects.
An object is a container of properties, where a property has a name and a value. A property name can be any string, including the empty string. A property value can be any JavaScript value except for undefined.
Objects in JavaScript are class-free. There is no constraint

<p>    prototype</p>
<p>    JSON notation</p>

There is no equivalent of C# classes in JS, just objects and their prototypes.

Objects all have a `prototype` property which specifies what object they are based on and this can form a chain... Objects created (1) via direct creation of object using JSON syntax, (2) returned from a function call (which may be an ordinary function or a constructor function, which needs to be preceded by the `new` keyword).
In theory, members can be removed from an object using the `delete` but "In modern JavaScript engines, changing the number of properties on an object is much slower than reassigning the values."

MENTION: Prototype chains - ultimately the chain leads to the Object prototype.
WHAT EXACTLY IS A PROTOTYPE AND HOW DOES IT DIFFER FROM AN OBJECT? It is an object
	TO MENTION: (redefine members at any point - when some one reads a prop it will first look at object then at its prototype then along the prototype chain until it finds match - writing always attaches to the object itself, any properties of the same name within the prototype chain will still remain but will not be reached when trying to fetch via the object)


Think that now appreciate the use of Object.create(prototype) when using functional style to define objects (because the IIFE returns the PROTOTYPE, with the methods defined in


[http://www.w3schools.com/js/js_object_prototypes.asp](http://www.w3schools.com/js/js_object_prototypes.asp)

[https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/prototype](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/prototype)

Object.create(Person.prototype);

[http://thecodeship.com/web-development/methods-within-constructor-vs-prototype-in-javascript/](http://thecodeship.com/web-development/methods-within-constructor-vs-prototype-in-javascript/)

> Beware, if ever want to maintain complex hierarchies, that if not properly maintained the prototype chain can break. No one ever said JavaScript was rock solid, it just needs to be handled with care.
> [https://developer.mozilla.org/en/docs/Web/JavaScript/Inheritance_and_the_prototype_chain](https://developer.mozilla.org/en/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)


can dynamically add and delete members of objects. MENTION SOME OF THE THINGS but refer the reader to other sources for this mor advance topic.



### <a name="language-this-keyword"></a>The this Keyword
The `this` keyword generally refers to the scope that you are in, i.e. the global scope or a function.
this means (1) the object you are constructing within a ctor fn (EXCEPT), (2) and in an externally created method, (3) the global object, (4) if fn is called with `call` or `apply` then the object represented by `this` is controlled from that call - applications...







### <a name="language-types"></a>Standard Types
The word `type` has been used but, as mentioned, there are no classes. However, there are certain standard `prototype` objects built into JavaScript which achieve a similar effect to classes.

#### <a name="language-types-primitive"></a>Primitive Types (string, number, boolean, undefined, null)
As well as objects, ES5 has five primitive types: `boolean`, `number`, `string`, `undefined` and `null`. Primitives are only things that will be copied/referenced by value. All other "types" are objects. If you make one object equal to another they will effectively be pointers to the same object.

`boolean`, `number` and `string` have their own special forms of constructor. They actually have their own object constructor equivalents (`Boolean`, `String` and `Number`). JavaScript will readily coerce between these primitives and object wrappers behind the scenes but you can detect their type using `tyepof`:

	var myInteger = 5;
	var myFloat = 6.7;
	var myHexadecimal = 0xff;
	var myBool = true;
	var myString = "Hello";

	console.log(typeof myInteger);		    // "number"
	console.log(typeof myFloat);			    // "number"
	console.log(typeof myHexadecimal);		// "number"
	console.log(typeof myBool);				    // "boolean"
	console.log(typeof myString);			    // "string"

You can create them via their object constructor equivalents although their type will then be `object`. Actually, for whatever arcane reason, calling any of those 3 contructors _without_ the new keyword _will_ result in them having the correct type. However, there is nothing to be gained by doing so. **You are advised not to use these constructors directly**. Stick to the styles which use the more intuitive literals that are in the above example, not the one below.

	// Don't use these.

	var myString1 = new String("Hello");
	console.log(typeof myString1);			// "object"

	// Without the new!
	var myString2 = String("Hello");
	console.log(typeof myString2);			// "string"

##### <a name="language-types-string"></a>string
Technically, primitives do not have members. However, because of the object wrappers, you do have access to members of those objects:

	var myString = "Hello";
	console.log(myString.length);			// 5

There are quite a number of particularly useful String member links. The following [w3schools link](http://www.w3schools.com/jsref/jsref_obj_string.asp) link lists them. You can also see the String global object in [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String).

You can browse view the different methods made available via the String object prototype. Some
are useful, others not. For simple string processing many are fine. For more complex stuff you may want to use the methods which work with RegExp objects (explained in [RegExp](language-types-regexp) further down). You could alternatively some third party library, like string.js, or pinch something off Stack Overflow. Here are some examples:

	console.clear();

	var words = "The cat sat";
	console.log(words.length);								// 11
	console.log(words.indexOf("at"));					// 5
	console.log(words.lastIndexOf("at"));			// 9
	console.log(words.toUpperCase());			    // "THE CAT SAT"
	console.log(words.charCodeAt(5));			    // 97

	// This one is case-sensitive and will only replace the first occurrence.
	// Use regular expressions if want to achieve something more complex.
	console.log(words.replace("t", ""));			// "The ca sat"

	console.log("*".repeat(10));							// "**********"

	// "hello".
	// However, trim() is not defined in IE8. You will need to add a shiv.
	console.log("  hello  ".trim());

	// A string can be treated like an array and has some similar methods and properties.
	console.log(words[4]);										// "c"
	console.log(words.split(" "));						// ["The", "cat", "sat"]

	// Concatenate strings.
	var myWords = "The " + "quick brown " + "fox"
	console.log(myWords);											// "The quick brown fox"

	// Two different strings instances are equal if they contain exactly the same characters.
	console.log("eggs" === "eggs");

	// Default string comparisons not especially useful.
	// They rely on the ASCII code of the letters.
	// This is false because the code for "a" is greater than the code for "Z".
	console.log("aardvark" < "Zoo");					// false

> Note: Be careful with browser compatibility when using these methods. Nearly all of them are fully compatible. One notable exception is `String.prototype.trim()`, which is only compatible in IE9. Bear this in mind if you need to support IE8.<br />
You can include a [shim](https://github.com/es-shims/es5-shim) at the start of your code to overcome this or use jQuery, e.g. `$.trim("    hello, how are you?    ")`

> `ES2015`: As well as using either single or double quotes you can also put a string within a `literal template` (surrounded by back ticks). These can span multiple lines without the need for string concatenation. You can also put expressions within the template and there calculated value will be used within the string that is output.

	var person = { firstName: "John", surname: "Smith" };
	var message = `Hello ${person.firstName} ${person.surname}`;

	console.log(message);			// "Hello John Smith"


##### <a name="language-types-number"></a>number
As you can see `number` covers both integers and floating point numbers.
Numbers are always 64 bit floating point values (according to [w3schools](http://www.w3schools.com/js/js_numbers.asp)).

The hexadecimal initialisation will store the number in base 10. However, you can still continue to use that notation for value comparisons or bitwise logical operations like this bitwise or:

	var myHexadecimal = 0xf0;
	console.log(myHexadecimal | 0x0f);		// 255    (i.e. 0xff)

There are also some special values for numbers: `Infinity`, `-Infinity`, `NaN` (Not a Number) and negative zero `-0`. You will do not get "divide by zero" errors in the code below:

	console.log(1 / 0);		     // Infinity
	console.log(-1 / 0);		 // -Infinity
	console.log(0 / 0);		     // NaN
	console.log(-0.0);		     // -0
	console.log(-1 / Infinity);	 // -0

	// Infinity === Infinity
	if (10 / 0 === 50 / 0) {
			console.log("10 / 0 === 50 / 0");
	}

The [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) prototype object provides far fewer useful methods for numbers than the String object does for strings.

	var x = 127.5678;
	console.log(x.toFixed(2));					// 127.57
	console.log(x.toExponential(2));		// 1.28e+2

The [Math](#language-built-in-objects-math) object (defined in the "Commonly Used Built-in Object Methods" section) provides a lot of mathematical functions.

##### <a name="language-types-boolean"></a>boolean
Boolean does not add any particularly useful methods beyond `toString()`, which is ultimately inherited from the Object prototype.

##### <a name="language-types-undefined"></a>undefined
`undefined` is useful for determining if a variable, function parameter or class member, has actually been initialised.

	var myVariable;

	console.log(typeof myVariable);	// "undefined"

	// You could use == here if you really wanted, given that typeof returns a string.
	if (typeof myVariable === "undefined") {
	  console.log("myVariable has not been given a value");
	}

> NOTE: The above example uses the **standard** method for testing if something is undefined. This is particularly good because browsers will not throw an exception if the variable has not been declared, as may be the case if you had used `if (myVariable === undefined)`.

One of the many mistakes in the JavaScript language is that, certainly in older browsers, `undefined` can be manually set to _any_ value. For this reason you may see code which mentions `void(0)` (as this is always undefined). You may also see code which employs the trick of declaring a final function parameter called `undefined` but does not supply that parameter when calling the function.

##### <a name="language-types-null"></a>null
Although `null` is said to be a primitive type it is really more a primitive value for an object. Its type is object. However, this is only because of a bug in ES5. In ES6 it has been fixed and null is more like a genuine primitive type.

	var myNull = null;
	console.log(typeof myNull);				// "object"

Unlike `undefined`, `null` is a genuine value which can be used within your logic.

It is a value which your code or a third party library will actively assign as the value of a variable or object member, e.g. if a value is optional.
TO MY KNOWLEDGE no native JavaScript code will generate a null value. It is probably best viewed as a value rather than as a type.

#### <a name="language-types-array"></a>Array
Declare array using the array literal syntax, with square brackets. A maximum size for the array cannot be specified.

When accessing member of the array, specify a zero-base index within square brackets. If you try to access an index which the array does not contain a value for there will be no error, `undefined` is returned.

	var languages = ["French", "German", "English", "Spanish"];
	console.log(languages[2]);										// "English"
	console.log(languages[9]);										// undefined

    // However, we can set an index that was not in the original definition.
	languages[9] = "Chinese";
	console.log(languages[9]);										// "Chinese"

	console.log(typeof languages);		                            // "object"
	console.log(languages instanceof Array);		                // true

	var emptyArray = [];


Although you can use the use Array constructor directly e.g. `new Array(4, 5, 6)` this is untidier, error-prone and strictly advised against. There is a constructor which accepts an initial length but it does not prevent you from getting and setting indexes outside that length.

You can mix the types held within the array:

	var mixedTypes = [123, "Hello"];

Multi-dimensional arrays in JavaScript are rather like jagged arrays in C#. A two dimensional array is more like an array of arrays:

	var twoDimensionalArray = [[1, 2], [3, 4], [5, 6]];
	console.log(twoDimensionalArray[1][1]);				// 4
	console.log(twoDimensionalArray[2]);				// [5, 6]

	// This syntax should not be used. It does not error but, instead, only
	// the last number is used, so it is like twoDimensionalArray[0]
	console.log(twoDimensionalArray[1, 666, 0]);		// [1, 2]

When you create an array you create an object which has the Array object as its prototype. This object gives you access to the `length` property and many useful methods.

See [MDN - Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) or
[w3schools - Array](http://www.w3schools.com/jsref/jsref_obj_array.asp) for more information on members of the Array object. We will limit our examples here.

`push` and `pop` allow you to add or remove items to the end of the array. In a similar way `unshift` and `shift` (correspondingly) allow you to do the same but at the beginning of the array.

	var fruits = ["Apple", "Banana"];
	var newLength = fruits.push("Orange");
	console.log(fruits);					       // ["Apple", "Banana", "Orange"]
	console.log(newLength);				           // 3

	var itemRemoved = fruits.shift();
	console.log(fruits);					       // ["Banana", "Orange"]
	console.log(itemRemoved);					   // "Apple"

`slice` creates a shallow copy. Not sure why they called it that.

	var fruits = ["Apple", "Banana"];
	var shallowCopy = fruits.slice();
	fruits[0] = "Orange";
	console.log(shallowCopy[0]);				   // "Apple"

Splice generally means joining together two pieces. However, confusingly, the `splice` method actually allows you to split an array by removing a particular number of items starting from a particular index of the array an returning them in a separate one. The parameter for the number of items is optional.

	var array1 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

	// Remove 3 items starting with the one at array1[4]
	var array2 = array1.splice(4, 3);
	console.log(array1);					   // [0, 1, 2, 3, 7, 8, 9]
	console.log(array2);					   // [4, 5, 6]

##### Functional Programming Libraries
There are third party libraries, like [lodash](https://lodash.com/) and [lazy.js](http://danieltao.com/lazy.js/), which add far richer, functional-style data manipulation of arrays (and other objects in general. Here is a simple example (although there are JavaScript map and reduce methods which work in IE9):

	_.map([1, 2, 3], function (n) { return n * 3; });	// [3, 6, 9]

<a dummy="_"></a>


#### <a name="language-types-date"></a>Date
The `Date` object allows you to create the equivalent of the C# `DateTime`s. Given the constant problems we have experienced with dates, times, time zones and cultures, even in more sophisticated languages and frameworks, we will not over-elaborate, just highlight its existence.

[w3schools - JavaScriptDate Reference](http://www.w3schools.com/jsref/jsref_obj_date.asp)

[w3schools - JavaScript Date Formats](http://www.w3schools.com/js/js_date_formats.asp)

[MDN - Date](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Date)

	var d = new Date("2015-03-25T12:00:00");
	console.log(d);										// Wed Mar 25 2015 12:00:00 GMT+0000 (GMT Standard Time)
	console.log(d.getFullYear());			// 2015

	// This one comes back with 3 for the day!
	// It immediately highlights a chink in the armour.
	console.log(d.getDay());					// 3

	// In this constructor the month parameter is 0-based but
	// the other two are 1-based.
	var d2 = new Date(2000, 1, 1);
	console.log(d2);										// Tue Feb 01 2000 00:00:00 GMT+0000 (GMT Standard Time)

	var d3 = new Date(1474525800000);
	console.log(d3);										// Thu Sep 22 2016 07:30:00 GMT+0100 (GMT Summer Time)

One of the more sophisticated third-party libraries available for JavaScript is [moment.js](http://momentjs.com/). It does cater for:

* String parsing
* Comparisons and differences
* Addition of time spans
* Formatting for display
* Different date/time standards, e.g. UNIX timestamp and ISO 8601
*	Time zones
* Cultures

For anything other than basic usage it is probably best to use something like this above the built-in functionality.

#### <a name="language-types-regexp"></a>RegExp
`RegExp` objects allow you to perform more complex string parsing and manipulation, via regular expressions, than you can with most of the `String` object methods. Note that the `String` object contains a handful of methods designed to work with `RegExp` objects, notably `match()` and `replace()`.

This document is no about regular expressions is given here. Plenty of information exists online, e.g. at [Regular-Expressions.info](http://www.regular-expressions.info/). A good testing environment can be found at [regex101.com](https://regex101.com/).

There is a special syntax for declaring [RegExp](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/RegExp) literal (so there is no need to create one using `new RegExp("...")` syntax. It involves use of the `/` character as a delimiter: `var myRegexp = /<regexp text>/`. Additional `flag` characters may be included at the end (after the closing `/`) to modify its behavior, e.g. /.../`g` for a global match (find _all_ occurrences) or /.../`i` to specify that case should be ignore.  

Below are a couple of not very sophisticated examples. Note that the `replace()` method is capable of accepting a function through which the user can implement a more sophisticated replacement algorithm, and takes into account what was found, than just globally replacing all matches with a static string.

	console.clear();

	// match().
	var csvLine = "111, 222, false, 444, 888";

	var arrayOfAllNumbers = csvLine.match(/\d+/g);
	// This outputs ["111", "222", "444", "888"].
	console.log(arrayOfAllNumbers);

	// replace().
	var convertToSnakeCase = function (text) {
		// Define a RegExp with the global modifier which finds all non-word characters.
	  var regexp = /\W+/g;
		var snakeCase = text.toLowerCase().replace(regexp, "-");
		return snakeCase;
	};

	// This outputs "my-object-container".
	console.log(convertToSnakeCase("My    object container"));

#### <a name="language-types-object"></a>Object
FINISH WHEN DONE MORE ON objects

If you follow the prototype chain of any object in JavaScript it will ultimately lead back to the `Object`. This means that all objects in JavaScript have access to its members.

NOTE: SOME ARE PROTOTYPE things... which access via the object. OTHER METHODS are used using the `Object` object itself (a bit like static methods). NEED TO BOTTOM THIS.

It does have a `toString()` method, although this is not particularly useful. Other more specific object prototypes define their own, more specific versions, e.g. Array will return all its item values in a comma-separated string.

This function iterates through all the properties of an object and uses the `hasOwnProperty` method to log information about the ones which belong to the object itself and are not inherited via the prototype chain. It also contains one of the few generally accepted uses of the `for ... in` clause (see later) (LINK THEM TO IT).

	// Outputs properties of an object that are defined directly with the object
	// and not inherited from the prototype chain.
	var outputOwnProperties = function (obj, objName) {
	  for (var property in obj) {
	    if(obj.hasOwnProperty(property)) {
	      console.log(objName + "." + property + " = " + obj[property]);
	    }
	  }
	};

	console.clear();
	var obj = {a: 1, b: 2};
	outputOwnProperties(obj, "obj");

For this simple object, removing the condition containing `hasOwnProperty` will not make any difference BUT CAN THEN SHOW THE PROTOTYPE ONE.


Although you can easily define properties of an object on the fly using `person.newProperty = "Fred"` or `person["newProperty"] = "Fred"` XXXthe object prototype gives you licence to add,
define and remove properties (although can add via .fdfg= or ["hhuj"] =
.........
WE DELETE PROPERTIES using `delete` keyword. These members are not inherited prototype methods.

freezing.    The delete silently fails after the `freeze` call. `Object.preventExtensions()` will prevent anyone from adding new properties, `seal` prevent deletion but not modification...

	var obj = {a: 1, b: 2};
	outputOwnProperties(obj, "obj");

	Object.freeze(obj);

	delete obj.b;
	obj.a = 58;
	obj.c = 39;
	outputOwnProperties(obj, "obj");

object.create()


According to [https://developer.mozilla.org/en/docs/Web/JavaScript/Inheritance_and_the_prototype_chain](https://developer.mozilla.org/en/docs/Web/JavaScript/Inheritance_and_the_prototype_chain), "In short, prototype is for types, while Object.getPrototypeOf() is the same for instances."

	console.clear();

	var outputOwnProperties = function (obj, objName) {
	  for (var property in obj) {
	    if(obj.hasOwnProperty(property)) {
	      console.log(objName + "." + property + " = " + obj[property]);
	    }
	  }
	};

	var triangle = {a:1, b:2, c:3};

	// Define the ColouredTriangle and its prototype.
	function ColouredTriangle() {
	  this.color = "red";
	}
	ColouredTriangle.prototype = triangle;

	var ct = new ColouredTriangle();

	console.log(ct);
	outputOwnProperties(ct, "ct");

	// MORE RESEARCH NEEDED. See not above code sample.
	console.log(ct.prototype);
	// undefined (maybe only for use with constructors)

	var t = Object.getPrototypeOf(ct);
	console.log(t);		// Object {a: 1, b: 2, c: 3}
	outputOwnProperties(t, "t");

	var o = Object.getPrototypeOf(t);
	console.log(o);		// Object {}
	outputOwnProperties(o, "o");


[MDN - Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)

#### <a name="language-types-function"></a>Function
Functions have been explained above.
HOWEVER, can highlight members of the function object here.
Explain that functions are actually objects...

##### <a name="language-types-arguments-property"></a>arguments Property   DONE
According to documentation `arguments` is a separately available object and is not technically accessed via the `arguments property` of a Function. When control enters the execution context of a function an `arguments` object is created.

arguments.length
arguments[_indexer_]

The arguments object is not an Array. It is similar to an Array, but does not have any Array properties except length. For example, it does not have the pop method. However it can be converted to a real Array:

	var args = Array.prototype.slice.call(arguments);

`arguments` does have two potentially useful looking properties (maybe for dirty hacks) but use of these is not advised. `caller`, a reference to the function which called the current function, is obsolete. `callee` is a leftover from the days when named function expressions did not exist and we wanted an anonymous function to call itself recursively.

(ADD TO FURTHER UP)
We can now name our anonymous functions (:D) as below. The IE9-compatible Array map was used for convenience of demonstration, although ES5 shim will make it usable in lower versions):

	var o =	[1,2,3,4,5].map(function factorial (n) {
		return !(n > 1) ? 1 : factorial(n - 1) * n;
	});

	console.log(o);

See [arguments object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments)












### <a name="language-javascript-keywords"></a>JavaScript Keywords
Most the of the language keywords in JavaScript behave pretty much the same as in other C-based languages. It would be pointless explaining them all again. Below are keywords which behave a bit differently from C# or are not in the language at all.

#### for...in
`for...in` loops are not as nice as they are in C#. The iterator object within the clause does _not_ contain the an object that is within the object/map/hash/array being iterated through. It contains the `key`. You then need to use that key to access the value. For this reason `for` loops are often preferred for processing arrays. The use of `for...in` generally being restricted to a few conventional situations, like iterating through all the properties of an object.

	// Iterate through an array. Not nice.
	var myArray = ["The", "quick", "brown", "fox"];
	for (var key in myArray) {
		  // In this case key is the array index. You then need to fetch the object.
	    console.log(myArray[key]);
	}

	// A common use. Iterate through all the properties of an object that are attached to the
	// directly to the object itself and not inherited.
	// Remember that an object in JavaScript is a collection of properties.
	for (var property in obj) {
	    if(obj.hasOwnProperty(property)) {
			    console.log(objName + "." + property + " = " + obj[property]);
		  }
	}

ES2015 introduces an alternative `for...of` which provides behaviour that is more like the C# `for...each`. You can also use jQuery's $.each() statement.


#### switch, select...case
In C# you will get a compile time error if you do not put `break` statements at the end of your `case` clauses. This is not a requirement in other languages, including JavaScript. If there is no `break` statement the code within the next case will be executed **even if** its case value is not matched (and so on through all subsequent cases until the next `break` or the end of the whole `switch` statement).

This is just for your information, it is not generally wise to omit break statements at the end of your case clauses.

#### throw
You throw _any_ object, primitive or complex. There is no conventional structure like the Exception in C#.

#### try...catch...finally
The fact that any type of primitive or object can be thrown means that there will be _at most_ one `catch` clause and the code within it will deal with the structure of any exceptions that could be thrown within the `try` clause. This is as opposed to the multiple catch clauses you can add in C#.

#### with
Avoid this. It is like the Visual Basic equivalent and allows the user to avoid making repeated mentions of an object within a block of code.      Use of "with" keyword is generally intensely disapproved of as . It is also deprecated.
This simple example probably doesn't highlight the problem but, if the `with` statement was bigger, the code could become rather confusing.
Two properties of `Math` are used below: `Math.cos()` and `Math.PI`. `pi` is _not_ a property of `Math` (it is a variable that was declared earlier on in the code) but this is not immediately obvious to the reader. It may reduce the code but also reduces readability. If you wanted to avoid repeating quite a long object name within a section of code you could always declare an alias that had a short, even one letter, name and use that within the section.
```
with (Math) {
	pi = PI;
  console.log(cos(pi));				// -1
}
```

#### typeof            instanceof ...   any other object-related ones
TODO: THESE CAN ONLY BE DONE, HERE OR IN THE RELEVANT SECTION ABOVE, WHEN WRITING ABOUT OBJECTS.


### <a name="language-reserved-words"></a>Reserved Words
[http://www.w3schools.com/js/js_reserved.asp](http://www.w3schools.com/js/js_reserved.asp) lists the keywords that are reserved for JavaScript.

They are not necessarily used by the language at present. It may be that they are not used in ES5 but are used in later versions of JavaScript, like ES2015 (the new name for ES6). `float`, `double`, `interface`, `public` and `private` are examples of words that are not used by ES5. The main thing to bear in mind is not to use any of the keywords that your version of JavaScript does not utilise.

```
Do not use these words as variable or function names. Your code may break if you upgrade to using a later version of JavaScript.

// For example, it may be tempting to use, public or private.
var public = {
	...
};
```


### <a name="language-truthy-and-falsy"></a>Truthy and Falsy
In JavaScript we have the values `true` and `false`. However, _any_ variable can be used within boolean logic without giving an error. An implicitly-generated boolean value will be used. This coercion is referred to by the community as `truthy` and `falsy` (or falsey).

The concept is best explained by listing all the `falsy` values, i.e. the ones the runtime classes as `false` first:

*	false
*	null
*	undefine
*	NaN
*	0 or +0 or -0 (zero)
*	"" or '' (empty string)

**All** other values, including objects that have been initialised, are classed as `truthy` and the runtime will class them as being `true` within a boolean expression.

#### Examples
*** TODO: Truthy and falsy and really affect boolean detection within conditions. It affects comparison operators less. For example, just because false and null are both falsy does not mean that they are equal when compared with each other, even just for equality:

	console.log(false == null);			// false.


```
console.log(undefined == null);		 // true
console.log("" == 0);		           // true
// Of course, if you use ===, the types of both sides will be equated as well.
console.log("" === 0);		         // false

// An exception: There is an extra IEEE standard which states that NaN can never equal itself.
// This is because the value NaN is designed to propogate throughout a calcultaion, i.e. if some part
// of an expression equates to NaN, e.g. 0 / 0, the whole expression will equate to NaN.
// Not allowing NaN to equal itself was seen as a means of avoiding obscure errors. Others may says that
// throwing a runtime error is a better alternative.
console.log(NaN == NaN);		       // false
console.log(0 / 0);

// Find the equivalent boolean value of an expression. You can do this by "not"ing a value twice.
console.log(!!undefined);          // false
console.log(!!null);  	           // false
console.log(!!0);	                 // false

// 0 within quotes is a non-empty string and is therefor truthy.
console.log(!!"0");	               // true
```

#### Uses
It is really only used for writing less cluttered code **but** in places where the user **knows** the context, e.g. a variable will only equal particular type(s) due to the structure of their code. It could be used to write some really obscure code that only you can understand but nobody recommends this.
```
// Only set the value of any object variable to something different if it does not have a value already.
// The "know context" here is that obj is only assigned to objects and will never be used to contain a value of another type, e.g. 0 or "".
obj = obj || newValue;

// A shorthand way of detecting if the length of something is non-zero.
if ($(".my-class").length)
```

[https://www.sitepoint.com/javascript-truthy-falsy/](https://www.sitepoint.com/javascript-truthy-falsy/)

> NOTE: Truthy and falsy only affect boolean evaluations, e.g. in if statements or ternary expressions. They do not affect comparisons. So, for example, the fact that `null` and `false` are both falsy does not mean that they will ever be equal when compared

```
	// null, false and 0 are all falsy but when compared with each other they are not equal.
	console.log(null == false);			// false
	console.log(0 == undefined);		// false
```


### <a name="language-operators"></a>Operators
Same as C#, with the same operator precedence rules with a few exceptions.
[MDN - Operator Precedence](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Operator_Precedence).

#### Comparison Operators & Equality
There are basically two pairs of these operators.

##### Equality Operators
> NOTE: Avoid these in favour of the `identity operators` further down unless you know what you are doing.

`==` and `!=` are the equality operators. They only compare two values and not their types. In actual fact, if they are of different types and are not both objects, the runtime will try to coerce the type of the value on one side into the type that the other side is and then compare them. This can lead to errors that are difficult to detect. Rather than make some pointless attempt to explain how this coercion works we will just present some examples. With type coercion taking place the results are hard to predict.

	console.log(0 == '');							// 1: true
	console.log('0' == 0);						// 2: true
	console.log(0 == false);					// 3: true

	console.log(0 == null);						// 4: false
	console.log(0 == undefined);			// 5: false

	// Despite the fact that they were both == 0, null and undefined are not ==.
	console.log(null == undefined);		// 6: true

	console.log('true' == true);			// 7: false
	console.log(3 == '3');						// 8: true

If both the values being compared are objects then equality is determined by whether or not they refer to the same instance of an object:

	// Two separately created objects have different references,
	// even if they have the same properties with the same values.
	console.log({a: 3} == {a: 3});		// false

	var x = {myProperty: "hello"};
	var y = x;
	console.log(x == y);							// true


##### Identity Operators
`===` and `!==` are the identity operators.
They are **far safer** and you should **prefer these** over the ordinary equality operators. Although there are situations where you can use the equality operator without a problem, e.g. if you _know_ that the two variables being compared are of the same type, there is _no_ situation where use of the identity operators produces bad results. Here we present the eight examples from further up again but this time using ===. As you can see the results are much more intuitive.

	console.log(0 === '');               // 1: false
	console.log('0' === 0);              // 2: false
	console.log(0 === false);            // 3: false

	console.log(0 === null);             // 4: false
	console.log(0 === undefined);        // 5: false
	console.log(null === undefined);     // 6: false

	console.log('true' === true);        // 7: false
	console.log(3 === '3');              // 8: false

	// Here the types are the same.
	console.log(3 === 3);                // true
	console.log('3' === '3');            // true
	console.log(true === true);          // true
	console.log(Infinity === Infinity);  // true

	// Two instances of NaN are never equal.
	console.log(NaN === NaN);            // false


> NOTE: When editing legacy code, be careful about replacing occurrences of the equality operators with their identity operator equivalent, e.g. if a linter or hinter highlights that you should. It may be that the code previously "worked but for the wrong reasons". Your "improvements" may result in the code not then behaving as previously expected.

[w3schools - Comparison and Logical Operators](http://www.w3schools.com/js/js_comparisons.asp)


#### + and - With a Mixture of Strings and Numbers
Numbers could be automatically converted to strings or vice versa. Here the `+` is seen as string concatenation. However, the `-` is only a numerical operator and so the runtime tries to convert the string to a number:

	var x = 5 + "7";     // x.valueOf() is 57,  typeof x is a string
	var x = "5" + 7;     // x.valueOf() is 57,  typeof x is a string
	var x = "5" - 7;     // x.valueOf() is -2,  typeof x is a number

#### typeof
TODO...

#### instanceof
TODO...

#### new
As previously explained, in JavaScript, does not magically created a new instance of an object.
In realty, it is an operator that, when placed before a call to a function:

*	Implicity creates an object whose PROTOTYPE/CONSTRUCTOR is the function and makes any reference to `this` immediately within the function refer to that object.
* That object will be Implicity returned by the function.

This means that the function will have to have written to expect this behaviour. It will then be known as a `constructor function` and these should always be called using the `new` keyword, whereas ordinary functions should _never_ be called using the `new` keyword.

  NOTE: Generally functions are always named using **camelCase**. However, due to what is said in the above paragraph, it is conventional for `constructor functions` to have a name that is **Pascal Case**. This is a visual indication to consumers that it should be preceeded by the `new` keyword when called.

#### Warning About Line Breaks Near Operators
Put your operators, e.g. with ternary operator and string concatenation, at the **end** of lines they are next to a line break. **Do not** put them at the start of the next line, as is often done with ternary operators in C#. This is because some browsers try to _infer_ a line ending where a semi-colon is missing and may well do it wrongly of the code on a "part line" looks complete. If the operator is at the end the silly browser will be able to work out that there is more to come.

#### New Operators in Later JavaScript Versions
Although this document is primarily concerned with ES5 we may as well mention a small number of operators in upcoming versions.

##### Spread Operator (ES2015)
`...` is the `spread` operator. It is used for "destructuring arrays", i.e. converts an array into a series of separate values which can be used in situations where a comma-separated series of values are required, most notably parameters to a function call.

	// Push all the values from one array into another. The push method
	// only accepts separate arguments, not arrays.
	var array1 = [1, 2, 3];
	var array2 = [4, 5, 6];
	array1.push(...array2);
	console.log(array1);           // [1, 2, 3, 4, 5, 6]

	// Math.min does not accept on form of collection.
	var myNumbers = [24, 36, 8, 72];
	var smallest = Math.min(...myNumbers);		// 8
	console.log(smallest);

	var someFigures = [1, 2, 3, 4];
	var allFigures = [...someFigures, 5, 6, ...[7, 8]];
	console.log(allFigures);       // [1, 2, 3, 4, 5, 6, 7, 8]


##### Rest Operator (ES2015)
`...` is also the `rest` operator. The context of its usage is different from the spread operator.  It can be applied to the last parameter of a function definition to turn that into the equivalent of a C# params array argument. It means that any number of arguments can be supplied when the function is called (in a sense, this acts in the opposite direction to the spread operator). Once all the preceding parameters have been catered for, the rest will form an array and be represented by the `rest argument`.

	function sumAggregator(total, num) {
	  return total + num;
	}

	var calculatePercentageOfTotal = function (percentage, ...numbers) {
		var total = numbers.reduce(sumAggregator);
	  return total * percentage / 100;
	};

	var percentageOfTotal = calculatePercentageOfTotal(10, 50, 150, 200)
	console.log(percentageOfTotal);         // 40

Of course, we can call a JavaScript function with any number of parameters already. We can currently achieve the same effect in a less elegant manner by manually processing the `arguments` property within the function code. Also numbers is a _genuine_ array whereas `arguments` is only "array-like". You can iterate though the values in a `for` loop. However, you have to convert it into a genuine array in order to be able to use the `reduce` array:

	function sumAggregator(total, num) {
	  return total + num;
	}

	var calculatePercentageOfTotal = function (percentage) {
	  // Extract all but the first memeber of arguments into a genuine array.
	  var numbers = Array.prototype.slice.call(arguments, 1);

		var total = numbers.reduce(sumAggregator);
	  return total * percentage / 100;
	};

	var percentageOfTotal = calculatePercentageOfTotal(10, 50, 150, 200)
	console.log(percentageOfTotal);         // 40


##### Power Operators (ES2016)
`**` and `**=` will become available in ES2016.

In the meantime you will have to make do with go0d old `Match.pow(x, y)`. In the future you will be able to use `x ** y`.



### <a name="language-built-in-objects"></a>Commonly Used Built-in Object Methods
This section explains about some of the built-in objects, and their methods, that have not already been mentioned in previous sections.

`Function` has already been explained in the [Functions](#language-functions) and [Calling Functions](#language-calling-functions) sections further up.

`Object` has already been explained in the [Objects](#language-objects) section further up.

The following built-in objects are related to JavaScript types and are explained in the [Types](#language-types) section:

* `String`
* `Array`
* `Number`
* `Math`
* `Date`
* `RegExp`

IN THESE OBJECTS AND ONES IN TYPES: Do not try to give a detailed explanation of every method which looks useful. Could just do a list of notable ones with some examples afterwards.

#### <a name="language-built-in-objects-window"></a>Window
The `window` object is the global object when operating with JavaScript within a browser. This means that any global variables or functions which you define become properties or methods of the window object. This example does not appear to work as expected in jsfiddle - it displays `undefined`. However, you can also run JavaScript from the console window within the F12 tools in your browser. If you paste the two lines into the console window, next to the `>` symbol and press the enter key, an alert window with the value `4` will be displayed, showing that `myFreeStandingVariable` is actually a property of `window`.

	var myFreeStandingVariable = 4;
	alert(window.myFreeStandingVariable);

The window object also contains some useful properties and methods, some of which are mentioned below. [w3schools](http://www.w3schools.com/jsref/obj_window.asp) and [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window) contain more information.

##### window Properties
`document` gives you access to the document object described in the [section below](#language-built-in-objects-document).

`location` give you access the the (Location object)[http://www.w3schools.com/jsref/obj_location.asp] which allows you to access and manipulate things related to the current URL. `history` gives access to the history object which holds information about and allows you to navigate to URLs accessible in the current tab via the `Go Back` and `Go Forward` buttons in the browser.

If you have a page that is being displayed within an `<iframe>` within another page its JavaScript will only affect the nested page (or window) by default. `parent` gives you access to the parent window. This can be useful if you have markup that is being held within an `<iframe>` and you need to manipulate the page in which the iframe is being held. For example, you may have an input form held within an iframe on a page and may then want to refresh or redirect the main page when the data has been entered. If the window is topmost in the hierarchy the parent will be equal to the window itself (not null or undefined). `top` is the window that is topmost in the hierarchy (if you want iframes within iframes) and `self` is equal to the window itself.

	// We can safely use == as we know both objects are windows (and both are read-only).
	alert(window.top == window.self ? "In topmost window" : "In nested window");

The `navigator` property will give you access to the navigator object where you can find out some information about the browser which sent the request.

`screen` gives a little bit of information about the user's screen, e.g. the dimensions of the browser window. There are also `scrollTo()` and `scrollBy()` methods to allow you to scroll the window content, although these are a bit primitive. It is likely that you will use some other library to perform more useful scrolling. For example, this jquery plugin allows you to ensure that the screen performs an animated scroll ensure that the first item matched is brought into view at the top of the screen.

	(function ($) {
	    $.fn.goTo = function () {
	        $("html, body").animate({
	            scrollTop: ($(this).offset().top) + "px"
	        }, "fast");
	        return this; // for chaining...
	    };
	})(jQuery);

Of course this example will throw an exception if there are no matches. This could be called if a large form fails validation to scroll the the first failing item:

	$(".validation-error").goTo();

`localStorage` allows you to use HTML5 local storage to store _primitive_ values in key value pairs. It works in IE8. Advantage over using cookies include a bigger storage capacity (5 megabytes) and the fact that the information is not transmitted to the server in requests. One usage is to persist settings so that, when the user comes back to a particular page, certain elements can be pre-populated with the values that the user last entered.

There are `setItem()`, `getItem()`, `removeItem()` and `clear()` methods. Also items can be set and retrieved using square brackets notation. The values in localStarage are accessible on a "per origin" basis and do not expire by default.

	localStorage["myPersistedSetting"] = "12345";
	console.log(localStorage["myPersistedSetting"]);

If you find yourself wanting to store more complex objects you can always make use of JSON:

	var setLocalStorage = function (key, object) {
		localStorage[key] = JSON.stringify(object);
	};

	var getLocalStorage = function (key) {
		return JSON.parse(localStorage[key]);
	};

	setLocalStorage("person", { "firstName": "Fred", "surname": "Funk" });
	console.log(getLocalStorage("person").surname);

`sessionStorage` is very similar to localStorage except the storage is only temporary - it will be cleared when the session ends. A session lasts for as long as the browser is open and survives over page reloads and restores. Opening the same page in a new browser tab will start a new session.


##### window Methods
There are a few methods for displaying popup windows. The windows very simple and unstyled.  `alert()` displays a message with an OK button. `confirm` also adds a Cancel button, allowing you to take alternative actions. `prompt` allows you to request one value to be input by the user. Whenever one of these windows is displayed the thread on which the code is running will be blocked. When the user closes the window the code execution will resume.

`setTimeout()` allows you to execute a function after a specified number of milliseconds. The timeout only occurs once. `clearTimeout()` allows you to cancel a previous call to setTimeout() before the timeout has occurred.

	// Note that, as window is the global object within the browser, you do not need
	// to specify the "window." before these method calls.
	setTimeout(function () {
		alert("Delayed message.");
	}, 3000);

`setInterval()` is like setTimeout() but the timeout repeats itself intervals. Because the timeouts will continue being triggered forever you should be **careful** when using this method. `clearInterval()` can be used to cancel a previous call the setInterval().

`btoa()` and `atob()` allow you to convert between a string and a base 64 string.


#### <a name="language-built-in-objects-document"></a>Document
https://developer.mozilla.org/en/docs/Web/API/Document

The `document` object is a property of the `window` object. Because the window object is the global object you can just write `document.title` rather than `window.document.title`.

It does not provide any _essential_ properties or methods. You may use the `title` to modify the `<title>` content of the document or the `writeln()` could be used for testing purposes (certainly not for generating your actual page content).

There are also a number of methods available to query and modify the DOM. The DOM (Document Object Model) is a programming interface aimed at HTML and XML document content. However, you would generally use some other library these days for doing this, rather than the `document` object from within plain JavaScript. It is also notoriously difficult to work with. In this case the DOM is to blame, not JavaScript. _"The DOM is poorly specified and inconsistently
implemented...I think writing a
Good Parts book about the DOM would be extremely challenging."_ is a quote from the book `JavaScript - The Good Parts` by Douglas Crockford.

[jQuery](https://jquery.com/) is one library that has made DOM manipulation much more convenient.


#### <a name="language-built-in-objects-math"></a>Math
This object provides many mathematical functions and standard mathematical values.

	var calculateAreaOfCircle = function (radius) {
		return Math.PI * Math.pow(radius, 2);
	};

	var area = calculateAreaOfCircle(2);
	console.log(area);						// 12.566370614359172

Investigate [w3schools - Math Reference](http://www.w3schools.com/jsref/jsref_obj_math.asp) for a full list. [MDN - Math](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math) has a bigger list but many are only available in ES2015 and won't even work in any version of IE.


#### <a name="language-built-in-objects-json"></a>JSON
JSON (JavaScript Object Notation) allows you to define JavaScript object via a string. You can then serialize and deserialize between an _actual_ object and its string representation. The main things JSON allows you to define are:

* Objects - enclosed in braces - `{...}`
* Properties of objects - key value pairs within the braces, e.g.<br />
	{ `"myQuantity": 3`, `"greeting": "Hello"` }
* Arrays - a sequence of values surrounded by square brackets, e.g. <br />
	`["apple", "orange", "banana", false, 23]`

Technically the property keys should be surrounded by `double quotes` for the JSON to be valid. See [http://www.jsonlint.com/](http://www.jsonlint.com/). Often you will not need to do this but it is somthing to bear in mind.

You can nest objects and arrays within other objects or arrays. In the example below we have cheated, to avoid an ugly example, and used a `template literal` as the JSON container instead of a string.

	var myJsonObject = `{
		"prop1": 5,
		"prop2": [ "JavaScript", 12, true, { "val1": 2, "val2": 5 } ],
		"prop3": {
			"firstName": "John",
			"surname": "Smith",
			"age": 28
		}
	}`;

>	NOTE: In ES2015 you could use `template literals` (surround the text with back ticks rather than single quotes) to make the above example nicer to read. As well as allowing you to specify placeholders for expression values within the text, as in String.Format() statements in C#, they also allow multiline text to be specified without the ugly concatenations. See [MDN](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Template_literals).

You don't necessarily have to specify an _object_ as you outer object. You can specify an array or a primitive value, e.g. `33`, `false`, `null`, `"A string value"`.

The `JSON object` only provides two methods to help you convert between JSON strings and the objects they represent. They are effectively like static methods in C#.

* `JSON.parse()` allows you to convert a valid JSON string into the actual JavaScript object it represents. Trailing comma, after the last item of an array, will cause an error in here.


	// This example uses ordinary strings which need to be concatenated
	// if on separate lines.
	var peopleJson = '[' +
		'{ "firstName": "Bob", "surname": "Jones" },' +
		'{ "firstName": "Fred", "surname": "Bloggs" }' +
	']';

	var people = JSON.parse(peopleJson);
	console.log(people[1].surname);					// "Bloggs"

The JSON string would not normally be defined within the code, it would come from a separate source, e.g. a file or a call to a web method.

* `JSON.stringify()` goes the other way and serializes an object into JSON.


	var country = { name: "Spain", population: 47000000 }
	var countryJson = JSON.stringify(country);

	// This outputs: {"name": "Spain","population": 47000000}
	console.log(countryJson);

Also see [w3schools](http://www.w3schools.com/js/js_json.asp) and [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse).


#### <a name="language-built-in-objects-console"></a>Console
The `console` object is one of the most useful items for detecting and fixing errors in your code. It allows you to perform various JavaScript debugging tasks. These are usually in conjunction with the `Console tab` in the `F12 developer tools` of you browser. [MDN - Console](https://developer.mozilla.org/en/docs/Web/API/console) give a full list of the methods this object provides. TODO: DEBUGGING IS A SEPARATE SECTION.

##### Basic Methods
These methods are called from within your code (when debugging).

 * `console.log()` is used often in this document and lets you log a message or the value of a variable to the console.

 * `console.assert()` is very similar but takes an initial boolean expression. The log will only occur if the expression evaluates to false.

 * `console.clear()` can be useful if you find yourself logging many things or having to change and re-run your code a lot.

* `debugger;` is not a console method but it worth mentioning here. Rather than trying to find code and add a breakpoint via the F12 tools you can just add a line containing this to your code and re-run. It also maintains the breakpoint in the correct position if you add or remove lines to your code (breakpoints remaining on exactly the same line number has been a problem in Firefox). You should take to care to ensure that debugger lines are only added temporarily.

##### Other Methods
There are some other more sophisticated methods you can use, although the basic ones will often be enough. [Beyond Console Debugging Tricks](https://medium.com/outsystems-experts/beyond-console-debugging-tricks-f7d0d7f5df4#.pmwwd5e9g) is a web page which explains these pretty nicely.

* `console.trace()` can be typed into the Console when you are in "breakpoint" mode. It will give you a complete stack trace. One thing to note is that the more anonymous functions you have in your call stack the harder it will be to make sense of the stack trace.

* `console.table()` works quite nicely if you have a variable that is a collection of homogeneous objects. You could call this line from within your code or via the Console window.

```
var cities = [
	{id: 0, name: "London", country: "England"},
	{id: 1, name: "Paris", country: "France"},
	{id: 2, name: "Rome", country: "Italy"}
];
console.table(cities);
```

* `console.time()` and `console.timeEnd()`. Usage of these is simple. From within your code, call `time()` when you want the timer to start and `timeEnd()` when you want to stop timing. The time will automatically be output to the console window. There are also overloads which accept a label so that you can record multiple times in one go.

* `console.profile()` and `console.profileEnd()` work in a very similar way to the time() methods except they record more detailed metrics of each function call. The results are not seen in the Console window - you can see them in the `Profiles` tab of your F12 tools. It is advisable to supply a value for the `profileName` parameter of both methods. This will avoid multiple anonymously named profiles being created every time you run your code. The results of multiple runs will be retained.

* `console.dir()` and `console.dirxml()`. These are useful when called from your code to record the state of more complex objects to the console. It means that you can avoid having to breakpoint your code in order to manually examine the value of a variable. Because of that have your code run in real time, e.g. if user interaction is involved, and output the state of an object at various points. You can try these with the above "cities" example, instead of calling table().


> NOTE: It is important that, once you have finished your debugging you should remove (or, at a push, comment out) your console statements, leaving your code tidy. If you needed some sort of logging or performance recording on a more permanent basis, console would not be the object to use.



> TODO: Add a there a debugging section? YES. Will also want to mention F12 tools. Can then give a reference to this section. also debugger statement.


### <a name="language-built-in-global-functions"></a>Built-in Global Properties and Functions

GLOBALS      (NOTE that there are many properties and methods of the window object - they are sort of global)


[JavaScript Global Reference](http://www.w3schools.com/jsref/jsref_obj_global.asp) explains that there are a few global properties and global functions. They are _not_ attached to any particular objects so they really are just standalone variables and functions, not methods.

Out of those there may be more convenient alternatives, e.g. there a jQuery methods for testing for numeracy.

#### Global Properties
`Infinity`, `NaN` and `undefined` are the global properties.

Note that you can actually give `undefined` a different value. Whereas this may be on the madder side of insane it may give an insight into why some third-party libraries employ tricks to ensure that, at least for their code, it really is undefined. Some use the value `void 0`. Others may have an outer IIFE which contains a parameter called `undefined` at the end, but the function is invoked with one fewer parameters, ensuring that undefined really is undefined.

#### parseInt(), parseFloat()
These convert strings to their numerical equivalents. `parseInt` has an optional second parameter called `radix`, an integer between 2 and 36 representing the base of the number within the string, e.g. 2 for a binary and 10 for a decimal. If the first number in the string is not a digit then NaN will be returned. Surplus, non-numericcharacters will be ignored

If the radix is not specified, the number is usually assumed to be base 10. The *exceptions* are (1) if the string begins with "0x" the string will be assumed to be a hexadecimal, (2) certainly in older browsers, if the string begins with "0" but not "0x", it will be assumed to be an octal.

	// BEWARE: In older browsers this will return octal 15 as a decimal, i.e. 13
	parseInt("015");

For this reason you will often see advice telling you to always supply the radix parameter when calling `parseInt()`.

#### <a name="language-built-in-global-functions-eval"></a>eval()
Evaluates code that is contained within a string. Use of this is highly disapproved of as you can understand. If you cannot understand, imagine that you took all your beautiful C# code with one particular file, with its syntax highlighting and error highlighting, and stuck it in one big string. Imagine then that you were developing that code further from within the string.

Unless you get to a very advanced standard it is unlikely you will want to write code that executes from within a string and there will almost always be a better way to do it.

There is one situation where it can be very useful, however. Executing code that a third party tool, like one from Telerik, has generated and place within the `href` of a link (`<a>`). In this case the code is already within a string. If you want to latch on to this auto-generated code, e.g. to execute the postback that it performs, but from within an event other than the clicking of that link you can "stick it" within an eval. This would be a tidier way than manually copying the output href content and pasting it into your own code. ...you may want to intercept the click of a button and add some custom logic which determines if you should preced with its action...

```
// Partial code from AXA where the default submit button href code generated by ASP.NET was
// stored within a variable and replaced with code which displays a confirm popup.
// Clicking the confirm button within the popup will then result stored code being executed.
generatedCancelBookingCode = cancelBookingButton.attr("href");
...
publicMembers.cancelBookingIfUserConfirmsTheirDecision = function () {
		AXA.confirmWindow.show("Are you sure you want to delete this booking?", "Cancel Booking", function (event) {
				eval(generatedCancelBookingCode);
		});
};

NOTE: This trick is also referred to in tips and tricks.
```

#### URI Functions
There are functions for encoding and decoding URIs. I am not sure how perfect these are. As stated above there may be better alternatives in third-party libraries.


1. [Standard Browser Objects](#sbo)
	*  [document Object](#sbo-document-object)
	*  [window Object](#sbo-window-object)
	*  [localStorage and sessionStorage Objects](#sbo-localstorage-and-sessionstorage-objects)

## <a name="sbo"></a>Standard Browser Objects
### <a name="sbo-document-object"></a>document Object
<p>    Point them towards jQuery for DOM manipulation</p>
### <a name="sbo-window-object"></a>window Object
When working with JavaScript within a browser, the global namespace we have been referring to is actually the  `window` object. So, if not using strict mode, any undeclared variables you use will be added as properties of the window object.
<br /><a href="http://thanpol.as/javascript/development-using-namespaces" target="_blank">http://thanpol.as/javascript/development-using-namespaces</a><br />
Window setTimeout() Method
### <a name="sbo-localstorage-and-sessionstorage-objects"></a>localStorage and sessionStorage Objects


<hr dummy="_" />




<a name="style-contents"></a>[Coding Rules and Style](#style)

*  [Namespaces](#style-namespaces)
*  [Naming Conventions](#style-naming-conventions)
*  [Declarations](#style-declarations)
*  [Strict Mode](#style-strict-mode)
*  [Initialising Variables](#style-initialising-variables)
*  [Checking for Equality](#style-checking-for-equality)
*  [Keywords to Avoid](#style-keywords-to-avoid)
*  [Operators to Avoid](#style-operators-to-avoid)
*  [Semicolons](#style-semicolons)
*  [Breaking Long Lines](#style-long-lines)
*  [Whitespace](#style-whitespace)
*  [Quotation Marks](#style-quotation-marks)
*  [Comments](#style-comments)
-  [Functions](#style-functions)
*  [Blocks](#style-blocks)
-  [Callback Function Parameters](#style-callback-function-parameters)
-  [Immediately Invoked Function Expressions](#style-immediately-invoked-function-expressions)
++  [Do Not Create Functions within a Loop](#style-do-not-create-functions-within-a-loop)
*  [Redefining Properties within Prototypes of Standard Types](#style-redefining-properties-within-prototypes-of-standard-types)
+++  [Augmenting Prototypes of Standard Types with Additional Properties](#style-augmenting-prototypes-of-standard-types-with-additional-properties)
*  [Accessing Array Items via Strings](#style-accessing-array-items-via-strings)
++  [Getters and Setters](#style-getters-and-setters)
* [Put Your JavaScript in Separate Files from Your Markup](#style-separate-files-for-javascript)
* [&lt;script&gt; Tags](#style-including-script-files)


The first section of this document concerned itself primarily with explaining the JavaScript language. In this section coding style and good practices are highlighted.

### <a name="style-namespaces"></a>Namespaces
Remove the problem of declaring global variables right at the start by declaring an object to act as a namespace for all the code you write.

The word `namespace` is just a convenient word for us to use. It is really just an object that is a global variable. Unless your code grows to a large scale, it should be the only global variable you ever need to declare.

The name of your namespace should be:

* Short. It may seem like a good idea to use a descriptive name for your namespace but this is only the outer object. Unless you have a small codebase you will very likely introduce other objects or modules within the namespace which then have their own properties and methods. Your code will become cluttered with references to things like `proactEnterprisePortal.performanceAndCapacity.populateMultiSelect()`. Soon you may not be able to see the wood for the trees. In ES5 the only way to simulate a C# `using` statement is using a the, strictly taboo, `with` keyword.
* Designed to avoid any clash whatsoever with existing global items (properties of the window object when programming in the browser) and potential global objects or namespace introduce by third-party libraries, e.g. `$` would not be the best idea.
* Often 3 to 5 capitalised letters will achieve the above. This is not an absolute rule, just a recommendation.


	// People will soon get used to something like this and know what it means.
	var PEP = {};

Capitalised letters are often used in ES5 as a crude way of indicating that users should not change the value of an object.

Avoid the `var PEP = PEP || {};` notation - this syntax says "if PEP has already been declared use that value otherwise set it to a new object" and, in this context, it only encourages liberal declarations of PEP all over the place. Instead of plastering that line all over the place, secure in the knowledge that you will never overwrite it once created, prefer to ensure your code is organised. Just **make sure** that your namespace declaration is the first line in the first file of your code. It may be that you introduce a file which contains nothing more than your namespace declaration.

Any code you subsequently write should then either be a property of your outer namespace object or nested within other modules or objects. If your code grows you could introduce sub-namespaces.


### <a name="style-naming-conventions"></a>Naming Conventions
Try to use descriptive but need to avoid code clutter. Without the array of tools at your disposal that you have in C# you could be doing yourself more harm than favour by giving a function some super-descriptive name which, when preceded by a namespace and object name takes up more than half a line, particularly if it is called a lot. This can cause your code to become cluttered.

In a nutshell, virtually every token name in JavaScript (ES5) uses **camelCase** by convention.

Here are the exceptions. They are all written differently with the indication of sending a message out to people utilising the tokens, due to the lower toolset quality of many JavaScript development environments.

  * `Namespaces` - explained in previous section.

  * `Constructor functions` - **PascalCase** is strictly used as the name for all functions that, when called, should be prededed by the `new` keyword. This is a strict rule to avoid mistakes being made (and `this` within the function ending up referring to something other than what it was intended to refer to). If you have a function which constucts and returns an object but is **not** intended to be called with the `new` keyword it should use **camelCase**, e.g. `generateEmptyEmployeeObject()`. In Es2015, class names in also use pascal case.

  * `Constants` - **CAPITAL_LETTERS**, with words separated by underscores, are used to give an indication that the value of some variable should not be changed. In ES2015 the `const` keyword, which will flag an error if somebody tries to change its value, means this rule can be relaxed.

  * `Private/protected properties and methods` - **_camelCase** (beginning with an underscore) is not a universal convention but one that is widely adopted, including by writers of many reputable libraries. In JavaScript there are many patterns for creating objects with `private members`. You can create an object that has its own private properties and function without writing overly-convoluted code and can create hierarchies that have degrees of encapsulation, e.g. shared secrets. However, there are at least two problems (below) which have caused people to "accept defeat" and just go with a convention whereby consumers will know that something is not intended to be publicly accessible and should accept any unexpected consequences by doing so. In return you get "pseudo-encapsulation" and efficient objects. You may well have come across these when examining objects within the debugger.

      - To achieve true encapsulation you need to move away from the standard constructor pattern, where methods are attached **once**, to the prototype of a constructor. You would end up with the same methods being created repeatedly for every instance of the object.
      - Achieving genuinely `protected` members is very difficult. If it is protected members, which are accessible to children within a hierarchy but not to outsiders, is possible the code will be very convoluted and/or inefficient.


### <a name="style-declarations"></a>Declarations
<p>        Some say put all at top of container. Not really necessary as declaring just before use gives a better indication of intent. As long as people appreciate the concept of hoisting.</p>
* Modules or classes - never have free-standing variables and functions
* Always use declare variables (using `var`). Do not rely on them being implicitly created on first usage. Using strict mode will enforce this.
* Declare variables at top of scope (for clarity - in JS need to give all help can by using clarity)

SHORTER

### <a name="style-strict-mode"></a>Strict Mode
Prefer to use strict mode in code you write. This can be done with the line below. Prefer to apply it at function level (see further down).

	"use strict";

Strict mode provides some extra code enforcement features which may help you avoid errors by throwing an early exception when it comes across a number of things which you may well have written by mistake. Without strict mode these would not stop code execution. These include:

* Variables which are accessed or set but have not been declared. This includes variables which have been declared after they have been referenced, i.e. it does not allow for variable hoisting.
* Setting a property which has been marked as read-only.
* Attempts to deleted undeletable properties.
* Repeating the same property name in an object literal.
* Repeating the same parameter name in a function definition.
*	When a function is called via `call`, `apply` or `bind` any references to `this` can never refer to the `window`. Also, if the `this` parameter was not supplied and, if a primitive is supplied as the `this` parameter, no boxing will occur, `this` inside the function will still refer to a genuine primitive and not a primitive wrapped inside an object.
* Code contained within eval() cannot create variables within the scope that they are being executed in.

The last two are more security features.

Strict mode can be applied either at **script level** by putting the line before all other statements at the top of a script. Its use is discouraged because of problems caused when concatenating scripts that are a mixture of strict and non-strict (don't forget you also often include third-party scripts in your code).

You can also specify strict mode at **function level**. When specified as the first line within a function all code nested within that function operates in strict mode. You can therefore execute your code within an IIFE or module pattern. Because you can safely concatenate code within here with non-safe code elsewhere you should prefer this over script level strict mode.

	(function strictCodeContainer(){
	  "use strict";

		// All code within here will be run in strict mode.
	}());

Also see [MDN - Strict mode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode) for a lot more information, as well as fuller explanations of the above.

### <a name="style-initialising-variables"></a>Initialising Variables
For certain standard types, including `number`, `string`, `boolean`, `object`, `array`, `regexp`, never use the object constructor. It can cause unexpected behaviour. Instead use the `literal syntaxes` built into JavaScript.

**Use these**:

    var myNumber = 66;
    var myString = "Hello";
    var myBoolean = true;
    var myObject = {firstName: "Bob", surname: "Smith"};
    var myArray = [1, 2, 3];
    var myRegExp = /\d{2}/g;

Do **not** use these:

    var myNumber = new Number(66);
    var myString = new String("Hello");
    var myBoolean = new Boolean(true);
    var myObject = new Object();
    var myArray = new Array(1, 2, 3);
    var myRegExp = new RegExp("\d{2}", "g");

Other standard objects, e.g. `Date`, do not have a literal so you will have no choice but to use the constructor:

    var d2 = new Date(2000, 1, 1);

> NOTE: It is not necessary to initialise a variable at the point at which it is declared. It will have the value `undefined` until it has been set.

#### Trailing Commas in Objects and Arrays
Although perfectly acceptable in C#, don't put a `,` after the last item in an object or array definition. Some parsers may fail here as it not spec. Certainly, for an array, you will generally end up with an extra `undefined` item at the end.

### <a name="style-checking-for-equality"></a>Checking for Equality
Prefer the `identity operators` (`===` and `!==`) when testing for equality. They ensure that the types of the two arguments are the same as well as the values.

Avoid using the `equality operators` (`==` and `!=`). They only compare values. If the types are different some type coercion may occur. You may use these for better performance if you _absolutely know_ that the two items being compared are of the same type.

    console.log("3" === 3);   // false
    console.log("3" == 3);    // true

    // typeof always returns a string.
    console.log(typeof 3 == "number");

See [Language - Operators](#language-operators) further up for more information.

#### Comparing Numbers for Equality

Remember that `number` variables are stored as floating point numbers and so the _exact_ values stored might not be what you intended. You will often see results of calculations that are clearly meant to have so many decimal places stored with very small variations. For example, a result that is clearly 1.2 in your head may end up being stored as 1.2000000001 or 1.199999999.
Bear in mind that, if you test for _exact_ equality, the results may be unexpected.

### <a name="style-keywords-to-avoid"></a>Keywords to Avoid
Avoid using `with` altogether.

Avoid `for...in` for anything other than iterating through properties of an object. Do not use it to iterate through collections of objects it is not as convenient to use as the `foreach` statement in C#. ES2015 introduces `for...of` which behaves mush more like foreach.

See [JavaScript Keywords](#language-javascript-keywords) for more information on `with` and `for...in`.

Keep usage of the `eval()` function to a minimum. If there is an alternative which does not involve too much inconvenience take it. See [eval() in Built-in Global Properties and Functions](#language-built-in-global-functions-eval) above for more information.

### <a name="style-operators-to-avoid"></a>Operators to Avoid
Avoid inline variable assignments completely unless you are writing a `for` statement. By inline variable assignment we mean assigning a value to one or more variables on a line of code which also performs some other action. Bearing in mind in JavaScript's tendency to "do something", rather than throw a compile time error, going with this policy may help you avoid writing errors.

For the above reason, avoid `++` and `--` operators. They are also a form of inline assignment. However, they are made even trickier because less experienced developers may not fully appreciate the difference between these operators being applie `pre` (`++i`) and `post` (`i++`). Their arcane nature means they are known gateways to errors in JavaScript. There is no real reason why you cannot write `a += 1;` on a line of its own. It is also more expressive.

Of course its sheer ubiquity means there is no reason why you can't break both the above rules within a `for` statement:

    for (int i = 0; i < 10; i++) {
      ...
    }

### <a name="style-semicolons"></a>Semicolons
End statements with semicolons, as you do in C#. Theoretically they are optional - your code may still work perfectly well. However, whatever engine is running your JavaScript will try to guess where statements end and will sometimes guess wrongly. Also different browsers, particularly older ones, may guess differently.

### <a name="style-long-lines"></a>Breaking Long Lines
Try to avoid excessively long lines without any line breaks. When a statement will not fit nicely on a single line, it may be necessary to break it.

For this reason it is best that the line break occur after: any type of bracket, a comma, any kind of operator.

There are no fixed rule on the indentation of code after the line break - some prefer an indentation of a standard size, other prefer some sort of alignment.

Here are some examples (using deliberately short lines). The incorrect ones may well be interpreted incorrectly in old browsers. For example, they may interpret the first line as `var sum = a + b;` and then throw a syntax error when trying to interpret the `+ c;`.

```
	// Incorrect.
	var sum = a + b
	            + c;

	var value = myObject
	            .myProperty;

	var suffix = myNumber === 1
	             ? ""
	             : "s";

	// This line at the end of a function could return undefined.
	return
	    answer;

	// Correct.						
	var sum = a + b +
	          c;

	var value = myObject.
	            myProperty;

	var suffix = myNumber === 1 ?
	             "" :
	             "s";
```

#### Breaks in Long Strings
As an alternative to closing a string adding a `+` operator and reopening the string after the line break you can use `\`. Without it this code would result in a syntax error. **Unfortunately**, you will need to align the lines after the break with the left hand side of the page if you do not want new lines to start with spaces, which looks ugly.

```
    alert(`Some text.
Some more text right at the start of a new line.`);
```

In ES2015, template literals, which are enclosed by back ticks \` can also spill on to separate lines.

### <a name="style-whitespace"></a>Whitespace
Use linespaces to group logically related lines of code or to generally improve readability.

Do not add spaces inside parentheses.

    ( foo === bar )   // Bad way according JSLint.
    (foo === bar)     // Good way for JSLint.

Do not add spaces inside brackets.

    var aaa = [ 1, 2, 3 ];    // Bad.
    var bbb = [1, 2, 3];      // Good.

### <a name="style-quotation-marks"></a>Quotation Marks
Either single or double quotes can be used to delimit strings. There is no community-wide preference to be found. Consistent use of the for one or the other is all that is asked for.

### <a name="style-comments"></a>Comments
You can use both the `// ...` and `/* ... */` syntaxes for comments. The first is generally preferred although the second can be used over multiple lines and can be useful for commenting out code when debugging within a primitive environment.

Help other developers by adding comments to your code where necessary. Unless overused, with lots of comments explaining very obvious things, they usually enhance the readability of your code. Broadly speaking, there are two types of comments: those explaining what a piece of code is doing and those explaining why something was done.

We know that comments explaining what your code does can be largely reduced with use of self-explaining variable and function names. If you find yourself adding a comment explaining what a group of lines does you could consider moving that group of lines into a separate function with a descriptive name, even if it only gets called in one place.

Where comments are especially useful is when it comes to explaining _why_ something was done in a certain way, particularly if this was not the expected way. Function names explaining why the code they contain has been written in a certain way could end up being very long and less readable than some conventional text.


### <a name="style-functions"></a>Functions
<p>        Try to keep small with single responsibility</p>
<p>    Separation of business and UI</p>
* So as to prepare for unit testing and UI behaviour testing it is in our interests not to mix logic with UI manipulation. Not sure how easy this is to do without ending up with convoluted code (may be very easy with a bit of practice) but should at least give it a go

### <a name="style-blocks"></a>Blocks
As you will probably know, blocks in C-based languages are lines of code enclosed by braces. They are often used in association with some outer statement like a `for` or `if` statement but they can exist on their own and not associated with an outer statement.

#### Block Scope
In many languages, including ES2015, you can declare variables within a block and they will not be accessible from outside that block (or within the block but before the declaration) and they are accessible to any nested blocks.

In ES5 this is **not** the case. Variable **hoisting** means that any declarations are effectively moved up to the level of the containing function at runtime (although any assignment made on a declaration line remains in the same position). As a result you cannot have variables scoped at an level finer than the containing function. Even if you declare it near the end of a function and nested in child blocks it will still be accessible on the first line of the function.

This example shows that even use of strict mode fails to flag an error here. Even though it looks like `a` is being referenced before has been declared, its declaration has actually been hoisted to the start of the function. The alert window will show a 3. The `var a = 17;` statement is even within a block that will never be executed. If you deleted the declaration line, strict mode will then flag an error.

```
(function () {
  "use strict";

  a = 3;
  alert(a);
  if (false) {
    var a = 17;
  }
}());
```

#### Hanging Opening Braces
*Never* put opening braces on a new line. They should be hanging at the end of the previous line.
The style is not as nice (in my opinion) as opening brace on a separate line but it is the convention throughout the community and being used to it helps to understand, for example, code samples on the web.

#### Brace Usage
Always use braces after `if` or loop statements, even when there is only one line in the block. Do not the braceless one line block syntax - doing this just increases the chances of someone else misreading your code, particularly if the indentation got out of sync.

### <a name="style-callback-function-parameters"></a>Callback Function Parameters

### <a name="style-immediately-invoked-function-expressions"></a>Immediately Invoked Function Expressions
<p>    IIFEs: Why? An immediately invoked function expression is a single unit - wrapping both it, and its invocation parens, in parens, cleanly expresses this.</p>

### <a name="style-do-not-create-functions-within-a-loop"></a>Do Not Create Functions within a Loop
<p>    Do not create functions within a loop (FtU D84)</p>
THE FUNC WILL ONLY BE CREATED ONCE. It is the closures that are the problem.....:


or any form of iterator, like the result set of a jquery call
declaring a function within another function within loop WILL create it multiple times


ALSO this sample will create 10 functions all using `i` as a closure. By the time any of the events occur `i` will have the value `10`.

	var elements = document.getElementsByTagName('input');
	var n = elements.length;    // assume we have 10 elements for this example
	for (var i = 0; i < n; i++) {
	    elements[i].onclick = function() {
	        console.log("This is element #" + i);
	    };
	}

### <a name="style-redefining-properties-within-prototypes-of-standard-types"></a>Redefining Properties within Prototypes of Standard Types
Modifying methods of the built-in JavaScript object prototypes, like Object.prototype and Array.prototype is **strictly forbidden**. Even if it is only for code consumed within a particular application of yours it causes a high error risk if other people are unaware of the change or if you yourself forget after a period of working on another project. No further explanation is necessary in the case that you are writing library code that is more publicly available.

Of course you may inherit from the prototype of a built-in object and make changes.

Also follow this rule for objects that are defined within third-party libraries which your code utilises.

#### Polyfills and Shiv/Shim Libraries
There are occasions where a particular member may not be available on a particular object in certain browsers. For example, `String.trim()` is not available in IE8. Rather than defining this yourself, you can include a polyfill which will add in methods that are missing to objects within whatever browser your code is opened in. Note that these libraries will be certain to first make sure that a particular method does not exist before than adding it to the prototype.

### <a name="style-augmenting-prototypes-of-standard-types-with-additional-properties"></a>Augmenting Prototypes of Standard Types with Additional Properties

Less strict...........

show both the static and instance forms of String.format().


### <a name="style-accessing-array-items-via-strings"></a>Accessing Array Items via Strings
Only use numbers to reference members of an array. Often you can use numbers in strings although the results will not be as expected in older versions of IE.

If you want the equivalent of a **Dictionary** you can use an object as a string to object hash table and get and set items using `["propertyKey"]` notation:

    var myDictionary = {};
    myDictionary["red"] = "#f00";
    myDictionary["green"] = "#0f0";
    myDictionary["blue"] = "#00f";

    console.log(myDictionary["green"]);   // #0f0
    console.log(myDictionary["yellow"]);  // undefined

Note that the above only really works with strings. You are allowed to put any type of object within the brackets but only the `.toString()` text will be used as the key. This means that if you try to use two different complex objects then `[object Object]` will be used as the key, unless toString() has been overridden, meaning that they will refer to the same value.       

ES2015 introduces several new collection types, including `Map`. `Map` _does_ allow you to use any type of object as the key.


### <a name="style-getters-and-setters"></a>Getters and Setters
ECMAScript 5 getters and setters for properties are discouraged. Why?
Certainly they do not work in IE8.    Also beware of default get set properties...

If you plan on using a "genuine" property but with a getter that merely retrieves a value from within a field and a setter which merely sets the same field without any additional code, ask yourself if this is really adding any value. ES5 can be arcane enough without you introducing extra noise for no extra gain.

### <a name="style-separate-files-for-javascript"></a>Put Your JavaScript in Separate Files from Your Markup
This is a very important rule for many web development environments. This includes ASP.NET Web Forms or MVC as well as conventional HTML/CSS/JavaScript development and, in these, you should avoid writing websites with "scripts dotted about all over the place in markup files". It is not necessarily appropriate for _every_ environment. Some of the modern website frameworks regularly mix HTML and JavaScript and their organisation may be based on this idea.

**From the start of a project** you should keep your JavaScript in separate files from HTML and other markup. Do start with the mentality that, because much of your earlier code may have some degree of experimentation about it, you can work in a less strict manner and refactor everything later. Refactoring is not as easy as in C#. Migrating your code into different files, or moving your free-standing functions and variables into more organised modules or objects, at later date risks introducing many bugs. Not having a compiler to help you means that your code refactoring will have to be thoroughly tested.

Sometimes you will need to take advantage of some particular ASP.NET syntax, e.g. script binding or data binding tags or a piece of razor syntax, and will _have_ to put that JavaScript within a page, control or view. In these situations keep the code to a minimum. You could limit the code that is mixed in with markup just to lines setting the values of object or module properties via the ASP.NET tags. Other code which utilises those properties can still be held within separate `.js` files.

Be especially careful about putting script code directly within controls or partial views. If these entities are included somewhere else multiple times, e.g. as part of a list, the scripts in them will be included multiple times. In case it needs pointing out, mysterious errors and side-effects may occur.

### <a name="style-including-script-files"></a>&lt;script&gt; Tags
A lot of the time these days you will use ASP.NET bundling to include external CSS and script files which uses a separate syntax. However, you will sometimes find a need to add &lt;script&gt; tags. HTML5 standards state that the MIME type does not have to be specified (in actual fact the actual MIME type should be `application/javascript` and not the commonly-seen `text/javascript`).

```
<script>
  ...
</script>
```

Generally these tags and JavaScript file references should be included as low down in the &lt;body&gt; tag as possible to help with page loading times. If the `async` attribute is not set the script will be loaded synchronously, causing page loading to be delayed. In IE, `async` attribute is only supported in version 10 and above.


<a name="organisation-contents"></a>[Code Organisation](#organisation)

*  [Bundling](#organisation-bundling)
*  [Common File](#organisation-common-file)
*  [Custom jQuery Plugins](#organisation-custom-jquery-plugins)
*  [File per Module or Object](#organisation-file-per-module-or-object)

## <a name="organisation"></a>Code Organisation
### <a name="organisation-bundling"></a>Bundling
<p>    You may want some files KendoHelper... NO</p>
### <a name="organisation-common-file"></a>Common File
<p>    File with the namespace object declaration which all modules and object constructors will be members of (it needs to be the FIRST out of the files with YOUR code)</p>
<p>        XXX You may find a requirement for some global variables may be need to work.  Put these within a module.</p>
<p>        Common functions that are used in all areas. Can define these within one or more modules.</p>
<p>        also module for vaues you may want to set via binding tags in web forms pages or razor views.</p>
### <a name="organisation-custom-jquery-plugins"></a>Custom jQuery Plugins
<p>    Custom jQuery plugins - include after jQuery...</p>
### <a name="organisation-file-per-module-or-object"></a>File per Module or Object
<p>    File per module or object</p>

<hr />



<a name="tips-contents"></a>[Patterns, Tips and Tricks](#tips)

*  ["use strict"](#tips-use-strict)
*  [Modification of Existing Code](#tips-modification-of-existing-code)
*  ["guard" Operator, Using &&](#tips-guard-operator)
*  ["default" Operator, Using ||](#tips-default-operator)
*  [Convert Something to a Boolean with !!](#tips-convert-something-to-a-boolean)
*  [that (or self) Variables](#tips-that-or-self-variables)
*  [Inheritance](#tips-inheritance)
*  [Code Lines Which Aid Debugging](#tips-code-lines-which-aid-debugging)
*  [eval Keyword Trick](#tips-eval-keyword-trick)
*  [Sample Equality Comparisons](#tips-sample-equality-comparisons)
*  [Creating Modules (Singletons)](#tips-creating-modules-singletons)
*  [Defining an Obect in a Readable Manner](#tips-defining-an-obect-in-a-readable-manner)
*  [Defining an Efficient Constructor for an Object with Many Instances](#tips-defining-an-efficient-constructor-for-an-object-with-many-instances)
*  [String Format Example](#tips-string-format-example)
*  [Deferred Object](#tips-deferred-object)
*  Too Many Optional Parameters


    instance.open = function (extend) {

        //Use args instead of a many arguments for hopefully easier dialog creation
        var options = $.extend({
            name: "jquery-ui-window",
            width: 500,
            dialogClass: "ui-dialog",
            showClose: true,
            title: '',
            urlOnClose: null,
            onClosed: null
        }, extend);



## <a name="tips"></a>Patterns, Tips and Tricks
### <a name="tips-use-strict"></a>"use strict"
Explain the main effects.
Explain the two places it can be used.
### <a name="tips-modification-of-existing-code"></a>Modification of Existing Code
### <a name="tips-guard-operator"></a>"guard" Operator, Using &&
<p>    "guard"          &&    D26</p>
### <a name="tips-default-operator"></a>"default" Operator, Using ||
<p>    "default"        ||        D29</p>
### <a name="tips-convert-something-to-a-boolean"></a>Convert Something to a Boolean with !!
<p>    Convert to a Boolean        !!        D32</p>
### <a name="tips-that-or-self-variables"></a>that (or self) Variables
### <a name="tips-inheritance"></a>Inheritance
<p>        Just generally suggest ideas that COULD be implemented (different patterns, shared secrets, supermethods, keep hierarchies shallow) - patterns av in JS are diff from C#...</p>
<p>        Also indicate that these may be described in separate file.</p>
<p>        Also indicate that probably don't really need this for the size of our code bases and, if we ever do write larger code bases, consider using TypeScript.</p>
<p>        Prototypical inheritance</p>
### <a name="tips-code-lines-which-aid-debugging"></a>Code Lines Which Aid Debugging
<p>    console.log();</p>
<p>    debugger;</p>
<p>    console.trace();</p>
### <a name="tips-eval-keyword-trick"></a>eval Keyword Trick
<p>    eval() - avoid. State the one case where have used.</p>
### <a name="tips-sample-equality-comparisons"></a>Sample Equality Comparisons
### <a name="tips-creating-modules-singletons"></a>Creating Modules (Singletons)
### <a name="tips-defining-an-obect-in-a-readable-manner"></a>Defining an Obect in a Readable Manner
<p>    My pattern</p>
<p>    Object.create()</p>
### <a name="tips-defining-an-efficient-constructor-for-an-object-with-many-instances"></a>Defining an Efficient Constructor for an Object with Many Instances
Current JavaScript engines optimize based on the "shape" of an object, adding a property to an object (including overriding a value set on the prototype) changes the shape and can degrade performance.
Basically properies declared within ctor function and methods appended afterwards.
### <a name="tips-string-format-example"></a>String Format Example
### <a name="tips-deferred-object"></a>Deferred Object
[https://api.jquery.com/category/deferred-object/](https://api.jquery.com/category/deferred-object/)
Uses Promise object. It does NOT use the JS Promise object underneath, only its own Promise.

There is a Promise built into JavaScript but inferior. [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

1. [jQuery](#jquery)
	*  [Overview](#jquery-overview)
	*  [Attaching Event Handlers](#jquery-attaching-event-handlers)
	*  [Creating Plugins](#jquery-creating-plugins)
	*  [Overriding Existing Plugins](#jquery-overriding-existing-plugins)
	*  [AJAX Requests](#jquery-ajax-requests)
	*  [Tips and Tricks](#jquery-tips-and-tricks)

## <a name="jquery"></a>jQuery
This is a whole AREA of its own and will not be discussed in detail here, only specific areas of interest.
### <a name="jquery-overview"></a>Overview
Give some outline about selectors, plugins...
### <a name="jquery-attaching-event-handlers"></a>Attaching Event Handlers
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
### <a name="jquery-creating-plugins"></a>Creating Plugins
### <a name="jquery-overriding-existing-plugins"></a>Overriding Existing Plugins
### <a name="jquery-ajax-requests"></a>AJAX Requests
### <a name="jquery-tips-and-tricks"></a>Tips and Tricks
<p>    CSS class change detector</p>

1. [ECMAScript 6 and Beyond](#future)

## <a name="future"></a>ECMAScript 6 and Beyond
<p>    const, let, properties...</p>

1. [Development Tools](#devtools)
	*  [Browser Development Tools](#devtools-browser-development-tools)
	*  [JSFiddle](#devtools-jsfiddle)
	*  [Simple Testbed Project](#devtools-simple-testbed-project)
	*  [Hinting and Linting](#devtools-hinting-and-linting)
	*  [Writing Tests](#devtools-writing-tests)
	*  [TypeScript](#devtools-typescript)

## <a name="devtools"></a>Development Tools
### <a name="devtools-browser-development-tools"></a>Browser Development Tools
### <a name="devtools-jsfiddle"></a>JSFiddle
<p>    JSFiddle - https://jsfiddle.net/</p>
### <a name="devtools-simple-testbed-project"></a>Simple Testbed Project
### <a name="devtools-hinting-and-linting"></a>Hinting and Linting
### <a name="devtools-writing-tests"></a>Writing Tests
<p>    Testing (Simon wrote a wiki article)</p>
<p>    QUnit or Jasmine      Mocha</p>
<p>    Unit testing and behaviour testing (browser testing)</p>
> TODO: May need a fifth section. In testing just mention an example of the two types of test I have done in Jasmine. Mention Karma the test runner and other Jasmine-related things.
> Briefly mention some other libraries. Also mention that the big JS frameworks tend to have their own preferred testing libraries.
[chhimp.js](https://chimp.readme.io/)
### <a name="devtools-typescript"></a>TypeScript
<p>    TypeScript (coffeescript traceUR)</p>

There is no escape from JavaScript. The benefits of TS have been explained but do not run to it as a means of avoiding JS. What you write may be partially or fully strongly-typed but it is then converted into ordinary JavaScript. You can choose which ECMAScript version it is converted to but, for client-side web development, it is ES5. You will get benefits from certain errors being avoided pre-rendering but when your web page doesn't behave you will have to debug the generated ES5 code.


1. [Documentation Tools](#doctools)

## <a name="doctools"></a>Documentation Tools
<p>    Leave for Andrew</p>
JSDoc                                ? Will certainly have to if this doc to be finished in time. If got more time then will be able to do by self in conjuction with him.
http://documentation.js.org/         ?

1. [Additional Libraries](#libraries)
	*  [Functional Programming and Data Maniplulation](#libraries-functional-programming-and-data-maniplulation)
	*  [User Interface](#libraries-user-interface)

## <a name="libraries"></a>Additional Libraries
### <a name="libraries-functional-programming-and-data-maniplulation"></a>Functional Programming and Data Maniplulation
<p>    Lodash (Underscore), Lazy</p>
<p>        http://adamnengland.com/2013/10/10/benchmarks-underscore-js-vs-lodash-js-vs-lazy-js/</p>
### <a name="libraries-user-interface"></a>User Interface
<p>    jQuery UI</p>
<p>    ADD SOME MORE MENTIONS LATER</p>
<p>        Google it - https://en.wikipedia.org/wiki/List_of_JavaScript_libraries</p>
OTHER
es5-shim.js
FORMS
jquery.form.js
jquery.validate.js

DATA
JSON

http://requirejs.org/

MV* Frameworks
Never ending list of these ... Backbone, Angular, Ember, Knockout...
There's a tiny MVP library called [http://riotjs.com/](Riot) that an experienced JavaScript programmer can learn in an afternoon (not my words though). Although it may not be as powerful as the other frameworks it takes so little time to learn that the question of, "What if I invest lots time learning one and it turns out that others are better?", doesn't really matter.

REALLY NEED TO AVOID MENTIONING EVERYTHING UNDER SUN - only stuff which got something to say about.
No mention: Server-side JavaScript - will mention Node.js but also point to Nancy (or on Jonny used)



e5-shim

1. [References](#references)

## <a name="references"></a>References

Highlight w3schools and MDN as two excellent reference points. For example, if you want a list of members of a standard object along with information on browswer compatibility.

<a href="http://www.w3schools.com/js" target="_blank">W3Schools JavaScript Tutorial</a><br />
<a href="https://google.github.io/styleguide/javascriptguide.xml" target="_blank">Google JavaScript Style Guide</a><br />
<a href="http://hsablonniere.github.io/markleft/prezas/javascript-101.html" target="_blank">JavaScript 101</a><br />
<a href="http://javascript.crockford.com/code.html" target="_blank">Code Conventions for the JavaScript Programming Language</a><br />
<a href="" target="_blank"></a><br />
<a href="" target="_blank"></a><br />
<a href="" target="_blank"></a><br />
Crockford book.

[https://davidwalsh.name/essential-javascript-functions](https://davidwalsh.name/essential-javascript-functions)
[https://gist.github.com/ericelliott/263f24b5ad987e2f09d2](https://gist.github.com/ericelliott/263f24b5ad987e2f09d2)
[http://code.tutsplus.com/tutorials/stop-nesting-functions-but-not-all-of-them--net-22315](http://code.tutsplus.com/tutorials/stop-nesting-functions-but-not-all-of-them--net-22315)

[Stop Nesting Functions! (But Not All of Them)](http://javascriptissexy.com/category/16-important-javascript-concepts/) Ignore the rubbish at the end which (1) states efficiency WINS EVERY TIME over code quality, (2) JS does not explicitly provide for private stuff, so don't bother with the idea of encapsulation full stop.

1. [Gotchas](#gotchas)

## <a name="gotchas"></a>Gotchas
<p>    http://www.w3schools.com/js/js_mistakes.asp</p>
<p>    http://www.standardista.com/javascript/15-common-javascript-gotchas/</p>

If can sum these up briefly then can put this somewhere near bottom of document.
Good: Good, bad, awful but if use the good stuff and structure well then it can be tamed to a large extent...
There is an appendix for these in Crockford book.

1. [Therapy](#therapy)

## <a name="therapy"></a>Therapy
<p>    Some people are immune to the effects of JavaScript but, for others, Strong risk that may get to like. If... contact Dr... for therapy.</p>
