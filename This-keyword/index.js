"use strict";

var point = {
    x: null,
    y: null,

    init(x,y) {
        this.x = x;
        this.y = y;
        // console.log(this.x);
        // console.log(this.y);
    },
    toString() {
        return `(${this.x},${this.y})`;
    },
};

// point.init(3,5); //- implicit invocation

//const init = point.init; //- Default Context Invocation
//init(4,7);

// console.log(globalThis.x);
// console.log(point.x);


// const init = point.init;     // Explicit context invocation
// init.call(point, 3, 4);

// console.log(point.x)
// console.log(point.y)


var point2 = {
    x: null,
    y: null,

    init: function(x,y) {
        this.x = x;
        this.y = y;       
    },
    toString() {
        return `(${this.x},${this.y})`;
    },
};


var anotherPoint = new point2.init(3, 4); // New Context Invocation
console.log(anotherPoint.x)
console.log(anotherPoint.y)
