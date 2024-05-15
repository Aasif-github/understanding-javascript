## How Js engine works
- Before learning scope and closure
- we must learn how js engine works and then Hoisting..


## Js Engine
[Js-Engine-is-Compiled-or-Interpreted](https://robiul.dev/is-javascript-compiled-or-interpreted-language)

[How Jit Works](https://medium.com/@minhaz217/lets-understand-the-javascript-just-in-time-compiler-jit-and-how-the-v8-engine-works-ff6276d131a1)

crome - v8 Engine
safari- javascriptCore
mozzila -SpiderMonkey 
Microsoft Eage - chakra

it totally depends on how language is implemented.

x = 5 + 3;

it brk into token "x", "=", "5", "+", "3"
laxer also assign token type: identifier, operator, or literals

compiler [software] : Human readable code ----> machine executable code

Interpreter [program]: 











[Execution context - How Js Function will run in Exection Context]() - Akash shaini


# How JIT(Just-in-Time) Works Internally
[Understand JIT - compiler and how crome v8 Engine works](https://medium.com/@minhaz217/lets-understand-the-javascript-just-in-time-compiler-jit-and-how-the-v8-engine-works-ff6276d131a1)




## What is hoisting in JavaScript and how does it affect my code?
- Hoisting is a JavaScript mechanism where variables and function declarations are moved to the top of their containing scope during the compile phase. This means that you can use variables and functions before they have been declared. However, it’s important to note that only the declarations are hoisted, not the initializations. This can sometimes lead to unexpected results, especially when using ‘var’, as it can make it seem like the variable is accessible in a scope where it’s not actually available.

https://www.freecodecamp.org/news/what-is-hoisting-in-javascript/

[Hosting - mdn](https://developer.mozilla.org/en-US/docs/Glossary/Hoisting)

- variable hoisting
- function hoisting
- class hoisting
- import hoisting


## is hosting is really important
[Why-does-JavaScript-hoist-variables](https://www.quora.com/Why-does-JavaScript-hoist-variables)


## Temporal Dead Zone (TDZ)

[Why TDZ](https://2ality.com/2015/10/why-tdz.html)




## Scope - imp

https://javascript.info/closure

 - Lexical Enviroment -> object
 In JavaScript, every running function, code block {...}, and the script as a whole have an internal (hidden) associated object known as the Lexical Environment.
