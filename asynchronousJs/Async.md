## Closure - [mdn]

The word lexical refers to the fact that lexical scoping uses the location where a variable is declared within the source code to determine where that variable is available. Nested functions have access to variables declared in their outer scope.

Note: Using closures in this way provides benefits that are normally associated with object-oriented programming. In particular, data hiding and encapsulation.

Before let and const (es6) there are only two scopes i.e. global scope and function scope.

### Emulating private methods with closures
```js
const counter = (function () {
  let privateCounter = 0;
  function changeBy(val) {
    privateCounter += val;
  }

  return {
    increment() {
      changeBy(1);
    },

    decrement() {
      changeBy(-1);
    },

    value() {
      return privateCounter;
    },
  };
})();

console.log(counter.value()); // 0.

counter.increment();
counter.increment();
console.log(counter.value()); // 2.

counter.decrement();
console.log(counter.value()); // 1.
```
Here though, there is a single lexical environment that is shared by the three functions: counter.increment, counter.decrement, and counter.value.


The shared lexical environment is created in the body of an anonymous function, which is executed as soon as it has been defined (also known as an IIFE). The lexical environment contains two private items: a variable called privateCounter, and a function called changeBy. You can't access either of these private members from outside the anonymous function. Instead, you can access them using the three public functions that are returned from the anonymous wrapper.


Those three public functions form closures that share the same lexical environment. Thanks to JavaScript's lexical scoping, they each have access to the privateCounter variable and the changeBy function.

Asynchronous js 
Callback
Promises
Async and await

1. Callback

[*] A callback function is a function passed into another function as an argument, which is then invoked inside the outer function to complete some kind of routine or action.

In JavaScript, a callback is a function that is passed as an argument to another function and is intended to be executed after the completion of an asynchronous operation or at a later time. 

Callbacks are a fundamental concept in JavaScript, especially when dealing with asynchronous code, event handling, or any scenario where you want to perform an action after a certain task has been completed.

Some synchronous callback - High order function[map(), reduces(), filter()]

Simple example of callback (js)

// Function to perform a mathematical operation on two numbers
```js
function performOperation(a, b, operationCallback) {
    if (typeof operationCallback === 'function') {
        const result = operationCallback(a, b);
        console.log(`Result: ${result}`);
    } else {
        console.log('Invalid callback function provided.');
    }
}

// Callback function for addition
function additionCallback(x, y) {
    return x + y;
}

// Callback function for subtraction
function subtractionCallback(x, y) {
    return x - y;
}

// Callback function for multiplication
function multiplicationCallback(x, y) {
    return x * y;
}

// Callback function for division
function divisionCallback(x, y) {
    if (y !== 0) {
        return x / y;
    } else {
        console.log('Error: Division by zero.');
        return undefined;
    }
}

// Example usage
const num1 = 10;
const num2 = 5;

console.log('Addition:');
performOperation(num1, num2, additionCallback);

console.log('\nSubtraction:');
performOperation(num1, num2, subtractionCallback);

console.log('\nMultiplication:');
performOperation(num1, num2, multiplicationCallback);

console.log('\nDivision:');
performOperation(num1, num2, divisionCallback);
```

In this example, the performOperation function takes two numbers (a and b) and a callback function (operationCallback). The callback function is responsible for the specific mathematical operation.

You can see how easily we can switch between different operations by passing different callback functions to performOperation. This modular design makes the code more flexible and allows for easy extension with additional operations in the future.

Real-World example of callback(Web-dev)
```xml
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Callback Example</title>
</head>
<body>

<button id="clickMeButton">Click me</button>

<script>
// Function to simulate an asynchronous operation (e.g., fetching data from a server)
function fetchData(callback) {
    // Simulating a delay (e.g., an API request taking some time)
    setTimeout(() => {
        const data = 'Data from the server';
        callback(null, data);
    }, 2000);
}

// Callback function to handle the fetched data
function handleData(err, data) {
    if (err) {
        console.error(`Error fetching data: ${err}`);
    } else {
        console.log(`Fetched data: ${data}`);
        // In a real application, you might update the UI or perform further actions here
    }
}

// Adding an event listener to the button
document.getElementById('clickMeButton').addEventListener('click', function() {
console.log('Button clicked. Initiating data fetch...');

// Initiating the asynchronous operation (fetching data) with a callback
    fetchData(handleData);

console.log('Data fetch operation initiated. This message may appear before the fetched data.');
});
</script>

</body>
</html>
```



In this example, when the button is clicked, an asynchronous operation (simulated API request using fetchData function) is initiated. The handleData function serves as a callback to process the fetched data when the asynchronous operation is completed. This is a common pattern in web development, especially when dealing with user interactions and asynchronous requests to servers. The use of callbacks helps to keep the code modular and handle asynchronous responses in a structured manner.

