## 1. Object Constructors
DC's currently preferred way of specifying an object constructor (of course there are many variations):
```
var car = function (name, wheels, horsePower) {

    "use strict";

    // Private.

    var name = name;
    var horsePower = horsePower;

    var privateFunction = function () {
        return o.wheels * horsePower;       // NOTE: Can reference public members.
    };

    // Public.
    // o is the object this car constructor returns.
    // I used a conveniently short name here as, in a large object we may lots of references to other public members. e.g. o.wheels below, and didn't want to end up with code clutter.

    var o = {};

    o.wheels = wheels;   

    o.getTopSpeedText = function () {
        return privateFunction().toString();
    };

    o.summary = function () {
        return String.format("{0} - {1} wheels, {2} HP, {3} mph", name, o.wheels, horsePower, privateFunction());
    };

    return o;
};
```
## 2. Modules
If you know that you are only creating the constructor for the purpose of creating `one` instance you may as well convert the above into a module pattern by wrapping it in a self-executing function:

```
var ABC = {};

ABC.car = (function (name, wheels, horsePower) {
    ...........
})("Robin Reliant", 3, 10);
```
A more appropriate use of the constructor parameter would be to ensure that $ is equal to jQuery:
```
ABC.car = (function ($) {
    ...........
})(jQuery);

```
This way makes things simpler and probably expresses the intended use better than defining the object constructor and the object to then create separately.
## 3. Alternative Object Constructor
There is another significantly different way of defining an object constructor. If you know that you will create many instances of an object, e.g. 100 or more, and a fair number of methods have been defined, the earlier described method will result in all the methods being created multiple times, one for each object. This can be overcome by instead declaring the methods against the prototype of the object. They will then be inherited by each instance and will only have to be declared once.
```
var Cart = function (wheels, horsePower) {
    this._privateHorsePowerField = horsePower;
    this.wheels = wheels;
};

Cart.prototype.getTopSpeed = function () {
    return this.wheels * this._privateHorsePowerField;
};

Cart.prototype.getTopSpeedText = function () {
    return this.getTopSpeed().toString();
};

var cart1 = new Cart(4, 10);
var cart2 = new Cart(5, 20);
```
The downside of this method is less encapsulation, e.g. there is no way to declare private members. The only way people have "overcome" this problem is by using the universally accepted convention of preceding a member that is not supposed to be accessed externally by an underscore, e.g. _myPrivateField. Obviously this is a bit limited.
## 4. Inheritance
DC never really come across a need to use inheritance, only written in test programs. Code bases I have worked on have maybe not been big enough. Unless I come across a situation where I can see the value I would not be looking to introduce the extra complexity, margin for error and potential confusion to other programmers who stumble across it.
An example of inheritance using the method specified in section 1. Note that, although we have genuine `private` members, there is no such thing as `protected` in javascript. There are ways to create something along those lines, e.g. shared secret pattern, but these are a bit convoluted and seen by experts as being not that useful and more of a way to appease programmers who think that strongly-typed, object-oriented programming is the only way.

We can still have private members but members of `animal` they will have to be made public if need to be available to `fish`. We could of course use the underscore convention.
```
var animal = function (name, eyes) {

    // Private.

    // Public.

    var o = {};

    o.eyes = eyes;   
    o.name = name;   

    o.getVisionIndex = function () {
        return o.eyes * o.eyes;
    };

    o.toString = function () {
        return "Animal ({0}). Vision Index = {1}".format(o.name, o.getVisionIndex());
    };

    return o;
};

var fish = function (name, eyes, fins) {

    // Private.

    // Public.

    var o = animal(name, eyes);

    o.fins = fins;   

    o.toString = function () {
        return "Fish ({0}). Vision Index = {1}, Fins = {2}".format(o.name, o.getVisionIndex(), o.fins);
    };

    return o;
};

var animal1 = animal("Bumble Bee", 50);
var fish1 = fish("Pike", 2, 6);
console.log(animal1.toString());                         // Animal (Bumble Bee). Vision Index = 2500
console.log(fish1.toString());                           // Fish (Pike). Vision Index = 4, Fins = 6
```
Below is an example of inheritance using object definitions as used in section 3. It is more for demonstration than a definitive way of how to use (tt works but I am not convinced there isn't too much accessing of the `prototype` property). As with the workaround for private variables using this method, we can use the underscore prefix thing to create protected members (of a sort).
```
var Creature = function (name, legs) {
    this.name = name;
    this.legs = legs;
};

Creature.prototype.getLegsSquare = function () {
    return this.legs * this.legs;
};

Creature.prototype.toString = function () {
    return "Creature ({0}), Legs = {1}".format(this.name, this.getLegsSquare());
};


var Insect = function (name, legs, wings) {
    // Ensure we base the new object on a Creature.
    this.prototype = new Creature(name, legs);
    this.wings = wings;
};

// This just 
Insect.prototype.toString = function () {
    // If we need to access a memeber that is only in the object this is based on, do it via the prototype property. 
    return "Insect ({0}), Legs = {1}, Wings = {2}".format(this.prototype.name, this.prototype.getLegsSquare(), this.wings);
};

var creature1 = new Creature("Centipede", 100);
var insect1 = new Insect("Dragonfly", 6, 4);
console.log(creature1.toString());                     // Creature (Centipede), Legs = 10000
console.log(insect1.toString());                       // Insect (Dragonfly), Legs = 36, Wings = 4
```


## TODO
Without wishing to edit Andrew's "Context" page and potentially cause conflict. I would say the line
```
In JavaScript this always refers to the owner of the function being executing, or rather, to the object that a function is a method of.
```
needs to be enhanced after it was established that there can be at least five different contexts in which the `this` keyword can mean different things:

* a. In free-standing functions it refers to the global object (the window object in web browsers)
* b. Inside a function that has been called with the `new` keyword it refers to the object that is implicitly created and returned by the function.
* c. Inside a function that has `not` been called using the `new` keyword it refers to the function you are in (often). It isn't though if is within a nested function.
* d. In a line that creates an object directly
```var obj = { age: 29, getAgeDoubled: function () { return this.age * 2; } }```
Observe that the `this` inside the `getAgeDoubled` function is `not` the function you are in but `obj`
* e. When a funtion is invoked by using either the `call` or `apply` keywords the caller specifies what object `this` will be when referenced inside the function.

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this specifies some more cases although some may be variations of one above.
Hopefully this gives an idea of the complexity of `this` in javascript compared to C# and, although we may write our own simplified documentation, we must refer readers to a more credible external reference.
