interface Command {
    execute(): void;
    undo(): void;
}

class Counter{
    private count = 0;

    setValue(value: number){
        this.count = value;
    }

    getValue(){
        return this.count;
    }

}

class IncrementCommand implements Command {
    private counter: Counter;

    constructor(counter: Counter){
        this.counter = counter;
    }

    execute(){
        this.counter.setValue(this.counter.getValue() + 1);
    }

    undo(){
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