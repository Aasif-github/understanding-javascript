## Duck Typing

Duck typing is a programming concept in which an object's suitability for a particular use is determined by the presence of certain methods and properties, rather than the object's actual type. The name comes from the saying, "If it looks like a duck, swims like a duck, and quacks like a duck, then it probably is a duck."

In JavaScript, which is a dynamically typed language, duck typing is commonly used because it allows for more flexible and less verbose code. JavaScript developers rely on the behavior (methods and properties) of an object to determine its suitability for a specific task, rather than its explicit type.

#### Example of Duck Typing in JavaScript

Consider the following example where we want to perform an action that requires an object to have a `speak` method:

```javascript
function makeItSpeak(thing) {
    if (typeof thing.speak === 'function') {
        thing.speak();
    } else {
        console.log('This thing does not speak');
    }
}

let dog = {
    speak: function() {
        console.log('Woof!');
    }
};

let car = {
    honk: function() {
        console.log('Beep beep!');
    }
};

makeItSpeak(dog); // Output: Woof!
makeItSpeak(car); // Output: This thing does not speak
```

In this example:

1. The makeItSpeak function checks if the passed object (thing) has a `speak` method.
2. If thing has a `speak` method and it's a function, it calls this method.
3. If thing does not have a `speak` method, it logs that the thing does not speak.

This demonstrates duck typing because the makeItSpeak function does not care about the actual type of thing. It only cares whether thing has a speak method that can be called.

Advantages of Duck Typing

1. Flexibility: It allows functions and methods to operate on any object that implements the required behavior, regardless of its class or inheritance.
2. Reduced Boilerplate: There is no need to explicitly define interfaces or abstract classes, which reduces the amount of code.
3. Ease of Use: It makes the code more intuitive and easier to write, especially in dynamically typed languages like JavaScript.

Disadvantages of Duck Typing

1. Potential for Runtime Errors: Since type checking is done at runtime, there is a higher chance of encountering errors during execution if the expected methods or properties are not present.
2. Less Readable: It can sometimes make the code less readable and harder to understand, especially for people who are not familiar with the codebase.
3. Tooling Limitations: Static analysis tools and IDEs might have a harder time providing accurate code completion, refactoring, and error checking.

In summary, duck typing in JavaScript allows for flexible and dynamic code by focusing on what an object can do, rather than what it is. This approach can simplify code and reduce the need for explicit type declarations.



Other resources:

[Duck Typing-medium](https://medium.com/@eamonocallaghan/what-is-duck-typing-in-javascript-f3eb10853361#:~:text=Duck%20typing%20is%20an%20informal,x%20%2C%20they%20must%20be%20ducks.)