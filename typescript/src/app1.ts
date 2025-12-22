let message = 'Hello, World!';
console.log(message);

function double(x): number {
    return x * 2;
}
console.log(double(10));

function sayHello(): void {
    console.log('Hello');
}
sayHello();

const triple = (x: number) => x * 3;
console.log(triple(10));

let x = 10;
console.log(x);

let fourtimes: (x: number) => number;
fourtimes = (x: number) => x * 4;

let names: string[] = ['John', 'Jane', 'Doe'];
console.log(names);