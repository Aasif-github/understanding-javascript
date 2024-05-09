// Do it on Browser
function log(params){
  return console.log(params);
}

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



// animal has methods
let animal = {
    walk() {
      if (!this.isSleeping) {
        console.log(`I walk`);
      }
    },
    sleep() {
      this.isSleeping = true;
    }
  };
  
  let rabbit = {
    name: "White Rabbit",
    __proto__: animal
  };
  
  // modifies rabbit.isSleeping
  rabbit.sleep();
  
  console.log(rabbit.isSleeping); // true
  console.log(animal.isSleeping); // undefined (no such property in the prototype)


  // Chapter2
/*
Every function has the "prototype" property even if we don’t supply it.

The default "prototype" is an object with the only property constructor that points back to the function itself.
*/
  function cat(){}

  console.log(cat.prototype.constructor === cat)

  function Cat(name){
    this.name = name; // here this keyword bind the name property to Cat Object.
    console.log(this.name);
  }

  let cat_o = new Cat('Orange cat');
  //We can use constructor property to create a new object using the same constructor as the existing one.
  let cat_w = new cat_o.constructor('white cat');


  function JojoRabit(){}
  
  JojoRabit.prototype = {
      eat:true
    }

  let jojo_rabit = new JojoRabit();
  delete jojo_rabit;
  console.log(jojo_rabit.eat);
 

  function Obj(name){
    this.name = name;
  }

  let obj_2 = new Obj("box");
  let obj3 = new obj_2.constructor('black box');

  
// chapter 3- Native prototype
let obj_ = {};
console.log(obj_.toString()); // [object Object]
// So then when obj.toString() is called the method is taken from Object.prototype.
console.log(obj_.__proto__ === Object.prototype);  // true

log(obj_.toString === obj_.__proto__.toString);   // true
log(obj_.toString === Object.prototype.toString);  // true

console.log(Object.prototype.__proto__); // null

// same for array, function and date like new Array(), new Date()

//  Let’s check the prototypes manually:

let arr = [2,4,5,6];

// althrough, Array has it own toString() in its prototype, so it uses own. where as Object has also toString() in it but access of Object toString() is far for Array. so it uses it own.

log(arr.__proto__ === Array.prototype);             // true
log(arr.__proto__.__proto__ === Object.prototype);  // true
log(arr.__proto__.__proto__.__proto__);             // null

// ------------------------  functions  --------------------------
/*
Other built-in objects also work the same way. Even functions – they are objects of a built-in Function constructor, and their methods (call/apply and others) are taken from Function.prototype. Functions have their own toString too.
*/


function f() {}

log(f.__proto__ == Function.prototype); // true
log(f.__proto__.__proto__ == Object.prototype); // true, inherit from objects
 
log('Primitive',String.prototype);




Function.prototype.defer = function([...arg], ms){
  setTimeout(this, ms)
};

//
// function f(){
//   log('hello');
// };

// f.defer(1000);

function f(a, b) {
  alert( a + b );
}

f.defer(1000)(1, 2); // shows 3 after 1 second