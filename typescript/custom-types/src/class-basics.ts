// class-basics.ts
class newHuman {
    private name: string;
    private age: number;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }

    public getName(): string {
        return this.name;
    }

    public getAge(): number {
        return this.age;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public introduceYourself(): string {
        return `Hello, my name is ${this.name} and I am ${this.age} years old.`;
    }

    public introduceYourselfTo(name: string): string {
        return `Hello, my name is ${this.name} and I am ${this.age} years old.`;
    }
}

let new_person = new newHuman('John', 30);
console.log(new_person.introduceYourself());
