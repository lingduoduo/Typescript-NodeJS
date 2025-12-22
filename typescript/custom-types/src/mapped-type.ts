type User = {
    id?: number;
    name: string;
    email: string;
};

// map type using Pick
type UserReadOnly = Pick<User, 'name' | 'email'>;
let user: UserReadOnly = {
    name: 'John',
    email: 'john@gmail.com'
};
console.log(user)

let user2: User = {
    ...user,
    id: 1
};
console.log(user2); // { name: 'John', email: '

// Readonly type
type ConstantUser = Readonly<User>;
let user3: ConstantUser = {
    name: 'John',
    email: 'john@gmail.com'
}
console.log(user3)

// Partial type
type PartialUser = Partial<User>;
let user4: PartialUser = {
    name: 'John'
}
console.log(user4)
