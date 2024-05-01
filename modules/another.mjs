import { userInfo } from "./config.mjs";
import './init.mjs';

userInfo();
console.log(import.meta);
console.log(this); // undefined.
// 1. config export userInfo() 2. import config. write config file-init.mjs  3. import userInfo();
