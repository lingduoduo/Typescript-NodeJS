// class-basics.test.ts
import { Human } from './class-basics';

describe('Human class', () => {
  it('should create an instance of Human', () => {
    const human = new Human('John Doe', 30);
    expect(human).toBeInstanceOf(Human);
  });

  it('should return the correct name', () => {
    const human = new Human('John Doe', 30);
    expect(human.getName()).toBe('John Doe');
  });

  it('should return the correct age', () => {
    const human = new Human('John Doe', 30);
    expect(human.getAge()).toBe(30);
  });

  it('should set the name correctly', () => {
    const human = new Human('John Doe', 30);
    human.setName('Jane Doe');
    expect(human.getName()).toBe('Jane Doe');
  });

  it('should introduce itself correctly', () => {
    const human = new Human('John Doe', 30);
    expect(human.introduceYourself()).toBe('Hello, my name is John Doe and I am 30 years old.');
  });

  it('should introduce itself to someone correctly', () => {
    const human = new Human('John Doe', 30);
    expect(human.introduceYourselfTo('Jane')).toBe('Hello, my name is John Doe and I am 30 years old.');
  });
});