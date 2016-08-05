DC: The markdown here is knackered. Take what need and refer to https://git.3squared.com/richardlander/javascript-sample/wikis/Inheritance to fix.


Inheritance allows us as developer to reused a base class. The basic concept is to define the following call at the top of your class

```
ThreeSquared.Examples.InheritanceBase.call(self);
```

in this case we extend the InheritanceBase class which then allows us to call setName and getName functions

```
$(document).ready(function() {
	var inheritanceExample = new ThreeSquared.Examples.Inheritance("Bobington", 32);
	$("body").append("Hello " + inheritanceExample.getName() + " you said you were " + inheritanceExample.getAge() + " years old");
});

var ThreeSquared = ThreeSquared || {};

ThreeSquared.Examples = ThreeSquared.Examples || {};

ThreeSquared.Examples.Inheritance = function(name, age) {
	
	var self = this;
	
	// This is the important line that says extend the base class
	ThreeSquared.Examples.InheritanceBase.call(self);
	
	this.setName(name);
	this._age = age;
	
	this.setAge = function(age) {
		self._age = age;
	};
	
	this.getAge = function() {
		return self._age;
	};
	
};

ThreeSquared.Examples.InheritanceBase = function() {
	
	var self = this;
	
	this._name;
	
	this.setName = function(value) {
		self._name = value;
	};
	
	this.getName = function() {
		return self._name;
	};
	
};
```

Below is the full code with JSDoc comments included

```
/*jshint -W030 */

$(document).ready(function() {
	var inheritanceExample = new ThreeSquared.Examples.Inheritance("Bobington", 32);
	$("body").append("Hello " + inheritanceExample.getName() + " you said you were " + inheritanceExample.getAge() + " years old");
});

/**
* Primary company namespace
* @namespace 
*/
var ThreeSquared = ThreeSquared || {};

/**
* Namespace for the examples
* @namespace 
*/
ThreeSquared.Examples = ThreeSquared.Examples || {};

/**
* Class used to show inheritance working
* @class
* @augments ThreeSquared.Examples.InheritanceBase
*/
ThreeSquared.Examples.Inheritance = function(name, age) {
	
	var self = this;
	
	// This is the import line that says extend the base class
	ThreeSquared.Examples.InheritanceBase.call(self);
	
	this.setName(name);
	this._age = age;
	
	/**
	* Sets the age of the person
	* @param {number} age The age of the person
	*/
	this.setAge = function(age) {
		self._age = age;
	};
	
	/**
	* Gets the age of the person
	* @return {number} The age of the person
	*/
	this.getAge = function() {
		return self._age;
	};
	
};

/**
* Base class to be extended
* @class
*/
ThreeSquared.Examples.InheritanceBase = function() {
	
	var self = this;
	
	this._name;
	
	/**
	* @param {string} value The name of the person to set
	*/
	this.setName = function(value) {
		self._name = value;
	};
	
	/**
	* @return {string} The name of the person
	*/
	this.getName = function() {
		return self._name;
	};
	
};
```