console.log('Hello TypeScript!');
function add(a, b) {
    return a + b;
}
console.log(add(1, 2)); // 3
var isTrue = true;
isTrue = false;
var list = [1, 2, 3];
var list2 = [1, 2, 3];
var list3 = [1, 'aaa'];
var list4 = [1, 'aaa'];
var person = [1, 'Tom'];
var union = 1;
function merge(n1, n2) {
    if (typeof n1 === 'string' || typeof n2 === 'string') {
        return n1.toString() + n2.toString();
    }
    else
        return n1 + n2;
}
var num1 = merge(1, 2);
var num2 = merge('1', 2);
console.log(num1);
console.log(num2);
