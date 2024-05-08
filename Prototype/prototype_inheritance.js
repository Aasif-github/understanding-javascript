// Do it on Browser

//For array
const user = [1,2,3];
console.log(user);
// o.p (3)[1,2,3] -> length:3 [[Prototype]]:Array(0) -> ....[[Prototype]]: Object -> .... __proto__:Array(0) -> ...[[Prototype]]:Object -> ... __proto__: Object -> ... __proto__: null.

console.log(user.__proto__);

console.log(Array.prototype);

console.log(Array.prototype === user.__proto__); // True

console.log(user.__proto__.__proto__); //... __proto__: null.

console.log(Object.prototype === user.__proto__.__proto__);  // True

//define my own property or method in array- user
Array.prototype.getLen = function(){ console.log(`The Length is:${user.length}`);}

//now it attach to top  [[Prototype]]:Array
console.log(user.getLen());


// For function
function info(){
    console.log(`display info`);
}

console.log(Function.prototype)  // ƒ () { [native code] }

console.log(info.__proto__); // ƒ () { [native code] }

console.log(info.__proto__ === Function.prototype);     // True

console.log(info.__proto__.__proto__); // {__defineGetter__: ƒ, __defineSetter__: ƒ, hasOwnProperty: ƒ, __lookupGetter__: ƒ, __lookupSetter__: ƒ, ... __proto__:null}

console.log(info.__proto__.__proto__.__proto__);  // null


// For Obj
const obj = { name:'asif', greet: function(){console.log(`hi ${this.name}`)}};
console.log(obj.greet());

console.log(obj.__proto__); // {__defineGetter__: ƒ, __defineSetter__: ƒ, hasOwnProperty: ƒ, __lookupGetter__: ƒ, __lookupSetter__: ƒ, … __proto__:null}

console.log(obj.__proto__.__proto__); // null

// Prototype inheritance
const obj2 = { address: 'Block-H' };

obj2.__proto__ = obj;

//now all properties of obj is inheritated by obj2
console.log(obj2.name); // asif

console.log(obj2.__proto__.__proto__); // {__defineGetter__: ƒ, __defineSetter__: ƒ, hasOwnProperty: ƒ, __lookupGetter__: ƒ, __lookupSetter__: ƒ, … __proto__:null}

console.log(obj2.__proto__.__proto__.__proto__);  // null becouse it has prototype chaining at obj ie  Object <-- Object <-- Obj <-- obj2

// obj2 {address:'H-block'}[[prototype]]:Object -> [[prototype]]:Object greet:f() name:
// "asif" {} [[prototype]]:Object -->


