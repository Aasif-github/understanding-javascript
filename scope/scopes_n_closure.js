// console.log("Hello World from javascript!");
//  console.log("Hello World from javascript!");
//  console.log("Hello World from javascript!");
//  console.log("Hello World from javascript!");
//  console.log("Hello World from javascript!");
//  console.log("Hello World from javascript!");
//  console.log("Hello World from javascript!");
//  console.log("Hello World!);

//^^^^^^^^^^^^^^^
//  SyntaxError: Invalid or unexpected token

 /* if JavaScript were truly an interpreted language, the console would have already printed the first nine lines before throwing an error. */

// console.log(max(2,1));

// console.log(a);
function max(n1, n2){
    return n1 > n2 ? n1: n2;
}

console.log("Hello--");
// for(var i = 0;i<4;i++) {
//     console.log(Hello); //ReferenceError: Hello is not defined
// }

// console.log(foo); // undefined

// var foo;  // initialization
// let foo;  // initialization -  Cannot access 'foo' before initialization

// foo = 'foo';

// console.log(foo); // "foo"

// function hoisting
resetScore();
drawGameBoard();
populateGameBoard();
startGame();

function resetScore() {
	console.log("Resetting score");
}

function drawGameBoard() {
	console.log("Drawing board");
}

function populateGameBoard() {
	console.log("Populating board");
}

function startGame() {
	console.log("Starting game");
}


// Nested Function - https://javascript.info/closure

function sayHiBye(firstName, lastName) {

    // helper nested function to use below
    function getFullName() {
      return firstName + " " + lastName;
    }
  
    console.log( "Hello, " + getFullName() );
    console.log( "Bye, " + getFullName() );
  
  }
  sayHiBye('jake','lallan');