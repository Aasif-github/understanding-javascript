function* countThree(){

    yield 1;
    yield 2;
    yield 3;
}
/*
const gen = countThree();
console.log(gen.next().value);
console.log(gen.next());
console.log(gen.next());
console.log(gen.next());
*/

function* fibonacci(){
    
    let [prev, current] = [0, 1]

    while(true){
        yield current;
        [prev, current] = [current, prev+current];
    }
}

const fib = fibonacci();
console.log(fib.next().value);
console.log(fib.next().value);
console.log(fib.next().value);
console.log(fib.next().value);
console.log(fib.next().value);
   
