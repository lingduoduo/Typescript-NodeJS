"use strict";
let x;
let userInput = "Hello";
function attackSquare(row, col) {
}
function isRowLabel(str) {
    return ["A", "B", "C"].includes(str);
}
function isColLabel(str) {
    return ["1", "2", "3"].includes(str);
}
let newMove = "A1";
function isBattelshipMove(str) {
    let [row, col] = str.split("");
    return isRowLabel(row) && isColLabel(col);
}
