"use strict";
// class-basics.ts
class newHuman {
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
    setName(name) {
        this.name = name;
    }
    introduceYourself() {
        return `Hello, my name is ${this.name} and I am ${this.age} years old.`;
    }
    introduceYourselfTo(name) {
        return `Hello, my name is ${this.name} and I am ${this.age} years old.`;
    }
}
let new_person = new newHuman('John', 30);
console.log(new_person.introduceYourself());
