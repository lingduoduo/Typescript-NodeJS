"use strict";
let person = {
    name: 'John',
    age: 30
};
class Human {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    getName() {
        return this.name;
    }
    getAge() {
        return this.age;
    }
}
let human = new Human('John', 30);
console.log(human.getName()); // John
console.log(human.getAge()); // 30
let dog = {
    name: 'Buddy',
    getName() {
        return this.name;
    }
};
console.log(dog.getName()); // Buddy
