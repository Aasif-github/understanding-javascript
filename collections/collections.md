## What is collections in javascript

In JavaScript, collections are objects that allow you to store multiple values or entities in a structured way. The main types of collections in JavaScript include Arrays, Objects, Maps, Sets, WeakMaps, and WeakSets. Here is an overview of each:

1. Arrays
Arrays are ordered collections of elements that can hold any type of data. They are zero-indexed, meaning the first element has an index of 0.

Example:
```js
let fruits = ["apple", "banana", "cherry"];
console.log(fruits[0]); // Output: apple

```

Common Methods:

- push(), pop(): Add/remove elements at the end.
- shift(), unshift(): Add/remove elements at the beginning.
- map(), filter(), reduce(): Functional programming methods.

2.Objects-
Objects are collections of key-value pairs, where keys (properties) are strings (or Symbols) and values can be any type.

Example:
```js
let person = {
    name: "John",
    age: 30
};
console.log(person.name); // Output: John
```

Common Methods:

- Object.keys(): Returns an array of keys.
- Object.values(): Returns an array of values.
- Object.entries(): Returns an array of key-value pairs.


3. Maps
Maps are collections of key-value pairs where keys can be of any type (including objects and functions).

Example:

```js
let map = new Map();
map.set("name", "John");
map.set("age", 30);
console.log(map.get("name")); // Output: John
```

Common Methods:

- set(): Adds or updates a key-value pair.
- get(): Retrieves the value for a given key.
- delete(): Removes a key-value pair.
- has(): Checks if a key exists.

4. Sets
Sets are collections of unique values, meaning no duplicates are allowed. Values can be of any type.

```js
let set = new Set([1, 2, 3, 4]);
set.add(2); // Does nothing, 2 already exists
console.log(set.has(2)); // Output: true
```
Example:

```js
let set = new Set([1, 2, 3, 4]);
set.add(2); // Does nothing, 2 already exists
console.log(set.has(2)); // Output: true

```

Common Methods:

- add(): Adds a new element.
- delete(): Removes an element.
- has(): Checks if an element exists.
- clear(): Removes all elements.

5. WeakMaps
WeakMaps are similar to Maps but only accept objects as keys and do not prevent garbage collection of key objects.

Example:
```js
let weakMap = new WeakMap();
let obj = {};
weakMap.set(obj, "value");
console.log(weakMap.get(obj)); // Output: value
```

Common Methods:

set(), get(), delete(), has(): Similar to Map methods but for weakly held objects.

6. WeakSets
WeakSets are similar to Sets but only accept objects as values and do not prevent garbage collection of those objects.

Example:
```js
let weakSet = new WeakSet();
let obj = {};
weakSet.add(obj);
console.log(weakSet.has(obj)); // Output: true
```

Common Methods:

- add(), delete(), has(): Similar to Set methods but for weakly held objects.
### Comparison and Use Cases
- Arrays: Best for ordered data and when you need to access elements by index.
- Objects: Best for structured data with named properties.
- Maps: Best when you need key-value pairs with any type of keys.
Sets: Best for collections of unique values.
- WeakMaps: Best when you need key-value pairs and want keys to be garbage-collected when no longer needed.
- WeakSets: Best for collections of objects that should not prevent garbage collection.
Understanding these collections and their use cases is crucial for effective JavaScript programming.



Ref:
https://chat.openai.com/share/81e26033-8278-4abb-9b26-abdb2ae5ce2b