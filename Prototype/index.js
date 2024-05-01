// https://github.com/Aasif-github/You-Dont-Know-JS/blob/2nd-ed/objects-classes/ch5.md

// why we need delegation 
//  it just a replacement of class in js

/*
What if you could leverage all the power of the objects, prototypes, and dynamic this mechanisms together, without ever using class or any of its descendants?

In fact, I would argue JS is inherently less class-oriented than the class keyword might appear. Because JS is a dynamic, prototypal language, its strong suit is actually... delegation.
*/

// replacement of constructor 
// Or
// a non-class "constructor"
function Point2d(x, y){

    var instance = {};

    instance.x = x;
    instance.y = y;

    return instance;
}

var point = Point2d(3,5);
console.log(point.x);
console.log(point.y);
/*
There's no class, just a regular function definition (Point2d(..)). There's no new invocation, just a regular function call (Point2d(3,4)). And there's no this references, just regular object property assignments (instance.x = ..).

The term that's most often used to refer to this pattern of code is that Point2d(..) here is a factory function. Invoking it causes the construction (creation and initialization) of an object, and returns that back to us. That's an extremely common pattern, at least as common as class-oriented code.

*/

// let's add the function protoTypeObj

var prototypeObj = {
    toString(){
        return `(${this.x}, ${this.y})`;
    }
}

function Point2d(x, y){

    var instance = {
        // link the instanse's [[Prototype]]
        __proto__ : prototypeObj
    }

    instance.x = x;
    instance.y = y;

    return instance;
}
// Now you see the __proto__ assignment that's setting up the internal [[Prototype]] linkage,
var point2 = Point2d(1,3);
console.log(point2.toString());




// Composing Peer Objects
/*
Let's take this delegation even further.

In the preceding snippet, point and anotherPoint merely held data, and the behaviors they delegated to were on other objects (Coordinates and Inspect). But we can add behaviors directly to any of the objects in a delegation chain, and those behaviors can even interact with each other, all through the magic of virtual composition (this context sharing).

To illustrate, we'll evolve our current point example a fair bit. And as a bonus we'll actually draw our points on a <canvas> element in the DOM. Let's take a look
*/
var Canvas = {
    setOrigin(x,y) {
        this.ctx.translate(x,y);

        // flip the canvas context vertically,
        // so coordinates work like on a normal
        // 2d (x,y) graph
        this.ctx.scale(1,-1);
    },
    pixel(x,y) {
        this.ctx.fillRect(x,y,1,1);
    },
    renderScene() {
        // clear the canvas
        var matrix = this.ctx.getTransform();
        this.ctx.resetTransform();
        this.ctx.clearRect(
            0, 0,
            this.ctx.canvas.width,
            this.ctx.canvas.height
        );
        this.ctx.setTransform(matrix);

        this.draw();  // <-- where is draw()?
    },
};

var Coordinates = {
    setX(x) {
        this.x = Math.round(x);
    },
    setY(y) {
        this.y = Math.round(y);
    },
    setXY(x,y) {
        this.setX(x);
        this.setY(y);
        this.render();   // <-- where is render()?
    },
};

var ControlPoint = {
    // delegate to Coordinates
    __proto__: Coordinates,

    // NOTE: must have a <canvas id="my-canvas">
    // element in the DOM
    ctx: document.getElementById("my-canvas")
        .getContext("2d"),

    rotate(angleRadians) {
        var rotatedX = this.x * Math.cos(angleRadians) -
            this.y * Math.sin(angleRadians);
        var rotatedY = this.x * Math.sin(angleRadians) +
            this.y * Math.cos(angleRadians);
        this.setXY(rotatedX,rotatedY);
    },
    draw() {
        // plot the point
        Canvas.pixel.call(this,this.x,this.y);
    },
    render() {
        // clear the canvas, and re-render
        // our control-point
        Canvas.renderScene.call(this);
    },
};

// set the logical (0,0) origin at this
// physical location on the canvas
Canvas.setOrigin.call(ControlPoint,100,100);

ControlPoint.setXY(30,40);
// [renders point (30,40) on the canvas]

// ..
// later:

// rotate the point about the (0,0) origin
// 90 degrees counter-clockwise
ControlPoint.rotate(Math.PI / 2);
// [renders point (-40,30) on the canvas]

