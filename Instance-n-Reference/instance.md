## What is instance?
In JavaScript, when we talk about instances, we are often referring to objects that have been created from a constructor function. The constructor function serves as the blueprint, and each object created from it is an instance.

ref: 
[Instance](https://www.altcademy.com/blog/what-is-an-instance-in-javascript/#:~:text=In%20JavaScript%2C%20when%20we%20talk,from%20it%20is%20an%20instance)

## What is diff between Object and instance.

[Class,Object,instance](<https://www.codecademy.com/forum_questions/558cd3fc76b8fe06280002ce#:~:text=The%20Object%20is%20an%20actual,real%20copy)%20of%20the%20object.&text=The%20first%20argument%20init(),and%20combined%20in%20unintuitive%20ways.>)


## What is Reference
In JavaScript, a reference is a value that refers to (or "points to") another value, such as an object or a function. Unlike primitive values (like numbers and strings) which are stored directly in memory, objects and functions are stored by reference.

When you work with objects or arrays in JavaScript, you're actually working with references to those objects or arrays, rather than with the objects or arrays themselves. This means that if you assign an object or array to a variable, you're actually assigning a reference to that object or array, not a copy of it.

Here's a simple example to illustrate references in JavaScript:

javascript
Copy code
// Creating an object
const obj1 = { name: 'John' };

// Assigning obj1 to obj2
const obj2 = obj1;

// Modifying obj2
obj2.name = 'Alice';

// Checking obj1
console.log(obj1.name); // Output: 'Alice'
In this example:

Both obj1 and obj2 reference the same object in memory. When you modify obj2, you're also modifying the object that obj1 references.
This behavior is because objects in JavaScript are mutable and are passed by reference, meaning that when you assign an object to another variable, you're passing a reference to that object, not a new copy of it.

Understanding references is important when working with complex data structures in JavaScript to avoid unexpected behavior, especially when passing objects between functions or when dealing with asynchronous code.

In JavaScript, a reference refers to a variable's connection to a value stored in memory. There are two key things to understand about references:
Primitive vs. Reference Values:


Primitive values (numbers, strings, booleans, null, undefined, and Symbol) are assigned by value. When you assign a primitive value to a variable, a copy of that value is stored in memory. Modifying the variable doesn't affect the original value.

Reference values (objects and arrays) are assigned by reference. When you assign a reference value to a variable, you're not copying the value itself, but rather creating a reference (or pointer) to the location in memory where the value is stored. This means that if you modify the value through one variable, the changes will be reflected anywhere else that variable references the same location in memory.

Passing by Reference:

When you pass a reference value (object or array) as an argument to a function, JavaScript passes the reference itself, not a copy of the value. This means that the function can modify the original value through the reference.

Here's an example to illustrate the concept:
JavaScript
let num = 10;
let anotherNum = num; // Assigning by value (primitive)

num = 20;
console.log(num); // Output: 20
console.log(anotherNum); // Output: 10 (Original value remains unchanged)

let arr = [1, 2, 3];
let anotherArr = arr; // Assigning by reference

anotherArr.push(4);
console.log(arr); // Output: [1, 2, 3, 4] (Modification reflected in both)

Use code with caution.
content_copy
Understanding references is crucial for working effectively with objects and arrays in JavaScript, as it can lead to unexpected behavior if not handled correctly.


Object, Array and function are defined in Heap memory
String, Number,Boolean and Symbol are defined in Stack memory due to it fix size and immutable
primitive types have a fixed size and are immutable, they can be efficiently stored on the stack. However, when you use them in more complex data structures like objects or arrays, they are stored as values within those data structures, which are themselves stored on the heap.

[How Reference works](https://medium.com/@naveenkarippai/learning-how-references-work-in-javascript-a066a4e15600#.xcf8lpvzy)


## what is difference between instance and reference in javascript?
1. Instance:

- An instance is the actual object created from a constructor function.
- It represents a specific entity with its own set of properties and methods.
- When you use the new keyword with a constructor function, you create a new instance in memory.
- Imagine an instance as a unique building constructed from a blueprint (constructor function).

2. Reference:

- A reference is a variable that stores the memory address of an instance.
- It acts like a label or pointer that allows you to access and manipulate the instance.
- Multiple references can point to the same instance, providing different names to access it.
- Think of a reference as a name tag for a building (instance). You can have multiple name tags with different names pointing to the same building.

Key Differences:
|  Feature 	| Instance  |Reference |
|---	|---	|---	|
|  Type 	| Actual object	Variable | storing memory address  	|
|Creation	| Created using new keyword with constructor	|Assigned the memory address of an instance|
|Uniqueness	|Each instance is unique	|Multiple references can point to the same instance|
|Modification	|Modifying properties affects the actual object	|Modifying a reference doesn't change the object|


```js
function Person(name, age) {
  this.name = name;
  this.age = age;
  this.greet = function() {
    console.log("Hello, my name is " + this.name);
  };
}

const person1 = new Person("Alice", 30);  // Create an instance (Alice)
const person2 = person1;                 // Assign reference (person2) to the same instance

console.log(person1 === person2); // Output: true (same instance)
console.log(person2.name);        // Output: "Alice" (accessing property through reference)

person1.age = 31;
console.log(person2.age);        // Output: 31 (modifying instance through one reference affects the other)
```

In summary:

+ Instances are the building blocks (objects) you create with constructors.
+ References are like nicknames (variables) that help you interact with those buildings.

Understanding this distinction is essential for working effectively with objects in JavaScript, especially when dealing with object mutation and passing references to functions.
