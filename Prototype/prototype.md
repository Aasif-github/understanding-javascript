Sequence to study
1. Object
Prototype
Class and Constructor
This - keyword
Delegation (ydkjy)


## What is prototype?

In JavaScript, prototypes are a fundamental concept behind inheritance and a core aspect of how objects are created and interact. Here's a breakdown of prototypes in JS:
Concept:
Every object in JavaScript has a hidden property called its prototype.
The prototype itself is another object that can hold properties and methods.
When you try to access a property on an object, JavaScript first checks the object itself for the property.
If the property is not found directly on the object, JavaScript then looks for it in the object's prototype.
This chaining process continues up the prototype chain until a property with a matching name is found or the end of the chain is reached (null).
Benefits:
Prototypes promote code reusability. By defining methods and properties in the prototype, you can share them among all objects created using the same constructor function.
They enable a form of inheritance in JavaScript. Objects can inherit properties and methods from their prototypes, allowing you to create specialized objects based on more generic ones.
Example:

```JavaScript
function Person(name) {
  this.name = name;
}

Person.prototype.greet = function() {
  console.log("Hi, my name is " + this.name);
};

const person1 = new Person("Alice");
const person2 = new Person("Bob");

person1.greet(); // Outputs: "Hi, my name is Alice"
person2.greet(); // Outputs: "Hi, my name is Bob"
```
In this example, the greet method is defined in the Person.prototype object. When you call person1.greet() or person2.greet(), JavaScript checks for the greet method first in person1 and person2 objects respectively. Since it's not found there, it looks up the prototype chain and finds it in Person.prototype, allowing both objects to share the functionality.

For a deeper understanding, you can explore resources on JavaScript prototype inheritance https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object_prototypes.


### Prototype - inheritance
https://javascript.info/prototype-inheritance

### Prototype
https://github.com/hiteshchoudhary/js-hindi-youtube/blob/main/10_classes_and_oop/Object.js