/*
OK, that's a lot of code to digest. Take your time and re-read the snippet several times. I added a couple of new concrete objects (Canvas and ControlPoint) alongside the previous Coordinates object.

Make sure you see and understand the interactions between these three concrete objects.

ControlPoint is linked (via __proto__) to implicitly delegate ([[Prototype]] chain) to Coordinates.

Here's an explicit delegation: Canvas.setOrigin.call(ControlPoint,100,100);; I'm invoking the Canvas.setOrigin(..) call in the context of ControlPoint. That has the effect of sharing ctx with setOrigin(..), via this.

ControlPoint.setXY(..) delegates implicitly to Coordinates.setXY(..), but still in the context of ControlPoint. Here's a key detail that's easy to miss: see the this.render() inside of Coordinates.setXY(..)? Where does that come from? Since the this context is ControlPoint (not Coordinates), it's invoking ControlPoint.render().

ControlPoint.render() explicitly delegates to Canvas.renderScene(), again still in the ControlPoint context. renderScene() calls this.draw(), but where does that come from? Yep, still from ControlPoint (via this context).

And ControlPoint.draw()? It explicitly delegates to Canvas.pixel(..), yet again still in the ControlPoint context.

All three objects have methods that end up invoking each other. But these calls aren't particularly hard-wired. Canvas.renderScene() doesn't call ControlPoint.draw(), it calls this.draw(). That's important, because it means that Canvas.renderScene() is more flexible to use in a different this context -- e.g., against another kind of point object besides ControlPoint.

It's through the this context, and the [[Prototype]] chain, that these three objects basically are mixed (composed) virtually together, as needed at each step, so that they work together as if they're one object rather than three seperate objects.

That's the beauty of virtual composition as realized by the delegation pattern in JS.
*/
// ------------------------------------------ Why This -----------------------------------
// Why This?
/*
OK, so it's hopefully clear that the delegation pattern leans heavily on implicit input, sharing context via this rather than through an explicit parameter.

You might rightly ask, why not just always pass around that context explicitly? We can certainly do so, but... to manually pass along the necessary context, we'll have to change pretty much every single function signature, and any corresponding call-sites.

Let's revisit the earlier ControlPoint delegation example, and implement it without any delegation-oriented this context sharing. Pay careful attention to the differences:
*/

var Canvas = {
    setOrigin(ctx,x,y) {
        ctx.translate(x,y);
        ctx.scale(1,-1);
    },
    pixel(ctx,x,y) {
        ctx.fillRect(x,y,1,1);
    },
    renderScene(ctx,entity) {
        // clear the canvas
        var matrix = ctx.getTransform();
        ctx.resetTransform();
        ctx.clearRect(
            0, 0,
            ctx.canvas.width,
            ctx.canvas.height
        );
        ctx.setTransform(matrix);

        entity.draw();
    },
};

var Coordinates = {
    setX(entity,x) {
        entity.x = Math.round(x);
    },
    setY(entity,y) {
        entity.y = Math.round(y);
    },
    setXY(entity,x,y) {
        this.setX(entity,x);
        this.setY(entity,y);
        entity.render();
    },
};

var ControlPoint = {
    // NOTE: must have a <canvas id="my-canvas">
    // element in the DOM
    ctx: document.getElementById("my-canvas")
        .getContext("2d"),

    setXY(x,y) {
        Coordinates.setXY(this,x,y);
    },
    rotate(angleRadians) {
        var rotatedX = this.x * Math.cos(angleRadians) -
            this.y * Math.sin(angleRadians);
        var rotatedY = this.x * Math.sin(angleRadians) +
            this.y * Math.cos(angleRadians);
        this.setXY(rotatedX,rotatedY);
    },
    draw() {
        // plot the point
        Canvas.pixel(this.ctx,this.x,this.y);
    },
    render() {
        // clear the canvas, and re-render
        // our control-point
        Canvas.renderScene(this.ctx,this);
    },
};

// set the logical (0,0) origin at this
// physical location on the canvas
Canvas.setOrigin(ControlPoint.ctx,100,100);

// ..

/*
To be honest, some of you may prefer that style of code. And that's OK if you're in that camp. This snippet avoids [[Prototype]] entirely, and only relies on far fewer basic this.-style references to properties and methods.

By contrast, the delegation style I'm advocating for in this chapter is unfamiliar and uses [[Prototype]] and this sharing in ways you're not likely familiar with. To use such a style effectively, you'll have to invest the time and practice to build a deeper familiarity.

But in my opinion, the "cost" of avoiding virtual composition through delegation can be felt across all the function signatures and call-sites; I find them way more cluttered. That explicit context passing is quite a tax.

In fact, I'd never advocate that style of code at all. If you want to avoid delegation, it's probably best to just stick to class style code, as seen in Chapter 3. As an exercise left to the reader, try to convert the earlier ControlPoint / GuideLine code snippets to use class.
*/