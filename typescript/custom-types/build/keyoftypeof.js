"use strict";
let x1 = "hello";
// Runtime type check
if (typeof x1 === "string") {
    console.log("x is a string");
}
let person1 = {
    name: "hell",
    age: 10
};
function getPropertyF(person, key) {
    return person[key];
}
