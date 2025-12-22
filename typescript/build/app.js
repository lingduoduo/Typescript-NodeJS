"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var msg = 'Hello, World!';
console.log(msg);
function double(x) {
    return x * 2;
}
console.log(double(10));
function doubley(x) {
    console.log(x * 2);
}
var triple = function (x) { return x * 3; };
var fourtimes;
fourtimes = function (x) { return x * 4; };
var nums = [1, 2, 3, 4, 5];
var personTuple = ['John', 25, true];
var something = 'hello';
var data = [1, 'John', true, [1, 2, 3]];
var nothing = undefined;
var anohtherNothing = null;
var util = require('./util');
console.log('The sum or 1 and 2 is'.concat((0, util.add)(10, 20)));
