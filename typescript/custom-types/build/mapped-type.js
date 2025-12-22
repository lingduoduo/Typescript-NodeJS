"use strict";
let user = {
    name: 'John',
    email: 'john@gmail.com'
};
console.log(user);
let user2 = {
    ...user,
    id: 1
};
console.log(user2); // { name: 'John', email: '
let user3 = {
    name: 'John',
    email: 'john@gmail.com'
};
console.log(user3);
let user4 = {
    name: 'John'
};
console.log(user4);
