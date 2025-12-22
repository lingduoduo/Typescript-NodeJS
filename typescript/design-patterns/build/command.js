"use strict";
class Counter {
    constructor() {
        this.count = 0;
    }
    setValue(value) {
        this.count = value;
    }
    getValue() {
        return this.count;
    }
}
class IncrementCommand {
    constructor(counter) {
        this.counter = counter;
    }
    execute() {
        this.counter.setValue(this.counter.getValue() + 1);
    }
    undo() {
        this.counter.setValue(this.counter.getValue() - 1);
    }
}
let counter = new Counter();
let incrementCommand = new IncrementCommand(counter);
incrementCommand.execute();
incrementCommand.execute();
incrementCommand.execute();
console.log(counter.getValue());
incrementCommand.undo();
console.log(counter.getValue());
