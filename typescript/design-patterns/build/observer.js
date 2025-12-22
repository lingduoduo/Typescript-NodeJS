"use strict";
class Subject {
    constructor() {
        this.observers = [];
    }
    addObserver(observer) {
        this.observers.push(observer);
    }
    notify(value) {
        this.observers.forEach(observer => observer.update(value));
    }
}
class LogObserver {
    update(value) {
        console.log(`LogObserver: ${value}`);
    }
}
let observer1 = new LogObserver();
let observer2 = new LogObserver();
let observer3 = new LogObserver();
let subject = new Subject();
subject.addObserver(observer1);
subject.addObserver(observer2);
subject.addObserver(observer3);
subject.notify('Hello World');
