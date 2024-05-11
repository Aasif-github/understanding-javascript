class Car{
    constructor(){
        this.paint = 'Red',
        this.isTurbo = true,
        this.wheels = 4
    }
}

let suv = new Car();
// here suv is instance.
console.log(suv instanceof Car); // True
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof

let miniSuv = suv;
// Here miniSuv is reference 
console.log(typeof suv);

// What is instance?
// In JavaScript, when we talk about instances, we are often referring to objects that have been created from a constructor function. The constructor function serves as the blueprint, and each object created from it is an instance.