Real-World example of callback (Nodejs)

```js
const fs = require('fs');

// Function to read data from a file asynchronously
function readFileAsync(filename, callback) {
    fs.readFile(filename, 'utf8', (err, data) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, data);
        }
    });
}

// Callback function to process the file data
function processData(err, data) {
    if (err) {
        console.error(`Error reading file: ${err.message}`);
    } else {
        console.log(`File content: ${data}`);
    }
}

// Example usage
const filename = 'example.txt';

console.log('Reading file asynchronously...');

readFileAsync(filename, processData);

console.log('Reading operation initiated. This message may appear before the file content.');

```


In this example:

The `readFileAsync` function reads data from a file asynchronously using Node.js's `fs.readFile` method.
It takes a filename and a callback function `(processData)`.
The `processData` callback function is called once the file reading operation is complete, either with the data or an error.

This is a common pattern in Node.js for handling asynchronous operations. It allows you to initiate an operation (like reading a file), provide a callback function to handle the result, and continue with other tasks while the asynchronous operation is in progress.

## Error-First Callback in Node.js
Error-First Callback in Node.js is a function which either returns an error object or any successful data returned by the function.

The first argument in the function is reserved for the error object. If any error has occurred during the execution of the function, it will be returned by the first argument.
The second argument of the callback function is reserved for any successful data returned by the function. If no error occurred then the error object will be set to null.

Below is the implementation of Error-First Callback:
```js
const fs = require("fs");

// This file does not exists
const file = "file.txt";

// Error first callback
// function with two
// arguments error and data
const ErrorFirstCallback = (err, data) => {
if (err) {
	return console.log(err);
}
console.log("Function successfully executed");
};

// function execution
// This will return
// error because file do
// not exist
fs.readFile(file, ErrorFirstCallback);

Output:
Error: No such file or directory
```



## Error Handling 
There are other real-world examples of asynchronous actions, e.g. loading scripts and modules.

Take a look at the function loadScript(src), that loads a script with the given src:

```js
function loadScript(src) {
  // creates a <script> tag and append it to the page
  // this causes the script with given src to start loading and run when complete
 
  let script = document.createElement('script');
  script.src = src;
  document.head.append(script);
}
```

It inserts into the document a new, dynamically created, tag <script src="…"> with the given src. The browser automatically starts loading it and executes when complete.

We can use this function like this:

// load and execute the script at the given path
loadScript('/my/script.js');


The script is executed “asynchronously”, as it starts loading now, but runs later, when the function has already finished.

If there’s any code below loadScript(…), it doesn’t wait until the script loading finishes.

loadScript('/my/script.js');
// the code below loadScript
// doesn't wait for the script loading to finish
// ...

Let’s say we need to use the new script as soon as it loads. It declares new functions, and we want to run them.

But if we do that immediately after the loadScript(…) call, that wouldn’t work:
loadScript('/my/script.js'); // the script has "function newFunction() {…}"

newFunction(); // no such function!


Naturally, the browser probably didn’t have time to load the script. As of now, the loadScript function doesn’t provide a way to track the load completion. The script loads and eventually runs, that’s all. But we’d like to know when it happens, to use new functions and variables from that script.

Let’s add a callback function as a second argument to loadScript that should execute when the script loads:
```js
function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;
  script.onload = () => callback(script);
  document.head.append(script);
}
```

The onload event is described in the article Resource loading: onload and onerror, it basically executes a function after the script is loaded and executed.

Now if we want to call new functions from the script, we should write that in the callback:
```js
loadScript('/my/script.js', function() {
  // the callback runs after the script is loaded
  newFunction(); // so now it works
  ...
});
```

That’s the idea: the second argument is a function (usually anonymous) that runs when the action is completed.
Here’s a runnable example with a real script:
function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;
  script.onload = () => callback(script);
  document.head.append(script);
}

loadScript('https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.2.0/lodash.js', script => {
  alert(`Cool, the script ${script.src} is loaded`);
  alert( _ ); // _ is a function declared in the loaded script
});




That’s called a “callback-based” style of asynchronous programming. A function that does something asynchronously should provide a callback argument where we put the function to run after it’s complete.

Here we did it in loadScript, but of course it’s a general approach.
Callback in callback
How can we load two scripts sequentially: the first one, and then the second one after it?

