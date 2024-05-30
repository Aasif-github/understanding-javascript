# Promise
A promise in JavaScript is an object that represents the eventually complete (or failure) of an asynchronous operation and its resulting value. It allows you to write asynchronous code in a more synchronous and manageable fashion. Promises have three states:

Promises are a fundamental part of modern JavaScript, especially for handling asynchronous operations in a clean and readable way. They form the basis for `async` and `await`, which provide an even more intuitive syntax for working with promises.

1. **Pending**: The initial state. The operation hasn't completed yet.
2. **Fulfilled**: The operation completed successfully, and the promise has a result.
3. **Rejected**: The operation failed, and the promise has a reason for the failure.

### How Promises Work

A promise is created using the `Promise` constructor, which takes a function (executor) with two arguments: `resolve` and `reject`. These are functions that you call to change the state of the promise.

Here’s a basic example:

```javascript
let promise = new Promise((resolve, reject) => {
    // Asynchronous operation
    let success = true;

    if (success) {
        resolve("Operation successful!"); // Fulfill the promise
    } else {
        reject("Operation failed!"); // Reject the promise
    }
});
```

### Using Promises

You interact with promises using the `.then()`, `.catch()`, and `.finally()` methods.

- **`then(onFulfilled, onRejected)`**: Attaches callbacks for the fulfillment and rejection of the promise.
- **`catch(onRejected)`**: Attaches a callback for only the rejection of the promise. Equivalent to `.then(null, onRejected)`.
- **`finally(onFinally)`**: Attaches a callback that is executed regardless of the promise's outcome (fulfilled or rejected).

Here’s an example:

```javascript
let promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        let success = true; // Simulate an async operation
        
        if (success) {
            resolve("Operation completed!");
        } else {
            reject("Operation failed!");
        }
    }, 1000);
});

promise
    .then(result => {
        console.log(result); // "Operation completed!"
    })
    .catch(error => {
        console.error(error); // Handle error
    })
    .finally(() => {
        console.log("Operation finished"); // Always executed
    });
```

### Chaining Promises

Promises can be chained to handle sequences of asynchronous operations. Each `then` returns a new promise, allowing you to chain multiple asynchronous steps together.

```javascript
let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve(1), 1000); // After 1 second, resolve with 1
});

promise
    .then(result => {
        console.log(result); // 1
        return result * 2;
    })
    .then(result => {
        console.log(result); // 2
        return result * 3;
    })
    .then(result => {
        console.log(result); // 6
    })
    .catch(error => {
        console.error(error);
    });
```

### Promise Combinators

JavaScript provides some utility functions to work with multiple promises:

- **`Promise.all(promises)`**: Waits for all promises to fulfill and returns an array of their results. If any promise rejects, it rejects with the first rejection reason.

- **`Promise.allSettled(promises)`**: Waits for all promises to settle (either fulfilled or rejected) and returns an array of objects describing the outcome of each promise.
{state: "fulfilled" or "rejected", value: (if fulfilled) or reason (if rejected)}

- **`Promise.race(promises)`**: Wait for the first promise to settle, and its result/error becomes the outcome. it will not check after that remain promise in list.

- **`Promise.any(promises)`**: Returns a promise that resolves as soon as one of the promises resolves. If all promises are rejected, it rejects with an AggregateError.

Here’s an example of `Promise.all`:

```javascript
let promise1 = Promise.resolve(3);
let promise2 = 42;
let promise3 = new Promise((resolve, reject) => {
    setTimeout(resolve, 100, 'foo');
});

Promise.all([promise1, promise2, promise3]).then(values => {
    console.log(values); // [3, 42, "foo"]
});
```

## Promise.race vs Promise.any

The major difference between `Promise.race` and `Promise.any` lies in how they handle the outcomes of the promises they are given, specifically in terms of fulfillment and rejection.

### `Promise.race`

- **Behavior**: `Promise.race` returns a promise that resolves or rejects as soon as one of the input promises resolves or rejects.
- **Fulfillment**: It resolves with the value of the first resolved promise.
- **Rejection**: It rejects with the reason of the first rejected promise.

Example:
```javascript
let promise1 = new Promise((resolve, reject) => setTimeout(resolve, 500, 'one'));
let promise2 = new Promise((resolve, reject) => setTimeout(reject, 100, 'two'));

Promise.race([promise1, promise2])
    .then(value => {
        console.log(value); // "two" (first promise to settle)
    })
    .catch(error => {
        console.log(error); // "two" (if the first promise to settle is a rejection)
    });
```

### `Promise.any`

- **Behavior**: `Promise.any` returns a promise that resolves as soon as one of the input promises resolves. If all input promises are rejected, it rejects with an `AggregateError` containing all the rejection reasons.
- **Fulfillment**: It resolves with the value of the first resolved promise.
- **Rejection**: It rejects only if all input promises are rejected, with an `AggregateError`.

Example:
```javascript
let promise1 = new Promise((resolve, reject) => setTimeout(resolve, 500, 'one'));
let promise2 = new Promise((resolve, reject) => setTimeout(reject, 100, 'two'));
let promise3 = new Promise((resolve, reject) => setTimeout(reject, 200, 'three'));

Promise.any([promise1, promise2, promise3])
    .then(value => {
        console.log(value); // "one" (first promise to resolve)
    })
    .catch(error => {
        console.log(error.errors); // ["two", "three"] if all promises are rejected
    });
```

### Key Differences

1. **Resolution Behavior**:
   - `Promise.race` settles (either resolves or rejects) with the outcome of the first promise that settles.
   - `Promise.any` resolves with the outcome of the first promise that resolves successfully, ignoring rejections until all promises are rejected.

2. **Rejection Handling**:
   - `Promise.race` can reject as soon as the first promise rejects.
   - `Promise.any` only rejects if all promises are rejected, providing an `AggregateError` with all rejection reasons.

### Use Cases

- **`Promise.race`**: Useful when you need to take action as soon as the first promise settles, regardless of whether it fulfills or rejects. For example, it can be used for implementing timeouts:
  ```javascript
  let timeout = new Promise((_, reject) => setTimeout(() => reject('Timeout'), 1000));
  Promise.race([fetch('/some-url'), timeout])
      .then(response => console.log(response))
      .catch(error => console.error(error)); // "Timeout" if fetch takes more than 1 second
  ```

- **`Promise.any`**: Useful when you are interested in the first successful outcome and want to ignore individual failures. For example, it can be used when making redundant requests to multiple servers:
  ```javascript
  let server1 = fetch('https://server1.com/data');
  let server2 = fetch('https://server2.com/data');
  let server3 = fetch('https://server3.com/data');

  Promise.any([server1, server2, server3])
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('All requests failed', error));
  ```

In summary, `Promise.race` is about the fastest result, whether it’s success or failure, while `Promise.any` is about the first successful result, ignoring failures unless all fail.