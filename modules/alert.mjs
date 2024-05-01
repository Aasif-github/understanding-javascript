/*
If the same module is imported into multiple other modules, its code is executed only once, upon the first import. Then its exports are given to all further importers.

The one-time evaluation has important consequences, that we should be aware of.

Let’s see a couple of examples.

First, if executing a module code brings side-effects, like showing a message, then importing it multiple times will trigger it only once – the first time:

*/
// 📁 alert.js
console.log("Module is evaluated!");


export let admin = {
    name: "jake"
}