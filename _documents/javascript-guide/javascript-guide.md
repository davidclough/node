1. [JavaScript Languagep (ECMAScript 5)](#language)
	*  [Document Scope](#language-document-scope)    DONE
	*  [Language Overview](#language-overview)    DONE
	*  [Global Namespace](#language-global-namespace)    DONE
	*  [Variables](#language-variables)           DONE
	*  [Variable Hoisting](#language-hoisting)    DONE
	*  [Top-down Evaluation](#language-sequential)    DONE
	*  [Functions](#language-functions)    DONE
	*  [Calling Functions](#language-calling-functions)    DONE
	*  [Immediately Invoked Function Expressions](#language-immediately-invoked-function-expressions)
	*  [Objects](#language-objects)
	*  [The this Keyword](#language-this-keyword)
	*  [Types](#language-types)    arrays done    TODO others  DON'T OVER ELAB, NOT EV METHOD
		* [Primitive Types (boolean, number, string, undefined, null)](#language-types-primitive)
		* [Math](#language-types-math)
		* [Arrays](#language-types-arrays)
	*  [JavaScript Keywords](#language-javascript-keywords)   DONE (apart from object-related ones)
	*  [Reserved Words](#language-reserved-words)						DONE
	*  [Truthy and Falsy](#language-truthy-and-falsy)        DONE
	*  [Operators](#language-operators)  										DONE (apart from object ones, which will probably appear in the objects section)
	*  [Commonly Used Built-in Object Methods](#language-built-in-objects)   TODO most object methods
	*  [Built-in Global Properties and Functions](#language-built-in-global-functions)   DONE


USEFUL LINKS
[http://hsablonniere.github.io/markleft/prezas/javascript-101.html#1.0](http://hsablonniere.github.io/markleft/prezas/javascript-101.html#1.0)
[http://www.w3schools.com/js](http://www.w3schools.com/js)


## <a name="language"></a>JavaScript Language (ECMAScript 5)

### <a name="language-document-scope"></a>Document Scope
This document focuses on ECMAScript 5 (ES5) which works in IE8 and above, Chrome and Firefox. It is not intended to argue for or against the use of JavaScript but to help you learn the language and techniques that can help tame it.

In interests of this document not becoming too bloated explanations may be quite short. It will be intended to cover more essential areas that are different from other languages and avoid going over things that will be more obvious to an experienced programmer. Some code samples may be over-simplified for the sake of more clearly explaining a concept.

It is intended to get you started, to explain many of the concepts that do not become immediately obvious when trying to google it as you go along, and will not be a complete reference. There are other more established sources from which you can obtain more detail.

If you have a desire to learn JavaScript properly, you would helping yourself if you avoid continually trying to think in terms of C#. Although many of the standard instructions, like the flow of control keywords, operate in a very similar way to other C-based languages some, like the `new` and `this` keywords operate in a fundamentally different manner and it would be beneficial not to assume that, just because something looks the same as in C#, it is.

> Note: The word **property** will be used throughout the document. It is actually referring to what in C# would be considered a field and not to something that has getter and setter methods. With functions being first-class objects in JavaScript (see next section), the word **properties** may also refer to an object's fields and methods. This is standard terminology in JavaScript.

> Note: Code samples will often use `console.log()` to display results in the console. You can access this via the developer tools in your browser of choice (press F12) and and go to the `Console` tab. In this tab you should also be able to paste an entire example into the command line, usually the bottom line of the Console tab with a `>` symbol at the start of it. Chrome is particularly reliable for doing this.<br />Perhaps a better place to paste a sample would be to paste it into the JAVASCRIPT window of a [JSFiddle](https://jsfiddle.net/) page (you will still need the console window open to see the results) and click "Run". Here you can easily play about with the code.
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

You can see recommended coding styles related to this issue later in <a href="#style-declarations">Declarations</a>.

### <a name="language-sequential"></a>Top-down Evaluation
#### Variables
JavaScript is run using `top-down evaluation`. Put simply, variables must have been declared before they are used.

TO MOVE (to function section): Whilst the The above statement is true you have to bear in mind the effects of hoisting. In particular functions which have been declared below where they are called, using `function declaration syntax`, will still work because hoisting moves both the declaration of the function variable and its assignment to the top of the nearest parent function. Whilst this may look highly convenient it can lead to sloppiness.

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
The word `type` has been used but, as mentioned, there are no classes. However, there are certain standard 'prototype` objects built into JavaScript.

#### <a name="language-types-primitive"></a>Primitive Types (boolean, number, string, undefined, null)
As well as objects, ES5 has five primitive types: `boolean`, `number`, `string`, `undefined` and `null`. Primitives are only things that will be copied/referenced by value. All other "types" are objects. If you make one object equal to another they will effectively be pointers to the same object.

`boolean`, `number` and `string` have their own special forms of constructor. They actually have their own object constructor equivalents (`Boolean`, `String` and `Number`). JavaScript will readily coerce between these primitives and object wrappers behind the scenes but you can detect their type using `tyepof`:

	var myInteger = 5;
	var myFloat = 6.7;
	var myHexadecimal = 0xff;
	var myBool = true;
	var myString = "Hello";

	console.log(typeof myInteger);		    // "number"
	console.log(typeof myFloat);			// "number"
	console.log(typeof myHexadecimal);		// "number"
	console.log(typeof myBool);				// "boolean"
	console.log(typeof myString);			// "string"

You can create them via their object constructor equivalents although their type will then be `object` and it is not advised to use these directly.

	var myStringDefineViaConstructor = new String("Hello");
	console.log(typeof myStringDefineViaConstructor);			// "object"

##### string
Technically, primitives do not have members. However, because of the object wrappers, you do have access to members of those objects:

	var myString = "Hello";
	console.log(myString.length);			// 5

There are quite a number of particularly useful String member links. The following [w3schools link](http://www.w3schools.com/jsref/jsref_obj_string.asp) link lists them.

Highlight some:
Give one example.

> Note: Be careful with browser compatibility when using these methods. Nearly all of them are fully compatible. One notable exception is `String.prototype.trim()`, which is only compatible in IE9. Bear this in mind if you need to support IE8.<br />
You can iclude a [shim](https://github.com/es-shims/es5-shim) at the start of your code to overcome this or use jQuery, e.g. `$.trim("    hello, how are you?    ")`

##### number
As you can see `number` covers both integers and floating point numbers.
Numbers are always 64 bit floating point values (according to [w3schools](http://www.w3schools.com/js/js_numbers.asp)).

These links contain list more [String members](http://www.w3schools.com/jsref/jsref_obj_string.asp) and [Number methods](http://www.w3schools.com/js/js_number_methods.asp).
CAN EXPLAIN ANY IMPORTANT ONES. There aren't really any?

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

##### boolean
Boolean does not have any particularly useful methods beyond `toString()`, which is inherited from the Object prototype.

##### undefined
`undefined` is useful for determining if a variable, or a function parameter or class member, has actually been initialised.

	var myVariable;

	console.log(typeof myVariable);	// "undefined"

	if (typeof myVariable === "undefined") {
		console.log("myVariable has not been given a value" );
	}

##### null
Although `null` is said to be a primitive type it is really more a primitive value for an object. Its type is object. However, this is only because of a bug in ES5. In ES6 it has been fixed and null is more like a genuine primitive type.

	var myNull = null;
	console.log(typeof myNull);				// "object"

Unlike `undfined`, `null` is a genuine value which can be used within your logic.

It is a value which your code or a third party library will actively assign as the value of a variable or object member, e.g. if a value is optional.
TO MY KNOWLEDGE no native JavaScript code will generate a null value. It is probably best viewed as a value rather than a type.

#### <a name="language-types-math"></a>Math
This object provides many mathematical functions and standard mathematical values.

	var calculateAreaOfCircle = function (radius) {
		return Math.PI * Math.pow(radius, 2);
	};

	var area = calculateAreaOfCircle(2);
	console.log(area);						// 12.566370614359172

Investigate [w3schools - Math object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math) for a full list.

#### <a name="language-types-arrays"></a>Arrays
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

#### <a name="language-types-object" dummy="_"></a>Object
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


#### <a name="language-types-arguments"></a>arguments Object   DONE
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

#### <a name="language-types-date"></a>Date
[momentjs](http://momentjs.com/) example of a library...

#### <a name="language-types-regexp"></a>RegExp



#### <a name="language-types-json"></a>JSON Object


#### Other Standard Types
<p>            Each of these are actually objects whose earliest ancestor in the prototype chain is the the Object prototype</p>

[Standard built-in objects](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects) gives an idea of what objects are available. However, not will be usable in all browsers. Give an idea of what may be available in the future, although third party libraries may already cover these anyway...

### <a name="language-javascript-keywords"></a>JavaScript Keywords
Most the of the language keywords in JavaScript behave pretty much the same as in other C-based languages. It would be pointless explaining them all again. Below are keywords which behave a bit differently from C# or are not in the language at all.

#### for...in
"for...in" loops are not as nice as they are in C#. The iterator object within the clause does _not_ contain the an object that is within the object/map/hash/array being iterated through. It contains the `key`. You then need to use that key to access the value. For this reason `for` loops are often preferred for processing arrays. The use of `for...in` generally being restricted to a few conventional situations, like iterating through all the properties of an object.

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

	console.log(0 === '');						 // 1: false
	console.log('0' === 0);						 // 2: false
	console.log(0 === false);					 // 3: false

	console.log(0 === null);					 // 4: false
	console.log(0 === undefined);			 // 5: false
	console.log(null === undefined);	 // 6: false

	console.log('true' === true);			 // 7: false
	console.log(3 === '3');						 // 8: false

	// Here the types are the same.
	console.log(3 === 3);				       // true
	console.log('3' === '3');				   // true
	console.log(true === true);				 // true
	console.log(Infinity === Infinity);  // true

	// Two instances of NaN are never equal.
	console.log(NaN === NaN);				   // false


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

#### In ES2016 there will be a new power operator `**` and `**=`
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

#### Window
https://developer.mozilla.org/en-US/docs/Web/API/Window
http://www.w3schools.com/jsref/obj_window.asp

#### Document
https://developer.mozilla.org/en/docs/Web/API/Document

#### JSON
parse, stringify
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON

#### Console





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

#### eval()
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


<hr />




1. [Coding Rules and Style](#style)
	*  [Namespaces](#style-namespaces)
	*  [Naming Conventions](#style-naming-conventions)
	*  [Declarations](#style-declarations)
	*  [Strict Mode](#style-strict-mode)
	*  [Initialising Variables](#style-initialising-variables)
	*  [Checking for Equality](#style-checking-for-equality)
	*  [Keywords to Avoid](#style-keywords-to-avoid)
	*  [Operators to Avoid](#style-operators-to-avoid)
	*  [Semicolons](#style-semicolons)
	*  [Long Lines](#style-long-lines)
	*  [Whitespace](#style-whitespace)
	*  [Quotation Marks](#style-quotation-marks)
	*  [Comments](#style-comments)
	*  [Functions](#style-functions)
	*  [Blocks](#style-blocks)
	*  [Callback Function Parameters](#style-callback-function-parameters)
	*  [Immediately Invoked Function Expressions](#style-immediately-invoked-function-expressions)
	*  [Do Not Create Functions within a Loop](#style-do-not-create-functions-within-a-loop)
	*  [Redefining Properties within Prototypes of Standard Types](#style-redefining-properties-within-prototypes-of-standard-types)
	*  [Augmenting Prototypes of Standard Types with Additional Properties](#style-augmenting-prototypes-of-standard-types-with-additional-properties)
	*  [Accessing Array Items via Strings](#style-accessing-array-items-via-strings)
	*  [Getters and Setters](#style-getters-and-setters)
	*  [Put Your JavaScript in Separate Files from Your Markup](#style-separate-files-for-javascript)

## <a name="style"></a>Coding Style
<p>DO put recommendations in the LANGUAGE section, rather than adding, separately, half a mile below. Can easily repeat the recommendations here.</p>
### <a name="style-namespaces"></a>Namespaces
Remove the problem of declaring global variables right at the start by declaring an object to act as a namespace for all the code you write.

The word `namespace` is just a convenient word for us to use, it is really just an object that is a global variable. Unless your code grows to a large scale, it should be the only global variable you ever need to declare.

CODE SAMPLE:     var PEP = {};
Short name (to avoid cluttering your code with continual mentions of `proactEnterprisePortal` - it may look descriptive at first but, when start appending modules and accessing properties of those modules things can get too verbose and you will find yourself having to introduce more line breaks than is ideal...), CAPITALS is a way of visibly indicating that it is a namespace. Also used for constants - which this is.
THESE ARE NOT RULES, JUST RECOMMENDATIONS (JavaScript taming).

Avoid the `var PEP = PEP || {};` notation, i.e. instead of plastering that line all over the place, secure in the knowledge that you will never overwrite it once created, prefer to just MAKE SURE that your namespace is the first line in the first file of your code.


Any code you subsequently write should then either be a property of that namespace object or nested within other modules or objects. If your code grows you code introduce sub namespaces.


### <a name="style-naming-conventions"></a>Naming Conventions
<p>        Descriptive but need to avoid clutter.</p>
<p>        Namespaces, e.g. PEP.         proactEnterprisePortal could seem to be a much more sensible choice to C# programmers but imagine the readability of code riddle with function calls like     proactEnterprisePortal.incidentManagementUtilities.createIncident()      PEP.incidents.create()</p>

* This is not a universal convention but, certainly for the **outermost** namespace of you application it avoids code clutter and is a clear indication that it is intended as a namespace. Your code will be littered with it...
QUESTION: Does this conflict with constants? Maybe not: PEP.PI
* Camel case for variables, parameters, methods, objects... (just about everything). Maybe not constants??
* Camel case functions EXCEPT where the function needs to be called using the "new" keyword. In that case it is a community-wide standard to name ONLY those functions using Pascal case (not to indicate, say, that the function generates and returns a class).
* Namespaces (I certainly liked a short, upper-case value, at least for the top-level namespace. Gives a clear but unobtrusive indication that the code is "our code". This method is adopted by other people, e.g. Douglas Crockford, but I don't think there is an agreed, community-wide convention.
* Keep the outer n/s short anyway (3 or 4 characters)
* CAPTITALS for global variables. In our cases the outer namespace will be the ONLY global variable we define.
* Use NAMES_LIKE_THIS for constant values.
* Constructor functions - pascal case.
* Do not create functions within blocks, e.g. if statements, only as a root property of an object or within another function.
* Depending on the manner in which you defined an object constructor...ALL properties of an object may be publicly visible. It is quite a widely-used convention (not mandatory) to name those properties which are not intended to be used outside the object by **preceding with `_`**. Often, when inspecting objects from third party libs in F12 tools you will see properties like this, maybe with equivalent properties without the underscore. Try to avoid modifying values. They are a cheat to overcome a limitation. They also "allow" for protected properties.
### <a name="style-declarations"></a>Declarations
<p>        Some say put all at top of container. Not really necessary as declaring just before use gives a better indication of intent. As long as people appreciate the concept of hoisting.</p>
* Modules or classes - never have free-standing variables and functions
* Always use declare variables (using `var`). Do not rely on them being implicitly created on first usage. Using strict mode will enforce this.
* Declare variables at top of scope (for clarity - in JS need to give all help can by using clarity)
### <a name="style-strict-mode"></a>Strict Mode
### <a name="style-initialising-variables"></a>Initialising Variables
<p>    Initialising Variable - Object Literals and Arrays, Bools</p>
* Use {} to create an object, not "new Object()". Same with things like Bools... Use {} instead of new Object(). Use [] instead of new Array().
* It is not necessary to initialise a variable as the point where it is declared.
* Although perfectly acceptable in C#, don't put a `,` after the last item in an object or array definition. Some parsers may fail here as it not spec. Certainly, for an array, you will generally end up with an extra `undefined` item at the end.
### <a name="style-checking-for-equality"></a>Checking for Equality
<p>    === and !==</p>
<p>        Either use if (a === null) or if (!a)</p>
<p>    Type Coercion - D21</p>

* Also comparing floating point numbers for exact equality may result in errors, even if just declared them.
* Will often see 1.2000000001 or 1.199999999 ...
### <a name="style-keywords-to-avoid"></a>Keywords to Avoid
with, for...in, eval (one exceptional case),

See [JavaScript Keywords](#language-javascript-keywords)
### <a name="style-operators-to-avoid"></a>Operators to Avoid
<p>    Inline assignments and ++</p>


### <a name="style-semicolons"></a>Semicolons
* always end lines with semicolons
Code may still work perfectly well. However, whatever engine is running the javascript will try to guess where lines end and sometimes will guess wrongly. This hypothetical example will result in the function always returning `undefined` but may well happen when lines become long and need to be broken:
Different browsers will try to insert it for you, sometimes resulting in behaviour which you did not intend.
```
CODE SAMPLE: The two in test prog
```
### <a name="style-long-lines"></a>Long Lines
<p>    Avoid excessively long lines. When a statement will not fit nicely on a single line, it may be necessary to break it. It is best to break after a { left brace, [ left bracket, ( left paren, , comma, or before a . period, ? question mark, or : colon. If such a break is not feasible, then break after an operator and continue on the next line with 8 spaces added to the current indentation. Those 8 spaces do not change the current indentation.</p>
* Where to break long lines, e.g. end line with an operator. Some parsers will try to put in their own error correcting and predict where a logical line actually ends:
```
var sum = a + b
            + c;
```
Same with ternary statements.
Same with property chains. It looks ugly but is necessary in this case to avoid browser...
### <a name="style-whitespace"></a>Whitespace
<p>        Do not add spaces inside parentheses.</p>
<p>        Do not add spaces inside brackets.</p>
<p>        Add spaces inside curly braces.</p>
Google agree with this.
Use linespaces to group logically related lines of code.
### <a name="style-quotation-marks"></a>Quotation Marks
### <a name="style-comments"></a>Comments
<p>        Reduce by good var and func naming...</p>
Explain how (as in other languages) code can be made more self documenting via (1) use of well named tokens, (2) reduction of reasonably large functions (e.g. more than 10 lines) into smaller, well-named functions. Achieving total self-documenting code is highly unlikely so only stupid people will avoid comments altogether (TODO: rephrase)
* Comments - plenty. As in other languages you can reduce need for comments by using highly descriptive variable and function names and by breaking functions that are longer than a few lines into smaller functions but, although you may the code jumps out of the screen and talks to you, it is unlikely this is completely the case
### <a name="style-functions"></a>Functions
<p>        Try to keep small with single responsibility</p>
<p>    Separation of business and UI</p>
* So as to prepare for unit testing and UI behaviour testing it is in our interests not to mix logic with UI manipulation. Not sure how easy this is to do without ending up with convoluted code (may be very easy with a bit of practice) but should at least give it a go
### <a name="style-blocks"></a>Blocks
<p>        braces in blocks</p>
* hanging opening braces
The style is not as nice (in my opinion) as opening brace on a separate line but it is the convention throughout the community and being used to it helps to understand, for example, code samples on the web.
* always use braces, even when only one line in block.
### <a name="style-callback-function-parameters"></a>Callback Function Parameters
### <a name="style-immediately-invoked-function-expressions"></a>Immediately Invoked Function Expressions
<p>    IIFEs: Why? An immediately invoked function expression is a single unit - wrapping both it, and its invocation parens, in parens, cleanly expresses this.</p>
### <a name="style-do-not-create-functions-within-a-loop"></a>Do Not Create Functions within a Loop
<p>    Do not create functions within a loop (FtU D84)</p>
ALSO this sample will create 10 functions all using `i` as a closure. By the time any of the events occur `i` will have the value `10`.

	var elements = document.getElementsByTagName('input');
	var n = elements.length;    // assume we have 10 elements for this example
	for (var i = 0; i < n; i++) {
	    elements[i].onclick = function() {
	        console.log("This is element #" + i);
	    };
	}

### <a name="style-redefining-properties-within-prototypes-of-standard-types"></a>Redefining Properties within Prototypes of Standard Types
Google: Modifying builtins like Object.prototype and Array.prototype are strictly forbidden. Modifying other builtins like Function.prototype is less dangerous but still leads to hard to debug issues in production and should be avoided.
### <a name="style-augmenting-prototypes-of-standard-types-with-additional-properties"></a>Augmenting Prototypes of Standard Types with Additional Properties
### <a name="style-accessing-array-items-via-strings"></a>Accessing Array Items via Strings
Only use numbers.
Despite the fact that Arrays are Object... JavaScript does not support arrays with named indexes.
Use an ordinary object if want to do this, effectively a hash table.

### <a name="style-getters-and-setters"></a>Getters and Setters
ECMAScript 5 getters and setters for properties are discouraged. Why?
Certainly they do not work in IE8.
### <a name="style-separate-files-for-javascript"></a>Put Your JavaScript in Separate Files from Your Markup
**From the start of a project** you should keep your JavaScript in separate files from HTML and other markup. Do start with the mentality that, because much of your earlier code may have some degree of experimentation about it, you can work in a less strict manner and refactor everything later. Refactoring is not as easy as in C#. Migrating your code into different files, or moving your free-standing functions and variables into more organised modules or objects, at later date risk introducing many bugs. Not having a compiler to help you means that your code will have to be thoroughly tested.....

<p>        DOM D6: Don't bother with type="text/javascript". It is the wrong MIME TYPE (application/...) so no browsers cater for it.</p>
<p>        Generally should AVOID putting JS within a page (keep in separate JS file). Sometimes you may want to take advantage of certain ASP.NET features,</p>
<p>            one ob being binding to some part of a model via razor tags or web forms data binding tags. In that case keep the code to a minimum, e.g. assign the values of the tags to javacript module properties. Code within JS files can then reference those properties from then on.</p>
<p>            Obviously you will have to structure your code so that the JS file(s) containing those variables have been included BEFORE the &lt;script&gt; code initialises them and</p>
<p>    Location of &lt;script&gt; tags.</p>
<p>        Low in body (unlike CSS which are high in head)           This won't necessary always remain the case... async</p>
* Separate files. Avoid plastering JS inside `script` tags in markup files. Sometimes may need to put some things in, e.g. to take advantage of special tags in Web Forms or MVC Razor.
* Also explain bundles...
            <%: Scripts.Render(BundleConfiguration.GlobalScript) %>
            <%: Styles.Render(BundleConfiguration.VideoStyles) %>
Prefer inclusion of commonly-used scripts in master pages (MVC layouts). If a script is very specific to a particular area, try to introduce a more specific master page/layout. Only include on an individual page or view if very specific and it is worth the effort to avoid the script being downloaded in areas where it is never used.
Multiple references to the multiple references to the same file will result in its code being repeated, which can obviously cause problems: If strict mode is being used an error will be highlighted if you have declared using the `var` keyword, otherwise variables will effectively be re-initialised from scratch. This can cause unpredictable side effects so be careful and avoid including in user controls or partial views.

Do not use &lt;script language="JavaScript"&gt; the language attribute is deprecated    

1. [Code Organisation](#organisation)
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

1. [Patterns, Tips and Tricks](#tips)
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
