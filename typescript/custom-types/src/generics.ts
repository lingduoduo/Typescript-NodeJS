
class Queue<T> {
    private items: T[];

    constructor() {
        this.items = [];
    }

    add(newItem: T) {
        this.items.push(newItem);
    }

    remove(): T | undefined {
        return this.items.shift();
    }   

}

let stringQueue = new Queue<string>();
stringQueue.add('John');
console.log(stringQueue.remove()); // John

let numberQueue = new Queue<number>();
numberQueue.add(1);
console.log(numberQueue.remove()); // 1

function print<T>(value: T): void {
    console.log(`The value is: ${value}`);
}
print("Hello")
