console.log('Hello TypeScript!');

function add(a: number, b: number) {
  return a + b;
}

console.log(add(1, 2)); // 3

let isTrue: boolean = true;
isTrue = false;

let list: number[] = [1, 2, 3];
let list2: Array<number> = [1, 2, 3];
let list3 = [1, 'aaa']
let list4: any[] = [1, 'aaa']

let person: [number, string] = [1, 'Tom'];
let union: number | string = 1;

function merge(n1: number | string, n2: number | string) {
    if (typeof n1 === 'string' || typeof n2 === 'string') {
        return n1.toString() + n2.toString();
    }
    else
        return n1 + n2
}

let num1 = merge(1, 2)
let num2 = merge('1', 2)

console.log(num1)
console.log(num2)
