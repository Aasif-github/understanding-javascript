## How Js engine works
- Before learning scope and closure
- we must learn how js engine works and then Hoisting..


## Js Engine
[Js-Engine-is-Compiled-or-Interpreted](https://robiul.dev/is-javascript-compiled-or-interpreted-language)


it totally depends on how language is implemented.

x = 5 + 3;

it brk into token "x", "=", "5", "+", "3"
laxer also assign token type: identifier, operator, or literals

compiler [software] : Human readable code ----> machine executable code

Interpreter [program]: 














@ What is hoisting in JavaScript and how does it affect my code?
- Hoisting is a JavaScript mechanism where variables and function declarations are moved to the top of their containing scope during the compile phase. This means that you can use variables and functions before they have been declared. However, it’s important to note that only the declarations are hoisted, not the initializations. This can sometimes lead to unexpected results, especially when using ‘var’, as it can make it seem like the variable is accessible in a scope where it’s not actually available.

