import {sayHi} from './module2.mjs';
import { sayHello } from './module2.mjs';
import {getUser} from "./module2.mjs";

import {admin} from './alert.mjs';  // 1st
admin.name = "peter";

console.log(sayHi('ki ki'));  //2nd

 
console.log(sayHello('gogo')); //3rd

console.log(admin.name);

console.log(getUser('asif'));

 