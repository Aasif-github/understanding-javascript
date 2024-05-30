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


## Real World Use case for Promise API

Sure, let's explore real-world use cases for each of the major Promise APIs: `Promise.all`, `Promise.race`, `Promise.allSettled`, and `Promise.any`.

### 1. `Promise.all`

**Use Case**: Aggregating Data from Multiple Sources

Suppose you have a web page that needs to display user data, recent posts, and notifications. Each of these pieces of data comes from a different API endpoint. You want to wait until all these requests are completed before rendering the page.

```javascript
const fetchUserData = fetch('/api/user');
const fetchRecentPosts = fetch('/api/posts');
const fetchNotifications = fetch('/api/notifications');

Promise.all([fetchUserData, fetchRecentPosts, fetchNotifications])
    .then(responses => Promise.all(responses.map(res => res.json())))
    .then(([userData, posts, notifications]) => {
        renderPage(userData, posts, notifications);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
```

### 2. `Promise.race`

**Use Case**: Implementing a Request Timeout

When making a network request, you might want to ensure that it doesn't take too long. You can use `Promise.race` to implement a timeout for a fetch request.

```javascript
const fetchWithTimeout = (url, timeout = 5000) => {
    const fetchPromise = fetch(url);
    const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Request timed out')), timeout)
    );

    return Promise.race([fetchPromise, timeoutPromise]);
};

fetchWithTimeout('/api/some-endpoint')
    .then(response => response.json())
    .then(data => {
        console.log('Data:', data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
```

### 3. `Promise.allSettled`

**Use Case**: Handling Multiple Independent Promises

When you need to wait for multiple operations to complete, but each operation is independent and should be handled separately regardless of whether it succeeds or fails.

```javascript
const operations = [
    fetch('/api/data1'),
    fetch('/api/data2'),
    fetch('/api/data3')
];

Promise.allSettled(operations)
    .then(results => {
        results.forEach((result, index) => {
            if (result.status === 'fulfilled') {
                console.log(`Operation ${index + 1} succeeded with value:`, result.value);
            } else {
                console.error(`Operation ${index + 1} failed with reason:`, result.reason);
            }
        });
    });
```

### 4. `Promise.any`

**Use Case**: First Successful Response from Multiple Sources

When you want to fetch data from multiple redundant sources and use the first successful response.

```javascript
const fetchFromServer1 = fetch('https://server1.com/data');
const fetchFromServer2 = fetch('https://server2.com/data');
const fetchFromServer3 = fetch('https://server3.com/data');

Promise.any([fetchFromServer1, fetchFromServer2, fetchFromServer3])
    .then(response => response.json())
    .then(data => {
        console.log('Received data:', data);
    })
    .catch(error => {
        console.error('All requests failed:', error);
    });
```

### Summary

- **`Promise.all`** is useful when you need all promises to fulfill before proceeding (e.g., loading all necessary data for a page).
- **`Promise.race`** is useful when you need to proceed as soon as the first promise settles (e.g., implementing request timeouts).
- **`Promise.allSettled`** is useful when you need the results of all promises regardless of whether they fulfill or reject (e.g., handling multiple independent operations).
- **`Promise.any`** is useful when you need the first successfully fulfilled promise and can ignore individual rejections (e.g., redundant requests to multiple servers).

These APIs provide powerful tools to manage asynchronous operations effectively in JavaScript.