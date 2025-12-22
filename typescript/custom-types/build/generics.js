"use strict";
class Queue {
    constructor() {
        this.items = [];
    }
    add(newItem) {
        this.items.push(newItem);
    }
    remove() {
        return this.items.shift();
    }
}
let stringQueue = new Queue();
stringQueue.add('John');
console.log(stringQueue.remove()); // John
let numberQueue = new Queue();
numberQueue.add(1);
console.log(numberQueue.remove()); // 1
function print(value) {
    console.log(`The value is: ${value}`);
}
print("Hello");