The natural solution would be to put the second loadScript call inside the callback, like this:
```js
loadScript('/my/script.js', function(script) {

  alert(`Cool, the ${script.src} is loaded, let's load one more`);

  loadScript('/my/script2.js', function(script) {
         alert(`Cool, the second script is loaded`);
  });

});
```


After the outer loadScript is complete, the callback initiates the inner one.

What if we want one more script…?

```js
loadScript('/my/script.js', function(script) {

  	loadScript('/my/script2.js', function(script) {

    		loadScript('/my/script3.js', function(script) {
      		// ...continue after all scripts are loaded
    		});

 	 });

});
```

So, every new action is inside a callback. That’s fine for a few actions, but not good for many, so we’ll see other variants soon.

Handling errors
In the above examples we didn’t consider errors. What if the script loading fails? Our callback should be able to react to that.

Here’s an improved version of loadScript that tracks loading errors:
```js
function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;

  script.onload = () => callback(null, script);
  script.onerror = () => callback(new Error(`Script load error for ${src}`));

  document.head.append(script);
}
```


It calls callback(null, script) for successful load and callback(error) otherwise.
The usage:
```js
loadScript('/my/script.js', function(error, script) {
  if (error) {
    // handle error
  } else {
    // script loaded successfully
  }
});
```

Once again, the recipe that we used for loadScript is actually quite common. It’s called the “error-first callback” style.
The convention is:
The first argument of the callback is reserved for an error if it occurs. Then callback(err) is called.
The second argument (and the next ones if needed) are for the successful result. Then callback(null, result1, result2…) is called.
So the single callback function is used both for reporting errors and passing back results.
Pyramid of Doom
At first glance, it looks like a viable( capable of working, functioning ) approach to asynchronous coding. And indeed it is. For one or maybe two nested calls it looks fine.
But for multiple asynchronous actions that follow one after another, we’ll have code like this:
```js
loadScript('1.js', function(error, script) {
  if (error) {
    handleError(error);
  } else {
    // ...
    loadScript('2.js', function(error, script) {
      if (error) {
        handleError(error);
      } else {
        // ...
        loadScript('3.js', function(error, script) {
          if (error) {
            handleError(error);
          } else {
            // ………………… continue after all scripts are loaded (*)
          }
        });
      }
    });
  }
});

```

In the code above:
We load 1.js, then if there’s no error…
We load 2.js, then if there’s no error…
We load 3.js, then if there’s no error – do something else (*).
As calls become more nested, the code becomes deeper and increasingly more difficult to manage, especially if we have real code instead of ... that may include more loops, conditional statements and so on.
That’s sometimes called “callback hell” or “pyramid of doom.”
The “pyramid” of nested calls grows to the right with every asynchronous action. Soon it spirals out of control.
So this way of coding isn’t very good.
We can try to alleviate the problem by making every action a standalone function, like this:
```js
loadScript('1.js', step1);

function step1(error, script) {
  if (error) {
    handleError(error);
  } else {
    // ...
    loadScript('2.js', step2);
  }
}

function step2(error, script) {
  if (error) {
    handleError(error);
  } else {
    // ...
    loadScript('3.js', step3);
  }
}

function step3(error, script) {
  if (error) {
    handleError(error);
  } else {
    // ...continue after all scripts are loaded (*)
  }
}
```


See? It does the same thing, and there’s no deep nesting now because we made every action a separate top-level function.
It works, but the code looks like a torn apart spreadsheet. It’s difficult to read, and you probably noticed that one needs to eye-jump between pieces while reading it. That’s inconvenient, especially if the reader is not familiar with the code and doesn’t know where to eye-jump.
Also, the functions named step* are all of single use, they are created only to avoid the “pyramid of doom.” No one is going to reuse them outside of the action chain. So there’s a bit of namespace cluttering here.
We’d like to have something better.
Luckily, there are other ways to avoid such pyramids. One of the best ways is to use “promises”.
=======================================================================


```js

1. Promise.all([
new Promise(resolve => setTimeout(()=> resolve(1), 3000 ))
new Promise(resolve => setTimeout(()=> resolve(2), 2000 ))
new Promise(resolve => setTimeout(()=> resolve(3), 1000 ))
]).then(alert);
output: 1,2,3
```
2. Promise.allSettled
3. Promise.race = > the result will be the fastest promise which is resolve;
4. Promise.any =>The first promise here was fastest, but it was rejected, so the second promise became the result. After the first fulfilled promise “wins the race”, all further results are ignored.
5. Promise.resolve/reject


Promise:
Promise is a javascript object which represents eventual completion or failure of an Asynchronous operation. Most of the time, we are the consumers of the promise, instead of producing them.



Event loop
https://medium.com/@vedanshdwivedi0/understanding-the-event-loop-in-nodejs-for-beginners-61967c4878d4





